package ca.apachegui.virtualhosts;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

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
	
	public String toJSON() throws ParseException {
		
		JSONObject json = new JSONObject();
		
		json.put("file", file.getAbsolutePath());
		
		JSONArray networkInfoArray = new JSONArray();
		
		for(NetworkInfo info : networkInfo) {
			networkInfoArray.put(new JSONObject(info.toJSON()));
		}
		
		json.put("NetworkInfo", networkInfoArray.toString());
		
		
		json.put("DocumentRoot", documentRoot);
		json.put("ServerName", serverName);
		
		return json.toString();
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
	
	@Override
	public boolean equals(Object o) {
		
		VirtualHost host = (VirtualHost)o;
		
		boolean found = false;
		for(NetworkInfo info : host.getNetworkInfo()) {
        	found = false;
        	
        	for(NetworkInfo thisInfo : networkInfo) {
				if(info.equals(thisInfo)) {
	        		found = true;
	        	}
        	}
        	
        	if(!found) {
        		return false;
        	}
        }
		
		return true;
	}
	
	@Override
    public int hashCode() {
        int hash = 1;
        hash = hash * 17 + file.hashCode();
        
        for(NetworkInfo info : networkInfo) {
        	hash = hash * 19 + info.hashCode();
        }
        
        hash = hash * 31 + documentRoot.hashCode();
        hash = hash * 37 + serverName.hashCode();
        return hash;
    }
	
}
