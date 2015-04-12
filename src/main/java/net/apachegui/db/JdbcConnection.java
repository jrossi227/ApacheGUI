package net.apachegui.db;

import java.sql.SQLException;

import javax.sql.DataSource;

import net.apachegui.global.Constants;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

public class JdbcConnection {
    private static Logger log = Logger.getLogger(JdbcConnection.class);

    private JdbcTemplate guiJdbcTemplate;
    private JdbcTemplate historyJdbcTemplate;
    private static JdbcConnection jdbcConnection;

    public JdbcConnection() {
        jdbcConnection = this;
    }

    public void setGuiDataSource(DataSource dataSourceIn) {
        guiJdbcTemplate = new JdbcTemplate(dataSourceIn);
    }

    public void setHistoryDataSource(DataSource dataSourceIn) {
        historyJdbcTemplate = new JdbcTemplate(dataSourceIn);
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
    public void clearAllDatabases() {

        log.info("Clearing GUI database");
        String update = "DELETE FROM SETTINGS";
        guiJdbcTemplate.update(update);
        update = "VACUUM";
        guiJdbcTemplate.update(update);

        log.info("Clearing History database");
        update = "DELETE FROM LOGDATA";
        historyJdbcTemplate.update(update);
        update = "VACUUM";
        historyJdbcTemplate.update(update);

        UsersDao.getInstance().setUsername(Constants.defaultUsername);
        UsersDao.getInstance().setPassword(Constants.defaultPassword);

    }

}
