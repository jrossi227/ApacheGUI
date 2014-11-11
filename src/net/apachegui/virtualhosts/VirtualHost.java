package net.apachegui.virtualhosts;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import apache.conf.parser.Directive;
import apache.conf.parser.Enclosure;
import apache.conf.parser.File;

/**
 * File used to model an Apache Virtual Host Virtual Host takes on the following format: <VirtualHost addr[:port] [addr[:port]] ...> ... </VirtualHost>
 * 
 * @author jonathan
 *
 */

public class VirtualHost {

    private File file;
    private int lineOfStart;
    private int lineOfEnd;
    private List<NetworkInfo> networkInfo;
    private String documentRoot;
    private String serverName;
    private ArrayList<Directive> directives;
    private ArrayList<Enclosure> enclosures;

    public VirtualHost() {
        file = null;
        lineOfStart = -1;
        lineOfEnd = -1;
        networkInfo = new ArrayList<NetworkInfo>();
        documentRoot = "";
        serverName = "";
        directives = new ArrayList<Directive>();
        enclosures = new ArrayList<Enclosure>();
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public int getLineOfStart() {
        return this.lineOfStart;
    }

    public void setLineOfStart(int lineOfStart) {
        this.lineOfStart = lineOfStart;
    }

    public int getLineOfEnd() {
        return this.lineOfEnd;
    }

    public void setLineOfEnd(int lineOfEnd) {
        this.lineOfEnd = lineOfEnd;
    }

    public NetworkInfo[] getNetworkInfo() {
        return networkInfo.toArray(new NetworkInfo[networkInfo.size()]);
    }

    public void setNetworkInfo(NetworkInfo[] networkInfo) {
        this.networkInfo = Arrays.asList(networkInfo);
    }

    public String getDocumentRoot() {
        return documentRoot;
    }

    public void setDocumentRoot(String documentRoot) {
        this.documentRoot = documentRoot;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public void addDirective(Directive directive) {
        directives.add(directive);
    }

    public Directive[] getDirectives() {
        return directives.toArray(new Directive[directives.size()]);
    }

    public void addEnclosure(Enclosure enclosure) {
        enclosures.add(enclosure);
    }

    public Enclosure[] getEnclosures() {
        return enclosures.toArray(new Enclosure[enclosures.size()]);
    }

    public String toJSON() throws ParseException {

        JSONObject json = new JSONObject();

        json.put("file", file.getAbsolutePath());
        json.put("lineOfStart", lineOfStart);
        json.put("lineOfEnd", lineOfEnd);

        JSONArray networkInfoArray = new JSONArray();

        for (NetworkInfo info : networkInfo) {
            networkInfoArray.put(new JSONObject(info.toJSON()));
        }

        json.put("NetworkInfo", networkInfoArray);

        json.put("DocumentRoot", documentRoot);
        json.put("ServerName", serverName);

        return json.toString();
    }

    @Override
    public String toString() {

        StringBuffer virtualHostBuffer = new StringBuffer();
        virtualHostBuffer.append("\nFile: " + file == null ? "" : file.getAbsolutePath() + "\n");
        virtualHostBuffer.append("LineOfStart: " + lineOfStart + "\n");
        virtualHostBuffer.append("LineOfEnd: " + lineOfEnd + "\n");

        for (NetworkInfo info : networkInfo) {
            virtualHostBuffer.append("NetworkInfo: " + info.toString() + "\n");
        }

        virtualHostBuffer.append("DocumentRoot: " + documentRoot + "\n");
        virtualHostBuffer.append("ServerName: " + serverName + "\n");

        return virtualHostBuffer.toString();
    }

}
