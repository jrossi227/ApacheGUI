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
    public void saveToGlobalConfiguration() throws Exception {

        DirectiveParser parser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        String keepAliveDirective[] = parser.getDirectiveValue(directiveName, false);

        if (keepAliveDirective.length > 0) {
            String file = parser.getDirectiveFile(directiveName, getGlobalReplacePattern(), false);

            parser.setDirectiveInFile(directiveName, file, getDirectiveValue(), getGlobalReplacePattern(), true, false);
        } else {
            ConfFiles.appendToGUIConfigFile(toString());
        }
    }

    /**
     * This function should return the replacement value for comparisons when updating a directive in the configuration. It should be overridden if a custom replacement value is needed.
     * 
     * @return the replacement value.
     */
    public String getGlobalReplaceValue() {
        return "";
    }
    
    /**
     * This function should return the replacement pattern for comparisons when adding directives to the configuration. It should be overridden if a custom replacement pattern is needed.
     * 
     * @return the replacement pattern.
     */
    public Pattern getGlobalReplacePattern() {
        return Pattern.compile(Pattern.quote(getGlobalReplaceValue()));
    }

    public String getDirectiveValue() {
        return this.toString().replaceAll(directiveName + " *", "");
    }
}
