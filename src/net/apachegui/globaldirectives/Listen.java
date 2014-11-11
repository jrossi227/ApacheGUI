package net.apachegui.globaldirectives;

import java.util.ArrayList;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;

/**
 * Class used to model the apache Listen Configuration directive
 * 
 * The directive has the following format Listen [IP-address:]portnumber [protocol]
 * 
 */

public class Listen extends FactoryDirective {

    private String ip;
    private int port;
    private String protocol;

    public Listen() {
        super(Constants.listenDirective);

        this.ip = "";
        this.port = 0;
        this.protocol = "";
    }

    /**
     * Takes an apache Listen directive String and creates a Listen object. The String must conform to the following format:
     * 
     * [IP-address:]portnumber [protocol]
     * 
     * @param directiveValue
     *            - A String with a valid apache Listen directive value
     */
    public Listen(String directiveValue) {
        super(Constants.listenDirective);

        directiveValue = Utils.sanitizeLineSpaces(directiveValue);

        this.ip = "";
        this.port = 0;
        this.protocol = "";
        // extract the ip address
        if (!directiveValue.contains(":")) {
            this.ip = "";

            String portProtocol[] = directiveValue.split(" ");
            this.port = Integer.parseInt(portProtocol[0]);

            if (portProtocol.length > 1) {
                this.protocol = portProtocol[1];
            }
        } else {

            if (directiveValue.contains("[") && directiveValue.contains("]")) {
                this.ip = directiveValue.substring(directiveValue.indexOf("[") + 1, directiveValue.indexOf("]"));
                String portProtocol[] = directiveValue.substring(directiveValue.lastIndexOf(":") + 1).split(" ");
                this.port = Integer.parseInt(portProtocol[0]);

                if (portProtocol.length > 1) {
                    this.protocol = portProtocol[1];
                }
            } else {
                this.ip = directiveValue.split(":")[0];

                String portProtocol[] = directiveValue.split(":")[1].split(" ");
                this.port = Integer.parseInt(portProtocol[0]);

                if (portProtocol.length > 1) {
                    this.protocol = portProtocol[1];
                }
            }
        }
    }

    /**
     * Creates a Listen object from the input parameters.
     * 
     * @param ip
     *            - A string with an ip address.
     * @param port
     *            - An integer with a valid port.
     * @param protocol
     *            - A string with a protocol
     */
    public Listen(String ip, int port, String protocol) {
        super(Constants.listenDirective);

        this.ip = (ip == null ? "" : ip);
        this.port = port;
        this.protocol = (protocol == null ? "" : protocol);
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    /**
     * Constructs an Apache Listen directive from the current configured object.
     */
    @Override
    public String toString() {
        StringBuffer listenDirective = new StringBuffer();
        listenDirective.append(directiveName + " ");

        if (!this.ip.equals("")) {
            if (this.ip.contains(":")) {
                listenDirective.append("[" + this.ip + "]:");
            } else {
                listenDirective.append(this.ip + ":");
            }
        }

        listenDirective.append(this.port);

        if (!this.protocol.equals("")) {
            listenDirective.append(" " + this.protocol);
        }

        return listenDirective.toString();
    }

    /**
     * Static function to get all of the configured Listeners in apache.
     * 
     * @return an array of Listening objects
     * @throws Exception
     */
    public static Listen[] getAllListening() throws Exception {
        return (new Listen().getAllConfigured());
    }

    /**
     * Function to get all of the configured Listeners in apache.
     * 
     * @return an array of Listening objects
     * @throws Exception
     */
    @Override
    public Listen[] getAllConfigured() throws Exception {

        ArrayList<Listen> listening = new ArrayList<Listen>();

        String listeners[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);
        for (int i = 0; i < listeners.length; i++) {
            listening.add(new Listen(listeners[i]));
        }

        return listening.toArray(new Listen[listening.size()]);
    }

    @Override
    public boolean equals(Object listener) {
        Listen target = (Listen) listener;

        if (this.ip.equals(target.getIp()) && this.port == target.getPort() && this.protocol.equals(target.getProtocol())) {
            return true;
        }

        return false;
    }

}
