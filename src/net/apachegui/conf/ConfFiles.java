package net.apachegui.conf;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
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
     *            - the meassage to write to the file
     * @throws IOException
     *             if root ConfigFile can't be found
     */
    public static void appendToRootConfigFile(String message) throws IOException {
        log.trace("ConfFiles.appendToRootConfigFile called");

        String confFile = SettingsDao.getInstance().getSetting(Constants.confFile);
        log.trace("Writing " + message + " To the configuration File " + confFile);

        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(confFile, true), "UTF-8"));
        out.write(Constants.newLine + message);
        // Close the output stream
        out.close();
    }

    /**
     * Writes a newline then message to the end of the gui specific config file. An include is written in the main config file if the gui Config file has not yet been included.
     * 
     * @param message
     *            - the message to write to the file
     * @throws Exception
     */
    public static void appendToGUIConfigFile(String message) throws Exception {
        log.trace("ConfFiles.appendToGUIConfigFile called");

        String confDirectory = SettingsDao.getInstance().getSetting(Constants.confDirectory);
        log.trace("Writing " + message + " To the configuration File " + (new File(confDirectory, Constants.guiConfFile)).getAbsolutePath());

        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream((new File(confDirectory, Constants.guiConfFile)).getAbsolutePath(), true)));
        out.write(Constants.newLine + message);
        out.close();

        // check if gui file is included, if its not then include it
        String includedFiles[] = new Parser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getActiveConfFileList();

        boolean included = false;
        for (int i = 0; i < includedFiles.length && !included; i++) {
            if (includedFiles[i].equals((new File(confDirectory, Constants.guiConfFile)).getAbsolutePath())) {
                included = true;
            }
        }

        if (!included) {
            appendToRootConfigFile(Constants.apacheGuiComment);
            if (Utils.isWindows()) {
                appendToRootConfigFile("Include \"" + (new File(confDirectory, Constants.guiConfFile)).getAbsolutePath() + "\"");

            } else {
                appendToRootConfigFile("Include " + (new File(confDirectory, Constants.guiConfFile)).getAbsolutePath());
            }
        }
    }

    /**
     * Searches for lines that match a specific Regex in the gui config file. If the Regex is found then the lines are removed from the gui file.
     * 
     * @param regex
     *            - lines matching the regex will be removed from the file
     * @throws Exception
     *             If there is a file error.
     */
    public static void removeFromGUIConfigFile(String regex) throws Exception {
        log.trace("ConfFiles.removeFromGUIConfigFile called");

        File guiFile = new File(SettingsDao.getInstance().getSetting(Constants.confDirectory), Constants.guiConfFile);
        log.trace("Parsing " + guiFile.getAbsolutePath() + " for regex " + regex);

        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(guiFile), "UTF-8"));

        File FileHandle = new File(guiFile.getAbsolutePath() + ".tmp");
        BufferedWriter writer = new BufferedWriter(new FileWriter(FileHandle));

        String strLine;
        while ((strLine = br.readLine()) != null) {
            if (strLine.matches(regex)) {
                log.trace("Found patten " + regex + " in " + guiFile.getAbsolutePath() + " Skipping current line");
            } else {
                writer.write(strLine);
                writer.newLine();
            }

        }
        br.close();
        writer.flush();
        writer.close();

        File fileNew = new File(guiFile.getAbsolutePath() + ".tmp");

        File fileOld = new File(guiFile.getAbsolutePath());

        log.trace("moving " + fileNew.getAbsolutePath() + " to " + fileOld.getAbsolutePath());
        Utils.moveFile(fileNew, fileOld);

    }

    /**
     * Deletes all lines matching a regex only from active config files. Will not delete commented results.
     * 
     * @param regex
     *            - lines matching this regex will be removed from active config files
     * @throws Exception
     *             if a file error occurs
     */
    public static void deleteFromConfigFiles(String regex, boolean includeComments) throws Exception {
        log.trace("ConfFiles.deleteFromConfigFiles called");
        log.trace("Deleting " + regex + " from configuration files");
        Pattern linePattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        String includedFiles[] = new Parser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
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
                        file.append(strLine + Constants.newLine);
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

    public static String writeToConfigFile(File file, String lines, int startLine) throws IOException {

        //TODO make lines into an array and preserver spaces using startLine
        
        String originalContents = FileUtils.readFileToString(file, Charset.forName("UTF-8"));
        
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));

        StringBuffer fileBuffer = new StringBuffer();

        String strLine;
        int lineNum = 1;
        while ((strLine = br.readLine()) != null) {
            if (lineNum == startLine) {
                fileBuffer.append(lines);
            }

            fileBuffer.append(strLine + Constants.newLine);

            lineNum++;
        }

        br.close();

        Utils.writeStringBufferToFile(new File(file), fileBuffer, Charset.forName("UTF-8"));
        
        return originalContents;
    }

    public static String replaceLinesInConfigFile(File file, String lines, int startLine, int endLine) throws IOException {

        //TODO make lines into an array and preserve spaces
        
        String originalContents = FileUtils.readFileToString(file, Charset.forName("UTF-8"));
        
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));

        StringBuffer fileBuffer = new StringBuffer();

        String strLine;
        int lineNum = 1;
        while ((strLine = br.readLine()) != null) {
            if (lineNum == startLine) {
                fileBuffer.append(lines);
            }

            if(lineNum < startLine || lineNum > endLine) {
                fileBuffer.append(strLine + Constants.newLine);
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
                fileBuffer.append(strLine + Constants.newLine);
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
     *            - The regex to search for
     * @return a boolean indicating if the regex was found
     * @throws IOException
     *             if a file error occurs
     */
    public static boolean searchActiveConfigFiles(String regex) throws Exception {
        log.trace("ConfFiles.searchActiveConfigFiles called");
        log.trace("Searching " + regex + " from configuration files");

        Pattern linePattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        String includedFiles[] = new Parser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
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
        String confDirectory = SettingsDao.getInstance().getSetting(Constants.confDirectory);
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
     *            - the path of the target config files.
     * @return the json with the file information of the target path
     */
    public static String getNodeJson(String path) {

        File targetDirectory = new File(path);
        File confDirectory = new File(SettingsDao.getInstance().getSetting(Constants.confDirectory));

        StringBuffer result = new StringBuffer();
        result.append("{ id: '" + Constants.ConfigurationRoot + targetDirectory.getAbsolutePath() + "', name:'" + (targetDirectory.equals(confDirectory) ? "Configuration" : targetDirectory.getName())
                + "', type:'Configuration', children:[");

        java.io.File[] children = targetDirectory.listFiles();
        Arrays.sort(children);

        File child;
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (child.isDirectory()) {
                if (!child.getAbsolutePath().matches(SettingsDao.getInstance().getSetting(Constants.confDirectory) + Constants.sanitizedConfigFiles)) {
                    result.append("{ $ref: '" + Constants.ConfigurationRoot + child.getAbsolutePath() + "', id:'" + Constants.ConfigurationRoot + child.getAbsolutePath()
                            + "', type:'Configuration', name: '" + child.getName() + "', children: true},");
                }
            }
        }
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (!child.isDirectory()) {
                if (!child.getAbsolutePath().matches(SettingsDao.getInstance().getSetting(Constants.confDirectory) + Constants.sanitizedConfigFiles)) {
                    result.append("{ $ref: '" + Constants.ConfigurationRoot + child.getAbsolutePath() + "', id:'" + Constants.ConfigurationRoot + child.getAbsolutePath()
                            + "', type:'Configuration', name: '" + child.getName() + "'},");
                }
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
     *            - the list of confFiles to sanitize
     */
    public static String[] sanitizeConfFiles(String[] confFiles) {
        log.trace("ConfFiles.sanitizeConfFiles called");
        String confDirectory = SettingsDao.getInstance().getSetting(Constants.confDirectory);

        log.trace("Sanitize String: " + Constants.sanitizedConfigFiles);
        ArrayList<String> filteredFiles = new ArrayList<String>();
        for (String confFile : confFiles) {
            log.trace("Sanitizing " + confFile);
            if (!confFile.matches((new File(confDirectory)).getAbsolutePath() + Constants.sanitizedConfigFiles)) {
                log.trace("Adding to filter: " + confFile);
                filteredFiles.add(confFile);
            }
        }

        return filteredFiles.toArray(new String[filteredFiles.size()]);
    }
}
