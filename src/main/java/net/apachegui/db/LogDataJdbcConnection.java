package net.apachegui.db;


import java.sql.Connection;

public class LogDataJdbcConnection extends JdbcConnection{

    public Connection getConnection() {
        return this.getLogDataConnection();
    }

}
