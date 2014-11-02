package ca.apachegui.modules;

import apache.conf.modules.StaticModule;
import apache.conf.modules.StaticModuleParser;
import apache.conf.parser.File;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;

public class StaticModuleHandler extends ModuleHandler {

    private static StaticModule savedStaticModules[] = null;

    /**
     * Gets a list of all statically loaded modules. These modules compiled into apache. These modules can never change so we only look them up once per server load.
     * 
     * @return a list of all statically loaded modules.
     * @throws Exception
     */
    public static StaticModule[] getStaticModules() throws Exception {
        if (savedStaticModules == null) {
            StaticModuleParser parser = new StaticModuleParser(new File(SettingsDao.getInstance().getSetting(Constants.binFile)));

            savedStaticModules = parser.getStaticModules();
        }
        return savedStaticModules;
    }

}
