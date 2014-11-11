define([ "dojo/_base/declare",
         "dojo/request",
         "dijit/registry",
         "dojo/on",
         "net/apachegui/Editor",
         "dojo/_base/json"
], function(declare, request, registry, on, Editor, json){
	
	declare("net.apachegui.Documents", [net.apachegui.Editor], {		

		initialized: false,
		isText: false,
		
		init: function () {
			if(this.initialized===false) {
				this.inherited(arguments);
				this.addListeners();
				this.initialized=true;
			}	
		},
		
		getIsText: function() {
			return this.isText;
		},
		
		setIsText: function(text) {
			this.isText = text;
		},
		
		save: function() {
			var that=net.apachegui.Documents.getInstance();
			
			if(that.getReadOnly() == true) {
				return;
			}
			
			var path=net.apachegui.Util.getQueryParam('file');
			
			var url='../web/Documents';
			
			var thisdialog = net.apachegui.Util.noCloseDialog('Saving', 'Saving Please Wait...');
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
				}, function(error) {
					thisdialog.remove();
					net.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		getDocumentsList: function() {
			var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading ...');
			thisdialog.show();
			
			request.get('../web/Documents', {
				query: 	{
					option: 'documentsList'
				},
				handleAs: 'json',
				preventCache: true,
				sync: false
			}).response.then(function(response) {
				
				var data = response.data;

				var list='';
				for(var i in data.files) {
					list=list + data.files[i] + "<br/>";
				}
				
				net.apachegui.Util.alert('Documents List',list);
									
				thisdialog.remove();
			}, function(error) {
				thisdialog.remove();
				net.apachegui.Util.alert('Info',error.response.data.message);
			});
		},
		
		addListeners: function() {
			this.inherited(arguments);
			
			CodeMirror.commands.save=this.save;
			
			var that = this;
			
			on(registry.byId('editorDocumentsList'), "click", function() {
				that.getDocumentsList();
			});
		}
	});
	
	net.apachegui.Documents.currentDocuments=null;
	//used globally to grab instance
	net.apachegui.Documents.getInstance = function() {
		if(!net.apachegui.Documents.currentDocuments) {
			net.apachegui.Documents.currentDocuments=new net.apachegui.Documents();
		}
		
		return net.apachegui.Documents.currentDocuments;
	};
	
});