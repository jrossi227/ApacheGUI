package net.apachegui.db;

import java.sql.SQLException;

import javax.sql.DataSource;

import net.apachegui.global.Constants;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

public class JdbcConnection {
    private static Logger log = Logger.getLogger(JdbcConnection.class);

    private JdbcTemplate jdbcTemplate;
    private static JdbcConnection jdbcConnection;

    public void setDataSource(DataSource dataSourceIn) {
        jdbcTemplate = new JdbcTemplate(dataSourceIn);
        jdbcConnection = this;
    }

    public static JdbcConnection getInstance() {
        return jdbcConnection;
    }

    /**
     * Clears the ApacheGUI database and sets the username and password back to default values.
     * 
     * @throws SQLException
     * @throws IllegalAccessException
     * @throws InstantiationException
     * @throws ClassNotFoundException
     */
    public void clearDatabase() {
        // need to fill in with deletions for all of the tables
        log.info("Clearing database");

        String update;
        for (int i = 0; i < Constants.tableNames.length; i++) {
            update = "DELETE FROM " + Constants.tableNames[i];
            jdbcTemplate.update(update);

            update = "VACUUM";
            jdbcTemplate.update(update);
        }
        UsersDao.getInstance().setUsername(Constants.defaultUsername);
        UsersDao.getInstance().setPassword(Constants.defaultPassword);

    }

}
