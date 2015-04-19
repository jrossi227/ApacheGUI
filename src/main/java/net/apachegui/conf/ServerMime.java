package net.apachegui.conf;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.util.ArrayList;

import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import apache.conf.global.Utils;
import apache.conf.parser.DirectiveParser;
import apache.conf.parser.Parser;
import apache.conf.parser.File;

/**
 * Class used to add Mime types to apache configuration. Mimes can take the following format:
 * 
 * Server Mimes: MIME-type extension [extension] ... eg. application/pgp-signature asc sig
 * 
 **/

public class ServerMime extends Mime {

    public ServerMime(String type, String[] extensions) {
        super(type, extensions);
    }

    /**
     * Gets the file that is currently being used for server MIME types.
     * 
     * @return - the filesystem path of the server MIME file.
     * @throws Exception
     */
    public static String getServerMimeFile() throws Exception {
        String typesConfig[] = new DirectiveParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules()).getDirectiveValue(Constants.TYPES_CONFIG_DIRECTIVE, false);

        if (typesConfig.length > 0) {
            if ((!Utils.isWindows() && typesConfig[0].startsWith("/")) || (Utils.isWindows() && typesConfig[0].contains(":"))) {
                return typesConfig[0];
            } else {
                return new File(SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT), typesConfig[0]).getAbsolutePath();
            }
        } else {
            return new File(SettingsDao.getInstance().getSetting(Constants.CONF_DIRECTORY), "mime.types").getAbsolutePath();
        }
    }

    /**
     * Parses the server MIME file for all MIME types.
     * 
     * @return - an array with all of the configured server MIME types.
     * @throws Exception
     */
    public static ServerMime[] getAll() throws FileNotFoundException, Exception {
        FileInputStream fstream = new FileInputStream(ServerMime.getServerMimeFile());
        DataInputStream in = new DataInputStream(fstream);
        BufferedReader br = new BufferedReader(new InputStreamReader(in, "UTF-8"));

        ArrayList<ServerMime> mimes = new ArrayList<ServerMime>();

        String strLine;
        String parts[];
        String type;
        String extensions[];
        while ((strLine = br.readLine()) != null) {
            strLine = Utils.sanitizeLineSpaces(strLine);

            if (!Parser.isCommentMatch(strLine) && !strLine.equals("")) {
                parts = strLine.split(" ");

                type = parts[0];

                extensions = new String[parts.length - 1];
                for (int i = 1; i < parts.length; i++) {
                    extensions[i - 1] = parts[i];
                }

                mimes.add(new ServerMime(type, extensions));
            }
        }
        in.close();

        return mimes.toArray(new ServerMime[mimes.size()]);
    }
}
