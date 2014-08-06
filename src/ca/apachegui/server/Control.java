package ca.apachegui.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;

import org.apache.log4j.Logger;

import apache.conf.global.Utils;

import ca.apachegui.conf.Configuration;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;

public class Control {
	private static Logger log = Logger.getLogger(Control.class);
	
	/**
	 * Method used to start Apache.
	 * 
	 * @return the OS output from starting apache.
	 * @throws IOException
	 * @throws InterruptedException
	 */
	public static String startServer() throws IOException, InterruptedException
	{
		log.trace("RunningProcess.startServer called");
		
		String command[]=Utils.isWindows() ? ("cmd,/c," + SettingsDao.getInstance().getSetting(Constants.binFile) + ",-k,start").split(",") : (SettingsDao.getInstance().getSetting(Constants.binFile) +",start").split(",");
		
		String output=Utils.RunProcessWithOutput(command);
		log.trace("Output " + output);
		StringBuffer buffer = new StringBuffer();
		BufferedReader reader = new BufferedReader(new StringReader(output));
		
		String line;
		while ((line = reader.readLine()) != null) 
		{
			log.trace(line);
			buffer.append(line + "<br/>");
		}
		reader.close();
		
		log.trace("Apache Started");
		return buffer.toString();
	}
	
	
	/**
	 * Method used to restart Apache.
	 * 
	 * @return the OS output from restarting apache.
	 * @throws IOException
	 * @throws InterruptedException
	 */
	public static String restartServer() throws Exception
	{
		log.trace("RunningProcess.restartServer called");
		
		log.trace("Checking the server configuration before restarting");
		String status=Configuration.testServerConfiguration();
		if(!status.matches(".*(?i:syntax ok).*")) {
			throw new Exception("The server was not restarted. There is an error with the configuration " + status);
		}
		
		String command[]=Utils.isWindows() ? ("cmd,/c," + SettingsDao.getInstance().getSetting(Constants.binFile) + ",-k,restart").split(",") : (SettingsDao.getInstance().getSetting(Constants.binFile) +",restart").split(",");
		
		String output=Utils.RunProcessWithOutput(command);
		log.trace("Output " + output);
		StringBuffer buffer = new StringBuffer();
		BufferedReader reader = new BufferedReader(new StringReader(output));
		
		String line;
		while ((line = reader.readLine()) != null) 
		{
			log.trace(line);
			buffer.append(line + "<br/>");
		}
		reader.close();
		
		log.trace("Apache restarted"); 
		return buffer.toString();
	}
	
	/**
	 * Method used to stop Apache.
	 * 
	 * @return the OS output from stopping apache.
	 * @throws IOException
	 * @throws InterruptedException
	 */
	public static String stopServer() throws Exception
	{
		log.trace("RunningProcess.stopServer called");
		String command[]=Utils.isWindows() ? ("cmd,/c," + SettingsDao.getInstance().getSetting(Constants.binFile) + ",-k,stop").split(",") : (SettingsDao.getInstance().getSetting(Constants.binFile) +",stop").split(",");
		
		String output=Utils.RunProcessWithOutput(command);
		log.trace("Output " + output);
		StringBuffer buffer = new StringBuffer();
		BufferedReader reader = new BufferedReader(new StringReader(output));
		
		String line;
		while ((line = reader.readLine()) != null) 
		{
			log.trace(line);
			buffer.append(line + "<br/>");
		}
		reader.close();
		
		log.trace("Apache stopped"); 
		return buffer.toString();
	}
	
	/**
	 * 
	 * @return a boolean indicating if apache is running.
	 * @throws Exception
	 */
	public static boolean isServerRunning() throws Exception
	{
		return RunningProcess.isProcessRunning(Constants.runningProcessName);
	}

}
