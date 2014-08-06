package ca.apachegui.directives;

import java.util.ArrayList;

import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

/**
 * Class used to model the apache NameVirtualHost directive
 * 
 * The directive has the following format
 * NameVirtualHost addr[:port]
 * 
 */

public class NameVirtualHost extends FactoryDirective {
	
	private String address;
	private String port;
	
	public NameVirtualHost() 
	{
		super(Constants.nameVirtualHostDirective);
		
		this.address="";
		this.port="";
	}
	
	/**
	 * Takes an apache NameVirtualHost directive String and creates a NameVirtualHost object. The String must conform
	 * to the following format:
	 * 
	 * addr[:port]
	 * 
	 * @param directiveValue - A String with a valid apache NameVirtualHost directive 
	 */
	public NameVirtualHost(String directiveValue) {
		super(Constants.nameVirtualHostDirective);
		
		directiveValue=Utils.sanitizeLineSpaces(directiveValue);
		
		this.address="";
		this.port="";
		
		if(!directiveValue.contains(":")) {
			this.address=directiveValue;
		} else {
			
			if(directiveValue.contains("[") && directiveValue.contains("]")) {
				this.address = directiveValue.substring(directiveValue.indexOf("[") + 1, directiveValue.indexOf("]"));
				this.port=directiveValue.substring(directiveValue.lastIndexOf(":") + 1); 
			} else {
				String parts[]=directiveValue.split(":");
			
				this.address=parts[0];
				this.port=parts[1];
			}
		}
	}
	
	/**
	 * Creates a NameVirtualHost object from the input parameters.
	 * 
	 * @param addr - A string with an ip address or hostname.
	 * @param port - An String with a valid port or * for all ports.
	 */
	public NameVirtualHost(String address, String port) {
		super(Constants.nameVirtualHostDirective);
		
		this.address=address;
		this.port=port;
	}
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	
	/**
	 * Constructs an Apache NameVirtualHost directive from the current configured object.
	 */
	@Override
	public String toString() {
		StringBuffer nameVirtualHostDirective=new StringBuffer();
		if(this.address.contains(":")) {
			nameVirtualHostDirective.append(directiveName + " [" + this.address + "]");
		} else {
			nameVirtualHostDirective.append(directiveName + " " + this.address);
		}
		
		if(!this.port.equals("")) {
			nameVirtualHostDirective.append(":" + port);
		}
		
		return nameVirtualHostDirective.toString();
	}
	
	/**
	 * Static function to get all of the configured NameVirtualHosts in apache.
	 * 
	 * @return an array of NameVirtualHost objects
	 * @throws Exception
	 */ 
	public static NameVirtualHost[] getAllNameVirtualHosts() throws Exception 
	{
		return (new NameVirtualHost().getAllConfigured());
	}
	
	/**
	 * Function to get all of the configured NameVirtualHosts in apache.
	 * 
	 * @return an array of NameVirtualHost objects
	 * @throws Exception
	 */ 
	@Override
	public NameVirtualHost[] getAllConfigured() throws Exception {
		ArrayList<NameVirtualHost> currNameVirtualHosts = new ArrayList<NameVirtualHost>();
		
		String nameVirtualHosts[]=new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName);
		for(int i=0; i<nameVirtualHosts.length; i++) {
			currNameVirtualHosts.add(new NameVirtualHost(nameVirtualHosts[i]));
		}
		
		return currNameVirtualHosts.toArray(new NameVirtualHost[currNameVirtualHosts.size()]);
	}
	
	/**
	 * Creates an apache directive String and adds it to the current Apache configuration. 
	 * The directive is added directly before or after the first configured Matching directive.
	 * 
	 * @param before - A boolean indicating if the directive should be added before the first matching directive.
	 * @throws Exception
	 */
	@Override
	public void addBeforeOrAfterFirstFoundToConfiguration(boolean before) throws Exception
	{
		NameVirtualHost nameVirtualHosts[] = getAllConfigured();
	
		//First we check if someones already Listening on the ip, port and protocol
		for(int i=0; i<nameVirtualHosts.length; i++) {
			if(this.equals(nameVirtualHosts[i])) {
				throw new Exception("The specified Name Based Virtual Host already exists!");
			}
		}
		
		//check if a virtual host exists
		Enclosure virtualHosts[]=new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getEnclosure(Constants.virtualHostDirectiveString);
		boolean exists=false;
		for(int i=0; i<virtualHosts.length; i++) {
			if(this.equals(new NameVirtualHost(virtualHosts[i].getValue()))) {
				exists=true;
			}
		}
		
		if(!exists) {
			throw new Exception("There are no current matching VirtualHosts with the specified parameters. Please configure the VirtualHost before adding a Name Based Virtual Host.");
		}
		
		//Add Listen after first found listener
		new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).insertDirectiveBeforeOrAfterFirstFound(Constants.listenDirective, toString(), before);
	}
	
	@Override
	public boolean equals(Object nameVirtualHost) 
	{
		NameVirtualHost target = (NameVirtualHost)nameVirtualHost;
		
		if(this.address.equals(target.getAddress()) && this.port.equals(target.getPort())) {
			return true;
		}
		
		return false;
	}

}
