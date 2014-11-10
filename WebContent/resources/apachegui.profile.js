var profile = (function(){
    return {
        basePath: ".",
        releaseDir: "../../build/release",
        releaseName: "resources",
        action: "release",
        layerOptimize: "closure",
        optimize: "closure",
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
		    name: "ca",
		    location: "ca"
        }],
 
        layers: {
        	
            /**
            "dojo/dojo": {
                include: [ "dojo/dojo", 
                           "dojo/i18n", 
                           "dojo/domReady"
                ],
                customBase: true,
                boot: true
            }, 
            **/
            
	        "ca/apachegui/common": {
                include: [ 
                          
						  "dojo/dom",
						  "dojo/parser",
						  "dojo/data/ItemFileWriteStore",
						  "dojo/_base/window",
						  
						  "dijit/ProgressBar",
 				          "dijit/form/Select",
                          "dijit/Dialog",
                          "dijit/form/Form",
                          "dijit/form/Button",
                          "dijit/form/TextBox",
                          "dijit/form/ValidationTextBox",
                          "dijit/Menu",
                          "dijit/MenuItem",
                          "dijit/layout/BorderContainer",
                          "dijit/layout/ContentPane",
                          "dijit/Tree",
                          "dijit/form/DateTextBox",
     			 		  "dijit/form/TimeTextBox",
     			 		  "dijit/form/NumberSpinner",
     			 		  "dijit/form/DropDownButton",
     			 		  "dijit/TooltipDialog",
     			 		  "dijit/Tooltip",
                          
                          "dojox/layout/ExpandoPane",
                          "dojox/data/JsonRestStore",
                          "dojox/form/Uploader",
                          "dojox/form/uploader/FileList",
                          "dojox/grid/DataGrid",
 				          
 				          "ca/apachegui/GUISettings",
                          "ca/apachegui/Main",
                          "ca/apachegui/Init",
                          "ca/apachegui/NoCloseDialog",
                          "ca/apachegui/Menu",
                          "ca/apachegui/Settings",
                          "ca/apachegui/RefreshableTree"
                ],
                includeLocales: [ 'en-us' ]
            }
            
        }
    };

})();
