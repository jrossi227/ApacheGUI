package ca.apachegui.conf;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.util.ArrayList;

import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Parser;
import apache.conf.parser.File;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;
import ca.apachegui.modules.SharedModuleHandler;
import ca.apachegui.modules.StaticModuleHandler;

/**
 * Class used to add Mime types to apache configuration. Mimes can take the following format:
 * 
 * Server Mimes:
 * MIME-type extension [extension] ...
 * eg. application/pgp-signature	asc sig
 * 
 **/

public class ServerMime extends Mime {
	
	public ServerMime(String type, String[] extensions) {
		super(type,extensions);
	}
	
	/**
	 * Gets the file that is currently being used for server MIME types.
	 * 
	 * @return - the filesystem path of the server MIME file.
	 * @throws Exception
	 */
	public static String getServerMimeFile() throws Exception 
	{
		String typesConfig[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.typesConfigDirective);
		
		if(typesConfig.length > 0) 
		{
			if((!Utils.isWindows() && typesConfig[0].startsWith("/")) || (Utils.isWindows() && typesConfig[0].contains(":"))) {
				return typesConfig[0];
			} else {
				return new File(SettingsDao.getInstance().getSetting(Constants.serverRoot), typesConfig[0]).getAbsolutePath();
			}
		}
		else
		{
			return new File(SettingsDao.getInstance().getSetting(Constants.confDirectory), "mime.types").getAbsolutePath();
		}
	}
	
	/**
	 * Parses the server MIME file for all MIME types.
	 * 
	 * @return - an array with all of the configured server MIME types.
	 * @throws Exception
	 */
	public static ServerMime[] getAll() throws FileNotFoundException, Exception 
	{		
		FileInputStream fstream = new FileInputStream(ServerMime.getServerMimeFile());
		DataInputStream in = new DataInputStream(fstream);
		BufferedReader br = new BufferedReader(new InputStreamReader(in,"UTF-8"));
		
		ArrayList <ServerMime>mimes = new ArrayList<ServerMime>();
		
		String strLine;
		String parts[];
		String type;
		String extensions[];
		while ((strLine = br.readLine()) != null)   
		{
			strLine=Utils.sanitizeLineSpaces(strLine);
			
			if(!Parser.isCommentMatch(strLine) && !strLine.equals("")) 
			{
				parts=strLine.split(" ");
				
				type = parts[0];
				
				extensions = new String[parts.length -1];
				for(int i=1; i<parts.length; i++ )
				{
					extensions[i-1]=parts[i];
				}
				
				mimes.add(new ServerMime(type,extensions));
			}
		}
		in.close();
		
		return mimes.toArray(new ServerMime[mimes.size()]);
	}
}
