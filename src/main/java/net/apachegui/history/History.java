package net.apachegui.history;

import java.util.ArrayList;
import java.util.regex.Pattern;

import net.apachegui.conf.ConfFiles;
import net.apachegui.conf.Configuration;
import net.apachegui.db.SettingsDao;
import net.apachegui.directives.CustomLog;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;
import apache.conf.global.Utils;
import apache.conf.parser.Directive;
import apache.conf.parser.File;
import net.apachegui.virtualhosts.VirtualHost;
import net.apachegui.virtualhosts.VirtualHosts;

/**
 * 
 * @author jonathan Write the following config to the file LogFormat "%h\",\"%{User-agent}i\",\"%r\",\"%>s\",\"%B" apacheguilogholder CustomLog
 *         "|java -jar \"[TOMCAT_HOME]/bin/LogParser.jar\" \"[TOMCAT_HOME]/conf/server.xml\"" apacheguilogholder
 */

public class History {

    public static boolean getGlobalEnable() throws Exception {

        CustomLog customLogs[] = CustomLog.getAllCustomLogs();
        for (CustomLog customLog : customLogs) {
            if (customLog.getFormatOrNickname().equals(Constants.HISTORY_LOG_HOLDER)) {
                return true;
            }
        }

        return false;
    }

    private static String[] getIncludeStrings() {

        File cat = new File(Utilities.getTomcatInstallDirectory());
        File java = new File(Utilities.getJavaHome(), "bin/java" + (Utils.isWindows() ? ".exe" : ""));

        ArrayList<String> includeStrings = new ArrayList<String>();
        includeStrings.add("#This section is written by the apache gui do not manually edit " + Constants.HISTORY_LOG_HOLDER);
        includeStrings.add("LogFormat \"%h\\\",\\\"%{User-agent}i\\\",\\\"%r\\\",\\\"%>s\\\",\\\"%B\" " + Constants.HISTORY_LOG_HOLDER);

        includeStrings.add("CustomLog \"|\\\"" + java.getAbsolutePath() + "\\\" -jar \\\"" + (new File(cat, "bin/LogParser.jar")).getAbsolutePath() + "\\\" \\\""
                + (new File(cat, "conf/server.xml")).getAbsolutePath() + "\\\"\" " + Constants.HISTORY_LOG_HOLDER);

        return includeStrings.toArray(new String[includeStrings.size()]);
    }

    private static String getIncludeString() {
        
        String includeString = "";
        
        String includeStrings[] = getIncludeStrings();
        for(String include: includeStrings) {
            includeString += include + Constants.NEW_LINE;
        }
        
        return includeString;
    }
    
    /**
     * Method used to enable history.
     * 
     * @throws Exception
     */
    public static void globalEnable() throws Exception {
        if (getGlobalEnable()) {
            return;
        }

        String originalContents = ConfFiles.appendToGUIConfigFile(getIncludeString());
        
        String confDirectory = SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY);
        File guiFile = (new File(confDirectory, Constants.GUI_CONF_FILE));
        Configuration.testChanges(guiFile.getAbsolutePath(), originalContents);
    }

    /**
     * Method used to disable history.
     * 
     * @throws Exception
     */
    public static void globalDisable() throws Exception {
        if (!getGlobalEnable()) {
            return;
        }

        String originalContents = ConfFiles.removeFromGUIConfigFile(".*" + Constants.HISTORY_LOG_HOLDER + ".*");
        
        String confDirectory = SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY);
        File guiFile = (new File(confDirectory, Constants.GUI_CONF_FILE));
        Configuration.testChanges(guiFile.getAbsolutePath(), originalContents);
    }

    public static void enable(VirtualHost host) throws Exception {
        String originalContents = ConfFiles.writeToConfigFile(new File(host.getEnclosure().getFile()), getIncludeStrings(), host.getEnclosure().getLineOfEnd(), true);
        Configuration.testChanges(host.getEnclosure().getFile(), originalContents);
    }

    public static void disable(VirtualHost host) throws Exception {
        String originalContents = ConfFiles.deleteFromConfigFile(Pattern.compile(".*" + Constants.HISTORY_LOG_HOLDER + ".*", Pattern.CASE_INSENSITIVE), new File(host.getEnclosure().getFile()), host.getEnclosure().getLineOfStart(), host.getEnclosure().getLineOfEnd(), true);
        Configuration.testChanges(host.getEnclosure().getFile(), originalContents);
    }

    /**
     * Function to grab the hosts that are enabled and do contain their own CustomLog
     * 
     * @return
     * @throws Exception
     */
    public static VirtualHost[] getEnabledHosts() throws Exception {

        VirtualHost virtualHosts[] = VirtualHosts.getAllVirtualHosts();

        ArrayList<VirtualHost> enabledVirtualHosts = new ArrayList<VirtualHost>();

        Directive directives[];
        String values[];

        OUTER: for (VirtualHost virtualHost : virtualHosts) {
            directives = virtualHost.getEnclosure().getDirectives();

            for (Directive directive : directives) {
                if (directive.getType().equals(Constants.CUSTOM_LOG_DIRECTIVE)) {
                    values = directive.getValues();
                    for (String value : values) {
                        if (value.equals(Constants.HISTORY_LOG_HOLDER)) {
                            enabledVirtualHosts.add(virtualHost);

                            continue OUTER;
                        }
                    }
                }
            }
        }

        return enabledVirtualHosts.toArray(new VirtualHost[enabledVirtualHosts.size()]);
    }

    /**
     * Function to grab the hosts that are disabled and do contain their own CustomLog
     * 
     * @return
     * @throws Exception
     */
    public static VirtualHost[] getDisabledHosts() throws Exception {

        VirtualHost virtualHosts[] = VirtualHosts.getAllVirtualHosts();

        ArrayList<VirtualHost> disabledVirtualHosts = new ArrayList<VirtualHost>();

        Directive directives[];
        String values[];

        boolean containsCustomLog = false;

        OUTER: for (VirtualHost virtualHost : virtualHosts) {

            containsCustomLog = false;
            directives = virtualHost.getEnclosure().getDirectives();

            for (Directive directive : directives) {
                if (directive.getType().equals(Constants.CUSTOM_LOG_DIRECTIVE)) {
                    containsCustomLog = true;

                    values = directive.getValues();
                    for (String value : values) {
                        if (value.equals(Constants.HISTORY_LOG_HOLDER)) {
                            continue OUTER;
                        }
                    }
                }
            }

            if (containsCustomLog) {
                disabledVirtualHosts.add(virtualHost);
            }
        }

        return disabledVirtualHosts.toArray(new VirtualHost[disabledVirtualHosts.size()]);
    }

    /**
     * Function to grab the hosts that do not contain their own CustomLog
     * 
     * @return
     * @throws Exception
     */
    public static VirtualHost[] getGlobalHosts() throws Exception {

        VirtualHost virtualHosts[] = VirtualHosts.getAllVirtualHosts();

        ArrayList<VirtualHost> globalVirtualHosts = new ArrayList<VirtualHost>();

        Directive directives[];

        boolean containsCustomLog = false;

        for (VirtualHost virtualHost : virtualHosts) {
            containsCustomLog = false;
            directives = virtualHost.getEnclosure().getDirectives();

            for (Directive directive : directives) {
                if (directive.getType().equals(Constants.CUSTOM_LOG_DIRECTIVE)) {
                    containsCustomLog = true;
                    break;
                }
            }

            if (!containsCustomLog) {
                globalVirtualHosts.add(virtualHost);
            }
        }

        return globalVirtualHosts.toArray(new VirtualHost[globalVirtualHosts.size()]);
    }
}
