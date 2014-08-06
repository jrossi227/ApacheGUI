package ca.apachegui.web;

import apache.conf.parser.File;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;

@RestController
@RequestMapping("/Main")
public class MainController {
	
	@RequestMapping(method=RequestMethod.GET,params="option=confFilePath",produces="application/json;charset=UTF-8")
	public String confFilePath() {
		
		JSONObject result = new JSONObject();
		
		result.put("file", SettingsDao.getInstance().getSetting(Constants.confDirectory));
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=docFilePath",produces="application/json;charset=UTF-8")
	public String docFilePath() {
		
		JSONObject result = new JSONObject();
		
		result.put("file", Utilities.getFileSystemDrive());
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=logFilePath",produces="application/json;charset=UTF-8")
	public String logFilePath() {
		
		JSONObject result = new JSONObject();
		
		result.put("file", SettingsDao.getInstance().getSetting(Constants.logDirectory));
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=validateFileExists",produces="application/json;charset=UTF-8")
	public String validateFileExists(@RequestParam(value="filename") String filename) {
		
		JSONObject result = new JSONObject();
		
		result.put("exists", (new File(filename)).exists());
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=lastModifiedTime",produces="application/json;charset=UTF-8")
	public String lastModifiedTime(@RequestParam(value="path") String path) {
		
		JSONObject result = new JSONObject();
				
		File file = new File(path);
		long lastModifiedTime = -1;
		if(file.exists()) {
			lastModifiedTime = file.lastModified();
		}
		
		result.put("time", Long.toString(lastModifiedTime));		
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=checkSession",produces="text/plain;charset=UTF-8")
	public String checkSession() {
		
		return "active";
	}

}
