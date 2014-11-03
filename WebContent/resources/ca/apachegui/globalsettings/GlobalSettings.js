define([ "dojo/_base/declare",
         "dijit/registry",
         "dojo/on",
         "ca/apachegui/globalsettings/Networking",
		 "ca/apachegui/globalsettings/Modules",
		 "ca/apachegui/globalsettings/Mime"
], function(declare, registry, on, Networking, Modules, Mime){
	
	declare("ca.apachegui.globalsettings.GlobalSettings", null, {	
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
					ca.apachegui.globalsettings.Networking.getInstance().init();
				};
			}
			
			if(tabId=="mimeTab") {
				jsp='Mime.jsp';
				
				onLoad=function() {
					ca.apachegui.globalsettings.Mime.getInstance().init();
				};
			}
			
			if(tabId=="modulesTab") {
				jsp='Modules.jsp';
				
				onLoad=function() {
					ca.apachegui.globalsettings.Modules.getInstance().init();
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
	
	ca.apachegui.globalsettings.GlobalSettings.currentGlobalSettings=null;
	//used globally to grab instance
	ca.apachegui.globalsettings.GlobalSettings.getInstance = function() {
		if(!ca.apachegui.globalsettings.GlobalSettings.currentGlobalSettings) {
			ca.apachegui.globalsettings.GlobalSettings.currentGlobalSettings=new ca.apachegui.globalsettings.GlobalSettings();
		}
		
		return ca.apachegui.globalsettings.GlobalSettings.currentGlobalSettings;
	};
	
});
	
	