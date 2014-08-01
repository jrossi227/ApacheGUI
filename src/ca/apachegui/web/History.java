package ca.apachegui.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Timestamp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import apache.conf.parser.File;

import ca.apachegui.db.LogData;


/**
 * Servlet implementation class History
 */
@WebServlet("/History")
public class History extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(History.class);
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public History() {
        super();
        // TODO Auto-generated constructor stub
    }

    @Override
    public void init()
    {
    	ca.apachegui.history.History.setTomcatDirectory((new File(getServletContext().getRealPath("/"))).getParentFile().getParentFile().getAbsolutePath());
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{	
		int numberEntries=LogData.getNumberOfEntries();
		Timestamp newestTimeStamp=LogData.getNewestTime();
		String newestTime = (newestTimeStamp==null)?"":newestTimeStamp.toString();
		Timestamp oldestTimeStamp=LogData.getOldestTime();
		String oldestTime = (oldestTimeStamp==null)?"":oldestTimeStamp.toString();
		
		PrintWriter out = response.getWriter();
		out.println("{");
		out.println(	"identifier: 'id', ");
		out.println(	"label: 'name', ");
		out.println(	"items: [");
	
		out.print("{id: '" + numberEntries + "', numHistory:'" + numberEntries + "', newHistory:'" + newestTime + "', oldHistory:'" + oldestTime +"'}");
		
		out.println("]}");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String option=request.getParameter("option");
		log.trace("History.doPost called with option " + option);
		PrintWriter out=response.getWriter();
		if(option.equals("checkIfEnabled"))
		{
			try
			{
				boolean enabled=ca.apachegui.history.History.checkIfEnabled();
				out.print("{enabled:" + enabled + "}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print(sw.toString());
			}
		}
		
		if(option.equals("enable"))
		{
			try
			{
				ca.apachegui.history.History.enable();
				if(ca.apachegui.server.Control.isServerRunning())
				{	
					String error="";
					try
					{
						error=ca.apachegui.server.Control.restartServer();
						if(!ca.apachegui.server.Control.isServerRunning())
						{
							throw new Exception("The server could not restart");
						}
					}
					catch(Exception e)
					{
						StringWriter sw = new StringWriter();
						e.printStackTrace(new PrintWriter(sw));
						log.error(sw.toString());
						response.setStatus(206);
						ca.apachegui.history.History.disable();
						out.print("There was an error while trying to restart the server, the changes were reverted: " + error + e.getMessage());
					}
				}
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print(sw.toString());
			}
		}
		
		if(option.equals("disable"))
		{
			try
			{
				ca.apachegui.history.History.disable();
				if(ca.apachegui.server.Control.isServerRunning())
				{	
					String error="";
					try
					{
						error=ca.apachegui.server.Control.restartServer();
						if(!ca.apachegui.server.Control.isServerRunning())
						{
							throw new Exception("The server could not restart");
						}
					}
					catch(Exception e)
					{
						StringWriter sw = new StringWriter();
						e.printStackTrace(new PrintWriter(sw));
						log.error(sw.toString());
						response.setStatus(206);
						ca.apachegui.history.History.enable();
						out.print("There was an error while trying to restart the server, the changes were reverted: " + error + e.getMessage());
					}
				}
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print(sw.toString());
			}
		}
	}

}
