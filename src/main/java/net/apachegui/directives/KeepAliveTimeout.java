package net.apachegui.directives;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;

import org.apache.log4j.Logger;

import apache.conf.parser.DirectiveParser;

public class KeepAliveTimeout extends GlobalSingletonDirective {

    private static Logger log = Logger.getLogger(KeepAliveTimeout.class);

    private int seconds;
    private final static int defaultSeconds = 5;

    public KeepAliveTimeout() {
        super(Constants.KEEP_ALIVE_TIMEOUT_DIRECTIVE);

        this.seconds = defaultSeconds;
    }

    public KeepAliveTimeout(int seconds) {
        super(Constants.KEEP_ALIVE_TIMEOUT_DIRECTIVE);

        this.seconds = seconds;
    }

    /**
     * Creates a KeepAliveTimeout object from the directive. The directive should conform to the following format:
     * 
     * KeepAliveTimeout seconds
     * 
     * @param directiveValue
     */
    public KeepAliveTimeout(String directiveValue) {
        super(Constants.KEEP_ALIVE_TIMEOUT_DIRECTIVE);

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

    /**
     * Static function to get the current configured KeepAliveTimeout in apache. If there is no KeepAliveTimeout found then a KeepAliveTimeout is returned with a value of 5 seconds.
     * 
     * @return a KeepAliveTimeout object, is no KeepAliveTimeout is found then a KeepAliveTimeout is returned a value of 5 seconds.
     * @throws Exception
     */
    public static KeepAliveTimeout getKeepAliveTimeout() throws Exception {
        return (new KeepAliveTimeout().getGlobalConfigured());
    }

    /**
     * Static function to get the current configured KeepAliveTimeout in apache. If there is no KeepAliveTimeout found then a KeepAliveTimeout is returned with a value of 5 seconds.
     * 
     * @return a KeepAliveTimeout object, is no KeepAliveTimeout is found then a KeepAliveTimeout is returned a value of 5 seconds.
     * @throws Exception
     */
    @Override
    public KeepAliveTimeout getGlobalConfigured() throws Exception {
        String keepAliveTimeout[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.KEEP_ALIVE_TIMEOUT_DIRECTIVE, false);

        KeepAliveTimeout keepAliveTimeoutFound = null;

        if (keepAliveTimeout.length == 0) {
            keepAliveTimeoutFound = new KeepAliveTimeout(defaultSeconds);
        } else {
            keepAliveTimeoutFound = new KeepAliveTimeout(keepAliveTimeout[0].trim());
        }

        return keepAliveTimeoutFound;
    }

    @Override
    public String toString() {
        return Constants.KEEP_ALIVE_TIMEOUT_DIRECTIVE + " " + seconds;
    }

}
