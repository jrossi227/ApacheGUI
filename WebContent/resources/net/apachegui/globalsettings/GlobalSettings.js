define([ "dojo/_base/declare",
         "dijit/registry",
         "dojo/on",
         "net/apachegui/globalsettings/Networking",
         "net/apachegui/globalsettings/Modules",
         "net/apachegui/globalsettings/Mime"
], function(declare, registry, on, Networking, Modules, Mime){
    
    declare("net.apachegui.globalsettings.GlobalSettings", null, {    
        initialized: false,
        loadedTabs: [],
        
        init: function () {
            if(this.initialized===false) {
                this.addListeners();
                this.loadTab("networkingTab");
                
                this.initialized=true;
            }
        },
        
        loadTab: function(tabId) {
            if(this.loadedTabs.indexOf(tabId) != -1) {
                return;
            }
            
            this.loadedTabs.push(tabId);
            
            var jsp='';
            var onLoad;
            
            if(tabId=="networkingTab") {
                jsp='Networking.jsp';
                
                onLoad=function() {
                    net.apachegui.globalsettings.Networking.getInstance().init();
                };
            }
            
            if(tabId=="mimeTab") {
                jsp='Mime.jsp';
                
                onLoad=function() {
                    net.apachegui.globalsettings.Mime.getInstance().init();
                };
            }
            
            if(tabId=="modulesTab") {
                jsp='Modules.jsp';
                
                onLoad=function() {
                    net.apachegui.globalsettings.Modules.getInstance().init();
                };
            }
            
            var tab= registry.byId(tabId);
            tab.attr("onDownloadEnd", function(){
                if(!!onLoad) {
                    onLoad();
                }
            });
            
            tab.attr("href", "../jsp/global_settings/" + jsp);
        },
        
        addListeners: function() {
            var that=this;
            
            registry.byId("globalSettingsTabs").watch("selectedChildWidget", function(name, oval, nval){
                that.loadTab(nval.id);
            });
        }
        
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.GlobalSettings);
    
});
    
    