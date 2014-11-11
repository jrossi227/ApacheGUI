package net.apachegui.web;

import apache.conf.parser.File;

import java.io.PrintWriter;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.apachegui.conf.ConfFiles;
import net.apachegui.db.SettingsDao;
import net.apachegui.docs.DocFiles;
import net.apachegui.global.Constants;
import net.apachegui.global.SearchTask;
import net.apachegui.global.SearchTaskExecutor;
import net.apachegui.global.Utilities;
import net.apachegui.logs.LogFiles;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.global.Utils;

@RestController
@RequestMapping("/web/Menu")
public class MenuController {
    private static Logger log = Logger.getLogger(MenuController.class);

    @Autowired
    private SearchTaskExecutor search;

    @RequestMapping(value = "/rest", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void menuRoot(HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();

        String confDirectory = SettingsDao.getInstance().getSetting(Constants.confDirectory);
        String logDirectory = SettingsDao.getInstance().getSetting(Constants.logDirectory);

        out.print("[" + "{ $ref: '" + Constants.ConfigurationRoot + confDirectory + "', name:'Configuration', id:'" + Constants.ConfigurationRoot + confDirectory + "', children:true}," + "{ $ref: '"
                + Constants.DocumentsRoot + (Utils.isWindows() ? Utilities.getFileSystemDrive() : "/") + "', name:'Documents', id:'" + Constants.DocumentsRoot
                + (Utils.isWindows() ? Utilities.getFileSystemDrive() : "/") + "', children:true}," + "{ $ref: '" + Constants.LogsRoot + logDirectory + "', name:'Logs', id:'" + Constants.LogsRoot
                + logDirectory + "', children:true}," + "{ $ref: 'Control', name:'Control', id:'Control', type:'Control'},"
                + "{ $ref: 'Global_Settings', name:'Global Settings', id:'Global_Settings', type:'Global_Settings'},"
                + "{ $ref: 'Virtual_Hosts', name:'Virtual Hosts', id:'Virtual_Hosts', type:'Virtual_Hosts'}," + "{ $ref: 'History', name:'History', id:'History', type:'History'},"
                + "{ $ref: 'GUISettings', name:'GUISettings', id:'GUISettings', type:'GUISettings'}" + "]");

    }

    @RequestMapping(value = "/rest/**", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void menuRoot(HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();

        String path = URLDecoder.decode(request.getRequestURI().substring(request.getContextPath().length() + "/web/Menu/rest/".length()), "UTF-8");

        if (path.startsWith(Constants.ConfigurationRoot)) {
            out.print(ConfFiles.getNodeJson(path.substring(Constants.ConfigurationRoot.length())));
        }

        if (path.startsWith(Constants.DocumentsRoot)) {
            out.print(DocFiles.getNodeJson(path.substring(Constants.DocumentsRoot.length())));
        }

        if (path.startsWith(Constants.LogsRoot)) {
            out.print(LogFiles.getNodeJson(path.substring(Constants.LogsRoot.length())));
        }
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=renameFile", produces = "application/json;charset=UTF-8")
    public String renameFile(@RequestParam(value = "oldFile") String oldFile, @RequestParam(value = "newFile") String newFile) throws Exception {
        log.trace("oldFile " + oldFile);
        log.trace("newFile " + newFile);
        File oldFileHandle = new File(oldFile);
        File newFileHandle = new File(newFile);
        if (newFileHandle.exists()) {
            throw new Exception("A file with the same name already exists.<br/>Please choose a different name.");
        }
        boolean moved = oldFileHandle.renameTo(newFileHandle);
        if (!moved) {
            throw new Exception("There was an error renaming the file");
        }

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=newFile", produces = "application/json;charset=UTF-8")
    public String newFile(@RequestParam(value = "filename") String filename, @RequestParam(value = "type") String type) throws Exception {

        log.trace("filename " + filename);
        log.trace("type " + type);
        File newFile = new File(filename);

        if (newFile.getName().contains(" ")) {
            throw new Exception("Any new files must not contain spaces to conform with web formats");
        }

        boolean created = false;
        if (type.equals("file")) {
            created = newFile.createNewFile();
        }

        if (type.equals("directory")) {
            created = newFile.mkdir();
        }

        if (!created) {
            throw new Exception("There was an error creating the file");
        } else {
            Utils.setPermissions(newFile);
        }

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=cut", produces = "application/json;charset=UTF-8")
    public String cut(@RequestParam(value = "oldFile") String oldFile, @RequestParam(value = "directory") String directory) throws Exception {

        log.trace("oldFile " + oldFile);
        log.trace("directory " + directory);
        File oldFileHandle = new File(oldFile);
        File newFileHandle = new File(directory, oldFileHandle.getName());
        if (newFileHandle.equals(oldFileHandle)) {
            throw new Exception("You are trying to cut and paste a file into the same directory. Nothing will be done!");
        }

        int copyNum = 1;
        while (newFileHandle.exists()) {
            newFileHandle = new File(directory, oldFileHandle.getName() + "_" + copyNum);

            copyNum++;
        }

        if (oldFileHandle.isDirectory()) {
            Utils.moveDirectory(oldFileHandle, newFileHandle);
        } else {
            Utils.moveFile(oldFileHandle, newFileHandle);
        }

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=copy", produces = "application/json;charset=UTF-8")
    public String copy(@RequestParam(value = "oldFile") String oldFile, @RequestParam(value = "directory") String directory) throws Exception {

        log.trace("oldFile " + oldFile);
        log.trace("directory " + directory);
        File oldFileHandle = new File(oldFile);
        File newFileHandle = new File(directory, oldFileHandle.getName());

        int copyNum = 1;
        while (newFileHandle.exists()) {
            newFileHandle = new File(directory, oldFileHandle.getName() + "_" + copyNum);

            copyNum++;
        }

        if (oldFileHandle.isDirectory()) {
            Utils.copyDirectory(oldFileHandle, newFileHandle);
        } else {
            boolean copy = Utils.copyFile(oldFileHandle, newFileHandle);
            if (!copy) {
                throw new Exception("There was an error copying and pasting the file");
            }
        }

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();

    }

    @RequestMapping(method = RequestMethod.POST, params = "option=deleteFile", produces = "application/json;charset=UTF-8")
    public String deleteFile(@RequestParam(value = "filename") String filename) throws Exception {

        log.trace("filename " + filename);
        File newFile = new File(filename);
        boolean deleted = false;
        if (newFile.isDirectory()) {
            log.trace("Deleteing directory");
            deleted = Utils.deleteDirectory(newFile);
        } else {
            log.trace("Deleteing file");
            deleted = newFile.delete();
        }
        if (!deleted) {
            throw new Exception("There was an error deleting the file");
        }

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=submitSearch", produces = "application/json;charset=UTF-8")
    public String submitSearch(@RequestParam(value = "searchFilter") String filter, @RequestParam(value = "searchFileList") String fileList,
            @RequestParam(value = "searchRecursively") String searchRecursively, @RequestParam(value = "searchDirectory") String directory) {

        boolean recursive = Boolean.valueOf(searchRecursively);

        boolean started = search.start(directory, fileList, filter, recursive);

        JSONObject result = new JSONObject();
        result.put("started", started);
        return result.toString();

    }

    @RequestMapping(method = RequestMethod.GET, params = "option=searchCheck", produces = "application/json;charset=UTF-8")
    public String searchCheck() {

        JSONObject JSONOut = new JSONObject();

        switch (SearchTask.getCurrentState()) {
        case GRABBING_FILES:
        case SEARCHING:
        case CANCELLING:
            JSONOut.put("status", "running");
            JSONOut.put("output", SearchTask.getCurrentOutput());
            break;

        case IDLE:
            JSONOut.put("status", "done");
            JSONOut.put("maxResults", Constants.maximumConfigurationSearchResults);
            JSONOut.put("results", SearchTask.getLastResults());
            break;

        case CANCELLED:
            JSONOut.put("status", "cancelled");
            break;
        }

        return JSONOut.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=searchCancel", produces = "application/json;charset=UTF-8")
    public String searchCancel() throws InterruptedException {
        search.cancel();

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }
}
