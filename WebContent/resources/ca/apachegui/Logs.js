define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/json"
], function(declare, dom, registry, on, request, json){
	
	declare("ca.apachegui.Logs", null,{

		searchTextArea: null,
		tailTextArea: null,
		currByte: '0',
		initialized:false,
		isTailing: false,
		optionInit:null,
		currOption:null,
		
		init: function() {
			if(this.initialized===false) {
				this.addListeners();
				this.initialized=true;
			}
		},
		
		getSearchTextArea: function() {
			return this.searchTextArea;
		},
		
		setSearchTextArea: function(textArea) {
			this.searchTextArea=textArea;
		},
		
		getTailTextArea: function() {
			return this.tailTextArea;
		},
		
		setTailTextArea: function(textArea) {
			this.tailTextArea=textArea;
		},
		
		setCurrOption: function(option) {
			this.currOption=option;
		},
		
		updateSelection: function () {
			
			var option=registry.byId('logAction').get('value');
			
			if(option=='search')
			{
				if(this.optionInit==null) { 
					registry.byId('logTailDiv').set('style',{'display':'none'});
				}
				
				if(this.optionInit!=null && this.currOption!='search') {
					window.location.href='Logs.jsp?file=' + ca.apachegui.Util.getQueryParam('file') + '&option=search';
				}
			}
			if(option=='download')
			{
				window.open('../web/DownloadFile?file=' + dom.byId('filePath').innerHTML);
			}	
			if(option=='tail')
			{
				if(this.optionInit==null) { 
					registry.byId('logSearchDiv').set('style',{'display':'none'});
				}
				
				if(this.optionInit!=null && this.currOption!='tail') {
					window.location.href='Logs.jsp?file=' + ca.apachegui.Util.getQueryParam('file') + '&option=tail';
				}
			}
			
			this.optionInit=true;
		},
		
		search: function () {
			var that=this;
			
			var file=ca.apachegui.Util.getQueryParam('file');
			var searchFilter=dom.byId('searchFilter').value;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Generating', 'Searching Please Wait...');
			thisdialog.show();
			
			request.get("../web/Logs", {
				query: 	{
					option: 'search',
					searchFilter: searchFilter,
					file: file
				},
				handleAs: 'text',
				preventCache: true,
				sync: false
			}).response.then(
				function(response) {
				
					var data = response.data;
									
					that.getSearchTextArea().setValue(data);
					that.getSearchTextArea().setOption('lineNumbers',true);
					
					thisdialog.remove();
					
				},
				function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',error.response.data);
				}
			);
		},
		
		clearSearch: function () {
			this.searchTextArea.setValue('');
			this.searchTextArea.setOption('lineNumbers',false);
		},
		
		tail: function () {
			
			if(!this.isTailing)
			{	
				this.isTailing = true;
				this.refreshTailInfo();
				dom.byId('tailLogButton').innerHTML='Stop Tail';
				registry.byId('tailFilter').set('disabled',true);
				
			}
			else
			{
				this.isTailing = false;
				this.currByte='0';
				dom.byId('tailLogButton').innerHTML='Start Tail';
				registry.byId('tailFilter').set('disabled',false);
			}	
		},
		
		refreshTailInfo: function () {
			if(!this.isTailing) {
				return;
			}
			
			var that=this;
			var file=ca.apachegui.Util.getQueryParam('file');
			
			request.get("../web/Logs", {
				query: 	{
					option: 'tail',
					currByte: this.currByte,
					filter: dom.byId('tailFilter').value,
				    file: file
				},
				handleAs: 'text',
				sync: false,
				preventCache: true
			}).response.then(
				function(response) {
				
					if(response.getHeader('currByte')!=null) {
						that.currByte= response.getHeader('currByte');
					}
					
					var data = response.data;
									
					if(data!='')
					{	
						that.getTailTextArea().setValue(that.getTailTextArea().getValue() +  data);
						that.getTailTextArea().setOption('lineNumbers',true);
						that.getTailTextArea().setCursor(that.getTailTextArea().lineCount(),0);
					}
					
					setTimeout(that.refreshTailInfo.bind(that), 3000);
					
				},
				function(error) {
					ca.apachegui.Util.alert('Info',error.response.data);
				}
			);
		},
		
		clearTail: function () {
			this.tailTextArea.setValue('');
			this.tailTextArea.setOption('lineNumbers',false);
		},
		
		exportToFile: function () {
			var thisdialog = ca.apachegui.Util.noCloseDialog('Generating', 'Generating File Please Wait...');
			thisdialog.show();
			
			var file=ca.apachegui.Util.getQueryParam('file');
			var searchFilter=dom.byId('searchFilter').value;
			
			request.get("../web/Logs", {
				query: 	{
					option: 'export',
					searchFilter: searchFilter,
					file: file
				},
				handleAs: 'json',
				sync: false,
				preventCache: true
			}).response.then(function(response) {
				
				var data = response.data;
								
				window.location.href='../web/DownloadFile?file=' + data.file;
				
				thisdialog.remove();
				
			},
			function(error) {
				thisdialog.remove();
				ca.apachegui.Util.alert('Info',error.response.data.message);
			});
		},
		
		addListeners: function() {
			var that = this;
			
			on(registry.byId('searchButton'), "click", function() {
				that.search();
			});
			
			on(registry.byId('searchClearButton'), "click", function() {
				that.clearSearch();
			});
			
			on(registry.byId('searchExportButton'), "click", function() {
				that.exportToFile();
			});
			
			on(registry.byId('tailLogButton'), "click", function() {
				that.tail();
			});
			
			on(registry.byId('clearTailLogButton'), "click", function() {
				that.clearTail();
			});
			
			on(registry.byId('logAction'), "change", function() {
				that.updateSelection();
			});
		}
	});
	
	ca.apachegui.Logs.currentLogger=null;
	//used globally to grab instance
	ca.apachegui.Logs.getInstance = function() {
		if(!ca.apachegui.Logs.currentLogger) {
			ca.apachegui.Logs.currentLogger=new ca.apachegui.Logs();
		}
		
		return ca.apachegui.Logs.currentLogger;
	};
	
});