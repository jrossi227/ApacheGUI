package net.apachegui.virtualhosts;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import net.apachegui.directives.DocumentRoot;
import net.apachegui.directives.ServerName;

import org.json.JSONArray;
import org.json.JSONObject;

import apache.conf.parser.ConfigurationLine;
import apache.conf.parser.Enclosure;
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

    public VirtualHost() {
        networkInfo = new ArrayList<NetworkInfo>();
        documentRoot = new DocumentRoot();
        serverName = new ServerName();
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

        return json.toString();
    }

    public String toTreeJSON() {
        
        JSONObject tree = new JSONObject();
        tree.put("identifier", "id");
        tree.put("label", "name");
        
        JSONArray items = toTreeJSON(enclosure, 0);
        
        tree.put("items", items);
        
        return tree.toString();
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
            
            if(Parser.isEnclosureMatch(line) && !Parser.isVHostMatch(line) && i > 0) {
                JSONObject children = new JSONObject();
                children.put("id", lineNum + "-" + line);
                children.put("name", line);
                children.put("children", toTreeJSON(enclosure.getEnclosures()[enclosureCount], lineNum));
                enclosureArray.put(children);
                enclosureCount ++;
            } else {
                
                JSONObject directive = new JSONObject();
                directive.put("id", lineNum + "-" + line);
                directive.put("name", line);
                
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

        return virtualHostBuffer.toString();
    }

}
