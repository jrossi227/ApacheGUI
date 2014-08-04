package ca.apachegui.db;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.log4j.Logger;

import ca.apachegui.global.Constants;

public class LogData extends JdbcConnection 
{
	private static Logger log = Logger.getLogger(LogData.class);
	private String host;
	private Timestamp insertDate;
	private String userAgent;
	private String requestString;
	private String status;
	private String contentSize;
	
	public LogData(Timestamp insertDate, String host, String userAgent, String requestString, String status, String contentSize)
	{
		this.host=host;
		this.insertDate=insertDate;
		this.userAgent=userAgent;
		this.requestString=requestString;
		this.status=status;
		this.contentSize=contentSize;
	}
	
	/**
	 * Writes the log data directly to the database.
	 * 
	 * @param data - an Array of LogData to write to the database.
	 */
	public static void commitLogData(LogData data[])
	{
		Connection conn=null;
		PreparedStatement st=null;
		String update="";
		try
		{
			conn=connect();
			conn.setAutoCommit(false);
			update="INSERT INTO " + Constants.logDataTable + " (HOST,INSERTDATE,USERAGENT,REQUESTSTRING,STATUS,CONTENTSIZE) VALUES (?,?,?,?,?,?)";
			st=conn.prepareStatement(update);
			for(int i=0; i<data.length; i++)
			{	
				st.setString(1, data[i].getHost());
				st.setTimestamp(2, data[i].getInsertDate());
				st.setString(3, data[i].getUserAgent());
				st.setString(4, data[i].getRequestString());
				st.setString(5, data[i].getStatus());
				st.setString(6, data[i].getContentSize());
				st.executeUpdate();
			}
			conn.commit();
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeStatement(st);
			disconnect(conn);
		}	
	}
	
	/**
	 * Returns a Log Data query in descending order of date.
	 * 
	 * @param startDate - The start date to query. This value is required.
	 * @param endDate - The end date to query. This value is required.
	 * @param host - The host to query. The supplied host can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param userAgent - The userAgent to query. The supplied user agent can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param requestString - The request String to query. The supplied request string can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param status - An integer with the desired status. The supplied status must exactly match the status in the database. Can be left blank if its not required.
	 * @param contentSize - An integer with the desired contentSize. The supplied contentSize must exactly match the status in the database. Can be left blank if its not required.
	 * @param maxResults - The maximum amounts of results to return.
	 * @return an array of LogData results.
	 */
	public static LogData[] queryLogData(Timestamp startDate, Timestamp endDate, String host, String userAgent, String requestString, String status, String contentSize, String maxResults)
	{
		log.trace("Entering queryLogData");
		log.trace("startDate " + startDate.toString());
		log.trace("endDate " + endDate.toString());
		log.trace("host " + host);
		log.trace("userAgent " + userAgent);
		log.trace("requestString " + requestString);
		log.trace("status " + status);
		log.trace("contentSize " + contentSize);
		log.trace("maxResults " + maxResults);
		StringBuffer query=new StringBuffer();
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		ArrayList <LogData>data= new ArrayList<LogData>();
		try
		{
			query.append("SELECT * FROM " + Constants.logDataTable + " WHERE INSERTDATE>TIMESTAMP('" + startDate.toString() + "') AND INSERTDATE<TIMESTAMP('" + endDate.toString() + "')");
			if(!host.equals(""))
			{
				query.append(" AND UPPER(HOST) LIKE '%" + host.toUpperCase() + "%'");
			}
		
			if(!userAgent.equals(""))
			{
				query.append(" AND UPPER(USERAGENT) LIKE '%" + userAgent.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!requestString.equals(""))
			{
				query.append(" AND UPPER(REQUESTSTRING) LIKE '%" + requestString.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!status.equals(""))
			{
				query.append(" AND STATUS='" + status + "'");
			}
		
			if(!contentSize.equals(""))
			{
				query.append(" AND CONTENTSIZE='" + contentSize + "'");
			}
		
			query.append(" ORDER BY INSERTDATE DESC");
			log.trace("Query: " + query.toString());
		
			conn=connect();
			st=conn.createStatement();
			st.setMaxRows(Integer.parseInt(maxResults)); 
			
			log.trace("running query");
			res=st.executeQuery(query.toString());
			
			
			Timestamp insertDateResult=null;
			String hostResult=null;
			String userAgentResult=null;
			String requestStringResult=null;
			String statusResult=null;
			String contentSizeResult=null;
			
			while(res.next())
			{
				insertDateResult=res.getTimestamp("INSERTDATE");
				log.trace("INSERTDATE " + insertDateResult.toString());
				hostResult=res.getString("HOST");
				log.trace("HOST " + hostResult);
				userAgentResult=res.getString("USERAGENT");
				log.trace("USERAGENT " + userAgentResult);
				requestStringResult=res.getString("REQUESTSTRING");
				log.trace("REQUESTSTRING " + requestStringResult);
				statusResult=res.getString("STATUS");
				log.trace("STATUS " + statusResult);
				contentSizeResult=res.getString("CONTENTSIZE");
				log.trace("CONTENTSIZE " + contentSizeResult);
				data.add(new LogData(insertDateResult, hostResult, userAgentResult, requestStringResult, statusResult, contentSizeResult));
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeResultSet(res);
			closeStatement(st);
			disconnect(conn);
		}
		return data.toArray(new LogData[data.size()]);
	}
	
	/**
	 * 
	 * @param startDate - The start date to query. This value is required.
	 * @param endDate - The end date to query. This value is required.
	 * @param host - The host to query. The supplied host can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param userAgent - The userAgent to query. The supplied user agent can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param requestString - The request String to query. The supplied request string can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param status - An integer with the desired status. The supplied status must exactly match the status in the database. Can be left blank if its not required.
	 * @param contentSize - An integer with the desired contentSize. The supplied contentSize must exactly match the status in the database. Can be left blank if its not required.
	 */
	public static void deleteLogData(Timestamp startDate, Timestamp endDate, String host, String userAgent, String requestString, String status, String contentSize)
	{
		log.trace("Entering deleteLogData");
		log.trace("startDate " + startDate.toString());
		log.trace("endDate " + endDate.toString());
		log.trace("host " + host);
		log.trace("userAgent " + userAgent);
		log.trace("requestString " + requestString);
		log.trace("status " + status);
		log.trace("contentSize " + contentSize);
		StringBuffer update=new StringBuffer();
		Connection conn=null;
		Statement st=null;
		try
		{
			update.append("DELETE FROM " + Constants.logDataTable + " WHERE INSERTDATE>TIMESTAMP('" + startDate.toString() + "') AND INSERTDATE<TIMESTAMP('" + endDate.toString() + "')");
			if(!host.equals(""))
			{
				update.append(" AND UPPER(HOST) LIKE '%" + host.toUpperCase() + "%'");
			}
		
			if(!userAgent.equals(""))
			{
				update.append(" AND UPPER(USERAGENT) LIKE '%" + userAgent.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!requestString.equals(""))
			{
				update.append(" AND UPPER(REQUESTSTRING) LIKE '%" + requestString.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!status.equals(""))
			{
				update.append(" AND STATUS='" + status + "'");
			}
		
			if(!contentSize.equals(""))
			{
				update.append(" AND CONTENTSIZE='" + contentSize + "'");
			}
		
			log.trace("Update: " + update.toString());
		
			conn=connect();
			st=conn.createStatement();
			
			log.trace("running update");
			st.executeUpdate(update.toString());
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeStatement(st);
			disconnect(conn);
		}
	}
	
	/**
	 * 
	 * @param numberOfDays - Any data older than the supplied number of days will be deleted.
	 */
	public static void shrinkLogData(int numberOfDays)
	{
		log.trace("Entering shrinkLogData with numberOf Days " + numberOfDays);
		StringBuffer update=new StringBuffer();
		Connection conn=null;
		Statement st=null;
		try
		{
			Calendar cal=Calendar.getInstance();
			cal.add(Calendar.DAY_OF_YEAR, ((-1)*numberOfDays));
			Timestamp date=new Timestamp(cal.getTimeInMillis());
			
			update.append("DELETE FROM " + Constants.logDataTable + " WHERE INSERTDATE<TIMESTAMP('" + date.toString() + "')");
			
			log.trace("Update: " + update.toString());
		
			conn=connect();
			st=conn.createStatement();
			
			log.trace("running update");
			st.executeUpdate(update.toString());
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeStatement(st);
			disconnect(conn);
		}
	}
	
	/**
	 * 
	 * @return the number of log entries in the database.
	 */
	public static int getNumberOfEntries()
	{
		log.trace("Entering getNumberOfEntries");
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		int value=0;
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT COUNT(INSERTDATE) AS NUMROWS FROM " + Constants.logDataTable;
			res=st.executeQuery(query);
			
			if(res.next())
			{
				value=res.getInt("NUMROWS");
				log.trace("Number Of Rows " + value);
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeResultSet(res);
			closeStatement(st);
			disconnect(conn);
		}
		
		if(value==0)
			log.trace("There were no entries found in the table");
		
		return value;
	}
	
	/**
	 * 
	 * @return the oldest time in the database.
	 */
	public static Timestamp getOldestTime()
	{
		log.trace("Entering getOldestTime");
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		Timestamp value=null;
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT MIN(INSERTDATE) AS MINTIME FROM " + Constants.logDataTable;
			res=st.executeQuery(query);
			
			if(res.next())
			{
				value=res.getTimestamp("MINTIME");
				if(value!=null)
				{	
					log.trace("Minimum Time " + value.toString());
				}
				else
				{
					log.trace("There were no entries found in the database");
				}
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeResultSet(res);
			closeStatement(st);
			disconnect(conn);
		}
		
		if(value==null)
			log.trace("There were no dates found in the table");
		
		return value;
	}
	
	/**
	 * 
	 * @return the newest time in the database
 	 */
	public static Timestamp getNewestTime()
	{
		log.trace("Entering getNewestTime");
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		Timestamp value=null;
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT MAX(INSERTDATE) AS MAXTIME FROM " + Constants.logDataTable;
			res=st.executeQuery(query);
			
			if(res.next())
			{
				value=res.getTimestamp("MAXTIME");
				if(value!=null)
				{	
					log.trace("Maximum Time " + value.toString());
				}
				else
				{
					log.trace("There were no entries found in the database");
				}
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeResultSet(res);
			closeStatement(st);
			disconnect(conn);
		}
		
		if(value==null)
			log.trace("There were no dates found in the table");
		
		return value;
	}
	
	/**
	 * Gets the total amount of transactions per hour over a day.
	 * 
	 * @param date - The date to query. Only the day month and year are used.
	 * @param host - The host to query. The supplied host can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param userAgent - The userAgent to query. The supplied user agent can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param requestString - The request String to query. The supplied request string can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param status - An integer with the desired status. The supplied status must exactly match the status in the database. Can be left blank if its not required.
	 * @param contentSize - An integer with the desired contentSize. The supplied contentSize must exactly match the status in the database. Can be left blank if its not required.
	 * @return an array with length 24 which has the amount of entries per hour.
	 */
	public static int[] getDailyReportByHour(Timestamp date, String host, String userAgent, String requestString, String status, String contentSize)
	{
		//select h, count(*) as NUM from (select hour(INSERTDATE) from LOGDATA WHERE INSERTDATE < TIMESTAMP('2011-12-23 00:00:00.0') AND INSERTDATE > TIMESTAMP('2011-12-22 00:00:00.0')) as t(h) group by h;
		log.trace("Entering getDailyReportByHour");
		log.trace("date " + date.toString());
		log.trace("host " + host);
		log.trace("userAgent " + userAgent);
		log.trace("requestString " + requestString);
		log.trace("status " + status);
		log.trace("contentSize " + contentSize);
		
		Timestamp currentTime=date;
		Calendar tempPresent= Calendar.getInstance();
		tempPresent.setTimeInMillis(currentTime.getTime());
		tempPresent.set(Calendar.HOUR_OF_DAY, 0);
		tempPresent.set(Calendar.MINUTE, 0);
		tempPresent.set(Calendar.SECOND, 0);
		tempPresent.set(Calendar.MILLISECOND, 0);
		currentTime.setTime(tempPresent.getTimeInMillis());
		tempPresent.add(Calendar.DAY_OF_YEAR, 1);
		Timestamp futureTime=new Timestamp(tempPresent.getTimeInMillis());
		
		int hourCount[] = new int[24];
		for(int i=0;i<hourCount.length;i++)
			hourCount[i]=0;
		
		StringBuffer query=new StringBuffer();
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		try
		{
			query.append("SELECT h, count(*) as NUM from (SELECT hour(INSERTDATE) FROM " + Constants.logDataTable + " WHERE INSERTDATE<TIMESTAMP('" + futureTime.toString() + "') AND INSERTDATE>TIMESTAMP('" + currentTime.toString() + "')");
			if(!host.equals(""))
			{
				query.append(" AND UPPER(HOST) LIKE '%" + host.toUpperCase() + "%'");
			}
		
			if(!userAgent.equals(""))
			{
				query.append(" AND UPPER(USERAGENT) LIKE '%" + userAgent.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!requestString.equals(""))
			{
				query.append(" AND UPPER(REQUESTSTRING) LIKE '%" + requestString.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!status.equals(""))
			{
				query.append(" AND STATUS='" + status + "'");
			}
		
			if(!contentSize.equals(""))
			{
				query.append(" AND CONTENTSIZE='" + contentSize + "'");
			}
		
			query.append(") as t(h) group by h");
			log.trace("Query: " + query.toString());
		
			conn=connect();
			st=conn.createStatement();
			
			log.trace("running query");
			res=st.executeQuery(query.toString());
			
			int hour;
			int count;
			while(res.next())
			{
				hour=res.getInt("h");
				count=res.getInt("NUM");
				hourCount[hour]=count;
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeResultSet(res);
			closeStatement(st);
			disconnect(conn);
		}
		
		return hourCount;
	}
	
	/**
	 * Gets the total amount of transactions per day per month. The 0 position in the returned array should not be used.
	 * 
	 * @param date - The date to query. Only the month and year are used.
	 * @param host - The host to query. The supplied host can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param userAgent - The userAgent to query. The supplied user agent can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param requestString - The request String to query. The supplied request string can be a substring and is not case sensitive. Can be left blank if its not required.
	 * @param status - An integer with the desired status. The supplied status must exactly match the status in the database. Can be left blank if its not required.
	 * @param contentSize - An integer with the desired contentSize. The supplied contentSize must exactly match the status in the database. Can be left blank if its not required.
	 * @return an array with length that matches the amount of the days in the month +1. Each position has the amount of entries per day. The days start at 1 so position 0 is not used.
	 */
	public static int[] getMonthlyReportByDay(Timestamp date, String host, String userAgent, String requestString, String status, String contentSize)
	{		
		log.trace("Entering getDailyReportByHour");
		log.trace("date " + date.toString());
		log.trace("host " + host);
		log.trace("userAgent " + userAgent);
		log.trace("requestString " + requestString);
		log.trace("status " + status);
		log.trace("contentSize " + contentSize);
		
		Timestamp currentTime=date;
		Calendar tempPresent= Calendar.getInstance();
		tempPresent.setTimeInMillis(currentTime.getTime());
		tempPresent.set(Calendar.DAY_OF_MONTH, 1);
		tempPresent.set(Calendar.HOUR_OF_DAY, 0);
		tempPresent.set(Calendar.MINUTE, 0);
		tempPresent.set(Calendar.SECOND, 0);
		tempPresent.set(Calendar.MILLISECOND, 0);
		currentTime.setTime(tempPresent.getTimeInMillis());
		int numOfDays=tempPresent.getActualMaximum(Calendar.DAY_OF_MONTH);
		tempPresent.add(Calendar.MONTH, 1);
		Timestamp futureTime=new Timestamp(tempPresent.getTimeInMillis());
		
		
		int dayCount[] = new int[numOfDays+1];
		for(int i=0;i<dayCount.length;i++)
			dayCount[i]=0;
		
		StringBuffer query=new StringBuffer();
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		try
		{
			query.append("SELECT d, count(*) as NUM from (SELECT day(INSERTDATE) FROM " + Constants.logDataTable + " WHERE INSERTDATE<TIMESTAMP('" + futureTime.toString() + "') AND INSERTDATE>TIMESTAMP('" + currentTime.toString() + "')");
			if(!host.equals(""))
			{
				query.append(" AND UPPER(HOST) LIKE '%" + host.toUpperCase() + "%'");
			}
		
			if(!userAgent.equals(""))
			{
				query.append(" AND UPPER(USERAGENT) LIKE '%" + userAgent.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!requestString.equals(""))
			{
				query.append(" AND UPPER(REQUESTSTRING) LIKE '%" + requestString.toUpperCase().replaceAll("%", "@%").replaceAll("_", "@_") + "%'  {escape '@'}");
			}
		
			if(!status.equals(""))
			{
				query.append(" AND STATUS='" + status + "'");
			}
		
			if(!contentSize.equals(""))
			{
				query.append(" AND CONTENTSIZE='" + contentSize + "'");
			}
		
			query.append(") as t(d) group by d");
			log.trace("Query: " + query.toString());
		
			conn=connect();
			st=conn.createStatement();
			
			log.trace("running query");
			res=st.executeQuery(query.toString());
			
			int day;
			int count;
			while(res.next())
			{
				day=res.getInt("d");
				count=res.getInt("NUM");
				dayCount[day]=count;
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeResultSet(res);
			closeStatement(st);
			disconnect(conn);
		}
		
		return dayCount;
	}
	
	/**
	 * Function used to rebuild date index.
	 */
	public static void rebuildInsertDateIndex()
	{
		log.trace("Entering rebuildInsertDateIndex");
		String update="";
		Connection conn=null;
		Statement st=null;
		try
		{
			conn=connect();
			st=conn.createStatement();
			try
			{	
				update="DROP INDEX insertDateIndex";
				log.trace("Update: " + update);
				st.executeUpdate(update);
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
			}
			try
			{	
				update="CREATE INDEX insertDateIndex ON logdata(insertdate)";
				log.trace("Update: " + update);
				st.executeUpdate(update);
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
			}
		}
		catch(Exception e)
		{
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
		finally
		{
			closeStatement(st);
			disconnect(conn);
		}
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getHost() {
		return host;
	}

	public void setInsertDate(Timestamp insertDate) {
		this.insertDate = insertDate;
	}

	public Timestamp getInsertDate() {
		return insertDate;
	}

	public void setRequestString(String requestString) {
		this.requestString = requestString;
	}

	public String getRequestString() {
		return requestString;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setContentSize(String contentSize) {
		this.contentSize = contentSize;
	}

	public String getContentSize() {
		return contentSize;
	}
}
