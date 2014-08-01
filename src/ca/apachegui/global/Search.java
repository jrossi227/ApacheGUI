package ca.apachegui.global;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import ca.apachegui.global.SearchT.State;
import ca.apachegui.history.HistoryMaintenance;
 
public class Search  implements ServletContextListener 
{
	private static Logger log = Logger.getLogger(HistoryMaintenance.class);
	private static ExecutorService threadExecute=Executors.newFixedThreadPool(1);   
	
	@Override
	public void contextInitialized(ServletContextEvent arg0) 
	{
		log.info("Search contextInitialized called");
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) 
	{
		log.info("Search contextDestroyed Called");
		
		if(SearchT.getCurrentState() != State.IDLE && SearchT.getCurrentState() != State.CANCELLED) {
			try {
				SearchT.cancel();
			} catch(Exception e) {
				log.error(e.getMessage(), e);
			}
		}
		
		threadExecute.shutdownNow();
	}
	
	public static boolean start(String directory, String fileList, String filter, boolean recursive) {
				
		if(SearchT.getCurrentState() == State.IDLE || SearchT.getCurrentState() == State.CANCELLED) {
		
			SearchT thread = new SearchT(directory, fileList, filter, recursive);
			threadExecute.execute(thread);
		
			return true;
		}
		
		return false;
	}
	
	public static void cancel() throws InterruptedException {
		SearchT.cancel();
	}
	
}
