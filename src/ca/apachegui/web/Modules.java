package ca.apachegui.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import apache.conf.modules.AvailableModule;
import apache.conf.modules.SharedModule;
import apache.conf.modules.StaticModule;
import ca.apachegui.conf.Configuration;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.ModuleHandler;
import ca.apachegui.modules.SharedModuleHandler;

/**
 * Servlet implementation class Modules
 */
@WebServlet("/Modules")
public class Modules extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Modules.class);   
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Modules() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.trace("Modules.doGet called");
		
		String option=request.getParameter("option");
		if(option==null)
			option="";
		
		log.trace("option: " + option + " Selected");
		PrintWriter out = response.getWriter();
		if(option.equals(Constants.staticModulesType))
		{	
			try
			{
				StaticModule modules[]=ca.apachegui.modules.StaticModuleHandler.getStaticModules();
				Arrays.sort(modules);
				
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
		
				if(modules.length>0)
				{
					for(int i=0; i< modules.length; i++)
					{
						out.print("{id:'" + modules[i].getName() + "', name:'" + modules[i].getName() + "', type:'static'}");
						if(i!=(modules.length-1))
							out.print(",");
					}	
				}
		
				out.println("]}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				out.println("]}");
			}
		}
		if(option.equals(Constants.sharedModulesType))
		{	
			try
			{
				SharedModuleHandler.updateSharedModules();
				SharedModule modules[]=ca.apachegui.modules.SharedModuleHandler.getSharedModules();
				Arrays.sort(modules);
			
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
		
				if(modules.length>0)
				{
					for(int i=0; i< modules.length; i++)
					{
						out.print("{id:'" + modules[i].getName() + "', name:'" + modules[i].getName() + "', type:'shared', status:'Loaded'}");
						if(i!=(modules.length-1))
							out.print(",");
					}	
				}
		
				out.println("]}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				out.println("]}");
			}
		}
		if(option.equals(Constants.availableModulesType))
		{	
			try
			{
				SharedModuleHandler.updateSharedModules();
				AvailableModule modules[]=ca.apachegui.modules.AvailableModuleHandler.getAvailableModules();
				Arrays.sort(modules);
			
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
		
				if(modules.length>0)
				{
					for(int i=0; i< modules.length; i++)
					{
						out.print("{id:'" + modules[i].getName() + "', name:'" + modules[i].getName() + "', filename:'" + modules[i].getFilename() + "', status:'available'}");
						if(i!=(modules.length-1))
							out.print(",");
					}	
				}
		
				out.println("]}");
			}
			catch(Exception e)
			{
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.trace("Modules.doPost called");
		
		String option=request.getParameter("option");
		if(option==null)
			option="";
		
		log.trace("option: " + option + " Selected");
		
		PrintWriter out=response.getWriter();
		if(option.equals("removeSharedModules"))
		{
			try
			{
				String modules[]=request.getParameter("sharedModules").split(":");
				ArrayList <String>removedModules=new ArrayList<String>();
				for(int i=0; i<modules.length; i++)
				{
					log.trace("Searching For module " + modules[i]);
					
					boolean removed=SharedModuleHandler.removeModule(modules[i]);
					
					if(removed) {
						removedModules.add(ModuleHandler.getModuleConfigString(modules[i]));
					}
				}
				
				log.trace("Checking the server configuration");
				String status=Configuration.testServerConfiguration();
				if(!status.matches(".*(?i:syntax ok).*"))
				{	
					StringBuffer loadModules=new StringBuffer();
					loadModules.append("<br/>To revert uncomment the following directives:<br/>");
					for(int i=0; i<removedModules.size(); i++)
					{
						loadModules.append("<span style=\"font-weight:bold;\">" + removedModules.get(i) + "</span><br/>");
					}
					throw new Exception("There is an error with the configuration, the changes were reverted: " + status  + loadModules.toString());
				}	
				
				SharedModuleHandler.updateSharedModules();
			}
			catch(Exception e)
			{
			    StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print(e.getMessage()); 
			}
		}
		if(option.equals("getLoadDirective"))
		{
			try
			{
				String name=request.getParameter("name");
				String directive=ModuleHandler.getModuleConfigString(name);
				out.print(directive);
			}
			catch(Exception e)
			{
			    StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				log.error(sw.toString());
				response.setStatus(206);
				out.print(e.getMessage()); 
			}
		}
	}

}
