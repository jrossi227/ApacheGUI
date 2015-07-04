define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/event"
], function(declare, dom, registry, on, request, event){    
    
    declare("net.apachegui.Init", null, {    

        initialized: false,
        
        init: function() {
            if(this.initialized===false) {
                this.addListeners();
            
                if(net.apachegui.Main.getInstance().isWindows()) {
                    registry.byId('initDialogSource').show();
                } else {
                    registry.byId('initDialogInstallationType').show();
                }
            
                this.initialized=true;
            }
        },
        
        firstTimeUse: function() {
            var firstTime=false;
            
            request.get("../web/Init/CheckFirstTime", {
                handleAs: 'json',
                preventCache: true,
                sync: true
            }).response.then(
                function(response) {                                
                    firstTime = response.data.firstTime;
                },
                function(error) {
                    net.apachegui.Util.alert('Error',error.response.data.message);
                });
            
            return firstTime;
        },
        
        hideSourceOption: function() {
            registry.byId('initDialogSource').hide();
            
            var initDialog=registry.byId('initDialogInstallationType');
            initDialog.show();
        },
        
        hidePackageOption: function() {
            registry.byId('initDialogPackage').hide();
            
            var initDialog=registry.byId('initDialogInstallationType');
            initDialog.show();
        },
        
        submit: function(type) {
            var xhrArgs;
            
            if(type=='source')
            {
                xhrArgs = {
                      option: 'submitSource', 
                      serverRoot: dom.byId('serverRootSource').value,
                      username: dom.byId('usernameSource').value,
                      password1: dom.byId('password1Source').value,
                      password2: dom.byId('password2Source').value,
                      enableAuthenticationSource: registry.byId('enableAuthenticationSource').get('value')
                };
            }    
            
            if(type=='package')
            {    
                xhrArgs = {
                      option: 'submitPackage', 
                      serverRoot: dom.byId('serverRootPackage').value,
                      confFile: dom.byId('confFilePackage').value,
                      confDirectory: dom.byId('confDirectoryPackage').value,
                      logDirectory: dom.byId('logDirectoryPackage').value,
                      modulesDirectory: dom.byId('modulesDirectoryPackage').value,
                      binFile: dom.byId('binFilePackage').value,
                      username: dom.byId('usernamePackage').value,
                      password1: dom.byId('password1Package').value,
                      password2: dom.byId('password2Package').value,
                      enableAuthenticationPackage: registry.byId('enableAuthenticationPackage').get('value')
                };
            }
                        
            var thisdialog = net.apachegui.Util.noCloseDialog('Initializing', 'Please wait...');
            thisdialog.show();
            
            request.post('../web/Init', {
                data: xhrArgs,
                handleAs: 'json',
                sync: false
            }).response.then(function(response) {
        
                document.location='GUISettings.jsp';    
            
            },
            function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Error',error.response.data.message);
            });
        },
        
        addListeners: function () {
            var that=this;
            
            on(registry.byId('initFormInstallationType'), "submit", function(e) {
                event.stop(e); // prevent the default submit
                
                if (!this.isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
        
                if(dom.byId('source').checked==true)
                {
                    registry.byId('initDialogInstallationType').hide();
                    var initDialog=registry.byId('initDialogSource');
                    initDialog.show();
                }
                else if(dom.byId('package').checked==true)
                {
                    registry.byId('initDialogInstallationType').hide();
                    var initDialog=registry.byId('initDialogPackage');
                    initDialog.show();
                }
                else
                {
                    net.apachegui.Util.alert('Error','You must select an option');
                } 
            });
            
            on(registry.byId('initFormSource'), "submit", function(e) {
                event.stop(e); // prevent the default submit
                if (!this.isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                that.submit('source');
            });
            
            on(registry.byId('initFormPackage'), "submit", function(e) {
                event.stop(e); // prevent the default submit
                if (!this.isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                    
                that.submit('package');
    
            });
            
            on(registry.byId('hideSourceOption'), "click", function() {
                that.hideSourceOption();
            });
            
            on(registry.byId('hidePackageOption'), "click", function() {
                that.hidePackageOption();
            });
        }
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Init);
    
});