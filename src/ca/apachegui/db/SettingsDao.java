package ca.apachegui.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import ca.apachegui.global.Constants;

public class SettingsDao extends JdbcConnection {
    private static Logger log = Logger.getLogger(SettingsDao.class);

    private JdbcTemplate jdbcTemplate;
    private static SettingsDao settingsDao;

    public void setDataSource(DataSource dataSourceIn) {
        jdbcTemplate = new JdbcTemplate(dataSourceIn);
        settingsDao = this;
    }

    public static SettingsDao getInstance() {
        return settingsDao;
    }

    /**
     * @param the
     *            name of the setting
     * @return value if found or null if not found
     * @throws SQLException
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * **/
    public String getSetting(String name) {
        log.trace("Getting setting " + name);

        String query = "SELECT VALUE FROM " + Constants.settingsTable + " WHERE NAME='" + name + "'";
        List<String> values = this.jdbcTemplate.queryForList(query, String.class);

        String value = null;
        if (!values.isEmpty()) {
            value = values.get(0);
        }

        if (value == null) {
            log.trace("Setting not found in the table");
        } else {
            log.trace("Setting value " + value);
        }

        return value;
    }

    /**
     * Sets a setting in the database. If the setting already exists then it will be overwritten.
     * 
     * @param name
     *            the name of the setting
     * @param value
     *            the value of the setting
     * @throws SQLException
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * **/
    public void setSetting(String name, String value) {
        log.trace("Setting setting " + name + " value " + value);

        String query = "SELECT VALUE FROM " + Constants.settingsTable + " WHERE NAME='" + name + "'";
        List<String> values = this.jdbcTemplate.queryForList(query, String.class);

        String update = "";
        if (!values.isEmpty()) {
            update = "UPDATE " + Constants.settingsTable + " SET VALUE='" + value + "' WHERE NAME='" + name + "'";
        } else {
            update = "INSERT INTO " + Constants.settingsTable + "(NAME,VALUE) VALUES ('" + name + "','" + value + "')";
        }

        this.jdbcTemplate.update(update);
    }

    /**
     * Get a Map of all current Settings
     * 
     * @return a HashMap with a name value pairs.
     */
    public HashMap<String, String> getAllSettings() {
        log.trace("Getting all Settings");

        HashMap<String, String> values = new HashMap<String, String>();

        String query = "SELECT NAME,VALUE FROM " + Constants.settingsTable;
        List<Setting> settings = this.jdbcTemplate.query(query, new RowMapper<Setting>() {
            public Setting mapRow(ResultSet res, int rowNum) throws SQLException {

                String name = res.getString("NAME");
                String value = res.getString("VALUE");

                return new Setting(name, value);
            }
        });

        for (Setting setting : settings) {
            values.put(setting.name, setting.value);
        }

        return values;
    }

    private class Setting {
        private String name;
        private String value;

        public Setting(String name, String value) {
            this.name = name;
            this.value = value;
        }
    }
}
