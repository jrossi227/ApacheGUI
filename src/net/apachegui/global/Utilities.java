package net.apachegui.global;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.CharacterIterator;
import java.text.StringCharacterIterator;
import java.util.ArrayList;

import javax.servlet.ServletContext;

import net.apachegui.db.SettingsDao;
import net.apachegui.directives.Listen;

import org.apache.log4j.Logger;

import apache.conf.parser.File;

public class Utilities {
    private static Logger log = Logger.getLogger(Utilities.class);

    private static ServletContext context;

    public static void setServletcontext(ServletContext servletContext) {
        context = servletContext;
    }

    /**
     * Goes through Apache Listen directives to search for a port/url that is available on the input ip.
     * 
     * @param host
     *            - the host to connect to.
     * @return a url that is successfully connected to.
     * @throws Exception
     */
    public static String findRootURL(String host) throws Exception {
        // We try in best effort to get a http port, but we might be confined to https depending on the server
        log.trace("Utilities.findRootURL called");
        log.trace("Searching configuration for " + Constants.listenDirective);
        Listen listeners[] = Listen.getAllListening();
        int port = 0;
        URL url = null;
        for (int i = 0; i < listeners.length; i++) {
            port = listeners[i].getPort();

            log.trace("Trying port " + port + " for http");

            // we dont want https
            if (port == 443) {
                log.trace("we dont want https on port 443");
                continue;
            }

            try {
                url = new URL("http://" + host + ":" + port);
                log.trace("Trying URL " + "http://" + host + ":" + port);

                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.connect();
                // BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                // while ((in.readLine()) != null){}
                // in.close();
                conn.disconnect();
                log.trace("Successfully connected to " + "http://" + host + ":" + port);
                break;
            } catch (Exception e) {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                log.info(sw.toString());
                log.info("Unable to connect to " + "http://" + host + ":" + port + " setting url to https");
            }
        }
        log.trace("returning " + url.toString());
        return url.toString();
    }

    /**
     * Converts ASCII text to its html character entity representation.
     * 
     * @param aText
     *            - The ASCII text to convert.
     * @return the html character entity representation of aText.
     */
    public static String forHTML(String aText) {
        final StringBuilder result = new StringBuilder();
        final StringCharacterIterator iterator = new StringCharacterIterator(aText);
        char character = iterator.current();
        while (character != CharacterIterator.DONE) {
            if (character == '<') {
                result.append("&lt;");
            } else if (character == '>') {
                result.append("&gt;");
            } else if (character == '&') {
                result.append("&amp;");
            } else if (character == '\"') {
                result.append("&quot;");
            } else if (character == '\t') {
                addCharEntity(9, result);
            } else if (character == '!') {
                addCharEntity(33, result);
            } else if (character == '#') {
                addCharEntity(35, result);
            } else if (character == '$') {
                addCharEntity(36, result);
            } else if (character == '%') {
                addCharEntity(37, result);
            } else if (character == '\'') {
                addCharEntity(39, result);
            } else if (character == '(') {
                addCharEntity(40, result);
            } else if (character == ')') {
                addCharEntity(41, result);
            } else if (character == '*') {
                addCharEntity(42, result);
            } else if (character == '+') {
                addCharEntity(43, result);
            } else if (character == ',') {
                addCharEntity(44, result);
            } else if (character == '-') {
                addCharEntity(45, result);
            } else if (character == '.') {
                addCharEntity(46, result);
            } else if (character == '/') {
                addCharEntity(47, result);
            } else if (character == ':') {
                addCharEntity(58, result);
            } else if (character == ';') {
                addCharEntity(59, result);
            } else if (character == '=') {
                addCharEntity(61, result);
            } else if (character == '?') {
                addCharEntity(63, result);
            } else if (character == '@') {
                addCharEntity(64, result);
            } else if (character == '[') {
                addCharEntity(91, result);
            } else if (character == '\\') {
                addCharEntity(92, result);
            } else if (character == ']') {
                addCharEntity(93, result);
            } else if (character == '^') {
                addCharEntity(94, result);
            } else if (character == '_') {
                addCharEntity(95, result);
            } else if (character == '`') {
                addCharEntity(96, result);
            } else if (character == '{') {
                addCharEntity(123, result);
            } else if (character == '|') {
                addCharEntity(124, result);
            } else if (character == '}') {
                addCharEntity(125, result);
            } else if (character == '~') {
                addCharEntity(126, result);
            } else {
                // the char is not a special one
                // add it to the result as is
                result.append(character);
            }
            character = iterator.next();
        }
        return result.toString();
    }

    private static void addCharEntity(Integer aIdx, StringBuilder aBuilder) {
        String padding = "";
        if (aIdx <= 9) {
            padding = "00";
        } else if (aIdx <= 99) {
            padding = "0";
        } else {
            // no prefix
        }
        String number = padding + aIdx.toString();
        aBuilder.append("&#" + number + ";");
    }

    /**
     * 
     * Utility function to create a file extension regex from a list of file extensions
     * 
     * @param extensions
     *            - an array of file extensions
     * @return a regex that can be used to match a file extension to the list of passed in extensions
     */
    public static String extensionsToRegex(String extensions[]) {

        StringBuffer extensionRegex = new StringBuffer();

        for (int i = 0; i < extensions.length; i++) {

            if (i != 0) {
                extensionRegex.append("|");
            }

            extensionRegex.append("(?i:(.*[^a-zA-Z]|)" + extensions[i] + "([^a-zA-Z].*|))");
        }

        return extensionRegex.toString();

    }

    public static String getTomcatInstallDirectory() {
        File current = (new File(context.getRealPath("/")));

        while (!isTomcatDirectory(current)) {
            current = new File(current.getParentFile());
        }

        return current.getAbsolutePath();
    }

    private static boolean isTomcatDirectory(File file) {

        if (file.getName().equals("tomcat")) {
            return true;
        }

        return false;
    }

    public static String getWebappDirectory() {
        return (new File(context.getRealPath("/"))).getAbsolutePath();
    }

    public static String getJavaHome() {
        return System.getProperty("java.home");
    }

    /**
     * Utility to get the windows drive used for files
     * 
     * @return the Windows drive eg. c:/
     */
    public static String getFileSystemDrive() {

        String serverRoot = SettingsDao.getInstance().getSetting(Constants.serverRoot);

        return serverRoot.substring(0, serverRoot.indexOf("/") + 1);
    }
    
    public static String join(String parts[], String delimeter) {
        
        StringBuffer concat = new StringBuffer();
        
        for(int i=0; i<parts.length; i++) {
            
            if(i!=0) {
                concat.append(delimeter);
            }
            
            concat.append(parts[i]);
            
        }
        
        return concat.toString();
    }
    
    public static String[] removeItemFromArray(String[] list, int index) {
        
        ArrayList<String> newList = new ArrayList<String>();
        
        for(int i=0; i<list.length; i++) {
            if(i!=index) {
                newList.add(list[i]);
            }
        }
        
        return newList.toArray(new String[newList.size()]);
    }
    
    public static String getLeadingWhiteSpace(String str) {
        String rightTrim = str.replaceAll("\\s+$", "");
        String allTrim = str.trim();
        
        return str.substring(0, rightTrim.length() - allTrim.length());
    }
    
}
