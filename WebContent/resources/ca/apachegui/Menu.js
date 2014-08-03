define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/json",
         "dojo/_base/event",
         "dojo/dom-geometry",
         "dojo/query",
         "dojo/dom-style"
], function(declare, dom, registry, on, request, json, event, domGeom, query, domStyle){
	
	declare("ca.apachegui.Menu", null,{
	
		currentMenuId: null,
		fileBuffer: null,
		initialized: false,
		menuConnection:null,
		currWidth: 0,
		searchInterval: null,
		
		constructor: function() {
			this.currentMenuId=new String(''),
			this.fileBuffer=new Object();
		},
		
		init: function () {
			if(this.initialized===false) {
				this.addListeners();
				this.bindMenu();
				this.initialized=true;
			}
		},
		
		bindMenu: function () {			
			var menu = registry.byId("tree_menu");
			menu.selector = '.dijitTreeNode';
			// when we right-click anywhere on the tree, make sure we open the menu
			menu.bindDomNode(registry.byId("menuTree").domNode);
		},
		
		setCurrentMenuId: function(id) {
			this.currentMenuId=id.toString();
		},
		
		getCurrentMenuId: function() {
			return this.currentMenuId;
		},
		
		setMenuFades: function (tn) {
			registry.byId('renameMenuItem').set('disabled', false);
			registry.byId('newMenuItem').set('disabled', false);
			registry.byId('cutMenuItem').set('disabled', false);
			registry.byId('copyMenuItem').set('disabled', false);
			registry.byId('pasteMenuItem').set('disabled', false);
			registry.byId('deleteMenuItem').set('disabled', false);
			registry.byId('uploadMenuItem').set('disabled', false);
			registry.byId('downloadMenuItem').set('disabled', tn.item.children);
			registry.byId('searchMenuItem').set('disabled', !tn.item.children);
			registry.byId('newTabMenuItem').set('disabled', tn.item.children);
	
			
			if(this.currentMenuId.substring(0,14)=='Configuration-')
			{
				registry.byId('newMenuItem').set('disabled', !tn.item.children);
				registry.byId('pasteMenuItem').set('disabled', !tn.item.children);
				
				//Add paste disable logic here, should be a file in the buffer
				if(!this.fileBuffer.type || !this.fileBuffer.file)
				{
					registry.byId('pasteMenuItem').set('disabled', true);
				}	
				
				registry.byId('uploadMenuItem').set('disabled', !tn.item.children);
				return;
			}
			if(this.currentMenuId.substring(0,10)=='Documents-')
			{
				registry.byId('newMenuItem').set('disabled', !tn.item.children);
				registry.byId('pasteMenuItem').set('disabled', !tn.item.children);
				
				//Add paste disable logic here, should be a file in the buffer
				if(!this.fileBuffer.type || !this.fileBuffer.file)
				{
					registry.byId('pasteMenuItem').set('disabled', true);
				}	
				registry.byId('uploadMenuItem').set('disabled', !tn.item.children);
				return;
			}
			if(this.currentMenuId.substring(0,5)=='Logs-')
			{
				registry.byId('renameMenuItem').set('disabled', true);
				registry.byId('newMenuItem').set('disabled', true);
				registry.byId('cutMenuItem').set('disabled', true);
				registry.byId('copyMenuItem').set('disabled', true);
				registry.byId('pasteMenuItem').set('disabled', true);
				registry.byId('uploadMenuItem').set('disabled', true);
				registry.byId('deleteMenuItem').set('disabled', tn.item.children);
				return;
			}	
			
			registry.byId('renameMenuItem').set('disabled', true);
			registry.byId('newMenuItem').set('disabled', true);
			registry.byId('cutMenuItem').set('disabled', true);
			registry.byId('copyMenuItem').set('disabled', true);
			registry.byId('pasteMenuItem').set('disabled', true);
			registry.byId('uploadMenuItem').set('disabled', true);
			registry.byId('downloadMenuItem').set('disabled', true);
			registry.byId('searchMenuItem').set('disabled', true);
			registry.byId('deleteMenuItem').set('disabled', true);
		},
		
		rename: function () {
			//cant delete a file you are focused on
			//cant delete a file you are focused on
			if(this.currentMenuId==ca.apachegui.Main.getInstance().getCurrentOption())
			{
				ca.apachegui.Util.alert('Error','You can not rename a file that you are focused on');
				return;
			}
			
			dom.byId('renameFileOldFile').innerHTML=this.currentMenuId.substring(this.currentMenuId.lastIndexOf("/")+1);
			
			registry.byId('renameFileFilename').set('value','');
			
			registry.byId('renameFileDialog').show();
		},
		
		renameFileSubmit: function () {
			var that=this;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Renaming', 'Renaming Please Wait...');
			thisdialog.show();
			
			request.post("../Menu", {
				data: {
					option: 'renameFile',
					oldFile: this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1),
					newFile: (this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1,this.currentMenuId.lastIndexOf("/")+1) + dom.byId('renameFileFilename').value)
				},
				handleAs: 'text',
				sync: false
			}).response.then(function(response) {
				
				var data = response.data;
				
				var status = response.status;
				if(status!=200) {
					ca.apachegui.Util.alert('Error',data);
				} else {
					//update menu here
					registry.byId('renameFileDialog').hide();
					that.refresh();
				}	
				
				thisdialog.remove();
			});
		},
		
		newFile: function () {
			registry.byId('newFileDialog').show();
		},
		
		newFileSubmit: function () {
			var that=this;
			
			var type='file';
			if(dom.byId('newFileFileTypeDirectory').checked) {
				type='directory';
			}
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('New File', 'Creating New File Please Wait...');
			thisdialog.show();
			
			request.post("../Menu", {
				data: {
					option: 'newFile',
					filename: (this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1) + '/' + dom.byId('newFileFilename').value),
					type: type
				},
				handleAs: 'text',
				sync: false
			}).response.then(function(response) {
				
				var data = response.data;
				
				var status = response.status;
				if(status!=200) {
					ca.apachegui.Util.alert('Error',data);
				} else {
					//update menu here
					registry.byId('newFileDialog').hide();
					that.refresh();
				}	
				
				thisdialog.remove();
			});
		},
		
		cut: function () {
			this.fileBuffer.type='cut';
			this.fileBuffer.file=this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1);
		},
		
		copy: function () {
			this.fileBuffer.type='copy';
			this.fileBuffer.file=this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1);
		},
		
		paste: function () {
			var that=this;
			
			if(!this.fileBuffer.type || !this.fileBuffer.file) {
				return;
			}	
			var option=this.fileBuffer.type;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Pasting', 'Pasting Please Wait...');
			thisdialog.show();
			
			request.post("../Menu", {
				data: {
					option: option,
					oldFile: this.fileBuffer.file, 
					directory: this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1)
				},
				handleAs: 'text',
				sync: false
			}).response.then(function(response) {
				
				var data = response.data;
				
				var status = response.status;
				if(status!=200) {
					ca.apachegui.Util.alert('Error',data);
				} else {
					//update menu here
					that.fileBuffer=new Object();
					that.refresh();
				}	
				
				thisdialog.remove();
			});
		},
		
		deleteFile: function () {
			var that=this;
			
			ca.apachegui.Util.confirmDialog('Confirm', 'Are you sure that you would like to delete ' + this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1) + '?', function (confirm){
					if(!confirm) {
						return;
					}
					
					var thisdialog = ca.apachegui.Util.noCloseDialog('Deleting', 'Deleting Please Wait...');
					thisdialog.show();
				
					request.post("../Menu", {
						data: {
							option: 'deleteFile',
							filename: that.currentMenuId.substring(that.currentMenuId.indexOf("-")+1)
						},
						handleAs: 'text',
						sync: false
					}).response.then(function(response) {
						
						var data = response.data;
						
						var status = response.status;
						if(status!=200) {
							ca.apachegui.Util.alert('Error',data);
						} else {
							//update menu here
							that.refresh();
						}	
						
						thisdialog.remove();
					});
					
				});
		},
		
		hideNewFile: function () {
			registry.byId('newFileDialog').hide();
		},
		
		hideRenameFile: function () {
			registry.byId('renameFileDialog').hide();
		},
		
		newTab: function () {
			 if(this.isGUISettings(this.getCurrentMenuId()))
			 {
				 window.open('GUISettings.jsp');
			 }
			 
			 if(this.isHistory(this.getCurrentMenuId()))
			 {
				 window.open('History.jsp');
			 }
			 
			 if(this.isControl(this.getCurrentMenuId()))
			 {
				 window.open('Control.jsp');
			 }
			 
			 if(this.isGlobalSettings(this.getCurrentMenuId()))
			 {
				 window.open('GlobalSettings.jsp');
			 }
			 
			 if(this.isLogs(this.getCurrentMenuId()))
			 {
				 window.open('Logs.jsp?file=' + this.extractLogFile(this.getCurrentMenuId()));		 
			 }
			 
			 if(this.isDocuments(this.getCurrentMenuId()))
			 {
			     window.open('Documents.jsp?file=' + this.extractDocumentFile(this.getCurrentMenuId()));			 
			 }
			 
			 if(this.isConfiguration(this.getCurrentMenuId()))
			 {
				 window.open('Configuration.jsp?file=' + this.extractConfigurationFile(this.getCurrentMenuId()));			 
			 }	  
			 
		},
		
		upload:function () {
			
			if(this.isDocuments(this.getCurrentMenuId()))
			{
				dom.byId('uploadDirectoryName').value=this.extractDocumentFile(this.getCurrentMenuId());
			}		 
			

			if(this.isConfiguration(this.getCurrentMenuId()))
			{
				dom.byId('uploadDirectoryName').value=this.extractConfigurationFile(this.getCurrentMenuId());
			}		  	
						
			registry.byId('uploadFileDialog').show();
		},
		
		download: function () {
			 if(this.isLogs(this.getCurrentMenuId()))
			 {
				 window.open('../web/DownloadFile?file=' + this.extractLogFile(this.getCurrentMenuId()));
			 }		 
			
			 if(this.isDocuments(this.getCurrentMenuId()))
			 {
				 window.open('../web/DownloadFile?file=' + this.extractDocumentFile(this.getCurrentMenuId()));
			 }		 

			 if(this.isConfiguration(this.getCurrentMenuId()))
			 {
				 window.open('../web/DownloadFile?file=' + this.extractConfigurationFile(this.getCurrentMenuId()));
			 }	
		},
		
		search: function() {
			
			if(this.isConfiguration(this.getCurrentMenuId()))
		    {
				registry.byId('searchConfigurationDialog').show();
				return;
		    } 
			
			if(this.isDocuments(this.getCurrentMenuId()))
			{
		    	dom.byId('searchDirectoryDisplay').innerHTML = this.extractDocumentFile(this.getCurrentMenuId());
		    }
			
			if(this.isLogs(this.getCurrentMenuId()))
			{
		    	dom.byId('searchDirectoryDisplay').innerHTML = this.extractLogFile(this.getCurrentMenuId());	
		    }
			
			registry.byId('searchDialog').show();
		},
		
		clearSearchInterval: function() {
			if(!!this.searchInterval) {
				ca.apachegui.Interval.clearInterval( this.searchInterval );
			}
		},
		
		submitSearch: function() {
			var that = this;
			
			var searchFilter=dom.byId('searchFileFilter').value;
			var searchFileList=dom.byId('searchFileList').value;
			var searchRecursively=dom.byId('searchRecursively').checked;
			
			var searchDirectory = dom.byId('searchDirectoryDisplay').innerHTML.trim();
			
			request.post('../Menu', {
				data: 	{
					option: 'submitSearch',
					searchFilter: searchFilter,
					searchFileList: searchFileList,
					searchRecursively: searchRecursively,
					searchDirectory: searchDirectory
				},
				handleAs: 'text',
				sync: false
			}).response.then(function(response) {
				
				var data = json.fromJson(response.data);
				
				var status = response.status;
				if(status!=200)
				{
					ca.apachegui.Util.alert('Error',data.error);
				}
				else
				{					
					var message = '';
					
					var started = data.started;
					if(started) {
						// run interval
						message = 'Grabbing the list of files to search...';
					} else {
						//search in Progress
						message = 'There appears to be a search already in progress';
					}
					
					dom.byId('searchProgressMessage').innerHTML = message;
										
					registry.byId('searchProgressDialog').show();
					
					that.clearSearchInterval();
					
					that.searchInterval = ca.apachegui.Interval.setInterval(function() {
						that.searchCheck();
					}, 2000);
					
				}	
				
			});
		},
		
		searchCheck: function() {
			var that = this;
			
			request.post('../Menu', {
				data: 	{
					option: 'searchCheck'
				},
				handleAs: 'text',
				sync: false
			}).response.then(function(response) {
				
				var data = json.fromJson(response.data);
				
				var status = response.status;
				if(status!=200)
				{
					ca.apachegui.Util.alert('Error',data.result);
				}
				else
				{
					
					var searchStatus = data.status;
					if(searchStatus == 'running') {
						dom.byId('searchProgressMessage').innerHTML = data.output;
					} 
					
					if(searchStatus == 'done') {
						var list='<div id="searchResults">';
						var results = data.results;
						
						if(results.length==0) {
							list += 'Search string not found';
						}
						else {
							
							list += 'Returning a maximum of ' + data.maxResults + ' results<br/>';
							var iter =1;
							for(var i in results) {
								
								var displayPage = 'Documents.jsp';
								if(results[i].path.startsWith(ca.apachegui.Main.getInstance().getLogDirectoryPath())) {
									displayPage = "Logs.jsp";
								}
								
								list += '<strong>' + iter + '</strong>: <a href="' + displayPage + '?file=' + results[i].path + '" target="_blank">' + results[i].path + ' Line ' + results[i].line + '</a>';
								list += '<br/>';
								list += '<p>' + results[i].content + '</p>';
								
								iter ++;
							}
						}
						list += '</div>';
						
						ca.apachegui.Util.alert('Search Results',list);
						
						registry.byId('searchProgressDialog').hide();
												
						that.clearSearchInterval();
					}
					
					if(searchStatus == 'cancelled') {
						that.clearSearchInterval();
						registry.byId('searchProgressDialog').hide();
					}
				}	
				
			});
		},
		
		searchCancel: function() {
			
			this.clearSearchInterval();
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Cancelling', 'Cancelling Please Wait...');
			thisdialog.show();
			
			request.post('../Menu', {
				data: 	{
					option: 'searchCancel'
				},
				handleAs: 'text',
				sync: false
			}).response.then(function(response) {
				
				var data = response.data;
				
				var status = response.status;
				if(status!=200)
				{
					ca.apachegui.Util.alert('Error',data);
				}
				
				registry.byId('searchProgressDialog').hide();
				
				thisdialog.remove();
			});
		},
		
		submitConfigurationSearch: function() {
			var filter=dom.byId('searchConfigurationFilter').value;
			var activeFilesFilter=dom.byId('searchConfigurationActiveFilesFilter').checked;
			var commentsFilter=dom.byId('searchConfigurationCommentsFilter').checked;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Generating', 'Searching Files Please Wait...');
			thisdialog.show();
				
			request.get('../web/Configuration', {
				query: 	{
					option: 'search',
					filter: filter,
					activeFilesFilter: activeFilesFilter,
					commentsFilter: commentsFilter
				},
				handleAs: 'json',
				preventCache: true,
				sync: false
			}).response.then(
				function(response) {
				
					var data = response.data;
					
					var list='<div id="searchResults">';
					var results = data.results;
					
					if(results.length==0) {
						list += 'Search string not found';
					}
					else {
						list += 'Returning a maximum of ' + data.maxResults + ' results<br/>';
						var iter =1;
						for(var i in results) {
							list += '<strong>' + iter + '</strong>: <a href="Configuration.jsp?file=' + results[i].path + '" target="_blank">' + results[i].path + ' Line ' + results[i].line + '</a>';
							list += '<br/>';
							list += '<p>' + results[i].content + '</p>';
							
							iter ++;
						}
					}
					list += '</div>';
					
					ca.apachegui.Util.alert('Search Results',list);
					
					thisdialog.remove();
				},
				function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		refresh: function () {
			
			registry.byId('menuTree').reload();
			ca.apachegui.Main.getInstance().init(ca.apachegui.Main.getInstance().getCurrentOption());
		},
		
		menuClick: function (id, type) {
			 var stype=type.toString();
			 var sid=id.toString();
			 
			 if(this.isGUISettings(sid))
			 {
				 window.location.href='GUISettings.jsp';
			 }
			 if(this.isHistory(sid))
			 {
				 window.location.href='History.jsp';
			 }
			 if(this.isControl(sid))
			 {
				 window.location.href='Control.jsp';
			 }
			 if(this.isGlobalSettings(sid))
			 {
				 window.location.href='GlobalSettings.jsp';
			 }
			 if(this.isLogs(sid))
			 {
				 window.location.href='Logs.jsp?file=' + this.extractLogFile(sid);		 
			 }
			 
			 if(this.isDocuments(sid))
			 {
			     window.location.href='Documents.jsp?file=' + this.extractDocumentFile(sid);			 
			 }
			 
			 if(this.isConfiguration(sid))
			 {
				 window.location.href='Configuration.jsp?file=' + this.extractConfigurationFile(sid);			 
			 }	  
		},
		
		getItemByIdentity: function(id) {
			var item;
			apacheStore.fetchItemByIdentity({
	            identity:id,
	            onItem:function(poItem){
	                item=poItem;
	            }
	        });
			return item;
	
		},
		
		isConfiguration: function(menuOption) {
			return menuOption.startsWith('Configuration-');
		},
		
		extractConfigurationFile: function(menuOption) {
			if(this.isConfiguration) {
				return menuOption.substring(14);
			}
			
			return null;
		},
		
		isDocuments: function(menuOption) {
			return menuOption.startsWith('Documents-');
		},
		
		extractDocumentFile: function(menuOption) {
			if(this.isDocuments) {
				return menuOption.substring(10);
			}
			
			return null;
		},
		
		isLogs: function(menuOption) {
			return menuOption.startsWith('Logs-');
		},
		
		extractLogFile: function(menuOption) {
			if(this.isLogs) {
				return menuOption.substring(5);
			}
			
			return null;
		},
		
		isControl: function(menuOption) {
			return menuOption == 'Control';
		},
		
		isGlobalSettings: function(menuOption) {
			return menuOption == 'Global_Settings';
		},
		
		isHistory: function(menuOption) {
			return menuOption == 'History';
		},
		
		isGUISettings: function(menuOption) {
			return menuOption == 'GUISettings';
		},
		
		addListeners: function() {
			var that=this;
			
			on(registry.byId('renameMenuItem'), "click", function() {
				that.rename();
			});
			
			on(registry.byId('newMenuItem'), "click", function() {
				that.newFile();
			});
			
			on(registry.byId('cutMenuItem'), "click", function() {
				that.cut();
			});
				
			on(registry.byId('copyMenuItem'), "click", function() {
				that.copy();
			});
			
			on(registry.byId('pasteMenuItem'), "click", function(){
				that.paste();
			});
			
			on(registry.byId('deleteMenuItem'), "click", function() {
				that.deleteFile();
			});
			
			on(registry.byId('refreshMenuItem'), "click", function() {
				that.refresh();
			});
			
			on(registry.byId('uploadMenuItem'), "click", function() {
				that.upload();
			});
			
			on(registry.byId('downloadMenuItem'), "click", function() {
				that.download();
			});
			
			on(registry.byId('searchMenuItem'), "click", function() {
				that.search();
			});
			
			on(registry.byId('newTabMenuItem'), "click", function() {
				that.newTab();
			});
			
			on(registry.byId('menuTree'), "click", function(item) {
				that.menuClick(item.id, item.type);
			});
			
			on(registry.byId('tree_menu'), "focus", function(e) {
				var tn = registry.getEnclosingWidget(this.currentTarget);
				that.setCurrentMenuId(tn.item.id);
				that.setMenuFades(tn);
			});
			
			on(registry.byId('newFileCancel'), "click", function() {
				that.hideNewFile();
			});
			
			on(registry.byId('renameFileCancel'), "click", function(){
				that.hideRenameFile();
			});
			
			on(registry.byId('uploadFileCancel'), "click", function() {
				registry.byId('uploadFileDialog').hide();
			});
			
			on(registry.byId('newFileForm'), "submit", function(e) {
				event.stop(e); // prevent the default submit
				if (!this.isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
	
				that.newFileSubmit();
			});
			
			on(registry.byId('renameFileForm'), "submit", function(e) {
				event.stop(e); // prevent the default submit
				if (!this.isValid()) {
					ca.apachegui.Util.alert('Error','Please fix fields');
					return;
				}
	
				that.renameFileSubmit();
			});
			
			on(registry.byId('uploadFile'), "complete", function() {
				that.refresh();
			});
			
			on(registry.byId('submitSearchConfigurationButton'), "click", function() {
				that.submitConfigurationSearch();
			});
				
			on(registry.byId('hideSearchConfigurationButton'), "click", function() {
				registry.byId('searchConfigurationDialog').hide();
			});
			
			on(registry.byId('submitSearchButton'), "click", function() {
				that.submitSearch();
			});
				
			on(registry.byId('hideSearchButton'), "click", function() {
				registry.byId('searchDialog').hide();
			});
			
			on(registry.byId('searchProgressCancel'), "click", function() {
				that.searchCancel();
			});
			
			var treeContainerNode = query('.dijitTreeContainer',dom.byId('menuTree'))[0];
			
			var updateMenuWidth = function() {
				var treeContainer = domGeom.position(treeContainerNode);
				
				var width = treeContainer.w;
					
				var padding = 20;
				
				width += padding;
				
				if(that.currWidth != width && width > padding) {
				
					that.currWidth = width;
					
					domStyle.set('leftCol', "width", width + 'px');				
					
					registry.byId('appLayout').resize();
					registry.byId('leftCol')._afterResize();
				}
			};
			
			ca.apachegui.Interval.setInterval(updateMenuWidth, 150);
		}
	});
	
	ca.apachegui.Menu.currentMenu=null;
	//used globally to grab instance
	ca.apachegui.Menu.getInstance = function() {
		if(!ca.apachegui.Menu.currentMenu) {
			ca.apachegui.Menu.currentMenu=new ca.apachegui.Menu();
		}
		
		return ca.apachegui.Menu.currentMenu;
	};
	
});