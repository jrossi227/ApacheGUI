package ca.apachegui.web;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.global.Utils;
import apache.conf.parser.EnclosureParser;
import ca.apachegui.conf.ConfFiles;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.AvailableModuleHandler;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;
import ca.apachegui.server.ExtendedRunningProcess;
import ca.apachegui.server.ExtendedServerInfo;
import ca.apachegui.server.ExtendedStatus;
import ca.apachegui.server.RunningProcess;
import ca.apachegui.server.ServerInfo;


@RestController
@RequestMapping("/web/Control")
public class ControlController {
	private static Logger log = Logger.getLogger(ControlController.class);
       
	@RequestMapping(method=RequestMethod.GET,params="option=extendedRunningProcesses",produces="application/json;charset=UTF-8")
	public String extendedRunningProcesses() throws Exception{
	
		boolean running = false;
		try {
			running=ca.apachegui.server.Control.isServerRunning();
		} 
		catch (Exception e) {
			log.error("Process command: " + Constants.runningProcessName + " not found!!");
		}
		
		JSONObject result = new JSONObject();
		result.put("identifier", "id");
		result.put("label", "name");
		
		JSONArray items = new JSONArray();
		
		log.trace("getting extended process info");
	
		if(SettingsDao.getInstance().getSetting(Constants.extendedStatus).equals("on")  && running)
		{
			ExtendedRunningProcess processes[]=ExtendedRunningProcess.getExtendedRunningProcessInfo();
			
			if(processes == null) {
				throw new Exception("Extended running process information is not available. Please make sure the following url is available " + ExtendedStatus.getExtendedStatusURL());
			}
			
			JSONObject item;
			for(int i=0; i<processes.length; i++)
			{
				item = new JSONObject();
				item.put("id", "extended" + i + processes[i].getPid());
				item.put("extendedPid", processes[i].getPid());
				item.put("extendedRequests", processes[i].getRequests());
				if(!Utils.isWindows()) {
					item.put("extendedCpu", processes[i].getCpu());
				}
				item.put("extendedTimeSinceLastRequest", processes[i].getTimeSinceLastRequest());
				item.put("extendedTimeToProcessLastRequest", processes[i].getTimeToProcessLastRequest());
				item.put("extendedMegaBytesThisConnection", processes[i].getMegaBytesThisConnection());
				item.put("extendedClient", processes[i].getClient());
				item.put("extendedVirtualHost", processes[i].getVirtualHost());
				item.put("extendedRequest", processes[i].getRequest());
				
				items.put(item);
			}
		}
	
		result.put("items", items);
		
		return result.toString();
	}
	
	//return extended server Info here
	@RequestMapping(method=RequestMethod.GET,params="option=extendedServerInfo",produces="application/json;charset=UTF-8")
	public String extendedServerInfo() throws Exception {

		boolean running = false;
		try {
			running=ca.apachegui.server.Control.isServerRunning();
		} 
		catch (Exception e) {
			log.error("Process command: " + Constants.runningProcessName + " not found!!");
		}
		
		JSONObject result = new JSONObject();
		result.put("totalRequests", "");
		result.put("totalKB", "");
		result.put("cpuUsage", "");
		result.put("upTime", "");
		result.put("requestsPerSecond", "");
		result.put("bytesPerSecond", "");
		result.put("bytesPerRequest", "");
		result.put("busyWorkers", "");
		result.put("idleWorkers", "");
		
		if(SettingsDao.getInstance().getSetting(Constants.extendedStatus).equals("on") && running)
		{
			ExtendedServerInfo extendedServerInfo = ExtendedServerInfo.getExtendedServerInfo();

			if(extendedServerInfo == null) {
				throw new Exception("Extended server information is not available. Please make sure the following url is available " + ExtendedStatus.getExtendedStatusURL());
			}
			
			result.put("totalRequests", extendedServerInfo.getTotalRequests());
			result.put("totalKB", extendedServerInfo.getTotalKB());
			if(!Utils.isWindows()) {
				result.put("cpuUsage", extendedServerInfo.getCpuUsage());
			}
			
			result.put("upTime", extendedServerInfo.getUpTime());
			result.put("requestsPerSecond", extendedServerInfo.getRequestsPerSecond());
			result.put("bytesPerSecond", extendedServerInfo.getBytesPerSecond());
			result.put("bytesPerRequest", extendedServerInfo.getBytesPerRequest());
			result.put("busyWorkers", extendedServerInfo.getBusyWorkers());
			result.put("idleWorkers", extendedServerInfo.getIdleWorkers());	
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=runningProcesses",produces="application/json;charset=UTF-8")
	public String runningProcesses() throws Exception {
	
		
		log.trace("getting process info");
		RunningProcess processes[] = RunningProcess.getRunningProcessInfo(Constants.runningProcessName);
	
		JSONObject result = new JSONObject();
		result.put("identifier", "id");
		result.put("label", "name");
		
		JSONArray items = new JSONArray();
		
		JSONObject item;
		if(processes.length>0)
		{
			for(int i=0; i< processes.length; i++)
			{
				item = new JSONObject();
				item.put("id", processes[i].getPid());
				item.put("uid", processes[i].getUid());
				item.put("pid", processes[i].getPid());
				item.put("ppid", processes[i].getPpid());
				item.put("cpuTime", processes[i].getCpuTime());
				item.put("command", processes[i].getCommand());
				
				items.put(item);
			}	
		}
		else 
		{
			item = new JSONObject();
			item.put("id", "");
			item.put("uid", "");
			item.put("pid", "");
			item.put("ppid", "");
			item.put("cpuTime", "");
			item.put("command", "");
			items.put(item);
		}
		
		result.put("items", items);
		
		return result.toString();
		
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=isServerRunning",produces="application/json;charset=UTF-8")
	public String isServerRunning() throws Exception {
			
		boolean result = false;
		if(ca.apachegui.server.Control.isServerRunning()) {
			result = true;
		}	
			
		JSONObject resultJSON = new JSONObject();
		resultJSON.put("result", result);
		
		return resultJSON.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=checkProcessCommand",produces="application/json;charset=UTF-8")
	public String checkProcessCommand() throws Exception {
		
		JSONObject resultJSON = new JSONObject();
		try 
		{
			log.trace("checking " + Constants.processInfoCommand);
			ca.apachegui.server.Control.isServerRunning();
			
			log.trace("checking " + Constants.processKillCommand);
			RunningProcess.killProcess("9999999999");
			
			resultJSON.put("result", "success");
		} 
		catch (Exception e) 
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
			
			throw new Exception(Constants.processInfoCommandAdivsory);
		}
		
		return resultJSON.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=updateProcessInfo",produces="application/json;charset=UTF-8")
	public String updateProcessInfo(@RequestParam(value="processInfoRefreshRate") String processInfoRefreshRate,
									@RequestParam(value="off") String off) {
		log.trace("processInfoRefreshRate " + processInfoRefreshRate);
		log.trace("off " + off);
		
		JSONObject result = new JSONObject();
		if(off.equals("true") || processInfoRefreshRate.equals("0")) 
		{
			log.trace("off is true setting processInfoRefreshRate to 0");
			SettingsDao.getInstance().setSetting(Constants.processInfoRefreshRate, "0");
			result.put("result", 0);
		}
		else 
		{
			log.trace("Setting processInfoRefreshRate to " + processInfoRefreshRate);
			SettingsDao.getInstance().setSetting(Constants.processInfoRefreshRate, processInfoRefreshRate);
			result.put("result", processInfoRefreshRate);
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=updateExtendedStatus",produces="application/json;charset=UTF-8")
	public String updateExtendedStatus(@RequestParam(value="extendedStatus") String on) throws Exception {
		JSONObject result = new JSONObject();
		
		try
		{
			String currentExtendedStatus=SettingsDao.getInstance().getSetting(Constants.extendedStatus);
			
			boolean change=false;
			if((on.equals("true") && currentExtendedStatus.equals("off")) || (on.equals("false") && currentExtendedStatus.equals("on"))) {
				change=true;
			}
			
			if(on.equals("true") && currentExtendedStatus.equals("off"))
			{
				if(ExtendedStatus.checkExtendedStatusRestart())
				{
					//Comment out existing mod_status logic
					new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).deleteEnclosure("IfModule", "mod_status\\.c");
					
					//Load the module if it isn't loaded
					if(!ExtendedStatus.isExtendedStatusModuleLoaded()) {
						SharedModuleHandler.installModule(Constants.ServerStatusModuleName);
					}
					
					//the handler isnt set
					if(!ExtendedStatus.checkExtendedStatusEnclosure() && ExtendedStatus.checkExtendedStatusDirective())
					{	
						if(ServerInfo.isTwoPointTwo(SettingsDao.getInstance().getSetting(Constants.binFile))) {
							ConfFiles.appendToGUIConfigFile(Constants.extendedStatusEnclosureTwoPointTwo);	
						} else {
							ConfFiles.appendToGUIConfigFile(Constants.extendedStatusEnclosureTwoPointFour);	
						}
					}
					//the extended status directive isnt set
					else if(ExtendedStatus.checkExtendedStatusEnclosure() && !ExtendedStatus.checkExtendedStatusDirective())
					{	
						ConfFiles.deleteFromConfigFiles(Constants.extendedStatusDirectiveString, false);
						ConfFiles.appendToGUIConfigFile(Constants.extendedStatusDirective);	
					}
					//both the handler isnt set and extended status isnt set
					else
					{
						ConfFiles.deleteFromConfigFiles(Constants.extendedStatusDirectiveString, false);
						if(ServerInfo.isTwoPointTwo(SettingsDao.getInstance().getSetting(Constants.binFile))) {
							ConfFiles.appendToGUIConfigFile(Constants.extendedStatusEnclosureTwoPointTwo);	
						} else {
							ConfFiles.appendToGUIConfigFile(Constants.extendedStatusEnclosureTwoPointFour);	
						}
						ConfFiles.appendToGUIConfigFile(Constants.extendedStatusDirective);
					}
					if(ca.apachegui.server.Control.isServerRunning())
					{	
						ca.apachegui.server.Control.restartServer();
						if(!ca.apachegui.server.Control.isServerRunning())
						{
							throw new Exception("The server could not restart");
						}
					}
				}
				SettingsDao.getInstance().setSetting(Constants.extendedStatus,"on");
				result.put("result", "on");
				result.put("change", change);
			}
			if(on.equals("false") && currentExtendedStatus.equals("on"))
			{
				SettingsDao.getInstance().setSetting(Constants.extendedStatus,"off");
				result.put("result", "off");
				result.put("change", change);
			}
			if(on.equals("false") && currentExtendedStatus.equals("off"))
			{
				result.put("result", "off");
				result.put("change", change);
			}
			if(on.equals("true") && currentExtendedStatus.equals("on"))
			{
				result.put("result", "on");
				result.put("change", change);
			}
		}
		catch (Exception e) 
		{
			log.error(e.getMessage(), e);
			throw new Exception("There was an error while trying to modify extended status: " + e.getMessage());
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=checkExtendedStatusModule",produces="application/json;charset=UTF-8")
	public String checkExtendedStatusModule() throws Exception {
		
		JSONObject result = new JSONObject();
		
		try
		{
			boolean isExtendedStatusModuleLoaded = ExtendedStatus.isExtendedStatusModuleLoaded();
			boolean isExtendedStatusModuleAvailable = AvailableModuleHandler.exists(Constants.ServerStatusModuleName);
			
			boolean isLoaded = true;
			if(!isExtendedStatusModuleLoaded && !isExtendedStatusModuleAvailable) {
				isLoaded = false;
			} 
			
			result.put("result", isLoaded);
		}
		catch (Exception e) 
		{
			log.error(e.getMessage(), e);
			throw new Exception("There was an error while trying to retrieve extended process info"); 
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=checkExtendedStatusRestart",produces="application/json;charset=UTF-8")
	public String checkExtendedStatusRestart() throws Exception {
		
		JSONObject result = new JSONObject();
		
		try
		{
			boolean checkRestartRequired = ExtendedStatus.checkExtendedStatusRestart();
			result.put("result", checkRestartRequired);
		}
		catch (Exception e) 
		{
			log.error(e.getMessage(), e);
			throw new Exception("There was an error while trying to retrieve extended process info"); 
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=killProcess",produces="application/json;charset=UTF-8")
	public String killProcess(@RequestParam(value="pid") String pid) throws Exception {
		JSONObject result = new JSONObject();
		try 
		{
			RunningProcess.killProcess(pid);
			result.put("result", "success");
		}
		catch (Exception e) 
		{ 
			log.error(e.getMessage(), e);
			throw new Exception("There was an error while trying to kill the process");
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=startServer",produces="application/json;charset=UTF-8")
	public String startServer() throws Exception {
		JSONObject result = new JSONObject();
		
		String error = "";
		try
		{
			error=ca.apachegui.server.Control.startServer();
			if(!ca.apachegui.server.Control.isServerRunning())
			{
				if(Utils.isWindows()) {
					throw new Exception("The server could not start. Have you installed Apache as a service?");				
				} else {
					throw new Exception("The server could not start");
				}
			}
			result.put("result", "success");
		}
		catch(Exception e)
		{
			log.error(e.getMessage(), e);
			throw new Exception("There was an error while trying to start the server: " + error + " " + e.getMessage()); 
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=restartServer",produces="application/json;charset=UTF-8")
	public String restartServer() throws Exception {
		JSONObject result = new JSONObject();
		
		String error="";
		try
		{
			error=ca.apachegui.server.Control.restartServer();
			if(!ca.apachegui.server.Control.isServerRunning())
			{
				throw new Exception("The server could not restart");
			}
			result.put("result", "success");
		}
		catch(Exception e)
		{
			log.error(e.getMessage(), e);
			throw new Exception("There was an error while trying to restart the server: " + error + " " + e.getMessage());  
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=stopServer",produces="application/json;charset=UTF-8")
	public String stopServer() throws Exception {
		JSONObject result = new JSONObject();
		
		String error="";
		try
		{
			error=ca.apachegui.server.Control.stopServer();
			long i=0;
			//lets wait up to 10 seconds for the server to stop
			boolean stopped=true;
			while(ca.apachegui.server.Control.isServerRunning())
			{
				Thread.sleep(1000);
				i+=1000;
				if(i>=Constants.stopServerWaitTime)
				{	
					stopped=false;
					break;
				}	
			}
			if(!stopped) {
				throw new Exception("There was an error when stopping the server");
			}
			
			result.put("result", "success");
		}
		catch(Exception e)
		{
			log.error(e.getMessage(), e);
			throw new Exception("There was an error while stopping the server: " + error + " " + e.getMessage());  
		}
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=isExtendedStatusEnabled",produces="application/json;charset=UTF-8")
	public String isExtendedStatusEnabled() throws Exception {
		JSONObject result = new JSONObject();
		
		String extendedStatus=SettingsDao.getInstance().getSetting(Constants.extendedStatus);
		if(extendedStatus.equals("on")) {
			result.put("result", true);
		}
		if(extendedStatus.equals("off")) {
			result.put("result", false);
		}
	
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=getRefreshRate",produces="application/json;charset=UTF-8")
	public String getRefreshRate() throws Exception {
		JSONObject result = new JSONObject();
					
		result.put("result", SettingsDao.getInstance().getSetting(Constants.processInfoRefreshRate));
			
		return result.toString();	
	}
	
}
