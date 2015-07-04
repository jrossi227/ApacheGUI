package net.apachegui.server;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;

import org.apache.log4j.Logger;

import apache.conf.modules.SharedModule;
import apache.conf.modules.StaticModule;
import apache.conf.parser.Directive;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;

public class ExtendedStatus {
    private static Logger log = Logger.getLogger(ExtendedStatus.class);

    /**
     * Method to check if apache status module is loaded either statically (compiled in) or by the LoadModule Directive.
     * 
     * @return a boolean indicating whether the extended status has been loaded.
     * @throws Exception
     */
    public static boolean isExtendedStatusModuleLoaded() throws Exception {
        StaticModule staticModules[] = StaticModuleHandler.getStaticModules();
        for (int i = 0; i < staticModules.length; i++) {
            if (staticModules[i].getName().equals(Constants.SERVER_STATUS_MODULE_NAME)) {
                return true;
            }
        }

        SharedModule sharedModules[] = SharedModuleHandler.getSharedModules();
        for (int i = 0; i < sharedModules.length; i++) {
            if (sharedModules[i].getName().equals(Constants.SERVER_STATUS_MODULE_NAME)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Method to check if an apache restart is necessary for extended status to take effect.
     * 
     * @return true if a restart is required, false otherwise.
     * @throws Exception
     */
    public static boolean checkExtendedStatusRestart() throws Exception {
        log.trace("ExtendedStatusControl.checkExtendedStatusRestart called");
        log.trace("Checking if a restart is required for extended status");
        if (checkExtendedStatusEnclosure() && checkExtendedStatusDirective() && isExtendedStatusModuleLoaded()) {
            log.trace("no restart is required");
            return false;
        }

        log.trace("a restart is required!!");
        return true;
    }

    /**
     * Method to check if the extended status enclosure has been written to the configuration.
     * 
     * Example extended status enclosure:
     *
     * <Location /server-status> <br/>
     *      SetHandler server-status <br/>
     *      Order deny,allow <br/>
     *      Deny from all <br/>
     *      Allow from 127.0.0.1 ::1 <br/>
     * </Location> <br/>
     * 
     * @return
     * @throws Exception
     */
    public static boolean checkExtendedStatusEnclosure() throws Exception {
        log.trace("ExtendedStatusControl.checkExtendedStatusEnclosure called");
        log.trace("Checking for Extended Status Enclosure " + "\"" + Constants.LOCATION_DIRECTIVE_STRING + "\"");
        Enclosure enclosure[] = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getEnclosure(Constants.LOCATION_DIRECTIVE_STRING, false);
        Directive directives[] = null;
        for (int i = 0; i < enclosure.length; i++) {
            directives = enclosure[i].getDirectives();
            for (int j = 0; j < directives.length; j++) {
                if (directives[j].getType().equals(Constants.SET_HANDLER_DIRECTIVE_STRING)) {
                    log.trace("Found " + Constants.SET_HANDLER_DIRECTIVE_STRING);
                    if (directives[j].getValues().length > 0) {
                        log.trace(Constants.SET_HANDLER_DIRECTIVE_STRING + " has value " + directives[j].getValues()[0]);
                        if (directives[j].getValues()[0].equals(Constants.SERVER_INFO_STRING)) {
                            log.trace("found " + Constants.SERVER_INFO_STRING);
                            log.trace("Extended status enclosure found");
                            return true;
                        }
                    }
                }
            }
        }
        log.trace("Extended Status Enclosure was not found");
        return false;
    }

    /**
     * Method to check if the ExtendedStatus directive has been defined in the configuration. Extended status directive should look like the following.
     * 
     * ExtendedStatus On
     * 
     * @return true if the extended status directive is in the configuration, false otherwise.
     * @throws Exception
     */
    public static boolean checkExtendedStatusDirective() throws Exception {
        log.trace("ExtendedStatusControl.checkExtendedStatusDirective called");
        log.trace("Checking for Extended Status Directive " + "\"" + Constants.EXTENDED_STATUS_DIRECTIVE_STRING + "\"");
        String extendedStatusCheck[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.EXTENDED_STATUS_DIRECTIVE_STRING, false);
        if (extendedStatusCheck.length > 0) {
            log.trace("found " + Constants.EXTENDED_STATUS_DIRECTIVE_STRING);
            if (extendedStatusCheck[0].toLowerCase().equals("on")) {
                log.trace("Extended status directive found and is set to on");
                return true;
            } else {
                log.trace("Extended status directive found and is set to off");
            }
        }
        return false;
    }

    /**
     * Parses the apache configuration for the server status path and returns a url that can access the extended status information.
     * 
     * Example definition of server status location:
     * 
     * <Location /server-status> <br/>
     *      SetHandler server-status <br/>
     *      Order deny,allow <br/>
     *      Deny from all <br/>
     *      Allow from 127.0.0.1 ::1 <br/>
     * </Location> <br/>
     * 
     * @return the absolute url for obtaining server status information
     * @throws Exception
     */
    public static String getExtendedStatusURL() throws Exception {
        log.trace("ExtendedRunningProcess.getExtendedProcessServerURL called");

        String URL = null;

        // Check the listen directive for a listening port
        String rootURL = Utilities.findRootURL(Constants.EXTENDED_PROCESS_HOST);
        log.trace("rootURL " + rootURL);

        String path = "";

        log.trace("Searching for Enclosure " + Constants.LOCATION_DIRECTIVE_STRING);
        Enclosure enclosure[] = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getEnclosure(Constants.LOCATION_DIRECTIVE_STRING, false);
        Directive directives[] = null;
        boolean foundDirective = false;
        for (int i = 0; i < enclosure.length && !foundDirective; i++) {
            log.trace("Enclosure " + Constants.LOCATION_DIRECTIVE_STRING + " found searching through directives for " + Constants.SET_HANDLER_DIRECTIVE_STRING);
            directives = enclosure[i].getDirectives();
            for (int j = 0; j < directives.length; j++) {
                log.trace("Directive " + directives[j].getType());
                if (directives[j].getType().equals(Constants.SET_HANDLER_DIRECTIVE_STRING)) {
                    log.trace("Found " + Constants.SET_HANDLER_DIRECTIVE_STRING);
                    if (directives[j].getValues().length > 0) {
                        log.trace(Constants.SET_HANDLER_DIRECTIVE_STRING + " has value " + directives[j].getValues()[0] + " Checking if it matches " + Constants.SERVER_INFO_STRING);
                        if (directives[j].getValues()[0].equals(Constants.SERVER_INFO_STRING)) {
                            log.trace(Constants.SET_HANDLER_DIRECTIVE_STRING + " has value " + directives[j].getValues()[0] + " Setting path " + enclosure[i].getValue());
                            path = enclosure[i].getValue().replaceAll("\"", "");
                            foundDirective = true;
                        }
                    }
                }
            }
        }
        if (foundDirective) {
            URL = rootURL + path;
        }
        
        return URL;
    }
}
