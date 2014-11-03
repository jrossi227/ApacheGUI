define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/request",
         "dijit/registry",
         "dojo/on",
         "dojo/data/ItemFileWriteStore",
         "dojox/grid/DataGrid",
         "ca/apachegui/TitlePane"
], function(declare, dom, request, registry, on, ItemFileWriteStore, DataGrid, TitlePane){
	
	declare("ca.apachegui.VirtualHosts", null, {
		
		currentHostSummaryCount: 0,
		initialized: false,
		
		init : function() {
			if(this.initialized===false) {
				this.populateVirtualHosts();
				this.initialized = true;
			}
		},
		
		populateVirtualHosts : function() {
			var that = this;
			
			var buildVirtualHost = function(name, vhost, containerId, globalServerName, globalDocumentRoot) {
				
				var documentRoot = (vhost.DocumentRoot == '' ? (globalDocumentRoot == '' ? 'unknown' : globalDocumentRoot)  : vhost.DocumentRoot);
				var serverName = (vhost.ServerName == '' ? (globalServerName == '' ? 'unknown' : globalServerName)  : vhost.ServerName);
				
				var data = {
					      identifier: "id",
					      label: "name",
					      items: [{
					    	  id : 'networkname',
					    	  name: 'Network',
					    	  value: name
					      },
					      {
					    	  id : 'port',
					    	  name: 'Port',
					    	  value: vhost.NetworkInfo.port == -1 ? '' : vhost.NetworkInfo.port
					      },
					      {
					    	  id : 'address',
					    	  name: 'Address',
					    	  value: vhost.NetworkInfo.address
					      },
					      {
					    	  id : 'file',
					    	  name: 'File',
					    	  value: '<a target="_blank" href="Configuration.jsp?file=' + vhost.file + '">' + vhost.file + '</a> Line: ' + vhost.lineOfStart
					      },
					      {
					    	  id : 'documentroot',
					    	  name: 'DocumentRoot',
					    	  value: documentRoot
					      },
					      {
					    	  id : 'servername',
					    	  name: 'ServerName',
					    	  value: serverName
					      }]
					};
				
				var store = new ItemFileWriteStore({data: data});
				
				var layout = [[
				               {
				            	   name: ' ', 
				            	   field: 'name', 
				            	   width: '150px'
				               },
				               {
				            	   name: ' ', 
				            	   field: 'value', 
				            	   width: 'auto'
				               }
				             ]];
						
				
				
				var grid = new DataGrid({
			        id: 'grid-' + that.currentHostSummaryCount,
			        store: store,
			        structure: layout,
			        selectable: true,
		            style: 'width:100%;',
		            autoHeight:true,
		            escapeHTMLInData:false,
		            rowSelector: "20px"
	        	});
										
			    var tp = new TitlePane({title: serverName, content: grid, open: false});
			    dom.byId(containerId).appendChild(tp.domNode);
			    tp.startup();
			    
			    grid.startup();		
			    
			    that.currentHostSummaryCount ++;
				
			};
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Loading', 'Loading Virtual Hosts...');
			thisdialog.show();
			
			request.get('../web/VirtualHosts', {
				query: 	{
					option: 'getAllVirtualHosts'
				},
				handleAs: 'json',
				preventCache: true,
				sync: false
			}).response.then(
				function(response) {
					var data = response.data;
					
					var hosts = data.hosts;
					var globalServerName = data.ServerName;
					var globalDocumentRoot = data.DocumentRoot;
					
					for(host in hosts) {
						
						var hostArray = hosts[host];
						
						if(hostArray.length > 1) {
							
							dom.byId('name_virtual_host_container_none').style.display = 'none';
							
							for(var i=0; i<hostArray.length; i++) {
								if(i==0) {
									
									var div = document.createElement('div');
									div.innerHTML = '<h4>' + host + '</h4>';
									dom.byId('name_virtual_host_container').appendChild(div);
									
									div = document.createElement('div');
									div.innerHTML = '<h5>Default</h5>';
									dom.byId('name_virtual_host_container').appendChild(div);
									
									buildVirtualHost(host, hostArray[i], "name_virtual_host_container", globalServerName, globalDocumentRoot);
									
								    div = document.createElement('div');
									div.innerHTML = '<h5>Other Virtual Hosts</h5>';
									dom.byId('name_virtual_host_container').appendChild(div);
								} else {
								
									buildVirtualHost(host, hostArray[i], "name_virtual_host_container", globalServerName, globalDocumentRoot);
								}
							}
														
						} else {
							dom.byId('other_virtual_host_container_none').style.display = 'none';
							
							var div = document.createElement('div');
							div.innerHTML = '<h4>' + host + '</h4>';
							dom.byId('other_virtual_host_container').appendChild(div);
							
							buildVirtualHost(host, hostArray[0], "other_virtual_host_container", globalServerName, globalDocumentRoot);							
						}
						
					}
										
					thisdialog.remove();
				},
				function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
			
		}
	
	});
	
	ca.apachegui.VirtualHosts.currentVirtualHosts=null;
	//used globally to grab instance
	ca.apachegui.VirtualHosts.getInstance = function() {
		if(!ca.apachegui.VirtualHosts.currentVirtualHosts) {
			ca.apachegui.VirtualHosts.currentVirtualHosts=new ca.apachegui.VirtualHosts();
		}
		
		return ca.apachegui.VirtualHosts.currentVirtualHosts;
	};
	
});	