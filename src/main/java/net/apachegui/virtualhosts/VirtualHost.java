package net.apachegui.virtualhosts;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import net.apachegui.directives.DocumentRoot;
import net.apachegui.directives.ServerAlias;
import net.apachegui.directives.ServerName;
import net.apachegui.global.Utilities;

import org.json.JSONArray;
import org.json.JSONObject;

import apache.conf.parser.ConfigurationLine;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;
import apache.conf.parser.Parser;

/**
 * File used to model an Apache Virtual Host Virtual Host takes on the following format: <VirtualHost addr[:port] [addr[:port]] ...> ... </VirtualHost>
 * 
 * @author jonathan
 *
 */

public class VirtualHost {
    
    private Enclosure enclosure;
    private List<NetworkInfo> networkInfo;
    private DocumentRoot documentRoot;
    private ServerName serverName;
    private ServerAlias serverAlias;

    public VirtualHost() {
        networkInfo = new ArrayList<NetworkInfo>();
        documentRoot = new DocumentRoot();
        serverName = new ServerName();
        serverAlias = new ServerAlias();
        enclosure = new Enclosure();
    }

    public Enclosure getEnclosure() {
        return enclosure;
    }

    public void setEnclosure(Enclosure enclosure) {
        this.enclosure = enclosure;
    }

    public NetworkInfo[] getNetworkInfo() {
        return networkInfo.toArray(new NetworkInfo[networkInfo.size()]);
    }

    public void setNetworkInfo(NetworkInfo[] networkInfo) {
        this.networkInfo = Arrays.asList(networkInfo);
    }

    public DocumentRoot getDocumentRoot() {
        return documentRoot;
    }

    public void setDocumentRoot(DocumentRoot documentRoot) {
        this.documentRoot = documentRoot;
    }

    public ServerName getServerName() {
        return serverName;
    }

    public void setServerName(ServerName serverName) {
        this.serverName = serverName;
    }

    public ServerAlias getServerAlias() {
        return serverAlias;
    }

    public void setServerAlias(ServerAlias serverAlias) {
        this.serverAlias = serverAlias;
    }

    public String toJSON() throws ParseException {

        JSONObject json = new JSONObject();

        json.put("file", this.enclosure.getFile());
        json.put("lineOfStart", this.enclosure.getLineOfStart());
        json.put("lineOfEnd", this.enclosure.getLineOfEnd());

        JSONArray networkInfoArray = new JSONArray();

        for (NetworkInfo info : networkInfo) {
            networkInfoArray.put(new JSONObject(info.toJSON()));
        }

        json.put("NetworkInfo", networkInfoArray);

        json.put("DocumentRoot", documentRoot.getValue());
        json.put("ServerName", serverName.getValue());       
        json.put("ServerAlias", serverAlias.getValue());        
        json.put("tree",toTreeJSON());
        
        return json.toString();
    }

    private String getNameFromParts(String parts[]) {
        String name = Utilities.join(parts, " ");
        
        name = "<strong>" + name.replaceFirst(" ", "</strong> ");
        
        return name;
    }
    
    public JSONObject toTreeJSON() {
        
        JSONObject tree = new JSONObject();
        tree.put("identifier", "id");
        tree.put("label", "name");
        
        JSONArray items = new JSONArray();
        
        String line = enclosure.getConfigurationLines()[0].getProcessedLine();
        
        String parts[] = EnclosureParser.extractEnclosureToParts(line);
        String name = getNameFromParts(parts);
        
        JSONObject children = new JSONObject(); 
        children.put("id", 0);
        children.put("name", name);
        children.put("type", parts[0]);
        children.put("value", name.substring(name.indexOf(" ") + 1));
        children.put("lineOfStart", enclosure.getConfigurationLines()[0].getLineOfStart());
        children.put("lineOfEnd", enclosure.getConfigurationLines()[0].getLineOfEnd());
        children.put("lineType", "enclosure");
        children.put("enclosureLineOfStart", enclosure.getLineOfStart());
        children.put("enclosureLineOfEnd", enclosure.getLineOfEnd());
        children.put("children", toTreeJSON(enclosure, 1));
        items.put(children);
                       
        tree.put("items", items);
        
        return tree;
    }
    
    //meat and bones of processing here
    public JSONArray toTreeJSON(Enclosure enclosure, int lineNum) {
        
        JSONArray enclosureArray = new JSONArray();
        
        ConfigurationLine configurationLines[] = enclosure.getConfigurationLines();
        
        int enclosureCount = 0;
        String line;
        for(int i=0; i<configurationLines.length; i++) {
            lineNum ++;
            
            line = configurationLines[i].getProcessedLine();
            
            if(Parser.isEnclosureMatch(line) && i > 0) {
                String parts[] = EnclosureParser.extractEnclosureToParts(line);
                String name = getNameFromParts(parts);
                
                JSONObject children = new JSONObject(); 
                children.put("id", lineNum);
                children.put("name", name);
                children.put("type", parts[0]);
                children.put("value", name.substring(name.indexOf(" ") + 1));
                children.put("lineOfStart", configurationLines[i].getLineOfStart());
                children.put("lineOfEnd", configurationLines[i].getLineOfEnd());
                children.put("lineType", "enclosure");
                children.put("enclosureLineOfStart", enclosure.getEnclosures()[enclosureCount].getLineOfStart());
                children.put("enclosureLineOfEnd", enclosure.getEnclosures()[enclosureCount].getLineOfEnd());
                children.put("children", toTreeJSON(enclosure.getEnclosures()[enclosureCount], lineNum));
                
                //iterate the line counter with the number of lines in the enclosure
                lineNum += (enclosure.getEnclosures()[enclosureCount].getLineOfEnd() - enclosure.getEnclosures()[enclosureCount].getLineOfStart());
                
                enclosureArray.put(children);
                enclosureCount ++;
            } else if((!Parser.isEnclosureMatch(line) && !Parser.isCloseEnclosureMatch(line))) {
                String parts[] = DirectiveParser.extractDirectiveToParts(line);
                String name = getNameFromParts(parts);
                
                JSONObject directive = new JSONObject();
                directive.put("id", lineNum);
                directive.put("name", name);
                directive.put("type", parts[0]);
                directive.put("value", name.substring(name.indexOf(" ") + 1));
                directive.put("lineOfStart", configurationLines[i].getLineOfStart());
                directive.put("lineOfEnd", configurationLines[i].getLineOfEnd());
                directive.put("lineType", "directive");
                
                enclosureArray.put(directive);
                
            }
        }
        
        return enclosureArray;
    }
    
    @Override
    public String toString() {

        StringBuffer virtualHostBuffer = new StringBuffer();
        virtualHostBuffer.append("\nFile: " + this.enclosure.getFile() == null ? "" : this.enclosure.getFile() + "\n");
        virtualHostBuffer.append("LineOfStart: " + this.enclosure.getLineOfStart() + "\n");
        virtualHostBuffer.append("LineOfEnd: " + this.enclosure.getLineOfEnd() + "\n");

        for (NetworkInfo info : networkInfo) {
            virtualHostBuffer.append("NetworkInfo: " + info.toString() + "\n");
        }

        virtualHostBuffer.append("DocumentRoot: " + documentRoot.getValue() + "\n");
        virtualHostBuffer.append("ServerName: " + serverName.getValue() + "\n");
        virtualHostBuffer.append("ServerAlias: " + serverAlias.getValue() + "\n");

        return virtualHostBuffer.toString();
    }
    
    @Override
    public boolean equals(Object o) {

        VirtualHost host = (VirtualHost) o;
        if (!host.getServerName().getValue().equals(this.serverName.getValue())) {
            return false;
        }

        NetworkInfo[] networkInfos = host.getNetworkInfo();

        boolean foundNetworkInfo = true;

        if (networkInfos.length != this.networkInfo.size()) {
            foundNetworkInfo = false;
        } else {
            for (int i = 0; i < this.networkInfo.size() && foundNetworkInfo; i++) {
                foundNetworkInfo = false;

                for (int j = 0; j < networkInfos.length; j++) {
                    if (this.networkInfo.get(i).equals(networkInfos[j])) {
                        foundNetworkInfo = true;
                        break;
                    }
                }
            }
        }

        return foundNetworkInfo;
    }
    
    public boolean equals(JSONObject host) {
        
        if (!this.serverName.getValue().equals(host.getString("ServerName"))) {
            return false;
        }

        NetworkInfo[] serverNetworkInfo = this.getNetworkInfo();
        JSONArray clientNetworkInfo = host.getJSONArray("NetworkInfo");
        
        boolean foundNetworkInfo = true;

        if (serverNetworkInfo.length != clientNetworkInfo.length()) {
            foundNetworkInfo = false;
        } else {
            for (int i = 0; i < serverNetworkInfo.length && foundNetworkInfo; i++) {
                foundNetworkInfo = false;

                for (int j = 0; j < clientNetworkInfo.length(); j++) {

                    JSONObject currClientNetworkInfo = clientNetworkInfo.getJSONObject(j);
                    NetworkInfo cmpInfo = new NetworkInfo(currClientNetworkInfo.getInt("port"), currClientNetworkInfo.getString("address"));

                    if (serverNetworkInfo[i].equals(cmpInfo)) {
                        foundNetworkInfo = true;
                        break;
                    }
                }
            }
        }

        return foundNetworkInfo;
    }

}
