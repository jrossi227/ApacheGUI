package ca.apachegui.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import ca.apachegui.directives.Group;
import ca.apachegui.directives.KeepAlive;
import ca.apachegui.directives.KeepAliveTimeout;
import ca.apachegui.directives.Listen;
import ca.apachegui.directives.ListenBackLog;
import ca.apachegui.directives.MaxKeepAliveRequests;
import ca.apachegui.directives.NameVirtualHost;
import ca.apachegui.directives.ServerSignature;
import ca.apachegui.directives.ServerTokens;
import ca.apachegui.directives.Timeout;
import ca.apachegui.directives.User;

/**
 * Servlet implementation class Networking
 */
@WebServlet("/Networking")
public class Networking extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Networking.class);     
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Networking() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.trace("Networking.doGet called");
		
		String option=request.getParameter("option");
		if(option==null) {
			option="";
		}	
		
		log.trace("option: " + option + " Selected");
		PrintWriter out = response.getWriter();
		if(option.equals("listening"))
		{	
			try
			{
				Listen listeners[] = Listen.getAllListening();
				
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				
				for(int i=0; i< listeners.length; i++)
				{
					out.print("{id:'" + (i) + "', ip:'" + (listeners[i].getIp().equals("") ? "All" : listeners[i].getIp()) + 
							  "', port:'" + listeners[i].getPort() + "', protocol:'" + (listeners[i].getProtocol().equals("") ? "All" : listeners[i].getProtocol()) + "'}");
					if(i!=(listeners.length-1))
						out.print(",");
				}	
				
				out.println("]}");
			}
			catch(Exception e)
			{
				log.error(e.getMessage(), e);
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				out.println("]}");
			}
		}
		
		if(option.equals("nameVirtualHost"))
		{	
			try
			{
				NameVirtualHost nameVirtualHosts[] = NameVirtualHost.getAllNameVirtualHosts();
				
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				
				for(int i=0; i< nameVirtualHosts.length; i++)
				{
					out.print("{id:'" + (i) + "', address:'" + nameVirtualHosts[i].getAddress() + "', port:'" + (nameVirtualHosts[i].getPort().equals("") ? "All" : nameVirtualHosts[i].getPort() ) + "'}");
					if(i!=(nameVirtualHosts.length-1))
						out.print(",");
				}	
				
				out.println("]}");
			}
			catch(Exception e)
			{
				log.error(e.getMessage(), e);
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				out.println("]}");
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.trace("Networking.doPost called");
		
		String option=request.getParameter("option");
		if(option==null) {
			option="";
		}	
		
		log.trace("option: " + option + " Selected");
		PrintWriter out = response.getWriter();
		try
		{
			if(option.equals("addListen"))
			{	
				String ip=request.getParameter("ip");
				int port=Integer.parseInt(request.getParameter("port"));
				String protocol=request.getParameter("protocol");
			
				Listen listen=new Listen(ip, port, protocol);
				
				//Add to file here 
				listen.addBeforeOrAfterFirstFoundToConfiguration(false);
			}
			
			if(option.equals("deleteListen"))
			{	
				String ip=request.getParameter("ip").equals("All") ? "" : request.getParameter("ip");
				int port=Integer.parseInt(request.getParameter("port"));
				String protocol=request.getParameter("protocol").equals("All") ? "" : request.getParameter("protocol");
			
				Listen listen=new Listen(ip, port, protocol);
				
				//Add to file here 
				listen.removeFromConfiguration();
			}
			
			if(option.equals("addNameVirtualHost"))
			{	
				String address=request.getParameter("address");
				String port=request.getParameter("port");
			
				NameVirtualHost nameVirtualHost=new NameVirtualHost(address, port);
				
				//Add to file here 
				nameVirtualHost.addBeforeOrAfterFirstFoundToConfiguration(true);
				
			}
			
			if(option.equals("deleteNameVirtualHost"))
			{	
				String address=request.getParameter("address");
				String port=request.getParameter("port").equals("All") ? "" : request.getParameter("port");
			
				NameVirtualHost nameVirtualHost=new NameVirtualHost(address, port);
				
				nameVirtualHost.removeFromConfiguration();
			}
			
			if(option.equals("modifyKeepAliveStatus"))
			{
				String status=request.getParameter("status");
				
				new KeepAlive(status.equals("on") ? true : false).saveToConfiguration();
			}
			
			if(option.equals("modifyKeepAliveTimeout"))
			{
				int seconds=Integer.parseInt(request.getParameter("seconds"));
				
				new KeepAliveTimeout(seconds).saveToConfiguration();
			}
			
			if(option.equals("modifyMaxKeepAliveRequests"))
			{
				int numberOfRequests=Integer.parseInt(request.getParameter("numberOfRequests"));
								
				new MaxKeepAliveRequests(numberOfRequests).saveToConfiguration();
			}
			
			if(option.equals("modifyRequestTimeout"))
			{
				int seconds=Integer.parseInt(request.getParameter("seconds"));
				
				new Timeout(seconds).saveToConfiguration();
			}
			
			if(option.equals("modifyListenBackLog"))
			{
				int backLogLength=Integer.parseInt(request.getParameter("backLogLength"));
				
				new ListenBackLog(backLogLength).saveToConfiguration();
			}
			
			if(option.equals("modifyServerTokens"))
			{
				String serverTokens=request.getParameter("serverTokens");
				
				new ServerTokens(serverTokens).saveToConfiguration();
			}
			
			if(option.equals("modifyServerSignature"))
			{
				String serverSignature=request.getParameter("serverSignature");
				
				new ServerSignature(serverSignature).saveToConfiguration();
			}
			
			if(option.equals("modifyUser"))
			{
				String user=request.getParameter("user");
				
				new User(user).saveToConfiguration();
			}
			
			if(option.equals("modifyGroup"))
			{
				String group=request.getParameter("group");
				
				new Group(group).saveToConfiguration();
			}
			
		}
		catch(Exception e)
		{
			log.error(e.getMessage(), e);
			response.setStatus(206);
			out.print(e.getMessage());
		}
		out.flush();
	}

}
