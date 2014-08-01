package ca.apachegui.docs;

import java.util.ArrayList;
import java.util.Arrays;

import org.apache.log4j.Logger;

import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;
import apache.conf.parser.File;
import ca.apachegui.db.Settings;
import ca.apachegui.global.Constants;
import ca.apachegui.global.Utilities;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

public class DocFiles 
{
	private static Logger log = Logger.getLogger(DocFiles.class);
	
	private static String[] savedDirectories = null;
	
	/**
	 * Get all Directories defined by the apache Directory and DocumentRoot directive. 
	 * The directory will be excluded if the directory is equal to / or the directory only allows access on local host.
	 * 
	 * @return an Array with the path of all Directories defined by the apache Directory and DocumentRoot directive. 
	 * The directory will be excluded if the directory is equal to / or the directory only allows access on local host.
	 * @throws Exception 
	 */
	public static String[] getDirectories() throws Exception 
	{
		
		log.trace("DocFiles.getDirectories called Getting all directory enclosures");
	  	
		String serverRoot=ca.apachegui.db.Settings.getSetting(Constants.serverRoot);
		
		Enclosure directories[] = new EnclosureParser(Settings.getSetting(Constants.confFile), Settings.getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getEnclosure(Constants.directoryDirectiveString);
	  	
		ArrayList<String> docFiles=new ArrayList<String>();
	  
	  	for(int i=0; i<directories.length; i++)
	  	{
	  		//if(log.isTraceEnabled())
	  		log.trace("docFile " + directories[i].getValue());
	  		
	  		log.trace("Checking if the directories value " + directories[i].getValue() + " is not / and that the directory exists");	
	  		if(!directories[i].getValue().trim().equals("/") && (new File(directories[i].getValue()).exists()))
	  		{	
	  			docFiles.add(new File(directories[i].getValue()).getAbsolutePath());	
	  		}
	  		else
	  		{
	  			log.trace("Check did not pass");
	  		}
	  	}	
	  	
	  	//get DocumentRoot(s) here
	  	String documentRoot[] = new DirectiveParser(Settings.getSetting(Constants.confFile), Settings.getSetting(Constants.serverRoot), StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.documentRootString);
	  	
	  	for(int i=0; i<documentRoot.length; i++ ) {
	  		
	  		if((!Utils.isWindows() && documentRoot[i].startsWith("/")) || (Utils.isWindows() && documentRoot[i].contains(":"))) {
	  			if(new File(documentRoot[i]).exists()) {
	  				docFiles.add(new File(documentRoot[i]).getAbsolutePath());
	  			}
	  		} else {
	  			if(new File(serverRoot,documentRoot[i]).exists()) {
	  				docFiles.add(new File(serverRoot,documentRoot[i]).getAbsolutePath());
	  			}
	  		}
	  	}
	  	
	  	Utils.removeDuplicates(docFiles);
	  	
	  	savedDirectories = docFiles.toArray(new String[docFiles.size()]);
	  	
	  	return savedDirectories;
	}
	
	private static String[] getSavedDirectories() throws Exception {
		if(savedDirectories == null) {
			getDirectories();
		}
		
		return savedDirectories;
	}
	
	/**
	 * Used for Menu to get a nodes JSON.
	 * 
	 * @param path - the path of the target doc files.
	 * @return the json with the file information of the target path
	 * @throws Exception 
	 */
	public static String getNodeJson(String path) throws Exception 
	{
		File targetDirectory=new File(path);
		File docDirectory=new File(( Utils.isWindows() ? Utilities.getFileSystemDrive() : "/"));
		
		String documentDirectories[] = null;
		if(targetDirectory.equals(docDirectory)) {
			log.trace("refreshing directories");
			documentDirectories=getDirectories();
		} else {
			log.trace("loading saved directories");
			documentDirectories=getSavedDirectories();
		}
		
		StringBuffer result= new StringBuffer();
		result.append("{ id: '" + Constants.DocumentsRoot + targetDirectory.getAbsolutePath() + "', name:'" + (targetDirectory.equals(docDirectory) ? "Documents" : targetDirectory.getName()) + "', type:'Documents', children:[");
		
		java.io.File[] children=targetDirectory.listFiles();
		Arrays.sort(children);
		
		File child;
		for(int i=0; i<children.length; i++)
		{
			child=new File(children[i]);
			if(child.isDirectory())
			{
				ArrayList <String>usedChildren=new ArrayList<String>();
				for(int j=0; j<documentDirectories.length; j++)
				{	  
					if((Utils.isSubDirectory(new File(child.getAbsolutePath()), new File(documentDirectories[j])) || Utils.isSubDirectory(new File(documentDirectories[j]),new File(child.getAbsolutePath()))) && (!usedChildren.contains(child.getAbsolutePath())))
				    {    
						result.append("{ $ref: '" + Constants.DocumentsRoot + child.getAbsolutePath() + "', id:'" + Constants.DocumentsRoot +  child.getAbsolutePath() + "', type:'Documents', name: '" + child.getName() + "', children: true},");
						usedChildren.add(child.getAbsolutePath());
				    }	 
				}
			}
		}
		for(int i=0; i<children.length; i++)
		{
			child=new File(children[i]);
			if(!child.isDirectory())
			{
				ArrayList <String>usedChildren=new ArrayList<String>();
				for(int j=0; j<documentDirectories.length; j++)
				{	  
					if((documentDirectories[j].startsWith(child.getAbsolutePath()) || child.getAbsolutePath().startsWith(documentDirectories[j])) && (!usedChildren.contains(child.getAbsolutePath()))) {
					    result.append("{ $ref: '" + Constants.DocumentsRoot +  child.getAbsolutePath() + "', id:'" + Constants.DocumentsRoot +  child.getAbsolutePath() + "', type:'Documents', name: '" + child.getName() + "'},");
					    usedChildren.add(child.getAbsolutePath());
					}
				}
			 }
		}
		   
		if(result.charAt(result.length()-1)==',') {
		    result.deleteCharAt(result.length()-1);
		}    
		
		result.append("]}");   
		return result.toString();
	}
}
