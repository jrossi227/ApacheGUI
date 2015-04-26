package net.apachegui.web;

import java.util.regex.Pattern;

import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.File;
import net.apachegui.conf.ConfFiles;
import net.apachegui.db.JdbcConnection;
import net.apachegui.db.SettingsDao;
import net.apachegui.db.UsersDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import net.apachegui.server.ServerInfo;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web/Init")
public class InitController {
    private static Logger log = Logger.getLogger(InitController.class);

    @RequestMapping(value = "/CheckFirstTime", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String checkInit() {

        String init = SettingsDao.getInstance().getSetting(Constants.INIT);
        log.trace("init value " + init);

        JSONObject result = new JSONObject();
        result.put("firstTime", (init == null ? true : false));

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=submitSource", produces = "application/json;charset=UTF-8")
    public String submitSource(@RequestParam(value = "serverRoot") String serverRoot, @RequestParam(value = "username") String username, @RequestParam(value = "password1") String password1,
            @RequestParam(value = "password2") String password2, @RequestParam(value = "enableAuthenticationSource") String enableAuthentication) throws Exception {

        log.trace("serverRoot " + serverRoot);

        File serverRootFile = new File(serverRoot.trim());

        if (!(serverRootFile.exists())) {
            throw new Exception("The Server Root directory " + serverRoot + " does not exist");
        }

        if (!serverRootFile.isDirectory()) {
            throw new Exception("The Server Root is not a directory");
        }

        if (Utils.isWindows() && !serverRoot.contains(":")) {
            throw new Exception("The Server Root must specify the drive eg. C:/");
        }

        log.trace("username " + username);

        if (!password1.equals(password2)) {
            throw new Exception("The input passwords do not match");
        }

        log.trace("enableAuthentication " + enableAuthentication);

        initializeDatabaseSource(serverRootFile.getAbsolutePath(), username, password1, enableAuthentication);

        JSONObject result = new JSONObject();
        result.put("result", "success");

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=submitPackage", produces = "application/json;charset=UTF-8")
    public String submitPackage(@RequestParam(value = "serverRoot") String serverRoot, @RequestParam(value = "confFile") String confFile, @RequestParam(value = "confDirectory") String confDirectory,
                                @RequestParam(value = "logDirectory") String logDirectory, @RequestParam(value = "modulesDirectory") String modulesDirectory, @RequestParam(value = "binFile") String binFile,
                                @RequestParam(value = "username") String username, @RequestParam(value = "password1") String password1, @RequestParam(value = "password2") String password2, @RequestParam(value = "enableAuthenticationPackage") String enableAuthentication) throws Exception {

        log.trace("serverRoot " + serverRoot);
        File serverRootFile = new File(serverRoot.trim());

        if (!(serverRootFile.exists())) {
            throw new Exception("The Server Root directory " + serverRoot + " does not exist");
        }

        if (!serverRootFile.isDirectory()) {
            throw new Exception("The Server Root is not a directory");
        }

        if (Utils.isWindows() && !serverRoot.contains(":")) {
            throw new Exception("The Server Root must specify the drive eg. C:/");
        }

        log.trace("confFile " + confFile);
        File confFileFile = new File(confFile.trim());

        if (!confFileFile.exists()) {
            throw new Exception("The Configuration File " + confFile + " does not exist");
        }

        if (confFileFile.isDirectory()) {
            throw new Exception("The Configuration File " + confFile + " is a directory");
        }

        log.trace("confDirectory " + confDirectory);
        File confDirectoryFile = new File(confDirectory.trim());

        if (!confDirectoryFile.exists()) {
            throw new Exception("The Directory " + confDirectory + " does not exist");
        }

        if (!confDirectoryFile.isDirectory()) {
            throw new Exception("The Directory " + confDirectory + " is not a directory");
        }

        log.trace("logDirectory " + logDirectory);
        File logDirectoryFile = new File(logDirectory.trim());

        if (!logDirectoryFile.exists()) {
            throw new Exception("The Log Directory " + logDirectory + " does not exist");
        }

        if (!logDirectoryFile.isDirectory()) {
            throw new Exception("The Log Directory " + logDirectory + " is not a directory");
        }

        log.trace("modulesDirectory " + modulesDirectory);
        File modulesDirectoryFile = new File(modulesDirectory.trim());

        if (!modulesDirectoryFile.exists()) {
            throw new Exception("The modules Directory " + modulesDirectory + " does not exist");
        }

        if (!modulesDirectoryFile.isDirectory()) {
            throw new Exception("The Directory " + modulesDirectory + " is not a directory");
        }

        log.trace("binFile " + binFile);
        File binFileFile = new File(binFile.trim());

        if (!binFileFile.exists()) {
            throw new Exception("The Binary File " + binFile + " does not exist");
        }

        if (binFileFile.isDirectory()) {
            throw new Exception("The Binary File " + binFile + " is a directory");
        }

        log.trace("username " + username);

        if (!password1.equals(password2)) {
            throw new Exception("The input passwords do not match");
        }

        log.trace("enableAuthentication " + enableAuthentication);

        initializeDatabasePackage(serverRootFile.getAbsolutePath(), confFileFile.getAbsolutePath(), confDirectoryFile.getAbsolutePath(), logDirectoryFile.getAbsolutePath(),
                modulesDirectoryFile.getAbsolutePath(), binFileFile.getAbsolutePath(), username, password1, enableAuthentication);

        JSONObject result = new JSONObject();
        result.put("result", "success");

        return result.toString();
    }

    private void initializeDatabaseSource(String serverRoot, String username, String password, String enableAuthentication) throws Exception {
        log.trace("Init.initializeDatabaseSource called");
        log.trace("Initializing the database with source parameters ");

        File confDirectoryFile = new File(serverRoot, Constants.SHORT_CONF_DIRECTORY);
        if (!confDirectoryFile.exists()) {
            throw new Exception("We are unable to find the Apache " + Constants.SHORT_CONF_DIRECTORY + " directory under " + serverRoot + " please verify that your Server Root is correct");
        }

        String confDirectory = confDirectoryFile.getAbsolutePath();
        log.trace("confDirectory " + confDirectory);

        File confFileHandle = new File(confDirectory, Constants.SHORT_CONF_FILE);
        if (!confFileHandle.exists()) {
            throw new Exception("We are unable to find " + Constants.SHORT_CONF_FILE + " under " + confDirectory + " please verify your apache layout");
        }

        String confFile = confFileHandle.getAbsolutePath();
        log.trace("confFile " + confFile);

        File logDirectoryFile = new File(serverRoot, Constants.SHORT_LOG_DIRECTORY);
        if (!logDirectoryFile.exists()) {
            throw new Exception("We are unable to find the Apache " + Constants.SHORT_LOG_DIRECTORY + " directory under " + serverRoot + " please verify that your Server Root is correct");
        }

        String logDirectory = logDirectoryFile.getAbsolutePath();
        log.trace("logDirectory " + logDirectory);

        File modulesDirectoryFile = new File(serverRoot, Constants.SHORT_MODULES_DIRECTORY);
        if (!modulesDirectoryFile.exists()) {
            throw new Exception("We are unable to find the Apache " + Constants.SHORT_MODULES_DIRECTORY + " directory under " + serverRoot + " please verify that your Server Root is correct");
        }

        String modulesDirectory = modulesDirectoryFile.getAbsolutePath();
        log.trace("modulesDirectory " + modulesDirectory);

        File binDirectoryFile = new File(serverRoot, Constants.SHORT_BIN_DIRECTORY);
        if (!binDirectoryFile.exists()) {
            throw new Exception("We are unable to find the Apache " + Constants.SHORT_BIN_DIRECTORY + " directory under " + serverRoot + " please verify that your Server Root is correct");
        }

        String binDirectory = binDirectoryFile.getAbsolutePath();
        log.trace("binDirectory " + binDirectory);

        File binFileHandle = new File(binDirectory, Constants.SHORT_BIN_FILE);
        if (!binFileHandle.exists()) {
            throw new Exception("We are unable to find " + Constants.SHORT_BIN_FILE + " under " + binDirectory + " please verify your apache layout");
        }

        String binFile = binFileHandle.getAbsolutePath();
        log.trace("binFile " + binFile);

        try {
            if (!ServerInfo.isSupported(binFile)) {
                throw new Exception("");
            }
        } catch (Exception e) {
            throw new Exception("This version of apache does not appear to be supported. Supported versions include " + Constants.VERSION_SUPPORTED_STRING + ".");
        }

        log.info("Clearing the database");
        JdbcConnection.getInstance().clearAllDatabases();

        log.trace("Setting name:" + Constants.INIT + " value: true");
        SettingsDao.getInstance().setSetting(Constants.INIT, "true");

        log.trace("Setting name:" + Constants.SERVER_ROOT + " value: " + serverRoot);
        SettingsDao.getInstance().setSetting(Constants.SERVER_ROOT, serverRoot);

        log.trace("Setting name:" + Constants.USERNAME + " value: " + username);
        UsersDao.getInstance().setUsername(username);

        log.trace("Setting name:" + Constants.PASSWORD + " value: XXXXX");
        UsersDao.getInstance().setPassword(password);

        log.trace("Setting name:" + Constants.AUTHENTICATION_ENABLED + " value: " + enableAuthentication);
        SettingsDao.getInstance().setSetting(Constants.AUTHENTICATION_ENABLED, enableAuthentication);

        log.trace("Setting name:" + Constants.CONF_DIRECTORY + " value: " + confDirectory);
        SettingsDao.getInstance().setSetting(Constants.CONF_DIRECTORY, confDirectory);

        log.trace("Setting name:" + Constants.CONF_FILE + " value: " + confFile);
        SettingsDao.getInstance().setSetting(Constants.CONF_FILE, confFile);

        log.trace("Setting name:" + Constants.LOG_DIRECTORY + " value: " + logDirectory);
        SettingsDao.getInstance().setSetting(Constants.LOG_DIRECTORY, logDirectory);

        log.trace("Setting name:" + Constants.MODULES_DIRECTORY + " value: " + modulesDirectory);
        SettingsDao.getInstance().setSetting(Constants.MODULES_DIRECTORY, modulesDirectory);

        log.trace("Setting name:" + Constants.BIN_FILE + " value: " + binFile);
        SettingsDao.getInstance().setSetting(Constants.BIN_FILE, binFile);

        log.trace("Setting name:" + Constants.PROCESS_INFO_REFRESH_RATE + " value: " + Constants.PROCESS_INFO_REFRESH_RATE_DEFAULT);
        SettingsDao.getInstance().setSetting(Constants.PROCESS_INFO_REFRESH_RATE, Constants.PROCESS_INFO_REFRESH_RATE_DEFAULT);

        log.trace("Setting name:" + Constants.EXTENDED_STATUS + " value: " + Constants.EXTENDED_STATUS_DEFAULT);
        SettingsDao.getInstance().setSetting(Constants.EXTENDED_STATUS, Constants.EXTENDED_STATUS_DEFAULT);

        log.trace("Setting name:" + Constants.THEME + " value: " + Constants.DEFAULT_THEME);
        SettingsDao.getInstance().setSetting(Constants.THEME, Constants.DEFAULT_THEME);

        log.trace("resetting history buffer");
        SettingsDao.getInstance().setSetting(Constants.HISTORY_BUFFER, Constants.DEFAULT_HISTORY_BUFFER);

        log.trace("resetting history retention");
        SettingsDao.getInstance().setSetting(Constants.HISTORY_RETENTION, Constants.DEFAULT_HISTORY_RETENTION);

        if (Utils.isWindows()) {
            // Setting SRVROOT Variable to entered Server Root
            String files[] = ConfFiles.getFullConfFileList();
            for (int i = 0; i < files.length; i++) {
                new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT), StaticModuleHandler.getStaticModules(),
                        SharedModuleHandler.getSharedModules()).setDirectiveInFile(Constants.DEFINE_DIRECTIVE, files[i], Constants.SERVER_ROOT_DIRECTIVE_VALUE + " \"" + serverRoot + "\"",
                        Pattern.compile(Constants.SERVER_ROOT_DIRECTIVE_VALUE), false, false);
            }
        }
    }

    private void initializeDatabasePackage(String serverRoot, String confFile, String confDirectory, String logDirectory, String modulesDirectory, String binFile, String username, String password, String enableAuthentication)
            throws Exception {
        log.trace("Init.initializeDatabasePackage called");
        log.trace("Initializing the database with package parameters ");

        try {
            if (!ServerInfo.isSupported(binFile)) {
                throw new Exception("");
            }
        } catch (Exception e) {
            throw new Exception("This version of apache does not appear to be supported. Supported versions include " + Constants.VERSION_SUPPORTED_STRING + ".");
        }

        log.info("Clearing the database");
        JdbcConnection.getInstance().clearAllDatabases();

        log.trace("Setting name:" + Constants.INIT + " value: true");
        SettingsDao.getInstance().setSetting(Constants.INIT, "true");

        log.trace("Setting name:" + Constants.SERVER_ROOT + " value: " + serverRoot);
        SettingsDao.getInstance().setSetting(Constants.SERVER_ROOT, serverRoot);

        log.trace("Setting name:" + Constants.USERNAME + " value: " + username);
        UsersDao.getInstance().setUsername(username);

        log.trace("Setting name:" + Constants.PASSWORD + " value: XXXXX");
        UsersDao.getInstance().setPassword(password);

        log.trace("Setting name:" + Constants.CONF_DIRECTORY + " value: " + confDirectory);
        SettingsDao.getInstance().setSetting(Constants.CONF_DIRECTORY, confDirectory);

        log.trace("Setting name:" + Constants.CONF_FILE + " value: " + confFile);
        SettingsDao.getInstance().setSetting(Constants.CONF_FILE, confFile);

        log.trace("Setting name:" + Constants.LOG_DIRECTORY + " value: " + logDirectory);
        SettingsDao.getInstance().setSetting(Constants.LOG_DIRECTORY, logDirectory);

        log.trace("Setting name:" + Constants.MODULES_DIRECTORY + " value: " + modulesDirectory);
        SettingsDao.getInstance().setSetting(Constants.MODULES_DIRECTORY, modulesDirectory);

        log.trace("Setting name:" + Constants.BIN_FILE + " value: " + binFile);
        SettingsDao.getInstance().setSetting(Constants.BIN_FILE, binFile);

        log.trace("Setting name:" + Constants.AUTHENTICATION_ENABLED + " value: " + enableAuthentication);
        SettingsDao.getInstance().setSetting(Constants.AUTHENTICATION_ENABLED, enableAuthentication);

        log.trace("Setting name:" + Constants.PROCESS_INFO_REFRESH_RATE + " value: " + Constants.PROCESS_INFO_REFRESH_RATE_DEFAULT);
        SettingsDao.getInstance().setSetting(Constants.PROCESS_INFO_REFRESH_RATE, Constants.PROCESS_INFO_REFRESH_RATE_DEFAULT);

        log.trace("Setting name:" + Constants.EXTENDED_STATUS + " value: " + Constants.EXTENDED_STATUS_DEFAULT);
        SettingsDao.getInstance().setSetting(Constants.EXTENDED_STATUS, Constants.EXTENDED_STATUS_DEFAULT);

        log.trace("Setting name:" + Constants.THEME + " value: " + Constants.DEFAULT_THEME);
        SettingsDao.getInstance().setSetting(Constants.THEME, Constants.DEFAULT_THEME);

        log.trace("resetting history buffer");
        SettingsDao.getInstance().setSetting(Constants.HISTORY_BUFFER, Constants.DEFAULT_HISTORY_BUFFER);

        log.trace("resetting history retention");
        SettingsDao.getInstance().setSetting(Constants.HISTORY_RETENTION, Constants.DEFAULT_HISTORY_RETENTION);
    }
}
