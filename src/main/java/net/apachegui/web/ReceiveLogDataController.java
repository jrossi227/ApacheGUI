package net.apachegui.web;

import java.util.ArrayList;
import java.util.Date;

import net.apachegui.db.LogData;
import net.apachegui.db.LogDataDao;
import net.apachegui.db.SettingsDao;
import net.apachegui.db.Timestamp;
import net.apachegui.global.Constants;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReceiveLogDataController {
    private static Logger log = Logger.getLogger(ReceiveLogDataController.class);

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;

    private int logDataCounter;
    private ArrayList<LogData> logData;

    public ReceiveLogDataController() {
        logDataCounter = 1;
        logData = new ArrayList<LogData>();
    }

    @RequestMapping(value = "/pass/ReceiveLogData")
    public String extendedRunningProcesses(@RequestParam(value = "logData") String logData) throws Exception {
        log.trace("Calling Post");
        log.trace("Received Log Data " + logData);
        String fields[] = logData.split("\",\"");

        Date date = new Date();
        Timestamp insertDate = new Timestamp(date.getTime());
        log.trace("insertDate " + insertDate.toString());

        String host = "";
        if (fields.length > 0) {
            host = fields[0];
        }
        log.trace("Host " + host);

        String userAgent = "";
        if (fields.length > 1) {
            userAgent = fields[1];
        }
        log.trace("userAgent " + userAgent);

        String requestString = "";
        if (fields.length > 2) {
            requestString = fields[2];
        }
        log.trace("requestString " + requestString);

        String status = "";
        if (fields.length > 3) {
            status = fields[3];
        }
        log.trace("status " + status);

        String contentSize = "";
        if (fields.length > 4) {
            contentSize = fields[4];
        }
        log.trace("contentSize " + contentSize);

        LogData data = new LogData(insertDate, host, userAgent, requestString, status, contentSize);

        log.trace("Adding data");
        addLogData(data);

        return "";
    }

    /**
     * Buffers log Data until the logData counter is reached. Once the counter is reached a thread is spawned to write the records to the database.
     * 
     * @param data
     *            - The Log data to add to the database.
     */
    public synchronized void addLogData(LogData data) {
        logDataCounter++;
        logData.add(data);

        if (logDataCounter > (Integer.parseInt(SettingsDao.getInstance().getSetting(Constants.historyBuffer)))) {
            // commit in a new Thread
            InsertHistory history = new InsertHistory(logData.toArray(new LogData[logData.size()]));
            taskExecutor.execute(history);

            logDataCounter = 1;
            logData.clear();
        }
    }

    public class InsertHistory implements Runnable {
        private LogData data[];

        public InsertHistory(LogData logData[]) {
            this.data = logData;
        }

        @Override
        public void run() {
            LogDataDao.getInstance().commitLogData(data);
        }

    }
}
