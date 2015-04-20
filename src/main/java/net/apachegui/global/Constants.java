package net.apachegui.global;

import apache.conf.global.Utils;

public class Constants {
    // Global Utilities
    public final static String NEW_LINE = System.getProperty("line.separator");

    // Global database options
    public final static String PROCESS_INFO_REFRESH_RATE_DEFAULT = "5";
    public final static String EXTENDED_STATUS_DEFAULT = "off";
    public final static String DEFAULT_THEME = "claro";
    public final static String DEFAULT_HISTORY_BUFFER = "1";
    public final static String DEFAULT_HISTORY_RETENTION = "5";

    // Constants that are used to store values in the settings table
    public final static String INIT = "init";
    public final static String CONF_DIRECTORY = "confDirectory";
    public final static String CONF_FILE = "confFile";
    public final static String SERVER_ROOT = "serverRoot";
    public final static String LOG_DIRECTORY = "logDirectory";
    public final static String MODULES_DIRECTORY = "modulesDirectory";
    public final static String BIN_FILE = "binFile";
    public final static String USERNAME = "username";
    public final static String PASSWORD = "password";
    public final static String PROCESS_INFO_REFRESH_RATE = "processInfoRefreshRate";
    public final static String EXTENDED_STATUS = "extendedStatus";
    public final static String HISTORY_RETENTION = "historyRetention";
    public final static String HISTORY_BUFFER = "historyBuffer";
    public final static String THEME = "theme";
    public final static String EDITOR_THEME = "editorTheme";
    public final static String SHOW_TABS = "showTabs";
    public final static String ENCODING = "encoding";
    public final static String AUTHENTICATION_ENABLED = "authenticationEnabled";

    // Relative paths with respect to the serverRoot for configuration
    public final static String SHORT_CONF_DIRECTORY = "conf";
    public final static String SHORT_CONF_FILE = "httpd.conf";
    public final static String SHORT_LOG_DIRECTORY = "logs";
    public final static String SHORT_MODULES_DIRECTORY = "modules";
    public final static String SHORT_BIN_DIRECTORY = "bin";
    public final static String SHORT_BIN_FILE = Utils.isWindows() ? "httpd.exe" : "apachectl";

    // Constants to search for apache directives
    public final static String DOCUMENT_ROOT_DIRECTIVE_STRING = "DocumentRoot";
    public final static String SERVER_NAME_DIRECTIVE_STRING = "ServerName";
    public final static String SERVER_ALIAS_DIRECTIVE_STRING = "ServerAlias";
    public final static String LOCATION_DIRECTIVE_STRING = "Location";
    public final static String VIRTUAL_HOST_DIRECTIVE_STRING = "VirtualHost";
    public final static String SET_HANDLER_DIRECTIVE_STRING = "SetHandler";
    public final static String SERVER_INFO_STRING = "server-status";
    public final static String EXTENDED_STATUS_DIRECTIVE_STRING = "ExtendedStatus";
    public final static String LISTEN_DIRECTIVE = "Listen";
    public final static String NAME_VIRTUAL_HOST_DIRECTIVE = "NameVirtualHost";
    public final static String KEEP_ALIVE_DIRECTIVE = "KeepAlive";
    public final static String KEEP_ALIVE_TIMEOUT_DIRECTIVE = "KeepAliveTimeout";
    public final static String MAX_KEEP_ALIVE_REQUESTS_DIRECTIVE = "MaxKeepAliveRequests";
    public final static String ADD_TYPE_DIRECTIVE = "AddType";
    public final static String TYPES_CONFIG_DIRECTIVE = "TypesConfig";
    public final static String TIMEOUT_DIRECTIVE = "Timeout";
    public final static String LISTEN_BACK_LOG_DIRECTIVE = "ListenBackLog";
    public final static String SERVER_TOKENS_DIRECTIVE = "ServerTokens";
    public final static String SERVER_SIGNATURE_DIRECTIVE = "ServerSignature";
    public final static String USER_DIRECTIVE = "User";
    public final static String GROUP_DIRECTIVE = "Group";
    public final static String DEFINE_DIRECTIVE = "Define";
    public final static String CUSTOM_LOG_DIRECTIVE = "CustomLog";
    public final static String DIRECTORY_DIRECTIVE_STRING = "Directory";
    public final static String SERVER_ROOT_DIRECTIVE_VALUE = "SRVROOT";
    public final static String LOAD_MODULE_DIRECTIVE = "LoadModule";

    // Constants used for processes
    public final static String[] PROCESS_INFO_COMMAND = Utils.isWindows() ? "cmd,/c,tasklist,/FO,CSV,/V,/NH".split(",") : "ps,-e,-o,user,-o,pid,-o,ppid,-o,time,-o,comm".split(",");
    public final static String PROCESS_KILL_COMMAND = Utils.isWindows() ? "cmd /c taskkill /F /PID " : "kill -9 ";
    public final static String RUNNING_PROCESS_NAME = ".*httpd.*|.*apache2.*";// ".*httpd[^\\.].*|.*apache2[^\\.].*";
    public final static String PROCESS_INFO_COMMAND_ADIVSORY = Utils.isWindows() ? "ERROR: Please make sure tasklist.exe and taskkill.exe <br/> are installed in the /Windows/System32 directory"
            : "ERROR: Please make sure ps is installed and available from your $PATH";
    public final static long START_SERVER_WAIT_TIME = Utils.isWindows() ? 10000 : 5000;
    public final static long STOP_SERVER_WAIT_TIME = Utils.isWindows() ? 15000 : 10000;
    public final static String EXTENDED_PROCESS_HOST = "localhost";
    public final static String SERVER_STATUS_MODULE_NAME = "status_module";

    // Constants for extended server info
    public final static String READABLE_EXTENDED_SERVER_INFO_QUERY_STRING = "?auto";
    public final static String TOTAL_REQUESTS_REGEX = "Total +Accesses";
    public final static String TOTAL_KB_REGEX = "Total +kBytes";
    public final static String CPU_USAGE_REGEX = "CPULoad";
    public final static String UP_TIME_REGEX = "UpTime";
    public final static String REQUESTS_PER_SECOND_REGEX = "ReqPerSec";
    public final static String BYTES_PER_SECOND_REGEX = "BytesPerSec";
    public final static String BYTES_PER_REQUEST_REGEX = "BytesPerReq";
    public final static String BUSY_WORKERS_REGEX = "BusyWorkers";
    public final static String IDLE_WORKERS_REGEX = "IdleWorkers";

    // Directive Strings To wrote to conf file
    public final static String APACHE_GUI_COMMENT = "#This include was written by the apache gui program";
    public final static String EXTENDED_STATUS_ENCLOSURE_TWO_POINT_TWO = "<Location /server-status>" + Constants.NEW_LINE + "SetHandler server-status" + Constants.NEW_LINE + "Order deny,allow"
            + Constants.NEW_LINE + "Deny from all" + Constants.NEW_LINE + "Allow from 127.0.0.1 " + (Utils.isWindows() ? "" : "::1") + Constants.NEW_LINE + "</Location>" + Constants.NEW_LINE
            + Constants.NEW_LINE;
    public final static String EXTENDED_STATUS_ENCLOSURE_TWO_POINT_FOUR = "<Location /server-status>" + Constants.NEW_LINE + "SetHandler server-status" + Constants.NEW_LINE + "Require local"
            + Constants.NEW_LINE + "</Location>" + Constants.NEW_LINE + Constants.NEW_LINE;
    public final static String EXTENDED_STATUS_DIRECTIVE = "ExtendedStatus On" + Constants.NEW_LINE;
    public final static String GUI_CONF_FILE = "apachegui.conf";

    // Constants for logs
    public final static int MAXIMUM_SEARCH_RESULTS = 2000;
    public final static String SEARCH_FILE = "output.log";

    // Constants for searching configuration
    public final static int MAXIMUM_CONFIGURATION_SEARCH_RESULTS = 100;
    public final static int MAXIMUM_FILE_SEARCH_RESULTS = 100;

    // Constants for document file size
    public final static long MAXIMUM_DOCUMENT_FILESIZE = 1000000;// 1MB

    // Constants for modules
    public final static String STATIC_MODULES_TYPE = "static";
    public final static String SHARED_MODULES_TYPE = "shared";
    public final static String AVAILABLE_MODULES_TYPE = "available";
    public final static String MODULES_EXTENSION_REGEX = "([^\\s]+(\\.(?i)(so))$)";

    // Constants for history
    public final static String MAX_HISTORICAL_RESULTS = "100";
    public final static String HISTORY_FILENAME = "ApacheGUIHistory.csv";
    public final static String HISTORY_LOG_HOLDER = "apacheguilogholder";

    // Constants for Menu
    public final static String CONFIGURATION_ROOT = "Configuration-";
    public final static String DOCUMENTS_ROOT = "Documents-";
    public final static String LOGS_ROOT = "Logs-";

    // Constants used for supported user agent matching
    public final static String SUPPORTED_USER_AGENT_REGEX = "firefox|safari|chrome|chromium";

    // Constants used for server version
    public final static String VERSION_REGEX = "server.*version";
    public final static String VERSION_SUPPORTED_REGEX = "(\\D+2\\.2\\.[0-9]+)|(\\D+2\\.3\\.[0-9]+)|(\\D+2\\.4\\.[0-9]+)";
    public final static String VERSION_TWO_POINT_TWO_REGEX = "(\\D+2\\.2\\.[0-9]+)";
    public final static String VERSION_TWO_POINT_THREE_REGEX = "(\\D+2\\.3\\.[0-9]+)";
    public final static String VERSION_TWO_POINT_FOUR_REGEX = "(\\D+2\\.4\\.[0-9]+)";
    public final static String VERSION_SUPPORTED_STRING = "Apache 2.2, Apache 2.3, Apache 2.4";

    // Constants used for gui info
    public final static String VERSION = "1.10.0";
    public final static String SUPPORT_ADDRESS = "apachegui.net@gmail.com";
    public final static String SUPPORT_WEBSITE = "http://forum.apachegui.net";
    public final static String WEBSITE = "http://apachegui.net";

    // Constants used for Global Setting
    public final static String RESTART_WARNING = "If the server is currently running then it must be restarted for any changes to take effect.";

}
