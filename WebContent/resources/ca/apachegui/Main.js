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
		
		getConfDirectoryPath: function()
		{
			var confFilePath='';
			
			request.post('../Main', {
				data: 	{
					option: 'confFilePath'
				},
				handleAs: 'text',
				sync: true
			}).response.then(function(response) {
				
				var data = json.fromJson(response.data);
				confFilePath=data.file;
			});
			
			return confFilePath;
		},
	
		getLogDirectoryPath: function()
		{
			var logFilePath='';
			
			request.post('../Main', {
				data: 	{
					option: 'logFilePath'
				},
				handleAs: 'text',
				sync: true
			}).response.then(function(response) {
				
				var data = json.fromJson(response.data);
				logFilePath=data.file;
			});
			
			return logFilePath;
		},
	
		getDocDirectoryPath: function()
		{
			var docFilePath='';
			
			request.post('../Main', {
				data: 	{
					option: 'docFilePath'
				},
				handleAs: 'text',
				sync: true
			}).response.then(function(response) {
				
				var data = json.fromJson(response.data);
				docFilePath=data.file;
			});
			
			return docFilePath;
		},
	
		validateFileExists: function(file)
		{
			var exists=false;
			
			request.post('../Main', {
				data: 	{
					option: 'validateFileExists',
					filename: file
				},
				handleAs: 'text',
				sync: true
			}).response.then(function(response) {
				
				var data = json.fromJson(response.data);
				exists=data.exists;
			});
			
			return exists;
		},
		
		checkSession: function() {
			var that = this;
			
			request.post('../Main', {
				data: 	{
					option: 'checkSession'
				},
				handleAs: 'text',
				sync: false
			}).response.then(function(response) {
				var data = response.data;
				var status = response.status;
				if(status != 200 || data.indexOf('<html>')>-1) {
					that.sessionActive = false;
					window.location.reload();
				}	
			});
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
  