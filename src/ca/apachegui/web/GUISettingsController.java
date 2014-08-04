package ca.apachegui.web;

import java.io.IOException;
import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ca.apachegui.db.JdbcConnection;
import ca.apachegui.db.Settings;
import ca.apachegui.db.Users;
import ca.apachegui.global.Constants;
import ca.apachegui.server.ServerInfo;

@RestController
@RequestMapping("/GUISettings")
public class GUISettingsController {
	private static Logger log = Logger.getLogger(GUISettingsController.class);

	@RequestMapping(value="/Current",method=RequestMethod.GET,produces="application/json;charset=UTF-8")
	public String getGUISettings() throws IOException, InterruptedException {
		
		JSONObject result = new JSONObject();
		result.put("identifier", "id");
		result.put("label", "name");
		
		JSONArray items = new JSONArray();
		
		items.put(createJSON(Constants.serverRoot,"Server Root",Settings.getSetting(Constants.serverRoot)));
		items.put(createJSON(Constants.confDirectory,"Configuration Directory",Settings.getSetting(Constants.confDirectory)));
		items.put(createJSON(Constants.confFile,"Configuration File",Settings.getSetting(Constants.confFile)));
		items.put(createJSON(Constants.logDirectory,"Logs Directory",Settings.getSetting(Constants.logDirectory)));
		items.put(createJSON(Constants.modulesDirectory,"Modules Directory",Settings.getSetting(Constants.modulesDirectory)));
		items.put(createJSON(Constants.binFile,"Bin File",Settings.getSetting(Constants.binFile)));
		items.put(createJSON(Constants.username,"Username",Users.getUsername()));
		items.put(createJSON(Constants.password,"Password","************"));
		items.put(createJSON(Constants.theme,"Theme",Settings.getSetting(Constants.theme)));
		items.put(createJSON(Constants.encoding,"Document Encoding","UTF-8"));
		
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
	
	@RequestMapping(method=RequestMethod.POST,params="option=newServer",produces="application/json;charset=UTF-8")
	public String newServer() throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException {
	
		JdbcConnection.clearDatabase();
		log.trace("Database Cleared");
		
		JSONObject result = new JSONObject();
		result.put("result", "success");
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=getServerInfo",produces="text/plain;charset=UTF-8")
	public String getServerInfo() throws IOException, InterruptedException {
	
		return ServerInfo.getServerInfo(null).replaceAll(Constants.newLine, "<br/>");
	}


}
