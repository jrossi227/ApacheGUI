package ca.apachegui.history;

import java.util.ArrayList;

import apache.conf.global.Utils;
import apache.conf.parser.Directive;
import apache.conf.parser.File;
import ca.apachegui.conf.ConfFiles;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;
import ca.apachegui.globaldirectives.CustomLog;
import ca.apachegui.virtualhosts.VirtualHost;
import ca.apachegui.virtualhosts.VirtualHosts;

/**
 * 
 * @author jonathan Write the following config to the file LogFormat "%h\",\"%{User-agent}i\",\"%r\",\"%>s\",\"%B" apacheguilogholder CustomLog
 *         "|java -jar \"[TOMCAT_HOME]/bin/LogParser.jar\" \"[TOMCAT_HOME]/conf/server.xml\"" apacheguilogholder
 */

public class History {

    public static boolean getGlobalEnable() throws Exception {

        CustomLog customLogs[] = CustomLog.getAllCustomLogs();
        for (CustomLog customLog : customLogs) {
            if (customLog.getFormatOrNickname().equals(Constants.historyLogHolder)) {
                return true;
            }
        }

        return false;
    }

    private static String getIncludeString() {

        File cat = new File(Utilities.getTomcatInstallDirectory());
        File java = new File(Utilities.getJavaHome(), "bin/java" + (Utils.isWindows() ? ".exe" : ""));

        String includeString = "#This section is written by the apache gui do not manually edit " + Constants.historyLogHolder + Constants.newLine
                + "LogFormat \"%h\\\",\\\"%{User-agent}i\\\",\\\"%r\\\",\\\"%>s\\\",\\\"%B\" " + Constants.historyLogHolder + Constants.newLine;

        includeString += "CustomLog \"|\\\"" + java.getAbsolutePath() + "\\\" -jar \\\"" + (new File(cat, "bin/LogParser.jar")).getAbsolutePath() + "\\\" \\\""
                + (new File(cat, "conf/server.xml")).getAbsolutePath() + "\\\"\" " + Constants.historyLogHolder + Constants.newLine;

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

        ConfFiles.appendToGUIConfigFile(getIncludeString());
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

        ConfFiles.removeFromGUIConfigFile(".*" + Constants.historyLogHolder + ".*");

    }

    public static void enable(VirtualHost host) throws Exception {
        ConfFiles.writeToConfigFile(host.getFile(), getIncludeString(), host.getLineOfEnd());
    }

    public static void disable(VirtualHost host) throws Exception {
        ConfFiles.deleteFromConfigFile(".*" + Constants.historyLogHolder + ".*", host.getFile(), host.getLineOfStart(), host.getLineOfEnd(), true);
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
            directives = virtualHost.getDirectives();

            for (Directive directive : directives) {
                if (directive.getType().equals(Constants.customLogDirective)) {
                    values = directive.getValues();
                    for (String value : values) {
                        if (value.equals(Constants.historyLogHolder)) {
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
            directives = virtualHost.getDirectives();

            for (Directive directive : directives) {
                if (directive.getType().equals(Constants.customLogDirective)) {
                    containsCustomLog = true;

                    values = directive.getValues();
                    for (String value : values) {
                        if (value.equals(Constants.historyLogHolder)) {
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
            directives = virtualHost.getDirectives();

            for (Directive directive : directives) {
                if (directive.getType().equals(Constants.customLogDirective)) {
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
