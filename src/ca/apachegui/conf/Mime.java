package ca.apachegui.conf;

/**
 * Class used to add Mime types to apache configuration. Mimes can take the following format:
 * 
 * Server Mimes: MIME-type extension [extension] ... eg. application/pgp-signature asc sig
 * 
 * Apache added Mimes:
 * 
 * AddType MIME-type extension [extension] ... eg. AddType application/x-gzip gz tgz
 * 
 *
 */

public class Mime {

    private String type;
    private String[] extensions;

    public Mime() {
        this.type = "";
        this.extensions = null;
    }

    public Mime(String type, String[] extensions) {
        this.type = type;
        this.extensions = extensions;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String[] getExtensions() {
        return extensions;
    }

    public void setExtensions(String[] extensions) {
        this.extensions = extensions;
    }

    @Override
    public boolean equals(Object addType) {
        Mime target = (Mime) addType;

        boolean equals = true;
        if (this.type.equals(target.getType())) {
            for (int i = 0; i < this.extensions.length; i++) {
                if (!this.extensions[i].equals(target.getExtensions()[i])) {
                    equals = false;
                    break;
                }
            }
        } else {
            equals = false;
        }

        return equals;
    }

}
