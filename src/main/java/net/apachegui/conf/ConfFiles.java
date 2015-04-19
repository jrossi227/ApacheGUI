package net.apachegui.conf;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;

import apache.conf.parser.File;
import apache.conf.global.Utils;
import apache.conf.parser.Parser;

public class ConfFiles {
    private static Logger log = Logger.getLogger(ConfFiles.class);

    /**
     * Writes a newline then message to the end of the root config file.
     * 
     * @param message
     *            the meassage to write to the file
     * @throws IOException
     *             if root ConfigFile can't be found
     */
    public static String appendToRootConfigFile(String message) throws IOException {
        String confFile = SettingsDao.getInstance().getSetting(Constants.CONF_FILE);

        String originalContents = FileUtils.readFileToString(new File(confFile), Charset.forName("UTF-8"));
        
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(confFile, true), "UTF-8"));
        out.write(Constants.NEW_LINE + message);
        out.close();
        
        return originalContents;
    }

    /**
     * Writes a newline then message to the end of the gui specific config file. An include is written in the main config file if the gui Config file has not yet been included.
     * 
     * @param message
     *            the message to write to the file
     * @throws Exception
     */
    public static String appendToGUIConfigFile(String message) throws Exception {

        String confDirectory = SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY);
        File guiFile = (new File(confDirectory, Constants.GUI_CONF_FILE));

        if(!guiFile.exists()) {
            guiFile.createNewFile();
            Utils.setPermissions(guiFile);
        }
        String originalContents = FileUtils.readFileToString(guiFile, Charset.forName("UTF-8"));
        
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(guiFile, true)));
        out.write(Constants.NEW_LINE + message);
        out.close();

        String includedFiles[] = new Parser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getActiveConfFileList();

        boolean included = false;
        for (int i = 0; i < includedFiles.length && !included; i++) {
            if (includedFiles[i].equals(guiFile.getAbsolutePath())) {
                included = true;
            }
        }

        if (!included) {
            String originalConfContents = appendToRootConfigFile(Constants.APACHE_GUI_COMMENT);
            if (Utils.isWindows()) {
                appendToRootConfigFile("Include \"" + (new File(confDirectory, Constants.GUI_CONF_FILE)).getAbsolutePath() + "\"");

            } else {
                appendToRootConfigFile("Include " + (new File(confDirectory, Constants.GUI_CONF_FILE)).getAbsolutePath());
            }
            
            Configuration.testChanges(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), originalConfContents);
        }
        
        return originalContents;
    }

    /**
     * Searches for lines that match a specific Regex in the gui config file. If the Regex is found then the lines are removed from the gui file.
     * 
     * @param regex
     *            lines matching the regex will be removed from the file
     * @throws Exception
     *             If there is a file error.
     */
    public static String removeFromGUIConfigFile(String regex) throws Exception {

        File guiFile = new File(SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY), Constants.GUI_CONF_FILE);
        
        String originalContents = FileUtils.readFileToString(guiFile, Charset.forName("UTF-8"));
        
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(guiFile), "UTF-8"));

        StringBuffer fileBuffer = new StringBuffer();
        
        String strLine;
        while ((strLine = br.readLine()) != null) {
            if (strLine.matches(regex)) {
                log.trace("Found patten " + regex + " in " + guiFile.getAbsolutePath() + " Skipping current line");
            } else {
                fileBuffer.append(strLine);
                fileBuffer.append(Constants.NEW_LINE);
            }

        }
        br.close();

        Utils.writeStringBufferToFile(new File(guiFile), fileBuffer, Charset.forName("UTF-8"));
        
        return originalContents;
    }

    /**
     * Deletes all lines matching a regex only from active config files. Will not delete commented results.
     * 
     * @param regex
     *            lines matching this regex will be removed from active config files
     * @throws Exception
     *             if a file error occurs
     */
    public static void deleteFromConfigFiles(String regex, boolean includeComments) throws Exception {
        log.trace("ConfFiles.deleteFromConfigFiles called");
        log.trace("Deleting " + regex + " from configuration files");
        Pattern linePattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        String includedFiles[] = new Parser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getActiveConfFileList();

        boolean found = false;
        StringBuffer file = new StringBuffer();
        for (int i = 0; i < includedFiles.length; i++) {
            if ((new File(includedFiles[i]).exists())) {
                file.delete(0, file.length());
                found = false;
                BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(includedFiles[i]), "UTF-8"));

                String strLine;
                String cmpLine;
                while ((strLine = br.readLine()) != null) {
                    cmpLine = Utils.sanitizeLineSpaces(strLine);
                    Matcher lineMatcher = linePattern.matcher(cmpLine);
                    if (lineMatcher.find() && (includeComments || (!includeComments && !Parser.isCommentMatch(cmpLine)))) {
                        log.trace(regex + " has been found in " + includedFiles[i] + " it will be deleted from the file");
                        found = true;
                    } else {
                        file.append(strLine + Constants.NEW_LINE);
                    }
                }

                br.close();

                if (found) {
                    log.trace("Calling writeStringBufferToFile to rewrite file");
                    Utils.writeStringBufferToFile(new File(includedFiles[i]), file, Charset.forName("UTF-8"));
                }
            }
        }
    }

    public static String writeToConfigFile(File file, String lines[], int startLine, boolean useWhitespaceBefore) throws IOException {

        String originalContents = FileUtils.readFileToString(file, Charset.forName("UTF-8"));

        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));

        StringBuffer fileBuffer = new StringBuffer();

        String strLine;
        int lineNum = 1;
        String whiteSpace = "";
        while ((strLine = br.readLine()) != null) {

            if (!useWhitespaceBefore) {
                if (!strLine.trim().equals("")) {
                    whiteSpace = Utilities.getLeadingWhiteSpace(strLine);
                }
            }

            if (lineNum == startLine) {
                for (String line : lines) {
                    fileBuffer.append(whiteSpace + line + Constants.NEW_LINE);
                }
            }

            fileBuffer.append(strLine + Constants.NEW_LINE);

            lineNum++;

            if (useWhitespaceBefore) {
                if (!strLine.trim().equals("")) {
                    whiteSpace = Utilities.getLeadingWhiteSpace(strLine);
                }
            }
        }

        br.close();

        Utils.writeStringBufferToFile(new File(file), fileBuffer, Charset.forName("UTF-8"));

        return originalContents;
    }

    public static String replaceLinesInConfigFile(File file, String lines[], int startLine, int endLine) throws IOException {

        String originalContents = FileUtils.readFileToString(file, Charset.forName("UTF-8"));

        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));

        StringBuffer fileBuffer = new StringBuffer();

        String strLine;
        int lineNum = 1;
        while ((strLine = br.readLine()) != null) {
            if (lineNum == startLine) {
                for (String line : lines) {
                    fileBuffer.append(Utilities.getLeadingWhiteSpace(strLine) + line + Constants.NEW_LINE);
                }
            }

            if (lineNum < startLine || lineNum > endLine) {
                fileBuffer.append(strLine + Constants.NEW_LINE);
            }

            lineNum++;
        }

        br.close();

        Utils.writeStringBufferToFile(new File(file), fileBuffer, Charset.forName("UTF-8"));

        return originalContents;
    }

    public static String deleteFromConfigFile(Pattern linePattern, File file, int startLineNum, int endLineNum, boolean includeComments) throws Exception {
        log.trace("ConfFiles.deleteFromConfigFiles called");

        String originalContents = FileUtils.readFileToString(file, Charset.forName("UTF-8"));

        boolean found = false;
        StringBuffer fileBuffer = new StringBuffer();

        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));

        String strLine;
        String cmpLine;
        int lineNum = 1;
        while ((strLine = br.readLine()) != null) {
            cmpLine = Utils.sanitizeLineSpaces(strLine);
            Matcher lineMatcher = linePattern.matcher(cmpLine);
            if (lineMatcher.find() && lineNum >= startLineNum && lineNum <= endLineNum && (includeComments || (!includeComments && !Parser.isCommentMatch(cmpLine)))) {
                found = true;
            } else {
                fileBuffer.append(strLine + Constants.NEW_LINE);
            }

            lineNum++;
        }

        br.close();

        if (found) {
            log.trace("Calling writeStringBufferToFile to rewrite file");
            Utils.writeStringBufferToFile(file, fileBuffer, Charset.forName("UTF-8"));
        }

        return originalContents;
    }

    /**
     * Searches active config files for the existence of a regex. This method will not return commented results.
     * 
     * @param regex
     *            The regex to search for
     * @return a boolean indicating if the regex was found
     * @throws IOException
     *             if a file error occurs
     */
    public static boolean searchActiveConfigFiles(String regex) throws Exception {
        log.trace("ConfFiles.searchActiveConfigFiles called");
        log.trace("Searching " + regex + " from configuration files");

        Pattern linePattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        String includedFiles[] = new Parser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getActiveConfFileList();

        for (int i = 0; i < includedFiles.length; i++) {
            if ((new File(includedFiles[i]).exists())) {
                BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(includedFiles[i]), "UTF-8"));

                String strLine;
                while ((strLine = br.readLine()) != null) {
                    strLine = Utils.sanitizeLineSpaces(strLine);
                    Matcher lineMatcher = linePattern.matcher(strLine);
                    if (!Parser.isCommentMatch(strLine) && lineMatcher.find()) {
                        log.trace(regex + " has been found in " + includedFiles[i]);
                        br.close();
                        return true;
                    }
                }

                br.close();
            }
        }

        return false;
    }

    /**
     * Gets all Conf Files in the Configuration Directory. Some apache configurations use the server root as the root configuration directory. As a result the root configuration directory can include
     * the folder for modules logs and run. Any files contained in a folder logs modules and run will not be included in the results.
     * 
     * @return an array with absolute paths of the Configuration files.
     * @throws IOException
     *             if a file error occurs
     */
    public static String[] getFullConfFileList() throws IOException {
        String confDirectory = SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY);
        String confFiles[] = Utils.getFileList(new File(confDirectory));

        if (!Utils.isWindows()) {
            confFiles = ConfFiles.sanitizeConfFiles(confFiles);
        }

        return confFiles;
    }

    /**
     * Used for Menu to get a nodes JSON.
     * 
     * @param path
     *            the path of the target config files.
     * @return the json with the file information of the target path
     */
    public static String getNodeJson(String path) {

        File targetDirectory = new File(path);
        File confDirectory = new File(SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY));

        StringBuffer result = new StringBuffer();
        result.append("{ id: '" + Constants.CONFIGURATION_ROOT + targetDirectory.getAbsolutePath() + "', name:'" + (targetDirectory.equals(confDirectory) ? "Configuration" : targetDirectory.getName())
                + "', type:'Configuration', children:[");

        java.io.File[] children = targetDirectory.listFiles();
        
        if(targetDirectory.getAbsolutePath().equals(confDirectory.getAbsolutePath())) {
            children = sanitizeConfFiles(children);
        }
        Arrays.sort(children);

        File child;
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (child.isDirectory()) {
                result.append("{ $ref: '" + Constants.CONFIGURATION_ROOT + child.getAbsolutePath() + "', id:'" + Constants.CONFIGURATION_ROOT + child.getAbsolutePath()
                        + "', type:'Configuration', name: '" + child.getName() + "', children: true},");
            }
        }
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (!child.isDirectory()) {
                result.append("{ $ref: '" + Constants.CONFIGURATION_ROOT + child.getAbsolutePath() + "', id:'" + Constants.CONFIGURATION_ROOT + child.getAbsolutePath()
                        + "', type:'Configuration', name: '" + child.getName() + "'},");
            }
        }

        if (result.charAt(result.length() - 1) == ',') {
            result.deleteCharAt(result.length() - 1);
        }

        result.append("]}");
        return result.toString();
    }

    /**
     * Some apache configurations use the server root as the root configuration directory. As a result the root configuration directory can include the folder for modules logs and run. Any files
     * contained in a folder logs modules and run will be removed from confFiles.
     * 
     * @param confFiles
     *            the list of confFiles to sanitize
     */
    public static java.io.File[] sanitizeConfFiles(java.io.File[] confFiles) {
    
        log.trace("ConfFiles.sanitizeConfFiles called");
        String confDirectory = SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY);

        ArrayList<java.io.File> filteredFiles = new ArrayList<java.io.File>();
        for (java.io.File confFile : confFiles) {
            log.trace("Sanitizing " + confFile);
            if ((new File(confFile).getAbsolutePath()).startsWith((new File(confDirectory)).getAbsolutePath())) {
                log.trace("Adding to filter: " + confFile);
                filteredFiles.add(confFile);
            }
        }

        return filteredFiles.toArray(new java.io.File[filteredFiles.size()]);
    }    
        
    /**
     * Some apache configurations use the server root as the root configuration directory. As a result the root configuration directory can include the folder for modules logs and run. The folders
     * will contain symbolic links. 
     * 
     * @param confFiles
     *            the list of confFiles to sanitize
     */
    public static String[] sanitizeConfFiles(String[] confFiles) {
        log.trace("ConfFiles.sanitizeConfFiles called");
        String confDirectory = SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY);

        ArrayList<String> filteredFiles = new ArrayList<String>();
        for (String confFile : confFiles) {
            log.trace("Sanitizing " + confFile);
            if (confFile.startsWith((new File(confDirectory)).getAbsolutePath())) {
                log.trace("Adding to filter: " + confFile);
                filteredFiles.add(confFile);
            }
        }

        return filteredFiles.toArray(new String[filteredFiles.size()]);
    }
}
