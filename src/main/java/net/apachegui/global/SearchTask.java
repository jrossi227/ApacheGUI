package net.apachegui.global;

import java.io.BufferedReader;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;

import org.apache.commons.io.filefilter.RegexFileFilter;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import apache.conf.parser.File;

public class SearchTask implements Runnable {

    public enum State {
        IDLE, GRABBING_FILES, SEARCHING, CANCELLING, CANCELLED
    }

    private static Logger log = Logger.getLogger(SearchTask.class);

    private String directory;
    private String fileList;
    private boolean recursive;
    private String filter;

    private static JSONArray results;
    private static State state = State.IDLE;
    private static String output;

    public SearchTask(String directory, String fileList, String filter, boolean recursive) {
        this.directory = directory;
        this.fileList = fileList;
        this.filter = filter;
        this.recursive = recursive;
    }

    @Override
    public void run() {

        state = State.GRABBING_FILES;

        results = new JSONArray();
        output = "Grabbing the list of files to search...";

        try {

            StringBuffer fileListFilter = new StringBuffer();
            String fileListArray[] = fileList.split(",");
            for (int i = 0; i < fileListArray.length; i++) {
                if (i > 0) {
                    fileListFilter.append("|");
                }

                fileListFilter.append(fileListArray[i].trim());
            }

            // -------------------------------------------------------------------------------------------
            // Grab list of files to search
            // -------------------------------------------------------------------------------------------

            String files[];
            if (recursive) {

                // Breadth first search

                Queue<File> queue = new LinkedList<File>();
                queue.add(new File(directory));

                ArrayList<String> fileList = new ArrayList<String>();
                FileFilter fileFilter = new RegexFileFilter(fileListFilter.toString());
                while (!queue.isEmpty()) {
                    if (state == State.CANCELLING) {
                        break;
                    }

                    File currentDirectory = (File) queue.remove();

                    output = "Grabbing files from " + currentDirectory.getAbsolutePath();

                    java.io.File children[] = currentDirectory.listFiles();

                    File currFile;
                    for (java.io.File child : children) {
                        currFile = new File(currentDirectory, child.getName());
                        if (currFile.isDirectory()) {
                            queue.add(currFile);
                        }
                        if (currFile.isFile() && fileFilter.accept(currFile)) {
                            fileList.add(currFile.getAbsolutePath());
                        }
                    }
                }

                files = fileList.toArray(new String[fileList.size()]);

            } else {
                FileFilter fileFilter = new RegexFileFilter(fileListFilter.toString());
                java.io.File children[] = new File(directory).listFiles(fileFilter);

                ArrayList<String> tempFileList = new ArrayList<String>();
                for (int i = 0; i < children.length; i++) {
                    if (children[i].isFile()) {
                        tempFileList.add(new File(children[i]).getAbsolutePath());
                    }
                }

                files = tempFileList.toArray(new String[tempFileList.size()]);
            }

            // -------------------------------------------------------------------------------------------
            // Search file by file
            // -------------------------------------------------------------------------------------------

            state = (state == State.CANCELLING) ? State.CANCELLING : State.SEARCHING;

            Pattern pattern = Pattern.compile(filter, Pattern.CASE_INSENSITIVE);
            java.util.regex.Matcher patternMatcher = null;

            InputStreamReader fstream;
            BufferedReader br;
            String strLine;
            JSONObject object;
            int line = 1, iter = 0;
            for (String file : files) {
                if (state == State.CANCELLING) {
                    break;
                }

                iter++;

                output = "Searching file " + iter + " of " + files.length + " " + (int) (((float) iter / (float) files.length) * 100) + "% done";

                line = 1;

                if (file.endsWith(".gz")) {
                    fstream = new InputStreamReader(new GZIPInputStream(new FileInputStream(new File(file))), "UTF-8");
                } else {
                    fstream = new InputStreamReader(new FileInputStream(new File(file)), "UTF-8");
                }

                br = new BufferedReader(fstream);

                while ((strLine = br.readLine()) != null) {
                    patternMatcher = pattern.matcher(strLine);
                    if (patternMatcher.find()) {
                        object = new JSONObject();
                        object.put("path", file);
                        object.put("line", line);
                        object.put("content", Utilities.processSearchResultContent(strLine, patternMatcher.group()));

                        if (results.length() < Constants.MAXIMUM_FILE_SEARCH_RESULTS) {
                            results.put(object);
                        } else {
                            br.close();
                            return;
                        }
                    }
                    line++;
                }

                br.close();
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            state = (state == State.CANCELLING) ? State.CANCELLED : State.IDLE;
        }

    }

    public synchronized static void cancel() throws InterruptedException {
        if (state == State.IDLE || state == State.CANCELLED) {
            return;
        }

        state = State.CANCELLING;
        while (getCurrentState() == State.CANCELLING) {
            Thread.sleep(100);
        }
    }

    public synchronized static State getCurrentState() {
        return state;
    }

    public synchronized static String getCurrentOutput() {
        return output;
    }

    public synchronized static JSONArray getLastResults() {
        return results;
    }

}
