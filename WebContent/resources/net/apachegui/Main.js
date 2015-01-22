define([ "dojo/_base/declare",
         "dijit/registry",
         "dojo/request",
         "dojo/_base/json",
         "dojo/_base/xhr"
], function(declare, registry, request, json, xhr){    
    
    declare("net.apachegui.Main", null, {        
    
        currentOption: '',
        apacheGuiVersion: '',
        windows: false,
        sessionActive: true,
        notRunningDialog: null,
        
        confDirectoryPath: '',
        logDirectoryPath: '',
        docDirectoryPath: '',
        
        getCurrentOption: function() {
            return this.currentOption;
        },
        
        getApacheGuiVersion: function() {
            return this.apacheGuiVersion;
        },
        
        setApacheGuiVersion: function(version) {
            this.apacheGuiVersion=version;
        },
        
        isWindows: function() {
            return this.windows;
        },
        
        setIsWindows: function(windowsflag) {
            this.windows=windowsflag;
        },
        
        isSessionActive: function() {
            return this.sessionActive;
        },
        
        getConfDirectoryPath: function() {            
            if(this.confDirectoryPath != '') {
                return this.confDirectoryPath;
            }
            
            var that = this;
            
            request.get('../web/Main', {
                query:     {
                    option: 'confFilePath'
                },
                handleAs: 'json',
                sync: true,
                preventCache: true
            }).response.then(
                function(response) {
                
                    var data = response.data;
                    that.confDirectoryPath=data.file;
                },
                function(error) {
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
            
            return this.confDirectoryPath;
        },
    
        getLogDirectoryPath: function()
        {
            if(this.logDirectoryPath != '') {
                return this.logDirectoryPath;
            }
            
            var that = this;
            
            request.get('../web/Main', {
                query:     {
                    option: 'logFilePath'
                },
                handleAs: 'json',
                sync: true,
                preventCache: true
            }).response.then(
                function(response) {
                    var data = response.data;
                    that.logDirectoryPath=data.file;
                },
                function(error) {
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
            
            return this.logDirectoryPath;
        },
    
        getDocDirectoryPath: function()
        {
            if(this.docDirectoryPath != '') {
                return this.docDirectoryPath;
            }
            
            var that = this;
            
            request.get('../web/Main', {
                query:     {
                    option: 'docFilePath'
                },
                handleAs: 'json',
                sync: true,
                preventCache: true
            }).response.then(
                function(response) {
                
                    var data = response.data;
                    that.docDirectoryPath = data.file;
                },
                function(error) {
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
            
            return this.docDirectoryPath;
        },
    
        validateFileExists: function(file)
        {
            var exists=false;
            
            request.get('../web/Main', {
                query:     {
                    option: 'validateFileExists',
                    filename: file
                },
                handleAs: 'json',
                sync: true,
                preventCache: true
            }).response.then(
                function(response) {
                
                    var data = response.data;
                    exists=data.exists;
                },
                function(error) {
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
            
            return exists;
        },
        
        getLastModifiedTime: function(file, successFunc, errorFunc) {
            request.get('../web/Main', {
                query:     {
                    option: 'lastModifiedTime', 
                    path: file
                },
                handleAs: 'json',
                sync: false,
                preventCache: true
            }).response.then(
                function(response) {
                    successFunc(response);
                },
                function(error) {
                    errorFunc(error);
                }
            );
        },
        
        getLastModifiedTimes: function(files, successFunc, errorFunc) {
            xhr.post({
                url : "../web/Main/lastModifiedTimes", 
                postData : JSON.stringify({'files' : files}),
                handleAs: "json",
                headers : {
                     "Content-Type" : "application/json"
                },
                load: function(response,ioargs) {
                    successFunc(response);
                },
                error : function(response,ioargs) {
                    errorFunc(response);
                }
             });
        },
        
        checkSession: function() {
            var that = this;
            
            request.get('../web/Main', {
                query:     {
                    option: 'checkSession'
                },
                handleAs: 'text',
                sync: false,
                preventCache: true
            }).response.then(
                function(response) {
                    var data = response.data;
                    if(data.indexOf('<html>') > -1) {
                        that.sessionActive = false;
                        window.location.reload();
                    }    
                },
                function(error) {
                    if(that.notRunningDialog == null) {
                        that.sessionActive = false;
                        that.notRunningDialog = net.apachegui.Util.noCloseDialog('Application Unavailable','The ApacheGUI application is not currently running. Your browser window will reload once the application has started.');
                        that.notRunningDialog.show();
                    }
                }
            );
        },
        
        startSessionTimer: function() {            
            net.apachegui.Interval.setInterval(this.checkSession.bind(this), 5000);    
        },
        
        init: function(option)
        {
            this.currentOption=option;
            /** check if its the first time usage, 
             *  if it is we need to display a dialog to the user
             */
            if(net.apachegui.Init.getInstance().firstTimeUse())
            {
                net.apachegui.Init.getInstance().init();
            }    
            else
            {    
                this.startSessionTimer();
                
                var menuInstance = net.apachegui.Menu.getInstance();
                
                menuInstance.init();
                menuInstance.setCurrentMenuId(option);
                menuInstance.focusMenuOption(option);
                
                if(menuInstance.isGUISettings(option))
                {
                    net.apachegui.GUISettings.getInstance().init();
                }
                
                if(menuInstance.isHistory(option))
                {
                    net.apachegui.History.getInstance().init();
                }
                
                if(menuInstance.isControl(option))
                {
                    net.apachegui.Control.getInstance().init();
                }
                
                if(menuInstance.isGlobalSettings(option))
                {
                    net.apachegui.globalsettings.GlobalSettings.getInstance().init();
                }
                
                if(menuInstance.isVirtualHosts(option))
                {
                    net.apachegui.VirtualHosts.getInstance().init();
                }
                
                if(menuInstance.isLogs(option)) {
                    net.apachegui.Logs.getInstance().init();
                }
                
                var subOption;
                if(menuInstance.isDocuments(option)) {
                    var documents = net.apachegui.Documents.getInstance();
                    
                    subOption=option.substring(10);
                    if(this.validateFileExists(subOption))
                    {        
                        if(documents.getIsText()) {
                            documents.init();
                            documents.setEditorFromFile('../web/Documents',subOption);
                        }
                    }
                    else
                    {    
                        if(documents.getIsText()) {
                            documents.setValue('File Not Found!!');
                            documents.setReadOnly();
                            documents.clearHistory();
                            documents.clearSaveState();
                            documents.setToolbarFades();
                        }
                    }
                
                }
                
                if(menuInstance.isConfiguration(option)) {    
                    
                    var configuration = net.apachegui.Configuration.getInstance();
                    configuration.init();
                    
                    subOption=option.substring(14);
                    if(this.validateFileExists(subOption))
                    {    
                        configuration.setEditorFromFile('../web/Configuration', subOption);
                    }
                    else
                    {    
                        configuration.setValue('File Not Found!!');
                        configuration.setReadOnly();
                        configuration.clearHistory();
                        configuration.clearSaveState();
                        configuration.setToolbarFades();
                    }
                }
            }
            
        }    
        
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Main);
    
});
  