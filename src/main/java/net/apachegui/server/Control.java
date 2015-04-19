package net.apachegui.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;

import net.apachegui.conf.Configuration;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;

import org.apache.log4j.Logger;

import apache.conf.global.Utils;

public class Control {
    private static Logger log = Logger.getLogger(Control.class);

    /**
     * Method used to start Apache.
     *
     * @return the OS output from starting apache.
     * @throws IOException
     * @throws InterruptedException
     */
    public static String startServer() throws Exception {
        log.trace("RunningProcess.startServer called");

        String command[] = Utils.isWindows() ? ("cmd,/c," + SettingsDao.getInstance().getSetting(Constants.BIN_FILE) + ",-k,start").split(",") : (SettingsDao.getInstance()
                .getSetting(Constants.BIN_FILE) + ",start").split(",");

        String output = Utils.RunProcessWithOutput(command);

        log.trace("Output " + output);

        checkRunning(output);

        StringBuffer buffer = new StringBuffer();
        BufferedReader reader = new BufferedReader(new StringReader(output));

        String line;
        while ((line = reader.readLine()) != null) {
            log.trace(line);
            buffer.append(line + "<br/>");
        }
        reader.close();

        log.trace("Apache Started");
        return buffer.toString();
    }

    /**
     * Method used to restart Apache.
     *
     * @return the OS output from restarting apache.
     * @throws IOException
     * @throws InterruptedException
     */
    public static String restartServer() throws Exception {
        log.trace("RunningProcess.restartServer called");

        log.trace("Checking the server configuration before restarting");
        String status = Configuration.testServerConfiguration();
        if(!Configuration.isServerConfigurationOk(status)) {
            throw new Exception("The server was not restarted. There is an error with the configuration " + status);
        }

        String command[] = Utils.isWindows() ? ("cmd,/c," + SettingsDao.getInstance().getSetting(Constants.BIN_FILE) + ",-k,restart").split(",") : (SettingsDao.getInstance().getSetting(
                Constants.BIN_FILE) + ",restart").split(",");

        String output = Utils.RunProcessWithOutput(command);
        log.trace("Output " + output);

        checkRunning(output);

        StringBuffer buffer = new StringBuffer();
        BufferedReader reader = new BufferedReader(new StringReader(output));

        String line;
        while ((line = reader.readLine()) != null) {
            log.trace(line);
            buffer.append(line + "<br/>");
        }
        reader.close();

        log.trace("Apache restarted");
        return buffer.toString();
    }

    /**
     * Method used to stop Apache.
     *
     * @return the OS output from stopping apache.
     * @throws IOException
     * @throws InterruptedException
     */
    public static String stopServer() throws Exception {
        log.trace("RunningProcess.stopServer called");
        String command[] = Utils.isWindows() ? ("cmd,/c," + SettingsDao.getInstance().getSetting(Constants.BIN_FILE) + ",-k,stop").split(",")
                : (SettingsDao.getInstance().getSetting(Constants.BIN_FILE) + ",stop").split(",");

        String output = Utils.RunProcessWithOutput(command);
        log.trace("Output " + output);

        checkStopped(output);

        StringBuffer buffer = new StringBuffer();
        BufferedReader reader = new BufferedReader(new StringReader(output));

        String line;
        while ((line = reader.readLine()) != null) {
            log.trace(line);
            buffer.append(line + "<br/>");
        }
        reader.close();

        log.trace("Apache stopped");
        return buffer.toString();
    }

    private static void checkRunning(String output) throws Exception {
        long i =0;

        boolean started = true;
        while (!isServerRunning()) {
            Thread.sleep(500);
            i += 500;
            if (i >= Constants.START_SERVER_WAIT_TIME) {
                started = false;
                break;
            }
        }
        if (!started) {
            throw new Exception(output);
        }
    }

    private static void checkStopped(String output) throws Exception {
        long i =0;

        boolean stopped = true;
        while (isServerRunning()) {
            Thread.sleep(500);
            i += 500;
            if (i >= Constants.STOP_SERVER_WAIT_TIME) {
                stopped = false;
                break;
            }
        }
        if (!stopped) {
            throw new Exception(output);
        }
    }

    /**
     *
     * @return a boolean indicating if apache is running.
     * @throws Exception
     */
    public static boolean isServerRunning() throws Exception {
        return RunningProcess.isProcessRunning(Constants.RUNNING_PROCESS_NAME);
    }

}
