package net.apachegui.web;

import java.io.IOException;
import java.sql.SQLException;

import net.apachegui.db.JdbcConnection;
import net.apachegui.db.SettingsDao;
import net.apachegui.db.UsersDao;
import net.apachegui.global.Constants;
import net.apachegui.server.ServerInfo;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web/GUISettings")
public class GUISettingsController {
    private static Logger log = Logger.getLogger(GUISettingsController.class);

    @RequestMapping(value = "/Current", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String getGUISettings() throws IOException, InterruptedException {

        JSONObject result = new JSONObject();
        result.put("identifier", "id");
        result.put("label", "name");

        JSONArray items = new JSONArray();

        items.put(createJSON(Constants.SERVER_ROOT, "Server Root", SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT)));
        items.put(createJSON(Constants.CONF_DIRECTORY, "Configuration Directory", SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY)));
        items.put(createJSON(Constants.CONF_FILE, "Configuration File", SettingsDao.getInstance().getSetting(Constants.CONF_FILE)));
        items.put(createJSON(Constants.LOG_DIRECTORY, "Logs Directory", SettingsDao.getInstance().getSetting(Constants.LOG_DIRECTORY)));
        items.put(createJSON(Constants.MODULES_DIRECTORY, "Modules Directory", SettingsDao.getInstance().getSetting(Constants.MODULES_DIRECTORY)));
        items.put(createJSON(Constants.BIN_FILE, "Bin File", SettingsDao.getInstance().getSetting(Constants.BIN_FILE)));
        items.put(createJSON(Constants.USERNAME, "Username", UsersDao.getInstance().getUsername()));
        items.put(createJSON(Constants.PASSWORD, "Password", "************"));
        items.put(createJSON(Constants.THEME, "Theme", SettingsDao.getInstance().getSetting(Constants.THEME)));
        items.put(createJSON(Constants.ENCODING, "Document Encoding", "UTF-8"));
        items.put(createJSON(Constants.ENABLE_AUTHENTICATION, "Enable Authentication", SettingsDao.getInstance().getSetting(Constants.ENABLE_AUTHENTICATION)));

        result.put("items", items);

        return result.toString();
    }

    private JSONObject createJSON(String id, String name, String value) {
        JSONObject item = new JSONObject();
        item.put("id", id);
        item.put("name", name);
        item.put("value", value);

        return item;
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=newServer", produces = "application/json;charset=UTF-8")
    public String newServer() throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException {

        JdbcConnection.getInstance().clearAllDatabases();
        log.trace("Database Cleared");

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=getServerInfo", produces = "text/plain;charset=UTF-8")
    public String getServerInfo() throws IOException, InterruptedException {

        return ServerInfo.getServerInfo(null).replaceAll(Constants.NEW_LINE, "<br/>");
    }

}
