package ca.apachegui.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

import ca.apachegui.global.Constants;

public class JdbcConnection 
{
    private static String driver = "org.apache.derby.jdbc.EmbeddedDriver";
    private static String protocol = "jdbc:derby:";
    private static boolean loaded=false;
    private static Logger log = Logger.getLogger(JdbcConnection.class);
    
    protected static void loadDriver() throws IllegalAccessException, InstantiationException, ClassNotFoundException
    {
    	Class.forName(driver).newInstance();
    }
    
    protected static Connection connect() throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException 
    {	
    	if(!loaded)
    	{	
    		loadDriver();
    		loaded =true;
    	}
    	
    	Connection conn = DriverManager.getConnection(protocol + Constants.dbName, null);
    	return conn;
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
    
    //shuts down the database
    protected static void shutdown()
    {	
    	try
    	{
    		// the shutdown=true attribute shuts down Derby
    		DriverManager.getConnection("jdbc:derby:;shutdown=true");

    		// To shut down a specific database only, but keep the
    		// engine running (for example for connecting to other
    		// databases), specify a database in the connection URL:
    		//DriverManager.getConnection("jdbc:derby:" + dbName + ";shutdown=true");
    	}
    	catch (SQLException se)
    	{
    		if (( (se.getErrorCode() == 50000) && ("XJ015".equals(se.getSQLState()) ))) {
    			// we got the expected exception
    			System.out.println("Derby shut down normally");
    			// Note that for single database shutdown, the expected
    			// SQL state is "08006", and the error code is 45000.
    		} 
    		else {
                // if the error code or SQLState is different, we have
                // an unexpected exception (shutdown failed)
    			System.err.println("Derby did not shut down normally");
    		}
    	}
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
