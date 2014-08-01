package ca.apachegui.server;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.ArrayList;

import org.apache.log4j.Logger;

import apache.conf.global.Utils;

import ca.apachegui.global.Constants;

/** Class to handle basic running process information that can be obtained with ps*/
public class RunningProcess {
	private static Logger log = Logger.getLogger(RunningProcess.class);
	
	private String uid;
	private String pid;
	private String ppid;
	private String cpuTime;
	private String command;
	
	public RunningProcess (String uid, String pid, String ppid, String cpuTime, String command)
	{
		this.uid=uid;
		this.pid=pid;
		this.ppid=ppid;
		this.cpuTime=cpuTime;
		this.command=command;
	}
	
	/**
	 * Method to grab OS specific process information for apache.
	 * 
	 * @param serviceName - the name of the running process 
	 * @return an array with process information
	 * @throws Exception
	 */
	public static RunningProcess[]  getRunningProcessInfo(String serviceName) throws Exception {		 
		log.trace("RunningProcess.getRunningProcessInfo called");
		log.trace("getRunningProcessInfo called with serviceName " + serviceName); 
		String output=Utils.RunProcessWithOutput(Constants.processInfoCommand);
		log.trace("Output " + output);
		BufferedReader reader = new BufferedReader(new StringReader(output));
	
		ArrayList<RunningProcess> processes = new ArrayList<RunningProcess>();

		String line;
		while ((line = reader.readLine()) != null) 
		{
			if (line.matches(serviceName)) 
			{
				log.trace("Service found with parameters " + line); 
				if(Utils.isWindows()) {
					processes.add(scrapeWindows(line));
				} else {
					processes.add(scrape(line));
				}
			}
		}
		reader.close();
		
		return processes.toArray(new RunningProcess[processes.size()]);
	}
	
	/**
	 * Method to tell if a particular process is running. The method checks against the list of running processes from the OS.
	 * 
	 * @param serviceName - the name of the running process 
	 * @return a boolean indicating if the process is running
	 * @throws Exception
	 */
	public static boolean isProcessRunning(String serviceName) throws Exception 
	{
		 log.trace("RunningProcess.isProcessRunning called");
		 log.trace("isProcessRunning called with serviceName " + serviceName); 
		 String output=Utils.RunProcessWithOutput(Constants.processInfoCommand);
		 log.trace("Output " + output);
		 BufferedReader reader = new BufferedReader(new StringReader(output));
		  
		 String line;
		 while ((line = reader.readLine()) != null) 
		 {
			 if (line.matches(serviceName)) 
			 {
				 log.trace("Service found returning true"); 
				 return true;
			 }
		 }
		 
		 reader.close();
		 
		 log.trace("Service not found returning false"); 
		 return false;
	}
	
	/**
	 * Method to kill an OS process
	 * 
	 * @param pid - the process id of process to kill 
	 * @throws Exception if the processInfoCommand is not found on the operating system
	*/ 
	public static void killProcess(String pid) throws Exception 
	{
		log.trace("RunningProcess.killProcess called");
		log.trace("killing process with pid " + pid); 
		
		String command[] = (Constants.processKillCommand + pid).split(" ");
		Utils.RunProcessWithoutOutput(command);
		log.trace("Process killed!"); 
	}
	
	private static RunningProcess scrape(String processInfo)
	{
		log.trace("RunningProcess.scrape called");
		log.trace("Scraping " + processInfo);
		
		String modifiedInfo=Utils.sanitizeLineSpaces(processInfo).replaceAll(" +", "@@");
		log.trace("Replaced spaces with @@ " + modifiedInfo);
		
		String values[] = modifiedInfo.split("@@");
		log.trace("uid " + values[0]);
		log.trace("pid " + values[1]);
		log.trace("ppid " + values[2]);
		log.trace("cpuTime " + values[3]);
		
		String command="";
		for(int i=4; i<values.length; i++) {
			command=command + values[i] + " ";
		}
		command=command.trim();
		log.trace("command " + command);
		
		RunningProcess process = new RunningProcess(values[0],values[1],values[2],values[3],command);
		return process;
	}
	
	private static RunningProcess scrapeWindows(String processInfo)
	{
		log.trace("RunningProcess.scrape called");
		log.trace("Scraping " + processInfo);
		
		String values[] = processInfo.split("\",\"");
		
		//clear any additional quotes
		for(int i=0; i<values.length; i++) 
		{
			values[i]=values[i].replaceAll("\"","");
		}
		
		log.trace("uid " + values[6]);
		log.trace("pid " + values[1]);
		log.trace("ppid " + values[1]);
		log.trace("cpuTime " + values[7]);
		log.trace("command " + values[0]);
		RunningProcess process = new RunningProcess(values[6],values[1],values[1],values[7],values[0]);
		return process;
	}
	
	public String getUid()
	{
		log.trace("getUid returning " + uid);
		return uid;
	}
	
	public String getPid()
	{
		log.trace("getPid returning " + pid);
		return pid;
	}
	
	public String getPpid()
	{
		log.trace("getPpid returning " + ppid);
		return ppid;
	}
	
	public String getCpuTime()
	{
		log.trace("getCpuTime returning " + cpuTime);
		return cpuTime;
	}
	
	public String getCommand()
	{
		log.trace("getCommand returning " + command);
		return command;
	}
}
