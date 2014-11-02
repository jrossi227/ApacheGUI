package ca.apachegui.virtualhosts;

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

    public String toJSON() {

        JSONObject info = new JSONObject();

        info.put("port", port);
        info.put("address", address);

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

        return (info.getPort() == port && info.getAddress().equals(address));
    }

    @Override
    public int hashCode() {
        int hash = 1;
        hash = hash * 17 + port;
        hash = hash * 31 + address.hashCode();
        return hash;
    }

}
