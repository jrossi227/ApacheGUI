package ca.apachegui.web;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.apachegui.directives.Group;
import ca.apachegui.directives.KeepAlive;
import ca.apachegui.directives.KeepAliveTimeout;
import ca.apachegui.directives.Listen;
import ca.apachegui.directives.ListenBackLog;
import ca.apachegui.directives.MaxKeepAliveRequests;
import ca.apachegui.directives.NameVirtualHost;
import ca.apachegui.directives.ServerSignature;
import ca.apachegui.directives.ServerTokens;
import ca.apachegui.directives.Timeout;
import ca.apachegui.directives.User;

@RestController
@RequestMapping("/Networking")
public class NetworkingController {
	
	@RequestMapping(method=RequestMethod.GET,params="option=listening",produces="application/json;charset=UTF-8")
	public String listening() throws Exception {
		
		Listen listeners[] = Listen.getAllListening();
		
		JSONObject result = new JSONObject();
		result.put("identifier", "id");
		result.put("label", "name");
		
		JSONArray items = new JSONArray();
		
		JSONObject item;
		for(int i=0; i< listeners.length; i++)
		{
			item = new JSONObject();
			item.put("id", Integer.toString(i));
			item.put("ip", (listeners[i].getIp().equals("") ? "All" : listeners[i].getIp()));
			item.put("port", listeners[i].getPort());
			item.put("protocol", (listeners[i].getProtocol().equals("") ? "All" : listeners[i].getProtocol()));
			
			items.put(item);
		}
		
		result.put("items", items);
		
		return result.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=nameVirtualHost",produces="application/json;charset=UTF-8")
	public String nameVirtualHost() throws Exception {
		NameVirtualHost nameVirtualHosts[] = NameVirtualHost.getAllNameVirtualHosts();
			
		JSONObject result = new JSONObject();
		result.put("identifier", "id");
		result.put("label", "name");
		
		JSONArray items = new JSONArray();
		
		JSONObject item;
		for(int i=0; i< nameVirtualHosts.length; i++)
		{
			item = new JSONObject();
			item.put("id", Integer.toString(i));
			item.put("address", nameVirtualHosts[i].getAddress());
			item.put("port", (nameVirtualHosts[i].getPort().equals("") ? "All" : nameVirtualHosts[i].getPort() ));
			
			items.put(item);
		}
		
		result.put("items", items);
		
		return result.toString();
	}

	private String printSuccess() {
		JSONObject result = new JSONObject();
		result.put("result", "success");
		return result.toString();
	}	
	
	@RequestMapping(method=RequestMethod.POST,params="option=addListen",produces="application/json;charset=UTF-8")
	public String addListen(@RequestParam(value="ip") String ip,
							@RequestParam(value="port") int port,
							@RequestParam(value="protocol") String protocol) throws Exception {
			
		Listen listen=new Listen(ip, port, protocol);
		
		//Add to file here 
		listen.addBeforeOrAfterFirstFoundToConfiguration(false);
		
		return printSuccess();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=deleteListen",produces="application/json;charset=UTF-8")
	public String deleteListen(@RequestParam(value="ip") String ip,
							   @RequestParam(value="port") int port,
							   @RequestParam(value="protocol") String protocol) throws Exception {
			
		ip = ip.equals("All") ? "" : ip;
		protocol = protocol.equals("All") ? "" : protocol;
	
		Listen listen=new Listen(ip, port, protocol);
		
		//Add to file here 
		listen.removeFromConfiguration();
		
		return printSuccess();
	}
	
	@RequestMapping(method=RequestMethod.POST,params="option=addNameVirtualHost",produces="application/json;charset=UTF-8")
	public String addNameVirtualHost(@RequestParam(value="address") String address,
							   		 @RequestParam(value="port") String port) throws Exception {
		
		NameVirtualHost nameVirtualHost=new NameVirtualHost(address, port);
		
		//Add to file here 
		nameVirtualHost.addBeforeOrAfterFirstFoundToConfiguration(true);
		
		return printSuccess();
	}	
		
	@RequestMapping(method=RequestMethod.POST,params="option=deleteNameVirtualHost",produces="application/json;charset=UTF-8")
	public String deleteNameVirtualHost(@RequestParam(value="address") String address,
							   		    @RequestParam(value="port") String port) throws Exception {
		port = port.equals("All") ? "" : port;
	
		NameVirtualHost nameVirtualHost=new NameVirtualHost(address, port);
		
		nameVirtualHost.removeFromConfiguration();
		
		return printSuccess();
	}	
		
	@RequestMapping(method=RequestMethod.POST,params="option=modifyKeepAliveStatus",produces="application/json;charset=UTF-8")
	public String modifyKeepAliveStatus(@RequestParam(value="status") String status) throws Exception {
		
		new KeepAlive(status.equals("on") ? true : false).saveToConfiguration();
		
		return printSuccess();
	}	
		
	@RequestMapping(method=RequestMethod.POST,params="option=modifyKeepAliveTimeout",produces="application/json;charset=UTF-8")
	public String modifyKeepAliveTimeout(@RequestParam(value="seconds") int seconds) throws Exception {
		
		new KeepAliveTimeout(seconds).saveToConfiguration();
	
		return printSuccess();
	}	
	
	@RequestMapping(method=RequestMethod.POST,params="option=modifyMaxKeepAliveRequests",produces="application/json;charset=UTF-8")
	public String modifyMaxKeepAliveRequests(@RequestParam(value="numberOfRequests") int numberOfRequests) throws Exception {
		
		new MaxKeepAliveRequests(numberOfRequests).saveToConfiguration();
	
		return printSuccess();
	}	
	
		
	@RequestMapping(method=RequestMethod.POST,params="option=modifyRequestTimeout",produces="application/json;charset=UTF-8")
	public String modifyRequestTimeout(@RequestParam(value="seconds") int seconds) throws Exception {
		
		new Timeout(seconds).saveToConfiguration();
	
		return printSuccess();
	}	
	
	@RequestMapping(method=RequestMethod.POST,params="option=modifyListenBackLog",produces="application/json;charset=UTF-8")
	public String modifyListenBackLog(@RequestParam(value="backLogLength") int backLogLength) throws Exception {
		
		new ListenBackLog(backLogLength).saveToConfiguration();
	
		return printSuccess();
	}	
	
	@RequestMapping(method=RequestMethod.POST,params="option=modifyServerTokens",produces="application/json;charset=UTF-8")
	public String modifyServerTokens(@RequestParam(value="serverTokens") String serverTokens) throws Exception {
		
		new ServerTokens(serverTokens).saveToConfiguration();
	
		return printSuccess();
	}	
	
	@RequestMapping(method=RequestMethod.POST,params="option=modifyServerSignature",produces="application/json;charset=UTF-8")
	public String modifyServerSignature(@RequestParam(value="serverSignature") String serverSignature) throws Exception {
		
		new ServerSignature(serverSignature).saveToConfiguration();
	
		return printSuccess();
	}	
	
	@RequestMapping(method=RequestMethod.POST,params="option=modifyUser",produces="application/json;charset=UTF-8")
	public String modifyUser(@RequestParam(value="user") String user) throws Exception {
		
		new User(user).saveToConfiguration();
	
		return printSuccess();
	}	
		
	@RequestMapping(method=RequestMethod.POST,params="option=modifyGroup",produces="application/json;charset=UTF-8")
	public String modifyGroup(@RequestParam(value="group") String group) throws Exception {
		
		new Group(group).saveToConfiguration();
	
		return printSuccess();
	}		

}
