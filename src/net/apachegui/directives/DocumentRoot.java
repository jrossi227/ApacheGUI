package net.apachegui.directives;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.parser.DirectiveParser;

public class DocumentRoot extends GlobalSingletonDirective {

    private String directory;

    public DocumentRoot() {
        super(Constants.documentRootDirectiveString);

        this.directory = "";
    }

    /**
     * Creates a DocumentRoot object from the directive. The directive should conform to the following format:
     * 
     * DocumentRoot directory-path
     * 
     * @param directiveValue
     */
    public DocumentRoot(String directiveValue) {
        super(Constants.documentRootDirectiveString);

        //remove trailing and leading quotes
        this.directory = directiveValue.replaceAll("^\"|\"$", "");;
    }

    /**
     * @return the directory
     */
    public String getDirectory() {
        return directory;
    }

    /**
     * @param directory
     *            the directory to set
     */
    public void setDirectory(String directory) {
        this.directory = directory;
    }

    /**
     * Static function to get the current configured DocumentRoot in apache.
     * 
     * @return a Document object
     * @throws Exception
     */
    public static DocumentRoot getDocumentRoot() throws Exception {
        return (new DocumentRoot().getGlobalConfigured());
    }

    @Override
    public DocumentRoot getGlobalConfigured() throws Exception {
        String documentRoot[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.confFile), SettingsDao.getInstance().getSetting(Constants.serverRoot),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.documentRootDirectiveString, false);

        DocumentRoot documentRootFound = null;

        if (documentRoot.length == 0) {
            documentRootFound = new DocumentRoot();
        } else {
            documentRootFound = new DocumentRoot(documentRoot[0].trim());
        }

        return documentRootFound;
    }

    public String getValue() {
        return this.directory;
    }

    @Override
    public String toString() {
        return directiveName + " " + getValue();
    }

}
