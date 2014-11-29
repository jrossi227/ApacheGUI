package net.apachegui.directives;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.DirectiveParser;

public class Group extends GlobalSingletonDirective {

    private String group;

    public Group() {
        super(Constants.groupDirective);
        group = "";
    }

    /**
     * Creates a Group object from the directive. The directive should conform to the following format:
     * 
     * Group unix-group
     * 
     * @param directiveValue
     */
    public Group(String directiveValue) {
        super(Constants.groupDirective);
        group = directiveValue.trim();
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    /**
     * Static function to get the current configured Group in apache. If there is no Group found then a Group is returned with an empty value.
     * 
     * @return a Group object, if there is no Group found then a Group is returned with an empty value.
     * @throws Exception
     */
    public static Group getServerGroup() throws Exception {
        return (new Group().getGlobalConfigured());
    }

    /**
     * Static function to get the current configured Group in apache. If there is no Group found then a Group is returned with an empty value.
     * 
     * @return a Group object, if there is no Group found then a Group is returned with an empty value.
     * @throws Exception
     */
    @Override
    Group getGlobalConfigured() throws Exception {
        String group[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);

        Group groupFound = null;

        if (group.length == 0) {
            groupFound = new Group();
        } else {
            groupFound = new Group(group[0].trim());
        }

        return groupFound;
    }

    @Override
    public String toString() {
        return directiveName + " " + this.group;
    }
}
