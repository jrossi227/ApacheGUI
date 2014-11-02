package ca.apachegui.server;

import org.apache.log4j.Logger;

import apache.conf.modules.SharedModule;
import apache.conf.modules.StaticModule;
import apache.conf.parser.Directive;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

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
            if (staticModules[i].getName().equals(Constants.ServerStatusModuleName)) {
                return true;
            }
        }

        SharedModule sharedModules[] = SharedModuleHandler.getSharedModules();
        for (int i = 0; i < sharedModules.length; i++) {
            if (sharedModules[i].getName().equals(Constants.ServerStatusModuleName)) {
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
     * <Location /server-status> SetHandler server-status Order deny,allow Deny from all Allow from 127.0.0.1 ::1 # Allow from 192.0.2.0/24 </Location>
     * 
     * @return
     * @throws Exception
     */
    public static boolean checkExtendedStatusEnclosure() throws Exception {
        log.trace("ExtendedStatusControl.checkExtendedStatusEnclosure called");
        log.trace("Checking for Extended Status Enclosure " + "\"" + Constants.locationDirectiveString + "\"");
        Enclosure enclosure[] = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getEnclosure(Constants.locationDirectiveString, false);
        Directive directives[] = null;
        for (int i = 0; i < enclosure.length; i++) {
            directives = enclosure[i].getDirectives();
            for (int j = 0; j < directives.length; j++) {
                if (directives[j].getType().equals(Constants.setHandlerDirectiveString))
                    ;
                {
                    log.trace("Found " + Constants.setHandlerDirectiveString);
                    if (directives[j].getValues().length > 0) {
                        log.trace(Constants.setHandlerDirectiveString + " has value " + directives[j].getValues()[0]);
                        if (directives[j].getValues()[0].equals(Constants.serverInfoString)) {
                            log.trace("found " + Constants.serverInfoString);
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
        log.trace("Checking for Extended Status Directive " + "\"" + Constants.extendedStatusDirectiveString + "\"");
        String extendedStatusCheck[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.extendedStatusDirectiveString, false);
        if (extendedStatusCheck.length > 0) {
            log.trace("found " + Constants.extendedStatusDirectiveString);
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
     * <Location /server-status> SetHandler server-status Order deny,allow Deny from all Allow from 127.0.0.1 ::1 # Allow from 192.0.2.0/24 </Location>
     * 
     * @return the absolute url for obtaining server status information
     * @throws Exception
     */
    public static String getExtendedStatusURL() throws Exception {
        log.trace("ExtendedRunningProcess.getExtendedProcessServerURL called");

        String URL = null;

        // Check the listen directive for a listening port
        String rootURL = Utilities.findRootURL(Constants.extendedProcessHost);
        log.trace("rootURL " + rootURL);

        String path = "";

        log.trace("Searching for Enclosure " + Constants.locationDirectiveString);
        Enclosure enclosure[] = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getEnclosure(Constants.locationDirectiveString, false);
        Directive directives[] = null;
        boolean foundDirective = false;
        for (int i = 0; i < enclosure.length && !foundDirective; i++) {
            log.trace("Enclosure " + Constants.locationDirectiveString + " found searching through directives for " + Constants.setHandlerDirectiveString);
            directives = enclosure[i].getDirectives();
            for (int j = 0; j < directives.length; j++) {
                log.trace("Directive " + directives[j].getType());
                if (directives[j].getType().equals(Constants.setHandlerDirectiveString))
                    ;
                {
                    log.trace("Found " + Constants.setHandlerDirectiveString);
                    if (directives[j].getValues().length > 0) {
                        log.trace(Constants.setHandlerDirectiveString + " has value " + directives[j].getValues()[0] + " Checking if it matches " + Constants.serverInfoString);
                        if (directives[j].getValues()[0].equals(Constants.serverInfoString)) {
                            log.trace(Constants.setHandlerDirectiveString + " has value " + directives[j].getValues()[0] + " Setting path " + enclosure[i].getValue());
                            path = enclosure[i].getValue();
                            foundDirective = true;
                        }
                    }
                }
            }
        }
        if (foundDirective)
            URL = rootURL + path;

        return URL;
    }
}
