package net.apachegui.web;

import apache.conf.global.Utils;
import apache.conf.parser.*;
import net.apachegui.conf.Configuration;
import net.apachegui.conf.ConfigurationTree;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;


@RestController
@RequestMapping("/web/Configuration")
public class ConfigurationController {
    private static Logger log = Logger.getLogger(ConfigurationController.class);

    @RequestMapping(method = RequestMethod.GET, params = "option=test", produces = "application/json;charset=UTF-8")
    public String testConfiguration() throws Exception {

        String result = net.apachegui.conf.Configuration.testServerConfiguration();
        log.trace("Result of test: " + result);

        JSONObject resultJSON = new JSONObject();
        resultJSON.put("result", result);

        return resultJSON.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=save", produces = "application/json;charset=UTF-8")
    public String saveConfiguration(@RequestParam(value = "content") String content, @RequestParam(value = "path") String path) throws Exception {

        log.trace("content " + content);
        log.trace("path " + path);

        File file = new File(path);
        FileUtils.write(file, content, Charset.forName("UTF-8"), false);

        long modifiedTime = -1;
        modifiedTime = file.lastModified();

        log.trace("Checking the server configuration after saving.");
        String status = net.apachegui.conf.Configuration.testServerConfiguration();
        log.trace("Status: " + status);

        if(!Configuration.isServerConfigurationOk(status)) {
            throw new Exception("The save generated a configuration error: " + status);
        } else {
            SharedModuleHandler.updateSharedModules();
        }

        JSONObject result = new JSONObject();
        result.put("result", "The save was a success!");
        result.put("time", Long.toString(modifiedTime));

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=getFileAsString", produces = "text/plain;charset=UTF-8")
    public String getConfigurationFileAsString(@RequestParam(value = "file") String path) throws Exception {

        String fileText = "";
        File file = new File(path);
        try {
            if (file.length() < Constants.MAXIMUM_DOCUMENT_FILESIZE) {
                fileText = Utils.readFileAsString(file, Charset.forName("UTF-8"));
            } else {
                fileText = "The Document is too large to render. The document must be less than " + Constants.MAXIMUM_DOCUMENT_FILESIZE + " Bytes";
            }
        } catch (Exception e) {
            fileText = "File Not Found!!";
        }

        return fileText;
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=search", produces = "application/json;charset=UTF-8")
    public String searchConfiguration(@RequestParam(value = "filter") String filter, @RequestParam(value = "activeFilesFilter") Boolean activeFilesFilter,
            @RequestParam(value = "commentsFilter") Boolean commentsFilter) throws Exception {

        log.trace("filter: " + filter);
        JSONArray results = net.apachegui.conf.Configuration.searchConfiguration(filter, activeFilesFilter, commentsFilter);

        JSONObject result = new JSONObject();
        result.put("maxResults", Integer.toString(Constants.MAXIMUM_CONFIGURATION_SEARCH_RESULTS));
        result.put("results", results);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=getConfigurationTree", produces = "application/json;charset=UTF-8")
    public String getConfigurationTree(@RequestParam(value = "file") String file) throws NullPointerException, Exception {

        Parser parser = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        ParsableLine parsableLines[] = parser.getFileParsableLines(file, true);

        JSONObject tree = new JSONObject();
        tree.put("tree", ConfigurationTree.toTreeJSON(parsableLines, file));

        return tree.toString();

    }

}
