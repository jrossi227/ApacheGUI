package ca.apachegui.web;

import apache.conf.parser.File;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import apache.conf.global.Utils;
import ca.apachegui.conf.ConfFiles;
import ca.apachegui.db.Settings;
import ca.apachegui.docs.DocFiles;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Search;
import ca.apachegui.global.SearchT;
import ca.apachegui.global.Utilities;
import ca.apachegui.logs.LogFiles;

/**
 * Servlet implementation class Menu
 */
@WebServlet("/Menu")
public class Menu extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Menu.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Menu() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		PrintWriter out = response.getWriter();
		try
		{
		
			String path = URLDecoder.decode(request.getRequestURI().substring(request.getContextPath().length() + "/Menu/".length()),"UTF-8");
		
			String confDirectory=Settings.getSetting(Constants.confDirectory);
			String logDirectory=Settings.getSetting(Constants.logDirectory);
		
			if(path.startsWith(Constants.MenuRoot) || path.isEmpty())
			{	
				out.print(
						"[" +
								"{ $ref: '" + Constants.ConfigurationRoot + confDirectory + "', name:'Configuration', id:'" + Constants.ConfigurationRoot + confDirectory + "', children:true}," +
								"{ $ref: '" + Constants.DocumentsRoot + ( Utils.isWindows() ? Utilities.getFileSystemDrive() : "/") + "', name:'Documents', id:'" + Constants.DocumentsRoot + ( Utils.isWindows() ? Utilities.getFileSystemDrive() : "/") + "', children:true}," +
								"{ $ref: '" + Constants.LogsRoot + logDirectory + "', name:'Logs', id:'" + Constants.LogsRoot + logDirectory + "', children:true}," +
								"{ $ref: 'Control', name:'Control', id:'Control', type:'Control'}," +
								"{ $ref: 'Global_Settings', name:'Global Settings', id:'Global_Settings', type:'Global_Settings'}," +
								"{ $ref: 'History', name:'History', id:'History', type:'History'}," +
								"{ $ref: 'GUISettings', name:'GUISettings', id:'GUISettings', type:'GUISettings'}" +
						"]");
			}
		
			if(path.startsWith(Constants.ConfigurationRoot))
			{	
				out.print(ConfFiles.getNodeJson(path.substring(Constants.ConfigurationRoot.length())));
			}
		
			if(path.startsWith(Constants.DocumentsRoot))
			{	
				out.print(DocFiles.getNodeJson(path.substring(Constants.DocumentsRoot.length())));
			}
		
			if(path.startsWith(Constants.LogsRoot))
			{	
				out.print(LogFiles.getNodeJson(path.substring(Constants.LogsRoot.length())));
			}
		}
		catch(Exception e)
		{
			response.setStatus(206);
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
			out.print(e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String option=request.getParameter("option");
		log.trace("Menu.doPost called with option " + option);
		PrintWriter out=response.getWriter();
		if(option.equals("renameFile"))
		{
			try
			{
				String oldFile=request.getParameter("oldFile");
				log.trace("oldFile " + oldFile);
				String newFile=request.getParameter("newFile");
				log.trace("newFile " + newFile);
				File oldFileHandle = new File(oldFile);
				File newFileHandle=new File(newFile);
				if(newFileHandle.exists())
				{
					throw new Exception("A file with the same name already exists.<br/>Please choose a different name.");
				}
				boolean moved = oldFileHandle.renameTo(newFileHandle);
				if(!moved)
				{
					throw new Exception("There was an error renaming the file");
				}
			}
			catch(Exception e)
			{
				response.setStatus(206);
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.print(e.getMessage());
			}
		}
		if(option.equals("newFile"))
		{
			try
			{
				String filename=request.getParameter("filename");
				log.trace("filename " + filename);
				
				String type=request.getParameter("type");
				log.trace("type " + type);
				File newFile=new File(filename);
				
				if(newFile.getName().contains(" ")) {
					throw new Exception("Any new files must not contain spaces to conform with web formats");
				}
				
				boolean created=false;
				if(type.equals("file")) {
					created=newFile.createNewFile();
				}
				
				if(type.equals("directory")) {
					created=newFile.mkdir();
				}
				
				if(!created)
				{
					throw new Exception("There was an error creating the file");
				}
				else
				{
					Utils.setPermissions(newFile);
				}
			}
			catch(Exception e)
			{
				response.setStatus(206);
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.print(e.getMessage());
			}
		}
		if(option.equals("deleteFile"))
		{
			try
			{
				String filename=request.getParameter("filename");
				log.trace("filename " + filename);
				File newFile=new File(filename);
				boolean deleted=false;
				if(newFile.isDirectory())
				{	
					log.trace("Deleteing directory");
					deleted=Utils.deleteDirectory(newFile);
				}
				else
				{	
					log.trace("Deleteing file");
					deleted=newFile.delete();
				}
				if(!deleted)
				{
					throw new Exception("There was an error deleting the file");
				}
			}
			catch(Exception e)
			{
				response.setStatus(206);
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.print(e.getMessage());
			}
		}
		if(option.equals("cut"))
		{
			try
			{
				String oldFile=request.getParameter("oldFile");
				log.trace("oldFile " + oldFile);
				String directory=request.getParameter("directory");
				log.trace("directory " + directory);
				File oldFileHandle = new File(oldFile);
				File newFileHandle=new File(directory, oldFileHandle.getName());
				if(newFileHandle.equals(oldFileHandle))
				{
					throw new Exception("You are trying to cut and paste a file into the same directory. Nothing will be done!");
				}
				
				int copyNum = 1;
				while(newFileHandle.exists())
				{
					newFileHandle=new File(directory, oldFileHandle.getName() + "_" + copyNum);
					
					copyNum ++;
				}
				
				if(oldFileHandle.isDirectory())
				{
					Utils.moveDirectory(oldFileHandle, newFileHandle);
				}
				else
				{
					Utils.moveFile(oldFileHandle, newFileHandle);
				}
			}
			catch(Exception e)
			{
				response.setStatus(206);
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.print(e.getMessage());
			}
		}
		if(option.equals("copy"))
		{
			try
			{
				String oldFile=request.getParameter("oldFile");
				log.trace("oldFile " + oldFile);
				String directory=request.getParameter("directory");
				log.trace("directory " + directory);
				File oldFileHandle = new File(oldFile);
				File newFileHandle=new File(directory, oldFileHandle.getName());
				
				int copyNum = 1;
				while(newFileHandle.exists())
				{
					newFileHandle=new File(directory, oldFileHandle.getName() + "_" + copyNum);
					
					copyNum ++;
				}
				
				if(oldFileHandle.isDirectory())
				{
					Utils.copyDirectory(oldFileHandle, newFileHandle);
				}
				else
				{	
					boolean copy = Utils.copyFile(oldFileHandle, newFileHandle);
					if(!copy)
					{
						throw new Exception("There was an error copying and pasting the file");
					}
				}	
			}
			catch(Exception e)
			{
				response.setStatus(206);
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.print(e.getMessage());
			}
		}
		if(option.equals("submitSearch"))
		{
			try
			{	
				String filter = request.getParameter("searchFilter");
				String fileList = request.getParameter("searchFileList");
				boolean recursive = Boolean.valueOf(request.getParameter("searchRecursively"));
				String directory = request.getParameter("searchDirectory");
				
				boolean started = Search.start(directory, fileList, filter, recursive);
				
				out.print("{started: " + started + "}");
			}
			catch(Exception e)
			{
				response.setStatus(206);
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.print("{error: \"" + e.getMessage() + "\"}");
			}
		}
		if(option.equals("searchCheck")) {
			
			JSONObject JSONOut = new JSONObject();
			
			switch(SearchT.getCurrentState()) {
				case GRABBING_FILES:
				case SEARCHING:	
				case CANCELLING:	
					JSONOut.put("status", "running");
					JSONOut.put("output", SearchT.getCurrentOutput());
					break;
						
				case IDLE:
					JSONOut.put("status", "done");
					JSONOut.put("maxResults", Constants.maximumConfigurationSearchResults);
					JSONOut.put("results", SearchT.getLastResults());
					break;
					
				case CANCELLED:	
					JSONOut.put("status", "cancelled");
					break;
			}
			
			out.print(JSONOut.toString());
		}
		
		if(option.equals("searchCancel")) {
			
			try
			{
				Search.cancel();
			}
			catch(Exception e)
			{
				response.setStatus(206);
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.print(e.getMessage());
			}
			
		}
	}

}
