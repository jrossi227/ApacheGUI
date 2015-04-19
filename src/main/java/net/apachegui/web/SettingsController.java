package net.apachegui.web;

import apache.conf.parser.File;
import net.apachegui.db.UsersDao;
import net.apachegui.global.Constants;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web/Settings")
public class SettingsController {
    private static Logger log = Logger.getLogger(SettingsController.class);

    @RequestMapping(method = RequestMethod.GET, params = "option=getAllSettingsNames", produces = "application/json;charset=UTF-8")
    public String getAllSettingsNames() {

        JSONObject result = new JSONObject();
        result.put("init", Constants.INIT);
        result.put("confDirectory", Constants.CONF_DIRECTORY);
        result.put("confFile", Constants.CONF_FILE);
        result.put("serverRoot", Constants.SERVER_ROOT);
        result.put("logDirectory", Constants.LOG_DIRECTORY);
        result.put("modulesDirectory", Constants.MODULES_DIRECTORY);
        result.put("binFile", Constants.BIN_FILE);
        result.put("username", Constants.USERNAME);
        result.put("password", Constants.PASSWORD);
        result.put("processsInfoRefreshRate", Constants.PROCESS_INFO_REFRESH_RATE);
        result.put("extendedStatus", Constants.EXTENDED_STATUS);
        result.put("historyRetention", Constants.HISTORY_RETENTION);
        result.put("historyBuffer", Constants.HISTORY_BUFFER);
        result.put("theme", Constants.THEME);
        result.put("editorTheme", Constants.EDITOR_THEME);
        result.put("showTabs", Constants.SHOW_TABS);
        result.put("encoding", Constants.ENCODING);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=getSetting", produces = "application/json;charset=UTF-8")
    public String getSetting(@RequestParam(value = "name") String name) {

        String value = "";
        if (name.equals(Constants.USERNAME)) {
            value = UsersDao.getInstance().getUsername();
        } else {
            value = net.apachegui.db.SettingsDao.getInstance().getSetting(name);
        }

        value = (value == null ? "" : value);

        JSONObject result = new JSONObject();
        result.put("value", value);

        return result.toString();

    }

    @RequestMapping(method = RequestMethod.POST, params = "option=setSetting", produces = "application/json;charset=UTF-8")
    public String setSetting(@RequestParam(value = "name") String name, @RequestParam(value = "value") String value) throws Exception {

        value = value.trim();

        if (name.equals(Constants.SERVER_ROOT)) {
            if (value.endsWith("/")) {
                value = value.substring(0, value.length() - 1);
            }
            log.trace("Setting serverRoot " + value);

            if (!(new File(value).exists())) {
                throw new Exception("The input directory does not exist");
            }

            if (!(new File(value).isDirectory())) {
                throw new Exception("The input directory is not a directory");
            }
            
            value = (new File(value).getAbsolutePath());
        }
        if (name.equals(Constants.CONF_DIRECTORY)) {
            if (value.endsWith("/")) {
                value = value.substring(0, value.length() - 1);
            }
            log.trace("Setting confDirectory " + value);

            if (!(new File(value).exists())) {
                throw new Exception("The input directory does not exist");
            }

            if (!(new File(value).isDirectory())) {
                throw new Exception("The input directory is not a directory");
            }
            
            value = (new File(value).getAbsolutePath());
        }
        if (name.equals(Constants.CONF_FILE)) {
            log.trace("Setting confFile " + value);

            if (!(new File(value).exists())) {
                throw new Exception("The input file does not exist");
            }

            if ((new File(value).isDirectory())) {
                throw new Exception("The input file is a directory");
            }
            
            value = (new File(value).getAbsolutePath());
        }
        if (name.equals(Constants.LOG_DIRECTORY)) {
            if (value.endsWith("/")) {
                value = value.substring(0, value.length() - 1);
            }
            log.trace("Setting logDirectory " + value);

            if (!(new File(value).exists())) {
                throw new Exception("The input directory does not exist");
            }

            if (!(new File(value).isDirectory())) {
                throw new Exception("The input directory is not a directory");
            }
            
            value = (new File(value).getAbsolutePath());
        }
        if (name.equals(Constants.MODULES_DIRECTORY)) {
            if (value.endsWith("/")) {
                value = value.substring(0, value.length() - 1);
            }
            log.trace("Setting modulesDirectory " + value);

            if (!(new File(value).exists())) {
                throw new Exception("The input directory does not exist");
            }

            if (!(new File(value).isDirectory())) {
                throw new Exception("The input directory is not a directory");
            }
            
            value = (new File(value).getAbsolutePath());
        }
        if (name.equals(Constants.BIN_FILE)) {
            log.trace("Setting binFile " + value);

            if (!(new File(value).exists())) {
                throw new Exception("The input file does not exist");
            }

            if ((new File(value).isDirectory())) {
                throw new Exception("The input file is a directory");
            }
            
            value = (new File(value).getAbsolutePath());
        }
        if (name.equals(Constants.HISTORY_RETENTION) || name.equals(Constants.HISTORY_BUFFER)) {
            log.trace("Setting historyRetention/historyBuffer " + value);

            try {
                Integer.parseInt(value);
            } catch (Exception e) {
                throw new Exception("You must input a number");
            }
        }

        if (name.equals(Constants.USERNAME)) {
            UsersDao.getInstance().setUsername(value);
        } else if (name.equals(Constants.PASSWORD)) {
            UsersDao.getInstance().setPassword(value);
        } else if (name.equals(Constants.CONF_FILE)) {
            net.apachegui.db.SettingsDao.getInstance().setSetting(Constants.CONF_FILE, value);
        } else {
            net.apachegui.db.SettingsDao.getInstance().setSetting(name, value);
        }

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

}
