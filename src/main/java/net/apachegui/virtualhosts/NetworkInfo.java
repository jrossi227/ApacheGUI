package net.apachegui.virtualhosts;

import java.util.ArrayList;

import org.json.JSONObject;

public class NetworkInfo {

    private int port;
    private String address;

    public NetworkInfo() {
        port = -1;
        address = "";
    }

    public NetworkInfo(int port, String address) {
        this.port = port;
        this.address = address;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public static NetworkInfo buildNetworkInfo(String value) {
        NetworkInfo networkInfo = new NetworkInfo();

        // There is no port number
        if (!value.contains(":") || (value.contains("[") && value.contains("]") && !value.contains("]:"))) {

            String address;

            if (value.contains("[") && value.contains("]")) {
                address = value.substring(value.indexOf("[") + 1, value.indexOf("]"));
            } else {
                address = value;
            }

            networkInfo.setAddress(address);

        } else {

            String address;
            int port;

            if (value.contains("[") && value.contains("]")) {
                address = value.substring(value.indexOf("[") + 1, value.indexOf("]"));
                port = Integer.parseInt(value.substring(value.lastIndexOf(":") + 1));

            } else {
                String addressPort[] = value.split(":");
                address = addressPort[0];
                port = Integer.parseInt(addressPort[1]);
            }

            networkInfo.setAddress(address);
            networkInfo.setPort(port);
        }
        
        return networkInfo;
    }
    
    public static NetworkInfo[] buildNetworkInfo(String values[]) {

        ArrayList<NetworkInfo> networkInfos = new ArrayList<NetworkInfo>();

        for (String value : values) {
            networkInfos.add(buildNetworkInfo(value));
        }

        return networkInfos.toArray(new NetworkInfo[networkInfos.size()]);
    }
    
    
    public String toJSON() {

        JSONObject info = new JSONObject();

        info.put("port", port);
        info.put("address", address);
        info.put("value", toString());

        return info.toString();
    }

    @Override
    public String toString() {

        String info = "";

        if (port == -1) {
            if (address.contains(":")) {
                info = "[" + address + "]";
            } else {
                info = address;
            }
        } else {
            if (address.contains(":")) {
                info = "[" + address + "]:" + port;
            } else {
                info = address + ":" + port;
            }
        }

        return info;
    }

    @Override
    public boolean equals(Object o) {

        NetworkInfo info = (NetworkInfo) o;

        String infoAddress = info.getAddress().equals("_default_") ? "*" : info.getAddress();
        String thisAddress = address.equals("_default_") ? "*" : address;
        
        return (info.getPort() == port && infoAddress.equals(thisAddress));
    }

    @Override
    public int hashCode() {
        int hash = 1;
        hash = hash * 17 + port;
        
        String thisAddress = address.equals("_default_") ? "*" : address;
        
        hash = hash * 31 + thisAddress.hashCode();
        return hash;
    }

}
