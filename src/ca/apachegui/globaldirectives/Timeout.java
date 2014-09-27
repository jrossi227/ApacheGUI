package ca.apachegui.globaldirectives;

import org.apache.log4j.Logger;

import apache.conf.parser.DirectiveParser;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;
import ca.apachegui.server.ServerInfo;

public class Timeout extends SingletonDirective {
	private static Logger log = Logger.getLogger(Timeout.class);
	
	private int seconds;
	
	public Timeout() {
		super(Constants.timeoutDirective);
		
		this.seconds=getDefaultSeconds();
	}
	
	public Timeout(int seconds) {
		super(Constants.timeoutDirective);
		
		this.seconds=seconds;
	}
	
	/**
	 * Creates a Timeout object from the directive. 
	 * The directive should conform to the following format:
	 * 
	 * Timeout seconds
	 * 
	 * @param directiveValue
	 */
	public Timeout(String directiveValue) {
		super(Constants.timeoutDirective);
		
		directiveValue=directiveValue.trim().toLowerCase();
		
		try {
			this.seconds=Integer.parseInt(directiveValue);
		} catch(Exception e) {
			log.error(e.getMessage(), e);
		}
	}
	
	public int getSeconds() {
		return seconds;
	}

	public void setSeconds(int seconds) {
		this.seconds = seconds;
	}
	
	private int getDefaultSeconds() {
		try
		{
			if(ServerInfo.isTwoPointTwo(null)) {
				return 300;
			}
		}
		catch(Exception e) {
			log.error(e.getMessage(), e);
		}
		
		return 60;
	}

	/**
	 * Static function to get the current configured Timeout in apache.
	 * If there is no Timeout found then a Timeout is returned with a default value of 300 for apache 2.2 and 60 for apache 2.3 and above.
	 * 
	 * @return a Timeout object, is no Timeout is found then a Timeout is returned a value of 300 for apache 2.2 and 60 for apache 2.3 and above.
	 * @throws Exception
	 */ 
	public static Timeout getTimeout() throws Exception {
		return (new Timeout().getConfigured());
	}
	
	/**
	 * Static function to get the current configured Timeout in apache.
	 * If there is no Timeout found then a Timeout is returned with a value of 300 for apache 2.2 and 60 for apache 2.3 and above.
	 * 
	 * @return a Timeout object, is no Timeout is found then a Timeout is returned a value of 300 for apache 2.2 and 60 for apache 2.3 and above.
	 * @throws Exception
	 */ 
	@Override
	public Timeout getConfigured() throws Exception {
		String timeout[]=new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.timeoutDirective, false);

		Timeout timeoutFound=null;
		
		if(timeout.length == 0) {
			timeoutFound =  new Timeout(getDefaultSeconds());
		} else {
			timeoutFound =  new Timeout(timeout[0].trim());
		}
		
		return timeoutFound;
	}
	
	@Override
	public String toString() {
		return Constants.timeoutDirective + " " + seconds ;
	}
}
