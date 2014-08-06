package ca.apachegui.directives;

import apache.conf.parser.DirectiveParser;
import ca.apachegui.conf.ConfFiles;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

public abstract class SingletonDirective extends BaseDirective {
	
	public SingletonDirective(String directiveName) 
	{
		super(directiveName);
	}
	
	abstract SingletonDirective getConfigured() throws Exception;
	
	/**
	 * Replaces the current directive with a new value in the configuration.
	 * 
	 * @throws Exception
	 */
	public void saveToConfiguration() throws Exception {
		
		DirectiveParser parser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());
		
		String keepAliveDirective[]=parser.getDirectiveValue(directiveName);
		
		if(keepAliveDirective.length > 0) {
			String file=parser.getDirectiveFile(directiveName, getReplaceValue());
		
			parser.setDirectiveInFile(directiveName, file, getDirectiveValue(), getReplaceValue(), true);
		} else {
			ConfFiles.appendToGUIConfigFile(toString());
		}
	}
	
	public String getReplaceValue() {
		return "";
	}
	
	public String getDirectiveValue() {
		return this.toString().replaceAll(directiveName + " *", "");
	}
}
