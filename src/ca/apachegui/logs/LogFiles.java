package ca.apachegui.logs;

import apache.conf.global.Utils;
import apache.conf.parser.File;

import java.io.IOException;
import java.util.Arrays;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;

public class LogFiles {
    /**
     * Gets all files in the log directory. This method does not return directories.
     * 
     * @return an array with the absolute paths of all log files.
     * @throws IOException
     */
    public static String[] getLogFileList() throws IOException {
        String logDirectory = SettingsDao.getInstance().getSetting(Constants.logDirectory);

        return Utils.getFileList(new File(logDirectory));
    }

    /**
     * Used for Menu to get a nodes JSON.
     * 
     * @param path
     *            - the path of the target log files. The path is relative to the root log file directory.
     * @return the json with the file information of the target path
     */
    public static String getNodeJson(String path) {

        File targetDirectory = new File(path);
        File logDirectory = new File(SettingsDao.getInstance().getSetting(Constants.logDirectory));

        StringBuffer result = new StringBuffer();
        result.append("{ id: '" + Constants.LogsRoot + targetDirectory.getAbsolutePath() + "', name:'" + (targetDirectory.equals(logDirectory) ? "Logs" : targetDirectory.getName())
                + "', type:'Logs', children:[");

        java.io.File[] children = targetDirectory.listFiles();
        Arrays.sort(children);

        File child;
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (child.isDirectory()) {
                result.append("{ $ref: '" + Constants.LogsRoot + child.getAbsolutePath() + "', id:'" + Constants.LogsRoot + child.getAbsolutePath() + "', type:'Logs', name: '" + child.getName()
                        + "', children: true},");
            }
        }
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (!child.isDirectory()) {
                result.append("{ $ref: '" + Constants.LogsRoot + child.getAbsolutePath() + "', id:'" + Constants.LogsRoot + child.getAbsolutePath() + "', type:'Logs', name: '" + child.getName()
                        + "'},");
            }
        }

        if (result.charAt(result.length() - 1) == ',')
            result.deleteCharAt(result.length() - 1);

        result.append("]}");
        return result.toString();
    }
}
