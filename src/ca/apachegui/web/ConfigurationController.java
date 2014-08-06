package ca.apachegui.web;

import apache.conf.global.Utils;
import apache.conf.parser.File;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.parser.Parser;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

@RestController
@RequestMapping("/Configuration")
public class ConfigurationController {
	private static Logger log = Logger.getLogger(ConfigurationController.class);
       
	@RequestMapping(method=RequestMethod.GET,params="option=test",produces="application/json;charset=UTF-8")
	public String testConfiguration() throws Exception {
		
		String result=ca.apachegui.conf.Configuration.testServerConfiguration();
		log.trace("Result of test: " + result);
		
		JSONObject resultJSON = new JSONObject();
		resultJSON.put("result", result);
		
		return resultJSON.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=activeFileList",produces="application/json;charset=UTF-8")
	public String getActiveFileList() throws Exception {
		
		String rootConfFile = SettingsDao.getInstance().getSetting(Constants.confFile);
		
		String activeFileList[]=new Parser(rootConfFile, SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getActiveConfFileList();
		Arrays.sort(activeFileList);
		
		JSONArray files = new JSONArray();
		for(int i=0; i<activeFileList.length; i++)
		{
			files.put(activeFileList[i]);	
		}
		
		JSONObject result = new JSONObject();
		result.put("files", files);
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=save",produces="application/json;charset=UTF-8")
	public String saveConfiguration(@RequestParam(value="content") String content,
									@RequestParam(value="path") String path) 
											throws Exception {
		
		log.trace("content " + content);
		log.trace("path " + path);
		
		File file = new File(path);
		FileUtils.write(file, content, Charset.forName("UTF-8"), false);
		
		long modifiedTime = -1;
		modifiedTime = file.lastModified();
		
		log.trace("Checking the server configuration after saving.");
		String status=ca.apachegui.conf.Configuration.testServerConfiguration();
		log.trace("Status: " + status);
		
		Pattern pattern=Pattern.compile("Syntax OK", Pattern.CASE_INSENSITIVE);
		java.util.regex.Matcher patternMatcher = pattern.matcher(status); 
		if(!patternMatcher.find()) {
			throw new Exception("The save generated a configuration error: " + status);
		} else {
			SharedModuleHandler.updateSharedModules();
		}
		
		JSONObject result = new JSONObject();
		result.put("result", "The save was a success!");
		result.put("time", Long.toString(modifiedTime));
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=getFileAsString",produces="text/plain;charset=UTF-8")
	public String getConfigurationFileAsString(@RequestParam(value="file") String path) throws Exception {
		
		String fileText="";
		File file = new File(path);
		try
		{
			if(file.length() < Constants.maximumDocumentFilesize) {
				fileText=Utils.readFileAsString(file,Charset.forName("UTF-8"));
			} else {
				fileText="The Document is too large to render. The document must be less than " + Constants.maximumDocumentFilesize + " Bytes";
			}
		}
		catch(Exception e)
		{
			fileText="File Not Found!!";
		}
		
		return fileText;
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=search",produces="application/json;charset=UTF-8")
	public String searchConfiguration(@RequestParam(value="filter") String filter,
									  @RequestParam(value="activeFilesFilter") Boolean activeFilesFilter,
									  @RequestParam(value="commentsFilter") Boolean commentsFilter) 
											throws Exception {
		
		log.trace("filter: " + filter);
		JSONArray results=ca.apachegui.conf.Configuration.searchConfiguration(filter,activeFilesFilter,commentsFilter);
		
		JSONObject result = new JSONObject();
		result.put("maxResults", Integer.toString(Constants.maximumConfigurationSearchResults));
		result.put("results", results);
		
		return result.toString();
	}
	

}
