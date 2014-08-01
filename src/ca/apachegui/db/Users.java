package ca.apachegui.db;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import org.apache.log4j.Logger;
import ca.apachegui.global.Constants;

public class Users extends JdbcConnection 
{
	private static Logger log = Logger.getLogger(Users.class);
	
	/**
	 * Checks to see whether the default username and password are being used.
	 * 
	 * @return a boolean indicating whether the default username and password are being used
	 */
	public static boolean getLoginAdvisory()
	{
		log.trace("Users.getLoginAdvisory called");
		String username=getUsername();
		log.trace("username: " + username);
		String password=getPassword();
		log.trace("password: " + password);
		
		if(username.equals(Constants.defaultUsername) && password.equals(Constants.defaultPassword))
		{
			return true;
		}
		
		return false;
	}
	
	/**
	 * 
	 * @return a String with the current username;
	 */
	public static String getUsername()
	{
		log.trace("Users.getUsername called");
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		String username=null;
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT USER_NAME FROM " + Constants.usersTable;
			res=st.executeQuery(query);
			
			if(res.next())
			{
				username=res.getString("USER_NAME");
				log.trace("Returning username " + username);
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
		
		return username;
	}
	
	/**
	 * 
	 * @return a String with the current password.
	 */
	public static String getPassword()
	{
		log.trace("Users.getPassword called");
		Connection conn=null;
		Statement st=null;
		ResultSet res=null;
		String password=null;
		try
		{
			conn=connect();
			st=conn.createStatement();
			String query="SELECT USER_PASS FROM " + Constants.usersTable;
			res=st.executeQuery(query);
			
			if(res.next())
			{
				password=res.getString("USER_PASS");
				log.trace("Returning password " + password);
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
		
		return password;
	}
	
	/**
	 * Replaces the current username with a new one.
	 * @param newUsername - The new username.
	 */
	public static void setUsername(String newUsername)
	{
		log.trace("Users.setUsername called");
		Connection conn=null;
		Statement st=null;
		String currentUsername=getUsername();
		try
		{
			conn=connect();
			st=conn.createStatement();
			String update="UPDATE " + Constants.usersTable + " SET USER_NAME='" + newUsername + "' WHERE USER_NAME='" + currentUsername + "'";
			log.trace("Executing update " + update);
			st.executeUpdate(update);
			update="UPDATE " + Constants.rolesTable + " SET USER_NAME='" + newUsername + "' WHERE USER_NAME='" + currentUsername + "'";
			log.trace("Executing update " + update);
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
			closeStatement(st);
			disconnect(conn);
		}
	}
	
	/**
	 * Replaces the current password with a new one.
	 * 
	 * @param newPassword - The new password.
	 */
	public static void setPassword(String newPassword)
	{
		log.trace("Users.setPassword called");
		Connection conn=null;
		Statement st=null;
		String currentUsername=getUsername();
		try
		{
			conn=connect();
			st=conn.createStatement();
			String update="UPDATE " + Constants.usersTable + " SET USER_PASS='" + newPassword + "' WHERE USER_NAME='" + currentUsername + "'";
			log.trace("Executing update " + update);
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
			closeStatement(st);
			disconnect(conn);
		}
	}
}
