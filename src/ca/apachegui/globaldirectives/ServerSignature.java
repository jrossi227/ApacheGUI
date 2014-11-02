package ca.apachegui.globaldirectives;

import apache.conf.parser.DirectiveParser;
import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

public class ServerSignature extends SingletonDirective {

    private String signature;

    public final static String ON = "On";
    public final static String OFF = "Off";
    public final static String EMAIL = "Email";

    public ServerSignature() {
        super(Constants.serverSignatureDirective);

        this.signature = OFF;
    }

    /**
     * Creates a ServerSignature object from the directive. The directive should conform to the following format:
     * 
     * ServerSignature On|Off|EMail
     * 
     * @param directiveValue
     */
    public ServerSignature(String directiveValue) {
        super(Constants.serverSignatureDirective);

        directiveValue = directiveValue.trim().toLowerCase();
        if (directiveValue.equals(ON.toLowerCase())) {
            this.signature = ON;
        } else if (directiveValue.equals(EMAIL.toLowerCase())) {
            this.signature = EMAIL;
        } else {
            this.signature = OFF;
        }
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    /**
     * Static function to get the current configured ServerSignature in apache. If there is no ServerSignature found then a ServerSignature is returned with value Off.
     * 
     * @return a ServerSignature object, is no ServerSignature is found then a ServerSignature is returned with value Off.
     * @throws Exception
     */
    public static ServerSignature getServerSignature() throws Exception {
        return (new ServerSignature().getConfigured());
    }

    /**
     * Function to get the current configured ServerSignature in apache. If there is no ServerSignature found then a ServerSignature is returned with value Off.
     * 
     * @return a ServerSignature object, is no ServerSignature is found then a ServerSignature is returned with value Off.
     * @throws Exception
     */
    @Override
    public ServerSignature getConfigured() throws Exception {
        String serverSignature[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(directiveName, false);

        ServerSignature serverSignatureFound = null;

        if (serverSignature.length == 0) {
            serverSignatureFound = new ServerSignature();
        } else {
            serverSignatureFound = new ServerSignature(serverSignature[0].trim());
        }

        return serverSignatureFound;
    }

    @Override
    public String toString() {
        return directiveName + " " + this.signature;
    }
}
