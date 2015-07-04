package net.apachegui.directives;

import java.util.ArrayList;

import net.apachegui.global.Constants;

/**
 * Creates a ServerAlias object. The object should conform to the following format:
 * 
 * ServerAlias hostname [hostname] ...
 * 
 */
public class ServerAlias extends BaseDirective {

    private ArrayList<String> hostnames;
    
    public ServerAlias() {
        super(Constants.SERVER_ALIAS_DIRECTIVE_STRING);

        this.hostnames = new ArrayList<String>();
    }

    public String[] getHostnames() {
        return hostnames.toArray(new String[this.hostnames.size()]);
    }

    public void addHostname(String hostname) {
        this.hostnames.add(hostname);
    }
    
    public void removeHostname(String hostname) {
        this.hostnames.remove(hostname);
    }
    
    public String getValue() {
        String values = "";
        for(int i=0; i<hostnames.size(); i++) {
            values += hostnames.get(i) + " ";
        }
        
        return values.trim();
    }

    @Override
    public String toString() {
        return directiveName + " " + getValue();
    }
}
