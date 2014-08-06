package ca.apachegui.directives;

import apache.conf.parser.DirectiveParser;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

public class KeepAlive extends SingletonDirective {
	private boolean status;
	
	public KeepAlive() {
		super(Constants.keepAliveDirective);
		
		this.status=false;
	}
	
	/**
	 * 
	 * @param status - true if status is on, false if status is off
	 */
	public KeepAlive(boolean status) {
		super(Constants.keepAliveDirective);
		
		this.status=status;
	}
	
	/**
	 * Creates a KeepAlive object from the directive. 
	 * The directive should conform to the following format:
	 * 
	 * KeepAlive On|Off
	 * 
	 * @param directiveValue
	 */
	public KeepAlive(String directiveValue) {
		super(Constants.keepAliveDirective);
		
		directiveValue=directiveValue.trim().toLowerCase();
		
		if(directiveValue.equals("off")) {
			this.status=false;
		} else {
			this.status=true;
		}
	}
	
	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	/**
	 * Static function to get the current configured KeepAlive in apache.
	 * If there is no KeepAlive found then a KeepAlive is returned with status true.
	 * 
	 * @return a KeepAlive object, is no KeepAlive is found then a KeepAlive is returned with status true.
	 * @throws Exception
	 */ 
	public static KeepAlive getKeepAlive() throws Exception {
		return (new KeepAlive().getConfigured());
	}
	
	/**
	 * Function to get the current configured KeepAlive in apache.
	 * If there is no KeepAlive found then a KeepAlive is returned with status true.
	 * 
	 * @return a KeepAlive object, is no KeepAlive is found then a KeepAlive is returned with status true.
	 * @throws Exception
	 */ 
	@Override
	public KeepAlive getConfigured() throws Exception {
		String keepAlive[]=new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName);

		KeepAlive keepAliveFound=null;
		
		if(keepAlive.length == 0) {
			keepAliveFound =  new KeepAlive(true);
		} else {
			keepAliveFound =  new KeepAlive(keepAlive[0].trim());
		}
		
		return keepAliveFound;
	}

	@Override
	public String toString() {
		return directiveName + " " + (status == true ? "On" : "Off" );
	}
}
