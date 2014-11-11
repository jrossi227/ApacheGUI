package net.apachegui.globaldirectives;

import java.util.ArrayList;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;

public class AddType extends FactoryDirective {

    private String type;
    private String[] extensions;

    public AddType() {
        super(Constants.addTypeDirective);
        this.type = "";
        this.extensions = null;
    }

    /**
     * Takes an apache AddType directive String and creates a AddType object. The String must conform to the following format:
     * 
     * AddType MIME-type extension [extension] ...
     * 
     * @param directiveValue
     *            - A String with a valid apache AddType directive value
     */
    public AddType(String directiveValue) {
        super(Constants.addTypeDirective);

        directiveValue = Utils.sanitizeLineSpaces(directiveValue);

        String parts[] = directiveValue.split(" ");
        this.type = parts[0];

        ArrayList<String> extensionList = new ArrayList<String>();
        for (int i = 1; i < parts.length; i++) {
            extensionList.add(parts[i]);
        }

        this.extensions = extensionList.toArray(new String[extensionList.size()]);
    }

    public AddType(String type, String[] extensions) {
        super(Constants.addTypeDirective);

        this.type = type;
        this.extensions = extensions;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String[] getExtensions() {
        return extensions;
    }

    public void setExtensions(String[] extensions) {
        this.extensions = extensions;
    }

    /**
     * Constructs an Apache AddType directive from the current configured object.
     */
    @Override
    public String toString() {
        StringBuffer addTypeDirective = new StringBuffer();
        addTypeDirective.append(directiveName + " " + type + " ");

        for (int i = 0; i < extensions.length; i++) {
            addTypeDirective.append(extensions[i] + " ");
        }

        return addTypeDirective.toString().trim();
    }

    /**
     * Static function to get all of the configured AddTypes in apache.
     * 
     * @return an array of AddType objects
     * @throws Exception
     */
    public static AddType[] getAllAddTypes() throws Exception {
        return (new AddType().getAllConfigured());
    }

    /**
     * Function to get all of the configured AddTypes in apache.
     * 
     * @return an array of AddType objects
     * @throws Exception
     */
    @Override
    public AddType[] getAllConfigured() throws Exception {
        ArrayList<AddType> addTypes = new ArrayList<AddType>();

        String allAddTypes[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);
        for (int i = 0; i < allAddTypes.length; i++) {
            addTypes.add(new AddType(allAddTypes[i]));
        }

        return addTypes.toArray(new AddType[addTypes.size()]);
    }

    @Override
    public String getReplaceValue() {
        return type;
    }

    @Override
    public boolean equals(Object addType) {
        AddType target = (AddType) addType;

        boolean equals = true;
        if (this.type.equals(target.getType()) && (this.extensions.length == target.getExtensions().length)) {
            for (int i = 0; i < this.extensions.length; i++) {
                if (!this.extensions[i].equals(target.getExtensions()[i])) {
                    equals = false;
                    break;
                }
            }
        } else {
            equals = false;
        }

        return equals;
    }
}
