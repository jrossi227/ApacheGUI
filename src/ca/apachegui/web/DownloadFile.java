package ca.apachegui.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import apache.conf.parser.File;

/**
 * Servlet implementation class DownloadFile
 */
public class DownloadFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadFile() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		File file = new File(request.getParameter("file"));
		
		ServletContext servletContext = request.getServletContext();
	    String mimeType = servletContext.getMimeType(file.getName());
	    if(mimeType == null) {
	    	mimeType = "application/octet-stream";
	    }
			    
	    response.setContentType(mimeType); 
	    response.setHeader("Content-Disposition", "attachment; filename=" + file.getName()); 
	    response.setContentLength((int) file.length());
	    
	    OutputStream out = response.getOutputStream();
	    FileInputStream in = new FileInputStream(file);
	    byte[] buffer = new byte[4096];
	    int length;
	    while ((length = in.read(buffer)) > 0){
	        out.write(buffer, 0, length);
	    }
	    in.close();
	    out.flush();
	}

}
