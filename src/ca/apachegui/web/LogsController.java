package ca.apachegui.web;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;

import apache.conf.parser.File;

import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;

@RestController
@RequestMapping("/Logs")
public class LogsController {
	private static Logger log = Logger.getLogger(LogsController.class);
	
	@RequestMapping(method=RequestMethod.GET,params="option=search",produces="text/plain;charset=UTF-8")
	public String search(@RequestParam(value="searchFilter") String searchFilter,
					     @RequestParam(value="file") String filename) throws Exception {
		
		File file=new File(filename);
		log.trace("search called with searchFilter " + searchFilter + " file " + file.getAbsolutePath());
		
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
	
		LinkedList<String> list = new LinkedList<String>();
		
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
	
		StringBuffer response = new StringBuffer();
		while(it.hasNext())
		{
			String line = it.next();
			response.append(line + Constants.newLine);
		}
	
		return response.toString();
	}
	
	@RequestMapping(method=RequestMethod.GET,params="option=tail",produces="text/plain;charset=UTF-8")
	public void tail(@RequestParam(value="currByte",required=false) String byteString,
					 @RequestParam(value="file") String filename,
					 @RequestParam(value="filter") String filter,
					 HttpServletResponse response) throws Exception {
		
		PrintWriter out = response.getWriter();
		File file = new File(filename);
		
		Pattern pattern=Pattern.compile(filter, Pattern.CASE_INSENSITIVE);
		java.util.regex.Matcher patternMatcher = null; 
		
		log.trace("tail called with file " + file.getAbsolutePath());
		
		if(byteString==null) {
			return;
		}	
		
		long currByte=Long.parseLong(byteString);
		if(currByte==0) {
			currByte=file.length();
		}
		
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
	
	@RequestMapping(method=RequestMethod.GET,params="option=export",produces="application/json;charset=UTF-8")
	public String export(@RequestParam(value="searchFilter") String searchFilter,
					     @RequestParam(value="file") String filename) throws Exception {
	
		File file=new File(filename);
		log.trace("export called with searchFilter " + searchFilter + " file " + file.getAbsolutePath());
		
		File outputFile=new File(Utilities.getWebappDirectory(), "search/" + Constants.searchFile);
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
        
        JSONObject result = new JSONObject();
        result.put("file", outputFile.getAbsolutePath());
        
        return result.toString();
	}
}
