package ca.apachegui.web;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import ca.apachegui.db.LogData;

/**
 * Servlet implementation class ReceiveLogData
 */
@WebServlet("/ReceiveLogData")
public class ReceiveLogData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(ReceiveLogData.class);   
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReceiveLogData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.trace("Calling Post");
		String logData=request.getParameter("logData");
		log.trace("Received Log Data " + logData);
		String fields[]=logData.split("\",\"");
		
		Date date = new Date();
		Timestamp insertDate = new Timestamp(date.getTime());
		log.trace("insertDate " + insertDate.toString());
		
		String host="";
		if(fields.length>0) {
			host=fields[0];
		}
		log.trace("Host " + host);
		
		String userAgent="";
		if(fields.length>1) {
			userAgent=fields[1];
		}
		log.trace("userAgent " + userAgent);
		
		String requestString="";
		if(fields.length>2) {
			requestString=fields[2];
		}
		log.trace("requestString " + requestString);
		
		String status="";
		if(fields.length>3) {
			status=fields[3];
		}
		log.trace("status " + status);
		
		String contentSize="";
		if(fields.length>4) {
			contentSize=fields[4];
		}	
		log.trace("contentSize " + contentSize);
		
		LogData data = new LogData(insertDate, host, userAgent, requestString, status, contentSize);
		
		log.trace("Adding data");
		LogData.addLogData(data);
	}
	
	@Override
	public void destroy()
	{
		LogData.stopLogData();
	}

}
