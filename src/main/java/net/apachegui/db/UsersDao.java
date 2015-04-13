package net.apachegui.db;

import javax.sql.DataSource;

import net.apachegui.global.Constants;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class UsersDao {
    private static Logger log = Logger.getLogger(UsersDao.class);

    private static UsersDao instance = null;

    public static UsersDao getInstance() {

        synchronized (UsersDao.class) {
            if(instance == null) {
                synchronized (UsersDao.class) {
                    instance = new UsersDao();
                }
            }
        }

        return instance;
    }
    /**
     * Checks to see whether the default username and password are being used.
     * 
     * @return a boolean indicating whether the default username and password are being used
     */
    public boolean getLoginAdvisory() {
        log.trace("Users.getLoginAdvisory called");
        String username = getUsername();
        log.trace("username: " + username);
        String password = getPassword();
        log.trace("password: " + password);

        if (username.equals(Constants.defaultUsername) && password.equals(Constants.defaultPassword)) {
            return true;
        }

        return false;
    }

    /**
     * 
     * @return a String with the current username;
     */
    public String getUsername() {
        log.trace("Users.getUsername called");

        GuiJdbcConnection guiJdbcConnection = new GuiJdbcConnection();
        Connection connection = null;
        Statement statement =  null;
        ResultSet resultSet = null;

        String username = "";
        try {
            connection = guiJdbcConnection.getConnection();
            statement = connection.createStatement();

            String query = "SELECT USER_NAME FROM " + Constants.usersTable;
            resultSet = statement.executeQuery(query);

            if(resultSet.next()) {
                username = resultSet.getString("USER_NAME");
            }

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            guiJdbcConnection.closeResultSet(resultSet);
            guiJdbcConnection.closeStatement(statement);
            guiJdbcConnection.closeConnection(connection);
        }

        return username;
    }

    /**
     * 
     * @return a String with the current password.
     */
    public String getPassword() {
        log.trace("Users.getPassword called");

        GuiJdbcConnection guiJdbcConnection = new GuiJdbcConnection();
        Connection connection = null;
        Statement statement =  null;
        ResultSet resultSet = null;

        String password = "";
        try {
            connection = guiJdbcConnection.getConnection();
            statement = connection.createStatement();

            String query = "SELECT USER_PASS FROM " + Constants.usersTable;
            resultSet = statement.executeQuery(query);

            if(resultSet.next()) {
                password = resultSet.getString("USER_PASS");
            }

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            guiJdbcConnection.closeResultSet(resultSet);
            guiJdbcConnection.closeStatement(statement);
            guiJdbcConnection.closeConnection(connection);
        }

        return password;
    }

    /**
     * Replaces the current username with a new one.
     * 
     * @param newUsername
     *            - The new username.
     */
    public void setUsername(String newUsername) {
        log.trace("Users.setUsername called");

        String currentUsername = getUsername();

        GuiJdbcConnection guiJdbcConnection = new GuiJdbcConnection();
        Connection connection = null;
        Statement statement =  null;

        try {
            connection = guiJdbcConnection.getConnection();
            statement = connection.createStatement();

            String update = "UPDATE " + Constants.usersTable + " SET USER_NAME='" + newUsername + "' WHERE USER_NAME='" + currentUsername + "'";
            log.trace("Executing update " + update);
            statement.executeUpdate(update);

            update = "UPDATE " + Constants.rolesTable + " SET USER_NAME='" + newUsername + "' WHERE USER_NAME='" + currentUsername + "'";
            log.trace("Executing update " + update);
            statement.executeUpdate(update);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            guiJdbcConnection.closeStatement(statement);
            guiJdbcConnection.closeConnection(connection);
        }
    }

    /**
     * Replaces the current password with a new one.
     * 
     * @param newPassword
     *            - The new password.
     */
    public void setPassword(String newPassword) {
        log.trace("Users.setPassword called");

        String currentUsername = getUsername();

        GuiJdbcConnection guiJdbcConnection = new GuiJdbcConnection();
        Connection connection = null;
        Statement statement =  null;

        try {
            connection = guiJdbcConnection.getConnection();
            statement = connection.createStatement();

            String update = "UPDATE " + Constants.usersTable + " SET USER_PASS='" + newPassword + "' WHERE USER_NAME='" + currentUsername + "'";
            log.trace("Executing update " + update);
            statement.executeUpdate(update);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            guiJdbcConnection.closeStatement(statement);
            guiJdbcConnection.closeConnection(connection);
        }
    }
}
