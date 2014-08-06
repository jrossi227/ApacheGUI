package ca.apachegui.web;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataInputStream;

import apache.conf.parser.File;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ServletContextAware;

import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;

/**
 * Servlet implementation class Logs
 */
@RestController
public class Logs extends HttpServlet implements ServletContextAware {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Logs.class);
       
	private ServletContext context;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Logs() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {
    	
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String option=request.getParameter("option");
		log.trace("Logs called with option " + option);
		if(option.equals("search"))
		{
			PrintWriter out = response.getWriter();
			String searchFilter=request.getParameter("searchFilter");
			File file=new File(request.getParameter("file"));
			log.trace("search called with searchFilter " + searchFilter + " file " + file.getAbsolutePath());
			
			try
			{
				LinkedList<String> list = new LinkedList<String>();
            	
        		FileInputStream fstream = new FileInputStream(file);
        		DataInputStream in;
        		if(file.getName().endsWith(".gz")) {
        			in = new DataInputStream(new GZIPInputStream(fstream));
        		} else {
        			in = new DataInputStream(fstream);
        		}
        		
        		BufferedReader br = new BufferedReader(new InputStreamReader(in,"UTF-8"));
        		
        		String strLine;
        		Pattern pattern=Pattern.compile(searchFilter, Pattern.CASE_INSENSITIVE);
        		java.util.regex.Matcher patternMatcher = null; 
    		
        		while ((strLine = br.readLine()) != null)   
        		{
        			patternMatcher = pattern.matcher(strLine); 
        			// Print the content on the console
        			if(patternMatcher.find())
        			{	
        				list.addFirst(strLine);
        				
        				if(list.size()>Constants.maximumSearchResults) {
        					list.removeLast();
        				}	
        			}	
        		}
        		in.close();
        	
        		Iterator<String> it = list.descendingIterator();
        	
        		int count=0;
        		while(it.hasNext() && count<Constants.maximumSearchResults)
        		{
        			String line = it.next();
        			out.append(line + Constants.newLine);
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
		if(option.equals("export"))
		{
			PrintWriter out = response.getWriter();
			String searchFilter=request.getParameter("searchFilter");
			File file=new File(request.getParameter("file"));
			log.trace("export called with searchFilter " + searchFilter + " file " + file.getAbsolutePath());
			try 
			{
				File outputFile=new File(Utilities.getWebappDirectory(), "webapps/ApacheGUI/search/" + Constants.searchFile);
				BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(outputFile));
            	
        		FileInputStream fstream = new FileInputStream(file);
        		DataInputStream in;
        		if(file.getName().endsWith(".gz")) {
        			in = new DataInputStream(new GZIPInputStream(fstream));
        		} else {
        			in = new DataInputStream(fstream);
        		}
        		BufferedReader br = new BufferedReader(new InputStreamReader(in,"UTF-8"));
        	
        		String strLine;
        		Pattern pattern=Pattern.compile(searchFilter, Pattern.CASE_INSENSITIVE);
        		java.util.regex.Matcher patternMatcher = null; 
    		
        		while ((strLine = br.readLine()) != null)   
        		{
        			patternMatcher = pattern.matcher(strLine); 
        			// Print the content on the console
        			if(patternMatcher.find())
        			{	
        				bufferedWriter.write(strLine);
        				bufferedWriter.newLine();
        			}	
        		}
        		in.close();
        		bufferedWriter.flush();
                bufferedWriter.close();
                out.print("{file: '" + outputFile.getAbsolutePath() + "'}");
			} 
			catch (Exception e) 
		    {
		    	StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print("{result:\"" + sw.toString().replace("\"", "\\\"") + "\"}"); 
		    } 
		}
		if(option.equals("tail"))
		{
			PrintWriter out = response.getWriter();
			File file = new File(request.getParameter("file"));
			
			String filter=request.getParameter("filter");
			Pattern pattern=Pattern.compile(filter, Pattern.CASE_INSENSITIVE);
    		java.util.regex.Matcher patternMatcher = null; 
			
			log.trace("tail called with file " + file.getAbsolutePath());
			try
			{
				String byteString=request.getParameter("currByte");
				if(byteString==null)
					return;
				
				long currByte=Long.parseLong(byteString);
				if(currByte==0)
					currByte=file.length();
				
				response.setBufferSize((int) (file.length()-currByte));
				
				InputStream is = new BufferedInputStream(new FileInputStream(file));
			    is.skip(currByte);
				
			    byte[] c = new byte[10240];
				int readChars = 0;
				StringBuffer line=new StringBuffer();
				int charCount=0;
				while ((readChars = is.read(c)) != -1) 
				{
				     for (int i = 0; i < readChars; ++i) 
				     {
				         currByte ++;
				         line.append((char)c[i]);
				         if((char)c[i]=='\n')
				         {
				        	 patternMatcher = pattern.matcher(line.toString()); 
			        		 // Print the content on the console
			        		 if(patternMatcher.find())
			        		 {
			        			 out.print(line.toString());
			        			 charCount +=(line.toString().toCharArray().length);
			        		 }
				        	 line.delete(0, line.length());
				         }
				     }
				}	
				
				is.close();
				
				response.setHeader("currByte", String.valueOf(currByte));
				response.setContentLength(charCount);
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

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.context = servletContext;
		
	}

}
