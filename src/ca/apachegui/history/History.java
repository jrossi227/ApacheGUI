package ca.apachegui.history;

import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.File;
import ca.apachegui.conf.ConfFiles;
import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

/**
 * 
 * @author jonathan
 * Write the following config to the file
 * LogFormat "%h\",\"%{User-agent}i\",\"%r\",\"%>s\",\"%B" apacheguilogholder
 * CustomLog "|java -jar \"[TOMCAT_HOME]/bin/LogParser.jar\" \"[TOMCAT_HOME]/conf/server.xml\"" apacheguilogholder
 */

public class History 
{
	private static String tomcatDirectory="";
	
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
	public static void enable() throws Exception
	{
		if(checkIfEnabled())
			return;
		
		File cat = new File(Utilities.getTomcatInstallDirectory());
		File java = new File(Utilities.getJavaHome(),"bin/java" + (Utils.isWindows() ? ".exe" : ""));
		
		String includeString = "#This section is written by the apache gui do not manually edit " + Constants.historyLogHolder + Constants.newLine +
							   "LogFormat \"%h\\\",\\\"%{User-agent}i\\\",\\\"%r\\\",\\\"%>s\\\",\\\"%B\" " + Constants.historyLogHolder + Constants.newLine;
		
		if(Utils.isWindows()) {
			includeString += "CustomLog \"|\\\"" + java.getAbsolutePath() + "\\\" -jar \\\"" + (new File(cat, "bin/LogParser.jar")).getAbsolutePath() + "\\\" \\\"" + (new File(cat, "conf/server.xml")).getAbsolutePath() + "\\\"\" " + Constants.historyLogHolder + Constants.newLine;
		} else {
			includeString += "CustomLog \"|" + java.getAbsolutePath() + " -jar \\\"" + cat.getAbsolutePath() + "/bin/LogParser.jar\\\" \\\"" + cat.getAbsolutePath() + "/conf/server.xml\\\"\" " + Constants.historyLogHolder + Constants.newLine;
		}
		
		//Search for access.log and insert after access.log
		DirectiveParser parser = new DirectiveParser(Settings.getSetting(Constants.confFile), Settings.getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());
		boolean inserted = parser.insertDirectiveBeforeOrAfterFirstFound(Constants.customLogDirectiveString, includeString, "(.*/access.log.*|.*\\access.log.*|.*/access_log.*|.*\\access_log.*)", false);
		
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
	
	public static String getTomcatDirectory() {
		return tomcatDirectory;
	}

	public static synchronized void setTomcatDirectory(String tomcatDirectory) {
		History.tomcatDirectory = tomcatDirectory;
	}
}
