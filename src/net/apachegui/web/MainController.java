package net.apachegui.web;

import apache.conf.parser.File;
import net.apachegui.conf.Configuration;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web/Main")
public class MainController {

    @RequestMapping(method = RequestMethod.GET, params = "option=confFilePath", produces = "application/json;charset=UTF-8")
    public String confFilePath() {

        JSONObject result = new JSONObject();

        result.put("file", SettingsDao.getInstance().getSetting(Constants.confDirectory));

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=docFilePath", produces = "application/json;charset=UTF-8")
    public String docFilePath() {

        JSONObject result = new JSONObject();

        result.put("file", Utilities.getFileSystemDrive());

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=logFilePath", produces = "application/json;charset=UTF-8")
    public String logFilePath() {

        JSONObject result = new JSONObject();

        result.put("file", SettingsDao.getInstance().getSetting(Constants.logDirectory));

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=validateFileExists", produces = "application/json;charset=UTF-8")
    public String validateFileExists(@RequestParam(value = "filename") String filename) {

        JSONObject result = new JSONObject();

        result.put("exists", (new File(filename)).exists());

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=lastModifiedTime", produces = "application/json;charset=UTF-8")
    public String lastModifiedTime(@RequestParam(value = "path") String path) {

        JSONObject result = new JSONObject();

        File file = new File(path);
        long lastModifiedTime = -1;
        if (file.exists()) {
            lastModifiedTime = file.lastModified();
        }

        result.put("time", Long.toString(lastModifiedTime));

        return result.toString();
    }
    
    @RequestMapping(value = "/lastModifiedTimes", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public String lastModifiedTimes(@RequestBody String jsonString) throws Exception {

        JSONObject request = new JSONObject(jsonString);
        JSONArray outFiles = new JSONArray();
        
        JSONArray requestFiles = request.getJSONArray("files");
        File file;
        long lastModifiedTime;
        JSONObject currFile;
        for (int i = 0; i < requestFiles.length(); i++) {
            file = new File(requestFiles.getString(i));
            lastModifiedTime = -1;
            if (file.exists()) {
                lastModifiedTime = file.lastModified();
            }
            
            currFile = new JSONObject();
            currFile.put("file", file.getAbsolutePath());
            currFile.put("lastModifiedTime", lastModifiedTime);       
            outFiles.put(currFile);
        }
        
        JSONObject result = new JSONObject();
        result.put("lastModifiedTimes", outFiles);
        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=checkSession", produces = "text/plain;charset=UTF-8")
    public String checkSession() {

        return "active";
    }
    
    @RequestMapping(method = RequestMethod.GET, params = "option=checkServerSyntax", produces = "application/json;charset=UTF-8")
    public String checkServerSyntax() throws Exception {

        String status = Configuration.testServerConfiguration();

        if(!Configuration.isServerConfigurationOk(status)) {            
            throw new Exception("The apache configuration currently contains syntax errors.<br/>"
                              + "Some parts of the ApacheGUI application may not function correctly until these errors are fixed.<br/><br/>"
                              + "Error Details : " + status);
        }
        
        JSONObject result = new JSONObject();
        result.put("status", "success");
        
        return result.toString();
    }

}
