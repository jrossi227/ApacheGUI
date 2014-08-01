package ca.apachegui.server;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import apache.conf.global.Utils;

import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;

/** Class that provides extended details for running Proccesses
 * 
 * Class uses the JSOUP Library to parse server status
 * http://jsoup.org/apidocs/org/jsoup/Jsoup.html
 *
 * Example Linux html output from server-status to parse
 * <table border="0"><tr><th>Srv</th><th>PID</th><th>Acc</th><th>M</th><th>CPU
 *</th><th>SS</th><th>Req</th><th>Conn</th><th>Child</th><th>Slot</th><th>Client</th><th>VHost</th><th>Request</th></tr>
 *
 *<tr><td><b>0-0</b></td><td>2380</td><td>0/1/1</td><td>_
 *</td><td>0.00</td><td>3</td><td>0</td><td>0.0</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status HTTP/1.1</td></tr>
 *
 *<tr><td><b>1-0</b></td><td>2381</td><td>0/1/1</td><td>_
 *</td><td>0.00</td><td>5</td><td>0</td><td>0.0</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status?auto HTTP/1.1</td></tr>
 *
 *<tr><td><b>3-0</b></td><td>2383</td><td>0/6/6</td><td><b>W</b>
 *</td><td>0.00</td><td>0</td><td>0</td><td>0.0</td><td>0.01</td><td>0.01
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status HTTP/1.1</td></tr>
 *
 *<tr><td><b>4-0</b></td><td>2384</td><td>0/1/1</td><td>_
 *</td><td>0.00</td><td>2</td><td>0</td><td>0.0</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status?auto HTTP/1.1</td></tr>
 *
 *<tr><td><b>5-0</b></td><td>2408</td><td>1/1/1</td><td><b>K</b>
 *</td><td>0.00</td><td>2</td><td>0</td><td>3.4</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status HTTP/1.1</td></tr>
 *
 *</table>
 *
 ** Example Windows html output from server-status to parse
 * <table border="0"><tr><th>Srv</th><th>PID</th><th>Acc</th><th>M</th><th>CPU
 *</th><th>SS</th><th>Req</th><th>Conn</th><th>Child</th><th>Slot</th><th>Client</th><th>VHost</th><th>Request</th></tr>
 *
 *<tr><td><b>0-0</b></td><td>2380</td><td>0/1/1</td><td>_
 *</td><td>0.00</td><td>3</td><td>0</td><td>0.0</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status HTTP/1.1</td></tr>
 *
 *<tr><td><b>1-0</b></td><td>2381</td><td>0/1/1</td><td>_
 *</td><td>0.00</td><td>5</td><td>0</td><td>0.0</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status?auto HTTP/1.1</td></tr>
 *
 *<tr><td><b>3-0</b></td><td>2383</td><td>0/6/6</td><td><b>W</b>
 *</td><td>0.00</td><td>0</td><td>0</td><td>0.0</td><td>0.01</td><td>0.01
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status HTTP/1.1</td></tr>
 *
 *<tr><td><b>4-0</b></td><td>2384</td><td>0/1/1</td><td>_
 *</td><td>0.00</td><td>2</td><td>0</td><td>0.0</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status?auto HTTP/1.1</td></tr>
 *
 *<tr><td><b>5-0</b></td><td>2408</td><td>1/1/1</td><td><b>K</b>
 *</td><td>0.00</td><td>2</td><td>0</td><td>3.4</td><td>0.00</td><td>0.00
 *</td><td>127.0.0.1</td><td nowrap>127.0.1.1</td><td nowrap>GET /server-status HTTP/1.1</td></tr>
 *
 *</table>
 *
 */

public class ExtendedRunningProcess extends ExtendedStatus
{
	private static Logger log = Logger.getLogger(ExtendedRunningProcess.class);
	
	private String pid;
	private String requests;
	private String cpu;
	private String timeSinceLastRequest;
	private String timeToProcessLastRequest;
	private String megaBytesThisConnection;
	private String client;
	private String virtualHost;
	private String request;
	
	public ExtendedRunningProcess(String pid, String requests, String cpu, String timeSinceLastRequest, String timeToProcessLastRequest, String megaBytesThisConnection, String client, String virtualHost, String request)
	{
		this.pid=pid;
		this.requests=requests;
		this.cpu=cpu;
		this.timeSinceLastRequest=timeSinceLastRequest;
		this.timeToProcessLastRequest=timeToProcessLastRequest;
		this.megaBytesThisConnection=megaBytesThisConnection;
		this.client=client;
		this.virtualHost=virtualHost;
		this.request=request;
	}
	
	/**
	 * Queries apache for extended running process information.
	 * 
	 * @return a list of ExtendedRunningProcess objects or an array with length 1 with empty fields if Extended Status is not enabled.
	 */
	public static ExtendedRunningProcess[]  getExtendedRunningProcessInfo()
	{
		log.trace("ExtendedRunningProcess.getExtendedRunningProcessInfo called");
		if(Settings.getSetting(Constants.extendedStatus).equals("on"))
		{	
			try
			{
				String url=getExtendedStatusURL();
				log.trace("URL to scrape " + url);
			
				Document doc = Jsoup.connect(url).get();
				
				ArrayList<ExtendedRunningProcess> processes = new ArrayList<ExtendedRunningProcess>();  
				
				Elements rows=doc.select("table[border]").select("tr");
				ExtendedRunningProcess temp;
				for (Element row : rows) {
					temp=scrapeRow(row,true);
					
					if(temp!=null) {
						processes.add(temp);
					}	
				}
				
				return processes.toArray(new ExtendedRunningProcess[processes.size()]);

			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
			}
		}	
		ExtendedRunningProcess process[] = {new ExtendedRunningProcess("", "", "", "", "", "", "", "", "")};
		return process;
	}
	
	private static ExtendedRunningProcess scrapeRow(Element row, boolean numericPid)
	{
		log.trace("ExtendedRunningProcess.scrape called");
		
		String pid="";
		String requests="";
		String cpu="";
		String timeSinceLastRequest="";
		String timeToProcessLastRequest="";
		String megaBytesThisConnection="";
		String client="";
		String virtualHost="";
		String request="";
		
		Elements cols=row.select("td");
		if(cols.size()==0) {
			return null;
		}
		
		String value="";
		int iter=0;
		for(Element col : cols) {
			value=col.text();
		
			if(iter==1)
			{	
				pid=value;
				log.trace("pid " + pid);
				
				if(numericPid) {
					try { 
				        Integer.parseInt(pid); 
				    } catch(NumberFormatException e) { 
				        return null; 
				    }
				}
			}
		
			if(iter==2)
			{
				requests=value.split("/")[2];
				log.trace("requests " +requests);
			}
		
			if(!Utils.isWindows() && iter==4)
			{
				cpu=value;
				log.trace("cpu " + cpu);
			}	
		
			if(iter==(Utils.isWindows() ? 4 : 5))
			{
				timeSinceLastRequest=value;
				log.trace("timeSinceLastRequest " + timeSinceLastRequest);
			}	
		
			if(iter==(Utils.isWindows() ? 5 : 6))
			{
				timeToProcessLastRequest=value;
				log.trace("timeToProcessLastRequest " + timeToProcessLastRequest);
			}	
		
			if(iter==(Utils.isWindows() ? 8 : 9))
			{
				megaBytesThisConnection=value;
				log.trace("megaBytesThisConnection " + megaBytesThisConnection);
			}
			
		
			if(iter==(Utils.isWindows() ? 9 : 10))
			{
				client=value;
				log.trace("client " + client);
			}
		
		
			if(iter==(Utils.isWindows() ? 10 : 11))
			{
				virtualHost=value;
				log.trace("virtualHost " + virtualHost);
			}
		
			if(iter==(Utils.isWindows() ? 11 : 12))
			{
				request=value;
				request=request.trim();
				log.trace("request " + request);
			}
		
			iter++;
		}
		
		return new ExtendedRunningProcess(pid, requests, cpu, timeSinceLastRequest, timeToProcessLastRequest, megaBytesThisConnection, client, virtualHost, request);
	}
	
	public String getPid()
	{
		return pid;
	}
	
	public String getRequests()
	{
		return requests;
	}
	
	public String getCpu()
	{
		return cpu;
	}
	
	public String getTimeSinceLastRequest()
	{
		return timeSinceLastRequest;
	}
	
	public String getTimeToProcessLastRequest()
	{
		return timeToProcessLastRequest;
	}
	
	public String getMegaBytesThisConnection()
	{
		return megaBytesThisConnection;
	}
	
	public String getClient()
	{
		return client;
	}
	
	public String getVirtualHost()
	{
		return virtualHost;
	}
	
	public String getRequest()
	{
		return request;
	}
}
