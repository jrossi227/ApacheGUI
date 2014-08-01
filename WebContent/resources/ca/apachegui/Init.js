define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/event"
], function(declare, dom, registry, on, request, event){	
	
	declare("ca.apachegui.Init", null, {	

		initialized: false,
		
		init: function() {
			if(this.initialized===false) {
				this.addListeners();
			
				if(ca.apachegui.Main.getInstance().isWindows()) {
					registry.byId('initDialogSource').show();
				} else {
					registry.byId('initDialogInstallationType').show();
				}
			
				this.initialized=true;
			}
		},
		
		firstTimeUse: function() {
			var firstTime=false;
		    
		    request.get("../Init", {
				handleAs: 'text',
				preventCache: true,
				sync: true
			}).response.then(function(response) {								
				var status = response.status;
				if(status!=200) {
					firstTime=true;
				}
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
					  password2: dom.byId('password2Source').value
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
					  password2: dom.byId('password2Package').value
				};
			}
						
			request.post('../Init', {
				data: xhrArgs,
				handleAs: 'text',
				sync: true
			}).response.then(function(response) {
				
				var data = response.data;
				
				var status = response.status;
				if(status!=200)
				{
					ca.apachegui.Util.alert('Error',data);
				}
				else
				{
					document.location='GUISettings.jsp';
				}	
			});
		},
		
		addListeners: function () {
			var that=this;
			
			on(registry.byId('initFormInstallationType'), "submit", function(e) {
				event.stop(e); // prevent the default submit
	            
				if (!this.isValid()) {
	                ca.apachegui.Util.alert('Error','Please fix fields');
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
					ca.apachegui.Util.alert('Error','You must select an option');
				} 
			});
			
			on(registry.byId('initFormSource'), "submit", function(e) {
				event.stop(e); // prevent the default submit
	            if (!this.isValid()) {
	                ca.apachegui.Util.alert('Error','Please fix fields');
	                return;
	            }
	            
	            that.submit('source');
			});
			
			on(registry.byId('initFormPackage'), "submit", function(e) {
				event.stop(e); // prevent the default submit
		        if (!this.isValid()) {
		        	ca.apachegui.Util.alert('Error','Please fix fields');
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
	
	ca.apachegui.Init.currentInit=null;
	//used globally to grab instance
	ca.apachegui.Init.getInstance = function() {
		if(!ca.apachegui.Init.currentInit) {
			ca.apachegui.Init.currentInit=new ca.apachegui.Init();
		}
		
		return ca.apachegui.Init.currentInit;
	};
	
});