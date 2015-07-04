package net.apachegui.docs;

import java.util.ArrayList;
import java.util.Arrays;

import net.apachegui.db.SettingsDao;
import net.apachegui.directives.DocumentRoot;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;

import org.apache.log4j.Logger;

import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Enclosure;
import apache.conf.parser.EnclosureParser;
import apache.conf.parser.File;

public class DocFiles {
    private static Logger log = Logger.getLogger(DocFiles.class);

    private static String[] savedDirectories = null;

    /**
     * Get all Directories defined by the apache Directory Enclosure and DocumentRoot directive. The directory will be excluded if the directory is equal to /
     * 
     * @return an Array with the path of all Directories defined by the apache Directory Enclosure and DocumentRoot directive. The directory will be excluded if the directory is equal to /
     * @throws Exception
     */
    public static String[] getDirectories() throws Exception {

        log.trace("DocFiles.getDirectories called Getting all directory enclosures");

        String serverRoot = net.apachegui.db.SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT);

        Enclosure directories[] = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getEnclosure(Constants.DIRECTORY_DIRECTIVE_STRING, true);

        ArrayList<String> docFiles = new ArrayList<String>();

        String directory;
        for (int i = 0; i < directories.length; i++) {
            // if(log.isTraceEnabled())
            directory = directories[i].getValue().replaceAll("\"", "");
            
            log.trace("docFile " + directory);

            log.trace("Checking if the directories value " + directory + " is not / and that the directory exists");
            if (!directory.trim().equals("/") && (new File(directory).exists())) {
                docFiles.add(new File(directory).getAbsolutePath());
            } else {
                log.trace("Check did not pass");
            }
        }

        // get DocumentRoot(s) here
        String documentRoots[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.DOCUMENT_ROOT_DIRECTIVE_STRING, true);

        String documentRoot;
        for (int i = 0; i < documentRoots.length; i++) {
            documentRoot = new DocumentRoot(documentRoots[i]).getValue();
            
            
            if ((!Utils.isWindows() && documentRoot.startsWith("/")) || (Utils.isWindows() && documentRoot.contains(":"))) {
                if (new File(documentRoot).exists()) {
                    docFiles.add(new File(documentRoot).getAbsolutePath());
                }
            } else {
                if (new File(serverRoot, documentRoot).exists()) {
                    docFiles.add(new File(serverRoot, documentRoot).getAbsolutePath());
                }
            }
        }

        Utils.removeDuplicates(docFiles);

        savedDirectories = docFiles.toArray(new String[docFiles.size()]);

        return savedDirectories;
    }

    private static String[] getSavedDirectories() throws Exception {
        if (savedDirectories == null) {
            getDirectories();
        }

        return savedDirectories;
    }

    /**
     * Used for Menu to get a nodes JSON.
     * 
     * @param path
     *            - the path of the target doc files.
     * @return the json with the file information of the target path
     * @throws Exception
     */
    public static String getNodeJson(String path) throws Exception {
        File targetDirectory = new File(path);
        File docDirectory = new File((Utils.isWindows() ? Utilities.getFileSystemDrive() : "/"));

        String documentDirectories[] = null;
        if (targetDirectory.equals(docDirectory)) {
            log.trace("refreshing directories");
            documentDirectories = getDirectories();
        } else {
            log.trace("loading saved directories");
            documentDirectories = getSavedDirectories();
        }

        StringBuffer result = new StringBuffer();
        result.append("{ id: '" + Constants.DOCUMENTS_ROOT + targetDirectory.getAbsolutePath() + "', name:'" + (targetDirectory.equals(docDirectory) ? "Documents" : targetDirectory.getName())
                + "', type:'Documents', children:[");

        java.io.File[] children = targetDirectory.listFiles();
        Arrays.sort(children);

        File child;
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (child.isDirectory()) {
                ArrayList<String> usedChildren = new ArrayList<String>();
                for (int j = 0; j < documentDirectories.length; j++) {
                    if ((Utils.isSubDirectory(new File(child.getAbsolutePath()), new File(documentDirectories[j])) || Utils.isSubDirectory(new File(documentDirectories[j]),
                            new File(child.getAbsolutePath())))
                            && (!usedChildren.contains(child.getAbsolutePath()))) {
                        result.append("{ $ref: '" + Constants.DOCUMENTS_ROOT + child.getAbsolutePath() + "', id:'" + Constants.DOCUMENTS_ROOT + child.getAbsolutePath() + "', type:'Documents', name: '"
                                + child.getName() + "', children: true},");
                        usedChildren.add(child.getAbsolutePath());
                    }
                }
            }
        }
        for (int i = 0; i < children.length; i++) {
            child = new File(children[i]);
            if (!child.isDirectory()) {
                ArrayList<String> usedChildren = new ArrayList<String>();
                for (int j = 0; j < documentDirectories.length; j++) {
                    if ((documentDirectories[j].startsWith(child.getAbsolutePath()) || child.getAbsolutePath().startsWith(documentDirectories[j])) && (!usedChildren.contains(child.getAbsolutePath()))) {
                        result.append("{ $ref: '" + Constants.DOCUMENTS_ROOT + child.getAbsolutePath() + "', id:'" + Constants.DOCUMENTS_ROOT + child.getAbsolutePath() + "', type:'Documents', name: '"
                                + child.getName() + "'},");
                        usedChildren.add(child.getAbsolutePath());
                    }
                }
            }
        }

        if (result.charAt(result.length() - 1) == ',') {
            result.deleteCharAt(result.length() - 1);
        }

        result.append("]}");
        return result.toString();
    }
}
