package ca.apachegui.history;

import org.apache.log4j.Logger;

import ca.apachegui.db.LogData;
import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;

public class HistoryMaintenanceT implements Runnable 
{
	private static Logger log = Logger.getLogger(HistoryMaintenanceT.class);
	private String name = "HistoryMaintenanceThread";

	/**
	 * Thread used to shrink log data and rebuild insert date index for efficiency.
	 */
	@Override
	public void run() 
	{
		boolean running = true;
	      
	    int iter=0;
		while (running)
	    {
	       try 
	       {
	          log.trace("Waking up " + getName());
	          
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
	          	log.trace("Going to sleep " + getName());
	          	//wake up once an interval
	          }
	          else
	          {
	        	  log.trace("ApacheGUI has not been initialized, going back to sleep");
	          }
	          Thread.sleep(Constants.historyThreadDelay);
	       }
	       catch (InterruptedException e) 
	       {
	          log.info("Stopping " + name);
	    	  running = false;
	       }
	       catch(Exception e)
	       {
	    	   log.error(getName() + " has crashed: " + e.getMessage());
	    	   running = false;
	       }
	    }
		
	}
	
	public String getName() 
	 {
	      return name;
	 }

}
