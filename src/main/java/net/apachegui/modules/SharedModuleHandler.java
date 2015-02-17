package net.apachegui.modules;

import java.util.regex.Pattern;

import net.apachegui.conf.ConfFiles;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;

import org.apache.log4j.Logger;

import apache.conf.modules.SharedModule;
import apache.conf.modules.SharedModuleParser;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.File;

public class SharedModuleHandler extends ModuleHandler {

    private static Logger log = Logger.getLogger(SharedModuleHandler.class);

    private static SharedModule savedSharedModules[] = null;

    /**
     * Adds a LoadModule declaration to the apache config for the module with the input name. Apache will need to be restarted for the change to take effect.
     * 
     * @param name
     *            - the name of the module to install.
     * @throws Exception
     */
    public static void installModule(String name) throws Exception {
        ConfFiles.appendToGUIConfigFile(ModuleHandler.getModuleConfigString(name));
    }

    /**
     * 
     * Removes the LoadModule declaration from the apache config for the module with the input name. Apache will need to be restarted for the change to take effect.
     * 
     * @param name
     *            - the name of the module to remove
     * @return a boolean indicating if the module was removed
     * @throws Exception
     */
    public static boolean removeModule(String name) throws Exception {
        DirectiveParser directiveParser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        String file = directiveParser.getDirectiveFile(Constants.loadModuleDirective, Pattern.compile(name), false);

        if (file != null) {
            log.trace("Module " + name + " Found in file " + file);
            directiveParser.removeDirectiveFromFile(Constants.loadModuleDirective, file, Pattern.compile(name), true, false);
            return true;
        }

        return false;
    }

    /**
     * Gets a list of all shared modules. These modules are included with the LoadModule Directive.
     * 
     * @return a list of all shared modules.
     * @throws Exception
     * 
     */
    public static SharedModule[] getSharedModules() throws Exception {
        log.trace("Modules.getSharedModules called");

        if (savedSharedModules == null) {
            updateSharedModules();
        }
        return savedSharedModules;
    }

    /**
     * Updates the current stored Shared Modules and saves it to prevent multiple lookups. Called on Init or configuration change.
     * 
     * @throws Exception
     * 
     */
    public static void updateSharedModules() throws Exception {
        SharedModuleParser parser = new SharedModuleParser(new File(SettingsDao.getInstance().getSetting(Constants.binFile)));

        savedSharedModules = parser.getSharedModules();
    }

}
