package net.apachegui.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import net.apachegui.conf.ConfFiles;
import net.apachegui.conf.Configuration;
import net.apachegui.directives.DocumentRoot;
import net.apachegui.directives.ServerName;
import net.apachegui.virtualhosts.NetworkInfo;
import net.apachegui.virtualhosts.VirtualHost;
import net.apachegui.virtualhosts.VirtualHosts;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.parser.File;

@RestController
@RequestMapping("/web/VirtualHosts")
public class VirtualHostsController {
    
    @RequestMapping(method = RequestMethod.GET, params = "option=getTreeHosts", produces = "application/json;charset=UTF-8")
    public String getTreeHosts() throws NullPointerException, Exception {
        
        VirtualHost hosts[] = VirtualHosts.getAllVirtualHosts();
        
        JSONArray jsonHosts = new JSONArray();
        
        for(VirtualHost host: hosts ) {
            jsonHosts.put(new JSONObject(host.toJSON()));
        }
        
        JSONObject summary = new JSONObject();
        summary.put("ServerName", ServerName.getServerName().getValue());
        summary.put("hosts", jsonHosts);
        
        return summary.toString();
        
    }
    
    @RequestMapping(method = RequestMethod.POST, params = "option=deleteLine", produces = "application/json;charset=UTF-8")
    public String updateGlobal(@RequestParam(value = "file") String file, 
                               @RequestParam(value = "lineOfStart") int lineOfStart, 
                               @RequestParam(value = "lineOfEnd") int lineOfEnd) throws Exception {

        ConfFiles.deleteFromConfigFile(Pattern.compile(".*", Pattern.CASE_INSENSITIVE), new File(file), lineOfStart, lineOfEnd, true);
        
        String status = Configuration.testServerConfiguration();

        if(!Configuration.isServerConfigurationOk(status)) {
            throw new Exception("The change generated a configuration error: " + status);
        }
        
        JSONObject result = new JSONObject();
        result.put("result", "success");

        return result.toString();
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
