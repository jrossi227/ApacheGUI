package ca.apachegui.history;

import java.util.ArrayList;

import javax.servlet.ServletContext;

import apache.conf.global.Utils;
import apache.conf.parser.Directive;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.File;
import ca.apachegui.conf.ConfFiles;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;
import ca.apachegui.globaldirectives.CustomLog;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;
import ca.apachegui.virtualhosts.VirtualHost;
import ca.apachegui.virtualhosts.VirtualHosts;

/**
 * 
 * @author jonathan
 * Write the following config to the file
 * LogFormat "%h\",\"%{User-agent}i\",\"%r\",\"%>s\",\"%B" apacheguilogholder
 * CustomLog "|java -jar \"[TOMCAT_HOME]/bin/LogParser.jar\" \"[TOMCAT_HOME]/conf/server.xml\"" apacheguilogholder
 */

public class History 
{
	/**
	 * Method used to check if history is enabled.
	 * 
	 * @return boolean indicating if history is enabled.
	 * @throws Exception
	 */
	public static boolean checkIfEnabled() throws Exception
	{
		return ConfFiles.searchActiveConfigFiles(Constants.historyLogHolder);
	} 
	
	/**
	 * Method used to enable history.
	 * 
	 * @throws Exception
	 */
	public static void enable(ServletContext context) throws Exception
	{
		if(checkIfEnabled())
			return;
		
		File cat = new File(Utilities.getTomcatInstallDirectory());
		File java = new File(Utilities.getJavaHome(),"bin/java" + (Utils.isWindows() ? ".exe" : ""));
		
		String includeString = "#This section is written by the apache gui do not manually edit " + Constants.historyLogHolder + Constants.newLine +
							   "LogFormat \"%h\\\",\\\"%{User-agent}i\\\",\\\"%r\\\",\\\"%>s\\\",\\\"%B\" " + Constants.historyLogHolder + Constants.newLine;
		
		includeString += "CustomLog \"|\\\"" + java.getAbsolutePath() + "\\\" -jar \\\"" + (new File(cat, "bin/LogParser.jar")).getAbsolutePath() + "\\\" \\\"" + (new File(cat, "conf/server.xml")).getAbsolutePath() + "\\\"\" " + Constants.historyLogHolder + Constants.newLine;
		
		//Search for access.log and insert after access.log
		DirectiveParser parser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());
		boolean inserted = parser.insertDirectiveBeforeOrAfterFirstFound(Constants.customLogDirectiveString, includeString, "(.*/access.log.*|.*\\access.log.*|.*/access_log.*|.*\\access_log.*)", false, true);
		
		if(!inserted) {
			ConfFiles.appendToGUIConfigFile(includeString);
		}
	}
	
	/**
	 * Method used to disable history.
	 * 
	 * @throws Exception
	 */
	public static void disable() throws Exception
	{
		if(!checkIfEnabled())
			return;
		
		ConfFiles.deleteFromConfigFiles(".*" + Constants.historyLogHolder + ".*", true);
		
	}
	
	public static boolean getGlobalEnable() throws Exception {
		
		CustomLog customLogs[] = CustomLog.getAllCustomLogs();
		for(CustomLog customLog : customLogs) {
			if(customLog.getFormatOrNickname().equals(Constants.historyLogHolder)) {
				return true;
			}
		}
		
		return false;
	}
	
	/**
	 * Function to grab the hosts that are enabled and do contain their own CustomLog 
	 * 
	 * @return
	 * @throws Exception
	 */
	public static VirtualHost[] getEnabledHosts() throws Exception {
				
		VirtualHost virtualHosts[] = VirtualHosts.getAllVirtualHosts();
		
		ArrayList<VirtualHost> enabledVirtualHosts = new ArrayList<VirtualHost>();
		
		Directive directives[];
		String values[];
		
		OUTER:
		for(VirtualHost virtualHost : virtualHosts) {
			directives = virtualHost.getDirectives();
			
			for(Directive directive : directives) {
				if(directive.getType().equals(Constants.customLogDirective)) {
					values = directive.getValues();
					for(String value: values) {
						if(value.equals(Constants.historyLogHolder)) {
							enabledVirtualHosts.add(virtualHost);
							
							break OUTER;
						}
					}
				}
			}
		}
		
		return enabledVirtualHosts.toArray(new VirtualHost[enabledVirtualHosts.size()]);
	}
	
	/**
	 * Function to grab the hosts that are disabled and do contain their own CustomLog 
	 * 
	 * @return
	 * @throws Exception
	 */
	public static VirtualHost[] getDisabledHosts() throws Exception {
				
		VirtualHost virtualHosts[] = VirtualHosts.getAllVirtualHosts();
		
		ArrayList<VirtualHost> disabledVirtualHosts = new ArrayList<VirtualHost>();
		
		Directive directives[];
		String values[];
		
		boolean containsCustomLog = false;
		
		OUTER:
		for(VirtualHost virtualHost : virtualHosts) {
			containsCustomLog = false;
			directives = virtualHost.getDirectives();
			
			for(Directive directive : directives) {
				if(directive.getType().equals(Constants.customLogDirective)) {
					containsCustomLog = true;
					
					values = directive.getValues();
					for(String value: values) {
						if(value.equals(Constants.historyLogHolder)) {
							break OUTER;
						}
					}
				}
			}
			
			if(containsCustomLog) {
				disabledVirtualHosts.add(virtualHost);
			}
		}
		
		return disabledVirtualHosts.toArray(new VirtualHost[disabledVirtualHosts.size()]);		
	}
	
	/**
	 * Function to grab the hosts that do not contain their own CustomLog 
	 * 
	 * @return
	 * @throws Exception
	 */
	public static VirtualHost[] getGlobalHosts() throws Exception {
		
		VirtualHost virtualHosts[] = VirtualHosts.getAllVirtualHosts();
		
		ArrayList<VirtualHost> globalVirtualHosts = new ArrayList<VirtualHost>();
		
		Directive directives[];
		
		boolean containsCustomLog = false;
		
		for(VirtualHost virtualHost : virtualHosts) {
			containsCustomLog = false;
			directives = virtualHost.getDirectives();
			
			for(Directive directive : directives) {
				if(directive.getType().equals(Constants.customLogDirective)) {
					containsCustomLog = true;
					break;
				}
			}
			
			if(!containsCustomLog) {
				globalVirtualHosts.add(virtualHost);
			}
		}
		
		return globalVirtualHosts.toArray(new VirtualHost[globalVirtualHosts.size()]);		
	}
}
