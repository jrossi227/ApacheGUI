package net.apachegui.directives;

import java.util.regex.Pattern;

import net.apachegui.conf.ConfFiles;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.DirectiveParser;

public abstract class FactoryDirective extends BaseDirective {

    public FactoryDirective(String directiveName) {
        super(directiveName);
    }

    abstract FactoryDirective[] getAllConfigured() throws Exception;

    /**
     * Creates an apache directive String and adds it to the current Apache configuration. The directive is added directly before or after the first configured Matching directive.
     * 
     * @param before
     *            - A boolean indicating if the directive should be added before the first matching directive.
     * @param includeVHosts
     *            flag to indicate whether to include directives in VirtualHosts
     * @throws Exception
     */
    public void addBeforeOrAfterFirstFoundToConfiguration(boolean before, boolean includeVHosts) throws Exception {
        FactoryDirective all[] = getAllConfigured();

        // First we check if the directive is already configured
        for (int i = 0; i < all.length; i++) {
            if (this.equals(all[i])) {
                throw new Exception("The specified directive already exists!");
            }
        }

        // Add Listen after first found listener
        new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(),
                SharedModuleHandler.getSharedModules()).insertDirectiveBeforeOrAfterFirstFound(directiveName, toString(), before, includeVHosts);
    }

    /**
     * Adds or replaces the current directive in the apache configuration. The replace value is configured through the getReplaceValue function. This function should be overridden if your require a
     * custom replace value. If a replacement is not found then the directive is added to the apache gui configuration file.
     * 
     * @throws Exception
     */
    public void addToConfiguration(boolean add, boolean includeVHosts) throws Exception {
        FactoryDirective all[] = getAllConfigured();

        for (int i = 0; i < all.length; i++) {
            if (this.equals(all[i])) {
                throw new Exception("The specified Directive already exists!");
            }
        }

        DirectiveParser parser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        String directive[] = parser.getDirectiveValue(directiveName, includeVHosts);

        boolean found = false;
        for (int i = 0; i < directive.length; i++) {
            if (directive[i].contains(getReplaceValue())) {
                String file = parser.getDirectiveFile(directiveName, Pattern.compile(getReplaceValue()), includeVHosts);

                parser.setDirectiveInFile(directiveName, file, getDirectiveValue(), Pattern.compile(getReplaceValue()), add, includeVHosts);
                found = true;
            }
        }

        if (!found) {
            ConfFiles.appendToGUIConfigFile(toString());
        }
    }

    /**
     * Removes the current directive from the apache configuration. The apache configuration is parsed and if a matching directive is found then the getReplaceValue is compared to the value of the
     * directive. If the directive value contains the replace value it will be removed from the configuration.
     * 
     * @throws Exception
     */
    public void removeFromConfiguration(boolean includeVHosts) throws Exception {
        DirectiveParser parser = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        String file = parser.getDirectiveFile(directiveName, Pattern.compile(getReplaceValue()), includeVHosts);

        parser.removeDirectiveFromFile(directiveName, file, Pattern.compile(getReplaceValue()), false, includeVHosts);
    }

    /**
     * This function should return the replacement value for comparisons when adding directives to the configuration. It should be overriden if a custom replacement value is needed.
     * 
     * @return - the replacement value.
     */
    public String getReplaceValue() {
        return getDirectiveValue();
    }

    public String getDirectiveValue() {
        return this.toString().replaceAll(directiveName + "\\s*", "");
    }

}
