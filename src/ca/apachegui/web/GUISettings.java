package ca.apachegui.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import ca.apachegui.db.JdbcConnection;
import ca.apachegui.db.Settings;
import ca.apachegui.db.Users;
import ca.apachegui.global.Constants;
import ca.apachegui.server.ServerInfo;
/**
 * Servlet implementation class GUISettings
 */
@WebServlet("/GUISettings")
public class GUISettings extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(GUISettings.class);

    /**
     * Default constructor. 
     */
    public GUISettings() {
       super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{	
		log.trace("GUISettings.doGet called");
		PrintWriter out = response.getWriter();
		out.println("{");
		out.println(	"identifier: 'id', ");
		out.println(	"label: 'name', ");
		out.println(	"items: [");
		
		if(Settings.getSetting(Constants.init)!=null)
		{	
			//Server Root
			out.println("{id: '" + Constants.serverRoot + "', name:'Server Root', value: '" + Settings.getSetting(Constants.serverRoot) + "'},");
		
			//Configuration Directory
			out.println("{id: '" + Constants.confDirectory + "', name:'Configuration Directory', value: '" + Settings.getSetting(Constants.confDirectory) + "'},");
		
			//Configuration File
			out.println("{id: '" + Constants.confFile + "', name:'Configuration File', value: '" + Settings.getSetting(Constants.confFile) + "'},");
		
			//Log Directory
			out.println("{id: '" + Constants.logDirectory + "', name:'Logs Directory', value: '" + Settings.getSetting(Constants.logDirectory) + "'},");
		
			//Modules Directory
			out.println("{id: '" + Constants.modulesDirectory + "', name:'Modules Directory', value: '" + Settings.getSetting(Constants.modulesDirectory) + "'},");
			
			//Bin Directory
			//out.println("{id: '" + Constants.binDirectory + "', name:'Bin Directory', value: '" + Settings.getSetting(Constants.binDirectory) + "'},");
		
			//Bin File
			out.println("{id: '" + Constants.binFile + "', name:'Bin File', value: '" + Settings.getSetting(Constants.binFile) + "'},");
		
			//Username
			out.println("{id: '" + Constants.username + "', name:'Username', value: '" + Users.getUsername() + "'},");
		
			//Password
			out.println("{id: '" + Constants.password + "', name:'Password', value: '************'},");
			
			//css theme
			out.println("{id: '" + Constants.theme + "', name:'Theme', value: '" + Settings.getSetting(Constants.theme) + "'},");
			
			//encoding
			out.println("{id: '" + Constants.encoding + "', name:'Document Encoding', value: 'UTF-8'}");
		}
		out.println("]}");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.trace("GUISettings.doPost called");
		String option=request.getParameter("option");
		log.trace("option selected " + option);
		StringBuffer error = new StringBuffer();
		PrintWriter out = response.getWriter();
		try
		{
			if(option.equals("newServer"))
			{	
				JdbcConnection.clearDatabase();
				log.trace("Database Cleared");
			}
			if(option.equals("getServerInfo")) 
			{
				out.print(ServerInfo.getServerInfo(null).replaceAll(Constants.newLine, "<br/>"));
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
			error.append(e.getMessage());
			response.setStatus(206);
			out.print(error.toString());
		}
		
		out.flush();
	}

}
