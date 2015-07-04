define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dojo/_base/array", 
         "dojo/query",
         "dojo/_base/json",
         "dojo/data/ItemFileWriteStore",
         "dijit/form/Button",
         "net/apachegui/History" 
], function(declare, dom, registry, on, request, domClass, domConstruct, array, query, json, ItemFileWriteStore, Button, History){
    
    declare("net.apachegui.GUISettings", null, {
        currentMenuId: null,
        initialized: false,
        
        init: function () {
            if(this.initialized===false) {
                this.addListeners();
                this.bindSettingsMenu();
                this.initialized=true;
            }
        },
                
        bindSettingsMenu: function() {
            var menu = registry.byId("settings_menu");
            // when we right-click anywhere on the grid, make sure we open the menu
            menu.bindDomNode(settingsGrid.domNode);
        },
        
        setCurrentMenuId: function(id) {
            this.currentMenuId=id.toString();
        },
        
        newServer: function() {            
            var isHistoryEnabled=(net.apachegui.History.getInstance()).checkIfEnabled();
            if(isHistoryEnabled) {
                net.apachegui.Util.alert('Disable History','You can not start a new server while history is enabled. Please disable all history and try again');
            }
            else
            {    
                var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Configuring a new server, please wait...');
                thisdialog.show();
                
                request.post("../web/GUISettings", {
                    data:     {
                        option: 'newServer'
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                        window.location.reload();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
            }
        },
        
        updateSetting: function() {
            
            var id=this.currentMenuId;
                                        
            if(id==net.apachegui.Settings.getInstance().settingsMap.serverRoot)
            {
                registry.byId('updateSettingServerRoot').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.serverRoot));
                var dialog=registry.byId('updateServerRootDialog');
                dialog.show();
            }    
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.confDirectory)
            {
                registry.byId('updateSettingConfDirectory').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.confDirectory));
                var dialog=registry.byId('updateConfDirectoryDialog');
                dialog.show();
            }    
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.confFile)
            {
                registry.byId('updateSettingConfFile').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.confFile));
                var dialog=registry.byId('updateConfFileDialog');
                dialog.show();
            }    
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.logDirectory)
            {
                registry.byId('updateSettingLogDirectory').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.logDirectory));
                var dialog=registry.byId('updateLogDirectoryDialog');
                dialog.show();
            }
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.modulesDirectory)
            {
                registry.byId('updateSettingModulesDirectory').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.modulesDirectory));
                var dialog=registry.byId('updateModulesDirectoryDialog');
                dialog.show();
            }
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.binFile)
            {
                registry.byId('updateSettingBinFile').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.binFile));
                var dialog=registry.byId('updateBinFileDialog');
                dialog.show();
            }
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.username)
            {
                registry.byId('updateSettingUsername').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.username));
                var dialog=registry.byId('updateUsernameDialog');
                dialog.show();
            }
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.password)
            {
                var dialog=registry.byId('updatePasswordDialog');
                dialog.show();
            }
                
            if(id==net.apachegui.Settings.getInstance().settingsMap.theme)
            {
                dom.byId(net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.theme)).checked=true;
                var dialog=registry.byId('updateThemeDialog');
                dialog.show();
            }     
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.encoding)
            {
                var dialog=registry.byId('updateEncodingDialog');
                dialog.show();
            }

            if(id==net.apachegui.Settings.getInstance().settingsMap.enableAuthentication)
            {
                registry.byId('updateEnableAuthentication').set('value',net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.enableAuthentication));

                var dialog=registry.byId('updateEnableAuthenticationDialog');
                dialog.show();
            }
            
        },
        
        sendUpdate: function (id) {
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.serverRoot)
            {    
                if (!registry.byId('updateServerRootForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.serverRoot,dom.byId('updateSettingServerRoot').value);
                
                if(change===true) {
                    var dialog=registry.byId('updateServerRootDialog');
                    dialog.hide();
                }
            }
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.confDirectory)
            {    
                if (!registry.byId('updateConfDirectoryForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.confDirectory,dom.byId('updateSettingConfDirectory').value);
                if(change===true) {
                    var dialog=registry.byId('updateConfDirectoryDialog');
                    dialog.hide();
                }
            }
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.confFile)
            {    
                if (!registry.byId('updateConfFileForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.confFile,dom.byId('updateSettingConfFile').value);
                if(change===true) {
                    var dialog=registry.byId('updateConfFileDialog');
                    dialog.hide();
                }
            }
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.logDirectory)
            {    
                if (!registry.byId('updateLogDirectoryForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.logDirectory,dom.byId('updateSettingLogDirectory').value);
                if(change===true) {
                    var dialog=registry.byId('updateLogDirectoryDialog');
                    dialog.hide();
                }
            }
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.modulesDirectory)
            {    
                if (!registry.byId('updateModulesDirectoryForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.modulesDirectory,dom.byId('updateSettingModulesDirectory').value);
                if(change===true) {
                    var dialog=registry.byId('updateModulesDirectoryDialog');
                    dialog.hide();
                }
            }
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.binFile)
            {    
                if (!registry.byId('updateBinFileForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.binFile,dom.byId('updateSettingBinFile').value);
                if(change===true) {
                    var dialog=registry.byId('updateBinFileDialog');
                    dialog.hide();
                }
            }
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.username)
            {    
                if (!registry.byId('updateUsernameForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
                
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.username,dom.byId('updateSettingUsername').value);
                if(change===true) {
                    var dialog=registry.byId('updateUsernameDialog');
                    dialog.hide();
                }
            }    
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.password)
            {    
                if (!registry.byId('updatePasswordForm').isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                    }
                
                var password1=dom.byId('updateSettingPassword1').value;
                var password2=dom.byId('updateSettingPassword2').value;
                
                if(password1!=password2){
                    net.apachegui.Util.alert('Error','The passwords do not match');
                    return;
                }
                    
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.password,dom.byId('updateSettingPassword1').value);
                if(change===true) {
                    var dialog=registry.byId('updatePasswordDialog');
                    dialog.hide();
                }
            }    
            
            if(id==net.apachegui.Settings.getInstance().settingsMap.theme)
            {    
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.theme,query("input[name=themeType]:checked")[0].value);
                if(change===true) {
                    window.location.reload();
                }
            }

            if(id==net.apachegui.Settings.getInstance().settingsMap.enableAuthentication)
            {
                var change=net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.enableAuthentication,registry.byId('updateEnableAuthentication').get('value'));
                if(change===true) {
                    window.location.reload();
                }
            }
            
            //dialog and ajax here
            var newStore = new ItemFileWriteStore({url: '../web/GUISettings/Current', urlPreventCache: true});
            settingsGrid.setStore(newStore);
        },
        
        getServerInfo: function() {
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Please Wait...');
            thisdialog.show();
            
            request.get("../web/GUISettings", {
                query:     {
                    option: 'getServerInfo'
                },
                preventCache: true,
                handleAs: 'text',
                sync: false
            }).response.then(
                function(response) {
                
                    var data = response.data;
                    
                    net.apachegui.Util.alert('Info',data);    
                    
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    
                    var data = json.fromJson(error.response.data);
                    net.apachegui.Util.alert('Error',data.message);
                }
            );
        },
        
        addListeners: function() {
            var that=this;
            
            on(registry.byId('editSettingsMenuItem'), "click", function() {
                that.updateSetting();
            });
            
            on(registry.byId('serverRootUpdate'), "click",  function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.serverRoot);
            });
            
            on(registry.byId('serverRootUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateServerRootDialog');
                dialog.hide();
            });
            
            on(registry.byId('configurationDirectoryUpdate'), "click",  function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.confDirectory);
            });
            
            on(registry.byId('configurationDirectoryUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateConfDirectoryDialog');
                dialog.hide();
            });
            
            on(registry.byId('configurationFileUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.confFile);
            });
            
            on(registry.byId('configurationFileUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateConfFileDialog');
                dialog.hide();
            });
            
            on(registry.byId('logDirectoryUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.logDirectory);
            });
            
            on(registry.byId('logDirectoryUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateLogDirectoryDialog');
                dialog.hide();
            });
            
            on(registry.byId('modulesDirectoryUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.modulesDirectory);
            });
            
            on(registry.byId('modulesDirectoryUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateModulesDirectoryDialog');
                dialog.hide();
            });
            
            on(registry.byId('binaryFileUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.binFile);
            });
            
            on(registry.byId('binaryFileUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateBinFileDialog');
                dialog.hide();
            });
            
            on(registry.byId('usernameUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.username);
            });
            
            on(registry.byId('usernameUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateUsernameDialog');
                dialog.hide();
            });
            
            on(registry.byId('passwordUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.password);
            });
            
            on(registry.byId('passwordUpdateCancel'), "click", function() {
                var dialog=registry.byId('updatePasswordDialog');
                dialog.hide();
            });
            
            on(registry.byId('themeUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.theme);
            });
            
            on(registry.byId('themeUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateThemeDialog');
                dialog.hide();
            });
            
            on(registry.byId('encodingUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateEncodingDialog');
                dialog.hide();
            });

            on(registry.byId('enableAuthenticationUpdate'), "click", function() {
                that.sendUpdate(net.apachegui.Settings.getInstance().settingsMap.enableAuthentication);
            });

            on(registry.byId('enableAuthenticationUpdateCancel'), "click", function() {
                var dialog=registry.byId('updateEnableAuthenticationDialog');
                dialog.hide();
            });
            
            settingsGrid.onRowContextMenu= function(e) {    
                
                var item = settingsGrid.getItem(e.rowIndex);
                array.forEach(settingsGrid.store.getAttributes(item), function(attribute) {
                    var id = settingsGrid.store.getValues(item, attribute);
                    if(attribute=='id') {      
                        that.setCurrentMenuId(id); 
                    }
                 });
            };
            
            on(registry.byId('newServerButton'), "click", function() {
                net.apachegui.Util.confirmDialog(
                    "Please Confirm", 
                    "Are you sure you want to delete all current settings and data?",
                    function confirm(conf) {
                        if(conf) {
                            that.newServer();
                        }
                    });
            });
            
            on(registry.byId('guiInfoButton'), "click", function(){
                registry.byId('guiInfoDialog').show();
            }); 
            
            on(registry.byId('guiInfoClose'), "click", function() {
                registry.byId('guiInfoDialog').hide();
            }); 
                    
            on(registry.byId('serverInfoButton'), "click", function() {
                that.getServerInfo();  
            });
        }
    });
   
    net.apachegui.Util.setupSingletonInstance(net.apachegui.GUISettings);
    
});