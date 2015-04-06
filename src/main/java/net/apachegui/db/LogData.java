package net.apachegui.db;

public class LogData {

    private String host;
    private Timestamp insertDate;
    private String userAgent;
    private String requestString;
    private String status;
    private String contentSize;

    public LogData(Timestamp insertDate, String host, String userAgent, String requestString, String status, String contentSize) {
        this.host = host;
        this.insertDate = insertDate;
        this.userAgent = userAgent;
        this.requestString = requestString;
        this.status = status;
        this.contentSize = contentSize;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getHost() {
        return host;
    }

    public void setInsertDate(Timestamp insertDate) {
        this.insertDate = insertDate;
    }

    public Timestamp getInsertDate() {
        return insertDate;
    }

    public void setRequestString(String requestString) {
        this.requestString = requestString;
    }

    public String getRequestString() {
        return requestString;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setContentSize(String contentSize) {
        this.contentSize = contentSize;
    }

    public String getContentSize() {
        return contentSize;
    }

}
