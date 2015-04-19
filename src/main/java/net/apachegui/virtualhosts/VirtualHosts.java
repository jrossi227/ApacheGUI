package net.apachegui.virtualhosts;

import java.util.ArrayList;

import net.apachegui.db.SettingsDao;
import net.apachegui.directives.DocumentRoot;
import net.apachegui.directives.ServerAlias;
import net.apachegui.directives.ServerName;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.Directive;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;

public class VirtualHosts {

    public static VirtualHost[] getAllVirtualHosts() throws Exception {

        EnclosureParser parser = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        Enclosure virtualHostEnclosures[] = parser.getEnclosure(Constants.VIRTUAL_HOST_DIRECTIVE_STRING, true);

        ArrayList<VirtualHost> virtualHosts = new ArrayList<VirtualHost>();

        VirtualHost virtualHost;
        for (Enclosure virtualHostEnclosure : virtualHostEnclosures) {

            virtualHost = new VirtualHost();

            virtualHost.setEnclosure(virtualHostEnclosure);
            virtualHost.setNetworkInfo(NetworkInfo.buildNetworkInfo(virtualHostEnclosure.getValue().split(" ")));

            ServerAlias serverAlias = new ServerAlias();
            for (Directive directive : virtualHostEnclosure.getDirectives()) {
                if (directive.getType().equals(Constants.SERVER_NAME_DIRECTIVE_STRING)) {
                    virtualHost.setServerName(new ServerName(directive.getValues()[0]));
                } else if (directive.getType().equals(Constants.DOCUMENT_ROOT_DIRECTIVE_STRING)) {
                    virtualHost.setDocumentRoot(new DocumentRoot(directive.getValues()[0]));
                } else if (directive.getType().equals(Constants.SERVER_ALIAS_DIRECTIVE_STRING)) {
                    for(String directiveValue : directive.getValues()) {
                        serverAlias.addHostname(directiveValue);
                    }
                }     
            }

            virtualHost.setServerAlias(serverAlias);
            
            virtualHosts.add(virtualHost);
        }

        return virtualHosts.toArray(new VirtualHost[virtualHosts.size()]);
    }
}
