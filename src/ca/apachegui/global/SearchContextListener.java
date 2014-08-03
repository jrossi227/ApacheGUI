package ca.apachegui.global;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import ca.apachegui.global.SearchTask.State;
import ca.apachegui.history.HistoryMaintenance;
 
public class SearchContextListener  implements ServletContextListener 
{
	private static Logger log = Logger.getLogger(HistoryMaintenance.class);
	
	@Override
	public void contextInitialized(ServletContextEvent arg0) 
	{
		log.info("Search contextInitialized called");
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) 
	{
		log.info("Search contextDestroyed Called");
		
		if(SearchTask.getCurrentState() != State.IDLE && SearchTask.getCurrentState() != State.CANCELLED) {
			try {
				SearchTask.cancel();
			} catch(Exception e) {
				log.error(e.getMessage(), e);
			}
		}
		
	}
}
