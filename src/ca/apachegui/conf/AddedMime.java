package ca.apachegui.conf;

import java.util.ArrayList;

import ca.apachegui.globaldirectives.AddType;

/**
 * Class used to add Mime types to apache configuration. Mimes can take the following format:
 *
 * Apache added Mimes:
 * 
 * AddType MIME-type extension [extension] ... eg. AddType application/x-gzip gz tgz
 * 
 *
 */
public class AddedMime extends Mime {

    public AddedMime(String type, String[] extensions) {
        super(type, extensions);
    }

    /**
     * Parses the apache configuration for any AddType directives.
     * 
     * @return - an array with all of the currently configured AddTypes
     * @throws Exception
     */
    public static AddedMime[] getAll() throws Exception {
        AddType addTypes[] = AddType.getAllAddTypes();

        ArrayList<AddedMime> mimes = new ArrayList<AddedMime>();
        for (int i = 0; i < addTypes.length; i++) {
            mimes.add(new AddedMime(addTypes[i].getType(), addTypes[i].getExtensions()));
        }

        return mimes.toArray(new AddedMime[mimes.size()]);
    }

    /**
     * Adds an AddType directive to the configuration with the specified MIME. It first checks if a MIME exists with the same type, if it does it throws an exception.
     * 
     * @param mime
     *            - The mime to add to the configuration.
     * @throws Exception
     *             if a MIME currently exists with the same type.
     */
    public static void add(AddedMime mime) throws Exception {
        AddType addType = new AddType(mime.getType(), mime.getExtensions());

        AddType allAddTypes[] = AddType.getAllAddTypes();
        for (int i = 0; i < allAddTypes.length; i++) {
            if (allAddTypes[i].getType().toLowerCase().equals(addType.getType().toLowerCase())) {
                throw new Exception("The specified MIME type currently exists. Please edit the MIME type instead of adding it again.");
            }
        }

        addType.addToConfiguration(true, false);
    }

    /**
     * 
     * Searches for a MIME in the configuration with a matching type and updates the extensions.
     * 
     * @param mime
     *            - The mime to edit.
     * @throws Exception
     *             if there is no MIME found with the current type
     */
    public static void edit(AddedMime mime) throws Exception {
        AddType addType = new AddType(mime.getType(), mime.getExtensions());

        AddType allAddTypes[] = AddType.getAllAddTypes();
        boolean found = false;
        for (int i = 0; i < allAddTypes.length; i++) {
            if (allAddTypes[i].getType().toLowerCase().equals(addType.getType().toLowerCase())) {
                found = true;
            }
        }

        if (!found) {
            throw new Exception("The specified MIME type was not found in the configuration.");
        }

        addType.addToConfiguration(true, false);
    }

    /**
     * Removes a MIME from the configuration with a matching type.
     * 
     * @param mime
     *            - the MIME to remove.
     * @throws Exception
     */
    public static void remove(AddedMime mime) throws Exception {
        AddType addType = new AddType(mime.getType(), mime.getExtensions());
        addType.removeFromConfiguration(false);
    }
}
