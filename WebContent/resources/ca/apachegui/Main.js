define([ "dojo/_base/declare",
         "dijit/registry",
         "dojo/request",
         "dojo/_base/json"
], function(declare, registry, request, json){	
	
	declare("ca.apachegui.Main", null, {		
	
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
				query: 	{
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
					ca.apachegui.Util.alert('Error',error.response.data.message);
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
				query: 	{
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
					ca.apachegui.Util.alert('Error',error.response.data.message);
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
				query: 	{
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
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
			
			return this.docDirectoryPath;
		},
	
		validateFileExists: function(file)
		{
			var exists=false;
			
			request.get('../web/Main', {
				query: 	{
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
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
			
			return exists;
		},
		
		checkSession: function() {
			var that = this;
			
			request.get('../web/Main', {
				query: 	{
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
						that.notRunningDialog = ca.apachegui.Util.noCloseDialog('Application Unavailable','The ApacheGUI application is not currently running. Your browser window will reload once the application has started.');
						that.notRunningDialog.show();
					}
				}
			);
		},
		
		startSessionTimer: function() {			
			ca.apachegui.Interval.setInterval(this.checkSession.bind(this), 5000);	
		},
		
		init: function(option)
		{
			this.currentOption=option;
			/** check if its the first time usage, 
			 *  if it is we need to display a dialog to the user
			 */
			if(ca.apachegui.Init.getInstance().firstTimeUse())
			{
				ca.apachegui.Init.getInstance().init();
			}	
			else
			{	
				this.startSessionTimer();
				
				var menuInstance = ca.apachegui.Menu.getInstance();
				
				menuInstance.init();
				menuInstance.setCurrentMenuId(option);
				
				var vtree = registry.byId('menuTree');
				if(menuInstance.isGUISettings(option))
				{
					vtree.set('path', ['apacheRoot','GUISettings']);
					ca.apachegui.GUISettings.getInstance().init();
				}
				
				if(menuInstance.isHistory(option))
				{
					vtree.set('path', ['apacheRoot','History']);
					ca.apachegui.History.getInstance().init();
				}
				
				if(menuInstance.isControl(option))
				{
					vtree.set('path', ['apacheRoot','Control']);
					ca.apachegui.Control.getInstance().init();
				}
				
				if(menuInstance.isGlobalSettings(option))
				{
					vtree.set('path', ['apacheRoot','Global_Settings']);
					ca.apachegui.globalsettings.GlobalSettings.getInstance().init();
				}
				
				if(menuInstance.isVirtualHosts(option))
				{
					vtree.set('path', ['apacheRoot','Virtual_Hosts']);
					ca.apachegui.VirtualHosts.getInstance().init();
				}
				
				var pathArray;
				var subOption;
				var i;
				if(menuInstance.isLogs(option)) {
					
					//vtree.set('path', ['apacheRoot','Logs',option]);
					pathArray=new Array();
					var logFilePath=this.getLogDirectoryPath();
					subOption=option.substring(5);
						
					pathArray.push('apacheRoot');
					pathArray.push('Logs-' + logFilePath);
					i=0;
					for(i=logFilePath.length + 1; i<=subOption.length; i++)
					{
						if(i==subOption.length)
						{
							pathArray.push('Logs-' + subOption);
						}	
						else if(subOption.charAt(i)=='/')
						{
							pathArray.push('Logs-' + subOption.substring(0, i));
						}	
					}
					vtree.set('path', pathArray);
					ca.apachegui.Logs.getInstance().init();
				}
				
				if(menuInstance.isDocuments(option)) {
					var documents = ca.apachegui.Documents.getInstance();
					
					pathArray=new Array();
					
					//We need to start with the windows drive eg C:/
					var docFilePath=this.isWindows() ? this.getDocDirectoryPath() : "/";
					
					subOption=option.substring(10);
					if(this.validateFileExists(subOption))
					{		
						pathArray.push('apacheRoot');
						pathArray.push('Documents-' + docFilePath);
						i=0;
						for(i=docFilePath.length + 1; i<=subOption.length; i++)
						{
							if(i==subOption.length)
							{
								pathArray.push('Documents-' + subOption);
							}	
							else if(subOption.charAt(i)=='/')
							{
								pathArray.push('Documents-' + subOption.substring(0, i));
							}	
						}
						vtree.set('path', pathArray);
						
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
					
					var configuration = ca.apachegui.Configuration.getInstance();
					configuration.init();
					
					pathArray=new Array();
					var confFilePath=this.getConfDirectoryPath();
					subOption=option.substring(14);
					if(this.validateFileExists(subOption))
					{	
						pathArray.push('apacheRoot');
						pathArray.push('Configuration-' + confFilePath);
						i=0;
						for(i=confFilePath.length + 1; i<=subOption.length; i++)
						{
							if(i==subOption.length)
							{
								pathArray.push('Configuration-' + subOption);
							}	
							else if(subOption.charAt(i)=='/')
							{
								pathArray.push('Configuration-' + subOption.substring(0, i));
							}	
						}
						vtree.set('path', pathArray);
						
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
	
	ca.apachegui.Main.currentMain=null;
	ca.apachegui.Main.getInstance = function() {
		if(!ca.apachegui.Main.currentMain) {
			ca.apachegui.Main.currentMain=new ca.apachegui.Main();
		}
		
		return ca.apachegui.Main.currentMain;
	};
	
});
  