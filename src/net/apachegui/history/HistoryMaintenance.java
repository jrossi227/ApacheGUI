package net.apachegui.history;

import net.apachegui.db.LogDataDao;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;

import org.apache.log4j.Logger;

public class HistoryMaintenance {
    private static Logger log = Logger.getLogger(HistoryMaintenance.class);

    private int iter;

    public HistoryMaintenance() {
        iter = 0;
    }

    /**
     * Thread used to shrink log data and rebuild insert date index for efficiency.
     */
    public void clean() {

        if (SettingsDao.getInstance().getSetting("init") != null) {
            log.trace("Shrinking " + Constants.logDataTable);

            iter++;

            LogDataDao.getInstance().shrinkLogData(Integer.parseInt(SettingsDao.getInstance().getSetting(Constants.historyRetention)));

            if (iter == Constants.rebuildIndexInterval) {
                // rebuild index
                log.trace("Rebuilding index");
                LogDataDao.getInstance().rebuildInsertDateIndex();
                iter = 0;
            }
            // wake up once an interval
        } else {
            log.trace("ApacheGUI has not been initialized, going back to sleep");
        }

    }

}
