package net.apachegui.globaldirectives;

import java.util.regex.Pattern;

import net.apachegui.conf.ConfFiles;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.DirectiveParser;

public abstract class SingletonDirective extends BaseDirective {

    public SingletonDirective(String directiveName) {
        super(directiveName);
    }

    abstract SingletonDirective getConfigured() throws Exception;

    /**
     * Replaces the current directive with a new value in the configuration.
     * 
     * @throws Exception
     */
    public void saveToConfiguration(boolean includeVHosts) throws Exception {

        DirectiveParser parser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        String keepAliveDirective[] = parser.getDirectiveValue(directiveName, includeVHosts);

        if (keepAliveDirective.length > 0) {
            String file = parser.getDirectiveFile(directiveName, Pattern.compile(getReplaceValue()), includeVHosts);

            parser.setDirectiveInFile(directiveName, file, getDirectiveValue(), Pattern.compile(getReplaceValue()), true, includeVHosts);
        } else {
            ConfFiles.appendToGUIConfigFile(toString());
        }
    }

    public String getReplaceValue() {
        return "";
    }

    public String getDirectiveValue() {
        return this.toString().replaceAll(directiveName + " *", "");
    }
}
