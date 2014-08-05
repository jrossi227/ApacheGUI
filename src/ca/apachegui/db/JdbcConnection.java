package ca.apachegui.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.apache.log4j.Logger;

import ca.apachegui.global.Constants;

public class JdbcConnection 
{
    private static Logger log = Logger.getLogger(JdbcConnection.class);
    
    private static DataSource dataSource;
    
    public void setDataSource(DataSource dataSourceIn) {
		dataSource = dataSourceIn;
	}
    
    protected static Connection connect() throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException 
    {	
    	return dataSource.getConnection();
    }
    
    protected static void disconnect(Connection conn) 
    {	
    	try 
    	{
    		if (conn != null){ 
    			conn.close();
            	conn = null;
			} 
    	}
    	catch (SQLException e) {}
    }
    
    protected static void closeResultSet(ResultSet res)
    {
    	try 
    	{
    		if (res != null){ 
    			res.close();
            	res = null;
			} 
    	}
    	catch (SQLException e) {}
    }
    
    protected static void closeStatement(Statement st)
    {
    	try 
    	{
    		if (st != null){ 
    			st.close();
    			st = null;
			} 
    	}
    	catch (SQLException e) {}
    }
    
    /**
     * Clears the ApacheGUI database and sets the username and password back to default values.
     * 
     * @throws SQLException
     * @throws IllegalAccessException
     * @throws InstantiationException
     * @throws ClassNotFoundException
     */
    public static void clearDatabase() throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException
    {
    	//need to fill in with deletions for all of the tables
    	log.info("Clearing database");
		Connection conn=null;
		Statement st=null;
		try
		{
			conn=connect();
			st=conn.createStatement();
			
			String update;
			for(int i=0; i<Constants.tableNames.length;i++)
			{	
				update="TRUNCATE TABLE " + Constants.tableNames[i];
				st.executeUpdate(update);
			}
			Users.setUsername(Constants.defaultUsername);
			Users.setPassword(Constants.defaultPassword);
		}
		finally
		{
			closeStatement(st);
			disconnect(conn);
		}
		
    }
    
}
