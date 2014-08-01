package ca.apachegui.db;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;

import org.apache.log4j.Logger;

import ca.apachegui.global.Constants;

public class Settings extends JdbcConnection
{
	private static Logger log = Logger.getLogger(Settings.class);
	
	/**
	 * @param the name of the setting
	 * @return value if found or null if not found
	 * @throws SQLException
	 * @throws ClassNotFoundException 
	 * @throws InstantiationException 
	 * @throws IllegalAccessException 
	 * **/
	public static String getSetting(String name)
	{
		log.trace("Getting setting " + name);
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		String value=null;
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT VALUE FROM " + Constants.settingsTable + " WHERE NAME='" + name + "'";
			res=st.executeQuery(query);
			
			if(res.next())
			{
				value=res.getString("VALUE");
				log.trace("Setting value " + value);
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
			log.trace("Setting not found in the table");
		
		return value;
	}
	
	/**
	 * Sets a setting in the database. If the setting already
	 * exists then it will be overwritten.
	 * @param name the name of the setting
	 * @param value the value of the setting
	 * @throws SQLException
	 * @throws ClassNotFoundException 
	 * @throws InstantiationException 
	 * @throws IllegalAccessException 
	 * **/
	public static void setSetting(String name, String value)
	{
		log.trace("Setting setting " + name + " value " + value);
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		String update="";
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT VALUE FROM " + Constants.settingsTable + " WHERE NAME='" + name + "'";
			res=st.executeQuery(query);
			
			if(res.next())
			{
				update="UPDATE " + Constants.settingsTable + " SET VALUE='" + value + "' WHERE NAME='" + name +"'";
			}
			else
			{
				update="INSERT INTO " + Constants.settingsTable + "(NAME,VALUE) VALUES ('" + name + "','" + value +"')";
			}
			st.executeUpdate(update);
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
	}
	
	/**
	 * Get a Map of all current Settings
	 * 
	 * @return a HashMap with a name value pairs.
	 */
	public static HashMap<String, String> getAllSettings()
	{
		log.trace("Getting all Settings");
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		
		HashMap<String,String> values = new HashMap<String,String>();
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT NAME,VALUE FROM " + Constants.settingsTable;
			res=st.executeQuery(query);
			String name,value;
			while(res.next())
			{
				name=res.getString("NAME");
				value=res.getString("VALUE");
				log.trace("name: " + name);
				log.trace("value: " + value);
				values.put(name, value);
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
		return values;
	}
}
