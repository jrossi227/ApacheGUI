package ca.apachegui.directives;

import apache.conf.parser.DirectiveParser;
import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

public class ServerTokens extends SingletonDirective {

	private String token;
	
	public final static String MAJOR="Major";
	public final static String MINOR="Minor";
	public final static String MINIMAL="Min";
	public final static String PROD="Prod";
	public final static String OS="OS";
	public final static String FULL="Full";
	
	public ServerTokens() {
		super(Constants.serverTokensDirective);
		
		this.token=FULL;
	}
	
	/**
	 * Creates a ServerTokens object from the directive. 
	 * The directive should conform to the following format:
	 * 
	 * ServerTokens Major|Minor|Min[imal]|Prod[uctOnly]|OS|Full
	 * 
	 * @param directiveValue
	 */
	public ServerTokens(String directiveValue) {
		super(Constants.serverTokensDirective);
		
		directiveValue=directiveValue.trim().toLowerCase();
		if(directiveValue.equals(MAJOR.toLowerCase())) {
			this.token=MAJOR;
		} else if(directiveValue.equals(MINOR.toLowerCase())) {
			this.token=MINOR;
		} else if(directiveValue.equals(MINIMAL.toLowerCase())) {
			this.token=MINIMAL;
		} else if(directiveValue.equals(PROD.toLowerCase())) {
			this.token=PROD;
		} else if(directiveValue.equals(OS.toLowerCase())) {
			this.token=OS;
		} else {
			this.token=FULL;
		}
		
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	/**
	 * Static function to get the current configured ServerTokens in apache.
	 * If there is no ServerTokens found then a ServerTokens is returned with value Full.
	 * 
	 * @return a ServerToken object, is no ServerToken is found then a ServerToken is returned with value Full.
	 * @throws Exception
	 */ 
	public static ServerTokens getServerTokens() throws Exception {
		return (new ServerTokens().getConfigured());
	}
	
	/**
	 * Function to get the current configured ServerTokens in apache.
	 * If there is no ServerTokens found then a ServerTokens is returned with value Full.
	 * 
	 * @return a ServerToken object, is no ServerToken is found then a ServerToken is returned with value Full.
	 * @throws Exception
	 */ 
	@Override
	public ServerTokens getConfigured() throws Exception {
		String serverTokens[]=new DirectiveParser(Settings.getSetting(Constants.confFile), Settings.getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName);

		ServerTokens serverTokensFound=null;
		
		if(serverTokens.length == 0) {
			serverTokensFound =  new ServerTokens();
		} else {
			serverTokensFound =  new ServerTokens(serverTokens[0].trim());
		}
		
		return serverTokensFound;
	}

	@Override
	public String toString() {
		return directiveName + " " + this.token;
	}

}
