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
         "ca/apachegui/History" 
], function(declare, dom, registry, on, request, domClass, domConstruct, array, query, json, ItemFileWriteStore, Button, History){
	
	declare("ca.apachegui.GUISettings", null, {
		currentMenuId: null,
		initialized: false,
		updateTimer: null,
		checkingForUpdates: false,
		downloading: false,
		
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
			var isHistoryEnabled=(ca.apachegui.History.getInstance()).checkIfEnabled();
			if(isHistoryEnabled) {
				ca.apachegui.Util.alert('Disable History','You can not start a new server while history is enabled. Please disable all history and try again');
			}
			else
			{	
				var thisdialog = ca.apachegui.Util.noCloseDialog('Loading', 'Configuring a new server, please wait...');
				thisdialog.show();
				
				request.post("../web/GUISettings", {
					data: 	{
						option: 'newServer'
					},
					handleAs: 'json',
					sync: true
				}).response.then(
					function(response) {
						window.location.reload();
					},
					function(error) {
						thisdialog.remove();
						ca.apachegui.Util.alert('Error',error.response.data.message);
					}
				);
			}
		},
		
		updateSetting: function() {
		    
		    var id=this.currentMenuId;
		    		    			    
		    if(id==ca.apachegui.Settings.getInstance().settingsMap.serverRoot)
			{
				registry.byId('updateSettingServerRoot').set('value',ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.serverRoot));
				var dialog=registry.byId('updateServerRootDialog');
				dialog.show();
			}	
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.confDirectory)
			{
				registry.byId('updateSettingConfDirectory').set('value',ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.confDirectory));
				var dialog=registry.byId('updateConfDirectoryDialog');
				dialog.show();
			}	
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.confFile)
			{
				registry.byId('updateSettingConfFile').set('value',ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.confFile));
				var dialog=registry.byId('updateConfFileDialog');
				dialog.show();
			}	
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.logDirectory)
			{
				registry.byId('updateSettingLogDirectory').set('value',ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.logDirectory));
				var dialog=registry.byId('updateLogDirectoryDialog');
				dialog.show();
			}
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.modulesDirectory)
			{
				registry.byId('updateSettingModulesDirectory').set('value',ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.modulesDirectory));
				var dialog=registry.byId('updateModulesDirectoryDialog');
				dialog.show();
			}
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.binFile)
			{
				registry.byId('updateSettingBinFile').set('value',ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.binFile));
				var dialog=registry.byId('updateBinFileDialog');
				dialog.show();
			}
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.username)
			{
				registry.byId('updateSettingUsername').set('value',ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.username));
				var dialog=registry.byId('updateUsernameDialog');
				dialog.show();
			}
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.password)
			{
				var dialog=registry.byId('updatePasswordDialog');
				dialog.show();
			}
				
			if(id==ca.apachegui.Settings.getInstance().settingsMap.theme)
			{
				dom.byId(ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.theme)).checked=true;
				var dialog=registry.byId('updateThemeDialog');
				dialog.show();
			}	 
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.encoding)
			{
				var dialog=registry.byId('updateEncodingDialog');
				dialog.show();
			}	 
			
		},
		
		sendUpdate: function (id) {
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.serverRoot)
			{	
				if (!registry.byId('updateServerRootForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
				
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.serverRoot,dom.byId('updateSettingServerRoot').value);
				
				if(change===true) {
					var dialog=registry.byId('updateServerRootDialog');
					dialog.hide();
				}
			}
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.confDirectory)
			{	
				if (!registry.byId('updateConfDirectoryForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
				
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.confDirectory,dom.byId('updateSettingConfDirectory').value);
				if(change===true) {
					var dialog=registry.byId('updateConfDirectoryDialog');
					dialog.hide();
				}
			}
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.confFile)
			{	
				if (!registry.byId('updateConfFileForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
				
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.confFile,dom.byId('updateSettingConfFile').value);
				if(change===true) {
					var dialog=registry.byId('updateConfFileDialog');
					dialog.hide();
				}
			}
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.logDirectory)
			{	
				if (!registry.byId('updateLogDirectoryForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
				
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.logDirectory,dom.byId('updateSettingLogDirectory').value);
				if(change===true) {
					var dialog=registry.byId('updateLogDirectoryDialog');
					dialog.hide();
				}
			}
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.modulesDirectory)
			{	
				if (!registry.byId('updateModulesDirectoryForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
				
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.modulesDirectory,dom.byId('updateSettingModulesDirectory').value);
				if(change===true) {
					var dialog=registry.byId('updateModulesDirectoryDialog');
					dialog.hide();
				}
			}
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.binFile)
			{	
				if (!registry.byId('updateBinFileForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
				
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.binFile,dom.byId('updateSettingBinFile').value);
				if(change===true) {
					var dialog=registry.byId('updateBinFileDialog');
					dialog.hide();
				}
			}
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.username)
			{	
				if (!registry.byId('updateUsernameForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
				
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.username,dom.byId('updateSettingUsername').value);
				if(change===true) {
					var dialog=registry.byId('updateUsernameDialog');
					dialog.hide();
				}
			}	
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.password)
			{	
				if (!registry.byId('updatePasswordForm').isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
					}
				
				var password1=dom.byId('updateSettingPassword1').value;
				var password2=dom.byId('updateSettingPassword2').value;
				
				if(password1!=password2){
					ca.apachegui.Util.alert('Error','The passwords do not match');
					return;
				}
					
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.password,dom.byId('updateSettingPassword1').value);
				if(change===true) {
					var dialog=registry.byId('updatePasswordDialog');
					dialog.hide();
				}
			}	
			
			if(id==ca.apachegui.Settings.getInstance().settingsMap.theme)
			{	
				var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.theme,query("input:radio[name=themeType]:checked")[0].value);
				if(change===true) {
					window.location.reload();
				}
			}
			
			//dialog and ajax here
			var newStore = new ItemFileWriteStore({url: '../web/GUISettings/Current', urlPreventCache: true});
			settingsGrid.setStore(newStore);
		},
		
		getServerInfo: function() {
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Loading', 'Please Wait...');
			thisdialog.show();
			
			request.get("../web/GUISettings", {
				query: 	{
					option: 'getServerInfo'
				},
				preventCache: true,
				handleAs: 'text',
				sync: false
			}).response.then(
				function(response) {
				
					var data = response.data;
					
					ca.apachegui.Util.alert('Info',data);	
					
					thisdialog.remove();
				},
				function(error) {
					thisdialog.remove();
					
					var data = json.fromJson(error.response.data);
					ca.apachegui.Util.alert('Error',data.message);
				}
			);
		},
		
		isUpdateAvailable: function(newVersion) {
			var currentVersionNum=parseInt(ca.apachegui.Main.getInstance().getApacheGuiVersion().split('.').join(''));
			var newVersionNum=parseInt(newVersion.split('.').join(''));
			
			if(newVersionNum > currentVersionNum) {
				return true;
			}
			
			return false;
		},
		
		checkForUpdates: function() {
			var that=this;
			
			domClass.add('updateInfoContainer', 'dijitContentPaneLoading');
			domConstruct.empty('updateInfoContainer');
			dom.byId('updateInfoContainer').innerHTML='Loading...';
			
			if(this.checkingForUpdates==false) {		
				request.post("/ApacheGUIUpdater/Update", {
					data: 	{
						option: 'getUpdateInfo'
					},
					handleAs: 'json',
					sync: false
				}).response.then(
					function(response) {
					
						var data = response.data;
						
						domClass.remove('updateInfoContainer', 'dijitContentPaneLoading');
						
						if(!!data.version && that.isUpdateAvailable(data.version)) {
							dom.byId('updateInfoContainer').innerHTML='Updates are available' +
																   '<p>version - ' + data.version + '<br>' +
																   'size - ' + data.size + '</p>' + 
																   ((!!data.details && data.details != '') ? '<p>Details - ' + data.details + '</p>' : '');
							
							if(ca.apachegui.Main.getInstance().getApacheGuiVersion().match(new RegExp(data.compatibilitys,"g")) == null){
								var p = document.createElement('P');
								var text = document.createTextNode('Unfortunately this version of ApacheGUI is not eligible for automatic updates. You will have to download the new version manually.');
								p.appendChild(text);
								dom.byId('updateInfoContainer').appendChild(p);
							}
							else {
								var updateButton = new Button({
					            	label: "Update",
					            	onClick: function() {
					            		that.updateGUI();
					            	}
								});
							
								dom.byId('updateInfoContainer').appendChild(updateButton.domNode);
							}
							
						} else {
							dom.byId('updateInfoContainer').innerHTML='There are no updates available.';
						}
					
						that.checkingForUpdates=false;
					},
					function(error) {
						dom.byId('updateInfoContainer').innerHTML='Update information is not currently available. Please check your internet connection.';
					}
				);
							
				this.checkingForUpdates=true;
			}
		},
		
		updateGUI: function() {
			var that=this;
			
			registry.byId('updateGUIDialog').show();
			dom.byId('updateStatusText').innerHTML='Starting';
			
			request.post("/ApacheGUIUpdater/Update", {
				data: 	{
					option: 'startUpdate'
				},
				handleAs: 'text',
				sync: false
			}).response.then(
				function(response) {
			
					that.clearUpdateTimer();
					
					//convert to milliseconds
					that.updateTimer = ca.apachegui.Interval.setInterval(that.getUpdateStatus.bind(that), 3000);	
						
				},
				function(error) {
					ca.apachegui.Util.alert('Error',"There was an error starting the update");
				}
			);
		},
		
		getUpdateStatus: function() {
			var that=this;
			
			request.post("/ApacheGUIUpdater/Update", {
				data: 	{
					option: 'getUpdateStatus'
				},
				handleAs: 'json',
				sync: false
			}).response.then(
				function(response) {
				
					var data = response.data;
					
					var status = response.status;
					var showFinish = function() {
						that.clearUpdateTimer();
						
						var finishedButton = new Button({
				            label: "OK",
				            onClick: function() {
				            	window.location.reload();
				            }
				        });
						
						domClass.remove('updateStatusText', 'dijitContentPaneLoading');
						domClass.add('finishedContainer','dijitDialogPaneActionBar');
						dom.byId('finishedContainer').appendChild(finishedButton.domNode);
						dom.byId('finishedContainer').style.display='block';
						domConstruct.destroy('updateStatusAdvisory');
					};
					
					var showError = function() {
						showFinish();
						
						dom.byId('updateStatusText').innerHTML='There was an error with the update, please try again later.';
						
						dom.byId('progressContainer').style.display='none';
					};
					
					if(status!=200) {
						showError();
						
						return;
					}
					else
					{
						if(data.status=='Error') {
							showError();
							
							return;
						}
						
						dom.byId('updateStatusText').innerHTML=data.status;
					
						if(data.status=='Downloading') {
							if(that.downloading==false) {
								dom.byId('progressContainer').style.display='block';
							}
							that.downloading=true;
							
							registry.byId('downloadProgress').update({
					            maximum: 100,
					            progress: data.progress
					        });
						}
						
						if(data.status=='Installing') {
							if(that.downloading==true) {
								dom.byId('progressContainer').style.display='none';
								that.downloading=false;
							}
						}
						
						if(data.status=='Finished') {
							showFinish();
						}
					}	
				},
				function(error) {
					ca.apachegui.Util.alert('Error',"There was an error with the update");
				}
			);
		},
		
		clearUpdateTimer: function() {
			ca.apachegui.Interval.clearInterval ( this.updateTimer );
		},
		
		addListeners: function() {
			var that=this;
			
			on(registry.byId('editSettingsMenuItem'), "click", function() {
				that.updateSetting();
			});
			
			on(registry.byId('serverRootUpdate'), "click",  function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.serverRoot);
			});
			
			on(registry.byId('serverRootUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateServerRootDialog');
				dialog.hide();
			});
			
			on(registry.byId('configurationDirectoryUpdate'), "click",  function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.confDirectory);
			});
			
			on(registry.byId('configurationDirectoryUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateConfDirectoryDialog');
				dialog.hide();
			});
			
			on(registry.byId('configurationFileUpdate'), "click", function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.confFile);
			});
			
			on(registry.byId('configurationFileUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateConfFileDialog');
				dialog.hide();
			});
			
			on(registry.byId('logDirectoryUpdate'), "click", function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.logDirectory);
			});
			
			on(registry.byId('logDirectoryUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateLogDirectoryDialog');
				dialog.hide();
			});
			
			on(registry.byId('modulesDirectoryUpdate'), "click", function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.modulesDirectory);
			});
			
			on(registry.byId('modulesDirectoryUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateModulesDirectoryDialog');
				dialog.hide();
			});
			
			on(registry.byId('binaryFileUpdate'), "click", function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.binFile);
			});
			
			on(registry.byId('binaryFileUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateBinFileDialog');
				dialog.hide();
			});
			
			on(registry.byId('usernameUpdate'), "click", function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.username);
			});
			
			on(registry.byId('usernameUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateUsernameDialog');
				dialog.hide();
			});
			
			on(registry.byId('passwordUpdate'), "click", function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.password);
			});
			
			on(registry.byId('passwordUpdateCancel'), "click", function() {
				var dialog=registry.byId('updatePasswordDialog');
				dialog.hide();
			});
			
			on(registry.byId('themeUpdate'), "click", function() {
				that.sendUpdate(ca.apachegui.Settings.getInstance().settingsMap.theme);
			});
			
			on(registry.byId('themeUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateThemeDialog');
				dialog.hide();
			});
			
			on(registry.byId('encodingUpdateCancel'), "click", function() {
				var dialog=registry.byId('updateEncodingDialog');
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
				ca.apachegui.Util.confirmDialog(
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
				that.checkForUpdates();
			}); 
			
			on(registry.byId('guiInfoClose'), "click", function() {
				registry.byId('guiInfoDialog').hide();
			}); 
					
			on(registry.byId('serverInfoButton'), "click", function() {
				that.getServerInfo();  
			});
		}
	});
	
	ca.apachegui.GUISettings.currentGUISettings=null;
	//used globally to grab instance
	ca.apachegui.GUISettings.getInstance = function() {
		if(!ca.apachegui.GUISettings.currentGUISettings) {
			ca.apachegui.GUISettings.currentGUISettings=new ca.apachegui.GUISettings();
		}
		
		return ca.apachegui.GUISettings.currentGUISettings;
	};
	
});