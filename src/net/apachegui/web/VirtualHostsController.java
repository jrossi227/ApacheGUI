package net.apachegui.web;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import net.apachegui.conf.ConfFiles;
import net.apachegui.conf.Configuration;
import net.apachegui.db.SettingsDao;
import net.apachegui.directives.DocumentRoot;
import net.apachegui.directives.ServerName;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import net.apachegui.virtualhosts.NetworkInfo;
import net.apachegui.virtualhosts.VirtualHost;
import net.apachegui.virtualhosts.VirtualHosts;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.global.Utils;
import apache.conf.parser.File;
import apache.conf.parser.Parser;

@RestController
@RequestMapping("/web/VirtualHosts")
public class VirtualHostsController {
    
    private void testChanges(String file, String originalContents) throws Exception {
        
        String status = Configuration.testServerConfiguration();

        if(!Configuration.isServerConfigurationOk(status)) {
            FileUtils.writeStringToFile(new File(file), originalContents, Charset.forName("UTF-8"));
            
            throw new Exception("The changes generated a configuration error and have been reverted: " + status);
        }
    }
    
    private JSONObject populateFileModifiedResponse(String file) {
        
        JSONObject result = new JSONObject();
        result.put("result", "success");
        result.put("lastModifiedTime", new File(file).lastModified());
        result.put("file", file);
        
        return result;
        
    }
    
    private JSONArray getAllHostsToJSONArray() throws Exception {

        VirtualHost hosts[] = VirtualHosts.getAllVirtualHosts();

        JSONArray jsonHosts = new JSONArray();

        for (VirtualHost host : hosts) {
            jsonHosts.put(new JSONObject(host.toJSON()));
        }

        return jsonHosts;
    }
    
    @RequestMapping(method = RequestMethod.GET, params = "option=getTreeHosts", produces = "application/json;charset=UTF-8")
    public String getTreeHosts() throws NullPointerException, Exception {
        
        JSONObject summary = new JSONObject();
        summary.put("ServerName", ServerName.getServerName().getValue());
        summary.put("hosts", getAllHostsToJSONArray());
        
        return summary.toString();
        
    }
    
    @RequestMapping(method = RequestMethod.POST, params = "option=deleteLine", produces = "application/json;charset=UTF-8")
    public String deleteLine(@RequestParam(value = "file") String file, 
                               @RequestParam(value = "lineOfStart") int lineOfStart, 
                               @RequestParam(value = "lineOfEnd") int lineOfEnd) throws Exception {

        String originalContents = ConfFiles.deleteFromConfigFile(Pattern.compile(".*", Pattern.CASE_INSENSITIVE), new File(file), lineOfStart, lineOfEnd, true);
        
        testChanges(file, originalContents);
        
        JSONObject result = populateFileModifiedResponse(file);
      
        return result.toString();
    }
    
    @RequestMapping(method = RequestMethod.POST, params = "option=editLine", produces = "application/json;charset=UTF-8")
    public String editLine(@RequestParam(value = "type") String type, 
                           @RequestParam(value = "value") String value, 
                           @RequestParam(value = "lineType") String lineType, 
                           @RequestParam(value = "file") String file, 
                           @RequestParam(value = "lineOfStart") int lineOfStart, 
                           @RequestParam(value = "lineOfEnd") int lineOfEnd) throws Exception {
        
        String line;
        if(lineType.equals("enclosure")) {
            line = "<" + type + " " + value + ">";
        } else {
            line = type + " " + value;
        }
                
        String originalContents = ConfFiles.replaceLinesInConfigFile(new File(file), new String[]{line}, lineOfStart, lineOfEnd);
        
        testChanges(file, originalContents);
        
        JSONObject result = populateFileModifiedResponse(file);
        
        return result.toString();       
    }
    
    @RequestMapping(method = RequestMethod.POST, params = "option=addLine", produces = "application/json;charset=UTF-8")
    public String addLine(@RequestParam(value = "type") String type, 
                           @RequestParam(value = "value") String value, 
                           @RequestParam(value = "beforeLineType") String beforeLineType, 
                           @RequestParam(value = "lineType") String lineType, 
                           @RequestParam(value = "file") String file, 
                           @RequestParam(value = "lineOfStart") int lineOfStart) throws Exception {
        
        String lines[];
        if(lineType.equals("enclosure")) {
            lines = new String[3];
            lines[0] = "<" + type + " " + value + ">";
            lines[1] = "";
            lines[2] = "</" + type + ">";
        } else {
            lines = new String[1];
            lines[0] = type + " " + value;
        }
                
        boolean useWhitespaceBefore = beforeLineType.equals("directive");
        
        String originalContents = ConfFiles.writeToConfigFile(new File(file), lines, lineOfStart, useWhitespaceBefore);
        
        testChanges(file, originalContents);
        
        JSONObject result = populateFileModifiedResponse(file);
        
        return result.toString();      
    }
    
    @RequestMapping(method = RequestMethod.POST, params = "option=addHost", produces = "application/json;charset=UTF-8")
    public String addHost(@RequestParam(value = "hostAddress") String hostAddress, 
                          @RequestParam(value = "port") String port, 
                          @RequestParam(value = "serverName") String serverName, 
                          @RequestParam(value = "documentRoot") String documentRoot, 
                          @RequestParam(value = "file") String file) throws Exception {
        
        int portNum = port.equals("") ? -1 : Integer.parseInt(port);
        NetworkInfo networkInfo = new NetworkInfo(portNum, hostAddress);

        String virtualHost = "<VirtualHost " + networkInfo.toString() + ">" + Constants.newLine + "" + Constants.newLine
                + (serverName.equals("") ? "" : ("ServerName " + serverName + Constants.newLine)) + (documentRoot.equals("") ? "" : ("DocumentRoot " + documentRoot + Constants.newLine))
                + "</VirtualHost>" + Constants.newLine;

        File fileObj = new File(file);
        String path = fileObj.getAbsolutePath();

        String originalContents = "";
        if (fileObj.exists()) {
            originalContents = FileUtils.readFileToString(fileObj, Charset.forName("UTF-8"));
        }

        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileObj, true), "UTF-8"));
        out.write(virtualHost);
        out.close();

        Utils.setPermissions(fileObj);

        String rootConfFile = SettingsDao.getInstance().getSetting(Constants.confFile);
        String activeFileList[] = new Parser(rootConfFile, SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules())
                .getActiveConfFileList();

        boolean found = false;
        for (int i = 0; i < activeFileList.length; i++) {
            if (activeFileList[i].equals(path)) {
                found = true;
                break;
            }
        }

        if (!found) {
            originalContents = FileUtils.readFileToString(new File(rootConfFile), Charset.forName("UTF-8"));

            if (Utils.isWindows()) {
                ConfFiles.appendToRootConfigFile("Include \"" + path + "\"");

            } else {
                ConfFiles.appendToRootConfigFile("Include " + path);
            }

            testChanges(rootConfFile, originalContents);
        } else {
            testChanges(fileObj.getAbsolutePath(), originalContents);
        }

        JSONObject summary = new JSONObject();
        summary.put("hosts", getAllHostsToJSONArray());

        return summary.toString(); 
    }
    
    @RequestMapping(method = RequestMethod.GET, params = "option=getNetworkInfoArrayFromValue", produces = "application/json;charset=UTF-8")
    public String getNetworkInfoArrayFromValue(@RequestParam(value = "value") String value) throws Exception {
        
        NetworkInfo infos[] = NetworkInfo.buildNetworkInfo(value.replaceAll("\\s+", " ").split(" "));
        
        JSONArray networkInfoArray = new JSONArray();

        for (NetworkInfo info : infos) {
            networkInfoArray.put(new JSONObject(info.toJSON()));
        }

        JSONObject json = new JSONObject();
        json.put("NetworkInfo", networkInfoArray);
        
        return json.toString();
    }
    
    @RequestMapping(method = RequestMethod.GET, params = "option=getHierarchicalHosts", produces = "application/json;charset=UTF-8")
    public String getHierarchicalHosts() throws NullPointerException, Exception {

        VirtualHost hosts[] = VirtualHosts.getAllVirtualHosts();

        // NetworkInfo, VirtualHost JSON String[], items first in the JSON String[] are the default
        HashMap<NetworkInfo, ArrayList<String>> hostBuckets = new HashMap<NetworkInfo, ArrayList<String>>();

        for (VirtualHost host : hosts) {
            
            for (NetworkInfo info : host.getNetworkInfo()) {

                ArrayList<String> json = hostBuckets.get(info);
                if (json == null) {
                    json = new ArrayList<String>();
                }

                json.add(host.toJSON());

                hostBuckets.put(info, json);

            }

        }

        JSONObject hostJSON = new JSONObject();

        NetworkInfo currInfo;
        ArrayList<String> currHosts;
        JSONArray hostArray;
        for (Entry<NetworkInfo, ArrayList<String>> entry : hostBuckets.entrySet()) {
            currInfo = entry.getKey();
            currHosts = entry.getValue();

            hostArray = new JSONArray();
            JSONObject currHostJSON;
            for (String currHost : currHosts) {

                currHostJSON = new JSONObject(currHost);
                currHostJSON.remove("NetworkInfo");
                currHostJSON.put("NetworkInfo", new JSONObject(currInfo.toJSON()));

                hostArray.put(currHostJSON);
            }

            hostJSON.put(currInfo.toString(), hostArray);
        }

        JSONObject summary = new JSONObject();
        summary.put("hosts", hostJSON);
        summary.put("ServerName", ServerName.getServerName().getValue());
        summary.put("DocumentRoot", DocumentRoot.getDocumentRoot().getValue());

        return summary.toString();
    }

}
