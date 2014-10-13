package ca.apachegui.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ca.apachegui.globaldirectives.DocumentRoot;
import ca.apachegui.globaldirectives.ServerName;
import ca.apachegui.virtualhosts.NetworkInfo;
import ca.apachegui.virtualhosts.VirtualHost;
import ca.apachegui.virtualhosts.VirtualHosts;

@RestController
@RequestMapping("/web/VirtualHosts")
public class VirtualHostsController {

	 /**
	 * 
	 * @return
	 * @throws NullPointerException
	 * @throws Exception
	 */
	
	@RequestMapping(method=RequestMethod.GET,params="option=getAllVirtualHosts",produces="application/json;charset=UTF-8")
	public String getAllVirtualHosts() throws NullPointerException, Exception {
		
		VirtualHost hosts[] = VirtualHosts.getAllVirtualHosts();
		
		//NetworkInfo, VirtualHost JSON String[], items first in the JSON String[] are the default
		HashMap<NetworkInfo, ArrayList<String>> hostBuckets = new HashMap<NetworkInfo, ArrayList<String>>();
		
		for(VirtualHost host : hosts) {
			
			for(NetworkInfo info : host.getNetworkInfo()) {
			
				ArrayList<String> json = hostBuckets.get(info);
				if(json == null) {
					json = new ArrayList<String>();
				}
				
				json.add(host.toJSON());
				
				hostBuckets.put(info, json);
			
			}
			
		}
	
		JSONObject hostJSON = new JSONObject();
		
		NetworkInfo currInfo;
		ArrayList<String> currHosts;
		JSONArray hostArray;
		for (Entry<NetworkInfo, ArrayList<String>> entry : hostBuckets.entrySet()) {
			currInfo = entry.getKey();
			currHosts = entry.getValue();
		    
			hostArray = new JSONArray();
			JSONObject currHostJSON;
			for(String currHost : currHosts) {
			
				currHostJSON = new JSONObject(currHost);
				currHostJSON.remove("NetworkInfo");
				currHostJSON.put("NetworkInfo", new JSONObject(currInfo.toJSON()));
				
				hostArray.put(currHostJSON);
			}
			
			hostJSON.put(currInfo.toString(), hostArray);
		}
		
		JSONObject summary = new JSONObject();
		summary.put("hosts", hostJSON);
		summary.put("ServerName", ServerName.getServerName().getValue());
		summary.put("DocumentRoot", DocumentRoot.getDocumentRoot().getValue());
		
		return summary.toString();
	}
	
}
