define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "ca/apachegui/Editor",
         "dojo/_base/json"
], function(declare, dom, registry, on, request, Editor, json){	
	
	declare("ca.apachegui.Configuration", [ca.apachegui.Editor], {		
		
		initialized: false,
		
		init: function() {
			
			if(this.initialized===false) {
				this.inherited(arguments);
				this.addListeners();
				this.initialized=true;
			}	
		},
		
		testConfiguration: function () {
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Loading', 'Loading ...');
			thisdialog.show();
			
			request.get('../web/Configuration', {
				query: 	{
					option: 'test'
				},
				handleAs: 'json',
				preventCache: true,
				sync: false
			}).response.then(
				function(response) {
					var data = response.data;
					
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',data.result);
				},
				function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		getActiveFileList: function() {
			var thisdialog = ca.apachegui.Util.noCloseDialog('Loading', 'Loading ...');
			thisdialog.show();
			
			request.get('../web/Configuration', {
				query: 	{
					option: 'activeFileList'
				},
				handleAs: 'json',
				sync: false,
				preventCache: true
			}).response.then(
				function(response) {
				
					var data = response.data;

					var list='';
					for(var i in data.files) {
						list=list + data.files[i] + "<br/>";
					}
					
					ca.apachegui.Util.alert('Active File List',list);
					
					thisdialog.remove();
				},
				function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		save: function() {
			var that=ca.apachegui.Configuration.getInstance();
			
			if(that.getReadOnly() == true) {
				return;
			}
			
			var path=ca.apachegui.Util.getQueryParam('file');
			
			var url='../web/Configuration';
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Saving', 'Saving Please Wait...');
			thisdialog.show();
			
			that.stopUpdateTimer();
			
			request.post(url, {
				data: 	{
					option: 'save', 
					path: path, 
					content: that.editor.getValue()
				},
				handleAs: 'json',
				sync: false
			}).response.then(
				function(response) {
					var data = response.data;
					
					that.clearSaveState();
					that.setToolbarFades();
					
					if(data.time != -1) {
						that.setOpenTime(data.time);
					}
					
					thisdialog.remove();
					
					that.startUpdateTimer();
				},
				function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		preview: function(line) {
			ca.apachegui.Util.alert('Preview',escape(line));
		},
		
		addListeners : function() {
			var that = this;
			
			this.inherited(arguments);
			
			CodeMirror.commands.save=this.save;
			
			on(registry.byId('editorConfigurationTest'), "click", function() {
				that.testConfiguration();
			});
			
			on(registry.byId('editorConfigurationActiveList'), "click", function() {
				that.getActiveFileList();
			});
			
			on(registry.byId('editorConfigurationSearch'), "click", function() {
				registry.byId('searchConfigurationDialog').show();
			});
			
		}	
			
	});
	
	ca.apachegui.Configuration.currentConfiguration=null;
	ca.apachegui.Configuration.getInstance = function() {
		if(!ca.apachegui.Configuration.currentConfiguration) {
			ca.apachegui.Configuration.currentConfiguration=new ca.apachegui.Configuration();
		}
		
		return ca.apachegui.Configuration.currentConfiguration;
	};
	
});