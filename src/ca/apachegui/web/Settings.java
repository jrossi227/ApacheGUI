package ca.apachegui.web;

import apache.conf.parser.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import ca.apachegui.db.Users;
import ca.apachegui.global.Constants;

/**
 * Servlet implementation class Settings
 */
@WebServlet("/Settings")
public class Settings extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Settings.class);
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Settings() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.trace("Settings.doPost called");
		String option=request.getParameter("option");
		log.trace("option selected " + option);
		StringBuffer error = new StringBuffer();
		PrintWriter out = response.getWriter();
		try
		{
			if(option.equals("getAllSettingsNames"))
			{	
				out.print("{" +
								"init: '" + Constants.init + "', " +
								"confDirectory: '" + Constants.confDirectory + "', " +
								"confFile: '" + Constants.confFile + "'," +
								"serverRoot: '" + Constants.serverRoot + "'," +
								"logDirectory: '" + Constants.logDirectory + "'," +
								"modulesDirectory: '" + Constants.modulesDirectory + "'," +
								"binFile: '" + Constants.binFile + "'," +
								"username: '" + Constants.username + "'," +
								"password: '" + Constants.password + "'," +
								"processsInfoRefreshRate: '" + Constants.processInfoRefreshRate + "'," +
								"extendedStatus: '" + Constants.extendedStatus + "'," +
								"historyRetention: '" + Constants.historyRetention + "'," +
								"historyBuffer: '" + Constants.historyBuffer + "'," +
								"theme: '" + Constants.theme + "'," +
								"editorTheme: '" + Constants.editorTheme + "'," +
								"showTabs: '" + Constants.showTabs + "'," +
								"encoding: '" + Constants.encoding + "'" +
							"}");
			}
			if(option.equals("getSetting"))
			{
				String name=request.getParameter("name");
				if(name==null) {
					throw new Exception("There was no name specified");
				}
				
				String value="";
				if(name.equals(Constants.username)) {
					value=Users.getUsername();
				}
				else {
					value=ca.apachegui.db.Settings.getSetting(name);
				}
				out.print(value == null ? "" : value);
			}
			if(option.equals("setSetting"))
			{
				String name=request.getParameter("name");
				if(name==null) {
					throw new Exception("There was no name specified");
				}
				
				String value=request.getParameter("value");
				if(value==null) {
					throw new Exception("There was no value specified");
				}
				
				value=value.trim().replaceAll("\\\\", "/");
				
				if(name.equals(Constants.serverRoot))
				{
					if(value.endsWith("/"))
					{
						value=value.substring(0,value.length()-1);
					}
					log.trace("Setting serverRoot " + value);
					
					if(!(new File(value).exists()))
					{
						throw new Exception("The input directory does not exist");
					}
					
					if(!(new File(value).isDirectory()))
					{
						throw new Exception("The input directory is not a directory");
					}
				}
				if(name.equals(Constants.confDirectory))
				{
					if(value.endsWith("/"))
					{
						value=value.substring(0,value.length()-1);
					}
					log.trace("Setting confDirectory " + value);
					
					if(!(new File(value).exists()))
					{
						throw new Exception("The input directory does not exist");
					}
					
					if(!(new File(value).isDirectory()))
					{
						throw new Exception("The input directory is not a directory");
					}
				}
				if(name.equals(Constants.confFile))
				{
					log.trace("Setting confFile " + value);
					
					if(!(new File(value).exists()))
					{
						throw new Exception("The input file does not exist");
					}
					
					if((new File(value).isDirectory()))
					{
						throw new Exception("The input file is a directory");
					}
				}
				if(name.equals(Constants.logDirectory))
				{
					if(value.endsWith("/"))
					{
						value=value.substring(0,value.length()-1);
					}
					log.trace("Setting logDirectory " + value);
					
					if(!(new File(value).exists()))
					{
						throw new Exception("The input directory does not exist");
					}
					
					if(!(new File(value).isDirectory()))
					{
						throw new Exception("The input directory is not a directory");
					}
				}
				if(name.equals(Constants.modulesDirectory))
				{
					if(value.endsWith("/"))
					{
						value=value.substring(0,value.length()-1);
					}
					log.trace("Setting modulesDirectory " + value);
					
					if(!(new File(value).exists()))
					{
						throw new Exception("The input directory does not exist");
					}
					
					if(!(new File(value).isDirectory()))
					{
						throw new Exception("The input directory is not a directory");
					}
				}
				if(name.equals(Constants.binFile))
				{
					log.trace("Setting binFile " + value);
					
					if(!(new File(value).exists()))
					{
						throw new Exception("The input file does not exist");
					}
					
					if((new File(value).isDirectory()))
					{
						throw new Exception("The input file is a directory");
					}
				}
				if(name.equals(Constants.historyRetention) || name.equals(Constants.historyBuffer))
				{
					log.trace("Setting historyRetention/historyBuffer " + value);
					
					try
					{
						Integer.parseInt(value);
					}
					catch(Exception e)
					{
						throw new Exception("You must input a number");
					}
				}
				
				if(name.equals(Constants.username)) {
					Users.setUsername(value);
				}
				else if(name.equals(Constants.password)) {
					Users.setPassword(value);
				}
				else if(name.equals(Constants.confFile)) {
					ca.apachegui.db.Settings.setSetting(Constants.confFile, value);
				}
				else {
					ca.apachegui.db.Settings.setSetting(name, value);
				}	
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
