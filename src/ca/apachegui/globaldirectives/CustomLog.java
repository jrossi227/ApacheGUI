package ca.apachegui.globaldirectives;

import java.util.ArrayList;

import org.apache.log4j.Logger;

import apache.conf.parser.DirectiveParser;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

/**
 * Class used to model the apache CustomLog Configuration directive
 * 
 * The directive has the following format
 * CustomLog file|pipe format|nickname [env=[!]environment-variable]
 * 
 */


public class CustomLog extends FactoryDirective {

	Logger log = Logger.getLogger(CustomLog.class);
	
	private String fileOrPipe;
	private String formatOrNickname;
	
	public CustomLog() {
		super(Constants.customLogDirective);
		
		this.fileOrPipe="";
		this.formatOrNickname = "";
	}
	
	public CustomLog(String directiveValue) {
		super(Constants.customLogDirective);
			
		fileOrPipe = directiveValue.substring(0, directiveValue.lastIndexOf(" "));
		formatOrNickname = directiveValue.substring(directiveValue.lastIndexOf(" ") + 1);
	}

	/**
	 * @return the file_or_pipe
	 */
	public String getFileOrPipe() {
		return fileOrPipe;
	}

	/**
	 * @param file_or_pipe the file_or_pipe to set
	 */
	public void setFileOrPipe(String fileOrPipe) {
		this.fileOrPipe = fileOrPipe;
	}

	/**
	 * @return the format_or_nickname
	 */
	public String getFormatOrNickname() {
		return formatOrNickname;
	}

	/**
	 * @param format_or_nickname the format_or_nickname to set
	 */
	public void setFormatOrNickname(String formatOrNickname) {
		this.formatOrNickname = formatOrNickname;
	}

	/**
	 * Constructs an Apache CustomLog directive from the current configured object.
	 */
	@Override
	public String toString() {
		StringBuffer customLogBuffer = new StringBuffer();
		
		customLogBuffer.append(directiveName);
		
		customLogBuffer.append(" ");
		
		if(fileOrPipe.contains(" ")) {
			customLogBuffer.append("\"" + fileOrPipe + "\"");
		} else {
			customLogBuffer.append(fileOrPipe);
		}
		
		customLogBuffer.append(" ");
		
		if(formatOrNickname.contains(" ")) {
			customLogBuffer.append("\"" + formatOrNickname + "\"");
		} else {
			customLogBuffer.append(formatOrNickname);
		}
		
		return customLogBuffer.toString();
	}
	
	/**
	 * Static function to get all of the configured CustomLogs in apache.
	 * 
	 * @return an array of CustomLog objects
	 * @throws Exception
	 */ 
	public static CustomLog[] getAllCustomLogs() throws Exception 
	{
		return (new CustomLog().getAllConfigured());
	}
	
	/**
	 * Static function to get all of the configured CustomLogs in apache.
	 * 
	 * @return an array of CustomLog objects
	 * @throws Exception
	 */ 
	@Override
	CustomLog[] getAllConfigured() throws Exception {
		ArrayList<CustomLog> customLog = new ArrayList<CustomLog>();
		
		String customLogs[]=new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);
		for(int i=0; i<customLogs.length; i++) {
			customLog.add(new CustomLog(customLogs[i]));
		}
		
		return customLog.toArray(new CustomLog[customLog.size()]);
	}

}
