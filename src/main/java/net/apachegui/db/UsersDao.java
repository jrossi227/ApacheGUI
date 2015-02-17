package net.apachegui.db;

import javax.sql.DataSource;

import net.apachegui.global.Constants;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

public class UsersDao extends JdbcConnection {
    private static Logger log = Logger.getLogger(UsersDao.class);

    private JdbcTemplate jdbcTemplate;
    private static UsersDao usersDao;

    public void setDataSource(DataSource dataSourceIn) {
        jdbcTemplate = new JdbcTemplate(dataSourceIn);
        usersDao = this;
    }

    public static UsersDao getInstance() {
        return usersDao;
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

        String query = "SELECT USER_NAME FROM " + Constants.usersTable;
        String username = this.jdbcTemplate.queryForObject(query, String.class);

        return username;
    }

    /**
     * 
     * @return a String with the current password.
     */
    public String getPassword() {
        log.trace("Users.getPassword called");

        String query = "SELECT USER_PASS FROM " + Constants.usersTable;
        String password = this.jdbcTemplate.queryForObject(query, String.class);

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

        String update = "UPDATE " + Constants.usersTable + " SET USER_NAME='" + newUsername + "' WHERE USER_NAME='" + currentUsername + "'";
        log.trace("Executing update " + update);
        this.jdbcTemplate.update(update);

        update = "UPDATE " + Constants.rolesTable + " SET USER_NAME='" + newUsername + "' WHERE USER_NAME='" + currentUsername + "'";
        log.trace("Executing update " + update);
        this.jdbcTemplate.update(update);
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

        String update = "UPDATE " + Constants.usersTable + " SET USER_PASS='" + newPassword + "' WHERE USER_NAME='" + currentUsername + "'";
        log.trace("Executing update " + update);
        this.jdbcTemplate.update(update);
    }
}
