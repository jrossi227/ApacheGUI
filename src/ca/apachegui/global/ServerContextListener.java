package ca.apachegui.global;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import apache.conf.parser.File;
import ca.apachegui.global.SearchTask.State;
 
public class ServerContextListener  implements ServletContextListener 
{
	private static Logger log = Logger.getLogger(ServerContextListener.class);
	
	@Override
	public void contextInitialized(ServletContextEvent sce) 
	{
		log.info("ServerContextListener contextInitialized called");
		
		//delete update File if it exists
		if(new File(System.getProperty("java.io.tmpdir"),"ApacheGUIUpdate").exists()) {
			new File(System.getProperty("java.io.tmpdir"),"ApacheGUIUpdate").delete();
		}
		
		Utilities.setServletcontext(sce.getServletContext());
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent sce) 
	{
		log.info("ServerContextListener contextDestroyed Called");
		
		if(SearchTask.getCurrentState() != State.IDLE && SearchTask.getCurrentState() != State.CANCELLED) {
			try {
				SearchTask.cancel();
			} catch(Exception e) {
				log.error(e.getMessage(), e);
			}
		}
		
	}
}
