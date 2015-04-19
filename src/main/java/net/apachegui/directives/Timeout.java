package net.apachegui.directives;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import net.apachegui.server.ServerInfo;

import org.apache.log4j.Logger;

import apache.conf.parser.DirectiveParser;

public class Timeout extends GlobalSingletonDirective {
    private static Logger log = Logger.getLogger(Timeout.class);

    private int seconds;

    public Timeout() {
        super(Constants.TIMEOUT_DIRECTIVE);

        this.seconds = getDefaultSeconds();
    }

    public Timeout(int seconds) {
        super(Constants.TIMEOUT_DIRECTIVE);

        this.seconds = seconds;
    }

    /**
     * Creates a Timeout object from the directive. The directive should conform to the following format:
     * 
     * Timeout seconds
     * 
     * @param directiveValue
     */
    public Timeout(String directiveValue) {
        super(Constants.TIMEOUT_DIRECTIVE);

        directiveValue = directiveValue.trim().toLowerCase();

        try {
            this.seconds = Integer.parseInt(directiveValue);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    public int getSeconds() {
        return seconds;
    }

    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }

    private int getDefaultSeconds() {
        try {
            if (ServerInfo.isTwoPointTwo(null)) {
                return 300;
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        return 60;
    }

    /**
     * Static function to get the current configured Timeout in apache. If there is no Timeout found then a Timeout is returned with a default value of 300 for apache 2.2 and 60 for apache 2.3 and
     * above.
     * 
     * @return a Timeout object, is no Timeout is found then a Timeout is returned a value of 300 for apache 2.2 and 60 for apache 2.3 and above.
     * @throws Exception
     */
    public static Timeout getTimeout() throws Exception {
        return (new Timeout().getGlobalConfigured());
    }

    /**
     * Static function to get the current configured Timeout in apache. If there is no Timeout found then a Timeout is returned with a value of 300 for apache 2.2 and 60 for apache 2.3 and above.
     * 
     * @return a Timeout object, is no Timeout is found then a Timeout is returned a value of 300 for apache 2.2 and 60 for apache 2.3 and above.
     * @throws Exception
     */
    @Override
    public Timeout getGlobalConfigured() throws Exception {
        String timeout[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.TIMEOUT_DIRECTIVE, false);

        Timeout timeoutFound = null;

        if (timeout.length == 0) {
            timeoutFound = new Timeout(getDefaultSeconds());
        } else {
            timeoutFound = new Timeout(timeout[0].trim());
        }

        return timeoutFound;
    }

    @Override
    public String toString() {
        return Constants.TIMEOUT_DIRECTIVE + " " + seconds;
    }
}
