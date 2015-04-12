package net.apachegui.db;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Timestamp extends java.sql.Timestamp {

    public Timestamp(long time) throws Exception {
        super(time);

        // make sure were using milliseconds
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(time);
        int year = cal.get(Calendar.YEAR);
        if(year < 2015) {
            throw new Exception("Input time is out of range. Did you forget to convert to milliseconds?");
        }
    }

    public Timestamp(java.sql.Timestamp timestamp) {
        super(timestamp.getTime());
    }

    //SQLite uses seconds instead of milliseconds
    @Override
    public long getTime() {
        return super.getTime() / 1000;
    }

    @Override
    public String toString() {
        Date date = new Date(super.getTime());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        return sdf.format(date);
    }

}
