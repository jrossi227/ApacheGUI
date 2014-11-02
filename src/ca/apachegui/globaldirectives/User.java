package ca.apachegui.globaldirectives;

import apache.conf.parser.DirectiveParser;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

public class User extends SingletonDirective {

    private String user;

    public User() {
        super(Constants.userDirective);
        user = "";
    }

    /**
     * Creates a User object from the directive. The directive should conform to the following format:
     * 
     * User unix-userid
     * 
     * @param directiveValue
     */
    public User(String directiveValue) {
        super(Constants.userDirective);
        user = directiveValue.trim();
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    /**
     * Static function to get the current configured User in apache. If there is no User found then a User is returned with an empty value.
     * 
     * @return a User object, if there is no User found then a User is returned with an empty value.
     * @throws Exception
     */
    public static User getServerUser() throws Exception {
        return (new User().getConfigured());
    }

    /**
     * Static function to get the current configured User in apache. If there is no User found then a User is returned with an empty value.
     * 
     * @return a User object, if there is no User found then a User is returned with an empty value.
     * @throws Exception
     */
    @Override
    User getConfigured() throws Exception {
        String user[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);

        User userFound = null;

        if (user.length == 0) {
            userFound = new User();
        } else {
            userFound = new User(user[0].trim());
        }

        return userFound;
    }

    @Override
    public String toString() {
        return directiveName + " " + this.user;
    }

}
