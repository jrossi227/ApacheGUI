package ca.apachegui.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

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
@WebServlet("/Control")
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
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.trace("Control.doGet called");
		PrintWriter out = response.getWriter();
		
		String option = request.getParameter("option");
		log.trace("GET: option called: " + option);
		boolean running=false;
		try 
		{
			running=ca.apachegui.server.Control.isServerRunning();
		} 
		catch (Exception e1) 
		{
			log.error("Process command: " + Constants.runningProcessName + " not found!!");
		}
		if(option.equals("runningProcesses"))
		{
			try 
			{ 
				log.trace("getting process info");
				RunningProcess processes[] = RunningProcess.getRunningProcessInfo(Constants.runningProcessName);
			
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				
				if(processes.length>0)
				{
					for(int i=0; i< processes.length; i++)
					{
						out.print("{id:'" + processes[i].getPid() + "', uid:'" + processes[i].getUid() + "', pid:'" + processes[i].getPid() + "',ppid: '" + processes[i].getPpid() + "',cpuTime: '" + processes[i].getCpuTime() + "',command: '" + processes[i].getCommand() + "'}");
						if(i!=(processes.length-1))
							out.print(",");
					}	
				}
				else 
				{
					out.print("{id: '', uid:'', pid: '',ppid: '',cpuTime: '',command: ''}");
				}
				out.println("]}");
			}
			catch(Exception e){
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
			}
		}
		
		//return extended server Info here
		if(option.equals("extendedServerInfo"))
		{
			if(Settings.getSetting(Constants.extendedStatus).equals("on") && running)
			{
				try
				{
					ExtendedServerInfo extendedServerInfo = ExtendedServerInfo.getExtendedServerInfo();
					if(Utils.isWindows()) {
						out.println("{totalRequests:'" + extendedServerInfo.getTotalRequests() + "',totalKB:'" + extendedServerInfo.getTotalKB() + "',upTime:'" + extendedServerInfo.getUpTime() + "',requestsPerSecond:'" + extendedServerInfo.getRequestsPerSecond() + "',bytesPerSecond:'" + extendedServerInfo.getBytesPerSecond() + "',bytesPerRequest:'" + extendedServerInfo.getBytesPerRequest() + "',busyWorkers:'" + extendedServerInfo.getBusyWorkers() + "',idleWorkers:'" + extendedServerInfo.getIdleWorkers() + "'}");
					} else {
						out.println("{totalRequests:'" + extendedServerInfo.getTotalRequests() + "',totalKB:'" + extendedServerInfo.getTotalKB() + "',cpuUsage:'" + extendedServerInfo.getCpuUsage() + "',upTime:'" + extendedServerInfo.getUpTime() + "',requestsPerSecond:'" + extendedServerInfo.getRequestsPerSecond() + "',bytesPerSecond:'" + extendedServerInfo.getBytesPerSecond() + "',bytesPerRequest:'" + extendedServerInfo.getBytesPerRequest() + "',busyWorkers:'" + extendedServerInfo.getBusyWorkers() + "',idleWorkers:'" + extendedServerInfo.getIdleWorkers() + "'}");
					}
				}
				catch(Exception e)
				{
					StringWriter sw = new StringWriter();
					e.printStackTrace(new PrintWriter(sw));
					log.error(sw.toString());
					out.println("{totalRequests:'',totalKB:'',cpuUsage:'',upTime:'',requestsPerSecond:'',bytesPerSecond:'',bytesPerRequest:'',busyWorkers:'',idleWorkers:''}");
				}
			}
			else
			{	
				out.println("{totalRequests:'',totalKB:'',cpuUsage:'',upTime:'',requestsPerSecond:'',bytesPerSecond:'',bytesPerRequest:'',busyWorkers:'',idleWorkers:''}");
			}
		}
		
		//need to format two graphs here
		if(option.equals("extendedRunningProcesses"))
		{
			try 
			{ 
				log.trace("getting extended process info");
			
				//obviously we need advanced scraping techniques here
				if(Settings.getSetting(Constants.extendedStatus).equals("on")  && running)
				{
					ExtendedRunningProcess processes[]=ExtendedRunningProcess.getExtendedRunningProcessInfo();
					
					out.println("{");
					out.println(	"identifier: 'id', ");
					out.println(	"label: 'name', ");
					out.println(	"items: [");
					if(processes.length>0)
					{	
						for(int i=0; i<processes.length; i++)
						{
							if(Utils.isWindows()) {
								out.print("{id: 'extended" + i + processes[i].getPid() + "', extendedPid: '" + processes[i].getPid() + "',extendedRequests: '" + processes[i].getRequests() + "',extendedTimeSinceLastRequest: '" + processes[i].getTimeSinceLastRequest() + "',extendedTimeToProcessLastRequest: '" + processes[i].getTimeToProcessLastRequest() + "',extendedMegaBytesThisConnection: '" + processes[i].getMegaBytesThisConnection() + "',extendedClient: '" + processes[i].getClient() + "',extendedVirtualHost: '" + processes[i].getVirtualHost() + "',extendedRequest: '" + processes[i].getRequest() + "' }");							
							} else {
								out.print("{id: 'extended" + i + processes[i].getPid() + "', extendedPid: '" + processes[i].getPid() + "',extendedRequests: '" + processes[i].getRequests() + "',extendedCpu: '" + processes[i].getCpu() + "',extendedTimeSinceLastRequest: '" + processes[i].getTimeSinceLastRequest() + "',extendedTimeToProcessLastRequest: '" + processes[i].getTimeToProcessLastRequest() + "',extendedMegaBytesThisConnection: '" + processes[i].getMegaBytesThisConnection() + "',extendedClient: '" + processes[i].getClient() + "',extendedVirtualHost: '" + processes[i].getVirtualHost() + "',extendedRequest: '" + processes[i].getRequest() + "' }");
							}
							if(i!=(processes.length-1))
								out.print(",");
						}
					}	
					out.println("]}");
				}
				else
				{	
					out.println("{");
					out.println(	"identifier: 'id', ");
					out.println(	"label: 'name', ");
					out.println(	"items: [");
					//out.print("{id: 'N/A', extendedPid: 'N/A',extendedRequests: 'N/A',extendedCpu: 'N/A',extendedTimeSinceLastRequest: 'N/A',extendedTimeToProcessLastRequest: 'N/A',extendedMegaBytesThisConnection: 'N/A',extendedClient: 'N/A',extendedVirtualHost: 'N/A',extendedRequest: 'N/A' }");
					out.println("]}");
				}
			}
			catch(Exception e){
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.trace("Control.doPost called");
		String option=request.getParameter("option");
		log.trace("POST: option called: " + option);
		if(option.equals("isServerRunning")) 
		{
			PrintWriter out=response.getWriter();
			try 
			{
				if(ca.apachegui.server.Control.isServerRunning()) {
					out.print("{result: true}");
				}	
				else {
					out.print("{result: false}");
				}
			} 
			catch (Exception e) 
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print("{result:\"" + Constants.processInfoCommandAdivsory + "\"}"); 
			}
		}
		
		if(option.equals("checkProcessCommand")) 
		{
			PrintWriter out=response.getWriter();
			try 
			{
				log.trace("checking " + Constants.processInfoCommand);
				ca.apachegui.server.Control.isServerRunning();
				
				log.trace("checking " + Constants.processKillCommand);
				RunningProcess.killProcess("9999999999");
				
				out.print("{result: \"success\"}");
			} 
			catch (Exception e) 
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print("{result:\"" + Constants.processInfoCommandAdivsory + "\"}"); 
			}
		}
		
		if(option.equals("updateProcessInfo")) 
		{
			String processInfoRefreshRate=request.getParameter("processInfoRefreshRate");
			log.trace("processInfoRefreshRate " + processInfoRefreshRate);
			
			String off=request.getParameter("off");
			log.trace("off " + off);
			
			PrintWriter out = response.getWriter();
			
			if(off.equals("true") || processInfoRefreshRate.equals("0")) 
			{
				log.trace("off is true setting processInfoRefreshRate to 0");
				Settings.setSetting(Constants.processInfoRefreshRate, "0");
				//out.print("{result: \"(Refresh Off)\"}");
				out.print("{result: 0}");
			}
			else 
			{
				log.trace("Setting processInfoRefreshRate to " + processInfoRefreshRate);
				Settings.setSetting(Constants.processInfoRefreshRate, processInfoRefreshRate);
				//out.print("{result: \"(Refresh " + processInfoRefreshRate + " Seconds)\"}");
				out.print("{result: " + processInfoRefreshRate + "}");
			}
		}
		
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

}
