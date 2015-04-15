package net.apachegui.db;

import java.sql.*;

import apache.conf.parser.File;
import net.apachegui.global.Constants;

import net.apachegui.global.Utilities;
import org.apache.log4j.Logger;

public class JdbcConnection {
    private static Logger log = Logger.getLogger(JdbcConnection.class);

    private static JdbcConnection instance = null;

    public static JdbcConnection getInstance() {

        synchronized (JdbcConnection.class) {
            if(instance == null) {
                synchronized (JdbcConnection.class) {
                    instance = new JdbcConnection();
                }
            }
        }

        return instance;
    }

    protected JdbcConnection() {

    }

    private String getDatabaseDirectory() {
        return new File(Utilities.getTomcatInstallDirectory(),"db").getAbsolutePath();
    }

    private Connection getConnection(String dbName) {
        Connection connection = null;
        try {
            Class.forName("org.sqlite.JDBC");
            connection = DriverManager.getConnection("jdbc:sqlite:/" + new File(getDatabaseDirectory(),dbName).getAbsolutePath());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        return connection;
    }

    protected Connection getLogDataConnection() {
        return getConnection(Constants.logDataDatabaseFile);
    }

    protected Connection getGuiConnection() {
        return getConnection(Constants.guiDatabaseFile);
    }

    public void closeResultSet(ResultSet resultSet) {
        try {
            if(resultSet != null && !resultSet.isClosed()) {
                resultSet.close();
            }
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
        }
    }

    public void closeStatement(Statement statement) {

        try {
            if(statement != null && !statement.isClosed()) {
                statement.close();
            }
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
        }

    }

    public void closeConnection(Connection connection) {
        try {
            if(connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
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
    public void clearAllDatabases() {

        Connection guiConnection = null;
        Statement guiStatement = null;

        Connection logDataConnection = null;
        Statement logDataStatement = null;
        try {
            log.info("Clearing GUI database");
            guiConnection = getGuiConnection();

            guiStatement = guiConnection.createStatement();
            String update = "DELETE FROM SETTINGS";
            guiStatement.executeUpdate(update);

            update = "VACUUM";
            guiStatement.executeUpdate(update);

            closeStatement(guiStatement);
            closeConnection(guiConnection);

            log.info("Clearing History database");

            logDataConnection = getLogDataConnection();

            logDataStatement = logDataConnection.createStatement();
            update = "DELETE FROM LOGDATA";
            logDataStatement.executeUpdate(update);

            update = "VACUUM";
            logDataStatement.executeUpdate(update);

            closeStatement(logDataStatement);
            closeConnection(logDataConnection);

            UsersDao.getInstance().setUsername(Constants.defaultUsername);
            UsersDao.getInstance().setPassword(Constants.defaultPassword);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            closeStatement(guiStatement);
            closeConnection(guiConnection);

            closeStatement(logDataStatement);
            closeConnection(logDataConnection);
        }

    }

}
