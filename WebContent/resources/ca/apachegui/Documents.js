define([ "dojo/_base/declare",
         "dojo/request",
         "dijit/registry",
         "dojo/on",
         "ca/apachegui/Editor",
         "dojo/_base/json"
], function(declare, request, registry, on, Editor, json){
	
	declare("ca.apachegui.Documents", [ca.apachegui.Editor], {		

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
			var that=ca.apachegui.Documents.getInstance();
			
			if(that.getReadOnly() == true) {
				return;
			}
			
			var path=ca.apachegui.Util.getQueryParam('file');
			
			var url='../web/Documents';
			
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
				}, function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		getDocumentsList: function() {
			var thisdialog = ca.apachegui.Util.noCloseDialog('Loading', 'Loading ...');
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
				
				ca.apachegui.Util.alert('Documents List',list);
									
				thisdialog.remove();
			}, function(error) {
				thisdialog.remove();
				ca.apachegui.Util.alert('Info',error.response.data.message);
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
	
	ca.apachegui.Documents.currentDocuments=null;
	//used globally to grab instance
	ca.apachegui.Documents.getInstance = function() {
		if(!ca.apachegui.Documents.currentDocuments) {
			ca.apachegui.Documents.currentDocuments=new ca.apachegui.Documents();
		}
		
		return ca.apachegui.Documents.currentDocuments;
	};
	
});