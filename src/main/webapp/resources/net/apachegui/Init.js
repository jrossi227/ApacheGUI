define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/event"
], function(declare, dom, registry, on, request, event){    
    
    declare("net.apachegui.Init", null, {    

        initialized: false,

        packageParams: {
            mac: {
                serverRoot: '/usr',
                confFile: '/etc/apache2/httpd.conf',
                confDirectory: '/etc/apache2',
                logDirectory: '/var/log/apache2',
                modulesDirectory: '/usr/libexec/apache2',
                binFile: '/usr/sbin/apachectl'
            },
            debian: {
                serverRoot: '/etc/apache2',
                confFile: '/etc/apache2/apache2.conf',
                confDirectory: '/etc/apache2',
                logDirectory: '/var/log/apache2',
                modulesDirectory: '/usr/lib/apache2/modules',
                binFile: '/usr/sbin/apache2ctl'
            },
            fedora: {
                serverRoot: '/etc/httpd',
                confFile: '/etc/httpd/conf/httpd.conf',
                confDirectory: '/etc/httpd',
                logDirectory: '/var/log/httpd',
                modulesDirectory: '/etc/httpd/modules',
                binFile: '/usr/sbin/apachectl'
            },
            suse32: {
                serverRoot: '/etc/apache2',
                confFile: '/etc/apache2/httpd.conf',
                confDirectory: '/etc/apache2',
                logDirectory: '/var/log/apache2',
                modulesDirectory: '/usr/lib/apache2',
                binFile: '/usr/sbin/apache2ctl'
            },
            suse64: {
                serverRoot: '/etc/apache2',
                confFile: '/etc/apache2/httpd.conf',
                confDirectory: '/etc/apache2',
                logDirectory: '/var/log/apache2',
                modulesDirectory: '/usr/lib64/apache2',
                binFile: '/usr/sbin/apache2ctl'
            }
        },

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
                
                if (!this.validate()) {
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
                if (!this.validate()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                that.submit('source');
            });
            
            on(registry.byId('initFormPackage'), "submit", function(e) {
                event.stop(e); // prevent the default submit
                if (!this.validate()) {
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

            on(registry.byId('operatingSystemSuggestionPackage'), "change", function(value) {
                var params = that.packageParams[value] || {};

                registry.byId('serverRootPackage').set('value', params.serverRoot || '');
                registry.byId('confFilePackage').set('value', params.confFile || '');
                registry.byId('confDirectoryPackage').set('value', params.confDirectory || '');
                registry.byId('logDirectoryPackage').set('value', params.logDirectory || '');
                registry.byId('modulesDirectoryPackage').set('value', params.modulesDirectory || '');
                registry.byId('binFilePackage').set('value', params.binFile || '');
            });
        }
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Init);
    
});