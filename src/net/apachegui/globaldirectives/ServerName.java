package net.apachegui.globaldirectives;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.DirectiveParser;

public class ServerName extends SingletonDirective {

    private String scheme;
    private String domain;
    private int port;

    public ServerName() {
        super(Constants.serverNameDirectiveString);

        this.scheme = "";
        this.port = -1;
        this.domain = "";
    }

    /**
     * Creates a ServerName object from the directive. The directive should conform to the following format:
     * 
     * ServerName [scheme://]fully-qualified-domain-name[:port]
     * 
     * @param directiveValue
     */
    public ServerName(String directiveValue) {
        super(Constants.serverNameDirectiveString);

        this.scheme = "";
        this.port = -1;
        this.domain = "";

        String currentVal = directiveValue;

        if (currentVal.contains("://")) {
            this.scheme = currentVal.substring(0, currentVal.indexOf("://") + 3);
            currentVal = currentVal.substring(currentVal.indexOf("://") + 3);
        }

        if (currentVal.contains(":")) {
            this.port = Integer.parseInt(currentVal.substring(currentVal.indexOf(":") + 1));
            this.domain = currentVal.substring(0, currentVal.indexOf(":"));
        } else {
            this.domain = currentVal;
        }
    }

    /**
     * @return the scheme
     */
    public String getScheme() {
        return scheme;
    }

    /**
     * @param scheme
     *            the scheme to set
     */
    public void setScheme(String scheme) {
        this.scheme = scheme;
    }

    /**
     * @return the domain
     */
    public String getDomain() {
        return domain;
    }

    /**
     * @param domain
     *            the domain to set
     */
    public void setDomain(String domain) {
        this.domain = domain;
    }

    /**
     * @return the port
     */
    public int getPort() {
        return port;
    }

    /**
     * @param port
     *            the port to set
     */
    public void setPort(int port) {
        this.port = port;
    }

    /**
     * Static function to get the current configured ServerName in apache. If there is no ServerName found then a ServerName is returned with an empty domain.
     * 
     * @return a ServerName object, is no ServerName is found then a ServerName is returned with an empty domain.
     * @throws Exception
     */
    public static ServerName getServerName() throws Exception {
        return (new ServerName().getConfigured());
    }

    @Override
    public ServerName getConfigured() throws Exception {
        String serverName[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);

        ServerName serverNameFound = null;

        if (serverName.length == 0) {
            serverNameFound = new ServerName();
        } else {
            serverNameFound = new ServerName(serverName[0].trim());
        }

        return serverNameFound;
    }

    public String getValue() {
        return scheme + domain + (port == -1 ? "" : (":" + port));
    }

    @Override
    public String toString() {
        return directiveName + " " + getValue();
    }
}
