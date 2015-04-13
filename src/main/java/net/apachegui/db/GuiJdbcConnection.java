package net.apachegui.db;

import java.sql.Connection;

public class GuiJdbcConnection extends JdbcConnection{

    public Connection getConnection() {
        return this.getGuiConnection();
    }
}
