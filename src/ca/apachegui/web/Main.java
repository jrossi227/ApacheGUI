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

import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;

/**
 * Servlet implementation class Main
 */
@WebServlet("/Main")
public class Main extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Main() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String option=request.getParameter("option");
		PrintWriter out =response.getWriter();
		try 
		{
			if(option.equals("confFilePath")){
				out.print("{file: '" + Settings.getSetting(Constants.confDirectory) + "'}");
			}
			if(option.equals("docFilePath")) {	
				out.print("{file: '" + Utilities.getFileSystemDrive() + "'}");
			}
			if(option.equals("logFilePath")) {
				out.print("{file: '" + Settings.getSetting(Constants.logDirectory) + "'}");
			}
			if(option.equals("validateFileExists")) {
				String file=request.getParameter("filename");
				out.print("{exists: " + (new File(file)).exists() + "}");
			}
			if(option.equals("lastModifiedTime")) {
				String path = request.getParameter("path");
				
				File file = new File(path);
				long lastModifiedTime = -1;
				if(file.exists()) {
					lastModifiedTime = file.lastModified();
				}
				
				out.print("{time: " + lastModifiedTime + "}");
			}
			if(option.equals("checkSession")) {
				out.print("active");
			}
		}
		catch(Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			response.setStatus(206);
			out.print(sw.toString());
			out.flush();
		}
	}

}
