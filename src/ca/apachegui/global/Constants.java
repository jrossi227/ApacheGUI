package ca.apachegui.global;

import apache.conf.global.Utils;

public class Constants 
{
	//Global Utilities
	public final static String newLine=System.getProperty("line.separator");
	
	//Global database options
	public final static String dbName="apacheGUI";
	public final static String settingsTable="SETTINGS";
	public final static String usersTable="USERS";
	public final static String rolesTable="USER_ROLES";
	public final static String logDataTable="LOGDATA";
	public final static String processInfoRefreshRateDefault="5";
	public final static String extendedStatusDefault="off";
	public final static String usersFile="conf/tomcat-users.xml";
	public final static String defaultUsername="admin";
	public final static String defaultPassword="admin";
	public final static String defaultTheme="claro";
	public final static String defaultHistoryBuffer="1";
	public final static String defaultHistoryRetention="5";
	
	//Constants that are used to store values in the settings table
	public final static String init="init";
	public final static String confDirectory="confDirectory";
	public final static String confFile="confFile";
	public final static String serverRoot="serverRoot";
	public final static String logDirectory="logDirectory";
	public final static String modulesDirectory="modulesDirectory";
	public final static String binFile="binFile";
	public final static String username="username";
	public final static String password="password";
	public final static String processInfoRefreshRate="processInfoRefreshRate";
	public final static String extendedStatus="extendedStatus";
	public final static String historyRetention="historyRetention";
	public final static String historyBuffer="historyBuffer";
	public final static String theme="theme";
	public final static String editorTheme="editorTheme";
	public final static String showTabs="showTabs";
	public final static String encoding="encoding";
	
	//Relative paths with respect to the serverRoot for configuration
	public final static String shortConfDirectory="conf";
	public final static String shortConfFile="httpd.conf";
	public final static String shortLogDirectory="logs";
	public final static String shortModulesDirectory="modules";
	public final static String shortBinDirectory="bin";
	public final static String shortBinFile=Utils.isWindows() ? "httpd.exe" : "apachectl";
	
	//Constants to search for apache directives
	public final static String documentRootDirectiveString="DocumentRoot";
	public final static String serverNameDirectiveString="ServerName";
	public final static String locationDirectiveString="Location";
	public final static String virtualHostDirectiveString="VirtualHost";
	public final static String setHandlerDirectiveString="SetHandler";
	public final static String serverInfoString="server-status";
	public final static String extendedStatusDirectiveString="ExtendedStatus";
	public final static String listenDirective="Listen";
	public final static String nameVirtualHostDirective="NameVirtualHost";
	public final static String keepAliveDirective="KeepAlive";
	public final static String keepAliveTimeoutDirective="KeepAliveTimeout";
	public final static String maxKeepAliveRequestsDirective="MaxKeepAliveRequests";
	public final static String addTypeDirective="AddType";
	public final static String typesConfigDirective="TypesConfig";
	public final static String timeoutDirective="Timeout";
	public final static String listenBackLogDirective="ListenBackLog";
	public final static String serverTokensDirective="ServerTokens";
	public final static String serverSignatureDirective="ServerSignature";
	public final static String userDirective="User";
	public final static String groupDirective="Group";
	public final static String defineDirective="Define";
	public final static String customLogDirective="CustomLog";
	public final static String directoryDirectiveString="Directory";
	public final static String customLogDirectiveString="CustomLog";
	public final static String serverRootDirectiveValue="SRVROOT";
	public final static String localhostDirective="(localhost)|(127.0.0.1)|(::1/128)|(127.0.0.0/255.0.0.0)|(::1)";
	public final static String allowDirective="(?i:allow)";
	public final static String fromDirective="(?i:from)";
	public final static String loadModuleDirective="LoadModule";
	public final static String requireDirective="(?i:require)";
	public final static String includeDirective="\\b(?i:Include|IncludeOptional)\\b";
	
	//Array of table names
	public final static String tableNames [] = {"SETTINGS","LOGDATA"};
	
	//Constants used for processes
	public final static String[] processInfoCommand=Utils.isWindows() ?  "cmd,/c,tasklist,/FO,CSV,/V,/NH".split(",") : "ps,-e,-o,user,-o,pid,-o,ppid,-o,time,-o,comm".split(",");
	public final static String processKillCommand=Utils.isWindows() ? "cmd /c taskkill /F /PID " : "kill -9 ";
	public final static String runningProcessName=".*httpd.*|.*apache2.*";//".*httpd[^\\.].*|.*apache2[^\\.].*";
	public final static String processInfoCommandAdivsory=Utils.isWindows() ? "ERROR: Please make sure tasklist.exe and taskkill.exe <br/> are installed in the /Windows/System32 directory" : "ERROR: Please make sure ps is installed and available from your $PATH";
	public final static long stopServerWaitTime=Utils.isWindows() ? 15000 : 10000;
	public final static String extendedProcessScrapeRegex="^\\d+-.*";
	public final static String extendedProcessHost="localhost";
	public final static String ServerStatusModuleName="status_module";
	
	//Constants for extended server info
	public final static String readableExtendedServerInfoQueryString="?auto";
	public final static String totalRequestsRegex="Total +Accesses";
	public final static String totalKBRegex="Total +kBytes";
	public final static String cpuUsageRegex="CPULoad";
	public final static String upTimeRegex="UpTime";
	public final static String requestsPerSecondRegex="ReqPerSec";
	public final static String bytesPerSecondRegex="BytesPerSec";
	public final static String bytesPerRequestRegex="BytesPerReq";
	public final static String busyWorkersRegex="BusyWorkers";
	public final static String idleWorkersRegex="IdleWorkers";
	
	//Directive Strings To wrote to conf file
	public final static String apacheGuiComment=Constants.newLine + Constants.newLine + "#This include was written by the apache gui program" + Constants.newLine;
	public final static String extendedStatusEnclosureTwoPointTwo = "<Location /server-status>" + Constants.newLine +
																		"SetHandler server-status" + Constants.newLine +
																		"Order deny,allow" + Constants.newLine +
																		"Deny from all" + Constants.newLine +
																		"Allow from 127.0.0.1 " + (Utils.isWindows() ? "" : "::1" ) + Constants.newLine +
																	"</Location>" + Constants.newLine + Constants.newLine;
	public final static String extendedStatusEnclosureTwoPointFour = 
																	"<Location /server-status>" + Constants.newLine +
																		"SetHandler server-status" + Constants.newLine +
																		"Require local" + Constants.newLine +
																	"</Location>" + Constants.newLine + Constants.newLine;
	public final static String extendedStatusDirective = "ExtendedStatus On" + Constants.newLine;
	public final static String guiConfFile="apachegui.conf";
	
	//Constants for logs
	public final static int maximumSearchResults=2000;
	public final static String searchFile="output.log";
	
	//Constants for searching configuration
	public final static int maximumConfigurationSearchResults=100;
	public final static int maximumFileSearchResults=100;
	
	//Constants for document file size
	public final static long maximumDocumentFilesize=1000000;//1MB
	
	//String used to sanitize configuration files
	public final static String sanitizedConfigFiles="/(logs|modules|run)(|/.*)";
	
	//Constants for modules
	public final static String staticModulesSearchString=".*\\(static\\).*";
	public final static String sharedModulesSearchString=".*\\(shared\\).*";
	public final static String staticModulesReplaceString="\\(static\\)";
	public final static String sharedModulesReplaceString="\\(shared\\)";
	public final static String staticModulesType="static";
	public final static String sharedModulesType="shared";
	public final static String availableModulesType="available";
	public final static String modulesExtensionRegex="([^\\s]+(\\.(?i)(so))$)";
	
	//Constants for file upload
	public final static int MaxFileUploadSize=1000000000;//1GB

    //Constants for history
	public final static String maxHistoricalResults="100";
	public final static String historyFilename="ApacheGUIHistory.csv";
	public final static long historyThreadDelay=(60000*60);
	public final static long rebuildIndexInterval=12;
	public final static String historyLogHolder="apacheguilogholder";
	
	//Constants for Menu
	public final static String MenuRoot="apacheRoot";
	public final static String ConfigurationRoot="Configuration-";
	public final static String DocumentsRoot="Documents-";
	public final static String LogsRoot="Logs-";
	
	//Constants used for supported user agent matching
	public final static String supportedUserAgentRegex="firefox|safari|chrome|chromium";
	
	//Constants used for server version
	public final static String versionRegex="server.*version";
	public final static String versionSupportedRegex="(\\D+2\\.2\\.[0-9]+)|(\\D+2\\.3\\.[0-9]+)|(\\D+2\\.4\\.[0-9]+)";
	public final static String versionTwoPointTwoRegex="(\\D+2\\.2\\.[0-9]+)";
	public final static String versionTwoPointThreeRegex="(\\D+2\\.3\\.[0-9]+)";
	public final static String versionTwoPointFourRegex="(\\D+2\\.4\\.[0-9]+)";
	public final static String versionSupportedString="Apache 2.2, Apache 2.3, Apache 2.4";

	//Constants used for gui info
	public final static String version="1.9.5";
	public final static String supportAddress="apachegui.ca@gmail.com";
	public final static String supportWebsite="http://forum.apachegui.ca";
	public final static String website="http://apachegui.ca";
	
	//Constants used for Global Setting
	public final static String restartWarning="If the server is currently running then it must be restarted for any changes to take effect.";

}
 