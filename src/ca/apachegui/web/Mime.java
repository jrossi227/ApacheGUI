package ca.apachegui.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import apache.conf.global.Utils;

import ca.apachegui.conf.AddedMime;
import ca.apachegui.conf.ServerMime;

/**
 * Servlet implementation class Mime
 */
@WebServlet("/Mime")
public class Mime extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(Mime.class);        
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Mime() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.trace("Mime.doGet called");
		
		String option=request.getParameter("option");
		if(option==null) {
			option="";
		}	
		
		log.trace("option: " + option + " Selected");
		PrintWriter out = response.getWriter();
		
		if(option.equals("serverMimes"))
		{
			try
			{
				ca.apachegui.conf.Mime mimes[] = ServerMime.getAll();
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				
				for(int i=0; i< mimes.length; i++)
				{
					out.print("{id:'" + (i+1) + "', type:'" + mimes[i].getType() + "', extensions:'");
					
					String extensions[] = mimes[i].getExtensions();
					for(int j=0; j<extensions.length; j++)
					{
						out.print(extensions[j]);
						
						if(j!=(extensions.length-1)) {
							out.print(" ");
						}
					}
					
					out.print("'}");
					if(i!=(mimes.length-1)) {
						out.print(",");
					}	
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
		
		if(option.equals("addedMimes"))
		{
			try
			{
				ca.apachegui.conf.Mime mimes[] = AddedMime.getAll();
				out.println("{");
				out.println(	"identifier: 'id', ");
				out.println(	"label: 'name', ");
				out.println(	"items: [");
				
				for(int i=0; i< mimes.length; i++)
				{
					out.print("{id:'" + (i) + "', type:'" + mimes[i].getType() + "', extensions:'");
					
					String extensions[] = mimes[i].getExtensions();
					for(int j=0; j<extensions.length; j++)
					{
						out.print(extensions[j]);
						
						if(j!=(extensions.length-1)) {
							out.print(" ");
						}
					}
					
					out.print("'}");
					if(i!=(mimes.length-1)) {
						out.print(",");
					}	
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
		log.trace("Mime.doPost called");
		
		String option=request.getParameter("option");
		if(option==null) {
			option="";
		}	
		
		log.trace("option: " + option + " Selected");
		PrintWriter out = response.getWriter();
		try
		{
			if(option.equals("addMime"))
			{
				String type=request.getParameter("type").trim();
				String extensionList=Utils.sanitizeLineSpaces(request.getParameter("extensions")).replaceAll(",","");
				
				String extensions[] = extensionList.split(" ");
				AddedMime.add(new AddedMime(type, extensions));	
			}
			
			if(option.equals("editMime"))
			{
				String type=request.getParameter("type").trim();
				String extensionList=Utils.sanitizeLineSpaces(request.getParameter("extensions")).replaceAll(",","");
				
				String extensions[] = extensionList.split(" ");
				AddedMime.edit(new AddedMime(type, extensions));	
			}
			
			if(option.equals("removeMime"))
			{
				String type=request.getParameter("type").trim();
				String extensionList=Utils.sanitizeLineSpaces(request.getParameter("extensions")).replaceAll(",","");
				
				String extensions[] = extensionList.split(" ");
				AddedMime.remove(new AddedMime(type, extensions));	
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
