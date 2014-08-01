package ca.apachegui.web;

import java.io.BufferedInputStream;
import apache.conf.parser.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * Servlet implementation class Image
 */
@WebServlet("/Image")
public class Image extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Logs.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Image() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String file=request.getParameter("file");
		log.trace("Image called with file " + file);
		ServletOutputStream stream = null;
	    BufferedInputStream buf = null;
	    String contentType="text/plain";
	    String ext=file.substring(file.lastIndexOf(".") +1);
	    if(ext.matches("(?i:jpg)|(?i:jpeg)|(?i:jpe)"))
	    {		
	    	contentType="image/jpeg";
	    }
	    if(ext.matches("(?i:bmp)"))
	    {		
	    	contentType="image/bmp";
	    }
	    if(ext.matches("(?i:tif)|(?i:tiff)"))
	    {		
	    	contentType="image/tiff";
	    }
	    if(ext.matches("(?i:gif)"))
	    {		
	    	contentType="image/gif";
	    }
	    if(ext.matches("(?i:png)"))
	    {		
	    	contentType="image/png";
	    }
	    try 
	    {
	      stream = response.getOutputStream();
	      File doc = new File(file);
	      response.setContentType(contentType);
	      response.setHeader("Cache-Control", "");
	      response.setHeader("Pragma", "");
	      response.setContentLength((int) doc.length());
	      FileInputStream input = new FileInputStream(doc);
	      buf = new BufferedInputStream(input);
	      int readBytes = 0;
	      while ((readBytes = buf.read()) != -1)
	        stream.write(readBytes);
	    } 
	    catch (IOException ioe) 
	    {
	    	PrintWriter out = response.getWriter();
	    	StringWriter sw = new StringWriter();
			ioe.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
			response.setStatus(206);
			out.print(sw.toString());
	    } 
	    finally 
	    {
	      if (stream != null)
	        stream.close();
	      if (buf != null)
	        buf.close();
	    }
	}
}
