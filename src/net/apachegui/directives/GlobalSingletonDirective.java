package net.apachegui.directives;

import java.util.regex.Pattern;

import net.apachegui.conf.ConfFiles;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.DirectiveParser;

public abstract class GlobalSingletonDirective extends BaseDirective {

    public GlobalSingletonDirective(String directiveName) {
        super(directiveName);
    }

    abstract GlobalSingletonDirective getGlobalConfigured() throws Exception;

    /**
     * Replaces the current directive with a new value in the configuration.
     * 
     * @throws Exception
     */
    public void saveToGlobalConfiguration(boolean includeVHosts) throws Exception {

        DirectiveParser parser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        String keepAliveDirective[] = parser.getDirectiveValue(directiveName, includeVHosts);

        if (keepAliveDirective.length > 0) {
            String file = parser.getDirectiveFile(directiveName, Pattern.compile(getGlobalReplaceValue()), includeVHosts);

            parser.setDirectiveInFile(directiveName, file, getDirectiveValue(), Pattern.compile(getGlobalReplaceValue()), true, includeVHosts);
        } else {
            ConfFiles.appendToGUIConfigFile(toString());
        }
    }

    public String getGlobalReplaceValue() {
        return "";
    }

    public String getDirectiveValue() {
        return this.toString().replaceAll(directiveName + " *", "");
    }
}
