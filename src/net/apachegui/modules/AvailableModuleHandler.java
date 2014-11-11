package net.apachegui.modules;

import java.io.FilenameFilter;
import java.util.ArrayList;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;

import org.apache.log4j.Logger;

import apache.conf.modules.AvailableModule;
import apache.conf.modules.SharedModule;
import apache.conf.modules.StaticModule;
import apache.conf.parser.File;

public class AvailableModuleHandler extends ModuleHandler {

    private static Logger log = Logger.getLogger(AvailableModuleHandler.class);

    /**
     * Gets all available modules that are not loaded through static or shared means. These modules are grabbed from the configured modules directory.
     * 
     * @return a list of available modules.
     * @throws Exception
     */
    public static AvailableModule[] getAvailableModules() throws Exception {
        log.trace("Modules.getAvailableModules called");
        String modulesDirectory = SettingsDao.getInstance().getSetting(Constants.modulesDirectory);

        File dir = new File(modulesDirectory);
        String[] children;
        // It is also possible to filter the list of returned files.
        // This example does not return any files that start with `.'.
        FilenameFilter filter = new FilenameFilter() {
            public boolean accept(java.io.File dir, String name) {
                return name.matches(Constants.modulesExtensionRegex);
            }
        };
        children = dir.list(filter);

        StaticModule staticModules[] = StaticModuleHandler.getStaticModules();
        SharedModule sharedModules[] = SharedModuleHandler.getSharedModules();

        ArrayList<AvailableModule> modules = new ArrayList<AvailableModule>();
        String name, filename;
        boolean loaded = false;
        for (int i = 0; i < children.length; i++) {
            loaded = false;
            filename = children[i];
            name = filenameToName(filename);

            // check if the name is found in any static or shared modules
            for (int j = 0; j < staticModules.length && !loaded; j++) {
                if (staticModules[j].getName().equals(name)) {
                    loaded = true;
                }
            }
            for (int j = 0; j < sharedModules.length && !loaded; j++) {
                if (sharedModules[j].getName().equals(name)) {
                    loaded = true;
                }
            }

            if (!loaded) {
                modules.add(new AvailableModule(name, filename));
            }
        }

        return modules.toArray(new AvailableModule[modules.size()]);
    }

    /**
     * Checks to see if the module specified by name is in the configured modules directory
     * 
     * @param name
     *            - the name of the module
     * @return a boolean indicating if the module is available for install
     * @throws Exception
     */
    public static boolean exists(String name) throws Exception {
        AvailableModule availableModules[] = AvailableModuleHandler.getAvailableModules();

        for (int i = 0; i < availableModules.length; i++) {
            if (availableModules[i].getName().equals(name)) {
                return true;
            }
        }

        return false;
    }
}
