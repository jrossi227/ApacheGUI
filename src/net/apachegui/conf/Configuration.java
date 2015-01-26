package net.apachegui.conf;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.regex.Pattern;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import apache.conf.global.Utils;
import apache.conf.parser.Parser;
import apache.conf.parser.File;

public class Configuration {
    private static Logger log = Logger.getLogger(Configuration.class);

    /**
     * Calls apache configuration test command and returns the output
     * 
     * @return a String with the apache output
     * @throws IOException
     * @throws InterruptedException
     */
    public static String testServerConfiguration() throws IOException, InterruptedException {
        log.trace("Configuration.testServerConfiguration called");
        String output = "";

        if (Utils.isWindows()) {
            String command[] = { "cmd", "/c", SettingsDao.getInstance().getSetting(Constants.binFile), "-t" };
            output = Utils.RunProcessWithOutput(command);
        } else {
            String command[] = { SettingsDao.getInstance().getSetting(Constants.binFile), "-t" };
            output = Utils.RunProcessWithOutput(command);
        }
        output = output.replaceAll(Constants.newLine, "<br/>");

        log.trace("returning " + output);
        return output;
    }
    
    public static void testChanges(String file, String originalContents) throws Exception {
        
        String status = Configuration.testServerConfiguration();

        if(!Configuration.isServerConfigurationOk(status)) {
            FileUtils.writeStringToFile(new File(file), originalContents, Charset.forName("UTF-8"));
            
            throw new Exception("The changes generated a configuration error in " + file + " and have been reverted: " + status);
        }
    }
    
    public static boolean isServerConfigurationOk(String status) throws IOException, InterruptedException {
        
        Pattern pattern = Pattern.compile("Syntax OK", Pattern.CASE_INSENSITIVE);
        java.util.regex.Matcher patternMatcher = pattern.matcher(status);
        if (!patternMatcher.find()) {
            return false;
        } 
        
        return true;
    }

    /**
     * Searches every file in the configuration directory for the input filter.
     * 
     * @param filter
     *            - the filter to search for. The filter is a regex.
     * @param activeFilesFilter
     *            - a boolean indicating whether we should only return results in active files.
     * @param includeCommentsFilter
     *            - a boolean indicating whether comments should be included in the results
     * @return an array of JSON objects with the details of the search result The results are limited to the value defined by Constants.maximumConfigurationSearchResults.
     * @throws Exception
     */
    public static JSONArray searchConfiguration(String filter, boolean activeFilesFilter, boolean includeCommentsFilter) throws Exception {
        String confFiles[];

        if (activeFilesFilter) {
            String includedFiles[] = new Parser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                    StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getActiveConfFileList();
            confFiles = includedFiles;

        } else {
            confFiles = Utils.getFileList(new File(SettingsDao.getInstance().getSetting(Constants.confDirectory)));
        }

        if (!Utils.isWindows()) {
            confFiles = ConfFiles.sanitizeConfFiles(confFiles);
        }

        Pattern pattern = Pattern.compile(filter, Pattern.CASE_INSENSITIVE);
        java.util.regex.Matcher patternMatcher = null;

        JSONArray results = new JSONArray();
        FileInputStream fstream;
        DataInputStream in;
        BufferedReader br;
        String strLine;
        JSONObject object;
        int line = 1;
        for (String confFile : confFiles) {
            if ((new File(confFile)).exists()) {
                line = 1;
                fstream = new FileInputStream(confFile);
                in = new DataInputStream(fstream);
                br = new BufferedReader(new InputStreamReader(in, "UTF-8"));
                while ((strLine = br.readLine()) != null) {
                    patternMatcher = pattern.matcher(strLine);
                    // Print the content on the console
                    if (patternMatcher.find()) {
                        // Always include the line if comments are allowed,
                        // or if comments arent allowed and the line isnt commented
                        if (includeCommentsFilter || (!includeCommentsFilter && !Parser.isCommentMatch(strLine))) {
                            object = new JSONObject();
                            object.put("path", confFile);
                            object.put("line", line);
                            object.put("content", Utilities.forHTML(strLine));

                            if (results.length() < Constants.maximumConfigurationSearchResults) {
                                results.put(object);
                            } else {
                                break;
                            }
                        }
                    }
                    line++;
                }
                in.close();
            }
        }

        return results;

    }
}
