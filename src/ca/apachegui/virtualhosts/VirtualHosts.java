package ca.apachegui.virtualhosts;

import java.util.ArrayList;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;
import apache.conf.modules.SharedModule;
import apache.conf.modules.StaticModule;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;
import apache.conf.parser.File;

public class VirtualHosts {

	private File file;
	private int port;
	private String address;
	private String documentRoot;
	private String serverName;
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDocumentRoot() {
		return documentRoot;
	}

	public void setDocumentRoot(String documentRoot) {
		this.documentRoot = documentRoot;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public VirtualHosts() {
		file = null;
		port = -1;
		address = "";
		documentRoot = "";
		serverName = "";
	}
	
	public static VirtualHosts[] getAllVirtualHosts() throws Exception {
		
		EnclosureParser parser = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());
		
		Enclosure virtualHostEnclosures[] = parser.getEnclosure(Constants.virtualHostDirectiveString);
		
		ArrayList<VirtualHosts> virtualHosts = new ArrayList<VirtualHosts>(); 
		
		for(Enclosure virtualHostEnclosure : virtualHostEnclosures) {
			
			//Add our virtual hosts here
			
		}
		
		return virtualHosts.toArray(new VirtualHosts[virtualHosts.size()]);
	}
	
}
