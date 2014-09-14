package ca.apachegui.virtualhosts;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import apache.conf.parser.File;

/**
 * File used to model an Apache Virtual Host
 * Virtual Host takes on the following format:
 * <VirtualHost addr[:port] [addr[:port]] ...> ... </VirtualHost>
 * 
 * @author jonathan
 *
 */

public class VirtualHost {

	private File file;
	private List<NetworkInfo> networkInfo;
	private String documentRoot;
	private String serverName;
	
	public VirtualHost() {
		file = null;
		networkInfo = new ArrayList<NetworkInfo>();
		documentRoot = "";
		serverName = "";
	}
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public NetworkInfo[] getNetworkInfo() {
		return networkInfo.toArray(new NetworkInfo[networkInfo.size()]);
	}

	public void setNetworkInfo(NetworkInfo[] networkInfo) {
		this.networkInfo =  Arrays.asList(networkInfo);
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
	
	@Override
	public String toString() {
		
		StringBuffer virtualHostBuffer = new StringBuffer();
		virtualHostBuffer.append( "\nFile: " + file == null ? "" : file.getAbsolutePath() + "\n");
		
		for(NetworkInfo info : networkInfo) {
			virtualHostBuffer.append( "NetworkInfo: " + info.toString() + "\n");
		}
		
		virtualHostBuffer.append( "DocumentRoot: " + documentRoot + "\n");
		virtualHostBuffer.append( "ServerName: " + serverName + "\n");
		
		return virtualHostBuffer.toString();
	}
}
