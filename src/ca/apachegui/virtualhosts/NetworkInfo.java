package ca.apachegui.virtualhosts;

public class NetworkInfo {

	private int port;
	private String address;
	
	public NetworkInfo() {
		port = -1;
		address = "";
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
	
	@Override
	public String toString() {
		
		String info = "";
		
		if(port == -1) {
			if(address.contains(":")) {
				info = "[" + address + "]";
			} else {
				info = address;
			}
		} else {
			if(address.contains(":")) {
				info = "[" + address + "]:" + port;
			} else {
				info = address + ":" + port;
			}
		}
		
		return info;
	}
}
