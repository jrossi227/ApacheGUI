package ca.apachegui.history;

import apache.conf.parser.File;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

/**
 * Class used to spawn a thread that manages the history database.
 * 
 * @author jonathan
 *
 */
public class HistoryMaintenance implements ServletContextListener 
{
	private static Logger log = Logger.getLogger(HistoryMaintenance.class);
	private static ExecutorService threadExecute=Executors.newCachedThreadPool();   
	
	@Override
	public void contextInitialized(ServletContextEvent arg0) 
	{
		log.info("HistoryMaintenance contextInitialized called");
		HistoryMaintenanceT history=new HistoryMaintenanceT();
		threadExecute.execute(history);
		
		//delete File if it exists
		if(new File(System.getProperty("java.io.tmpdir"),"ApacheGUIUpdate").exists()) {
			new File(System.getProperty("java.io.tmpdir"),"ApacheGUIUpdate").delete();
		}
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) 
	{
		log.info("HistoryMaintenance contextDestroyed Called");
		threadExecute.shutdownNow();
	}

}
