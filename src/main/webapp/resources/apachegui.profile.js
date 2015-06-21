var profile = (function(){
    return {
        basePath: ".",
        releaseDir: "../../../../target/packagejs",
        releaseName: "resources",
        action: "release",
        layerOptimize: "closure",
        optimize: "closure",
        useSourceMaps: false,
//        layerOptimize: "shrinksafe",
//        optimize: "shrinksafe",
        cssOptimize: "comments",
        mini: true,
        stripConsole: "none",
        selectorEngine: "lite",
 
        staticHasFeatures: {
	    	// The trace & log APIs are used for debugging the loader, so we do not need them in the build.
	    	'dojo-trace-api': true,
	    	'dojo-log-api': true,
	    	// This causes normally private loader data to be exposed for debugging. In a release build, we do not need
	    	// that either.
	    	'dojo-publish-privates': true,
	    	// This application is pure AMD, so get rid of the legacy loader.
	    	'dojo-sync-loader': true,
	    	// `dojo-xhr-factory` relies on `dojo-sync-loader`, which we have removed.
	    	'dojo-xhr-factory': true,
	    	// We are not loading tests in production, so we can get rid of some test sniffing code.
	    	'dojo-test-sniff': false
    	},
        
        packages:[{
            name: "dojo",
            location: "dojo"
        },{
            name: "dijit",
            location: "dijit"
        },{
            name: "dojox",
            location: "dojox"
        },{
		    name: "net",
		    location: "net"
        }],
 
        layers: {
        	
            
            "dojo/dojo": {
                include: [ "dojo/dojo", 
                           "dojo/i18n", 
                           "dojo/domReady",
                           
                           "dojo/dom",
 						   "dojo/parser",
 						   "dojo/data/ItemFileWriteStore",
 						   "dojo/_base/window",
 						   "dojo/_base/declare",
 						   "dojo/_base/json",
 						   "dojo/_base/event",
 						   "dojo/_base/kernel",
 		     		       "dojo/_base/lang",
 		     		       "dojo/_base/fx",
 		     		       "dojo/fx/Toggler",
 						   "dojo/on",
 	     			       "dojo/request",
 	     			       "dojo/request/script",
 	     			       "dojo/_base/array", 
 	     			       "dojo/query",
 	     			       "dojo/dom-class",
 	     		           "dojo/dom-construct",
 	     		           "dojo/dom-attr",
 	     		           "dojo/dom-geometry",
 	     		           "dojo/dom-style",     	
 	     		           "dojo/_base/xhr",
 	     		           "dojo/keys",
 	     		           "dojo/mouse",
 	     		           "dojo/dnd/Target",
 	     		           "dojo/dnd/AutoSource",
 						  
 	     		           "dijit/_base",
 						   "dijit/registry",
 						   "dijit/ProgressBar",
  				           "dijit/form/Select",
                           "dijit/Dialog",
                           "dijit/form/Form",
                           "dijit/form/Button",
                           "dijit/form/TextBox",
                           "dijit/form/ValidationTextBox",
                           "dijit/form/ComboButton",
                           "dijit/Menu",
                           "dijit/MenuItem",
                           "dijit/layout/BorderContainer",
                           "dijit/layout/ContentPane",
                           "dijit/layout/TabContainer",	
                           "dijit/Tree",
                           "dijit/form/DateTextBox",
      			 		   "dijit/form/TimeTextBox",
      			 		   "dijit/form/NumberSpinner",
      			 		   "dijit/form/DropDownButton",
      			 		   "dijit/TooltipDialog",
      			 		   "dijit/Tooltip",
      			 		   "dijit/MenuBar",
      			 		   "dijit/PopupMenuBarItem",
      			 		   "dijit/Toolbar",
      			 		   "dijit/layout/AccordionContainer",
      			 		   "dijit/TitlePane",
      			 		   "dijit/ToolbarSeparator",
      			 		  
                           "dojox/layout/ExpandoPane",
                           "dojox/data/JsonRestStore",
                           "dojox/form/Uploader",
                           "dojox/form/uploader/FileList",
                           "dojox/grid/DataGrid",
  				          
                           "net/apachegui/Editor",
                           "net/apachegui/VirtualHosts",
      			 		   "net/apachegui/History",
      			 		   "net/apachegui/Logs",
   	    				   "net/apachegui/TitlePane",
   	    				   "net/apachegui/globalsettings/GlobalSettings",
                           "net/apachegui/Documents",
                           "net/apachegui/Control",
                           "net/apachegui/Configuration",
  				           "net/apachegui/GUISettings",
                           "net/apachegui/Main",
                           "net/apachegui/Init",
                           "net/apachegui/NoCloseDialog",
                           "net/apachegui/Menu",
                           "net/apachegui/Settings",
                           "net/apachegui/AutoSuggest",
                           "net/apachegui/RefreshableTree",
                           "net/apachegui/SearchResults"
                ],
                customBase: true,
                boot: true,
                includeLocales: [ 'en-us' ]
            }
            
        }
    };

})();
