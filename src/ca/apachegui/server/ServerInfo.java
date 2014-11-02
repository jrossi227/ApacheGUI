package ca.apachegui.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.regex.Pattern;

import apache.conf.global.Utils;

import ca.apachegui.db.SettingsDao;
import ca.apachegui.global.Constants;

public class ServerInfo {

    private static String[] getVersionCommand(String binFile) {
        String command[] = Utils.isWindows() ? ("cmd,/c," + binFile + ",-V").split(",") : (binFile + ",-V").split(",");
        return command;
    }

    /**
     * Method to get the raw output of executing the apache version command.
     * 
     * @return - the output of the apache version command
     * @throws InterruptedException
     * @throws IOException
     */

    /**
     * Method to get the raw output of executing the apache version command.
     * 
     * @param binFile
     *            optional apache binary file to use. This should be set to null if you intend to use the apache binary file defined in the settings.
     * @return the output of the apache version command
     * @throws IOException
     * @throws InterruptedException
     */
    public static String getServerInfo(String binFile) throws IOException, InterruptedException {
        String output = "";

        if (binFile == null) {
            output = Utils.RunProcessWithOutput(getVersionCommand(SettingsDao.getInstance().getSetting(Constants.binFile)));
        } else {
            output = Utils.RunProcessWithOutput(getVersionCommand(binFile));
        }

        return output;
    }

    /**
     * Method to extract version string from apache version output.
     * 
     * @param binFile
     *            optional apache binary file to use. This should be set to null if you intend to use the apache binary file defined in the settings.
     * @return a string with the server version eg. Server version: Apache/2.2.22 (Ubuntu)
     * @throws IOException
     * @throws InterruptedException
     */
    public static String getServerVersionString(String binFile) throws IOException, InterruptedException {
        String info = getServerInfo(binFile);

        Pattern pattern = Pattern.compile(Constants.versionRegex, Pattern.CASE_INSENSITIVE);
        java.util.regex.Matcher patternMatcher = null;

        BufferedReader reader = new BufferedReader(new StringReader(info));
        String line;
        while ((line = reader.readLine()) != null) {
            patternMatcher = pattern.matcher(line);
            // Print the content on the console
            if (patternMatcher.find()) {
                return line;
            }
        }
        reader.close();

        return null;
    }

    /**
     * Method to check if apache version is supported.
     * 
     * @param binFile
     *            optional apache binary file to use. This should be set to null if you intend to use the apache binary file defined in the settings.
     * @return a boolean indicating if apache is supported
     * @throws IOException
     * @throws InterruptedException
     */
    public static boolean isSupported(String binFile) throws IOException, InterruptedException {
        String versionString = getServerVersionString(binFile);

        if (versionString == null) {
            return false;
        }

        Pattern pattern = Pattern.compile(Constants.versionSupportedRegex, Pattern.CASE_INSENSITIVE);
        java.util.regex.Matcher patternMatcher = pattern.matcher(versionString);

        if (patternMatcher.find()) {
            return true;
        }

        return false;
    }

    /**
     * Method to check if the current Apache version is 2.2
     * 
     * @param binFile
     *            optional apache binary file to use. This should be set to null if you intend to use the apache binary file defined in the settings.
     * @return a boolean indicating if apache is version 2.2
     * @throws IOException
     * @throws InterruptedException
     */
    public static boolean isTwoPointTwo(String binFile) throws IOException, InterruptedException {
        String versionString = getServerVersionString(binFile);

        return isVersion(versionString, Constants.versionTwoPointTwoRegex);
    }

    /**
     * Method to check if the current Apache version is 2.3
     * 
     * @param binFile
     *            optional apache binary file to use. This should be set to null if you intend to use the apache binary file defined in the settings.
     * @return a boolean indicating if apache is version 2.3
     * @throws IOException
     * @throws InterruptedException
     */
    public static boolean isTwoPointThree(String binFile) throws IOException, InterruptedException {
        String versionString = getServerVersionString(binFile);

        return isVersion(versionString, Constants.versionTwoPointThreeRegex);
    }

    /**
     * Method to check if the current Apache version is 2.4
     * 
     * @param binFile
     *            optional apache binary file to use. This should be set to null if you intend to use the apache binary file defined in the settings.
     * @return a boolean indicating if apache is version 2.4
     * @throws IOException
     * @throws InterruptedException
     */
    public static boolean isTwoPointFour(String binFile) throws IOException, InterruptedException {
        String versionString = getServerVersionString(binFile);

        return isVersion(versionString, Constants.versionTwoPointFourRegex);
    }

    private static boolean isVersion(String versionString, String regexVersion) {
        Pattern pattern = Pattern.compile(regexVersion, Pattern.CASE_INSENSITIVE);
        java.util.regex.Matcher patternMatcher = pattern.matcher(versionString);

        if (patternMatcher.find()) {
            return true;
        }

        return false;
    }
}
