package net.apachegui.web;

import java.io.BufferedWriter;

import apache.conf.parser.File;

import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import net.apachegui.db.LogData;
import net.apachegui.db.LogDataDao;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchResultsController {
    private static Logger log = Logger.getLogger(SearchResultsController.class);

    @RequestMapping(value = "/web/SearchResults", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String searchResults(@RequestParam(value = "option") String option, @RequestParam(value = "startDate") String startDate, @RequestParam(value = "startTime") String startTime,
            @RequestParam(value = "endDate") String endDate, @RequestParam(value = "endTime") String endTime, @RequestParam(value = "host") String host,
            @RequestParam(value = "userAgent") String userAgent, @RequestParam(value = "requestString") String requestString, @RequestParam(value = "status") String status,
            @RequestParam(value = "contentSize") String contentSize, @RequestParam(value = "maxResults", required = false) String maxResults, Model model) throws ParseException, IOException,
            SQLException {

        log.trace("SearchResults.doGet Called");
        log.trace("option " + option);
        log.trace("startDate " + startDate);
        log.trace("startTime " + startTime);
        log.trace("endDate " + endDate);
        log.trace("endTime " + endTime);
        log.trace("host " + host);
        log.trace("userAgent " + userAgent);
        log.trace("requestString " + requestString);
        log.trace("status " + status);
        log.trace("contentSize " + contentSize);

        if (maxResults == null || (maxResults.equals(""))) {
            maxResults = Constants.maxHistoricalResults;
        }

        try {
            Integer.parseInt(maxResults);
        } catch (Exception e) {
            maxResults = Constants.maxHistoricalResults;
        }
        log.trace("maxResults " + maxResults);

        SimpleDateFormat startDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        java.util.Date startParsedDate = startDateFormat.parse(startDate + " " + startTime);
        java.sql.Timestamp startTimestamp = new java.sql.Timestamp(startParsedDate.getTime());
        log.trace("startTimestamp " + startTimestamp.toString());

        SimpleDateFormat endDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        java.util.Date endParsedDate = endDateFormat.parse(endDate + " " + endTime);
        java.sql.Timestamp endTimestamp = new java.sql.Timestamp(endParsedDate.getTime());
        log.trace("endTimestamp " + endTimestamp.toString());

        JSONObject result = new JSONObject();

        if (option.equals("window")) {
            log.trace("Entering window option");
            LogData[] results = LogDataDao.getInstance().queryLogData(startTimestamp, endTimestamp, host, userAgent, requestString, status, contentSize, maxResults);

            result.put("identifier", "id");
            result.put("label", "name");

            JSONArray items = new JSONArray();

            JSONObject entry;
            if (results.length > 0) {
                for (int i = 0; i < results.length; i++) {
                    entry = new JSONObject();

                    entry.put("id", Integer.toString((i + 1)));
                    entry.put("insertDate", results[i].getInsertDate().toString());
                    entry.put("host", results[i].getHost());
                    entry.put("userAgent", results[i].getUserAgent());
                    entry.put("requestString", results[i].getRequestString());
                    entry.put("status", results[i].getStatus());
                    entry.put("contentSize", results[i].getContentSize());

                    items.put(entry);
                }
            } else {
                entry = new JSONObject();

                entry.put("id", "");
                entry.put("insertDate", "");
                entry.put("host", "");
                entry.put("userAgent", "");
                entry.put("requestString", "");
                entry.put("status", "");
                entry.put("contentSize", "");

                items.put(entry);

            }

            result.put("items", items);
        }
        if (option.equals("csv")) {
            // ServletOutputStream stream = response.getOutputStream();
            log.trace("Entering csv option");
            LogData[] results = LogDataDao.getInstance().queryLogData(startTimestamp, endTimestamp, host, userAgent, requestString, status, contentSize, maxResults);
            File doc = new File(Utilities.getWebappDirectory(), "HistoryFiles/" + Constants.historyFilename);
            BufferedWriter writer = new BufferedWriter(new FileWriter(doc));
            writer.write("\"INSERTDATE\",\"HOST\",\"USERAGENT\",\"REQUESTSTRING\",\"STATUS\",\"CONTENTSIZE\"");
            writer.newLine();
            for (int i = 0; i < results.length; i++) {
                writer.write("\"" + results[i].getInsertDate().toString() + "\",\"" + results[i].getHost() + "\",\"" + results[i].getUserAgent() + "\",\"" + results[i].getRequestString() + "\",\""
                        + results[i].getStatus() + "\",\"" + results[i].getContentSize() + "\"");
                writer.newLine();
            }
            writer.flush();
            writer.close();

            result.put("result", "success");
        }
        if (option.equals("delete")) {
            log.trace("Entering delete option");
            LogDataDao.getInstance().deleteLogData(startTimestamp, endTimestamp, host, userAgent, requestString, status, contentSize);

            result.put("result", "success");
        }

        return result.toString();

    }
}
