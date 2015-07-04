package net.apachegui.directives;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.DirectiveParser;

public class KeepAlive extends GlobalSingletonDirective {
    private boolean status;

    public KeepAlive() {
        super(Constants.KEEP_ALIVE_DIRECTIVE);

        this.status = false;
    }

    /**
     * 
     * @param status
     *            - true if status is on, false if status is off
     */
    public KeepAlive(boolean status) {
        super(Constants.KEEP_ALIVE_DIRECTIVE);

        this.status = status;
    }

    /**
     * Creates a KeepAlive object from the directive. The directive should conform to the following format:
     * 
     * KeepAlive On|Off
     * 
     * @param directiveValue
     */
    public KeepAlive(String directiveValue) {
        super(Constants.KEEP_ALIVE_DIRECTIVE);

        directiveValue = directiveValue.trim().toLowerCase();

        if (directiveValue.equals("off")) {
            this.status = false;
        } else {
            this.status = true;
        }
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    /**
     * Static function to get the current configured KeepAlive in apache. If there is no KeepAlive found then a KeepAlive is returned with status true.
     * 
     * @return a KeepAlive object, is no KeepAlive is found then a KeepAlive is returned with status true.
     * @throws Exception
     */
    public static KeepAlive getKeepAlive() throws Exception {
        return (new KeepAlive().getGlobalConfigured());
    }

    /**
     * Function to get the current configured KeepAlive in apache. If there is no KeepAlive found then a KeepAlive is returned with status true.
     * 
     * @return a KeepAlive object, is no KeepAlive is found then a KeepAlive is returned with status true.
     * @throws Exception
     */
    @Override
    public KeepAlive getGlobalConfigured() throws Exception {
        String keepAlive[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);

        KeepAlive keepAliveFound = null;

        if (keepAlive.length == 0) {
            keepAliveFound = new KeepAlive(true);
        } else {
            keepAliveFound = new KeepAlive(keepAlive[0].trim());
        }

        return keepAliveFound;
    }

    @Override
    public String toString() {
        return directiveName + " " + (status == true ? "On" : "Off");
    }
}
