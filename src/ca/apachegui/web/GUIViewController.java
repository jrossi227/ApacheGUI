package ca.apachegui.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ca.apachegui.conf.ServerMime;
import ca.apachegui.db.LogDataDao;
import ca.apachegui.db.UsersDao;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;
import ca.apachegui.globaldirectives.Group;
import ca.apachegui.globaldirectives.KeepAlive;
import ca.apachegui.globaldirectives.KeepAliveTimeout;
import ca.apachegui.globaldirectives.ListenBackLog;
import ca.apachegui.globaldirectives.MaxKeepAliveRequests;
import ca.apachegui.globaldirectives.ServerName;
import ca.apachegui.globaldirectives.ServerSignature;
import ca.apachegui.globaldirectives.ServerTokens;
import ca.apachegui.globaldirectives.Timeout;
import ca.apachegui.globaldirectives.User;
import ca.apachegui.server.ServerInfo;
import ca.apachegui.virtualhosts.NetworkInfo;
import ca.apachegui.virtualhosts.VirtualHost;
import ca.apachegui.virtualhosts.VirtualHosts;
import apache.conf.global.Utils;
import apache.conf.parser.File;

@Controller
public class GUIViewController {
	
	@ModelAttribute("theme")
	public String getTheme() {
	   return ((ca.apachegui.db.SettingsDao.getInstance().getSetting(Constants.theme)==null)?Constants.defaultTheme: ca.apachegui.db.SettingsDao.getInstance().getSetting(Constants.theme));
	}
	
	@ModelAttribute("version")
	public String getVersion() {
	   return Constants.version;
	}
	
	@ModelAttribute("windows")
	public boolean getWindows() {
	   return Utils.isWindows();
	}
	
	@ModelAttribute("confDirectory")
	public String getConfDirectory() {
	   return ca.apachegui.db.SettingsDao.getInstance().getSetting(Constants.confDirectory);
	}
	
	@ModelAttribute("restartWarning")
	public String getRestartWarning() {
		return Constants.restartWarning;
	}
	
	@RequestMapping(value="/")
	public void indexPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		response.sendRedirect(request.getContextPath() + "/jsp/GUISettings.jsp");
	}
	
	@RequestMapping(value="/{jspName}.jsp")
	public String renderRootViewJsp(@PathVariable String jspName) {
		return "views/" + jspName;
	}
	
	@RequestMapping(value="/jsp/Logout.jsp")
	public void renderLogoutView(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		HttpSession sessions = request.getSession(false);

		if(sessions!=null) {
	   		sessions.invalidate();
		}
		
		response.sendRedirect(request.getContextPath());
	}
	
	@RequestMapping(value="/jsp/Login.jsp")
	public String renderLoginViewJsp(@RequestParam(value="error", required=false) String error, HttpServletRequest request, Model model) {
		
		model.addAttribute("advisory",UsersDao.getInstance().getLoginAdvisory());
		
		String userAgent=request.getHeader("User-Agent");  
		model.addAttribute("supportedBrowser",Utils.matchUserAgent(userAgent, Constants.supportedUserAgentRegex));
		model.addAttribute("error", error == null ? false : true);
		
		return "views/Login";
	}
	
	@RequestMapping(value="/jsp/Logs.jsp")
	public String renderLogsViewJsp(@RequestParam(value="option", required=false) String option, 
									@RequestParam(value="file") String file, 
									Model model) {
		if(option==null) {
			option="search";
		}
		
		File logFile = new File(file);
		
		model.addAttribute("filePath", logFile.getAbsolutePath());
		model.addAttribute("fileSize", ((double)(logFile.length())/1000));
		model.addAttribute("option", option);
		
		return "views/Logs";
	}
	
	@RequestMapping(value="/jsp/GUISettings.jsp")
	public String renderGUISettingsViewJsp(Model model) {
		
		model.addAttribute("website", Constants.website);
		model.addAttribute("supportWebsite", Constants.supportWebsite);
		model.addAttribute("supportAddress", Constants.supportAddress);
		
		return "views/GUISettings";
	}
	
	@RequestMapping(value="/jsp/SearchResults.jsp")
	public String renderSearchResultsViewJsp(
			@RequestParam(value="startDate") String startDate,
			@RequestParam(value="startTime") String startTime,
			@RequestParam(value="endDate") String endDate,
			@RequestParam(value="endTime") String endTime,
			@RequestParam(value="host") String host,
			@RequestParam(value="userAgent") String userAgent,
			@RequestParam(value="requestString") String requestString,
			@RequestParam(value="status") String status,
			@RequestParam(value="contentSize") String contentSize,
			@RequestParam(value="maxResults") String maxResults,
			Model model) throws UnsupportedEncodingException {
		
		model.addAttribute("startDate", startDate);
		model.addAttribute("startTime", startTime);
		model.addAttribute("endDate", endDate);
		model.addAttribute("endTime", endTime);
		model.addAttribute("host", host);
		model.addAttribute("userAgent", URLEncoder.encode(userAgent,"UTF-8"));
		model.addAttribute("requestString", URLEncoder.encode(requestString,"UTF-8"));
		model.addAttribute("status", status);
		model.addAttribute("contentSize", contentSize);
		model.addAttribute("maxResults", maxResults);
		
		return "views/SearchResults";
	}
	
	@RequestMapping(value="/jsp/GenerateGraph.jsp")
	public String renderGenerateGraphViewJsp(
			@RequestParam(value="date") String date,
			@RequestParam(value="type") String type,
			@RequestParam(value="host") String host,
			@RequestParam(value="userAgent") String userAgent,
			@RequestParam(value="requestString") String requestString,
			@RequestParam(value="status") String status,
			@RequestParam(value="contentSize") String contentSize,
			Model model) throws UnsupportedEncodingException, ParseException {
		
		Calendar cal=Calendar.getInstance();
		
		StringBuffer coordinates=new StringBuffer();
		if(type.equals("day"))
		{
			SimpleDateFormat startDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			java.util.Date startParsedDate = startDateFormat.parse(date + " 00:00:00");
			java.sql.Timestamp startTimestamp = new java.sql.Timestamp(startParsedDate.getTime());
			cal.setTimeInMillis(startTimestamp.getTime());
			int hourCount[]=LogDataDao.getInstance().getDailyReportByHour(startTimestamp, host, userAgent, requestString, status, contentSize);
			for(int i=0; i<hourCount.length; i++)
			{
				coordinates.append("[" + i + "," + hourCount[i]  +"]");
				if(i!=(hourCount.length-1))
					coordinates.append(",");
			}
		}
		if(type.equals("month"))
		{
			SimpleDateFormat startDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			java.util.Date startParsedDate = startDateFormat.parse(date + " 00:00:00");
			java.sql.Timestamp startTimestamp = new java.sql.Timestamp(startParsedDate.getTime());
			cal.setTimeInMillis(startTimestamp.getTime());
			int dayCount[]=LogDataDao.getInstance().getMonthlyReportByDay(startTimestamp, host, userAgent, requestString, status, contentSize);
			
			for(int i=1; i<dayCount.length; i++)
			{
				coordinates.append("[" + i + "," + dayCount[i]  +"]");
				if(i!=(dayCount.length-1))
					coordinates.append(",");
			}
		}
		
		model.addAttribute("coordinates", coordinates.toString());
		
		String dateTitle = "";
		if(type.equals("day")){
			dateTitle = "Day " + date;	
		}
		
		if(type.equals("month")) {
			dateTitle = "Month " + (cal.get(Calendar.MONTH)+1) + "/" + cal.get(Calendar.YEAR);	
		}
		
		model.addAttribute("dateTitle", dateTitle);
		
		return "views/GenerateGraph";
	}
	
	@RequestMapping(value="/jsp/Documents.jsp")
	public String renderDocumentsViewJsp(@RequestParam(value="file") String filePath, Model model) {
		
		String fileType="text";
		String mode="'plain'";

		File file=new File(filePath);
			
		int extension=file.getName().indexOf(".");
		if(extension!=-1) {
			String ext=file.getName().substring(extension +1);
			if(ext.matches(Utilities.extensionsToRegex(new String[]{"jpg","jpeg","bmp","tif","tiff","gif","png","jpe","ico","svg"})) && file.exists()) {	
				fileType="image";	
			}
			else {	
				if(ext.matches(Utilities.extensionsToRegex(new String[]{"html","htm","xhtml","shtml","htt","stm","xht"}))) {	
					mode="'html'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"conf"}))) {
					mode="'conf'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"css"}))) {
					mode="'css'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"xml","wsdl","rdf","rss","xsl","xsd","dtd"}))) {	
					mode="'xml'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"js"}))) {	
					mode="'javascript'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"json"}))) {	
					mode="'json'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"php","phtml","pht","phps","php3","php3p","php4","php5"}))) {	
					mode="'php'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"py","pyc","pyo"}))) {	
					mode="'python'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"pl","cgi"}))) {	
					mode="'perl'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"sh"}))) {	
					mode="'shell'";
				} else if(ext.matches(Utilities.extensionsToRegex(new String[]{"properties","ini"}))) {	
					mode="'properties'";
				}	
			}
		}
	
		model.addAttribute("filePath", file.getAbsolutePath());
		model.addAttribute("fileType", fileType);
		model.addAttribute("mode", mode);
		model.addAttribute("openTime",(new Date()).getTime());
		
		return "views/Documents";
	}
	
	@RequestMapping(value="/jsp/Control.jsp")
	public String renderControlViewJsp(Model model) throws Exception {
		
		String startCommand = ca.apachegui.db.SettingsDao.getInstance().getSetting(Constants.binFile) + " " + (Utils.isWindows() ? "-k" : "");
		String stopCommand = ca.apachegui.db.SettingsDao.getInstance().getSetting(Constants.binFile) + " " + (Utils.isWindows() ? "-k" : "");
		String restartCommand = ca.apachegui.db.SettingsDao.getInstance().getSetting(Constants.binFile) + " " + (Utils.isWindows() ? "-k" : "");
		
		model.addAttribute("startCommand", startCommand);
		model.addAttribute("stopCommand", stopCommand);
		model.addAttribute("restartCommand", restartCommand);
		model.addAttribute("isServerRunning", ca.apachegui.server.Control.isServerRunning());
		
		return "views/Control";
	}
	
	@RequestMapping(value="/jsp/Configuration.jsp")
	public String renderConfigurationViewJsp(@RequestParam(value="file") String filePath, Model model) {
		
		String mode="'plain'";
		
		File file=new File(filePath);
		
		int extension=file.getName().indexOf(".");
		if(extension!=-1) {
			String ext=file.getName().substring(extension +1);
			
			if(ext.matches(Utilities.extensionsToRegex(new String[]{"conf"}))) {
				mode="'conf'";
			} 
		}
		
		model.addAttribute("filePath", file.getAbsolutePath());
		model.addAttribute("openTime",(new Date()).getTime());
		model.addAttribute("mode", mode);
		
		return "views/Configuration";
	}
	
	//Catch all view render
	@RequestMapping(value="/jsp/VirtualHosts.jsp")
	public String renderVirtualHostsViewJsp() {
		
		return "views/VirtualHosts";
	}
	
	//Catch all view render
	@RequestMapping(value="/jsp/{jspName}.jsp")
	public String renderViewJsp(@PathVariable String jspName) {
		return "views/" + jspName;
	}
	
	@RequestMapping(value="/jsp/editor/EditorMenu.jsp")
	public String renderEditorMenuViewJsp(@RequestParam(value="option", required=false) String option, Model model) {
		
		model.addAttribute("option", option == null ? "" : option);
		
		return "views/editor/EditorMenu";
	}
	
	@RequestMapping(value="/jsp/editor/{jspName}.jsp")
	public String renderEditorViewJsp(@PathVariable String jspName) {
		return "views/editor/" + jspName;
	}
	
	@RequestMapping(value="/jsp/global_settings/Networking.jsp")
	public String renderNetworkingViewJsp(Model model) throws Exception {
		
		model.addAttribute("keepAlive", KeepAlive.getKeepAlive().getStatus());
		model.addAttribute("keepAliveTimeout", KeepAliveTimeout.getKeepAliveTimeout().getSeconds()); 
		model.addAttribute("maxKeepAliveRequests", MaxKeepAliveRequests.getMaxKeepAliveRequests().getNumberOfRequests());	
		model.addAttribute("timeout", Timeout.getTimeout().getSeconds());	
		model.addAttribute("listenBackLogLength", ListenBackLog.getListenBackLog().getBackLogLength());
		model.addAttribute("serverToken", ServerTokens.getServerTokens().getToken());
		model.addAttribute("serverSignature", ServerSignature.getServerSignature().getSignature());
		model.addAttribute("user", User.getServerUser().getUser());
		model.addAttribute("group", Group.getServerGroup().getGroup());

		model.addAttribute("ServerTokens_MAJOR", ServerTokens.MAJOR);
		model.addAttribute("ServerTokens_MINOR", ServerTokens.MINOR);
		model.addAttribute("ServerTokens_MINIMAL", ServerTokens.MINIMAL);
		model.addAttribute("ServerTokens_PROD", ServerTokens.PROD);
		model.addAttribute("ServerTokens_OS", ServerTokens.OS);
		model.addAttribute("ServerTokens_FULL", ServerTokens.FULL);
		
		model.addAttribute("ServerSignature_ON", ServerSignature.ON);
		model.addAttribute("ServerSignature_OFF", ServerSignature.OFF);
		model.addAttribute("ServerSignature_EMAIL", ServerSignature.EMAIL);
		
		model.addAttribute("NameVhostSupport",ServerInfo.isTwoPointTwo(null));
		
		return "views/global_settings/Networking";
	}
	
	@RequestMapping(value="/jsp/global_settings/Mime.jsp")
	public String renderMimeViewJsp(Model model) throws Exception {
		
		model.addAttribute("serverMimeFile", ServerMime.getServerMimeFile());
		model.addAttribute("serverMimesWarning","If you wish to modify MIME types it is recommended that you add them to the Added MIME Types in the tab below. Any MIMES that are added or modified in the server MIME file may be removed if there is a server or operating system update. If you wish to add MIMES to the server MIME file then you will have to open the file and manually do so.");

		return "views/global_settings/Mime";
	}
	
	@RequestMapping(value="/jsp/global_settings/Modules.jsp")
	public String renderModulesViewJsp(Model model) throws Exception {
		
		model.addAttribute("modulesDirectory", ca.apachegui.db.SettingsDao.getInstance().getSetting(Constants.modulesDirectory));
		model.addAttribute("availableModulesType", Constants.availableModulesType);
		model.addAttribute("sharedModulesType", Constants.sharedModulesType);
		model.addAttribute("staticModulesType", Constants.staticModulesType);
		
		return "views/global_settings/Modules";
	}
	
}
