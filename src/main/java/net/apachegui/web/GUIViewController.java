package net.apachegui.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.apachegui.conf.ServerMime;
import net.apachegui.db.LogDataDao;
import net.apachegui.db.Timestamp;
import net.apachegui.db.UsersDao;
import net.apachegui.directives.Group;
import net.apachegui.directives.KeepAlive;
import net.apachegui.directives.KeepAliveTimeout;
import net.apachegui.directives.ListenBackLog;
import net.apachegui.directives.MaxKeepAliveRequests;
import net.apachegui.directives.ServerSignature;
import net.apachegui.directives.ServerTokens;
import net.apachegui.directives.Timeout;
import net.apachegui.directives.User;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;
import net.apachegui.server.ServerInfo;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import apache.conf.global.Utils;
import apache.conf.parser.File;

@Controller
public class GUIViewController {

    private static Logger log = Logger.getLogger(GUIViewController.class);

    @ModelAttribute("theme")
    public String getTheme() {
        return ((net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.THEME) == null) ? Constants.DEFAULT_THEME : net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.THEME));
    }

    @ModelAttribute("version")
    public String getVersion() {
        return Constants.VERSION;
    }

    @ModelAttribute("windows")
    public boolean getWindows() {
        return Utils.isWindows();
    }

    @ModelAttribute("enableAuthentication")
    public String getEnableAuthentication() {
        String enableAuthentication = net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.ENABLE_AUTHENTICATION);
        enableAuthentication = (enableAuthentication == null ? "" : enableAuthentication);

        return enableAuthentication;
    }

    @ModelAttribute("confDirectory")
    public String getConfDirectory() {
        return net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY);
    }

    @ModelAttribute("restartWarning")
    public String getRestartWarning() {
        return Constants.RESTART_WARNING;
    }

    @RequestMapping(value = "/")
    public void indexPage(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.sendRedirect(request.getContextPath() + "/jsp/GUISettings.jsp");
    }

    @RequestMapping(value = "/{jspName}.jsp")
    public String renderRootViewJsp(@PathVariable String jspName) {
        return "views/" + jspName;
    }

    @RequestMapping(value = "/jsp/Logout.jsp")
    public void renderLogoutView(HttpServletRequest request, HttpServletResponse response) throws IOException {

        HttpSession sessions = request.getSession(false);

        if (sessions != null) {
            sessions.invalidate();
        }

        response.sendRedirect(request.getContextPath());
    }

    @RequestMapping(value = "/jsp/Login.jsp")
    public String renderLoginViewJsp(@RequestParam(value = "error", required = false) String error, HttpServletRequest request, Model model) {

        model.addAttribute("advisory", UsersDao.getInstance().getLoginAdvisory());

        String userAgent = request.getHeader("User-Agent");
        model.addAttribute("supportedBrowser", Utils.matchUserAgent(userAgent, Constants.SUPPORTED_USER_AGENT_REGEX));
        model.addAttribute("error", error == null ? false : true);

        return "views/Login";
    }

    @RequestMapping(value = "/jsp/Logs.jsp")
    public String renderLogsViewJsp(@RequestParam(value = "option", required = false) String option, @RequestParam(value = "file") String file, Model model) {
        if (option == null) {
            option = "search";
        }

        File logFile = new File(file);

        model.addAttribute("filePath", logFile.getAbsolutePath());
        model.addAttribute("fileSize", ((double) (logFile.length()) / 1000));
        model.addAttribute("option", option);

        return "views/Logs";
    }

    @RequestMapping(value = "/jsp/GUISettings.jsp")
    public String renderGUISettingsViewJsp(Model model) {

        model.addAttribute("website", Constants.WEBSITE);
        model.addAttribute("supportWebsite", Constants.SUPPORT_WEBSITE);
        model.addAttribute("supportAddress", Constants.SUPPORT_ADDRESS);

        return "views/GUISettings";
    }

    @RequestMapping(value = "/jsp/SearchResults.jsp")
    public String renderSearchResultsViewJsp(@RequestParam(value = "query") String query, Model model) throws UnsupportedEncodingException {

        model.addAttribute("query", URLEncoder.encode(query, "UTF-8"));

        return "views/SearchResults";
    }

    @RequestMapping(value = "/jsp/GenerateGraph.jsp")
    public String renderGenerateGraphViewJsp(@RequestParam(value = "date") String date, @RequestParam(value = "type") String type, @RequestParam(value = "host") String host,
            @RequestParam(value = "userAgent") String userAgent, @RequestParam(value = "requestString") String requestString, @RequestParam(value = "status") String status,
            @RequestParam(value = "contentSize") String contentSize, Model model) throws Exception {

        Calendar cal = Calendar.getInstance();

        StringBuffer coordinates = new StringBuffer();
        if (type.equals("day")) {
            SimpleDateFormat startDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            java.util.Date startParsedDate = startDateFormat.parse(date + " 00:00:00");
            Timestamp startTimestamp = new Timestamp(startParsedDate.getTime());
            String query = LogDataDao.getInstance().generateDailyReportByHourQuery(startTimestamp, host, userAgent, requestString, status, contentSize);
            int hourCount[] = LogDataDao.getInstance().executeDailyReportByHourQuery(query);
            for (int i = 0; i < hourCount.length; i++) {
                coordinates.append("[" + i + "," + hourCount[i] + "]");
                if (i != (hourCount.length - 1))
                    coordinates.append(",");
            }
        }
        if (type.equals("month")) {
            SimpleDateFormat startDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            java.util.Date startParsedDate = startDateFormat.parse(date + " 00:00:00");
            Timestamp startTimestamp = new Timestamp(startParsedDate.getTime());
            cal.setTimeInMillis(startParsedDate.getTime());
            String query = LogDataDao.getInstance().generateMonthlyReportByDayQuery(startTimestamp, host, userAgent, requestString, status, contentSize);
            int dayCount[] = LogDataDao.getInstance().executeMonthlyReportByDayQuery(query, startTimestamp);

            for (int i = 1; i < dayCount.length; i++) {
                coordinates.append("[" + i + "," + dayCount[i] + "]");
                if (i != (dayCount.length - 1))
                    coordinates.append(",");
            }
        }

        model.addAttribute("coordinates", coordinates.toString());

        String dateTitle = "";
        if (type.equals("day")) {
            dateTitle = "Day " + date;
        }

        if (type.equals("month")) {
            dateTitle = "Month " + (cal.get(Calendar.MONTH) + 1) + "/" + cal.get(Calendar.YEAR);
        }

        model.addAttribute("dateTitle", dateTitle);

        return "views/GenerateGraph";
    }

    @RequestMapping(value = "/jsp/Documents.jsp")
    public String renderDocumentsViewJsp(@RequestParam(value = "file") String filePath, Model model) {

        String fileType = "text";
        String mode = "'plain'";

        File file = new File(filePath);

        int extension = file.getName().indexOf(".");
        if (extension != -1) {
            String ext = file.getName().substring(extension + 1);
            if (ext.matches(Utilities.extensionsToRegex(new String[] { "jpg", "jpeg", "bmp", "tif", "tiff", "gif", "png", "jpe", "ico", "svg" })) && file.exists()) {
                fileType = "image";
            } else {
                if (ext.matches(Utilities.extensionsToRegex(new String[] { "html", "htm", "xhtml", "shtml", "htt", "stm", "xht" }))) {
                    mode = "'html'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "conf", "htaccess" }))) {
                    mode = "'conf'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "css" }))) {
                    mode = "'css'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "xml", "wsdl", "rdf", "rss", "xsl", "xsd", "dtd" }))) {
                    mode = "'xml'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "js" }))) {
                    mode = "'javascript'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "json" }))) {
                    mode = "'json'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "php", "phtml", "pht", "phps", "php3", "php3p", "php4", "php5" }))) {
                    mode = "'php'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "py", "pyc", "pyo" }))) {
                    mode = "'python'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "pl", "cgi" }))) {
                    mode = "'perl'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "sh" }))) {
                    mode = "'shell'";
                } else if (ext.matches(Utilities.extensionsToRegex(new String[] { "properties", "ini" }))) {
                    mode = "'properties'";
                }
            }
        }

        model.addAttribute("filePath", file.getAbsolutePath());
        model.addAttribute("fileType", fileType);
        model.addAttribute("mode", mode);
        model.addAttribute("openTime", (new Date()).getTime());

        return "views/Documents";
    }

    @RequestMapping(value = "/jsp/Control.jsp")
    public String renderControlViewJsp(Model model) throws Exception {

        String startCommand = net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.BIN_FILE) + " " + (Utils.isWindows() ? "-k" : "");
        String stopCommand = net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.BIN_FILE) + " " + (Utils.isWindows() ? "-k" : "");
        String restartCommand = net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.BIN_FILE) + " " + (Utils.isWindows() ? "-k" : "");

        model.addAttribute("startCommand", startCommand);
        model.addAttribute("stopCommand", stopCommand);
        model.addAttribute("restartCommand", restartCommand);
        model.addAttribute("isServerRunning", net.apachegui.server.Control.isServerRunning());

        return "views/Control";
    }

    @RequestMapping(value = "/jsp/Configuration.jsp")
    public String renderConfigurationViewJsp(@RequestParam(value = "file") String filePath, Model model) {

        String mode = "'plain'";

        File file = new File(filePath);

        int extension = file.getName().indexOf(".");
        if (extension != -1) {
            String ext = file.getName().substring(extension + 1);

            if (ext.matches(Utilities.extensionsToRegex(new String[] { "conf","htaccess" }))) {
                mode = "'conf'";
            }
        }

        model.addAttribute("filePath", file.getAbsolutePath());
        model.addAttribute("openTime", (new Date()).getTime());
        model.addAttribute("mode", mode);

        return "views/Configuration";
    }

    // Catch all view render
    @RequestMapping(value = "/jsp/VirtualHosts.jsp")
    public String renderVirtualHostsViewJsp() {

        return "views/VirtualHosts";
    }

    // Catch all view render
    @RequestMapping(value = "/jsp/History.jsp")
    public String renderHistoryViewJsp(Model model) {

        model.addAttribute("databaseFile", (new File(Utilities.getTomcatInstallDirectory(), "db/apachegui-history-database.db")).getAbsolutePath());

        return "views/History";
    }

    // Catch all view render
    @RequestMapping(value = "/jsp/{jspName}.jsp")
    public String renderViewJsp(@PathVariable String jspName) {
        return "views/" + jspName;
    }

    @RequestMapping(value = "/jsp/editor/EditorMenu.jsp")
    public String renderEditorMenuViewJsp(@RequestParam(value = "option", required = false) String option, Model model) {

        model.addAttribute("option", option == null ? "" : option);

        return "views/editor/EditorMenu";
    }

    @RequestMapping(value = "/jsp/editor/{jspName}.jsp")
    public String renderEditorViewJsp(@PathVariable String jspName) {
        return "views/editor/" + jspName;
    }

    @RequestMapping(value = "/jsp/global_settings/Networking.jsp")
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

        model.addAttribute("NameVhostSupport", ServerInfo.isTwoPointTwo(null));

        return "views/global_settings/Networking";
    }

    @RequestMapping(value = "/jsp/global_settings/Mime.jsp")
    public String renderMimeViewJsp(Model model) throws Exception {

        model.addAttribute("serverMimeFile", ServerMime.getServerMimeFile());
        model.addAttribute(
                "serverMimesWarning",
                "If you wish to modify MIME types it is recommended that you add them to the Added MIME Types in the tab below. Any MIMES that are added or modified in the server MIME file may be removed if there is a server or operating system update. If you wish to add MIMES to the server MIME file then you will have to open the file and manually do so.");

        return "views/global_settings/Mime";
    }

    @RequestMapping(value = "/jsp/global_settings/Modules.jsp")
    public String renderModulesViewJsp(Model model) throws Exception {

        model.addAttribute("modulesDirectory", net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.MODULES_DIRECTORY));
        model.addAttribute("availableModulesType", Constants.AVAILABLE_MODULES_TYPE);
        model.addAttribute("sharedModulesType", Constants.SHARED_MODULES_TYPE);
        model.addAttribute("staticModulesType", Constants.STATIC_MODULES_TYPE);

        return "views/global_settings/Modules";
    }

}
