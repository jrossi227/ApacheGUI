var net = (net || {});
net.apachegui = (net.apachegui || {});
net.apachegui.DIRECTIVES = {
    "acceptfilter": {
        "name": "AcceptFilter",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#acceptfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Configures optimizations for a Protocol's Listener Sockets"
            },
            {
                "name": "Syntax:",
                "value": "<code>AcceptFilter <var>protocol</var> <var>accept_filter</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "acceptpathinfo": {
        "name": "AcceptPathInfo",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#acceptpathinfo",
        "items": [
            {
                "name": "Description:",
                "value": "Resources accept trailing pathname information"
            },
            {
                "name": "Syntax:",
                "value": "<code>AcceptPathInfo On|Off|Default</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AcceptPathInfo Default</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "accessfilename": {
        "name": "AccessFileName",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#accessfilename",
        "items": [
            {
                "name": "Description:",
                "value": "Name of the distributed configuration file"
            },
            {
                "name": "Syntax:",
                "value": "<code>AccessFileName <var>filename</var> [<var>filename</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AccessFileName .htaccess</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "action": {
        "name": "Action",
        "href": "/ApacheGUI/manual/2.4/mod/mod_actions.html#action",
        "items": [
            {
                "name": "Description:",
                "value": "Activates a CGI script for a particular handler or\ncontent-type"
            },
            {
                "name": "Syntax:",
                "value": "<code>Action <var>action-type</var> <var>cgi-script</var> [virtual]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_actions"
            },
            {
                "name": "Compatibility:",
                "value": "The <code>virtual</code> modifier and handler passing were\nintroduced in Apache 2.1"
            }
        ]
    },
    "addalt": {
        "name": "AddAlt",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#addalt",
        "items": [
            {
                "name": "Description:",
                "value": "Alternate text to display for a file, instead of an\nicon selected by filename"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddAlt <var>string</var> <var>file</var> [<var>file</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "addaltbyencoding": {
        "name": "AddAltByEncoding",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#addaltbyencoding",
        "items": [
            {
                "name": "Description:",
                "value": "Alternate text to display for a file instead of an icon\nselected by MIME-encoding"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddAltByEncoding <var>string</var> <var>MIME-encoding</var>\n[<var>MIME-encoding</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "addaltbytype": {
        "name": "AddAltByType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#addaltbytype",
        "items": [
            {
                "name": "Description:",
                "value": "Alternate text to display for a file, instead of an\nicon selected by MIME content-type"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddAltByType <var>string</var> <var>MIME-type</var>\n[<var>MIME-type</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "addcharset": {
        "name": "AddCharset",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#addcharset",
        "items": [
            {
                "name": "Description:",
                "value": "Maps the given filename extensions to the specified content\ncharset"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddCharset <var>charset</var> <var>extension</var>\n[<var>extension</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "adddefaultcharset": {
        "name": "AddDefaultCharset",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#adddefaultcharset",
        "items": [
            {
                "name": "Description:",
                "value": "Default charset parameter to be added when a response\ncontent-type is <code>text/plain</code> or <code>text/html</code>"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddDefaultCharset On|Off|<var>charset</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AddDefaultCharset Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "adddescription": {
        "name": "AddDescription",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#adddescription",
        "items": [
            {
                "name": "Description:",
                "value": "Description to display for a file"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddDescription <var>string file</var> [<var>file</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "addencoding": {
        "name": "AddEncoding",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#addencoding",
        "items": [
            {
                "name": "Description:",
                "value": "Maps the given filename extensions to the specified encoding\ntype"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddEncoding <var>encoding</var> <var>extension</var>\n[<var>extension</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "addhandler": {
        "name": "AddHandler",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#addhandler",
        "items": [
            {
                "name": "Description:",
                "value": "Maps the filename extensions to the specified\nhandler"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddHandler <var>handler-name</var> <var>extension</var>\n[<var>extension</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "addicon": {
        "name": "AddIcon",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#addicon",
        "items": [
            {
                "name": "Description:",
                "value": "Icon to display for a file selected by name"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddIcon <var>icon</var> <var>name</var> [<var>name</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "addiconbyencoding": {
        "name": "AddIconByEncoding",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#addiconbyencoding",
        "items": [
            {
                "name": "Description:",
                "value": "Icon to display next to files selected by MIME\ncontent-encoding"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddIconByEncoding <var>icon</var> <var>MIME-encoding</var>\n[<var>MIME-encoding</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "addiconbytype": {
        "name": "AddIconByType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#addiconbytype",
        "items": [
            {
                "name": "Description:",
                "value": "Icon to display next to files selected by MIME\ncontent-type"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddIconByType <var>icon</var> <var>MIME-type</var>\n[<var>MIME-type</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "addinputfilter": {
        "name": "AddInputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#addinputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Maps filename extensions to the filters that will process\nclient requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddInputFilter <var>filter</var>[;<var>filter</var>...]\n<var>extension</var> [<var>extension</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "addlanguage": {
        "name": "AddLanguage",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#addlanguage",
        "items": [
            {
                "name": "Description:",
                "value": "Maps the given filename extension to the specified content\nlanguage"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddLanguage <var>language-tag</var> <var>extension</var>\n[<var>extension</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "addmoduleinfo": {
        "name": "AddModuleInfo",
        "href": "/ApacheGUI/manual/2.4/mod/mod_info.html#addmoduleinfo",
        "items": [
            {
                "name": "Description:",
                "value": "Adds additional information to the module\ninformation displayed by the server-info handler"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddModuleInfo <var>module-name</var> <var>string</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_info"
            }
        ]
    },
    "addoutputfilter": {
        "name": "AddOutputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#addoutputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Maps filename extensions to the filters that will process\nresponses from the server"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddOutputFilter <var>filter</var>[;<var>filter</var>...]\n<var>extension</var> [<var>extension</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "addoutputfilterbytype": {
        "name": "AddOutputFilterByType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_filter.html#addoutputfilterbytype",
        "items": [
            {
                "name": "Description:",
                "value": "assigns an output filter to a particular media-type"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddOutputFilterByType <var>filter</var>[;<var>filter</var>...]\n<var>media-type</var> [<var>media-type</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_filter"
            },
            {
                "name": "Compatibility:",
                "value": "Had severe limitations before\nbeing moved to <code class=\"module\"><a href=\"../mod/mod_filter.html\">mod_filter</a></code> in version 2.3.7"
            }
        ]
    },
    "addtype": {
        "name": "AddType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#addtype",
        "items": [
            {
                "name": "Description:",
                "value": "Maps the given filename extensions onto the specified content\ntype"
            },
            {
                "name": "Syntax:",
                "value": "<code>AddType <var>media-type</var> <var>extension</var>\n[<var>extension</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "alias": {
        "name": "Alias",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#alias",
        "items": [
            {
                "name": "Description:",
                "value": "Maps URLs to filesystem locations"
            },
            {
                "name": "Syntax:",
                "value": "<code>Alias <var>URL-path</var>\n<var>file-path</var>|<var>directory-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "aliasmatch": {
        "name": "AliasMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#aliasmatch",
        "items": [
            {
                "name": "Description:",
                "value": "Maps URLs to filesystem locations using regular\nexpressions"
            },
            {
                "name": "Syntax:",
                "value": "<code>AliasMatch <var>regex</var>\n<var>file-path</var>|<var>directory-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "allow": {
        "name": "Allow",
        "href": "/ApacheGUI/manual/2.4/mod/mod_access_compat.html#allow",
        "items": [
            {
                "name": "Description:",
                "value": "Controls which hosts can access an area of the\nserver"
            },
            {
                "name": "Syntax:",
                "value": "<code> Allow from all|<var>host</var>|env=[!]<var>env-variable</var>\n[<var>host</var>|env=[!]<var>env-variable</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Limit"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_access_compat"
            }
        ]
    },
    "allowconnect": {
        "name": "AllowCONNECT",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_connect.html#allowconnect",
        "items": [
            {
                "name": "Description:",
                "value": "Ports that are allowed to <code>CONNECT</code> through the\nproxy"
            },
            {
                "name": "Syntax:",
                "value": "<code>AllowCONNECT <var>port</var>[-<var>port</var>]\n[<var>port</var>[-<var>port</var>]] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AllowCONNECT 443 563</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_connect"
            },
            {
                "name": "Compatibility:",
                "value": "Moved from <code class=\"module\"><a href=\"../mod/mod_proxy.html\">mod_proxy</a></code> in Apache 2.3.5.\nPort ranges available since Apache 2.3.7."
            }
        ]
    },
    "allowencodedslashes": {
        "name": "AllowEncodedSlashes",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#allowencodedslashes",
        "items": [
            {
                "name": "Description:",
                "value": "Determines whether encoded path separators in URLs are allowed to\nbe passed through"
            },
            {
                "name": "Syntax:",
                "value": "<code>AllowEncodedSlashes On|Off|NoDecode</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AllowEncodedSlashes Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "\nNoDecode option available in 2.3.12 and later."
            }
        ]
    },
    "allowmethods": {
        "name": "AllowMethods",
        "href": "/ApacheGUI/manual/2.4/mod/mod_allowmethods.html#allowmethods",
        "items": [
            {
                "name": "Description:",
                "value": "Restrict access to the listed HTTP methods"
            },
            {
                "name": "Syntax:",
                "value": "<code>AllowMethods reset|<em>HTTP-method</em>\n[<em>HTTP-method</em>]...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AllowMethods reset</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_allowmethods"
            }
        ]
    },
    "allowoverride": {
        "name": "AllowOverride",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#allowoverride",
        "items": [
            {
                "name": "Description:",
                "value": "Types of directives that are allowed in\n<code>.htaccess</code> files"
            },
            {
                "name": "Syntax:",
                "value": "<code>AllowOverride All|None|<var>directive-type</var>\n[<var>directive-type</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AllowOverride None (2.3.9 and later), AllowOverride All (2.3.8 and earlier)</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "allowoverridelist": {
        "name": "AllowOverrideList",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#allowoverridelist",
        "items": [
            {
                "name": "Description:",
                "value": "Individual directives that are allowed in\n<code>.htaccess</code> files"
            },
            {
                "name": "Syntax:",
                "value": "<code>AllowOverrideList None|<var>directive</var>\n[<var>directive-type</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AllowOverrideList None</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "anonymous": {
        "name": "Anonymous",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_anon.html#anonymous",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies userIDs that are allowed access without\npassword verification"
            },
            {
                "name": "Syntax:",
                "value": "<code>Anonymous <var>user</var> [<var>user</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_anon"
            }
        ]
    },
    "anonymous_logemail": {
        "name": "Anonymous_LogEmail",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_anon.html#anonymous_logemail",
        "items": [
            {
                "name": "Description:",
                "value": "Sets whether the password entered will be logged in the\nerror log"
            },
            {
                "name": "Syntax:",
                "value": "<code>Anonymous_LogEmail On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Anonymous_LogEmail On</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_anon"
            }
        ]
    },
    "anonymous_mustgiveemail": {
        "name": "Anonymous_MustGiveEmail",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_anon.html#anonymous_mustgiveemail",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies whether blank passwords are allowed"
            },
            {
                "name": "Syntax:",
                "value": "<code>Anonymous_MustGiveEmail On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Anonymous_MustGiveEmail On</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_anon"
            }
        ]
    },
    "anonymous_nouserid": {
        "name": "Anonymous_NoUserID",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_anon.html#anonymous_nouserid",
        "items": [
            {
                "name": "Description:",
                "value": "Sets whether the userID field may be empty"
            },
            {
                "name": "Syntax:",
                "value": "<code>Anonymous_NoUserID On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Anonymous_NoUserID Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_anon"
            }
        ]
    },
    "anonymous_verifyemail": {
        "name": "Anonymous_VerifyEmail",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_anon.html#anonymous_verifyemail",
        "items": [
            {
                "name": "Description:",
                "value": "Sets whether to check the password field for a correctly\nformatted email address"
            },
            {
                "name": "Syntax:",
                "value": "<code>Anonymous_VerifyEmail On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Anonymous_VerifyEmail Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_anon"
            }
        ]
    },
    "asyncrequestworkerfactor": {
        "name": "AsyncRequestWorkerFactor",
        "href": "/ApacheGUI/manual/2.4/mod/event.html#asyncrequestworkerfactor",
        "items": [
            {
                "name": "Description:",
                "value": "Limit concurrent connections per process"
            },
            {
                "name": "Syntax:",
                "value": "<code>AsyncRequestWorkerFactor <var>factor</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>2</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "event"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.13 and later"
            }
        ]
    },
    "authbasicauthoritative": {
        "name": "AuthBasicAuthoritative",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_basic.html#authbasicauthoritative",
        "items": [
            {
                "name": "Description:",
                "value": "Sets whether authorization and authentication are passed to\nlower level modules"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthBasicAuthoritative On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthBasicAuthoritative On</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_basic"
            }
        ]
    },
    "authbasicfake": {
        "name": "AuthBasicFake",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_basic.html#authbasicfake",
        "items": [
            {
                "name": "Description:",
                "value": "Fake basic authentication using the given expressions for\nusername and password"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthBasicFake off|username [password]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_basic"
            },
            {
                "name": "Compatibility:",
                "value": "Apache HTTP Server 2.4.5 and later"
            }
        ]
    },
    "authbasicprovider": {
        "name": "AuthBasicProvider",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_basic.html#authbasicprovider",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the authentication provider(s) for this location"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthBasicProvider <var>provider-name</var>\n[<var>provider-name</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthBasicProvider file</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_basic"
            }
        ]
    },
    "authbasicusedigestalgorithm": {
        "name": "AuthBasicUseDigestAlgorithm",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_basic.html#authbasicusedigestalgorithm",
        "items": [
            {
                "name": "Description:",
                "value": "Check passwords against the authentication providers as if\nDigest Authentication was in force instead of Basic Authentication.\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthBasicUseDigestAlgorithm MD5|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthBasicUseDigestAlgorithm Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_basic"
            },
            {
                "name": "Compatibility:",
                "value": "Apache HTTP Server 2.4.7 and later"
            }
        ]
    },
    "authdbduserpwquery": {
        "name": "AuthDBDUserPWQuery",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_dbd.html#authdbduserpwquery",
        "items": [
            {
                "name": "Description:",
                "value": "SQL query to look up a password for a user"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDBDUserPWQuery <var>query</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_dbd"
            }
        ]
    },
    "authdbduserrealmquery": {
        "name": "AuthDBDUserRealmQuery",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_dbd.html#authdbduserrealmquery",
        "items": [
            {
                "name": "Description:",
                "value": "SQL query to look up a password hash for a user and realm.\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDBDUserRealmQuery <var>query</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_dbd"
            }
        ]
    },
    "authdbmgroupfile": {
        "name": "AuthDBMGroupFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_dbm.html#authdbmgroupfile",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the name of the database file containing the list\nof user groups for authorization"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDBMGroupFile <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authz_dbm"
            }
        ]
    },
    "authdbmtype": {
        "name": "AuthDBMType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_dbm.html#authdbmtype",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the type of database file that is used to\nstore passwords"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDBMType default|SDBM|GDBM|NDBM|DB</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthDBMType default</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_dbm"
            }
        ]
    },
    "authdbmuserfile": {
        "name": "AuthDBMUserFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_dbm.html#authdbmuserfile",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the name of a database file containing the list of users and\npasswords for authentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDBMUserFile <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authn_dbm"
            }
        ]
    },
    "authdigestalgorithm": {
        "name": "AuthDigestAlgorithm",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_digest.html#authdigestalgorithm",
        "items": [
            {
                "name": "Description:",
                "value": "Selects the algorithm used to calculate the challenge and\nresponse hashes in digest authentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDigestAlgorithm MD5|MD5-sess</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthDigestAlgorithm MD5</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_auth_digest"
            }
        ]
    },
    "authdigestdomain": {
        "name": "AuthDigestDomain",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_digest.html#authdigestdomain",
        "items": [
            {
                "name": "Description:",
                "value": "URIs that are in the same protection space for digest\nauthentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDigestDomain <var>URI</var> [<var>URI</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_auth_digest"
            }
        ]
    },
    "authdigestnoncelifetime": {
        "name": "AuthDigestNonceLifetime",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_digest.html#authdigestnoncelifetime",
        "items": [
            {
                "name": "Description:",
                "value": "How long the server nonce is valid"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDigestNonceLifetime <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthDigestNonceLifetime 300</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_auth_digest"
            }
        ]
    },
    "authdigestprovider": {
        "name": "AuthDigestProvider",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_digest.html#authdigestprovider",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the authentication provider(s) for this location"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDigestProvider <var>provider-name</var>\n[<var>provider-name</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthDigestProvider file</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_auth_digest"
            }
        ]
    },
    "authdigestqop": {
        "name": "AuthDigestQop",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_digest.html#authdigestqop",
        "items": [
            {
                "name": "Description:",
                "value": "Determines the quality-of-protection to use in digest\nauthentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDigestQop none|auth|auth-int [auth|auth-int]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthDigestQop auth</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_auth_digest"
            }
        ]
    },
    "authdigestshmemsize": {
        "name": "AuthDigestShmemSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_digest.html#authdigestshmemsize",
        "items": [
            {
                "name": "Description:",
                "value": "The amount of shared memory to allocate for keeping track\nof clients"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthDigestShmemSize <var>size</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthDigestShmemSize 1000</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_auth_digest"
            }
        ]
    },
    "authformauthoritative": {
        "name": "AuthFormAuthoritative",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformauthoritative",
        "items": [
            {
                "name": "Description:",
                "value": "Sets whether authorization and authentication are passed to\nlower level modules"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormAuthoritative On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthFormAuthoritative On</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            }
        ]
    },
    "authformbody": {
        "name": "AuthFormBody",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformbody",
        "items": [
            {
                "name": "Description:",
                "value": "The name of a form field carrying the body of the request to attempt on successful login"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormBody <var>fieldname</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>httpd_body</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformdisablenostore": {
        "name": "AuthFormDisableNoStore",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformdisablenostore",
        "items": [
            {
                "name": "Description:",
                "value": "Disable the CacheControl no-store header on the login page"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormDisableNoStore <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthFormDisableNoStore Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformfakebasicauth": {
        "name": "AuthFormFakeBasicAuth",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformfakebasicauth",
        "items": [
            {
                "name": "Description:",
                "value": "Fake a Basic Authentication header"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormFakeBasicAuth <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthFormFakeBasicAuth Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformlocation": {
        "name": "AuthFormLocation",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformlocation",
        "items": [
            {
                "name": "Description:",
                "value": "The name of a form field carrying a URL to redirect to on successful login"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormLocation <var>fieldname</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>httpd_location</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformloginrequiredlocation": {
        "name": "AuthFormLoginRequiredLocation",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformloginrequiredlocation",
        "items": [
            {
                "name": "Description:",
                "value": "The URL of the page to be redirected to should login be required"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormLoginRequiredLocation <var>url</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later. The use of the expression\nparser hass been added in 2.4.4."
            }
        ]
    },
    "authformloginsuccesslocation": {
        "name": "AuthFormLoginSuccessLocation",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformloginsuccesslocation",
        "items": [
            {
                "name": "Description:",
                "value": "The URL of the page to be redirected to should login be successful"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormLoginSuccessLocation <var>url</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later. The use of the expression\nparser hass been added in 2.4.4."
            }
        ]
    },
    "authformlogoutlocation": {
        "name": "AuthFormLogoutLocation",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformlogoutlocation",
        "items": [
            {
                "name": "Description:",
                "value": "The URL to redirect to after a user has logged out"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormLogoutLocation <var>uri</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later. The use of the expression\nparser hass been added in 2.4.4."
            }
        ]
    },
    "authformmethod": {
        "name": "AuthFormMethod",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformmethod",
        "items": [
            {
                "name": "Description:",
                "value": "The name of a form field carrying the method of the request to attempt on successful login"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormMethod <var>fieldname</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>httpd_method</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformmimetype": {
        "name": "AuthFormMimetype",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformmimetype",
        "items": [
            {
                "name": "Description:",
                "value": "The name of a form field carrying the mimetype of the body of the request to attempt on successful login"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormMimetype <var>fieldname</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>httpd_mimetype</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformpassword": {
        "name": "AuthFormPassword",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformpassword",
        "items": [
            {
                "name": "Description:",
                "value": "The name of a form field carrying the login password"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormPassword <var>fieldname</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>httpd_password</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformprovider": {
        "name": "AuthFormProvider",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformprovider",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the authentication provider(s) for this location"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormProvider <var>provider-name</var>\n[<var>provider-name</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthFormProvider file</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            }
        ]
    },
    "authformsitepassphrase": {
        "name": "AuthFormSitePassphrase",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformsitepassphrase",
        "items": [
            {
                "name": "Description:",
                "value": "Bypass authentication checks for high traffic sites"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormSitePassphrase <var>secret</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformsize": {
        "name": "AuthFormSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformsize",
        "items": [
            {
                "name": "Description:",
                "value": "The largest size of the form in bytes that will be parsed for the login details"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormSize <var>size</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>8192</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authformusername": {
        "name": "AuthFormUsername",
        "href": "/ApacheGUI/manual/2.4/mod/mod_auth_form.html#authformusername",
        "items": [
            {
                "name": "Description:",
                "value": "The name of a form field carrying the login username"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthFormUsername <var>fieldname</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>httpd_username</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_auth_form"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.0 and later"
            }
        ]
    },
    "authgroupfile": {
        "name": "AuthGroupFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_groupfile.html#authgroupfile",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the name of a text file containing the list\nof user groups for authorization"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthGroupFile <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_groupfile"
            }
        ]
    },
    "authldapauthorizeprefix": {
        "name": "AuthLDAPAuthorizePrefix",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapauthorizeprefix",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the prefix for environment variables set during\nauthorization"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPAuthorizePrefix <em>prefix</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPAuthorizePrefix AUTHORIZE_</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.6 and later"
            }
        ]
    },
    "authldapbindauthoritative": {
        "name": "AuthLDAPBindAuthoritative",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapbindauthoritative",
        "items": [
            {
                "name": "Description:",
                "value": "Determines if other authentication providers are used when a user can be mapped to a DN but the server cannot successfully bind with the user's credentials."
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPBindAuthoritative<em>off|on</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPBindAuthoritative on</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapbinddn": {
        "name": "AuthLDAPBindDN",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapbinddn",
        "items": [
            {
                "name": "Description:",
                "value": "Optional DN to use in binding to the LDAP server"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPBindDN <em>distinguished-name</em></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapbindpassword": {
        "name": "AuthLDAPBindPassword",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapbindpassword",
        "items": [
            {
                "name": "Description:",
                "value": "Password used in conjuction with the bind DN"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPBindPassword <em>password</em></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "<em>exec:</em> was added in 2.4.5."
            }
        ]
    },
    "authldapcharsetconfig": {
        "name": "AuthLDAPCharsetConfig",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapcharsetconfig",
        "items": [
            {
                "name": "Description:",
                "value": "Language to charset conversion configuration file"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPCharsetConfig <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapcompareasuser": {
        "name": "AuthLDAPCompareAsUser",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapcompareasuser",
        "items": [
            {
                "name": "Description:",
                "value": "Use the authenticated user's credentials to perform authorization comparisons"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPCompareAsUser on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPCompareAsUser off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.6 and later"
            }
        ]
    },
    "authldapcomparednonserver": {
        "name": "AuthLDAPCompareDNOnServer",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapcomparednonserver",
        "items": [
            {
                "name": "Description:",
                "value": "Use the LDAP server to compare the DNs"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPCompareDNOnServer on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPCompareDNOnServer on</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapdereferencealiases": {
        "name": "AuthLDAPDereferenceAliases",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapdereferencealiases",
        "items": [
            {
                "name": "Description:",
                "value": "When will the module de-reference aliases"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPDereferenceAliases never|searching|finding|always</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPDereferenceAliases always</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapgroupattribute": {
        "name": "AuthLDAPGroupAttribute",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapgroupattribute",
        "items": [
            {
                "name": "Description:",
                "value": "LDAP attributes used to identify the user members of\ngroups."
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPGroupAttribute <em>attribute</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPGroupAttribute member uniquemember</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapgroupattributeisdn": {
        "name": "AuthLDAPGroupAttributeIsDN",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapgroupattributeisdn",
        "items": [
            {
                "name": "Description:",
                "value": "Use the DN of the client username when checking for\ngroup membership"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPGroupAttributeIsDN on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPGroupAttributeIsDN on</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapinitialbindasuser": {
        "name": "AuthLDAPInitialBindAsUser",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapinitialbindasuser",
        "items": [
            {
                "name": "Description:",
                "value": "Determines if the server does the initial DN lookup using the basic authentication users'\nown username, instead of anonymously or with hard-coded credentials for the server"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPInitialBindAsUser <em>off|on</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPInitialBindAsUser off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.6 and later"
            }
        ]
    },
    "authldapinitialbindpattern": {
        "name": "AuthLDAPInitialBindPattern",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapinitialbindpattern",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the transformation of the basic authentication username to be used when binding to the LDAP server\nto perform a DN lookup"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPInitialBindPattern<em><var>regex</var> <var>substitution</var></em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPInitialBindPattern (.*) $1 (remote username used verbatim)</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.6 and later"
            }
        ]
    },
    "authldapmaxsubgroupdepth": {
        "name": "AuthLDAPMaxSubGroupDepth",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapmaxsubgroupdepth",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the maximum sub-group nesting depth that will be\nevaluated before the user search is discontinued."
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPMaxSubGroupDepth <var>Number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPMaxSubGroupDepth 10</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.0 and later"
            }
        ]
    },
    "authldapremoteuserattribute": {
        "name": "AuthLDAPRemoteUserAttribute",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapremoteuserattribute",
        "items": [
            {
                "name": "Description:",
                "value": "Use the value of the attribute returned during the user\nquery to set the REMOTE_USER environment variable"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPRemoteUserAttribute uid</code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapremoteuserisdn": {
        "name": "AuthLDAPRemoteUserIsDN",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapremoteuserisdn",
        "items": [
            {
                "name": "Description:",
                "value": "Use the DN of the client username to set the REMOTE_USER\nenvironment variable"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPRemoteUserIsDN on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPRemoteUserIsDN off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authldapsearchasuser": {
        "name": "AuthLDAPSearchAsUser",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapsearchasuser",
        "items": [
            {
                "name": "Description:",
                "value": "Use the authenticated user's credentials to perform authorization searches"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPSearchAsUser on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPSearchAsUser off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.6 and later"
            }
        ]
    },
    "authldapsubgroupattribute": {
        "name": "AuthLDAPSubGroupAttribute",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapsubgroupattribute",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the attribute labels, one value per\ndirective line, used to distinguish the members of the current group that\nare groups."
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPSubGroupAttribute <em>attribute</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPSubgroupAttribute member uniquemember</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.0 and later"
            }
        ]
    },
    "authldapsubgroupclass": {
        "name": "AuthLDAPSubGroupClass",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapsubgroupclass",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies which LDAP objectClass values identify directory\nobjects that are groups during sub-group processing."
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPSubGroupClass <em>LdapObjectClass</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthLDAPSubGroupClass groupOfNames groupOfUniqueNames</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.0 and later"
            }
        ]
    },
    "authldapurl": {
        "name": "AuthLDAPUrl",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_ldap.html#authldapurl",
        "items": [
            {
                "name": "Description:",
                "value": "URL specifying the LDAP search parameters"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthLDAPUrl <em>url [NONE|SSL|TLS|STARTTLS]</em></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_ldap"
            }
        ]
    },
    "authmerging": {
        "name": "AuthMerging",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_core.html#authmerging",
        "items": [
            {
                "name": "Description:",
                "value": "Controls the manner in which each configuration section's\nauthorization logic is combined with that of preceding configuration\nsections."
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthMerging Off | And | Or</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthMerging Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_core"
            }
        ]
    },
    "authname": {
        "name": "AuthName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_core.html#authname",
        "items": [
            {
                "name": "Description:",
                "value": "Authorization realm for use in HTTP\nauthentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthName <var>auth-domain</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_core"
            }
        ]
    },
    "authncachecontext": {
        "name": "AuthnCacheContext",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_socache.html#authncachecontext",
        "items": [
            {
                "name": "Description:",
                "value": "Specify a context string for use in the cache key"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthnCacheContext <var>directory|server|custom-string</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>directory</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_socache"
            }
        ]
    },
    "authncacheenable": {
        "name": "AuthnCacheEnable",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_socache.html#authncacheenable",
        "items": [
            {
                "name": "Description:",
                "value": "Enable Authn caching configured anywhere"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthnCacheEnable</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Override:",
                "value": "None"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_socache"
            }
        ]
    },
    "authncacheprovidefor": {
        "name": "AuthnCacheProvideFor",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_socache.html#authncacheprovidefor",
        "items": [
            {
                "name": "Description:",
                "value": "Specify which authn provider(s) to cache for"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthnCacheProvideFor <var>authn-provider</var> [...]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>None</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_socache"
            }
        ]
    },
    "authncachesocache": {
        "name": "AuthnCacheSOCache",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_socache.html#authncachesocache",
        "items": [
            {
                "name": "Description:",
                "value": "Select socache backend provider to use"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthnCacheSOCache <var>provider-name[:provider-args]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Override:",
                "value": "None"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_socache"
            },
            {
                "name": "Compatibility:",
                "value": "Optional provider arguments are available in\nApache HTTP Server 2.4.7 and later"
            }
        ]
    },
    "authncachetimeout": {
        "name": "AuthnCacheTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_socache.html#authncachetimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Set a timeout for cache entries"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthnCacheTimeout <var>timeout</var> (seconds)</code>"
            },
            {
                "name": "Default:",
                "value": "<code>300 (5 minutes)</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_socache"
            }
        ]
    },
    "authnprovideralias": {
        "name": "AuthnProviderAlias",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_core.html#authnprovideralias",
        "items": [
            {
                "name": "Description:",
                "value": "Enclose a group of directives that represent an\nextension of a base authentication provider and referenced by\nthe specified alias"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;AuthnProviderAlias <var>baseProvider Alias</var>&gt;\n... &lt;/AuthnProviderAlias&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_core"
            }
        ]
    },
    "authnzfcgicheckauthnprovider": {
        "name": "AuthnzFcgiCheckAuthnProvider",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_fcgi.html#authnzfcgicheckauthnprovider",
        "items": [
            {
                "name": "Description:",
                "value": "Enables a FastCGI application to handle the check_authn\nauthentication hook."
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthnzFcgiCheckAuthnProvider <em>provider-name</em>|<code>None</code>\n<em>option</em> ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_fcgi"
            }
        ]
    },
    "authnzfcgidefineprovider": {
        "name": "AuthnzFcgiDefineProvider",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authnz_fcgi.html#authnzfcgidefineprovider",
        "items": [
            {
                "name": "Description:",
                "value": "Defines a FastCGI application as a provider for\nauthentication and/or authorization"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthnzFcgiDefineProvider <em>type</em> <em>provider-name</em>\n<em>backend-address</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authnz_fcgi"
            }
        ]
    },
    "authtype": {
        "name": "AuthType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_core.html#authtype",
        "items": [
            {
                "name": "Description:",
                "value": "Type of user authentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthType None|Basic|Digest|Form</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_core"
            }
        ]
    },
    "authuserfile": {
        "name": "AuthUserFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authn_file.html#authuserfile",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the name of a text file containing the list of users and\npasswords for authentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthUserFile <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authn_file"
            }
        ]
    },
    "authzdbdlogintoreferer": {
        "name": "AuthzDBDLoginToReferer",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_dbd.html#authzdbdlogintoreferer",
        "items": [
            {
                "name": "Description:",
                "value": "Determines whether to redirect the Client to the Referring\npage on successful login or logout if a <code>Referer</code> request\nheader is present"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthzDBDLoginToReferer On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthzDBDLoginToReferer Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authz_dbd"
            }
        ]
    },
    "authzdbdquery": {
        "name": "AuthzDBDQuery",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_dbd.html#authzdbdquery",
        "items": [
            {
                "name": "Description:",
                "value": "Specify the SQL Query for the required operation"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthzDBDQuery <var>query</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authz_dbd"
            }
        ]
    },
    "authzdbdredirectquery": {
        "name": "AuthzDBDRedirectQuery",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_dbd.html#authzdbdredirectquery",
        "items": [
            {
                "name": "Description:",
                "value": "Specify a query to look up a login page for the user"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthzDBDRedirectQuery <var>query</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authz_dbd"
            }
        ]
    },
    "authzdbmtype": {
        "name": "AuthzDBMType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_dbm.html#authzdbmtype",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the type of database file that is used to\nstore list of user groups"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthzDBMType default|SDBM|GDBM|NDBM|DB</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthzDBMType default</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_authz_dbm"
            }
        ]
    },
    "authzprovideralias": {
        "name": "AuthzProviderAlias",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_core.html#authzprovideralias",
        "items": [
            {
                "name": "Description:",
                "value": "Enclose a group of directives that represent an\nextension of a base authorization provider and referenced by the specified\nalias"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;AuthzProviderAlias <var>baseProvider Alias Require-Parameters</var>&gt;\n... &lt;/AuthzProviderAlias&gt;\n</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_core"
            }
        ]
    },
    "authzsendforbiddenonfailure": {
        "name": "AuthzSendForbiddenOnFailure",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_core.html#authzsendforbiddenonfailure",
        "items": [
            {
                "name": "Description:",
                "value": "Send '403 FORBIDDEN' instead of '401 UNAUTHORIZED' if\nauthentication succeeds but authorization fails\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>AuthzSendForbiddenOnFailure On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>AuthzSendForbiddenOnFailure Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTPD 2.3.11 and later"
            }
        ]
    },
    "balancergrowth": {
        "name": "BalancerGrowth",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#balancergrowth",
        "items": [
            {
                "name": "Description:",
                "value": "Number of additional Balancers that can be added Post-configuration"
            },
            {
                "name": "Syntax:",
                "value": "<code>BalancerGrowth <var>#</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>BalancerGrowth 5</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "BalancerGrowth is only available in Apache HTTP Server 2.3.13\n  and later."
            }
        ]
    },
    "balancerinherit": {
        "name": "BalancerInherit",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#balancerinherit",
        "items": [
            {
                "name": "Description:",
                "value": "Inherit ProxyPassed Balancers/Workers from the main server"
            },
            {
                "name": "Syntax:",
                "value": "<code>BalancerInherit On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>BalancerInherit On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "BalancerInherit is only available in Apache HTTP Server 2.4.5 and later."
            }
        ]
    },
    "balancermember": {
        "name": "BalancerMember",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#balancermember",
        "items": [
            {
                "name": "Description:",
                "value": "Add a member to a load balancing group"
            },
            {
                "name": "Syntax:",
                "value": "<code>BalancerMember [<var>balancerurl</var>] <var>url</var> [<var>key=value [key=value ...]]</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "BalancerMember is only available in Apache HTTP Server 2.2\n        and later."
            }
        ]
    },
    "balancerpersist": {
        "name": "BalancerPersist",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#balancerpersist",
        "items": [
            {
                "name": "Description:",
                "value": "Attempt to persist changes made by the Balancer Manager across restarts."
            },
            {
                "name": "Syntax:",
                "value": "<code>BalancerPersist On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>BalancerPersist Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "BalancerPersist is only available in Apache HTTP Server 2.4.4 and later."
            }
        ]
    },
    "browsermatch": {
        "name": "BrowserMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_setenvif.html#browsermatch",
        "items": [
            {
                "name": "Description:",
                "value": "Sets environment variables conditional on HTTP User-Agent\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>BrowserMatch <em>regex [!]env-variable</em>[=<em>value</em>]\n[[!]<em>env-variable</em>[=<em>value</em>]] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_setenvif"
            }
        ]
    },
    "browsermatchnocase": {
        "name": "BrowserMatchNoCase",
        "href": "/ApacheGUI/manual/2.4/mod/mod_setenvif.html#browsermatchnocase",
        "items": [
            {
                "name": "Description:",
                "value": "Sets environment variables conditional on User-Agent without\nrespect to case"
            },
            {
                "name": "Syntax:",
                "value": "<code>BrowserMatchNoCase  <em>regex [!]env-variable</em>[=<em>value</em>]\n    [[!]<em>env-variable</em>[=<em>value</em>]] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_setenvif"
            }
        ]
    },
    "bufferedlogs": {
        "name": "BufferedLogs",
        "href": "/ApacheGUI/manual/2.4/mod/mod_log_config.html#bufferedlogs",
        "items": [
            {
                "name": "Description:",
                "value": "Buffer log entries in memory before writing to disk"
            },
            {
                "name": "Syntax:",
                "value": "<code>BufferedLogs On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>BufferedLogs Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_log_config"
            }
        ]
    },
    "buffersize": {
        "name": "BufferSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_buffer.html#buffersize",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum size in bytes to buffer by the buffer filter"
            },
            {
                "name": "Syntax:",
                "value": "<code>BufferSize integer</code>"
            },
            {
                "name": "Default:",
                "value": "<code>BufferSize 131072</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_buffer"
            }
        ]
    },
    "cachedefaultexpire": {
        "name": "CacheDefaultExpire",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachedefaultexpire",
        "items": [
            {
                "name": "Description:",
                "value": "The default duration to cache a document when no expiry date is specified."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheDefaultExpire <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheDefaultExpire 3600 (one hour)</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachedetailheader": {
        "name": "CacheDetailHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachedetailheader",
        "items": [
            {
                "name": "Description:",
                "value": "Add an X-Cache-Detail header to the response."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheDetailHeader <var>on|off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheDetailHeader off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.9 and later"
            }
        ]
    },
    "cachedirlength": {
        "name": "CacheDirLength",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_disk.html#cachedirlength",
        "items": [
            {
                "name": "Description:",
                "value": "The number of characters in subdirectory names"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheDirLength <var>length</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheDirLength 2</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_disk"
            }
        ]
    },
    "cachedirlevels": {
        "name": "CacheDirLevels",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_disk.html#cachedirlevels",
        "items": [
            {
                "name": "Description:",
                "value": "The number of levels of subdirectories in the\ncache."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheDirLevels <var>levels</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheDirLevels 2</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_disk"
            }
        ]
    },
    "cachedisable": {
        "name": "CacheDisable",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachedisable",
        "items": [
            {
                "name": "Description:",
                "value": "Disable caching of specified URLs"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheDisable <var>url-string</var> | <var>on</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cacheenable": {
        "name": "CacheEnable",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheenable",
        "items": [
            {
                "name": "Description:",
                "value": "Enable caching of specified URLs using a specified storage\nmanager"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheEnable <var>cache_type</var> [<var>url-string</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            },
            {
                "name": "Compatibility:",
                "value": "A url-string of '/' applied to forward proxy content in 2.2 and\n earlier."
            }
        ]
    },
    "cachefile": {
        "name": "CacheFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_file_cache.html#cachefile",
        "items": [
            {
                "name": "Description:",
                "value": "Cache a list of file handles at startup time"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheFile <var>file-path</var> [<var>file-path</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_file_cache"
            }
        ]
    },
    "cacheheader": {
        "name": "CacheHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheheader",
        "items": [
            {
                "name": "Description:",
                "value": "Add an X-Cache header to the response."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheHeader <var>on|off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheHeader off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.9 and later"
            }
        ]
    },
    "cacheignorecachecontrol": {
        "name": "CacheIgnoreCacheControl",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheignorecachecontrol",
        "items": [
            {
                "name": "Description:",
                "value": "Ignore request to not serve cached content to client"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheIgnoreCacheControl On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheIgnoreCacheControl Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cacheignoreheaders": {
        "name": "CacheIgnoreHeaders",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheignoreheaders",
        "items": [
            {
                "name": "Description:",
                "value": "Do not store the given HTTP header(s) in the cache.\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheIgnoreHeaders <var>header-string</var> [<var>header-string</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheIgnoreHeaders None</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cacheignorenolastmod": {
        "name": "CacheIgnoreNoLastMod",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheignorenolastmod",
        "items": [
            {
                "name": "Description:",
                "value": "Ignore the fact that a response has no Last Modified\nheader."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheIgnoreNoLastMod On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheIgnoreNoLastMod Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cacheignorequerystring": {
        "name": "CacheIgnoreQueryString",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheignorequerystring",
        "items": [
            {
                "name": "Description:",
                "value": "Ignore query string when caching"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheIgnoreQueryString On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheIgnoreQueryString Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cacheignoreurlsessionidentifiers": {
        "name": "CacheIgnoreURLSessionIdentifiers",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheignoreurlsessionidentifiers",
        "items": [
            {
                "name": "Description:",
                "value": "Ignore defined session identifiers encoded in the URL when caching\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheIgnoreURLSessionIdentifiers <var>identifier</var> [<var>identifier</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheIgnoreURLSessionIdentifiers None</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachekeybaseurl": {
        "name": "CacheKeyBaseURL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachekeybaseurl",
        "items": [
            {
                "name": "Description:",
                "value": "Override the base URL of reverse proxied cache keys."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheKeyBaseURL <var>URL</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheKeyBaseURL http://example.com</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.9 and later"
            }
        ]
    },
    "cachelastmodifiedfactor": {
        "name": "CacheLastModifiedFactor",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachelastmodifiedfactor",
        "items": [
            {
                "name": "Description:",
                "value": "The factor used to compute an expiry date based on the\nLastModified date."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheLastModifiedFactor <var>float</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheLastModifiedFactor 0.1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachelock": {
        "name": "CacheLock",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachelock",
        "items": [
            {
                "name": "Description:",
                "value": "Enable the thundering herd lock."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheLock <var>on|off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheLock off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.2.15 and later"
            }
        ]
    },
    "cachelockmaxage": {
        "name": "CacheLockMaxAge",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachelockmaxage",
        "items": [
            {
                "name": "Description:",
                "value": "Set the maximum possible age of a cache lock."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheLockMaxAge <var>integer</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheLockMaxAge 5</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachelockpath": {
        "name": "CacheLockPath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachelockpath",
        "items": [
            {
                "name": "Description:",
                "value": "Set the lock path directory."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheLockPath <var>directory</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheLockPath /tmp/mod_cache-lock</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachemaxexpire": {
        "name": "CacheMaxExpire",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachemaxexpire",
        "items": [
            {
                "name": "Description:",
                "value": "The maximum time in seconds to cache a document"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheMaxExpire <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheMaxExpire 86400 (one day)</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachemaxfilesize": {
        "name": "CacheMaxFileSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_disk.html#cachemaxfilesize",
        "items": [
            {
                "name": "Description:",
                "value": "The maximum size (in bytes) of a document to be placed in the\ncache"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheMaxFileSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheMaxFileSize 1000000</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_disk"
            }
        ]
    },
    "cacheminexpire": {
        "name": "CacheMinExpire",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cacheminexpire",
        "items": [
            {
                "name": "Description:",
                "value": "The minimum time in seconds to cache a document"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheMinExpire <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheMinExpire 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cacheminfilesize": {
        "name": "CacheMinFileSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_disk.html#cacheminfilesize",
        "items": [
            {
                "name": "Description:",
                "value": "The minimum size (in bytes) of a document to be placed in the\ncache"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheMinFileSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheMinFileSize 1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_disk"
            }
        ]
    },
    "cachenegotiateddocs": {
        "name": "CacheNegotiatedDocs",
        "href": "/ApacheGUI/manual/2.4/mod/mod_negotiation.html#cachenegotiateddocs",
        "items": [
            {
                "name": "Description:",
                "value": "Allows content-negotiated documents to be\ncached by proxy servers"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheNegotiatedDocs On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheNegotiatedDocs Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_negotiation"
            }
        ]
    },
    "cachequickhandler": {
        "name": "CacheQuickHandler",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachequickhandler",
        "items": [
            {
                "name": "Description:",
                "value": "Run the cache from the quick handler."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheQuickHandler <var>on|off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheQuickHandler on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            },
            {
                "name": "Compatibility:",
                "value": "Apache HTTP Server 2.3.3 and later"
            }
        ]
    },
    "cachereadsize": {
        "name": "CacheReadSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_disk.html#cachereadsize",
        "items": [
            {
                "name": "Description:",
                "value": "The minimum size (in bytes) of the document to read and be cached\n  before sending the data downstream"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheReadSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheReadSize 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_disk"
            }
        ]
    },
    "cachereadtime": {
        "name": "CacheReadTime",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_disk.html#cachereadtime",
        "items": [
            {
                "name": "Description:",
                "value": "The minimum time (in milliseconds) that should elapse while reading\n  before data is sent downstream"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheReadTime <var>milliseconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheReadTime 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_disk"
            }
        ]
    },
    "cacheroot": {
        "name": "CacheRoot",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_disk.html#cacheroot",
        "items": [
            {
                "name": "Description:",
                "value": "The directory root under which cache files are\nstored"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheRoot <var>directory</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_disk"
            }
        ]
    },
    "cachesocache": {
        "name": "CacheSocache",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_socache.html#cachesocache",
        "items": [
            {
                "name": "Description:",
                "value": "The shared object cache implementation to use"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheSocache <var>type[:args]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_socache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.4.5 and later"
            }
        ]
    },
    "cachesocachemaxsize": {
        "name": "CacheSocacheMaxSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_socache.html#cachesocachemaxsize",
        "items": [
            {
                "name": "Description:",
                "value": "The maximum size (in bytes) of an entry to be placed in the\ncache"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheSocacheMaxSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheSocacheMaxSize 102400</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_socache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.4.5 and later"
            }
        ]
    },
    "cachesocachemaxtime": {
        "name": "CacheSocacheMaxTime",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_socache.html#cachesocachemaxtime",
        "items": [
            {
                "name": "Description:",
                "value": "The maximum time (in seconds) for a document to be placed in the\ncache"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheSocacheMaxTime <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheSocacheMaxTime 86400</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_socache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.4.5 and later"
            }
        ]
    },
    "cachesocachemintime": {
        "name": "CacheSocacheMinTime",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_socache.html#cachesocachemintime",
        "items": [
            {
                "name": "Description:",
                "value": "The minimum time (in seconds) for a document to be placed in the\ncache"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheSocacheMinTime <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheSocacheMinTime 600</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_socache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.5 and later"
            }
        ]
    },
    "cachesocachereadsize": {
        "name": "CacheSocacheReadSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_socache.html#cachesocachereadsize",
        "items": [
            {
                "name": "Description:",
                "value": "The minimum size (in bytes) of the document to read and be cached\n  before sending the data downstream"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheSocacheReadSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheSocacheReadSize 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_socache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.4.5 and later"
            }
        ]
    },
    "cachesocachereadtime": {
        "name": "CacheSocacheReadTime",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache_socache.html#cachesocachereadtime",
        "items": [
            {
                "name": "Description:",
                "value": "The minimum time (in milliseconds) that should elapse while reading\n  before data is sent downstream"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheSocacheReadTime <var>milliseconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheSocacheReadTime 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache_socache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.4.5 and later"
            }
        ]
    },
    "cachestaleonerror": {
        "name": "CacheStaleOnError",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachestaleonerror",
        "items": [
            {
                "name": "Description:",
                "value": "Serve stale content in place of 5xx responses."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheStaleOnError <var>on|off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheStaleOnError on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.9 and later"
            }
        ]
    },
    "cachestoreexpired": {
        "name": "CacheStoreExpired",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachestoreexpired",
        "items": [
            {
                "name": "Description:",
                "value": "Attempt to cache responses that the server reports as expired"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheStoreExpired On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheStoreExpired Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachestorenostore": {
        "name": "CacheStoreNoStore",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachestorenostore",
        "items": [
            {
                "name": "Description:",
                "value": "Attempt to cache requests or responses that have been marked as no-store."
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheStoreNoStore On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheStoreNoStore Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cachestoreprivate": {
        "name": "CacheStorePrivate",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cache.html#cachestoreprivate",
        "items": [
            {
                "name": "Description:",
                "value": "Attempt to cache responses that the server has marked as private"
            },
            {
                "name": "Syntax:",
                "value": "<code>CacheStorePrivate On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CacheStorePrivate Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cache"
            }
        ]
    },
    "cgidscripttimeout": {
        "name": "CGIDScriptTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cgid.html#cgidscripttimeout",
        "items": [
            {
                "name": "Description:",
                "value": "The length of time to wait for more output from the\nCGI program"
            },
            {
                "name": "Syntax:",
                "value": "<code>CGIDScriptTimeout <var>time</var>[s|ms]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>value of <code class=\"directive\"><a href=\"../mod/core.html#timeout\">Timeout</a></code> directive when \nunset</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_cgid"
            },
            {
                "name": "Compatibility:",
                "value": "CGIDScriptTimeout defaults to zero in releases 2.4 and earlier\n"
            }
        ]
    },
    "cgimapextension": {
        "name": "CGIMapExtension",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#cgimapextension",
        "items": [
            {
                "name": "Description:",
                "value": "Technique for locating the interpreter for CGI\nscripts"
            },
            {
                "name": "Syntax:",
                "value": "<code>CGIMapExtension <var>cgi-path</var> <var>.extension</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "NetWare only"
            }
        ]
    },
    "charsetdefault": {
        "name": "CharsetDefault",
        "href": "/ApacheGUI/manual/2.4/mod/mod_charset_lite.html#charsetdefault",
        "items": [
            {
                "name": "Description:",
                "value": "Charset to translate into"
            },
            {
                "name": "Syntax:",
                "value": "<code>CharsetDefault <var>charset</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_charset_lite"
            }
        ]
    },
    "charsetoptions": {
        "name": "CharsetOptions",
        "href": "/ApacheGUI/manual/2.4/mod/mod_charset_lite.html#charsetoptions",
        "items": [
            {
                "name": "Description:",
                "value": "Configures charset translation behavior"
            },
            {
                "name": "Syntax:",
                "value": "<code>CharsetOptions <var>option</var> [<var>option</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CharsetOptions ImplicitAdd</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_charset_lite"
            }
        ]
    },
    "charsetsourceenc": {
        "name": "CharsetSourceEnc",
        "href": "/ApacheGUI/manual/2.4/mod/mod_charset_lite.html#charsetsourceenc",
        "items": [
            {
                "name": "Description:",
                "value": "Source charset of files"
            },
            {
                "name": "Syntax:",
                "value": "<code>CharsetSourceEnc <var>charset</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_charset_lite"
            }
        ]
    },
    "checkcaseonly": {
        "name": "CheckCaseOnly",
        "href": "/ApacheGUI/manual/2.4/mod/mod_speling.html#checkcaseonly",
        "items": [
            {
                "name": "Description:",
                "value": "Limits the action of the speling module to case corrections"
            },
            {
                "name": "Syntax:",
                "value": "<code>CheckCaseOnly on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CheckCaseOnly Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_speling"
            }
        ]
    },
    "checkspelling": {
        "name": "CheckSpelling",
        "href": "/ApacheGUI/manual/2.4/mod/mod_speling.html#checkspelling",
        "items": [
            {
                "name": "Description:",
                "value": "Enables the spelling\nmodule"
            },
            {
                "name": "Syntax:",
                "value": "<code>CheckSpelling on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CheckSpelling Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_speling"
            }
        ]
    },
    "chrootdir": {
        "name": "ChrootDir",
        "href": "/ApacheGUI/manual/2.4/mod/mod_unixd.html#chrootdir",
        "items": [
            {
                "name": "Description:",
                "value": "Directory for apache to run chroot(8) after startup."
            },
            {
                "name": "Syntax:",
                "value": "<code>ChrootDir <var>/path/to/directory</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/mod_unixd.html\">mod_unixd</a></code>"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.2.10 and later"
            }
        ]
    },
    "contentdigest": {
        "name": "ContentDigest",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#contentdigest",
        "items": [
            {
                "name": "Description:",
                "value": "Enables the generation of <code>Content-MD5</code> HTTP Response\nheaders"
            },
            {
                "name": "Syntax:",
                "value": "<code>ContentDigest On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ContentDigest Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "cookiedomain": {
        "name": "CookieDomain",
        "href": "/ApacheGUI/manual/2.4/mod/mod_usertrack.html#cookiedomain",
        "items": [
            {
                "name": "Description:",
                "value": "The domain to which the tracking cookie applies"
            },
            {
                "name": "Syntax:",
                "value": "<code>CookieDomain <em>domain</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_usertrack"
            }
        ]
    },
    "cookieexpires": {
        "name": "CookieExpires",
        "href": "/ApacheGUI/manual/2.4/mod/mod_usertrack.html#cookieexpires",
        "items": [
            {
                "name": "Description:",
                "value": "Expiry time for the tracking cookie"
            },
            {
                "name": "Syntax:",
                "value": "<code>CookieExpires <em>expiry-period</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_usertrack"
            }
        ]
    },
    "cookiename": {
        "name": "CookieName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_usertrack.html#cookiename",
        "items": [
            {
                "name": "Description:",
                "value": "Name of the tracking cookie"
            },
            {
                "name": "Syntax:",
                "value": "<code>CookieName <em>token</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CookieName Apache</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_usertrack"
            }
        ]
    },
    "cookiestyle": {
        "name": "CookieStyle",
        "href": "/ApacheGUI/manual/2.4/mod/mod_usertrack.html#cookiestyle",
        "items": [
            {
                "name": "Description:",
                "value": "Format of the cookie header field"
            },
            {
                "name": "Syntax:",
                "value": "<code>CookieStyle\n    <em>Netscape|Cookie|Cookie2|RFC2109|RFC2965</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>CookieStyle Netscape</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_usertrack"
            }
        ]
    },
    "cookietracking": {
        "name": "CookieTracking",
        "href": "/ApacheGUI/manual/2.4/mod/mod_usertrack.html#cookietracking",
        "items": [
            {
                "name": "Description:",
                "value": "Enables tracking cookie"
            },
            {
                "name": "Syntax:",
                "value": "<code>CookieTracking on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>CookieTracking off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_usertrack"
            }
        ]
    },
    "coredumpdirectory": {
        "name": "CoreDumpDirectory",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#coredumpdirectory",
        "items": [
            {
                "name": "Description:",
                "value": "Directory where Apache HTTP Server attempts to\nswitch before dumping core"
            },
            {
                "name": "Syntax:",
                "value": "<code>CoreDumpDirectory <var>directory</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for the default setting</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "customlog": {
        "name": "CustomLog",
        "href": "/ApacheGUI/manual/2.4/mod/mod_log_config.html#customlog",
        "items": [
            {
                "name": "Description:",
                "value": "Sets filename and format of log file"
            },
            {
                "name": "Syntax:",
                "value": "<code>CustomLog  <var>file</var>|<var>pipe</var>\n<var>format</var>|<var>nickname</var>\n[env=[!]<var>environment-variable</var>|\nexpr=<var>expression</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_log_config"
            }
        ]
    },
    "dav": {
        "name": "Dav",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dav.html#dav",
        "items": [
            {
                "name": "Description:",
                "value": "Enable WebDAV HTTP methods"
            },
            {
                "name": "Syntax:",
                "value": "<code>Dav On|Off|<var>provider-name</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>Dav Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dav"
            }
        ]
    },
    "davdepthinfinity": {
        "name": "DavDepthInfinity",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dav.html#davdepthinfinity",
        "items": [
            {
                "name": "Description:",
                "value": "Allow PROPFIND, Depth: Infinity requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>DavDepthInfinity on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DavDepthInfinity off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dav"
            }
        ]
    },
    "davgenericlockdb": {
        "name": "DavGenericLockDB",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dav_lock.html#davgenericlockdb",
        "items": [
            {
                "name": "Description:",
                "value": "Location of the DAV lock database"
            },
            {
                "name": "Syntax:",
                "value": "<code>DavGenericLockDB <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dav_lock"
            }
        ]
    },
    "davlockdb": {
        "name": "DavLockDB",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dav_fs.html#davlockdb",
        "items": [
            {
                "name": "Description:",
                "value": "Location of the DAV lock database"
            },
            {
                "name": "Syntax:",
                "value": "<code>DavLockDB <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dav_fs"
            }
        ]
    },
    "davmintimeout": {
        "name": "DavMinTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dav.html#davmintimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Minimum amount of time the server holds a lock on\na DAV resource"
            },
            {
                "name": "Syntax:",
                "value": "<code>DavMinTimeout <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DavMinTimeout 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dav"
            }
        ]
    },
    "dbdexptime": {
        "name": "DBDExptime",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdexptime",
        "items": [
            {
                "name": "Description:",
                "value": "Keepalive time for idle connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDExptime <var>time-in-seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DBDExptime 300</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdinitsql": {
        "name": "DBDInitSQL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdinitsql",
        "items": [
            {
                "name": "Description:",
                "value": "Execute an SQL statement after connecting to a database"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDInitSQL <var>\"SQL statement\"</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdkeep": {
        "name": "DBDKeep",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdkeep",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum sustained number of connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDKeep <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DBDKeep 2</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdmax": {
        "name": "DBDMax",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdmax",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum number of connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDMax <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DBDMax 10</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdmin": {
        "name": "DBDMin",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdmin",
        "items": [
            {
                "name": "Description:",
                "value": "Minimum number of connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDMin <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DBDMin 1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdparams": {
        "name": "DBDParams",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdparams",
        "items": [
            {
                "name": "Description:",
                "value": "Parameters for database connection"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDParams\n<var>param1</var>=<var>value1</var>[,<var>param2</var>=<var>value2</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdpersist": {
        "name": "DBDPersist",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdpersist",
        "items": [
            {
                "name": "Description:",
                "value": "Whether to use persistent connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDPersist On|Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdpreparesql": {
        "name": "DBDPrepareSQL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdpreparesql",
        "items": [
            {
                "name": "Description:",
                "value": "Define an SQL prepared statement"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDPrepareSQL <var>\"SQL statement\"</var> <var>label</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "dbdriver": {
        "name": "DBDriver",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dbd.html#dbdriver",
        "items": [
            {
                "name": "Description:",
                "value": "Specify an SQL driver"
            },
            {
                "name": "Syntax:",
                "value": "<code>DBDriver <var>name</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dbd"
            }
        ]
    },
    "defaulticon": {
        "name": "DefaultIcon",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#defaulticon",
        "items": [
            {
                "name": "Description:",
                "value": "Icon to display for files when no specific icon is\nconfigured"
            },
            {
                "name": "Syntax:",
                "value": "<code>DefaultIcon <var>url-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "defaultlanguage": {
        "name": "DefaultLanguage",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#defaultlanguage",
        "items": [
            {
                "name": "Description:",
                "value": "Defines a default language-tag to be sent in the Content-Language\nheader field for all resources in the current context that have not been\nassigned a language-tag by some other means."
            },
            {
                "name": "Syntax:",
                "value": "<code>DefaultLanguage <var>language-tag</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "defaultruntimedir": {
        "name": "DefaultRuntimeDir",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#defaultruntimedir",
        "items": [
            {
                "name": "Description:",
                "value": "Base directory for the server run-time files"
            },
            {
                "name": "Syntax:",
                "value": "<code>DefaultRuntimeDir <var>directory-path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DefaultRuntimeDir DEFAULT_REL_RUNTIMEDIR (logs/)</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.4.2 and later"
            }
        ]
    },
    "defaulttype": {
        "name": "DefaultType",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#defaulttype",
        "items": [
            {
                "name": "Description:",
                "value": "This directive has no effect other than to emit warnings\nif the value is not <code>none</code>. In prior versions, DefaultType\nwould specify a default media type to assign to response content for\nwhich no other media type configuration could be found.\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>DefaultType <var>media-type|none</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DefaultType none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "The argument <code>none</code> is available in Apache httpd 2.2.7 and later.  All other choices are DISABLED for 2.3.x and later."
            }
        ]
    },
    "define": {
        "name": "Define",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#define",
        "items": [
            {
                "name": "Description:",
                "value": "Define a variable"
            },
            {
                "name": "Syntax:",
                "value": "<code>Define <var>parameter-name</var> [<var>parameter-value</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "deflatebuffersize": {
        "name": "DeflateBufferSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflatebuffersize",
        "items": [
            {
                "name": "Description:",
                "value": "Fragment size to be compressed at one time by zlib"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateBufferSize <var>value</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DeflateBufferSize 8096</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            }
        ]
    },
    "deflatecompressionlevel": {
        "name": "DeflateCompressionLevel",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflatecompressionlevel",
        "items": [
            {
                "name": "Description:",
                "value": "How much compression do we apply to the output"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateCompressionLevel <var>value</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>Zlib's default</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            }
        ]
    },
    "deflatefilternote": {
        "name": "DeflateFilterNote",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflatefilternote",
        "items": [
            {
                "name": "Description:",
                "value": "Places the compression ratio in a note for logging"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateFilterNote [<var>type</var>] <var>notename</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            }
        ]
    },
    "deflateinflatelimitrequestbody": {
        "name": "DeflateInflateLimitRequestBody",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflateinflatelimitrequestbody",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum size of inflated request bodies"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateInflateLimitRequestBody<var>value</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>None, but LimitRequestBody applies after deflation</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.10 and later"
            }
        ]
    },
    "deflateinflateratioburst": {
        "name": "DeflateInflateRatioBurst",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflateinflateratioburst",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum number of times the inflation ratio for request bodies \n             can be crossed"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateInflateRatioBurst <var>value</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>3</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.10 and later"
            }
        ]
    },
    "deflateinflateratiolimit": {
        "name": "DeflateInflateRatioLimit",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflateinflateratiolimit",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum inflation ratio for request bodies"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateInflateRatioLimit <var>value</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>200</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.10 and later"
            }
        ]
    },
    "deflatememlevel": {
        "name": "DeflateMemLevel",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflatememlevel",
        "items": [
            {
                "name": "Description:",
                "value": "How much memory should be used by zlib for compression"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateMemLevel <var>value</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DeflateMemLevel 9</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            }
        ]
    },
    "deflatewindowsize": {
        "name": "DeflateWindowSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_deflate.html#deflatewindowsize",
        "items": [
            {
                "name": "Description:",
                "value": "Zlib compression window size"
            },
            {
                "name": "Syntax:",
                "value": "<code>DeflateWindowSize <var>value</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DeflateWindowSize 15</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_deflate"
            }
        ]
    },
    "deny": {
        "name": "Deny",
        "href": "/ApacheGUI/manual/2.4/mod/mod_access_compat.html#deny",
        "items": [
            {
                "name": "Description:",
                "value": "Controls which hosts are denied access to the\nserver"
            },
            {
                "name": "Syntax:",
                "value": "<code> Deny from all|<var>host</var>|env=[!]<var>env-variable</var>\n[<var>host</var>|env=[!]<var>env-variable</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Limit"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_access_compat"
            }
        ]
    },
    "directory": {
        "name": "Directory",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#directory",
        "items": [
            {
                "name": "Description:",
                "value": "Enclose a group of directives that apply only to the\nnamed file-system directory, sub-directories, and their contents."
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;Directory <var>directory-path</var>&gt;\n... &lt;/Directory&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "directorycheckhandler": {
        "name": "DirectoryCheckHandler",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dir.html#directorycheckhandler",
        "items": [
            {
                "name": "Description:",
                "value": "Toggle how this module responds when another handler is configured"
            },
            {
                "name": "Syntax:",
                "value": "<code>DirectoryCheckHandler On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DirectoryCheckHandler Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_dir"
            },
            {
                "name": "Compatibility:",
                "value": "Available in 2.4.8 and later.  Releases prior to 2.4 implicitly\nact as if \"DirectoryCheckHandler ON\" was specified."
            }
        ]
    },
    "directoryindex": {
        "name": "DirectoryIndex",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dir.html#directoryindex",
        "items": [
            {
                "name": "Description:",
                "value": "List of resources to look for when the client requests\na directory"
            },
            {
                "name": "Syntax:",
                "value": "<code>DirectoryIndex\n    disabled | <var>local-url</var> [<var>local-url</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DirectoryIndex index.html</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_dir"
            }
        ]
    },
    "directoryindexredirect": {
        "name": "DirectoryIndexRedirect",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dir.html#directoryindexredirect",
        "items": [
            {
                "name": "Description:",
                "value": "Configures an external redirect for directory indexes.\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>DirectoryIndexRedirect on | off | permanent | temp | seeother |\n<var>3xx-code</var>\n</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DirectoryIndexRedirect off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_dir"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.14 and later"
            }
        ]
    },
    "directorymatch": {
        "name": "DirectoryMatch",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#directorymatch",
        "items": [
            {
                "name": "Description:",
                "value": "Enclose directives that apply to\nthe contents of file-system directories matching a regular expression."
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;DirectoryMatch <var>regex</var>&gt;\n... &lt;/DirectoryMatch&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "directoryslash": {
        "name": "DirectorySlash",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dir.html#directoryslash",
        "items": [
            {
                "name": "Description:",
                "value": "Toggle trailing slash redirects on or off"
            },
            {
                "name": "Syntax:",
                "value": "<code>DirectorySlash On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DirectorySlash On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_dir"
            }
        ]
    },
    "documentroot": {
        "name": "DocumentRoot",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#documentroot",
        "items": [
            {
                "name": "Description:",
                "value": "Directory that forms the main document tree visible\nfrom the web"
            },
            {
                "name": "Syntax:",
                "value": "<code>DocumentRoot <var>directory-path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>DocumentRoot /usr/local/apache/htdocs</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "dtraceprivileges": {
        "name": "DTracePrivileges",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#dtraceprivileges",
        "items": [
            {
                "name": "Description:",
                "value": "Determines whether the privileges required by dtrace are enabled."
            },
            {
                "name": "Syntax:",
                "value": "<code>DTracePrivileges On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DTracePrivileges Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)."
            }
        ]
    },
    "dumpioinput": {
        "name": "DumpIOInput",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dumpio.html#dumpioinput",
        "items": [
            {
                "name": "Description:",
                "value": "Dump all input data to the error log"
            },
            {
                "name": "Syntax:",
                "value": "<code>DumpIOInput On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DumpIOInput Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dumpio"
            },
            {
                "name": "Compatibility:",
                "value": "DumpIOInput is only available in Apache 2.1.3 and\nlater."
            }
        ]
    },
    "dumpiooutput": {
        "name": "DumpIOOutput",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dumpio.html#dumpiooutput",
        "items": [
            {
                "name": "Description:",
                "value": "Dump all output data to the error log"
            },
            {
                "name": "Syntax:",
                "value": "<code>DumpIOOutput On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>DumpIOOutput Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_dumpio"
            },
            {
                "name": "Compatibility:",
                "value": "DumpIOOutput is only available in Apache 2.1.3 and\nlater."
            }
        ]
    },
    "else": {
        "name": "Else",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#else",
        "items": [
            {
                "name": "Description:",
                "value": "Contains directives that apply only if the condition of a\nprevious <code class=\"directive\"><a href=\"#if\">&lt;If&gt;</a></code> or\n<code class=\"directive\"><a href=\"#elseif\">&lt;ElseIf&gt;</a></code> section is not\nsatisfied by a request at runtime"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;Else&gt; ... &lt;/Else&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "elseif": {
        "name": "ElseIf",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#elseif",
        "items": [
            {
                "name": "Description:",
                "value": "Contains directives that apply only if a condition is satisfied\nby a request at runtime while the condition of a previous\n<code class=\"directive\"><a href=\"#if\">&lt;If&gt;</a></code> or\n<code class=\"directive\">&lt;ElseIf&gt;</code> section is not\nsatisfied"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;ElseIf <var>expression</var>&gt; ... &lt;/ElseIf&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "enableexceptionhook": {
        "name": "EnableExceptionHook",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#enableexceptionhook",
        "items": [
            {
                "name": "Description:",
                "value": "Enables a hook that runs exception handlers\nafter a crash"
            },
            {
                "name": "Syntax:",
                "value": "<code>EnableExceptionHook On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>EnableExceptionHook Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "enablemmap": {
        "name": "EnableMMAP",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#enablemmap",
        "items": [
            {
                "name": "Description:",
                "value": "Use memory-mapping to read files during delivery"
            },
            {
                "name": "Syntax:",
                "value": "<code>EnableMMAP On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>EnableMMAP On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "enablesendfile": {
        "name": "EnableSendfile",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#enablesendfile",
        "items": [
            {
                "name": "Description:",
                "value": "Use the kernel sendfile support to deliver files to the client"
            },
            {
                "name": "Syntax:",
                "value": "<code>EnableSendfile On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>EnableSendfile Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Default changed to Off in\nversion 2.3.9."
            }
        ]
    },
    "error": {
        "name": "Error",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#error",
        "items": [
            {
                "name": "Description:",
                "value": "Abort configuration parsing with a custom error message"
            },
            {
                "name": "Syntax:",
                "value": "<code>Error <var>message</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "2.3.9 and later"
            }
        ]
    },
    "errordocument": {
        "name": "ErrorDocument",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#errordocument",
        "items": [
            {
                "name": "Description:",
                "value": "What the server will return to the client\nin case of an error"
            },
            {
                "name": "Syntax:",
                "value": "<code>ErrorDocument <var>error-code</var> <var>document</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "errorlog": {
        "name": "ErrorLog",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#errorlog",
        "items": [
            {
                "name": "Description:",
                "value": "Location where the server will log errors"
            },
            {
                "name": "Syntax:",
                "value": "<code> ErrorLog <var>file-path</var>|syslog[:<var>facility</var>]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ErrorLog logs/error_log (Unix) ErrorLog logs/error.log (Windows and OS/2)</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "errorlogformat": {
        "name": "ErrorLogFormat",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#errorlogformat",
        "items": [
            {
                "name": "Description:",
                "value": "Format specification for error log entries"
            },
            {
                "name": "Syntax:",
                "value": "<code> ErrorLogFormat [connection|request] <var>format</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "example": {
        "name": "Example",
        "href": "/ApacheGUI/manual/2.4/mod/mod_example_hooks.html#example",
        "items": [
            {
                "name": "Description:",
                "value": "Demonstration directive to illustrate the Apache module\nAPI"
            },
            {
                "name": "Syntax:",
                "value": "<code>Example</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_example_hooks"
            }
        ]
    },
    "expiresactive": {
        "name": "ExpiresActive",
        "href": "/ApacheGUI/manual/2.4/mod/mod_expires.html#expiresactive",
        "items": [
            {
                "name": "Description:",
                "value": "Enables generation of <code>Expires</code>\nheaders"
            },
            {
                "name": "Syntax:",
                "value": "<code>ExpiresActive On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ExpiresActive Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_expires"
            }
        ]
    },
    "expiresbytype": {
        "name": "ExpiresByType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_expires.html#expiresbytype",
        "items": [
            {
                "name": "Description:",
                "value": "Value of the <code>Expires</code> header configured\nby MIME type"
            },
            {
                "name": "Syntax:",
                "value": "<code>ExpiresByType <var>MIME-type</var>\n<var>&lt;code&gt;seconds</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_expires"
            }
        ]
    },
    "expiresdefault": {
        "name": "ExpiresDefault",
        "href": "/ApacheGUI/manual/2.4/mod/mod_expires.html#expiresdefault",
        "items": [
            {
                "name": "Description:",
                "value": "Default algorithm for calculating expiration time"
            },
            {
                "name": "Syntax:",
                "value": "<code>ExpiresDefault <var>&lt;code&gt;seconds</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_expires"
            }
        ]
    },
    "extendedstatus": {
        "name": "ExtendedStatus",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#extendedstatus",
        "items": [
            {
                "name": "Description:",
                "value": "Keep track of extended status information for each\nrequest"
            },
            {
                "name": "Syntax:",
                "value": "<code>ExtendedStatus On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ExtendedStatus Off[*]</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "extfilterdefine": {
        "name": "ExtFilterDefine",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ext_filter.html#extfilterdefine",
        "items": [
            {
                "name": "Description:",
                "value": "Define an external filter"
            },
            {
                "name": "Syntax:",
                "value": "<code>ExtFilterDefine <var>filtername</var> <var>parameters</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ext_filter"
            }
        ]
    },
    "extfilteroptions": {
        "name": "ExtFilterOptions",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ext_filter.html#extfilteroptions",
        "items": [
            {
                "name": "Description:",
                "value": "Configure <code class=\"module\"><a href=\"../mod/mod_ext_filter.html\">mod_ext_filter</a></code> options"
            },
            {
                "name": "Syntax:",
                "value": "<code>ExtFilterOptions <var>option</var> [<var>option</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ExtFilterOptions NoLogStderr</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ext_filter"
            }
        ]
    },
    "fallbackresource": {
        "name": "FallbackResource",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dir.html#fallbackresource",
        "items": [
            {
                "name": "Description:",
                "value": "Define a default URL for requests that don't map to a file"
            },
            {
                "name": "Syntax:",
                "value": "<code>FallbackResource disabled | <var>local-url</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>disabled - httpd will return 404 (Not Found)</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_dir"
            },
            {
                "name": "Compatibility:",
                "value": "The <code>disabled</code> argument is available in version 2.4.4 and\nlater"
            }
        ]
    },
    "fileetag": {
        "name": "FileETag",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#fileetag",
        "items": [
            {
                "name": "Description:",
                "value": "File attributes used to create the ETag\nHTTP response header for static files"
            },
            {
                "name": "Syntax:",
                "value": "<code>FileETag <var>component</var> ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>FileETag MTime Size</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "The default used to be \"INode&nbsp;MTime&nbsp;Size\" in 2.3.14 and\nearlier."
            }
        ]
    },
    "files": {
        "name": "Files",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#files",
        "items": [
            {
                "name": "Description:",
                "value": "Contains directives that apply to matched\nfilenames"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;Files <var>filename</var>&gt; ... &lt;/Files&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "filesmatch": {
        "name": "FilesMatch",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#filesmatch",
        "items": [
            {
                "name": "Description:",
                "value": "Contains directives that apply to regular-expression matched\nfilenames"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;FilesMatch <var>regex</var>&gt; ... &lt;/FilesMatch&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "filterchain": {
        "name": "FilterChain",
        "href": "/ApacheGUI/manual/2.4/mod/mod_filter.html#filterchain",
        "items": [
            {
                "name": "Description:",
                "value": "Configure the filter chain"
            },
            {
                "name": "Syntax:",
                "value": "<code>FilterChain [+=-@!]<var>filter-name</var> <var>...</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_filter"
            }
        ]
    },
    "filterdeclare": {
        "name": "FilterDeclare",
        "href": "/ApacheGUI/manual/2.4/mod/mod_filter.html#filterdeclare",
        "items": [
            {
                "name": "Description:",
                "value": "Declare a smart filter"
            },
            {
                "name": "Syntax:",
                "value": "<code>FilterDeclare <var>filter-name</var> <var>[type]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_filter"
            }
        ]
    },
    "filterprotocol": {
        "name": "FilterProtocol",
        "href": "/ApacheGUI/manual/2.4/mod/mod_filter.html#filterprotocol",
        "items": [
            {
                "name": "Description:",
                "value": "Deal with correct HTTP protocol handling"
            },
            {
                "name": "Syntax:",
                "value": "<code>FilterProtocol <var>filter-name</var> [<var>provider-name</var>]\n    <var>proto-flags</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_filter"
            }
        ]
    },
    "filterprovider": {
        "name": "FilterProvider",
        "href": "/ApacheGUI/manual/2.4/mod/mod_filter.html#filterprovider",
        "items": [
            {
                "name": "Description:",
                "value": "Register a content filter"
            },
            {
                "name": "Syntax:",
                "value": "<code>FilterProvider <var>filter-name</var> <var>provider-name</var>\n <var>expression</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_filter"
            }
        ]
    },
    "filtertrace": {
        "name": "FilterTrace",
        "href": "/ApacheGUI/manual/2.4/mod/mod_filter.html#filtertrace",
        "items": [
            {
                "name": "Description:",
                "value": "Get debug/diagnostic information from\n    <code class=\"module\"><a href=\"../mod/mod_filter.html\">mod_filter</a></code>"
            },
            {
                "name": "Syntax:",
                "value": "<code>FilterTrace <var>filter-name</var> <var>level</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_filter"
            }
        ]
    },
    "forcelanguagepriority": {
        "name": "ForceLanguagePriority",
        "href": "/ApacheGUI/manual/2.4/mod/mod_negotiation.html#forcelanguagepriority",
        "items": [
            {
                "name": "Description:",
                "value": "Action to take if a single acceptable document is not\nfound"
            },
            {
                "name": "Syntax:",
                "value": "<code>ForceLanguagePriority None|Prefer|Fallback [Prefer|Fallback]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ForceLanguagePriority Prefer</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_negotiation"
            }
        ]
    },
    "forcetype": {
        "name": "ForceType",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#forcetype",
        "items": [
            {
                "name": "Description:",
                "value": "Forces all matching files to be served with the specified\nmedia type in the HTTP Content-Type header field"
            },
            {
                "name": "Syntax:",
                "value": "<code>ForceType <var>media-type</var>|None</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "forensiclog": {
        "name": "ForensicLog",
        "href": "/ApacheGUI/manual/2.4/mod/mod_log_forensic.html#forensiclog",
        "items": [
            {
                "name": "Description:",
                "value": "Sets filename of the forensic log"
            },
            {
                "name": "Syntax:",
                "value": "<code>ForensicLog <var>filename</var>|<var>pipe</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_log_forensic"
            }
        ]
    },
    "gprofdir": {
        "name": "GprofDir",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#gprofdir",
        "items": [
            {
                "name": "Description:",
                "value": "Directory to write gmon.out profiling data to.  "
            },
            {
                "name": "Syntax:",
                "value": "<code>GprofDir <var>/tmp/gprof/</var>|<var>/tmp/gprof/</var>%</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "gracefulshutdowntimeout": {
        "name": "GracefulShutdownTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#gracefulshutdowntimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Specify a timeout after which a gracefully shutdown server\nwill exit."
            },
            {
                "name": "Syntax:",
                "value": "<code>GracefulShutdownTimeout <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>GracefulShutdownTimeout 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>, <code class=\"module\"><a href=\"../mod/event.html\">event</a></code>"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.2 and later"
            }
        ]
    },
    "group": {
        "name": "Group",
        "href": "/ApacheGUI/manual/2.4/mod/mod_unixd.html#group",
        "items": [
            {
                "name": "Description:",
                "value": "Group under which the server will answer\nrequests"
            },
            {
                "name": "Syntax:",
                "value": "<code>Group <var>unix-group</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>Group #-1</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_unixd"
            }
        ]
    },
    "header": {
        "name": "Header",
        "href": "/ApacheGUI/manual/2.4/mod/mod_headers.html#header",
        "items": [
            {
                "name": "Description:",
                "value": "Configure HTTP response headers"
            },
            {
                "name": "Syntax:",
                "value": "<code>Header [<var>condition</var>] add|append|echo|edit|edit*|merge|set|setifempty|unset|note\n<var>header</var> [[expr=]<var>value</var> [<var>replacement</var>]\n[early|env=[!]<var>varname</var>|expr=<var>expression</var>]]\n</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_headers"
            },
            {
                "name": "Compatibility:",
                "value": "SetIfEmpty available in 2.4.7 and later, expr=value \navailable in 2.4.10 and later"
            }
        ]
    },
    "headername": {
        "name": "HeaderName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#headername",
        "items": [
            {
                "name": "Description:",
                "value": "Name of the file that will be inserted at the top\nof the index listing"
            },
            {
                "name": "Syntax:",
                "value": "<code>HeaderName <var>filename</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "heartbeataddress": {
        "name": "HeartbeatAddress",
        "href": "/ApacheGUI/manual/2.4/mod/mod_heartbeat.html#heartbeataddress",
        "items": [
            {
                "name": "Description:",
                "value": "Multicast address for heartbeat packets"
            },
            {
                "name": "Syntax:",
                "value": "<code>HeartbeatAddress <var>addr:port</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>disabled</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_heartbeat"
            }
        ]
    },
    "heartbeatlisten": {
        "name": "HeartbeatListen",
        "href": "/ApacheGUI/manual/2.4/mod/mod_heartmonitor.html#heartbeatlisten",
        "items": [
            {
                "name": "Description:",
                "value": "multicast address to listen for incoming heartbeat requests "
            },
            {
                "name": "Syntax:",
                "value": "<code>HeartbeatListen<var>addr:port</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>disabled</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_heartmonitor"
            }
        ]
    },
    "heartbeatmaxservers": {
        "name": "HeartbeatMaxServers",
        "href": "/ApacheGUI/manual/2.4/mod/mod_heartmonitor.html#heartbeatmaxservers",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the maximum number of servers that will be sending \nheartbeat requests to this server"
            },
            {
                "name": "Syntax:",
                "value": "<code>HeartbeatMaxServers <var>number-of-servers</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>HeartbeatMaxServers 10</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_heartmonitor"
            }
        ]
    },
    "heartbeatstorage": {
        "name": "HeartbeatStorage",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lbmethod_heartbeat.html#heartbeatstorage",
        "items": [
            {
                "name": "Description:",
                "value": "Path to read heartbeat data"
            },
            {
                "name": "Syntax:",
                "value": "<code>HeartbeatStorage <var>file-path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>HeartbeatStorage logs/hb.dat</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lbmethod_heartbeat"
            }
        ]
    },
    "hostnamelookups": {
        "name": "HostnameLookups",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#hostnamelookups",
        "items": [
            {
                "name": "Description:",
                "value": "Enables DNS lookups on client IP addresses"
            },
            {
                "name": "Syntax:",
                "value": "<code>HostnameLookups On|Off|Double</code>"
            },
            {
                "name": "Default:",
                "value": "<code>HostnameLookups Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "identitycheck": {
        "name": "IdentityCheck",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ident.html#identitycheck",
        "items": [
            {
                "name": "Description:",
                "value": "Enables logging of the RFC 1413 identity of the remote\nuser"
            },
            {
                "name": "Syntax:",
                "value": "<code>IdentityCheck On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>IdentityCheck Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ident"
            },
            {
                "name": "Compatibility:",
                "value": "Moved out of core in Apache 2.1"
            }
        ]
    },
    "identitychecktimeout": {
        "name": "IdentityCheckTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ident.html#identitychecktimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Determines the timeout duration for ident requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>IdentityCheckTimeout <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>IdentityCheckTimeout 30</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ident"
            }
        ]
    },
    "if": {
        "name": "If",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#if",
        "items": [
            {
                "name": "Description:",
                "value": "Contains directives that apply only if a condition is\nsatisfied by a request at runtime"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;If <var>expression</var>&gt; ... &lt;/If&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "ifdefine": {
        "name": "IfDefine",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#ifdefine",
        "items": [
            {
                "name": "Description:",
                "value": "Encloses directives that will be processed only\nif a test is true at startup"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;IfDefine [!]<var>parameter-name</var>&gt; ...\n    &lt;/IfDefine&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "ifmodule": {
        "name": "IfModule",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#ifmodule",
        "items": [
            {
                "name": "Description:",
                "value": "Encloses directives that are processed conditional on the\npresence or absence of a specific module"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;IfModule [!]<var>module-file</var>|<var>module-identifier</var>&gt; ...\n    &lt;/IfModule&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Module identifiers are available in version 2.1 and\nlater."
            }
        ]
    },
    "ifversion": {
        "name": "IfVersion",
        "href": "/ApacheGUI/manual/2.4/mod/mod_version.html#ifversion",
        "items": [
            {
                "name": "Description:",
                "value": "contains version dependent configuration"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;IfVersion [[!]<var>operator</var>] <var>version</var>&gt; ...\n&lt;/IfVersion&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_version"
            }
        ]
    },
    "imapbase": {
        "name": "ImapBase",
        "href": "/ApacheGUI/manual/2.4/mod/mod_imagemap.html#imapbase",
        "items": [
            {
                "name": "Description:",
                "value": "Default <code>base</code> for imagemap files"
            },
            {
                "name": "Syntax:",
                "value": "<code>ImapBase map|referer|<var>URL</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ImapBase http://servername/</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_imagemap"
            }
        ]
    },
    "imapdefault": {
        "name": "ImapDefault",
        "href": "/ApacheGUI/manual/2.4/mod/mod_imagemap.html#imapdefault",
        "items": [
            {
                "name": "Description:",
                "value": "Default action when an imagemap is called with coordinates\nthat are not explicitly mapped"
            },
            {
                "name": "Syntax:",
                "value": "<code>ImapDefault error|nocontent|map|referer|<var>URL</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ImapDefault nocontent</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_imagemap"
            }
        ]
    },
    "imapmenu": {
        "name": "ImapMenu",
        "href": "/ApacheGUI/manual/2.4/mod/mod_imagemap.html#imapmenu",
        "items": [
            {
                "name": "Description:",
                "value": "Action if no coordinates are given when calling\nan imagemap"
            },
            {
                "name": "Syntax:",
                "value": "<code>ImapMenu none|formatted|semiformatted|unformatted</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ImapMenu formatted</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_imagemap"
            }
        ]
    },
    "include": {
        "name": "Include",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#include",
        "items": [
            {
                "name": "Description:",
                "value": "Includes other configuration files from within\nthe server configuration files"
            },
            {
                "name": "Syntax:",
                "value": "<code>Include <var>file-path</var>|<var>directory-path</var>|<var>wildcard</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Directory\nwildcard matching available in 2.3.6 and later"
            }
        ]
    },
    "includeoptional": {
        "name": "IncludeOptional",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#includeoptional",
        "items": [
            {
                "name": "Description:",
                "value": "Includes other configuration files from within\nthe server configuration files"
            },
            {
                "name": "Syntax:",
                "value": "<code>IncludeOptional <var>file-path</var>|<var>directory-path</var>|<var>wildcard</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in 2.3.6 and later"
            }
        ]
    },
    "indexheadinsert": {
        "name": "IndexHeadInsert",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#indexheadinsert",
        "items": [
            {
                "name": "Description:",
                "value": "Inserts text in the HEAD section of an index page."
            },
            {
                "name": "Syntax:",
                "value": "<code>IndexHeadInsert <var>\"markup ...\"</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "indexignore": {
        "name": "IndexIgnore",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#indexignore",
        "items": [
            {
                "name": "Description:",
                "value": "Adds to the list of files to hide when listing\na directory"
            },
            {
                "name": "Syntax:",
                "value": "<code>IndexIgnore <var>file</var> [<var>file</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>IndexIgnore \".\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "indexignorereset": {
        "name": "IndexIgnoreReset",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#indexignorereset",
        "items": [
            {
                "name": "Description:",
                "value": "Empties the list of files to hide when listing\na directory"
            },
            {
                "name": "Syntax:",
                "value": "<code>IndexIgnoreReset ON|OFF</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            },
            {
                "name": "Compatibility:",
                "value": "2.3.10 and later"
            }
        ]
    },
    "indexoptions": {
        "name": "IndexOptions",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#indexoptions",
        "items": [
            {
                "name": "Description:",
                "value": "Various configuration settings for directory\nindexing"
            },
            {
                "name": "Syntax:",
                "value": "<code>IndexOptions  [+|-]<var>option</var> [[+|-]<var>option</var>]\n...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>By default, no options are enabled.</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "indexorderdefault": {
        "name": "IndexOrderDefault",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#indexorderdefault",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the default ordering of the directory index"
            },
            {
                "name": "Syntax:",
                "value": "<code>IndexOrderDefault Ascending|Descending\nName|Date|Size|Description</code>"
            },
            {
                "name": "Default:",
                "value": "<code>IndexOrderDefault Ascending Name</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "indexstylesheet": {
        "name": "IndexStyleSheet",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#indexstylesheet",
        "items": [
            {
                "name": "Description:",
                "value": "Adds a CSS stylesheet to the directory index"
            },
            {
                "name": "Syntax:",
                "value": "<code>IndexStyleSheet <var>url-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "inputsed": {
        "name": "InputSed",
        "href": "/ApacheGUI/manual/2.4/mod/mod_sed.html#inputsed",
        "items": [
            {
                "name": "Description:",
                "value": "Sed command to filter request data (typically <code>POST</code> data)"
            },
            {
                "name": "Syntax:",
                "value": "<code>InputSed <var>sed-command</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_sed"
            }
        ]
    },
    "isapiappendlogtoerrors": {
        "name": "ISAPIAppendLogToErrors",
        "href": "/ApacheGUI/manual/2.4/mod/mod_isapi.html#isapiappendlogtoerrors",
        "items": [
            {
                "name": "Description:",
                "value": "Record <code>HSE_APPEND_LOG_PARAMETER</code> requests from\nISAPI extensions to the error log"
            },
            {
                "name": "Syntax:",
                "value": "<code>ISAPIAppendLogToErrors on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ISAPIAppendLogToErrors off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_isapi"
            }
        ]
    },
    "isapiappendlogtoquery": {
        "name": "ISAPIAppendLogToQuery",
        "href": "/ApacheGUI/manual/2.4/mod/mod_isapi.html#isapiappendlogtoquery",
        "items": [
            {
                "name": "Description:",
                "value": "Record <code>HSE_APPEND_LOG_PARAMETER</code> requests from\nISAPI extensions to the query field"
            },
            {
                "name": "Syntax:",
                "value": "<code>ISAPIAppendLogToQuery on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ISAPIAppendLogToQuery on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_isapi"
            }
        ]
    },
    "isapicachefile": {
        "name": "ISAPICacheFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_isapi.html#isapicachefile",
        "items": [
            {
                "name": "Description:",
                "value": "ISAPI .dll files to be loaded at startup"
            },
            {
                "name": "Syntax:",
                "value": "<code>ISAPICacheFile <var>file-path</var> [<var>file-path</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_isapi"
            }
        ]
    },
    "isapifakeasync": {
        "name": "ISAPIFakeAsync",
        "href": "/ApacheGUI/manual/2.4/mod/mod_isapi.html#isapifakeasync",
        "items": [
            {
                "name": "Description:",
                "value": "Fake asynchronous support for ISAPI callbacks"
            },
            {
                "name": "Syntax:",
                "value": "<code>ISAPIFakeAsync on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ISAPIFakeAsync off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_isapi"
            }
        ]
    },
    "isapilognotsupported": {
        "name": "ISAPILogNotSupported",
        "href": "/ApacheGUI/manual/2.4/mod/mod_isapi.html#isapilognotsupported",
        "items": [
            {
                "name": "Description:",
                "value": "Log unsupported feature requests from ISAPI\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>ISAPILogNotSupported on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ISAPILogNotSupported off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_isapi"
            }
        ]
    },
    "isapireadaheadbuffer": {
        "name": "ISAPIReadAheadBuffer",
        "href": "/ApacheGUI/manual/2.4/mod/mod_isapi.html#isapireadaheadbuffer",
        "items": [
            {
                "name": "Description:",
                "value": "Size of the Read Ahead Buffer sent to ISAPI\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>ISAPIReadAheadBuffer <var>size</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ISAPIReadAheadBuffer 49152</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_isapi"
            }
        ]
    },
    "keepalive": {
        "name": "KeepAlive",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#keepalive",
        "items": [
            {
                "name": "Description:",
                "value": "Enables HTTP persistent connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>KeepAlive On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>KeepAlive On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "keepalivetimeout": {
        "name": "KeepAliveTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#keepalivetimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Amount of time the server will wait for subsequent\nrequests on a persistent connection"
            },
            {
                "name": "Syntax:",
                "value": "<code>KeepAliveTimeout <var>num</var>[ms]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>KeepAliveTimeout 5</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "keptbodysize": {
        "name": "KeptBodySize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_request.html#keptbodysize",
        "items": [
            {
                "name": "Description:",
                "value": "Keep the request body instead of discarding it up to\nthe specified maximum size, for potential use by filters such as\nmod_include."
            },
            {
                "name": "Syntax:",
                "value": "<code>KeptBodySize <var>maximum size in bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>KeptBodySize 0</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_request"
            }
        ]
    },
    "languagepriority": {
        "name": "LanguagePriority",
        "href": "/ApacheGUI/manual/2.4/mod/mod_negotiation.html#languagepriority",
        "items": [
            {
                "name": "Description:",
                "value": "The precendence of language variants for cases where\nthe client does not express a preference"
            },
            {
                "name": "Syntax:",
                "value": "<code>LanguagePriority <var>MIME-lang</var> [<var>MIME-lang</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_negotiation"
            }
        ]
    },
    "ldapcacheentries": {
        "name": "LDAPCacheEntries",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapcacheentries",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum number of entries in the primary LDAP cache"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPCacheEntries <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPCacheEntries 1024</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapcachettl": {
        "name": "LDAPCacheTTL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapcachettl",
        "items": [
            {
                "name": "Description:",
                "value": "Time that cached items remain valid"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPCacheTTL <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPCacheTTL 600</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapconnectionpoolttl": {
        "name": "LDAPConnectionPoolTTL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapconnectionpoolttl",
        "items": [
            {
                "name": "Description:",
                "value": "Discard backend connections that have been sitting in the connection pool too long"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPConnectionPoolTTL <var>n</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPConnectionPoolTTL -1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Apache HTTP Server 2.3.12 and later"
            }
        ]
    },
    "ldapconnectiontimeout": {
        "name": "LDAPConnectionTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapconnectiontimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the socket connection timeout in seconds"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPConnectionTimeout <var>seconds</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldaplibrarydebug": {
        "name": "LDAPLibraryDebug",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldaplibrarydebug",
        "items": [
            {
                "name": "Description:",
                "value": "Enable debugging in the LDAP SDK"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPLibraryDebug <var>7</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>disabled</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapopcacheentries": {
        "name": "LDAPOpCacheEntries",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapopcacheentries",
        "items": [
            {
                "name": "Description:",
                "value": "Number of entries used to cache LDAP compare\noperations"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPOpCacheEntries <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPOpCacheEntries 1024</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapopcachettl": {
        "name": "LDAPOpCacheTTL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapopcachettl",
        "items": [
            {
                "name": "Description:",
                "value": "Time that entries in the operation cache remain\nvalid"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPOpCacheTTL <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPOpCacheTTL 600</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapreferralhoplimit": {
        "name": "LDAPReferralHopLimit",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapreferralhoplimit",
        "items": [
            {
                "name": "Description:",
                "value": "The maximum number of referral hops to chase before terminating an LDAP query."
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPReferralHopLimit <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SDK dependent, typically between 5 and 10</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapreferrals": {
        "name": "LDAPReferrals",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapreferrals",
        "items": [
            {
                "name": "Description:",
                "value": "Enable referral chasing during queries to the LDAP server."
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPReferrals <var>On|Off|default</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPReferrals On</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "The <var>default</var> parameter is available in Apache 2.4.7 and later"
            }
        ]
    },
    "ldapretries": {
        "name": "LDAPRetries",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapretries",
        "items": [
            {
                "name": "Description:",
                "value": "Configures the number of LDAP server retries."
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPRetries <var>number-of-retries</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPRetries 3</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapretrydelay": {
        "name": "LDAPRetryDelay",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapretrydelay",
        "items": [
            {
                "name": "Description:",
                "value": "Configures the delay between LDAP server retries."
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPRetryDelay <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPRetryDelay 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapsharedcachefile": {
        "name": "LDAPSharedCacheFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapsharedcachefile",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the shared memory cache file"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPSharedCacheFile <var>directory-path/filename</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapsharedcachesize": {
        "name": "LDAPSharedCacheSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapsharedcachesize",
        "items": [
            {
                "name": "Description:",
                "value": "Size in bytes of the shared-memory cache"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPSharedCacheSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPSharedCacheSize 500000</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldaptimeout": {
        "name": "LDAPTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldaptimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the timeout for LDAP search and bind operations, in seconds"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPTimeout <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPTimeout 60</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            },
            {
                "name": "Compatibility:",
                "value": "Apache HTTP Server 2.3.5 and later"
            }
        ]
    },
    "ldaptrustedclientcert": {
        "name": "LDAPTrustedClientCert",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldaptrustedclientcert",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the file containing or nickname referring to a per\nconnection client certificate. Not all LDAP toolkits support per\nconnection client certificates."
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPTrustedClientCert <var>type</var> <var>directory-path/filename/nickname</var> <var>[password]</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldaptrustedglobalcert": {
        "name": "LDAPTrustedGlobalCert",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldaptrustedglobalcert",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the file or database containing global trusted\nCertificate Authority or global client certificates"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPTrustedGlobalCert <var>type</var> <var>directory-path/filename</var> <var>[password]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldaptrustedmode": {
        "name": "LDAPTrustedMode",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldaptrustedmode",
        "items": [
            {
                "name": "Description:",
                "value": "Specifies the SSL/TLS mode to be used when connecting to an LDAP server."
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPTrustedMode <var>type</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "ldapverifyservercert": {
        "name": "LDAPVerifyServerCert",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ldap.html#ldapverifyservercert",
        "items": [
            {
                "name": "Description:",
                "value": "Force server certificate verification"
            },
            {
                "name": "Syntax:",
                "value": "<code>LDAPVerifyServerCert <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LDAPVerifyServerCert On</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ldap"
            }
        ]
    },
    "limit": {
        "name": "Limit",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limit",
        "items": [
            {
                "name": "Description:",
                "value": "Restrict enclosed access controls to only certain HTTP\nmethods"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;Limit <var>method</var> [<var>method</var>] ... &gt; ...\n    &lt;/Limit&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig, Limit"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "limitexcept": {
        "name": "LimitExcept",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limitexcept",
        "items": [
            {
                "name": "Description:",
                "value": "Restrict access controls to all HTTP methods\nexcept the named ones"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;LimitExcept <var>method</var> [<var>method</var>] ... &gt; ...\n    &lt;/LimitExcept&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig, Limit"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "limitinternalrecursion": {
        "name": "LimitInternalRecursion",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limitinternalrecursion",
        "items": [
            {
                "name": "Description:",
                "value": "Determine maximum number of internal redirects and nested\nsubrequests"
            },
            {
                "name": "Syntax:",
                "value": "<code>LimitInternalRecursion <var>number</var> [<var>number</var>]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>LimitInternalRecursion 10</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "limitrequestbody": {
        "name": "LimitRequestBody",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limitrequestbody",
        "items": [
            {
                "name": "Description:",
                "value": "Restricts the total size of the HTTP request body sent\nfrom the client"
            },
            {
                "name": "Syntax:",
                "value": "<code>LimitRequestBody <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LimitRequestBody 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "limitrequestfields": {
        "name": "LimitRequestFields",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limitrequestfields",
        "items": [
            {
                "name": "Description:",
                "value": "Limits the number of HTTP request header fields that\nwill be accepted from the client"
            },
            {
                "name": "Syntax:",
                "value": "<code>LimitRequestFields <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LimitRequestFields 100</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "limitrequestfieldsize": {
        "name": "LimitRequestFieldSize",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limitrequestfieldsize",
        "items": [
            {
                "name": "Description:",
                "value": "Limits the size of the HTTP request header allowed from the\nclient"
            },
            {
                "name": "Syntax:",
                "value": "<code>LimitRequestFieldSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LimitRequestFieldSize 8190</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "limitrequestline": {
        "name": "LimitRequestLine",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limitrequestline",
        "items": [
            {
                "name": "Description:",
                "value": "Limit the size of the HTTP request line that will be accepted\nfrom the client"
            },
            {
                "name": "Syntax:",
                "value": "<code>LimitRequestLine <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LimitRequestLine 8190</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "limitxmlrequestbody": {
        "name": "LimitXMLRequestBody",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#limitxmlrequestbody",
        "items": [
            {
                "name": "Description:",
                "value": "Limits the size of an XML-based request body"
            },
            {
                "name": "Syntax:",
                "value": "<code>LimitXMLRequestBody <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>LimitXMLRequestBody 1000000</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "listen": {
        "name": "Listen",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#listen",
        "items": [
            {
                "name": "Description:",
                "value": "IP addresses and ports that the server\nlistens to"
            },
            {
                "name": "Syntax:",
                "value": "<code>Listen [<var>IP-address</var>:]<var>portnumber</var> [<var>protocol</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>, <code class=\"module\"><a href=\"../mod/event.html\">event</a></code>"
            },
            {
                "name": "Compatibility:",
                "value": "The <var>protocol</var> argument was added in 2.1.5"
            }
        ]
    },
    "listenbacklog": {
        "name": "ListenBackLog",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#listenbacklog",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum length of the queue of pending connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>ListenBacklog <var>backlog</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ListenBacklog 511</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "loadfile": {
        "name": "LoadFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_so.html#loadfile",
        "items": [
            {
                "name": "Description:",
                "value": "Link in the named object file or library"
            },
            {
                "name": "Syntax:",
                "value": "<code>LoadFile <em>filename</em> [<em>filename</em>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_so"
            }
        ]
    },
    "loadmodule": {
        "name": "LoadModule",
        "href": "/ApacheGUI/manual/2.4/mod/mod_so.html#loadmodule",
        "items": [
            {
                "name": "Description:",
                "value": "Links in the object file or library, and adds to the list\nof active modules"
            },
            {
                "name": "Syntax:",
                "value": "<code>LoadModule <em>module filename</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_so"
            }
        ]
    },
    "location": {
        "name": "Location",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#location",
        "items": [
            {
                "name": "Description:",
                "value": "Applies the enclosed directives only to matching\nURLs"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;Location\n    <var>URL-path</var>|<var>URL</var>&gt; ... &lt;/Location&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "locationmatch": {
        "name": "LocationMatch",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#locationmatch",
        "items": [
            {
                "name": "Description:",
                "value": "Applies the enclosed directives only to regular-expression\nmatching URLs"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;LocationMatch\n    <var>regex</var>&gt; ... &lt;/LocationMatch&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "logformat": {
        "name": "LogFormat",
        "href": "/ApacheGUI/manual/2.4/mod/mod_log_config.html#logformat",
        "items": [
            {
                "name": "Description:",
                "value": "Describes a format for use in a log file"
            },
            {
                "name": "Syntax:",
                "value": "<code>LogFormat <var>format</var>|<var>nickname</var>\n[<var>nickname</var>]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>LogFormat \"%h %l %u %t \\\"%r\\\" %&gt;s %b\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_log_config"
            }
        ]
    },
    "loglevel": {
        "name": "LogLevel",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#loglevel",
        "items": [
            {
                "name": "Description:",
                "value": "Controls the verbosity of the ErrorLog"
            },
            {
                "name": "Syntax:",
                "value": "<code>LogLevel [<var>module</var>:]<var>level</var>\n    [<var>module</var>:<var>level</var>] ...\n</code>"
            },
            {
                "name": "Default:",
                "value": "<code>LogLevel warn</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Per-module and per-directory configuration is available in\n    Apache HTTP Server 2.3.6 and later"
            }
        ]
    },
    "logmessage": {
        "name": "LogMessage",
        "href": "/ApacheGUI/manual/2.4/mod/mod_log_debug.html#logmessage",
        "items": [
            {
                "name": "Description:",
                "value": "Log user-defined message to error log\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>LogMessage <var>message</var>\n[hook=<var>hook</var>] [expr=<var>expression</var>]\n</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Unset</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_log_debug"
            }
        ]
    },
    "luaauthzprovider": {
        "name": "LuaAuthzProvider",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luaauthzprovider",
        "items": [
            {
                "name": "Description:",
                "value": "Plug an authorization provider function into <code class=\"module\"><a href=\"../mod/mod_authz_core.html\">mod_authz_core</a></code>\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaAuthzProvider provider_name /path/to/lua/script.lua function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.3 and later"
            }
        ]
    },
    "luacodecache": {
        "name": "LuaCodeCache",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luacodecache",
        "items": [
            {
                "name": "Description:",
                "value": "Configure the compiled code cache."
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaCodeCache stat|forever|never</code>"
            },
            {
                "name": "Default:",
                "value": "<code>LuaCodeCache stat</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luahookaccesschecker": {
        "name": "LuaHookAccessChecker",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahookaccesschecker",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the access_checker phase of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookAccessChecker  /path/to/lua/script.lua  hook_function_name [early|late]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "The optional third argument is supported in 2.3.15 and later"
            }
        ]
    },
    "luahookauthchecker": {
        "name": "LuaHookAuthChecker",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahookauthchecker",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the auth_checker phase of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookAuthChecker  /path/to/lua/script.lua hook_function_name [early|late]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "The optional third argument is supported in 2.3.15 and later"
            }
        ]
    },
    "luahookcheckuserid": {
        "name": "LuaHookCheckUserID",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahookcheckuserid",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the check_user_id phase of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookCheckUserID  /path/to/lua/script.lua hook_function_name [early|late]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "The optional third argument is supported in 2.3.15 and later"
            }
        ]
    },
    "luahookfixups": {
        "name": "LuaHookFixups",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahookfixups",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the fixups phase of a request\nprocessing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookFixups  /path/to/lua/script.lua hook_function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luahookinsertfilter": {
        "name": "LuaHookInsertFilter",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahookinsertfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the insert_filter phase of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookInsertFilter  /path/to/lua/script.lua hook_function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luahooklog": {
        "name": "LuaHookLog",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahooklog",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the access log phase of a request\nprocessing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookLog  /path/to/lua/script.lua log_function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luahookmaptostorage": {
        "name": "LuaHookMapToStorage",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahookmaptostorage",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the map_to_storage phase of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookMapToStorage  /path/to/lua/script.lua hook_function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luahooktranslatename": {
        "name": "LuaHookTranslateName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahooktranslatename",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the translate name phase of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookTranslateName  /path/to/lua/script.lua  hook_function_name [early|late]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "The optional third argument is supported in 2.3.15 and later"
            }
        ]
    },
    "luahooktypechecker": {
        "name": "LuaHookTypeChecker",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luahooktypechecker",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the type_checker phase of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaHookTypeChecker  /path/to/lua/script.lua hook_function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luainherit": {
        "name": "LuaInherit",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luainherit",
        "items": [
            {
                "name": "Description:",
                "value": "Controls how parent configuration sections are merged into children"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaInherit none|parent-first|parent-last</code>"
            },
            {
                "name": "Default:",
                "value": "<code>LuaInherit parent-first</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.0 and later"
            }
        ]
    },
    "luainputfilter": {
        "name": "LuaInputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luainputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a Lua function for content input filtering"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaInputFilter filter_name /path/to/lua/script.lua function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.5 and later"
            }
        ]
    },
    "luamaphandler": {
        "name": "LuaMapHandler",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luamaphandler",
        "items": [
            {
                "name": "Description:",
                "value": "Map a path to a lua handler"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaMapHandler uri-pattern /path/to/lua/script.lua [function-name]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luaoutputfilter": {
        "name": "LuaOutputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luaoutputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a Lua function for content output filtering"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaOutputFilter filter_name /path/to/lua/script.lua function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.5 and later"
            }
        ]
    },
    "luapackagecpath": {
        "name": "LuaPackageCPath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luapackagecpath",
        "items": [
            {
                "name": "Description:",
                "value": "Add a directory to lua's package.cpath"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaPackageCPath /path/to/include/?.soa</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luapackagepath": {
        "name": "LuaPackagePath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luapackagepath",
        "items": [
            {
                "name": "Description:",
                "value": "Add a directory to lua's package.path"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaPackagePath /path/to/include/?.lua</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luaquickhandler": {
        "name": "LuaQuickHandler",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luaquickhandler",
        "items": [
            {
                "name": "Description:",
                "value": "Provide a hook for the quick handler of request processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaQuickHandler /path/to/script.lua hook_function_name</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luaroot": {
        "name": "LuaRoot",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luaroot",
        "items": [
            {
                "name": "Description:",
                "value": "Specify the base path for resolving relative paths for mod_lua directives"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaRoot /path/to/a/directory</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "luascope": {
        "name": "LuaScope",
        "href": "/ApacheGUI/manual/2.4/mod/mod_lua.html#luascope",
        "items": [
            {
                "name": "Description:",
                "value": "One of once, request, conn, thread -- default is once"
            },
            {
                "name": "Syntax:",
                "value": "<code>LuaScope once|request|conn|thread|server [min] [max]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>LuaScope once</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_lua"
            }
        ]
    },
    "macro": {
        "name": "Macro",
        "href": "/ApacheGUI/manual/2.4/mod/mod_macro.html#macro",
        "items": [
            {
                "name": "Description:",
                "value": "Define a configuration file macro"
            },
            {
                "name": "Syntax:",
                "value": "<code>\n&lt;Macro <var>name</var> [<var>par1</var> .. <var>parN</var>]&gt;\n... &lt;/Macro&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_macro"
            }
        ]
    },
    "maxconnectionsperchild": {
        "name": "MaxConnectionsPerChild",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#maxconnectionsperchild",
        "items": [
            {
                "name": "Description:",
                "value": "Limit on the number of connections that an individual child server\nwill handle during its life"
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxConnectionsPerChild <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxConnectionsPerChild 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            },
            {
                "name": "Compatibility:",
                "value": "Available Apache HTTP Server 2.3.9 and later. The old name\n<code>MaxRequestsPerChild</code> is still supported."
            }
        ]
    },
    "maxkeepaliverequests": {
        "name": "MaxKeepAliveRequests",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#maxkeepaliverequests",
        "items": [
            {
                "name": "Description:",
                "value": "Number of requests allowed on a persistent\nconnection"
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxKeepAliveRequests <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxKeepAliveRequests 100</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "maxmemfree": {
        "name": "MaxMemFree",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#maxmemfree",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum amount of memory that the main allocator is allowed\nto hold without calling <code>free()</code>"
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxMemFree <var>KBytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxMemFree 2048</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>"
            }
        ]
    },
    "maxrangeoverlaps": {
        "name": "MaxRangeOverlaps",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#maxrangeoverlaps",
        "items": [
            {
                "name": "Description:",
                "value": "Number of overlapping ranges (eg: <code>100-200,150-300</code>) allowed before returning the complete\n        resource "
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxRangeOverlaps default | unlimited | none | <var>number-of-ranges</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxRangeOverlaps 20</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.15 and later"
            }
        ]
    },
    "maxrangereversals": {
        "name": "MaxRangeReversals",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#maxrangereversals",
        "items": [
            {
                "name": "Description:",
                "value": "Number of range reversals (eg: <code>100-200,50-70</code>) allowed before returning the complete\n        resource "
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxRangeReversals default | unlimited | none | <var>number-of-ranges</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxRangeReversals 20</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.15 and later"
            }
        ]
    },
    "maxranges": {
        "name": "MaxRanges",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#maxranges",
        "items": [
            {
                "name": "Description:",
                "value": "Number of ranges allowed before returning the complete\nresource "
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxRanges default | unlimited | none | <var>number-of-ranges</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxRanges 200</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.15 and later"
            }
        ]
    },
    "maxrequestworkers": {
        "name": "MaxRequestWorkers",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#maxrequestworkers",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum number of connections that will be processed\nsimultaneously"
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxRequestWorkers <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "maxspareservers": {
        "name": "MaxSpareServers",
        "href": "/ApacheGUI/manual/2.4/mod/prefork.html#maxspareservers",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum number of idle child server processes"
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxSpareServers <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxSpareServers 10</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "prefork"
            }
        ]
    },
    "maxsparethreads": {
        "name": "MaxSpareThreads",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#maxsparethreads",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum number of idle threads"
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxSpareThreads <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "maxthreads": {
        "name": "MaxThreads",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_netware.html#maxthreads",
        "items": [
            {
                "name": "Description:",
                "value": "Set the maximum number of worker threads"
            },
            {
                "name": "Syntax:",
                "value": "<code>MaxThreads <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MaxThreads 2048</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "mpm_netware"
            }
        ]
    },
    "mergetrailers": {
        "name": "MergeTrailers",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#mergetrailers",
        "items": [
            {
                "name": "Description:",
                "value": "Determins whether trailers are merged into headers"
            },
            {
                "name": "Syntax:",
                "value": "<code>MergeTrailers [on|off]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>MergeTrailers off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "2.4.10 and later"
            }
        ]
    },
    "metadir": {
        "name": "MetaDir",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cern_meta.html#metadir",
        "items": [
            {
                "name": "Description:",
                "value": "Name of the directory to find CERN-style meta information\nfiles"
            },
            {
                "name": "Syntax:",
                "value": "<code>MetaDir <var>directory</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MetaDir .web</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cern_meta"
            }
        ]
    },
    "metafiles": {
        "name": "MetaFiles",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cern_meta.html#metafiles",
        "items": [
            {
                "name": "Description:",
                "value": "Activates CERN meta-file processing"
            },
            {
                "name": "Syntax:",
                "value": "<code>MetaFiles on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>MetaFiles off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cern_meta"
            }
        ]
    },
    "metasuffix": {
        "name": "MetaSuffix",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cern_meta.html#metasuffix",
        "items": [
            {
                "name": "Description:",
                "value": "File name suffix for the file containing CERN-style\nmeta information"
            },
            {
                "name": "Syntax:",
                "value": "<code>MetaSuffix <var>suffix</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MetaSuffix .meta</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_cern_meta"
            }
        ]
    },
    "mimemagicfile": {
        "name": "MimeMagicFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime_magic.html#mimemagicfile",
        "items": [
            {
                "name": "Description:",
                "value": "Enable MIME-type determination based on file contents\nusing the specified magic file"
            },
            {
                "name": "Syntax:",
                "value": "<code>MimeMagicFile <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_mime_magic"
            }
        ]
    },
    "minspareservers": {
        "name": "MinSpareServers",
        "href": "/ApacheGUI/manual/2.4/mod/prefork.html#minspareservers",
        "items": [
            {
                "name": "Description:",
                "value": "Minimum number of idle child server processes"
            },
            {
                "name": "Syntax:",
                "value": "<code>MinSpareServers <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>MinSpareServers 5</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "prefork"
            }
        ]
    },
    "minsparethreads": {
        "name": "MinSpareThreads",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#minsparethreads",
        "items": [
            {
                "name": "Description:",
                "value": "Minimum number of idle threads available to handle request\nspikes"
            },
            {
                "name": "Syntax:",
                "value": "<code>MinSpareThreads <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "mmapfile": {
        "name": "MMapFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_file_cache.html#mmapfile",
        "items": [
            {
                "name": "Description:",
                "value": "Map a list of files into memory at startup time"
            },
            {
                "name": "Syntax:",
                "value": "<code>MMapFile <var>file-path</var> [<var>file-path</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_file_cache"
            }
        ]
    },
    "modemstandard": {
        "name": "ModemStandard",
        "href": "/ApacheGUI/manual/2.4/mod/mod_dialup.html#modemstandard",
        "items": [
            {
                "name": "Description:",
                "value": "Modem standard to simulate"
            },
            {
                "name": "Syntax:",
                "value": "<code>ModemStandard V.21|V.26bis|V.32|V.92</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_dialup"
            }
        ]
    },
    "modmimeusepathinfo": {
        "name": "ModMimeUsePathInfo",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#modmimeusepathinfo",
        "items": [
            {
                "name": "Description:",
                "value": "Tells <code class=\"module\"><a href=\"../mod/mod_mime.html\">mod_mime</a></code> to treat <code>path_info</code>\ncomponents as part of the filename"
            },
            {
                "name": "Syntax:",
                "value": "<code>ModMimeUsePathInfo On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ModMimeUsePathInfo Off</code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "multiviewsmatch": {
        "name": "MultiviewsMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#multiviewsmatch",
        "items": [
            {
                "name": "Description:",
                "value": "The types of files that will be included when searching for\na matching file with MultiViews"
            },
            {
                "name": "Syntax:",
                "value": "<code>MultiviewsMatch Any|NegotiatedOnly|Filters|Handlers\n[Handlers|Filters]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>MultiviewsMatch NegotiatedOnly</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "mutex": {
        "name": "Mutex",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#mutex",
        "items": [
            {
                "name": "Description:",
                "value": "Configures mutex mechanism and lock file directory for all\nor specified mutexes"
            },
            {
                "name": "Syntax:",
                "value": "<code>Mutex <var>mechanism</var> [default|<var>mutex-name</var>] ... [OmitPID]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Mutex default</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.3.4 and later"
            }
        ]
    },
    "namevirtualhost": {
        "name": "NameVirtualHost",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#namevirtualhost",
        "items": [
            {
                "name": "Description:",
                "value": "DEPRECATED: Designates an IP address for name-virtual\nhosting"
            },
            {
                "name": "Syntax:",
                "value": "<code>NameVirtualHost <var>addr</var>[:<var>port</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "noproxy": {
        "name": "NoProxy",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#noproxy",
        "items": [
            {
                "name": "Description:",
                "value": "Hosts, domains, or networks that will be connected to\ndirectly"
            },
            {
                "name": "Syntax:",
                "value": "<code>NoProxy <var>host</var> [<var>host</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "nwssltrustedcerts": {
        "name": "NWSSLTrustedCerts",
        "href": "/ApacheGUI/manual/2.4/mod/mod_nw_ssl.html#nwssltrustedcerts",
        "items": [
            {
                "name": "Description:",
                "value": "List of additional client certificates"
            },
            {
                "name": "Syntax:",
                "value": "<code>NWSSLTrustedCerts <var>filename</var> [<var>filename</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_nw_ssl"
            }
        ]
    },
    "nwsslupgradeable": {
        "name": "NWSSLUpgradeable",
        "href": "/ApacheGUI/manual/2.4/mod/mod_nw_ssl.html#nwsslupgradeable",
        "items": [
            {
                "name": "Description:",
                "value": "Allows a connection to be upgraded to an SSL connection upon request"
            },
            {
                "name": "Syntax:",
                "value": "<code>NWSSLUpgradeable [<var>IP-address</var>:]<var>portnumber</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_nw_ssl"
            }
        ]
    },
    "options": {
        "name": "Options",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#options",
        "items": [
            {
                "name": "Description:",
                "value": "Configures what features are available in a particular\ndirectory"
            },
            {
                "name": "Syntax:",
                "value": "<code>Options\n    [+|-]<var>option</var> [[+|-]<var>option</var>] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Options FollowSymlinks</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "The default was changed from All to FollowSymlinks in 2.3.11"
            }
        ]
    },
    "order": {
        "name": "Order",
        "href": "/ApacheGUI/manual/2.4/mod/mod_access_compat.html#order",
        "items": [
            {
                "name": "Description:",
                "value": "Controls the default access state and the order in which\n<code class=\"directive\">Allow</code> and <code class=\"directive\">Deny</code> are\nevaluated."
            },
            {
                "name": "Syntax:",
                "value": "<code> Order <var>ordering</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>Order Deny,Allow</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Limit"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_access_compat"
            }
        ]
    },
    "outputsed": {
        "name": "OutputSed",
        "href": "/ApacheGUI/manual/2.4/mod/mod_sed.html#outputsed",
        "items": [
            {
                "name": "Description:",
                "value": "Sed command for filtering response content"
            },
            {
                "name": "Syntax:",
                "value": "<code>OutputSed <var>sed-command</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_sed"
            }
        ]
    },
    "passenv": {
        "name": "PassEnv",
        "href": "/ApacheGUI/manual/2.4/mod/mod_env.html#passenv",
        "items": [
            {
                "name": "Description:",
                "value": "Passes environment variables from the shell"
            },
            {
                "name": "Syntax:",
                "value": "<code>PassEnv <var>env-variable</var> [<var>env-variable</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_env"
            }
        ]
    },
    "pidfile": {
        "name": "PidFile",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#pidfile",
        "items": [
            {
                "name": "Description:",
                "value": "File where the server records the process ID\nof the daemon"
            },
            {
                "name": "Syntax:",
                "value": "<code>PidFile <var>filename</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>PidFile logs/httpd.pid</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "privilegesmode": {
        "name": "PrivilegesMode",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#privilegesmode",
        "items": [
            {
                "name": "Description:",
                "value": "Trade off processing speed and efficiency vs security against\nmalicious privileges-aware code."
            },
            {
                "name": "Syntax:",
                "value": "<code>PrivilegesMode FAST|SECURE|SELECTIVE</code>"
            },
            {
                "name": "Default:",
                "value": "<code>PrivilegesMode FAST</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)."
            }
        ]
    },
    "protocol": {
        "name": "Protocol",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#protocol",
        "items": [
            {
                "name": "Description:",
                "value": "Protocol for a listening socket"
            },
            {
                "name": "Syntax:",
                "value": "<code>Protocol <var>protocol</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.1.5 and later.\nOn Windows from Apache 2.3.3 and later."
            }
        ]
    },
    "protocolecho": {
        "name": "ProtocolEcho",
        "href": "/ApacheGUI/manual/2.4/mod/mod_echo.html#protocolecho",
        "items": [
            {
                "name": "Description:",
                "value": "Turn the echo server on or off"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProtocolEcho On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProtocolEcho Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_echo"
            }
        ]
    },
    "proxy": {
        "name": "Proxy",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxy",
        "items": [
            {
                "name": "Description:",
                "value": "Container for directives applied to proxied resources"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;Proxy <var>wildcard-url</var>&gt; ...&lt;/Proxy&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyaddheaders": {
        "name": "ProxyAddHeaders",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyaddheaders",
        "items": [
            {
                "name": "Description:",
                "value": "Add proxy information in X-Forwarded-* headers"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyAddHeaders Off|On</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyAddHeaders On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.10 and later"
            }
        ]
    },
    "proxybadheader": {
        "name": "ProxyBadHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxybadheader",
        "items": [
            {
                "name": "Description:",
                "value": "Determines how to handle bad header lines in a\nresponse"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyBadHeader IsError|Ignore|StartBody</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyBadHeader IsError</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyblock": {
        "name": "ProxyBlock",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyblock",
        "items": [
            {
                "name": "Description:",
                "value": "Words, hosts, or domains that are banned from being\nproxied"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyBlock *|<var>word</var>|<var>host</var>|<var>domain</var>\n[<var>word</var>|<var>host</var>|<var>domain</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxydomain": {
        "name": "ProxyDomain",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxydomain",
        "items": [
            {
                "name": "Description:",
                "value": "Default domain name for proxied requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyDomain <var>Domain</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyerroroverride": {
        "name": "ProxyErrorOverride",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyerroroverride",
        "items": [
            {
                "name": "Description:",
                "value": "Override error pages for proxied content"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyErrorOverride On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyErrorOverride Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyexpressdbmfile": {
        "name": "ProxyExpressDBMFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_express.html#proxyexpressdbmfile",
        "items": [
            {
                "name": "Description:",
                "value": "Pathname to DBM file."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyExpressDBMFile &lt;pathname&gt;</code>"
            },
            {
                "name": "Default:",
                "value": "<code>None</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_express"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.13 and later"
            }
        ]
    },
    "proxyexpressdbmtype": {
        "name": "ProxyExpressDBMType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_express.html#proxyexpressdbmtype",
        "items": [
            {
                "name": "Description:",
                "value": "DBM type of file."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyExpressDBMFile &lt;type&gt;</code>"
            },
            {
                "name": "Default:",
                "value": "<code>\"default\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_express"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.13 and later"
            }
        ]
    },
    "proxyexpressenable": {
        "name": "ProxyExpressEnable",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_express.html#proxyexpressenable",
        "items": [
            {
                "name": "Description:",
                "value": "Enable the module functionality."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyExpressEnable [on|off]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_express"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.13 and later"
            }
        ]
    },
    "proxyftpdircharset": {
        "name": "ProxyFtpDirCharset",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_ftp.html#proxyftpdircharset",
        "items": [
            {
                "name": "Description:",
                "value": "Define the character set for proxied FTP listings"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyFtpDirCharset <var>character set</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyFtpDirCharset ISO-8859-1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_ftp"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.2.7 and later. Moved from <code class=\"module\"><a href=\"../mod/mod_proxy.html\">mod_proxy</a></code> in Apache 2.3.5."
            }
        ]
    },
    "proxyftpescapewildcards": {
        "name": "ProxyFtpEscapeWildcards",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_ftp.html#proxyftpescapewildcards",
        "items": [
            {
                "name": "Description:",
                "value": "Whether wildcards in requested filenames are escaped when sent to the FTP server"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyFtpEscapeWildcards [on|off]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_ftp"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.3 and later"
            }
        ]
    },
    "proxyftplistonwildcard": {
        "name": "ProxyFtpListOnWildcard",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_ftp.html#proxyftplistonwildcard",
        "items": [
            {
                "name": "Description:",
                "value": "Whether wildcards in requested filenames trigger a file listing"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyFtpListOnWildcard [on|off]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_ftp"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.3 and later"
            }
        ]
    },
    "proxyhtmlbufsize": {
        "name": "ProxyHTMLBufSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlbufsize",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the buffer size increment for buffering inline scripts and\nstylesheets."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLBufSize <var>bytes</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmlcharsetout": {
        "name": "ProxyHTMLCharsetOut",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlcharsetout",
        "items": [
            {
                "name": "Description:",
                "value": "Specify a charset for mod_proxy_html output."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLCharsetOut <var>Charset | *</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmldoctype": {
        "name": "ProxyHTMLDocType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmldoctype",
        "items": [
            {
                "name": "Description:",
                "value": "Sets an HTML or XHTML document type declaration."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLDocType <var>HTML|XHTML [Legacy]</var><br><strong>OR</strong>\n<br>ProxyHTMLDocType <var>fpi [SGML|XML]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmlenable": {
        "name": "ProxyHTMLEnable",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlenable",
        "items": [
            {
                "name": "Description:",
                "value": "Turns the proxy_html filter on or off."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLEnable <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyHTMLEnable Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nmodule for earlier 2.x versions."
            }
        ]
    },
    "proxyhtmlevents": {
        "name": "ProxyHTMLEvents",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlevents",
        "items": [
            {
                "name": "Description:",
                "value": "Specify attributes to treat as scripting events."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLEvents <var>attribute [attribute ...]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmlextended": {
        "name": "ProxyHTMLExtended",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlextended",
        "items": [
            {
                "name": "Description:",
                "value": "Determines whether to fix links in inline scripts, stylesheets,\nand scripting events."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLExtended <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyHTMLExtended Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmlfixups": {
        "name": "ProxyHTMLFixups",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlfixups",
        "items": [
            {
                "name": "Description:",
                "value": "Fixes for simple HTML errors."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLFixups <var>[lowercase] [dospath] [reset]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmlinterp": {
        "name": "ProxyHTMLInterp",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlinterp",
        "items": [
            {
                "name": "Description:",
                "value": "Enables per-request interpolation of\n<code class=\"directive\">ProxyHTMLURLMap</code> rules."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLInterp <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyHTMLInterp Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmllinks": {
        "name": "ProxyHTMLLinks",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmllinks",
        "items": [
            {
                "name": "Description:",
                "value": "Specify HTML elements that have URL attributes to be rewritten."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLLinks <var>element attribute [attribute2 ...]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmlmeta": {
        "name": "ProxyHTMLMeta",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlmeta",
        "items": [
            {
                "name": "Description:",
                "value": "Turns on or off extra pre-parsing of metadata in HTML\n<code>&lt;head&gt;</code> sections."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLMeta <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyHTMLMeta Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nmodule for earlier 2.x versions."
            }
        ]
    },
    "proxyhtmlstripcomments": {
        "name": "ProxyHTMLStripComments",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlstripcomments",
        "items": [
            {
                "name": "Description:",
                "value": "Determines whether to strip HTML comments."
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLStripComments <var>On|Off</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyHTMLStripComments Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nfor earlier 2.x versions"
            }
        ]
    },
    "proxyhtmlurlmap": {
        "name": "ProxyHTMLURLMap",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_html.html#proxyhtmlurlmap",
        "items": [
            {
                "name": "Description:",
                "value": "Defines a rule to rewrite HTML links"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyHTMLURLMap <var>from-pattern to-pattern [flags] [cond]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_html"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4 and later; available as a third-party\nmodule for earlier 2.x versions."
            }
        ]
    },
    "proxyiobuffersize": {
        "name": "ProxyIOBufferSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyiobuffersize",
        "items": [
            {
                "name": "Description:",
                "value": "Determine size of internal data throughput buffer"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyIOBufferSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyIOBufferSize 8192</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxymatch": {
        "name": "ProxyMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxymatch",
        "items": [
            {
                "name": "Description:",
                "value": "Container for directives applied to regular-expression-matched\nproxied resources"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;ProxyMatch <var>regex</var>&gt; ...&lt;/ProxyMatch&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxymaxforwards": {
        "name": "ProxyMaxForwards",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxymaxforwards",
        "items": [
            {
                "name": "Description:",
                "value": "Maximium number of proxies that a request can be forwarded\nthrough"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyMaxForwards <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyMaxForwards -1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "Default behaviour changed in 2.2.7"
            }
        ]
    },
    "proxypass": {
        "name": "ProxyPass",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypass",
        "items": [
            {
                "name": "Description:",
                "value": "Maps remote servers into the local server URL-space"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPass [<var>path</var>] !|<var>url</var> [<var>key=value</var>\n  <var>[key=value</var> ...]] [nocanon] [interpolate] [noquery]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxypassinherit": {
        "name": "ProxyPassInherit",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypassinherit",
        "items": [
            {
                "name": "Description:",
                "value": "Inherit ProxyPass directives defined from the main server"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPassInherit On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyPassInherit On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "ProxyPassInherit is only available in Apache HTTP Server 2.4.5 and later.\n        and later."
            }
        ]
    },
    "proxypassinterpolateenv": {
        "name": "ProxyPassInterpolateEnv",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypassinterpolateenv",
        "items": [
            {
                "name": "Description:",
                "value": "Enable Environment Variable interpolation in Reverse Proxy configurations"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPassInterpolateEnv On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyPassInterpolateEnv Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.2.9 and later"
            }
        ]
    },
    "proxypassmatch": {
        "name": "ProxyPassMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypassmatch",
        "items": [
            {
                "name": "Description:",
                "value": "Maps remote servers into the local server URL-space using regular expressions"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPassMatch [<var>regex</var>] !|<var>url</var> [<var>key=value</var>\n\t<var>[key=value</var> ...]]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxypassreverse": {
        "name": "ProxyPassReverse",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypassreverse",
        "items": [
            {
                "name": "Description:",
                "value": "Adjusts the URL in HTTP response headers sent from a reverse\nproxied server"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPassReverse [<var>path</var>] <var>url</var>\n[<var>interpolate</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxypassreversecookiedomain": {
        "name": "ProxyPassReverseCookieDomain",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypassreversecookiedomain",
        "items": [
            {
                "name": "Description:",
                "value": "Adjusts the Domain string in Set-Cookie headers from a reverse-\nproxied server"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPassReverseCookieDomain <var>internal-domain</var>\n<var>public-domain</var> [<var>interpolate</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxypassreversecookiepath": {
        "name": "ProxyPassReverseCookiePath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypassreversecookiepath",
        "items": [
            {
                "name": "Description:",
                "value": "Adjusts the Path string in Set-Cookie headers from a reverse-\nproxied server"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPassReverseCookiePath <var>internal-path</var>\n<var>public-path</var> [<var>interpolate</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxypreservehost": {
        "name": "ProxyPreserveHost",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxypreservehost",
        "items": [
            {
                "name": "Description:",
                "value": "Use incoming Host HTTP request header for proxy\nrequest"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyPreserveHost On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyPreserveHost Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "Usable in directory\ncontext in 2.3.3 and later."
            }
        ]
    },
    "proxyreceivebuffersize": {
        "name": "ProxyReceiveBufferSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyreceivebuffersize",
        "items": [
            {
                "name": "Description:",
                "value": "Network buffer size for proxied HTTP and FTP\nconnections"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyReceiveBufferSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyReceiveBufferSize 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyremote": {
        "name": "ProxyRemote",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyremote",
        "items": [
            {
                "name": "Description:",
                "value": "Remote proxy used to handle certain requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyRemote <var>match</var> <var>remote-server</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyremotematch": {
        "name": "ProxyRemoteMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyremotematch",
        "items": [
            {
                "name": "Description:",
                "value": "Remote proxy used to handle requests matched by regular\nexpressions"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyRemoteMatch <var>regex</var> <var>remote-server</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyrequests": {
        "name": "ProxyRequests",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyrequests",
        "items": [
            {
                "name": "Description:",
                "value": "Enables forward (standard) proxy requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyRequests On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyRequests Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyscgiinternalredirect": {
        "name": "ProxySCGIInternalRedirect",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_scgi.html#proxyscgiinternalredirect",
        "items": [
            {
                "name": "Description:",
                "value": "Enable or disable internal redirect responses from the\nbackend"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxySCGIInternalRedirect On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxySCGIInternalRedirect On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_scgi"
            }
        ]
    },
    "proxyscgisendfile": {
        "name": "ProxySCGISendfile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy_scgi.html#proxyscgisendfile",
        "items": [
            {
                "name": "Description:",
                "value": "Enable evaluation of <var>X-Sendfile</var> pseudo response\nheader"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxySCGISendfile On|Off|<var>Headername</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxySCGISendfile Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy_scgi"
            }
        ]
    },
    "proxyset": {
        "name": "ProxySet",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyset",
        "items": [
            {
                "name": "Description:",
                "value": "Set various Proxy balancer or member parameters"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxySet <var>url</var> <var>key=value [key=value ...]</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "ProxySet is only available in Apache HTTP Server 2.2\n  and later."
            }
        ]
    },
    "proxysourceaddress": {
        "name": "ProxySourceAddress",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxysourceaddress",
        "items": [
            {
                "name": "Description:",
                "value": "Set local IP address for outgoing proxy connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxySourceAddress <var>address</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.9 and later"
            }
        ]
    },
    "proxystatus": {
        "name": "ProxyStatus",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxystatus",
        "items": [
            {
                "name": "Description:",
                "value": "Show Proxy LoadBalancer status in mod_status"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyStatus Off|On|Full</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyStatus Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.2 and later"
            }
        ]
    },
    "proxytimeout": {
        "name": "ProxyTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxytimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Network timeout for proxied requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyTimeout <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>Value of <code class=\"directive\"><a href=\"../mod/core.html#timeout\">Timeout</a></code></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "proxyvia": {
        "name": "ProxyVia",
        "href": "/ApacheGUI/manual/2.4/mod/mod_proxy.html#proxyvia",
        "items": [
            {
                "name": "Description:",
                "value": "Information provided in the <code>Via</code> HTTP response\nheader for proxied requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>ProxyVia On|Off|Full|Block</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ProxyVia Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_proxy"
            }
        ]
    },
    "readmename": {
        "name": "ReadmeName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_autoindex.html#readmename",
        "items": [
            {
                "name": "Description:",
                "value": "Name of the file that will be inserted at the end\nof the index listing"
            },
            {
                "name": "Syntax:",
                "value": "<code>ReadmeName <var>filename</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Indexes"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_autoindex"
            }
        ]
    },
    "receivebuffersize": {
        "name": "ReceiveBufferSize",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#receivebuffersize",
        "items": [
            {
                "name": "Description:",
                "value": "TCP receive buffer size"
            },
            {
                "name": "Syntax:",
                "value": "<code>ReceiveBufferSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ReceiveBufferSize 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "redirect": {
        "name": "Redirect",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#redirect",
        "items": [
            {
                "name": "Description:",
                "value": "Sends an external redirect asking the client to fetch\na different URL"
            },
            {
                "name": "Syntax:",
                "value": "<code>Redirect [<var>status</var>] <var>URL-path</var>\n<var>URL</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "redirectmatch": {
        "name": "RedirectMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#redirectmatch",
        "items": [
            {
                "name": "Description:",
                "value": "Sends an external redirect based on a regular expression match\nof the current URL"
            },
            {
                "name": "Syntax:",
                "value": "<code>RedirectMatch [<var>status</var>] <var>regex</var>\n<var>URL</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "redirectpermanent": {
        "name": "RedirectPermanent",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#redirectpermanent",
        "items": [
            {
                "name": "Description:",
                "value": "Sends an external permanent redirect asking the client to fetch\na different URL"
            },
            {
                "name": "Syntax:",
                "value": "<code>RedirectPermanent <var>URL-path</var> <var>URL</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "redirecttemp": {
        "name": "RedirectTemp",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#redirecttemp",
        "items": [
            {
                "name": "Description:",
                "value": "Sends an external temporary redirect asking the client to fetch\na different URL"
            },
            {
                "name": "Syntax:",
                "value": "<code>RedirectTemp <var>URL-path</var> <var>URL</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "reflectorheader": {
        "name": "ReflectorHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_reflector.html#reflectorheader",
        "items": [
            {
                "name": "Description:",
                "value": "Reflect an input header to the output headers"
            },
            {
                "name": "Syntax:",
                "value": "<code>ReflectorHeader <var>inputheader</var> <var>[outputheader]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_reflector"
            }
        ]
    },
    "remoteipheader": {
        "name": "RemoteIPHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_remoteip.html#remoteipheader",
        "items": [
            {
                "name": "Description:",
                "value": "Declare the header field which should be parsed for useragent IP addresses"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoteIPHeader <var>header-field</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_remoteip"
            }
        ]
    },
    "remoteipinternalproxy": {
        "name": "RemoteIPInternalProxy",
        "href": "/ApacheGUI/manual/2.4/mod/mod_remoteip.html#remoteipinternalproxy",
        "items": [
            {
                "name": "Description:",
                "value": "Declare client intranet IP addresses trusted to present the RemoteIPHeader value"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoteIPInternalProxy <var>proxy-ip</var>|<var>proxy-ip/subnet</var>|<var>hostname</var> ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_remoteip"
            }
        ]
    },
    "remoteipinternalproxylist": {
        "name": "RemoteIPInternalProxyList",
        "href": "/ApacheGUI/manual/2.4/mod/mod_remoteip.html#remoteipinternalproxylist",
        "items": [
            {
                "name": "Description:",
                "value": "Declare client intranet IP addresses trusted to present the RemoteIPHeader value"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoteIPInternalProxyList <var>filename</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_remoteip"
            }
        ]
    },
    "remoteipproxiesheader": {
        "name": "RemoteIPProxiesHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_remoteip.html#remoteipproxiesheader",
        "items": [
            {
                "name": "Description:",
                "value": "Declare the header field which will record all intermediate IP addresses"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoteIPProxiesHeader <var>HeaderFieldName</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_remoteip"
            }
        ]
    },
    "remoteiptrustedproxy": {
        "name": "RemoteIPTrustedProxy",
        "href": "/ApacheGUI/manual/2.4/mod/mod_remoteip.html#remoteiptrustedproxy",
        "items": [
            {
                "name": "Description:",
                "value": "Declare client intranet IP addresses trusted to present the RemoteIPHeader value"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoteIPTrustedProxy <var>proxy-ip</var>|<var>proxy-ip/subnet</var>|<var>hostname</var> ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_remoteip"
            }
        ]
    },
    "remoteiptrustedproxylist": {
        "name": "RemoteIPTrustedProxyList",
        "href": "/ApacheGUI/manual/2.4/mod/mod_remoteip.html#remoteiptrustedproxylist",
        "items": [
            {
                "name": "Description:",
                "value": "Declare client intranet IP addresses trusted to present the RemoteIPHeader value"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoteIPTrustedProxyList <var>filename</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_remoteip"
            }
        ]
    },
    "removecharset": {
        "name": "RemoveCharset",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#removecharset",
        "items": [
            {
                "name": "Description:",
                "value": "Removes any character set associations for a set of file\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoveCharset <var>extension</var> [<var>extension</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "removeencoding": {
        "name": "RemoveEncoding",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#removeencoding",
        "items": [
            {
                "name": "Description:",
                "value": "Removes any content encoding associations for a set of file\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoveEncoding <var>extension</var> [<var>extension</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "removehandler": {
        "name": "RemoveHandler",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#removehandler",
        "items": [
            {
                "name": "Description:",
                "value": "Removes any handler associations for a set of file\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoveHandler <var>extension</var> [<var>extension</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "removeinputfilter": {
        "name": "RemoveInputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#removeinputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Removes any input filter associations for a set of file\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoveInputFilter <var>extension</var> [<var>extension</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "removelanguage": {
        "name": "RemoveLanguage",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#removelanguage",
        "items": [
            {
                "name": "Description:",
                "value": "Removes any language associations for a set of file\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoveLanguage <var>extension</var> [<var>extension</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "removeoutputfilter": {
        "name": "RemoveOutputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#removeoutputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Removes any output filter associations for a set of file\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoveOutputFilter <var>extension</var> [<var>extension</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "removetype": {
        "name": "RemoveType",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#removetype",
        "items": [
            {
                "name": "Description:",
                "value": "Removes any content type associations for a set of file\nextensions"
            },
            {
                "name": "Syntax:",
                "value": "<code>RemoveType <var>extension</var> [<var>extension</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "requestheader": {
        "name": "RequestHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_headers.html#requestheader",
        "items": [
            {
                "name": "Description:",
                "value": "Configure HTTP request headers"
            },
            {
                "name": "Syntax:",
                "value": "<code>RequestHeader add|append|edit|edit*|merge|set|setifempty|unset\n<var>header</var> [[expr=]<var>value</var> [<var>replacement</var>]\n[early|env=[!]<var>varname</var>|expr=<var>expression</var>]]\n</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_headers"
            },
            {
                "name": "Compatibility:",
                "value": "SetIfEmpty available in 2.4.7 and later, expr=value \navailable in 2.4.10 and later"
            }
        ]
    },
    "requestreadtimeout": {
        "name": "RequestReadTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_reqtimeout.html#requestreadtimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Set timeout values for receiving request headers and body from client.\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>RequestReadTimeout\n[header=<var>timeout</var>[-<var>maxtimeout</var>][,MinRate=<var>rate</var>]\n[body=<var>timeout</var>[-<var>maxtimeout</var>][,MinRate=<var>rate</var>]\n</code>"
            },
            {
                "name": "Default:",
                "value": "<code>header=20-40,MinRate=500 body=20,MinRate=500</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_reqtimeout"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.2.15 and later; defaulted to disabled in\nversion 2.3.14 and earlier."
            }
        ]
    },
    "require": {
        "name": "Require",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_core.html#require",
        "items": [
            {
                "name": "Description:",
                "value": "Tests whether an authenticated user is authorized by\nan authorization provider."
            },
            {
                "name": "Syntax:",
                "value": "<code>Require [not] <var>entity-name</var>\n    [<var>entity-name</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_core"
            }
        ]
    },
    "requireall": {
        "name": "RequireAll",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_core.html#requireall",
        "items": [
            {
                "name": "Description:",
                "value": "Enclose a group of authorization directives of which none\nmust fail and at least one must succeed for the enclosing directive to\nsucceed."
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;RequireAll&gt; ... &lt;/RequireAll&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_core"
            }
        ]
    },
    "requireany": {
        "name": "RequireAny",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_core.html#requireany",
        "items": [
            {
                "name": "Description:",
                "value": "Enclose a group of authorization directives of which one\nmust succeed for the enclosing directive to succeed."
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;RequireAny&gt; ... &lt;/RequireAny&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_core"
            }
        ]
    },
    "requirenone": {
        "name": "RequireNone",
        "href": "/ApacheGUI/manual/2.4/mod/mod_authz_core.html#requirenone",
        "items": [
            {
                "name": "Description:",
                "value": "Enclose a group of authorization directives of which none\nmust succeed for the enclosing directive to not fail."
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;RequireNone&gt; ... &lt;/RequireNone&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_authz_core"
            }
        ]
    },
    "rewritebase": {
        "name": "RewriteBase",
        "href": "/ApacheGUI/manual/2.4/mod/mod_rewrite.html#rewritebase",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the base URL for per-directory rewrites"
            },
            {
                "name": "Syntax:",
                "value": "<code>RewriteBase <em>URL-path</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>None</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_rewrite"
            }
        ]
    },
    "rewritecond": {
        "name": "RewriteCond",
        "href": "/ApacheGUI/manual/2.4/mod/mod_rewrite.html#rewritecond",
        "items": [
            {
                "name": "Description:",
                "value": "Defines a condition under which rewriting will take place\n"
            },
            {
                "name": "Syntax:",
                "value": "<code> RewriteCond\n      <em>TestString</em> <em>CondPattern</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_rewrite"
            }
        ]
    },
    "rewriteengine": {
        "name": "RewriteEngine",
        "href": "/ApacheGUI/manual/2.4/mod/mod_rewrite.html#rewriteengine",
        "items": [
            {
                "name": "Description:",
                "value": "Enables or disables runtime rewriting engine"
            },
            {
                "name": "Syntax:",
                "value": "<code>RewriteEngine on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>RewriteEngine off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_rewrite"
            }
        ]
    },
    "rewritemap": {
        "name": "RewriteMap",
        "href": "/ApacheGUI/manual/2.4/mod/mod_rewrite.html#rewritemap",
        "items": [
            {
                "name": "Description:",
                "value": "Defines a mapping function for key-lookup"
            },
            {
                "name": "Syntax:",
                "value": "<code>RewriteMap <em>MapName</em> <em>MapType</em>:<em>MapSource</em>\n</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_rewrite"
            }
        ]
    },
    "rewriteoptions": {
        "name": "RewriteOptions",
        "href": "/ApacheGUI/manual/2.4/mod/mod_rewrite.html#rewriteoptions",
        "items": [
            {
                "name": "Description:",
                "value": "Sets some special options for the rewrite engine"
            },
            {
                "name": "Syntax:",
                "value": "<code>RewriteOptions <var>Options</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_rewrite"
            },
            {
                "name": "Compatibility:",
                "value": "<code>MaxRedirects</code> is no longer available in version 2.1 and\nlater"
            }
        ]
    },
    "rewriterule": {
        "name": "RewriteRule",
        "href": "/ApacheGUI/manual/2.4/mod/mod_rewrite.html#rewriterule",
        "items": [
            {
                "name": "Description:",
                "value": "Defines rules for the rewriting engine"
            },
            {
                "name": "Syntax:",
                "value": "<code>RewriteRule\n      <em>Pattern</em> <em>Substitution</em> [<em>flags</em>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_rewrite"
            }
        ]
    },
    "rlimitcpu": {
        "name": "RLimitCPU",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#rlimitcpu",
        "items": [
            {
                "name": "Description:",
                "value": "Limits the CPU consumption of processes launched\nby Apache httpd children"
            },
            {
                "name": "Syntax:",
                "value": "<code>RLimitCPU <var>seconds</var>|max [<var>seconds</var>|max]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Unset; uses operating system defaults</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "rlimitmem": {
        "name": "RLimitMEM",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#rlimitmem",
        "items": [
            {
                "name": "Description:",
                "value": "Limits the memory consumption of processes launched\nby Apache httpd children"
            },
            {
                "name": "Syntax:",
                "value": "<code>RLimitMEM <var>bytes</var>|max [<var>bytes</var>|max]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Unset; uses operating system defaults</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "rlimitnproc": {
        "name": "RLimitNPROC",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#rlimitnproc",
        "items": [
            {
                "name": "Description:",
                "value": "Limits the number of processes that can be launched by\nprocesses launched by Apache httpd children"
            },
            {
                "name": "Syntax:",
                "value": "<code>RLimitNPROC <var>number</var>|max [<var>number</var>|max]</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Unset; uses operating system defaults</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "satisfy": {
        "name": "Satisfy",
        "href": "/ApacheGUI/manual/2.4/mod/mod_access_compat.html#satisfy",
        "items": [
            {
                "name": "Description:",
                "value": "Interaction between host-level access control and\nuser authentication"
            },
            {
                "name": "Syntax:",
                "value": "<code>Satisfy Any|All</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Satisfy All</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_access_compat"
            },
            {
                "name": "Compatibility:",
                "value": "Influenced by <code class=\"directive\"><a href=\"../mod/core.html#limit\">&lt;Limit&gt;</a></code> and <code class=\"directive\"><a href=\"../mod/core.html#limitexcept\">&lt;LimitExcept&gt;</a></code> in version 2.0.51 and\nlater"
            }
        ]
    },
    "scoreboardfile": {
        "name": "ScoreBoardFile",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#scoreboardfile",
        "items": [
            {
                "name": "Description:",
                "value": "Location of the file used to store coordination data for\nthe child processes"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScoreBoardFile <var>file-path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ScoreBoardFile logs/apache_runtime_status</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "script": {
        "name": "Script",
        "href": "/ApacheGUI/manual/2.4/mod/mod_actions.html#script",
        "items": [
            {
                "name": "Description:",
                "value": "Activates a CGI script for a particular request\nmethod."
            },
            {
                "name": "Syntax:",
                "value": "<code>Script <var>method</var> <var>cgi-script</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_actions"
            }
        ]
    },
    "scriptalias": {
        "name": "ScriptAlias",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#scriptalias",
        "items": [
            {
                "name": "Description:",
                "value": "Maps a URL to a filesystem location and designates the\ntarget as a CGI script"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScriptAlias <var>URL-path</var>\n<var>file-path</var>|<var>directory-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "scriptaliasmatch": {
        "name": "ScriptAliasMatch",
        "href": "/ApacheGUI/manual/2.4/mod/mod_alias.html#scriptaliasmatch",
        "items": [
            {
                "name": "Description:",
                "value": "Maps a URL to a filesystem location using a regular expression\nand designates the target as a CGI script"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScriptAliasMatch <var>regex</var>\n<var>file-path</var>|<var>directory-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_alias"
            }
        ]
    },
    "scriptinterpretersource": {
        "name": "ScriptInterpreterSource",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#scriptinterpretersource",
        "items": [
            {
                "name": "Description:",
                "value": "Technique for locating the interpreter for CGI\nscripts"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScriptInterpreterSource Registry|Registry-Strict|Script</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ScriptInterpreterSource Script</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Win32 only."
            }
        ]
    },
    "scriptlog": {
        "name": "ScriptLog",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cgi.html#scriptlog",
        "items": [
            {
                "name": "Description:",
                "value": "Location of the CGI script error logfile"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScriptLog <var>file-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/mod_cgi.html\">mod_cgi</a></code>, <code class=\"module\"><a href=\"../mod/mod_cgid.html\">mod_cgid</a></code>"
            }
        ]
    },
    "scriptlogbuffer": {
        "name": "ScriptLogBuffer",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cgi.html#scriptlogbuffer",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum amount of PUT or POST requests that will be recorded\nin the scriptlog"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScriptLogBuffer <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ScriptLogBuffer 1024</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/mod_cgi.html\">mod_cgi</a></code>, <code class=\"module\"><a href=\"../mod/mod_cgid.html\">mod_cgid</a></code>"
            }
        ]
    },
    "scriptloglength": {
        "name": "ScriptLogLength",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cgi.html#scriptloglength",
        "items": [
            {
                "name": "Description:",
                "value": "Size limit of the CGI script logfile"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScriptLogLength <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ScriptLogLength 10385760</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/mod_cgi.html\">mod_cgi</a></code>, <code class=\"module\"><a href=\"../mod/mod_cgid.html\">mod_cgid</a></code>"
            }
        ]
    },
    "scriptsock": {
        "name": "ScriptSock",
        "href": "/ApacheGUI/manual/2.4/mod/mod_cgid.html#scriptsock",
        "items": [
            {
                "name": "Description:",
                "value": "The filename prefix of the socket to use for communication with\nthe cgi daemon"
            },
            {
                "name": "Syntax:",
                "value": "<code>ScriptSock <var>file-path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ScriptSock cgisock</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_cgid"
            }
        ]
    },
    "securelisten": {
        "name": "SecureListen",
        "href": "/ApacheGUI/manual/2.4/mod/mod_nw_ssl.html#securelisten",
        "items": [
            {
                "name": "Description:",
                "value": "Enables SSL encryption for the specified port"
            },
            {
                "name": "Syntax:",
                "value": "<code>SecureListen [<var>IP-address</var>:]<var>portnumber</var>\n<var>Certificate-Name</var> [MUTUAL]</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_nw_ssl"
            }
        ]
    },
    "seerequesttail": {
        "name": "SeeRequestTail",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#seerequesttail",
        "items": [
            {
                "name": "Description:",
                "value": "Determine if mod_status displays the first 63 characters\nof a request or the last 63, assuming the request itself is greater than\n63 chars."
            },
            {
                "name": "Syntax:",
                "value": "<code>SeeRequestTail On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SeeRequestTail Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache httpd 2.2.7 and later."
            }
        ]
    },
    "sendbuffersize": {
        "name": "SendBufferSize",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#sendbuffersize",
        "items": [
            {
                "name": "Description:",
                "value": "TCP buffer size"
            },
            {
                "name": "Syntax:",
                "value": "<code>SendBufferSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SendBufferSize 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "serveradmin": {
        "name": "ServerAdmin",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#serveradmin",
        "items": [
            {
                "name": "Description:",
                "value": "Email address that the server includes in error\nmessages sent to the client"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerAdmin <var>email-address</var>|<var>URL</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "serveralias": {
        "name": "ServerAlias",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#serveralias",
        "items": [
            {
                "name": "Description:",
                "value": "Alternate names for a host used when matching requests\nto name-virtual hosts"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerAlias <var>hostname</var> [<var>hostname</var>] ...</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "serverlimit": {
        "name": "ServerLimit",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#serverlimit",
        "items": [
            {
                "name": "Description:",
                "value": "Upper limit on configurable number of processes"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerLimit <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "servername": {
        "name": "ServerName",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#servername",
        "items": [
            {
                "name": "Description:",
                "value": "Hostname and port that the server uses to identify\nitself"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerName [<var>scheme</var>://]<var>fully-qualified-domain-name</var>[:<var>port</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "serverpath": {
        "name": "ServerPath",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#serverpath",
        "items": [
            {
                "name": "Description:",
                "value": "Legacy URL pathname for a name-based virtual host that\nis accessed by an incompatible browser"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerPath <var>URL-path</var></code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "serverroot": {
        "name": "ServerRoot",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#serverroot",
        "items": [
            {
                "name": "Description:",
                "value": "Base directory for the server installation"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerRoot <var>directory-path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>ServerRoot /usr/local/apache</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "serversignature": {
        "name": "ServerSignature",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#serversignature",
        "items": [
            {
                "name": "Description:",
                "value": "Configures the footer on server-generated documents"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerSignature On|Off|EMail</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ServerSignature Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "servertokens": {
        "name": "ServerTokens",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#servertokens",
        "items": [
            {
                "name": "Description:",
                "value": "Configures the <code>Server</code> HTTP response\nheader"
            },
            {
                "name": "Syntax:",
                "value": "<code>ServerTokens Major|Minor|Min[imal]|Prod[uctOnly]|OS|Full</code>"
            },
            {
                "name": "Default:",
                "value": "<code>ServerTokens Full</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "session": {
        "name": "Session",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session.html#session",
        "items": [
            {
                "name": "Description:",
                "value": "Enables a session for the current directory or location"
            },
            {
                "name": "Syntax:",
                "value": "<code>Session On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>Session Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session"
            }
        ]
    },
    "sessioncookiename": {
        "name": "SessionCookieName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_cookie.html#sessioncookiename",
        "items": [
            {
                "name": "Description:",
                "value": "Name and attributes for the RFC2109 cookie storing the session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionCookieName <var>name</var> <var>attributes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_cookie"
            }
        ]
    },
    "sessioncookiename2": {
        "name": "SessionCookieName2",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_cookie.html#sessioncookiename2",
        "items": [
            {
                "name": "Description:",
                "value": "Name and attributes for the RFC2965 cookie storing the session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionCookieName2 <var>name</var> <var>attributes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_cookie"
            }
        ]
    },
    "sessioncookieremove": {
        "name": "SessionCookieRemove",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_cookie.html#sessioncookieremove",
        "items": [
            {
                "name": "Description:",
                "value": "Control for whether session cookies should be removed from incoming HTTP headers"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionCookieRemove On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionCookieRemove Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_cookie"
            }
        ]
    },
    "sessioncryptocipher": {
        "name": "SessionCryptoCipher",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_crypto.html#sessioncryptocipher",
        "items": [
            {
                "name": "Description:",
                "value": "The crypto cipher to be used to encrypt the session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionCryptoCipher <var>name</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>aes256</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_session_crypto"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.0 and later"
            }
        ]
    },
    "sessioncryptodriver": {
        "name": "SessionCryptoDriver",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_crypto.html#sessioncryptodriver",
        "items": [
            {
                "name": "Description:",
                "value": "The crypto driver to be used to encrypt the session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionCryptoDriver <var>name</var> <var>[param[=value]]</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_session_crypto"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.0 and later"
            }
        ]
    },
    "sessioncryptopassphrase": {
        "name": "SessionCryptoPassphrase",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_crypto.html#sessioncryptopassphrase",
        "items": [
            {
                "name": "Description:",
                "value": "The key used to encrypt the session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionCryptoPassphrase <var>secret</var> [ <var>secret</var> ... ] </code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_session_crypto"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.0 and later"
            }
        ]
    },
    "sessioncryptopassphrasefile": {
        "name": "SessionCryptoPassphraseFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_crypto.html#sessioncryptopassphrasefile",
        "items": [
            {
                "name": "Description:",
                "value": "File containing keys used to encrypt the session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionCryptoPassphraseFile <var>filename</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_session_crypto"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.3.0 and later"
            }
        ]
    },
    "sessiondbdcookiename": {
        "name": "SessionDBDCookieName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbdcookiename",
        "items": [
            {
                "name": "Description:",
                "value": "Name and attributes for the RFC2109 cookie storing the session ID"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDCookieName <var>name</var> <var>attributes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessiondbdcookiename2": {
        "name": "SessionDBDCookieName2",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbdcookiename2",
        "items": [
            {
                "name": "Description:",
                "value": "Name and attributes for the RFC2965 cookie storing the session ID"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDCookieName2 <var>name</var> <var>attributes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessiondbdcookieremove": {
        "name": "SessionDBDCookieRemove",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbdcookieremove",
        "items": [
            {
                "name": "Description:",
                "value": "Control for whether session ID cookies should be removed from incoming HTTP headers"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDCookieRemove On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionDBDCookieRemove On</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessiondbddeletelabel": {
        "name": "SessionDBDDeleteLabel",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbddeletelabel",
        "items": [
            {
                "name": "Description:",
                "value": "The SQL query to use to remove sessions from the database"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDDeleteLabel <var>label</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionDBDDeleteLabel deletesession</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessiondbdinsertlabel": {
        "name": "SessionDBDInsertLabel",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbdinsertlabel",
        "items": [
            {
                "name": "Description:",
                "value": "The SQL query to use to insert sessions into the database"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDInsertLabel <var>label</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionDBDInsertLabel insertsession</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessiondbdperuser": {
        "name": "SessionDBDPerUser",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbdperuser",
        "items": [
            {
                "name": "Description:",
                "value": "Enable a per user session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDPerUser On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionDBDPerUser Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessiondbdselectlabel": {
        "name": "SessionDBDSelectLabel",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbdselectlabel",
        "items": [
            {
                "name": "Description:",
                "value": "The SQL query to use to select sessions from the database"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDSelectLabel <var>label</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionDBDSelectLabel selectsession</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessiondbdupdatelabel": {
        "name": "SessionDBDUpdateLabel",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session_dbd.html#sessiondbdupdatelabel",
        "items": [
            {
                "name": "Description:",
                "value": "The SQL query to use to update existing sessions in the database"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionDBDUpdateLabel <var>label</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionDBDUpdateLabel updatesession</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session_dbd"
            }
        ]
    },
    "sessionenv": {
        "name": "SessionEnv",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session.html#sessionenv",
        "items": [
            {
                "name": "Description:",
                "value": "Control whether the contents of the session are written to the\n<var>HTTP_SESSION</var> environment variable"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionEnv On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionEnv Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session"
            }
        ]
    },
    "sessionexclude": {
        "name": "SessionExclude",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session.html#sessionexclude",
        "items": [
            {
                "name": "Description:",
                "value": "Define URL prefixes for which a session is ignored"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionExclude <var>path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session"
            }
        ]
    },
    "sessionheader": {
        "name": "SessionHeader",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session.html#sessionheader",
        "items": [
            {
                "name": "Description:",
                "value": "Import session updates from a given HTTP response header"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionHeader <var>header</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session"
            }
        ]
    },
    "sessioninclude": {
        "name": "SessionInclude",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session.html#sessioninclude",
        "items": [
            {
                "name": "Description:",
                "value": "Define URL prefixes for which a session is valid"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionInclude <var>path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>all URLs</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session"
            }
        ]
    },
    "sessionmaxage": {
        "name": "SessionMaxAge",
        "href": "/ApacheGUI/manual/2.4/mod/mod_session.html#sessionmaxage",
        "items": [
            {
                "name": "Description:",
                "value": "Define a maximum age in seconds for a session"
            },
            {
                "name": "Syntax:",
                "value": "<code>SessionMaxAge <var>maxage</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SessionMaxAge 0</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_session"
            }
        ]
    },
    "setenv": {
        "name": "SetEnv",
        "href": "/ApacheGUI/manual/2.4/mod/mod_env.html#setenv",
        "items": [
            {
                "name": "Description:",
                "value": "Sets environment variables"
            },
            {
                "name": "Syntax:",
                "value": "<code>SetEnv <var>env-variable</var> [<var>value</var>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_env"
            }
        ]
    },
    "setenvif": {
        "name": "SetEnvIf",
        "href": "/ApacheGUI/manual/2.4/mod/mod_setenvif.html#setenvif",
        "items": [
            {
                "name": "Description:",
                "value": "Sets environment variables based on attributes of the request\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>SetEnvIf <em>attribute\n    regex [!]env-variable</em>[=<em>value</em>]\n    [[!]<em>env-variable</em>[=<em>value</em>]] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_setenvif"
            }
        ]
    },
    "setenvifexpr": {
        "name": "SetEnvIfExpr",
        "href": "/ApacheGUI/manual/2.4/mod/mod_setenvif.html#setenvifexpr",
        "items": [
            {
                "name": "Description:",
                "value": "Sets environment variables based on an ap_expr expression"
            },
            {
                "name": "Syntax:",
                "value": "<code>SetEnvIfExpr <em>expr\n    [!]env-variable</em>[=<em>value</em>]\n    [[!]<em>env-variable</em>[=<em>value</em>]] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_setenvif"
            }
        ]
    },
    "setenvifnocase": {
        "name": "SetEnvIfNoCase",
        "href": "/ApacheGUI/manual/2.4/mod/mod_setenvif.html#setenvifnocase",
        "items": [
            {
                "name": "Description:",
                "value": "Sets environment variables based on attributes of the request\nwithout respect to case"
            },
            {
                "name": "Syntax:",
                "value": "<code>SetEnvIfNoCase <em>attribute regex\n        [!]env-variable</em>[=<em>value</em>]\n    [[!]<em>env-variable</em>[=<em>value</em>]] ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_setenvif"
            }
        ]
    },
    "sethandler": {
        "name": "SetHandler",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#sethandler",
        "items": [
            {
                "name": "Description:",
                "value": "Forces all matching files to be processed by a\nhandler"
            },
            {
                "name": "Syntax:",
                "value": "<code>SetHandler <var>handler-name</var>|None</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "setinputfilter": {
        "name": "SetInputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#setinputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the filters that will process client requests and POST\ninput"
            },
            {
                "name": "Syntax:",
                "value": "<code>SetInputFilter <var>filter</var>[;<var>filter</var>...]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "setoutputfilter": {
        "name": "SetOutputFilter",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#setoutputfilter",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the filters that will process responses from the\nserver"
            },
            {
                "name": "Syntax:",
                "value": "<code>SetOutputFilter <var>filter</var>[;<var>filter</var>...]</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "ssiendtag": {
        "name": "SSIEndTag",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssiendtag",
        "items": [
            {
                "name": "Description:",
                "value": "String that ends an include element"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSIEndTag <var>tag</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSIEndTag \"--&gt;\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            }
        ]
    },
    "ssierrormsg": {
        "name": "SSIErrorMsg",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssierrormsg",
        "items": [
            {
                "name": "Description:",
                "value": "Error message displayed when there is an SSI\nerror"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSIErrorMsg <var>message</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSIErrorMsg \"[an error occurred while processing this\ndirective]\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            }
        ]
    },
    "ssietag": {
        "name": "SSIETag",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssietag",
        "items": [
            {
                "name": "Description:",
                "value": "Controls whether ETags are generated by the server."
            },
            {
                "name": "Syntax:",
                "value": "<code>SSIETag on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSIETag off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.2.15 and later."
            }
        ]
    },
    "ssilastmodified": {
        "name": "SSILastModified",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssilastmodified",
        "items": [
            {
                "name": "Description:",
                "value": "Controls whether <code>Last-Modified</code> headers are generated by the\nserver."
            },
            {
                "name": "Syntax:",
                "value": "<code>SSILastModified on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSILastModified off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.2.15 and later."
            }
        ]
    },
    "ssilegacyexprparser": {
        "name": "SSILegacyExprParser",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssilegacyexprparser",
        "items": [
            {
                "name": "Description:",
                "value": "Enable compatibility mode for conditional expressions."
            },
            {
                "name": "Syntax:",
                "value": "<code>SSILegacyExprParser on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSILegacyExprParser off</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            },
            {
                "name": "Compatibility:",
                "value": "Available in version 2.3.13 and later."
            }
        ]
    },
    "ssistarttag": {
        "name": "SSIStartTag",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssistarttag",
        "items": [
            {
                "name": "Description:",
                "value": "String that starts an include element"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSIStartTag <var>tag</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSIStartTag \"&lt;!--#\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            }
        ]
    },
    "ssitimeformat": {
        "name": "SSITimeFormat",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssitimeformat",
        "items": [
            {
                "name": "Description:",
                "value": "Configures the format in which date strings are\ndisplayed"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSITimeFormat <var>formatstring</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSITimeFormat \"%A, %d-%b-%Y %H:%M:%S %Z\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            }
        ]
    },
    "ssiundefinedecho": {
        "name": "SSIUndefinedEcho",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#ssiundefinedecho",
        "items": [
            {
                "name": "Description:",
                "value": "String displayed when an unset variable is echoed"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSIUndefinedEcho <var>string</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSIUndefinedEcho \"(none)\"</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "All"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            }
        ]
    },
    "sslcacertificatefile": {
        "name": "SSLCACertificateFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcacertificatefile",
        "items": [
            {
                "name": "Description:",
                "value": "File of concatenated PEM-encoded CA Certificates\nfor Client Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCACertificateFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcacertificatepath": {
        "name": "SSLCACertificatePath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcacertificatepath",
        "items": [
            {
                "name": "Description:",
                "value": "Directory of PEM-encoded CA Certificates for\nClient Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCACertificatePath <em>directory-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcadnrequestfile": {
        "name": "SSLCADNRequestFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcadnrequestfile",
        "items": [
            {
                "name": "Description:",
                "value": "File of concatenated PEM-encoded CA Certificates\nfor defining acceptable CA names"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCADNRequestFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcadnrequestpath": {
        "name": "SSLCADNRequestPath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcadnrequestpath",
        "items": [
            {
                "name": "Description:",
                "value": "Directory of PEM-encoded CA Certificates for\ndefining acceptable CA names"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCADNRequestPath <em>directory-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcarevocationcheck": {
        "name": "SSLCARevocationCheck",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcarevocationcheck",
        "items": [
            {
                "name": "Description:",
                "value": "Enable CRL-based revocation checking"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCARevocationCheck chain|leaf|none</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLCARevocationCheck none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcarevocationfile": {
        "name": "SSLCARevocationFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcarevocationfile",
        "items": [
            {
                "name": "Description:",
                "value": "File of concatenated PEM-encoded CA CRLs for\nClient Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCARevocationFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcarevocationpath": {
        "name": "SSLCARevocationPath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcarevocationpath",
        "items": [
            {
                "name": "Description:",
                "value": "Directory of PEM-encoded CA CRLs for\nClient Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCARevocationPath <em>directory-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcertificatechainfile": {
        "name": "SSLCertificateChainFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcertificatechainfile",
        "items": [
            {
                "name": "Description:",
                "value": "File of PEM-encoded Server CA Certificates"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCertificateChainFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcertificatefile": {
        "name": "SSLCertificateFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcertificatefile",
        "items": [
            {
                "name": "Description:",
                "value": "Server PEM-encoded X.509 certificate data file"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCertificateFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcertificatekeyfile": {
        "name": "SSLCertificateKeyFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcertificatekeyfile",
        "items": [
            {
                "name": "Description:",
                "value": "Server PEM-encoded private key file"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCertificateKeyFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslciphersuite": {
        "name": "SSLCipherSuite",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslciphersuite",
        "items": [
            {
                "name": "Description:",
                "value": "Cipher Suite available for negotiation in SSL\nhandshake"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCipherSuite <em>cipher-spec</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLCipherSuite DEFAULT (depends on OpenSSL version)</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslcompression": {
        "name": "SSLCompression",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcompression",
        "items": [
            {
                "name": "Description:",
                "value": "Enable compression on the SSL level"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCompression on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLCompression off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.3 and later, if using OpenSSL 0.9.8 or later;\nvirtual host scope available if using OpenSSL 1.0.0 or later.\nThe default used to be <code>on</code> in version 2.4.3."
            }
        ]
    },
    "sslcryptodevice": {
        "name": "SSLCryptoDevice",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslcryptodevice",
        "items": [
            {
                "name": "Description:",
                "value": "Enable use of a cryptographic hardware accelerator"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLCryptoDevice <em>engine</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLCryptoDevice builtin</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslengine": {
        "name": "SSLEngine",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslengine",
        "items": [
            {
                "name": "Description:",
                "value": "SSL Engine Operation Switch"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLEngine on|off|optional</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLEngine off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslfips": {
        "name": "SSLFIPS",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslfips",
        "items": [
            {
                "name": "Description:",
                "value": "SSL FIPS mode Switch"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLFIPS on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLFIPS off</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslhonorcipherorder": {
        "name": "SSLHonorCipherOrder",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslhonorcipherorder",
        "items": [
            {
                "name": "Description:",
                "value": "Option to prefer the server's cipher preference order"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLHonorCipherOrder on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLHonorCipherOrder off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslinsecurerenegotiation": {
        "name": "SSLInsecureRenegotiation",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslinsecurerenegotiation",
        "items": [
            {
                "name": "Description:",
                "value": "Option to enable support for insecure renegotiation"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLInsecureRenegotiation on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLInsecureRenegotiation off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.2.15 and later, if using OpenSSL 0.9.8m or later"
            }
        ]
    },
    "sslocspdefaultresponder": {
        "name": "SSLOCSPDefaultResponder",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslocspdefaultresponder",
        "items": [
            {
                "name": "Description:",
                "value": "Set the default responder URI for OCSP validation"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOCSDefaultResponder <em>uri</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslocspenable": {
        "name": "SSLOCSPEnable",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslocspenable",
        "items": [
            {
                "name": "Description:",
                "value": "Enable OCSP validation of the client certificate chain"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOCSPEnable on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLOCSPEnable off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslocspoverrideresponder": {
        "name": "SSLOCSPOverrideResponder",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslocspoverrideresponder",
        "items": [
            {
                "name": "Description:",
                "value": "Force use of the default responder URI for OCSP validation"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOCSPOverrideResponder on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLOCSPOverrideResponder off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslocsprespondertimeout": {
        "name": "SSLOCSPResponderTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslocsprespondertimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Timeout for OCSP queries"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOCSPResponderTimeout <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLOCSPResponderTimeout 10</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslocspresponsemaxage": {
        "name": "SSLOCSPResponseMaxAge",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslocspresponsemaxage",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum allowable age for OCSP responses"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOCSPResponseMaxAge <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLOCSPResponseMaxAge -1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslocspresponsetimeskew": {
        "name": "SSLOCSPResponseTimeSkew",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslocspresponsetimeskew",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum allowable time skew for OCSP response validation"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOCSPResponseTimeSkew <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLOCSPResponseTimeSkew 300</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslocspuserequestnonce": {
        "name": "SSLOCSPUseRequestNonce",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslocspuserequestnonce",
        "items": [
            {
                "name": "Description:",
                "value": "Use a nonce within OCSP queries"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOCSPUseRequestNonce on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLOCSPUseRequestNonce on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.10 and later"
            }
        ]
    },
    "sslopensslconfcmd": {
        "name": "SSLOpenSSLConfCmd",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslopensslconfcmd",
        "items": [
            {
                "name": "Description:",
                "value": "Configure OpenSSL parameters through its <em>SSL_CONF</em> API"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOpenSSLConfCmd <em>command-name</em> <em>command-value</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.8 and later, if using OpenSSL 1.0.2 or later"
            }
        ]
    },
    "ssloptions": {
        "name": "SSLOptions",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#ssloptions",
        "items": [
            {
                "name": "Description:",
                "value": "Configure various SSL engine run-time options"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLOptions [+|-]<em>option</em> ...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslpassphrasedialog": {
        "name": "SSLPassPhraseDialog",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslpassphrasedialog",
        "items": [
            {
                "name": "Description:",
                "value": "Type of pass phrase dialog for encrypted private\nkeys"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLPassPhraseDialog <em>type</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLPassPhraseDialog builtin</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslprotocol": {
        "name": "SSLProtocol",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslprotocol",
        "items": [
            {
                "name": "Description:",
                "value": "Configure usable SSL/TLS protocol versions"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProtocol [+|-]<em>protocol</em> ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProtocol all</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycacertificatefile": {
        "name": "SSLProxyCACertificateFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycacertificatefile",
        "items": [
            {
                "name": "Description:",
                "value": "File of concatenated PEM-encoded CA Certificates\nfor Remote Server Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCACertificateFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycacertificatepath": {
        "name": "SSLProxyCACertificatePath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycacertificatepath",
        "items": [
            {
                "name": "Description:",
                "value": "Directory of PEM-encoded CA Certificates for\nRemote Server Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCACertificatePath <em>directory-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycarevocationcheck": {
        "name": "SSLProxyCARevocationCheck",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycarevocationcheck",
        "items": [
            {
                "name": "Description:",
                "value": "Enable CRL-based revocation checking for Remote Server Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCARevocationCheck chain|leaf|none</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyCARevocationCheck none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycarevocationfile": {
        "name": "SSLProxyCARevocationFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycarevocationfile",
        "items": [
            {
                "name": "Description:",
                "value": "File of concatenated PEM-encoded CA CRLs for\nRemote Server Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCARevocationFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycarevocationpath": {
        "name": "SSLProxyCARevocationPath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycarevocationpath",
        "items": [
            {
                "name": "Description:",
                "value": "Directory of PEM-encoded CA CRLs for\nRemote Server Auth"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCARevocationPath <em>directory-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycheckpeercn": {
        "name": "SSLProxyCheckPeerCN",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycheckpeercn",
        "items": [
            {
                "name": "Description:",
                "value": "Whether to check the remote server certificate's CN field\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCheckPeerCN on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyCheckPeerCN on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycheckpeerexpire": {
        "name": "SSLProxyCheckPeerExpire",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycheckpeerexpire",
        "items": [
            {
                "name": "Description:",
                "value": "Whether to check if remote server certificate is expired\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCheckPeerExpire on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyCheckPeerExpire on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxycheckpeername": {
        "name": "SSLProxyCheckPeerName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxycheckpeername",
        "items": [
            {
                "name": "Description:",
                "value": "Configure host name checking for remote server certificates\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCheckPeerName on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyCheckPeerName on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Apache HTTP Server 2.4.5 and later"
            }
        ]
    },
    "sslproxyciphersuite": {
        "name": "SSLProxyCipherSuite",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxyciphersuite",
        "items": [
            {
                "name": "Description:",
                "value": "Cipher Suite available for negotiation in SSL\nproxy handshake"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyCipherSuite <em>cipher-spec</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyCipherSuite ALL:!ADH:RC4+RSA:+HIGH:+MEDIUM:+LOW:+EXP</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxyengine": {
        "name": "SSLProxyEngine",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxyengine",
        "items": [
            {
                "name": "Description:",
                "value": "SSL Proxy Engine Operation Switch"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyEngine on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyEngine off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxymachinecertificatechainfile": {
        "name": "SSLProxyMachineCertificateChainFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxymachinecertificatechainfile",
        "items": [
            {
                "name": "Description:",
                "value": "File of concatenated PEM-encoded CA certificates to be used by the proxy for choosing a certificate"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyMachineCertificateChainFile <em>filename</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Override:",
                "value": "Not applicable"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxymachinecertificatefile": {
        "name": "SSLProxyMachineCertificateFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxymachinecertificatefile",
        "items": [
            {
                "name": "Description:",
                "value": "File of concatenated PEM-encoded client certificates and keys to be used by the proxy"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyMachineCertificateFile <em>filename</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Override:",
                "value": "Not applicable"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxymachinecertificatepath": {
        "name": "SSLProxyMachineCertificatePath",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxymachinecertificatepath",
        "items": [
            {
                "name": "Description:",
                "value": "Directory of PEM-encoded client certificates and keys to be used by the proxy"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyMachineCertificatePath <em>directory</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Override:",
                "value": "Not applicable"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxyprotocol": {
        "name": "SSLProxyProtocol",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxyprotocol",
        "items": [
            {
                "name": "Description:",
                "value": "Configure usable SSL protocol flavors for proxy usage"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyProtocol [+|-]<em>protocol</em> ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyProtocol all</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxyverify": {
        "name": "SSLProxyVerify",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxyverify",
        "items": [
            {
                "name": "Description:",
                "value": "Type of remote server Certificate verification"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyVerify <em>level</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyVerify none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslproxyverifydepth": {
        "name": "SSLProxyVerifyDepth",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslproxyverifydepth",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum depth of CA Certificates in Remote Server\nCertificate verification"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLProxyVerifyDepth <em>number</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLProxyVerifyDepth 1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslrandomseed": {
        "name": "SSLRandomSeed",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslrandomseed",
        "items": [
            {
                "name": "Description:",
                "value": "Pseudo Random Number Generator (PRNG) seeding\nsource"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLRandomSeed <em>context</em> <em>source</em>\n[<em>bytes</em>]</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslrenegbuffersize": {
        "name": "SSLRenegBufferSize",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslrenegbuffersize",
        "items": [
            {
                "name": "Description:",
                "value": "Set the size for the SSL renegotiation buffer"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLRenegBufferSize <var>bytes</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLRenegBufferSize 131072</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslrequire": {
        "name": "SSLRequire",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslrequire",
        "items": [
            {
                "name": "Description:",
                "value": "Allow access only when an arbitrarily complex\nboolean expression is true"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLRequire <em>expression</em></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslrequiressl": {
        "name": "SSLRequireSSL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslrequiressl",
        "items": [
            {
                "name": "Description:",
                "value": "Deny access when SSL is not used for the\nHTTP request"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLRequireSSL</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslsessioncache": {
        "name": "SSLSessionCache",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslsessioncache",
        "items": [
            {
                "name": "Description:",
                "value": "Type of the global/inter-process SSL Session\nCache"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLSessionCache <em>type</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLSessionCache none</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslsessioncachetimeout": {
        "name": "SSLSessionCacheTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslsessioncachetimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Number of seconds before an SSL session expires\nin the Session Cache"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLSessionCacheTimeout <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLSessionCacheTimeout 300</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Applies also to RFC 5077 TLS session resumption in Apache 2.4.10 and later"
            }
        ]
    },
    "sslsessionticketkeyfile": {
        "name": "SSLSessionTicketKeyFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslsessionticketkeyfile",
        "items": [
            {
                "name": "Description:",
                "value": "Persistent encryption/decryption key for TLS session tickets"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLSessionTicketKeyFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.0 and later, if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslsessiontickets": {
        "name": "SSLSessionTickets",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslsessiontickets",
        "items": [
            {
                "name": "Description:",
                "value": "Enable or disable use of TLS session tickets"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLSessionTickets on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLSessionTickets on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.11 and later, if using OpenSSL 0.9.8f\nor later."
            }
        ]
    },
    "sslsrpunknownuserseed": {
        "name": "SSLSRPUnknownUserSeed",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslsrpunknownuserseed",
        "items": [
            {
                "name": "Description:",
                "value": "SRP unknown user seed"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLSRPUnknownUserSeed <em>secret-string</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.4 and later, if using OpenSSL 1.0.1 or\nlater"
            }
        ]
    },
    "sslsrpverifierfile": {
        "name": "SSLSRPVerifierFile",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslsrpverifierfile",
        "items": [
            {
                "name": "Description:",
                "value": "Path to SRP verifier file"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLSRPVerifierFile <em>file-path</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.4 and later, if using OpenSSL 1.0.1 or\nlater"
            }
        ]
    },
    "sslstaplingcache": {
        "name": "SSLStaplingCache",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingcache",
        "items": [
            {
                "name": "Description:",
                "value": "Configures the OCSP stapling cache"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingCache <em>type</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingerrorcachetimeout": {
        "name": "SSLStaplingErrorCacheTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingerrorcachetimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Number of seconds before expiring invalid responses in the OCSP stapling cache"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingErrorCacheTimeout <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStaplingErrorCacheTimeout 600</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingfaketrylater": {
        "name": "SSLStaplingFakeTryLater",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingfaketrylater",
        "items": [
            {
                "name": "Description:",
                "value": "Synthesize \"tryLater\" responses for failed OCSP stapling queries"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingFakeTryLater on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStaplingFakeTryLater on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingforceurl": {
        "name": "SSLStaplingForceURL",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingforceurl",
        "items": [
            {
                "name": "Description:",
                "value": "Override the OCSP responder URI specified in the certificate's AIA extension"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingForceURL <em>uri</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingrespondertimeout": {
        "name": "SSLStaplingResponderTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingrespondertimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Timeout for OCSP stapling queries"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingResponderTimeout <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStaplingResponderTimeout 10</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingresponsemaxage": {
        "name": "SSLStaplingResponseMaxAge",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingresponsemaxage",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum allowable age for OCSP stapling responses"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingResponseMaxAge <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStaplingResponseMaxAge -1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingresponsetimeskew": {
        "name": "SSLStaplingResponseTimeSkew",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingresponsetimeskew",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum allowable time skew for OCSP stapling response validation"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingResponseTimeSkew <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStaplingResponseTimeSkew 300</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingreturnrespondererrors": {
        "name": "SSLStaplingReturnResponderErrors",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingreturnrespondererrors",
        "items": [
            {
                "name": "Description:",
                "value": "Pass stapling related OCSP errors on to client"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingReturnResponderErrors on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStaplingReturnResponderErrors on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstaplingstandardcachetimeout": {
        "name": "SSLStaplingStandardCacheTimeout",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstaplingstandardcachetimeout",
        "items": [
            {
                "name": "Description:",
                "value": "Number of seconds before expiring responses in the OCSP stapling cache"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStaplingStandardCacheTimeout <em>seconds</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStaplingStandardCacheTimeout 3600</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslstrictsnivhostcheck": {
        "name": "SSLStrictSNIVHostCheck",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslstrictsnivhostcheck",
        "items": [
            {
                "name": "Description:",
                "value": "Whether to allow non-SNI clients to access a name-based virtual\nhost.\n"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLStrictSNIVHostCheck on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLStrictSNIVHostCheck off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache 2.2.12 and later"
            }
        ]
    },
    "sslusername": {
        "name": "SSLUserName",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslusername",
        "items": [
            {
                "name": "Description:",
                "value": "Variable name to determine user name"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLUserName <em>varname</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslusestapling": {
        "name": "SSLUseStapling",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslusestapling",
        "items": [
            {
                "name": "Description:",
                "value": "Enable stapling of OCSP responses in the TLS handshake"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLUseStapling on|off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLUseStapling off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            },
            {
                "name": "Compatibility:",
                "value": "Available if using OpenSSL 0.9.8h or later"
            }
        ]
    },
    "sslverifyclient": {
        "name": "SSLVerifyClient",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslverifyclient",
        "items": [
            {
                "name": "Description:",
                "value": "Type of Client Certificate verification"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLVerifyClient <em>level</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLVerifyClient none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "sslverifydepth": {
        "name": "SSLVerifyDepth",
        "href": "/ApacheGUI/manual/2.4/mod/mod_ssl.html#sslverifydepth",
        "items": [
            {
                "name": "Description:",
                "value": "Maximum depth of CA Certificates in Client\nCertificate verification"
            },
            {
                "name": "Syntax:",
                "value": "<code>SSLVerifyDepth <em>number</em></code>"
            },
            {
                "name": "Default:",
                "value": "<code>SSLVerifyDepth 1</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "AuthConfig"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_ssl"
            }
        ]
    },
    "startservers": {
        "name": "StartServers",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#startservers",
        "items": [
            {
                "name": "Description:",
                "value": "Number of child server processes created at startup"
            },
            {
                "name": "Syntax:",
                "value": "<code>StartServers <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "startthreads": {
        "name": "StartThreads",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#startthreads",
        "items": [
            {
                "name": "Description:",
                "value": "Number of threads created on startup"
            },
            {
                "name": "Syntax:",
                "value": "<code>StartThreads <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>"
            }
        ]
    },
    "substitute": {
        "name": "Substitute",
        "href": "/ApacheGUI/manual/2.4/mod/mod_substitute.html#substitute",
        "items": [
            {
                "name": "Description:",
                "value": "Pattern to filter the response content"
            },
            {
                "name": "Syntax:",
                "value": "<code>Substitute <var>s/pattern/substitution/[infq]</var></code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_substitute"
            }
        ]
    },
    "substitutemaxlinelength": {
        "name": "SubstituteMaxLineLength",
        "href": "/ApacheGUI/manual/2.4/mod/mod_substitute.html#substitutemaxlinelength",
        "items": [
            {
                "name": "Description:",
                "value": "Set the maximum line size"
            },
            {
                "name": "Syntax:",
                "value": "<code>SubstituteMaxLineLength <var>bytes</var>(b|B|k|K|m|M|g|G)</code>"
            },
            {
                "name": "Default:",
                "value": "<code>SubstituteMaxLineLength 1m</code>"
            },
            {
                "name": "Context:",
                "value": "directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_substitute"
            },
            {
                "name": "Compatibility:",
                "value": "Available in httpd 2.4.11 and later"
            }
        ]
    },
    "suexec": {
        "name": "Suexec",
        "href": "/ApacheGUI/manual/2.4/mod/mod_unixd.html#suexec",
        "items": [
            {
                "name": "Description:",
                "value": "Enable or disable the suEXEC feature"
            },
            {
                "name": "Syntax:",
                "value": "<code>Suexec On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>On if suexec binary exists with proper owner and mode,\nOff otherwise</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_unixd"
            }
        ]
    },
    "suexecusergroup": {
        "name": "SuexecUserGroup",
        "href": "/ApacheGUI/manual/2.4/mod/mod_suexec.html#suexecusergroup",
        "items": [
            {
                "name": "Description:",
                "value": "User and group for CGI programs to run as"
            },
            {
                "name": "Syntax:",
                "value": "<code>SuexecUserGroup <em>User Group</em></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_suexec"
            }
        ]
    },
    "threadlimit": {
        "name": "ThreadLimit",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#threadlimit",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the upper limit on the configurable number of threads\nper child process"
            },
            {
                "name": "Syntax:",
                "value": "<code>ThreadLimit <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "threadsperchild": {
        "name": "ThreadsPerChild",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#threadsperchild",
        "items": [
            {
                "name": "Description:",
                "value": "Number of threads created by each child process"
            },
            {
                "name": "Syntax:",
                "value": "<code>ThreadsPerChild <var>number</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>See usage for details</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>"
            }
        ]
    },
    "threadstacksize": {
        "name": "ThreadStackSize",
        "href": "/ApacheGUI/manual/2.4/mod/mpm_common.html#threadstacksize",
        "items": [
            {
                "name": "Description:",
                "value": "The size in bytes of the stack used by threads handling\nclient connections"
            },
            {
                "name": "Syntax:",
                "value": "<code>ThreadStackSize <var>size</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>65536 on NetWare; varies on other operating systems</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "MPM"
            },
            {
                "name": "Module:",
                "value": "<code class=\"module\"><a href=\"../mod/event.html\">event</a></code>, <code class=\"module\"><a href=\"../mod/mpm_netware.html\">mpm_netware</a></code>, <code class=\"module\"><a href=\"../mod/mpmt_os2.html\">mpmt_os2</a></code>, <code class=\"module\"><a href=\"../mod/mpm_winnt.html\">mpm_winnt</a></code>, <code class=\"module\"><a href=\"../mod/worker.html\">worker</a></code>, <code class=\"module\"><a href=\"../mod/event.html\">event</a></code>"
            },
            {
                "name": "Compatibility:",
                "value": "Available in Apache HTTP Server 2.1 and later"
            }
        ]
    },
    "timeout": {
        "name": "TimeOut",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#timeout",
        "items": [
            {
                "name": "Description:",
                "value": "Amount of time the server will wait for\ncertain events before failing a request"
            },
            {
                "name": "Syntax:",
                "value": "<code>TimeOut <var>seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>TimeOut 60</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "traceenable": {
        "name": "TraceEnable",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#traceenable",
        "items": [
            {
                "name": "Description:",
                "value": "Determines the behavior on <code>TRACE</code> requests"
            },
            {
                "name": "Syntax:",
                "value": "<code>TraceEnable <var>[on|off|extended]</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>TraceEnable on</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "transferlog": {
        "name": "TransferLog",
        "href": "/ApacheGUI/manual/2.4/mod/mod_log_config.html#transferlog",
        "items": [
            {
                "name": "Description:",
                "value": "Specify location of a log file"
            },
            {
                "name": "Syntax:",
                "value": "<code>TransferLog <var>file</var>|<var>pipe</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_log_config"
            }
        ]
    },
    "typesconfig": {
        "name": "TypesConfig",
        "href": "/ApacheGUI/manual/2.4/mod/mod_mime.html#typesconfig",
        "items": [
            {
                "name": "Description:",
                "value": "The location of the <code>mime.types</code> file"
            },
            {
                "name": "Syntax:",
                "value": "<code>TypesConfig <var>file-path</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>TypesConfig conf/mime.types</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_mime"
            }
        ]
    },
    "undefine": {
        "name": "UnDefine",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#undefine",
        "items": [
            {
                "name": "Description:",
                "value": "Undefine the existence of a variable"
            },
            {
                "name": "Syntax:",
                "value": "<code>UnDefine <var>parameter-name</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "undefmacro": {
        "name": "UndefMacro",
        "href": "/ApacheGUI/manual/2.4/mod/mod_macro.html#undefmacro",
        "items": [
            {
                "name": "Description:",
                "value": "Undefine a macro"
            },
            {
                "name": "Syntax:",
                "value": "<code>UndefMacro <var>name</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_macro"
            }
        ]
    },
    "unsetenv": {
        "name": "UnsetEnv",
        "href": "/ApacheGUI/manual/2.4/mod/mod_env.html#unsetenv",
        "items": [
            {
                "name": "Description:",
                "value": "Removes variables from the environment"
            },
            {
                "name": "Syntax:",
                "value": "<code>UnsetEnv <var>env-variable</var> [<var>env-variable</var>]\n...</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "FileInfo"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_env"
            }
        ]
    },
    "use": {
        "name": "Use",
        "href": "/ApacheGUI/manual/2.4/mod/mod_macro.html#use",
        "items": [
            {
                "name": "Description:",
                "value": "Use a macro"
            },
            {
                "name": "Syntax:",
                "value": "<code>Use <var>name</var> [<var>value1</var> ... <var>valueN</var>]\n</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_macro"
            }
        ]
    },
    "usecanonicalname": {
        "name": "UseCanonicalName",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#usecanonicalname",
        "items": [
            {
                "name": "Description:",
                "value": "Configures how the server determines its own name and\nport"
            },
            {
                "name": "Syntax:",
                "value": "<code>UseCanonicalName On|Off|DNS</code>"
            },
            {
                "name": "Default:",
                "value": "<code>UseCanonicalName Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "usecanonicalphysicalport": {
        "name": "UseCanonicalPhysicalPort",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#usecanonicalphysicalport",
        "items": [
            {
                "name": "Description:",
                "value": "Configures how the server determines its own port"
            },
            {
                "name": "Syntax:",
                "value": "<code>UseCanonicalPhysicalPort On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>UseCanonicalPhysicalPort Off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "user": {
        "name": "User",
        "href": "/ApacheGUI/manual/2.4/mod/mod_unixd.html#user",
        "items": [
            {
                "name": "Description:",
                "value": "The userid under which the server will answer\nrequests"
            },
            {
                "name": "Syntax:",
                "value": "<code>User <var>unix-userid</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>User #-1</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_unixd"
            }
        ]
    },
    "userdir": {
        "name": "UserDir",
        "href": "/ApacheGUI/manual/2.4/mod/mod_userdir.html#userdir",
        "items": [
            {
                "name": "Description:",
                "value": "Location of the user-specific directories"
            },
            {
                "name": "Syntax:",
                "value": "<code>UserDir <em>directory-filename</em> [<em>directory-filename</em>] ...\n</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_userdir"
            }
        ]
    },
    "vhostcgimode": {
        "name": "VHostCGIMode",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#vhostcgimode",
        "items": [
            {
                "name": "Description:",
                "value": "Determines whether the virtualhost can run\nsubprocesses, and the privileges available to subprocesses."
            },
            {
                "name": "Syntax:",
                "value": "<code>VHostCGIMode On|Off|Secure</code>"
            },
            {
                "name": "Default:",
                "value": "<code>VHostCGIMode On</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)."
            }
        ]
    },
    "vhostcgiprivs": {
        "name": "VHostCGIPrivs",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#vhostcgiprivs",
        "items": [
            {
                "name": "Description:",
                "value": "Assign arbitrary privileges to subprocesses created\nby a virtual host."
            },
            {
                "name": "Syntax:",
                "value": "<code>VHostPrivs [+-]?<var>privilege-name</var> [[+-]?privilege-name] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>None</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)\nand when <code class=\"module\"><a href=\"../mod/mod_privileges.html\">mod_privileges</a></code> is compiled with the\n<var>BIG_SECURITY_HOLE</var> compile-time option."
            }
        ]
    },
    "vhostgroup": {
        "name": "VHostGroup",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#vhostgroup",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the Group ID under which a virtual host runs."
            },
            {
                "name": "Syntax:",
                "value": "<code>VHostGroup <var>unix-groupid</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>Inherits the group id specified in\n<code class=\"directive\"><a href=\"../mod/mod_unixd.html#group\">Group</a></code></code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)."
            }
        ]
    },
    "vhostprivs": {
        "name": "VHostPrivs",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#vhostprivs",
        "items": [
            {
                "name": "Description:",
                "value": "Assign arbitrary privileges to a virtual host."
            },
            {
                "name": "Syntax:",
                "value": "<code>VHostPrivs [+-]?<var>privilege-name</var> [[+-]?privilege-name] ...</code>"
            },
            {
                "name": "Default:",
                "value": "<code>None</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)\nand when <code class=\"module\"><a href=\"../mod/mod_privileges.html\">mod_privileges</a></code> is compiled with the\n<var>BIG_SECURITY_HOLE</var> compile-time option."
            }
        ]
    },
    "vhostsecure": {
        "name": "VHostSecure",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#vhostsecure",
        "items": [
            {
                "name": "Description:",
                "value": "Determines whether the server runs with enhanced security\nfor the virtualhost."
            },
            {
                "name": "Syntax:",
                "value": "<code>VHostSecure On|Off</code>"
            },
            {
                "name": "Default:",
                "value": "<code>VHostSecure On</code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)."
            }
        ]
    },
    "vhostuser": {
        "name": "VHostUser",
        "href": "/ApacheGUI/manual/2.4/mod/mod_privileges.html#vhostuser",
        "items": [
            {
                "name": "Description:",
                "value": "Sets the User ID under which a virtual host runs."
            },
            {
                "name": "Syntax:",
                "value": "<code>VHostUser <var>unix-userid</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>Inherits the userid specified in\n<code class=\"directive\"><a href=\"../mod/mod_unixd.html#user\">User</a></code></code>"
            },
            {
                "name": "Context:",
                "value": "virtual host"
            },
            {
                "name": "Status:",
                "value": "Experimental"
            },
            {
                "name": "Module:",
                "value": "mod_privileges"
            },
            {
                "name": "Compatibility:",
                "value": "Available on Solaris 10 and OpenSolaris with\nnon-threaded MPMs (<code class=\"module\"><a href=\"../mod/prefork.html\">prefork</a></code> or custom MPM)."
            }
        ]
    },
    "virtualdocumentroot": {
        "name": "VirtualDocumentRoot",
        "href": "/ApacheGUI/manual/2.4/mod/mod_vhost_alias.html#virtualdocumentroot",
        "items": [
            {
                "name": "Description:",
                "value": "Dynamically configure the location of the document root\nfor a given virtual host"
            },
            {
                "name": "Syntax:",
                "value": "<code>VirtualDocumentRoot <em>interpolated-directory</em>|none</code>"
            },
            {
                "name": "Default:",
                "value": "<code>VirtualDocumentRoot none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_vhost_alias"
            }
        ]
    },
    "virtualdocumentrootip": {
        "name": "VirtualDocumentRootIP",
        "href": "/ApacheGUI/manual/2.4/mod/mod_vhost_alias.html#virtualdocumentrootip",
        "items": [
            {
                "name": "Description:",
                "value": "Dynamically configure the location of the document root\nfor a given virtual host"
            },
            {
                "name": "Syntax:",
                "value": "<code>VirtualDocumentRootIP <em>interpolated-directory</em>|none</code>"
            },
            {
                "name": "Default:",
                "value": "<code>VirtualDocumentRootIP none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_vhost_alias"
            }
        ]
    },
    "virtualhost": {
        "name": "VirtualHost",
        "href": "/ApacheGUI/manual/2.4/mod/core.html#virtualhost",
        "items": [
            {
                "name": "Description:",
                "value": "Contains directives that apply only to a specific\nhostname or IP address"
            },
            {
                "name": "Syntax:",
                "value": "<code>&lt;VirtualHost\n    <var>addr</var>[:<var>port</var>] [<var>addr</var>[:<var>port</var>]]\n    ...&gt; ... &lt;/VirtualHost&gt;</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Core"
            },
            {
                "name": "Module:",
                "value": "core"
            }
        ]
    },
    "virtualscriptalias": {
        "name": "VirtualScriptAlias",
        "href": "/ApacheGUI/manual/2.4/mod/mod_vhost_alias.html#virtualscriptalias",
        "items": [
            {
                "name": "Description:",
                "value": "Dynamically configure the location of the CGI directory for\na given virtual host"
            },
            {
                "name": "Syntax:",
                "value": "<code>VirtualScriptAlias <em>interpolated-directory</em>|none</code>"
            },
            {
                "name": "Default:",
                "value": "<code>VirtualScriptAlias none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_vhost_alias"
            }
        ]
    },
    "virtualscriptaliasip": {
        "name": "VirtualScriptAliasIP",
        "href": "/ApacheGUI/manual/2.4/mod/mod_vhost_alias.html#virtualscriptaliasip",
        "items": [
            {
                "name": "Description:",
                "value": "Dynamically configure the location of the CGI directory for\na given virtual host"
            },
            {
                "name": "Syntax:",
                "value": "<code>VirtualScriptAliasIP <em>interpolated-directory</em>|none</code>"
            },
            {
                "name": "Default:",
                "value": "<code>VirtualScriptAliasIP none</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host"
            },
            {
                "name": "Status:",
                "value": "Extension"
            },
            {
                "name": "Module:",
                "value": "mod_vhost_alias"
            }
        ]
    },
    "watchdoginterval": {
        "name": "WatchdogInterval",
        "href": "/ApacheGUI/manual/2.4/mod/mod_watchdog.html#watchdoginterval",
        "items": [
            {
                "name": "Description:",
                "value": "Watchdog interval in seconds"
            },
            {
                "name": "Syntax:",
                "value": "<code>WatchdogInterval <var>number-of-seconds</var></code>"
            },
            {
                "name": "Default:",
                "value": "<code>WatchdogInterval 1</code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_watchdog"
            }
        ]
    },
    "xbithack": {
        "name": "XBitHack",
        "href": "/ApacheGUI/manual/2.4/mod/mod_include.html#xbithack",
        "items": [
            {
                "name": "Description:",
                "value": "Parse SSI directives in files with the execute bit\nset"
            },
            {
                "name": "Syntax:",
                "value": "<code>XBitHack on|off|full</code>"
            },
            {
                "name": "Default:",
                "value": "<code>XBitHack off</code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Override:",
                "value": "Options"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_include"
            }
        ]
    },
    "xml2encalias": {
        "name": "xml2EncAlias",
        "href": "/ApacheGUI/manual/2.4/mod/mod_xml2enc.html#xml2encalias",
        "items": [
            {
                "name": "Description:",
                "value": "Recognise Aliases for encoding values"
            },
            {
                "name": "Syntax:",
                "value": "<code>xml2EncAlias <var>charset alias [alias ...]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_xml2enc"
            }
        ]
    },
    "xml2encdefault": {
        "name": "xml2EncDefault",
        "href": "/ApacheGUI/manual/2.4/mod/mod_xml2enc.html#xml2encdefault",
        "items": [
            {
                "name": "Description:",
                "value": "Sets a default encoding to assume when absolutely no information\ncan be <a href=\"#sniffing\">automatically detected</a>"
            },
            {
                "name": "Syntax:",
                "value": "<code>xml2EncDefault <var>name</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_xml2enc"
            },
            {
                "name": "Compatibility:",
                "value": "Version 2.4.0 and later; available as a third-party\nmodule for earlier versions."
            }
        ]
    },
    "xml2startparse": {
        "name": "xml2StartParse",
        "href": "/ApacheGUI/manual/2.4/mod/mod_xml2enc.html#xml2startparse",
        "items": [
            {
                "name": "Description:",
                "value": "Advise the parser to skip leading junk."
            },
            {
                "name": "Syntax:",
                "value": "<code>xml2StartParse <var>element [element ...]</var></code>"
            },
            {
                "name": "Context:",
                "value": "server config, virtual host, directory, .htaccess"
            },
            {
                "name": "Status:",
                "value": "Base"
            },
            {
                "name": "Module:",
                "value": "mod_xml2enc"
            }
        ]
    }
};