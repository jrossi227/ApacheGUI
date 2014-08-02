package ca.apachegui.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.AvailableModuleHandler;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;
import ca.apachegui.server.ExtendedRunningProcess;
import ca.apachegui.server.ExtendedServerInfo;
import ca.apachegui.server.ExtendedStatus;
import ca.apachegui.server.RunningProcess;
import ca.apachegui.server.ServerInfo;

/**
 * Servlet implementation class Control
 */
@RestController
@RequestMapping("/Control")
public class Control extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Control.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Control() {
        super();
        // TODO Auto-generated constructor stub 
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.trace("Control.doPost called");
		String option=request.getParameter("option");
		log.trace("POST: option called: " + option);
		
		if(option.equals("killProcess"))
		{
			PrintWriter out=response.getWriter();
			try 
			{
				String pid=request.getParameter("pid");
				RunningProcess.killProcess(pid);
				
				out.print("{result: \"success\"}");
			}
			catch (Exception e) 
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print("{result:\"There was an error while trying to kill the process\"}"); 
			}
		}
		
		//Check if mod_status is loaded or available
		if(option.equals("checkExtendedStatusModule"))
		{
			try
			{
				boolean isExtendedStatusModuleLoaded = ExtendedStatus.isExtendedStatusModuleLoaded();
				boolean isExtendedStatusModuleAvailable = AvailableModuleHandler.exists(Constants.ServerStatusModuleName);
				
				PrintWriter out=response.getWriter();
				if(!isExtendedStatusModuleLoaded && !isExtendedStatusModuleAvailable) {
					out.print("{result: false}");
				} else {
					out.print("{result: true}");
				}
			}
			catch (Exception e) 
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				PrintWriter out=response.getWriter();
				out.print("{result:\"There was an error while trying to retrieve extended process info\"}"); 
			}
		}
		
		if(option.equals("checkExtendedStatusRestart"))
		{
			try
			{
				boolean checkRestartRequired = ExtendedStatus.checkExtendedStatusRestart();
				PrintWriter out=response.getWriter();
				if(!checkRestartRequired) {
					out.print("{result: false}");
				} else {
					out.print("{result: true}");
				}	
			}
			catch (Exception e) 
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				PrintWriter out=response.getWriter();
				out.print("{result:\"There was an error while trying to retrieve extended process info\"}"); 
			}
		}
		
		if(option.equals("updateExtendedStatus"))
		{
			try
			{
				String on = request.getParameter("extendedStatus");
				String currentExtendedStatus=Settings.getSetting(Constants.extendedStatus);
				
				boolean change=false;
				if((on.equals("true") && currentExtendedStatus.equals("off")) || (on.equals("false") && currentExtendedStatus.equals("on")))
				{
					change=true;
				}
				
				PrintWriter out = response.getWriter();
				if(on.equals("true") && currentExtendedStatus.equals("off"))
				{
					if(ExtendedStatus.checkExtendedStatusRestart())
					{
						//Comment out existing mod_status logic
						new EnclosureParser(Settings.getSetting(Constants.confFile), Settings.getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).deleteEnclosure("IfModule", "mod_status\\.c");
						
						//Load the module if it isn't loaded
						if(!ExtendedStatus.isExtendedStatusModuleLoaded()) {
							SharedModuleHandler.installModule(Constants.ServerStatusModuleName);
						}
						
						//the handler isnt set
						if(!ExtendedStatus.checkExtendedStatusEnclosure() && ExtendedStatus.checkExtendedStatusDirective())
						{	
							if(ServerInfo.isTwoPointTwo(Settings.getSetting(Constants.binFile))) {
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
							if(ServerInfo.isTwoPointTwo(Settings.getSetting(Constants.binFile))) {
								ConfFiles.appendToGUIConfigFile(Constants.extendedStatusEnclosureTwoPointTwo);	
							} else {
								ConfFiles.appendToGUIConfigFile(Constants.extendedStatusEnclosureTwoPointFour);	
							}
							ConfFiles.appendToGUIConfigFile(Constants.extendedStatusDirective);
						}
						if(ca.apachegui.server.Control.isServerRunning())
						{	
							String error="";
							try
							{
								error=ca.apachegui.server.Control.restartServer();
								if(!ca.apachegui.server.Control.isServerRunning())
								{
									throw new Exception("The server could not restart");
								}
							}
							catch(Exception e)
							{
								StringWriter sw = new StringWriter();
								e.printStackTrace(new PrintWriter(sw));
								log.error(sw.toString());
								response.setStatus(206);
								out.print("{result:\"There was an error while trying to restart the server: " + error.replace("\"", "\\\"") + e.getMessage().replace("\"", "\\\"") + "\"}"); 
							}
						}
					}
					Settings.setSetting(Constants.extendedStatus,"on");
					out.print("{result: \"on\", change:" + change + "}");
				}
				if(on.equals("false") && currentExtendedStatus.equals("on"))
				{
					Settings.setSetting(Constants.extendedStatus,"off");
					out.print("{result: \"off\", change:" + change + "}");
				}
				if(on.equals("false") && currentExtendedStatus.equals("off"))
				{
					out.print("{result: \"off\", change:" + change + "}");
				}
				if(on.equals("true") && currentExtendedStatus.equals("on"))
				{
					out.print("{result: \"on\", change:" + change + "}");
				}
			}
			catch (Exception e) 
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				PrintWriter out=response.getWriter();
				out.print("{result:\"There was an error while trying to modify extended status\"}"); 
			}
		}
		if(option.equals("startServer"))
		{
			String error="";
			PrintWriter out=response.getWriter();
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
				out.print("{result: \"success\"}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print("{result:\"There was an error while trying to start the server: " + error.replace("\"", "\\\"") + e.getMessage().replace("\"", "\\\"") + "\"}"); 
			}
		}
		
		if(option.equals("restartServer"))
		{
			String error="";
			PrintWriter out=response.getWriter();
			try
			{
				error=ca.apachegui.server.Control.restartServer();
				if(!ca.apachegui.server.Control.isServerRunning())
				{
					throw new Exception("The server could not restart");
				}
				out.print("{result: \"success\"}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print("{result:\"There was an error while trying to restart the server: " + error.replace("\"", "\\\"") + e.getMessage().replace("\"", "\\\"") + "\"}"); 
			}
		}
		
		if(option.equals("stopServer"))
		{
			String error="";
			PrintWriter out=response.getWriter();
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
				
				out.print("{result: \"success\"}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print("{result:\"There was an error while stopping the server: " + error.replace("\"", "\\\"") + e.getMessage().replace("\"", "\\\"") + "\"}"); 
			}
		}
		
		if(option.equals("isExtendedStatusEnabled"))
		{
			String error="";
			try
			{
				String extendedStatus=Settings.getSetting(Constants.extendedStatus);
				PrintWriter out=response.getWriter();
				if(extendedStatus.equals("on"))
				{
					out.print("{result: true}");
				}
				if(extendedStatus.equals("off"))
				{
					out.print("{result: false}");
				}
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				PrintWriter out=response.getWriter();
				out.print("{result:\"There was an error with the server\"}"); 
			}
		}
		
		if(option.equals("getRefreshRate"))
		{
			try
			{
				PrintWriter out=response.getWriter();
				
				out.print("{result: " + Settings.getSetting(Constants.processInfoRefreshRate) + "}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				PrintWriter out=response.getWriter();
				out.print("{result:\"There was an error with the server\"}"); 
			}
		}
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=extendedRunningProcesses",produces="application/json;charset=UTF-8")
	public String extendedRunningProcesses(){
	
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
		try 
		{ 
			log.trace("getting extended process info");
		
			if(Settings.getSetting(Constants.extendedStatus).equals("on")  && running)
			{
				ExtendedRunningProcess processes[]=ExtendedRunningProcess.getExtendedRunningProcessInfo();
				
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
		}
		catch(Exception e){
			log.error(e.getMessage(), e);
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
		
		if(Settings.getSetting(Constants.extendedStatus).equals("on") && running)
		{
			try
			{
				ExtendedServerInfo extendedServerInfo = ExtendedServerInfo.getExtendedServerInfo();

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
			catch(Exception e)
			{
				log.error(e.getMessage(), e);
			}
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
			Settings.setSetting(Constants.processInfoRefreshRate, "0");
			result.put("result", 0);
		}
		else 
		{
			log.trace("Setting processInfoRefreshRate to " + processInfoRefreshRate);
			Settings.setSetting(Constants.processInfoRefreshRate, processInfoRefreshRate);
			result.put("result", processInfoRefreshRate);
		}
		
		return result.toString();
	}
}
