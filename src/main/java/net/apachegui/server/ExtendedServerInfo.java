package net.apachegui.server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.regex.Pattern;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;

import org.apache.log4j.Logger;

/**
 * Class used to provide information on the global server information The class will scrape the server Info
 * 
 * Example server info to scrape:
 * 
 * Total Accesses: 182 Total kBytes: 218 CPULoad: .030303 Uptime: 429 ReqPerSec: .424242 BytesPerSec: 520.354 BytesPerReq: 1226.55 BusyWorkers: 2 IdleWorkers: 48
 * 
 * 
 **/

public class ExtendedServerInfo extends ExtendedStatus {
    private static Logger log = Logger.getLogger(ExtendedServerInfo.class);

    private String totalRequests;
    private String totalKB;
    private String cpuUsage;
    private String upTime;
    private String requestsPerSecond;
    private String bytesPerSecond;
    private String bytesPerRequest;
    private String busyWorkers;
    private String idleWorkers;

    public ExtendedServerInfo(String totalRequests, String totalKB, String cpuUsage, String upTime, String requestsPerSecond, String bytesPerSecond, String bytesPerRequest, String busyWorkers,
            String idleWorkers) {
        this.totalRequests = totalRequests;
        this.totalKB = totalKB;
        this.cpuUsage = cpuUsage;
        this.upTime = upTime;
        this.requestsPerSecond = requestsPerSecond;
        this.bytesPerSecond = bytesPerSecond;
        this.bytesPerRequest = bytesPerRequest;
        this.busyWorkers = busyWorkers;
        this.idleWorkers = idleWorkers;
    }

    /**
     * Queries apache for Extended Server Info
     * 
     * @return an ExtendedServerInfo with the current server info. All fields will be empty if extended status is not enabled.
     */
    public static ExtendedServerInfo getExtendedServerInfo() {
        log.trace("ExtendedServerInfo.getExtendedServerInfo called");

        if (SettingsDao.getInstance().getSetting(Constants.EXTENDED_STATUS).equals("on")) {
            try {
                String url = getExtendedStatusURL() + Constants.READABLE_EXTENDED_SERVER_INFO_QUERY_STRING;
                log.trace("URL to scrape " + url);

                URL extendedServerInfo = new URL(url);
                URLConnection conn = extendedServerInfo.openConnection();
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
                String inputLine;

                ArrayList<String[]> page = new ArrayList<String[]>();
                while ((inputLine = in.readLine()) != null) {
                    inputLine = inputLine.trim();

                    if (inputLine.contains(":")) {
                        log.trace("splitting inputLine with : " + inputLine);
                        page.add(inputLine.split(":"));
                    }
                }
                in.close();

                String totalRequests = extractString(Constants.TOTAL_REQUESTS_REGEX, page);
                log.trace("totalRequests: " + totalRequests);

                String totalKB = extractString(Constants.TOTAL_KB_REGEX, page);
                log.trace("totalKB: " + totalKB);

                String cpuUsage = extractString(Constants.CPU_USAGE_REGEX, page);
                log.trace("cpuUsage: " + cpuUsage);

                String upTime = extractString(Constants.UP_TIME_REGEX, page);
                log.trace("upTime: " + upTime);
                upTime = convertUpTime(upTime);

                String requestsPerSecond = extractString(Constants.REQUESTS_PER_SECOND_REGEX, page);
                log.trace("requestsPerSecond: " + requestsPerSecond);

                String bytesPerSecond = extractString(Constants.BYTES_PER_SECOND_REGEX, page);
                log.trace("bytesPerSecond: " + bytesPerSecond);

                String bytesPerRequest = extractString(Constants.BYTES_PER_REQUEST_REGEX, page);
                log.trace("bytesPerRequest: " + bytesPerRequest);

                String busyWorkers = extractString(Constants.BUSY_WORKERS_REGEX, page);
                log.trace("busyWorkers: " + busyWorkers);

                String idleWorkers = extractString(Constants.IDLE_WORKERS_REGEX, page);
                log.trace("idleWorkers: " + idleWorkers);

                return (new ExtendedServerInfo(totalRequests, totalKB, cpuUsage, upTime, requestsPerSecond, bytesPerSecond, bytesPerRequest, busyWorkers, idleWorkers));
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }
        return null;

    }

    /**
     * 
     * @param regex
     *            the regular expression that we are looking for
     * @param AVPList
     *            the scraped AVP list
     * @return the value or an empty String if the value isn't found
     */
    private static String extractString(String regex, ArrayList<String[]> AVPList) {
        log.trace("ExtendedServerInfo.extractString called");
        log.trace("regex " + regex);

        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        String value = "";
        for (int i = 0; i < AVPList.size(); i++) {
            log.trace("Comparing " + AVPList.get(i)[0] + " to the regex " + regex);
            java.util.regex.Matcher patternMatcher = pattern.matcher(AVPList.get(i)[0]);

            if (patternMatcher.find()) {
                log.trace("Pattern found corresponding value " + AVPList.get(i)[1]);
                value = AVPList.get(i)[1].trim();
            }
        }

        log.trace("returning " + value);
        return value;
    }

    private static String convertUpTime(String upTime) {
        log.trace("ExtendedServerInfo.convertUpTime called");
        if (upTime == null)
            return null;

        if (upTime.equals(""))
            return "";

        String convertedUpTime = upTime;
        try {
            int seconds = Integer.parseInt(upTime);
            int hours = seconds / 3600;
            int remainder = seconds % 3600;
            int minutes = remainder / 60;
            int secs = remainder % 60;
            convertedUpTime = hours + " Hours " + minutes + " Minutes " + secs + " Seconds";
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            log.error(sw.toString());
        }
        return convertedUpTime;
    }

    public String getTotalRequests() {
        return totalRequests;
    }

    public String getTotalKB() {
        return totalKB;
    }

    public String getCpuUsage() {
        return cpuUsage;
    }

    public String getUpTime() {
        return upTime;
    }

    public String getRequestsPerSecond() {
        return requestsPerSecond;
    }

    public String getBytesPerSecond() {
        return bytesPerSecond;
    }

    public String getBytesPerRequest() {
        return bytesPerRequest;
    }

    public String getBusyWorkers() {
        return busyWorkers;
    }

    public String getIdleWorkers() {
        return idleWorkers;
    }
}
