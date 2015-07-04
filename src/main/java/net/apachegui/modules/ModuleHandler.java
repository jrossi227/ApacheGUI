package net.apachegui.modules;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import apache.conf.global.Utils;
import apache.conf.parser.File;

public class ModuleHandler {
    /**
     * Convert a module name to its corresponding apache module filename.
     * 
     * eg. status_module -> mod_status.so
     * 
     * @param name
     *            - the module name
     * @return the module filename
     */
    public static String nameToFilename(String name) {
        return "mod_" + name.replaceAll("_module", ".so");
    }

    /**
     * Convert a filename to its corresponding apache module name
     * 
     * eg. mod_status.so -> status_module
     * 
     * @param filename
     *            - the module filename
     * @return the module name
     */
    public static String filenameToName(String filename) {
        return filename.replaceAll("mod_", "").replaceAll("\\.(?i:so)", "") + "_module";
    }

    /**
     * Gets the LoadModule configuration string for the specified module
     * 
     * @param name
     *            - the name of the target module
     * @return
     */
    public static String getModuleConfigString(String name) {
        String configString = "";
        if (Utils.isWindows()) {
            configString = Constants.LOAD_MODULE_DIRECTIVE + " " + name + " \"" + (new File(SettingsDao.getInstance().getSetting(Constants.MODULES_DIRECTORY), nameToFilename(name))).getAbsolutePath()
                    + "\"";
        } else {
            configString = Constants.LOAD_MODULE_DIRECTIVE + " " + name + " " + (new File(SettingsDao.getInstance().getSetting(Constants.MODULES_DIRECTORY), nameToFilename(name))).getAbsolutePath();
        }
        return configString;
    }
}
