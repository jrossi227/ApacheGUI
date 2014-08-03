package ca.apachegui.history;

import org.apache.log4j.Logger;

import ca.apachegui.db.LogData;
import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;

public class HistoryMaintenance 
{
	private static Logger log = Logger.getLogger(HistoryMaintenance.class);

	private int iter;
	
	public HistoryMaintenance() {
		iter = 0;
	}
	
	/**
	 * Thread used to shrink log data and rebuild insert date index for efficiency.
	 */
	public void clean() {
	      			     		
	    if(Settings.getSetting("init")!=null) {
	    	log.trace("Shrinking " + Constants.logDataTable);
    		    	
	        iter++;  
	    	  
	    	LogData.shrinkLogData(Integer.parseInt(Settings.getSetting(Constants.historyRetention)));
	      
	      	if(iter==Constants.rebuildIndexInterval)
	      	{	  
	    	  //rebuild index
	    	  log.trace("Rebuilding index");
	    	  LogData.rebuildInsertDateIndex();
	    	  iter=0;
	      	}
	      	//wake up once an interval
	    } else {
	    	log.trace("ApacheGUI has not been initialized, going back to sleep");
	    }
		
	}

}
