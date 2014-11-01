package ca.apachegui.web;


import java.util.regex.Pattern;

import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.File;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.apachegui.conf.ConfFiles;
import ca.apachegui.db.JdbcConnection;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.db.UsersDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;
import ca.apachegui.server.ServerInfo;

@RestController
@RequestMapping("/web/Init")
public class InitController {
	private static Logger log = Logger.getLogger(InitController.class);
       
	@RequestMapping(value="/CheckFirstTime",method=RequestMethod.GET,produces="application/json;charset=UTF-8")
	public String checkInit() {
		
		String init=SettingsDao.getInstance().getSetting("init");
		log.trace("init value " + init);
		
		JSONObject result = new JSONObject();
		result.put("firstTime", (init == null ? true : false));
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=submitSource",produces="application/json;charset=UTF-8")
	public String submitSource(@RequestParam(value="serverRoot") String serverRoot,
					      	   @RequestParam(value="username") String username,
					      	   @RequestParam(value="password1") String password1,
					      	   @RequestParam(value="password2") String password2) throws Exception {
		
		log.trace("serverRoot " + serverRoot);
		
		File serverRootFile = new File(serverRoot.trim());
		
		if(!(serverRootFile.exists())) {
			throw new Exception("The Server Root directory " + serverRoot + " does not exist");
		}
			
		if(!serverRootFile.isDirectory()) {
			throw new Exception("The Server Root is not a directory");
		}
		
		if(Utils.isWindows() && !serverRoot.contains(":")) {
			throw new Exception("The Server Root must specify the drive eg. C:/");
		}
		
		log.trace("username " + username);
		
		if(!password1.equals(password2)) {
			throw new Exception("The input passwords do not match");
		}
		
		initializeDatabaseSource(serverRootFile.getAbsolutePath(), username, password1);
		
		JSONObject result = new JSONObject();
		result.put("result", "success");
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=submitPackage",produces="application/json;charset=UTF-8")
	public String submitPackage(@RequestParam(value="serverRoot") String serverRoot,
								@RequestParam(value="confFile") String confFile,
								@RequestParam(value="confDirectory") String confDirectory,
								@RequestParam(value="logDirectory") String logDirectory,
								@RequestParam(value="modulesDirectory") String modulesDirectory,
								@RequestParam(value="binFile") String binFile,
					      	    @RequestParam(value="username") String username,
					      	    @RequestParam(value="password1") String password1,
					      	    @RequestParam(value="password2") String password2) throws Exception {
		
		
		log.trace("serverRoot " + serverRoot);
		File serverRootFile = new File(serverRoot.trim());
		
		if(!(serverRootFile.exists())) {
			throw new Exception("The Server Root directory " + serverRoot + " does not exist");
		}
			
		if(!serverRootFile.isDirectory()) {
			throw new Exception("The Server Root is not a directory");
		}
		
		if(Utils.isWindows() && !serverRoot.contains(":")) {
			throw new Exception("The Server Root must specify the drive eg. C:/");
		}
			
		log.trace("confFile " + confFile);
		File confFileFile = new File(confFile.trim());
		
		if(!confFileFile.exists()) {
			throw new Exception("The Configuration File " + confFile + " does not exist");
		}
		
		if(confFileFile.isDirectory()) {
			throw new Exception("The Configuration File " + confFile + " is a directory");
		}
		
		log.trace("confDirectory " + confDirectory);
		File confDirectoryFile = new File(confDirectory.trim());
		
		if(!confDirectoryFile.exists()) {
			throw new Exception("The Directory " + confDirectory + " does not exist");
		}
		
		if(!confDirectoryFile.isDirectory()) {
			throw new Exception("The Directory " + confDirectory + " is not a directory");
		}
		
		log.trace("logDirectory " + logDirectory);
		File logDirectoryFile = new File(logDirectory.trim());
		
		if(!logDirectoryFile.exists()) {
			throw new Exception("The Log Directory " + logDirectory + " does not exist");
		}
		
		if(!logDirectoryFile.isDirectory()) {
			throw new Exception("The Log Directory " + logDirectory + " is not a directory");
		}
		
		log.trace("modulesDirectory " + modulesDirectory);
		File modulesDirectoryFile = new File(modulesDirectory.trim());
		
		if(!modulesDirectoryFile.exists()) {
			throw new Exception("The modules Directory " + modulesDirectory + " does not exist");
		}
		
		if(!modulesDirectoryFile.isDirectory()) {
			throw new Exception("The Directory " + modulesDirectory + " is not a directory");
		}
		
		log.trace("binFile " + binFile);
		File binFileFile = new File(binFile.trim());
		
		if(!binFileFile.exists()) {
			throw new Exception("The Binary File " + binFile + " does not exist");
		}
		
		if(binFileFile.isDirectory()) {
			throw new Exception("The Binary File " + binFile + " is a directory");
		}
		
		log.trace("username " + username);		
		
		if(!password1.equals(password2)) {
			throw new Exception("The input passwords do not match");
		}
		
		initializeDatabasePackage(serverRootFile.getAbsolutePath(), 
								  confFileFile.getAbsolutePath(), 
								  confDirectoryFile.getAbsolutePath(), 
								  logDirectoryFile.getAbsolutePath(), 
								  modulesDirectoryFile.getAbsolutePath(), 
								  binFileFile.getAbsolutePath(), 
								  username, 
								  password1);
		
		JSONObject result = new JSONObject();
		result.put("result", "success");
		
		return result.toString();
	}
	
	private void initializeDatabaseSource(String serverRoot, String username, String password) throws Exception
	{
		log.trace("Init.initializeDatabaseSource called");
		log.trace("Initializing the database with source parameters ");
			
		File confDirectoryFile=new File(serverRoot,Constants.shortConfDirectory);
		if(!confDirectoryFile.exists()) {
			throw new Exception("We are unable to find the Apache " + Constants.shortConfDirectory + " directory under " + serverRoot + " please verify that your Server Root is correct");
		}
		
		String confDirectory=confDirectoryFile.getAbsolutePath();
		log.trace("confDirectory " + confDirectory);
		
		File confFileHandle=new File(confDirectory,Constants.shortConfFile);
		if(!confFileHandle.exists()) {
			throw new Exception("We are unable to find " + Constants.shortConfFile + " under " + confDirectory + " please verify your apache layout");
		}
		
		String confFile=confFileHandle.getAbsolutePath();
		log.trace("confFile " + confFile);
		
		File logDirectoryFile=new File(serverRoot,Constants.shortLogDirectory);
		if(!logDirectoryFile.exists()) {
			throw new Exception("We are unable to find the Apache " + Constants.shortLogDirectory + " directory under " + serverRoot + " please verify that your Server Root is correct");
		}
		
		String logDirectory=logDirectoryFile.getAbsolutePath();
		log.trace("logDirectory " + logDirectory);
		
		File modulesDirectoryFile=new File(serverRoot,Constants.shortModulesDirectory);
		if(!modulesDirectoryFile.exists()) {
			throw new Exception("We are unable to find the Apache " + Constants.shortModulesDirectory + " directory under " + serverRoot + " please verify that your Server Root is correct");
		}
		
		String modulesDirectory=modulesDirectoryFile.getAbsolutePath();
		log.trace("modulesDirectory " + modulesDirectory);
		
		File binDirectoryFile=new File(serverRoot,Constants.shortBinDirectory);
		if(!binDirectoryFile.exists()) {
			throw new Exception("We are unable to find the Apache " + Constants.shortBinDirectory + " directory under " + serverRoot + " please verify that your Server Root is correct");
		}
			
		String binDirectory=binDirectoryFile.getAbsolutePath();
		log.trace("binDirectory " + binDirectory);
		
		File binFileHandle=new File(binDirectory,Constants.shortBinFile);
		if(!binFileHandle.exists()) {
			throw new Exception("We are unable to find " + Constants.shortBinFile + " under " + binDirectory + " please verify your apache layout");
		}
		
		String binFile=binFileHandle.getAbsolutePath();
		log.trace("binFile " + binFile);
		
		try {
			if(!ServerInfo.isSupported(binFile)) {
				throw new Exception("");
			}
		}
		catch(Exception e) {
			throw new Exception("This version of apache does not appear to be supported. Supported versions include " + Constants.versionSupportedString + ".");
		}
		
		log.info("Clearing the database");
		JdbcConnection.getInstance().clearDatabase();
		
		log.trace("Setting name:" + Constants.init + " value: true");
		SettingsDao.getInstance().setSetting(Constants.init, "true");
		
		log.trace("Setting name:" + Constants.serverRoot + " value: " + serverRoot);
		SettingsDao.getInstance().setSetting(Constants.serverRoot, serverRoot);
		
		log.trace("Setting name:" + Constants.username + " value: " + username);
		UsersDao.getInstance().setUsername(username);
		
		log.trace("Setting name:" + Constants.password + " value: XXXXX");
		UsersDao.getInstance().setPassword(password);
		
		log.trace("Setting name:" + Constants.confDirectory + " value: " + confDirectory);
		SettingsDao.getInstance().setSetting(Constants.confDirectory, confDirectory);
		
		log.trace("Setting name:" + Constants.confFile + " value: " + confFile);
		SettingsDao.getInstance().setSetting(Constants.confFile, confFile);
		
		log.trace("Setting name:" + Constants.logDirectory + " value: " + logDirectory);
		SettingsDao.getInstance().setSetting(Constants.logDirectory, logDirectory);
		
		log.trace("Setting name:" + Constants.modulesDirectory + " value: " + modulesDirectory);
		SettingsDao.getInstance().setSetting(Constants.modulesDirectory, modulesDirectory);
		
		log.trace("Setting name:" + Constants.binFile + " value: " + binFile);
		SettingsDao.getInstance().setSetting(Constants.binFile, binFile);
		
		log.trace("Setting name:" + Constants.processInfoRefreshRate + " value: " + Constants.processInfoRefreshRateDefault);
		SettingsDao.getInstance().setSetting(Constants.processInfoRefreshRate, Constants.processInfoRefreshRateDefault);
		
		log.trace("Setting name:" + Constants.extendedStatus + " value: " + Constants.extendedStatusDefault);
		SettingsDao.getInstance().setSetting(Constants.extendedStatus, Constants.extendedStatusDefault);
		
		log.trace("Setting name:" + Constants.theme + " value: " + Constants.defaultTheme);
		SettingsDao.getInstance().setSetting(Constants.theme, Constants.defaultTheme);
		
		log.trace("resetting history buffer");
		SettingsDao.getInstance().setSetting(Constants.historyBuffer, Constants.defaultHistoryBuffer);
		
		log.trace("resetting history retention");
		SettingsDao.getInstance().setSetting(Constants.historyRetention, Constants.defaultHistoryRetention);
	
		if(Utils.isWindows()) {
			//Setting SRVROOT Variable to entered Server Root
			String files[] = ConfFiles.getFullConfFileList();
			for(int i=0; i< files.length; i++) {
				new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).setDirectiveInFile(Constants.defineDirective, files[i], Constants.serverRootDirectiveValue + " \"" + serverRoot + "\"", Pattern.compile(Constants.serverRootDirectiveValue), false, false);
			}
		}
	}
	
	private void initializeDatabasePackage(String serverRoot, String confFile, String confDirectory, String logDirectory, String modulesDirectory, String binFile, String username, String password) throws Exception
	{
		log.trace("Init.initializeDatabasePackage called");
		log.trace("Initializing the database with package parameters ");
		
		try {
			if(!ServerInfo.isSupported(binFile)) {
				throw new Exception("");
			}
		}
		catch(Exception e) {
			throw new Exception("This version of apache does not appear to be supported. Supported versions include " + Constants.versionSupportedString + ".");
		}
		
		log.info("Clearing the database");
		JdbcConnection.getInstance().clearDatabase();
		
		log.trace("Setting name:" + Constants.init + " value: true");
		SettingsDao.getInstance().setSetting(Constants.init, "true");
		
		log.trace("Setting name:" + Constants.serverRoot + " value: " + serverRoot);
		SettingsDao.getInstance().setSetting(Constants.serverRoot, serverRoot);
		
		log.trace("Setting name:" + Constants.username + " value: " + username);
		UsersDao.getInstance().setUsername(username);
		
		log.trace("Setting name:" + Constants.password + " value: XXXXX");
		UsersDao.getInstance().setPassword(password);
		
		log.trace("Setting name:" + Constants.confDirectory + " value: " + confDirectory);
		SettingsDao.getInstance().setSetting(Constants.confDirectory, confDirectory);
		
		log.trace("Setting name:" + Constants.confFile + " value: " + confFile);
		SettingsDao.getInstance().setSetting(Constants.confFile, confFile);
		
		log.trace("Setting name:" + Constants.logDirectory + " value: " + logDirectory);
		SettingsDao.getInstance().setSetting(Constants.logDirectory, logDirectory);
		
		log.trace("Setting name:" + Constants.modulesDirectory + " value: " + modulesDirectory);
		SettingsDao.getInstance().setSetting(Constants.modulesDirectory, modulesDirectory);
		
		log.trace("Setting name:" + Constants.binFile + " value: " + binFile);
		SettingsDao.getInstance().setSetting(Constants.binFile, binFile);
		
		log.trace("Setting name:" + Constants.processInfoRefreshRate + " value: " + Constants.processInfoRefreshRateDefault);
		SettingsDao.getInstance().setSetting(Constants.processInfoRefreshRate, Constants.processInfoRefreshRateDefault);
		
		log.trace("Setting name:" + Constants.extendedStatus + " value: " + Constants.extendedStatusDefault);
		SettingsDao.getInstance().setSetting(Constants.extendedStatus, Constants.extendedStatusDefault);
		
		log.trace("Setting name:" + Constants.theme + " value: " + Constants.defaultTheme);
		SettingsDao.getInstance().setSetting(Constants.theme, Constants.defaultTheme);
		
		log.trace("resetting history buffer");
		SettingsDao.getInstance().setSetting(Constants.historyBuffer, Constants.defaultHistoryBuffer);
		
		log.trace("resetting history retention");
		SettingsDao.getInstance().setSetting(Constants.historyRetention, Constants.defaultHistoryRetention);
	}
}
