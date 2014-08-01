package ca.apachegui.web;

import apache.conf.global.Utils;
import apache.conf.parser.File;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import ca.apachegui.global.Constants;

/**
 * Servlet implementation class UploadFile
 */
public class UploadFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(UploadFile.class);   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UploadFile() {
        super();
        // TODO Auto-generated constructor stub
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
    	DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletContext servletContext = this.getServletConfig().getServletContext();
		File repository = new File((java.io.File) servletContext.getAttribute("javax.servlet.context.tempdir"));
		factory.setRepository(repository);
		factory.setSizeThreshold(1000000);
		
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(Constants.MaxFileUploadSize);
		
		String result = "";
		
		try {
			List<FileItem> items = upload.parseRequest(request);
			Iterator<FileItem> iter = items.iterator();
			
			ArrayList<FileItem> uploadedFiles = new ArrayList<FileItem>();
			
			String uploadDirectory = null;
			
			while (iter.hasNext()) {
			    FileItem item = iter.next();

			    if (!item.isFormField()) {
				    
			    	uploadedFiles.add(item);
			    	
			    } else {
			    	String name = item.getFieldName();
			        String value = item.getString();
			        
			        if(name.equals("uploadDirectoryName")) {
			        	uploadDirectory = value;
			        }
			    }
			}
			
			if(uploadDirectory == null) {
				throw new Exception("An upload directory was not specified");
			}
			
			result += "[";
			
			int index = 0;
			for(FileItem uploadedFile : uploadedFiles) {
				if (index != 0) {
			    	result += ", ";
			    }
			    
		        String feedback = processUploadedFile(uploadedFile, uploadDirectory);
		        
		        //Handle IE7 ugly uploading bug
		        if (feedback == null) {
		        	continue;
		        } else {
		        	result += feedback;
		        }
		        
			    ++index;
			    
			    log.debug(index);
			}
			
			result += "]";
			
			log.debug(result);
			
		} catch (Exception e) {
			result = "{'error':'" + e.getLocalizedMessage() + "'}";
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		
		response.setContentType("text/html");
		PrintWriter writer = response.getWriter();		
		writer.write(result.replace("'", "\""));
		writer.flush();		
	}

	private String processUploadedFile(FileItem item, String uploadDirectory) throws Exception {
	    String fileName = item.getName();
	    String contentType = item.getContentType();
	    
	    // Handle IE7 file uploading ugly bug ...
	    if (fileName.equals("")) {
	    	return null; //ignore
	    }
	    
	    File uploadedFile = new File(uploadDirectory,fileName);
	    item.write(uploadedFile);

	    Utils.setPermissions(new File(uploadedFile.getAbsolutePath()));
	    
		log.debug(fileName + ", " + contentType + ", " + uploadedFile.length());	    
	    
	    return "{'fileName':'" + fileName + "', " + 
	    		"'contentType':'" + contentType + "', " + 
	    		"'size':" + uploadedFile.length() + ", " + 
	    		"'id':" + (System.currentTimeMillis() + new Random().nextInt(100)) + "}";
	}
}
