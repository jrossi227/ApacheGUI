package net.apachegui.web;

import java.io.BufferedWriter;

import apache.conf.parser.File;

import java.io.FileWriter;
import java.text.SimpleDateFormat;

import au.com.bytecode.opencsv.CSVWriter;
import net.apachegui.db.LogData;
import net.apachegui.db.LogDataDao;
import net.apachegui.db.Timestamp;
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
    public String searchResults(@RequestParam(value = "option") String option, @RequestParam(value = "query", required = false) String query, @RequestParam(value = "update", required = false) String update) throws Exception {

        log.trace("SearchResults.doGet Called");
        log.trace("option " + option);
        log.trace("query " + query);

        JSONObject result = new JSONObject();

        if (option.equals("window")) {
            log.trace("Entering window option");
            LogData[] results = LogDataDao.getInstance().executeLogDataQuery(query);

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
            LogData[] results = LogDataDao.getInstance().executeLogDataQuery(query);
            File doc = new File(Utilities.getWebappDirectory(), "HistoryFiles/" + Constants.HISTORY_FILENAME);
            CSVWriter writer = new CSVWriter(new FileWriter(doc));
            String header[] = {"INSERTDATE","HOST","USERAGENT","REQUESTSTRING","STATUS","CONTENTSIZE"};
            writer.writeNext(header);

            for (int i = 0; i < results.length; i++) {
                String line[] = {results[i].getInsertDate().toString(),results[i].getHost(),results[i].getUserAgent(),results[i].getRequestString(),results[i].getStatus(),results[i].getContentSize()};
                writer.writeNext(line);
            }
            writer.close();

            result.put("result", "success");
        }
        if (option.equals("delete")) {
            log.trace("Entering delete option");
            LogDataDao.getInstance().executeDeleteLogDataUpdate(update);

            result.put("result", "success");
        }

        return result.toString();

    }
}
