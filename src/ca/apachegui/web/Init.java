package ca.apachegui.web;


import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import ca.apachegui.conf.ConfFiles;
import ca.apachegui.db.JdbcConnection;
import ca.apachegui.db.Settings;
import ca.apachegui.db.Users;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;
import ca.apachegui.server.ServerInfo;

/**
 * Servlet implementation class Init
 */
@WebServlet("/Init")
public class Init extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Init.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Init() {
        super();
    }

    /**
	 * Check if this is the first time use
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 * @return 500 if its the first time use, return 200 if the database is initialized
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		/**
		 * 500 indicates first time use
		 * 200 indicates the settings have been initialized
		 */
		log.trace("Init.doGet called");
		String init=Settings.getSetting("init");
		log.trace("init value " + init);
		if(init==null)
		{	
			log.trace("Sending 206 response");
			response.setStatus(206);
		}
		else
		{	
			log.trace("Sending 200 response");
			response.setStatus(200);
		}	
		response.setContentLength(0);
	}

	/**
	 * General functionality to initialize GUI
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.trace("Init.doPost called");
		String option=request.getParameter("option");
		log.trace("Init Servlet called with option " + option);
		
		StringBuffer error = new StringBuffer();
		PrintWriter out = response.getWriter();
		try
		{
			if(option.equals("submitSource"))
			{
				String serverRoot=request.getParameter("serverRoot").trim().replaceAll("\\\\", "/");
				if(serverRoot.endsWith("/"))
				{
					serverRoot=serverRoot.substring(0,serverRoot.length()-1);
				}
				log.trace("serverRoot " + serverRoot);
				
				if(!(new File(serverRoot).exists())) {
					throw new Exception("The Server Root directory " + serverRoot + " does not exist");
				}
					
				if(!(new File(serverRoot)).isDirectory()) {
					throw new Exception("The Server Root is not a directory");
				}
				
				if(Utils.isWindows() && !serverRoot.contains(":")) {
					throw new Exception("The Server Root must specify the drive eg. C:/");
				}
				
				String username=request.getParameter("username");
				log.trace("username " + username);
				
				String password1=request.getParameter("password1");
				String password2=request.getParameter("password2");
				
				if(!password1.equals(password2)) {
					throw new Exception("The input passwords do not match");
				}
				
				initializeDatabaseSource(serverRoot, username, password1);
			}
			
			if(option.equals("submitPackage"))
			{	  
				String serverRoot=request.getParameter("serverRoot").trim().replaceAll("\\\\", "/");
				if(serverRoot.endsWith("/"))
				{
					serverRoot=serverRoot.substring(0,serverRoot.length()-1);
				}
				log.trace("serverRoot " + serverRoot);
				
				if(!(new File(serverRoot).exists())) {
					throw new Exception("The Directory " + serverRoot + " does not exist");
				}
					
				String confFile=request.getParameter("confFile").trim().replaceAll("\\\\", "/");
				log.trace("confFile " + confFile);
				
				if(!(new File(confFile).exists())) {
					throw new Exception("The Configuration File " + confFile + " does not exist");
				}
				
				if((new File(confFile)).isDirectory()) {
					throw new Exception("The Configuration File " + confFile + " is a directory");
				}
				
				String confDirectory=request.getParameter("confDirectory").trim().replaceAll("\\\\", "/");
				if(confDirectory.endsWith("/"))
				{
					confDirectory=confDirectory.substring(0,confDirectory.length()-1);
				}
				log.trace("confDirectory " + confDirectory);
				
				if(!(new File(confDirectory).exists())) {
					throw new Exception("The Directory " + confDirectory + " does not exist");
				}
				
				if(!(new File(confDirectory)).isDirectory()) {
					throw new Exception("The Directory " + confDirectory + " is not a directory");
				}
				
				String logDirectory=request.getParameter("logDirectory").trim().replaceAll("\\\\", "/");
				if(logDirectory.endsWith("/"))
				{
					logDirectory=logDirectory.substring(0,logDirectory.length()-1);
				}
				log.trace("logDirectory " + logDirectory);
				
				if(!(new File(logDirectory).exists())) {
					throw new Exception("The Log Directory " + logDirectory + " does not exist");
				}
				
				if(!(new File(logDirectory)).isDirectory()) {
					throw new Exception("The Log Directory " + logDirectory + " is not a directory");
				}
				
				String modulesDirectory=request.getParameter("modulesDirectory").trim().replaceAll("\\\\", "/");
				if(modulesDirectory.endsWith("/"))
				{
					modulesDirectory=modulesDirectory.substring(0,modulesDirectory.length()-1);
				}
				log.trace("modulesDirectory " + modulesDirectory);
				
				if(!(new File(modulesDirectory).exists())) {
					throw new Exception("The modules Directory " + modulesDirectory + " does not exist");
				}
				
				if(!(new File(modulesDirectory)).isDirectory()) {
					throw new Exception("The Directory " + modulesDirectory + " is not a directory");
				}
				
				String binFile=request.getParameter("binFile").trim().replaceAll("\\\\", "/");
				log.trace("binFile " + binFile);
				
				if(!(new File(binFile).exists())) {
					throw new Exception("The Binary File " + binFile + " does not exist");
				}
				
				if((new File(binFile)).isDirectory()) {
					throw new Exception("The Binary File " + binFile + " is a directory");
				}
				
				String username=request.getParameter("username");
				log.trace("username " + username);
				
				String password1=request.getParameter("password1");
				String password2=request.getParameter("password2");
				
				if(!password1.equals(password2)) {
					throw new Exception("The input passwords do not match");
				}
				
				initializeDatabasePackage(serverRoot, confFile, confDirectory, logDirectory, modulesDirectory, binFile, username, password1);
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
			error.append(e.getMessage());
			response.setStatus(206);
			out.print(error.toString());
			out.flush();
		}
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
		JdbcConnection.clearDatabase();
		
		log.trace("Setting name:" + Constants.init + " value: true");
		Settings.setSetting(Constants.init, "true");
		
		log.trace("Setting name:" + Constants.serverRoot + " value: " + serverRoot);
		Settings.setSetting(Constants.serverRoot, serverRoot);
		
		log.trace("Setting name:" + Constants.username + " value: " + username);
		Users.setUsername(username);
		
		log.trace("Setting name:" + Constants.password + " value: XXXXX");
		Users.setPassword(password);
		
		log.trace("Setting name:" + Constants.confDirectory + " value: " + confDirectory);
		Settings.setSetting(Constants.confDirectory, confDirectory);
		
		log.trace("Setting name:" + Constants.confFile + " value: " + confFile);
		Settings.setSetting(Constants.confFile, confFile);
		
		log.trace("Setting name:" + Constants.logDirectory + " value: " + logDirectory);
		Settings.setSetting(Constants.logDirectory, logDirectory);
		
		log.trace("Setting name:" + Constants.modulesDirectory + " value: " + modulesDirectory);
		Settings.setSetting(Constants.modulesDirectory, modulesDirectory);
		
		log.trace("Setting name:" + Constants.binFile + " value: " + binFile);
		Settings.setSetting(Constants.binFile, binFile);
		
		log.trace("Setting name:" + Constants.processInfoRefreshRate + " value: " + Constants.processInfoRefreshRateDefault);
		Settings.setSetting(Constants.processInfoRefreshRate, Constants.processInfoRefreshRateDefault);
		
		log.trace("Setting name:" + Constants.extendedStatus + " value: " + Constants.extendedStatusDefault);
		Settings.setSetting(Constants.extendedStatus, Constants.extendedStatusDefault);
		
		log.trace("Setting name:" + Constants.theme + " value: " + Constants.defaultTheme);
		Settings.setSetting(Constants.theme, Constants.defaultTheme);
		
		log.trace("resetting history buffer");
		Settings.setSetting(Constants.historyBuffer, Constants.defaultHistoryBuffer);
		
		log.trace("resetting history retention");
		Settings.setSetting(Constants.historyRetention, Constants.defaultHistoryRetention);
	
		if(Utils.isWindows()) {
			//Setting SRVROOT Variable to entered Server Root
			String files[] = ConfFiles.getFullConfFileList();
			for(int i=0; i< files.length; i++) {
				new DirectiveParser(Settings.getSetting(Constants.confFile), Settings.getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).setDirectiveInFile(Constants.defineDirective, files[i], Constants.serverRootDirectiveValue + " \"" + serverRoot + "\"", Constants.serverRootDirectiveValue, false);
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
		JdbcConnection.clearDatabase();
		
		log.trace("Setting name:" + Constants.init + " value: true");
		Settings.setSetting(Constants.init, "true");
		
		log.trace("Setting name:" + Constants.serverRoot + " value: " + serverRoot);
		Settings.setSetting(Constants.serverRoot, serverRoot);
		
		log.trace("Setting name:" + Constants.username + " value: " + username);
		Users.setUsername(username);
		
		log.trace("Setting name:" + Constants.password + " value: XXXXX");
		Users.setPassword(password);
		
		log.trace("Setting name:" + Constants.confDirectory + " value: " + confDirectory);
		Settings.setSetting(Constants.confDirectory, confDirectory);
		
		log.trace("Setting name:" + Constants.confFile + " value: " + confFile);
		Settings.setSetting(Constants.confFile, confFile);
		
		log.trace("Setting name:" + Constants.logDirectory + " value: " + logDirectory);
		Settings.setSetting(Constants.logDirectory, logDirectory);
		
		log.trace("Setting name:" + Constants.modulesDirectory + " value: " + modulesDirectory);
		Settings.setSetting(Constants.modulesDirectory, modulesDirectory);
		
		log.trace("Setting name:" + Constants.binFile + " value: " + binFile);
		Settings.setSetting(Constants.binFile, binFile);
		
		log.trace("Setting name:" + Constants.processInfoRefreshRate + " value: " + Constants.processInfoRefreshRateDefault);
		Settings.setSetting(Constants.processInfoRefreshRate, Constants.processInfoRefreshRateDefault);
		
		log.trace("Setting name:" + Constants.extendedStatus + " value: " + Constants.extendedStatusDefault);
		Settings.setSetting(Constants.extendedStatus, Constants.extendedStatusDefault);
		
		log.trace("Setting name:" + Constants.theme + " value: " + Constants.defaultTheme);
		Settings.setSetting(Constants.theme, Constants.defaultTheme);
		
		log.trace("resetting history buffer");
		Settings.setSetting(Constants.historyBuffer, Constants.defaultHistoryBuffer);
		
		log.trace("resetting history retention");
		Settings.setSetting(Constants.historyRetention, Constants.defaultHistoryRetention);
	}
}
