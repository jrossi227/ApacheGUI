package ca.apachegui.web;

import java.io.BufferedWriter;
import apache.conf.parser.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import ca.apachegui.db.LogData;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;

/**
 * Servlet implementation class SearchResults
 */
@WebServlet("/SearchResults")
public class SearchResults extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(SearchResults.class);
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchResults() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		PrintWriter out =response.getWriter();
		try
		{
			log.trace("SearchResults.doGet Called");
			String option=request.getParameter("option");
			log.trace("option " + option);
			String startDate=request.getParameter("startDate").trim();
			log.trace("startDate " + startDate);
			String startTime=request.getParameter("startTime").trim();
			log.trace("startTime " + startTime);
			String endDate=request.getParameter("endDate").trim();
			log.trace("endDate " + endDate);
			String endTime=request.getParameter("endTime").trim();
			log.trace("endTime " + endTime);
			String host=request.getParameter("host").trim();
			log.trace("host " + host);
			String userAgent=request.getParameter("userAgent").trim();
			log.trace("userAgent " + userAgent);
			String requestString=request.getParameter("requestString").trim();
			log.trace("requestString " + requestString);
			String status=request.getParameter("status").trim();
			log.trace("status " + status);
			String contentSize=request.getParameter("contentSize").trim();
			log.trace("contentSize " + contentSize);
			String maxResults=request.getParameter("maxResults");
			if(maxResults==null) {
				maxResults=Constants.maxHistoricalResults;
			}
			
			if(maxResults.equals("")) {
				maxResults=Constants.maxHistoricalResults;
			}
			
			try {
				Integer.parseInt(maxResults);
			}
			catch(Exception e){ 
				maxResults=Constants.maxHistoricalResults;
			}
			log.trace("maxResults " + maxResults);
			
			SimpleDateFormat startDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			java.util.Date startParsedDate = startDateFormat.parse(startDate+ " " + startTime);
			java.sql.Timestamp startTimestamp = new java.sql.Timestamp(startParsedDate.getTime());
			log.trace("startTimestamp " + startTimestamp.toString());
			
			SimpleDateFormat endDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			java.util.Date endParsedDate = endDateFormat.parse(endDate+ " " + endTime);
			java.sql.Timestamp endTimestamp = new java.sql.Timestamp(endParsedDate.getTime());
			log.trace("endTimestamp " + endTimestamp.toString());
			
			
			if(option.equals("window"))
			{
				log.trace("Entering window option");
				LogData[] results=LogData.queryLogData(startTimestamp, endTimestamp, host, userAgent, requestString, status, contentSize, maxResults);
				
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				
				if(results.length>0)
				{
					for(int i=0; i< results.length; i++)
					{
						out.print("{id: '" + (i+1) +"', insertDate:'" + results[i].getInsertDate().toString() + "', host:'" + results[i].getHost()  + "', userAgent:'" + results[i].getUserAgent() + "',requestString: '" + results[i].getRequestString()  + "',status: '" + results[i].getStatus() + "',contentSize: '" + results[i].getContentSize() + "'}");
						if(i!=(results.length-1))
							out.print(",");
					}	
				}
				else 
				{
					out.print("{id: '', insertDate: '', host:'', userAgent: '',requestString: '',status: '',contentSize: ''}");
				}
				out.println("]}");
			}
			if(option.equals("csv"))
			{
				//ServletOutputStream stream = response.getOutputStream();
				log.trace("Entering csv option");
				LogData[] results=LogData.queryLogData(startTimestamp, endTimestamp, host, userAgent, requestString, status, contentSize, maxResults);
				File cat = new File(Utilities.getTomcatInstallDirectory());
			    File doc = new File(cat,"webapps/ApacheGUI/HistoryFiles/" + Constants.historyFilename);
				BufferedWriter writer = new BufferedWriter(new FileWriter(doc));
				writer.write("\"INSERTDATE\",\"HOST\",\"USERAGENT\",\"REQUESTSTRING\",\"STATUS\",\"CONTENTSIZE\"");
				writer.newLine();
				for(int i=0; i< results.length; i++)
				{
					writer.write("\"" + results[i].getInsertDate().toString() + "\",\"" + results[i].getHost() + "\",\"" + results[i].getUserAgent() + "\",\"" + results[i].getRequestString() + "\",\"" + results[i].getStatus() + "\",\"" + results[i].getContentSize() + "\"");
					writer.newLine();
				}	
				writer.flush();
				writer.close();
			}
			if(option.equals("delete"))
			{
				log.trace("Entering delete option");
				LogData.deleteLogData(startTimestamp, endTimestamp, host, userAgent, requestString, status, contentSize);
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
