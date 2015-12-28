define([ "dojo/_base/declare",
         "dijit/registry",
         "dojo/on",
         "../GlobalTree",
         "net/apachegui/globalsettings/Networking",
         "net/apachegui/globalsettings/Modules",
         "net/apachegui/globalsettings/Mime"
], function(declare, registry, on, Networking, Modules, Mime){
    
    declare("net.apachegui.globalsettings.GlobalSettings", null, {    
        initialized: false,
        loadedTabs: [],
        TABS: {
            NETWORKING: 'networkingTab',
            MIME: 'mimeTab',
            MODULES: 'modulesTab'
        },
        
        init: function () {
            if(this.initialized===false) {
                this.addListeners();
                this.loadTab(this.TABS.NETWORKING);
                
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

            if(tabId==this.TABS.NETWORKING) {
                jsp='Networking.jsp';
                
                onLoad=function() {
                    net.apachegui.globalsettings.Networking.getInstance().init();
                };
            }
            
            if(tabId==this.TABS.MIME) {
                jsp='Mime.jsp';
                
                onLoad=function() {
                    net.apachegui.globalsettings.Mime.getInstance().init();
                };
            }
            
            if(tabId==this.TABS.MODULES) {
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
    
    