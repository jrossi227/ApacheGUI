define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/request",
         "dijit/registry",
         "dojo/on",
         "dojo/data/ItemFileWriteStore",
         "dojox/grid/DataGrid"
], function(declare, dom, request, registry, on, ItemFileWriteStore, DataGrid){
	
	declare("ca.apachegui.VirtualHosts", null, {
		
		currentHostSummary: 0,
		
		init : function() {
			this.populateVirtualHosts();
		},
		
		populateVirtualHosts : function() {
			var that = this;
			
			var buildHostSummary = function(name, vhost, globalServerName) {
				
				var data = {
					      identifier: "id",
					      label: "name",
					      items: [{
					    	  id : 'networkname',
					    	  name: 'Network:',
					    	  value: name
					      },
					      {
					    	  id : 'servername',
					    	  name: 'ServerName:',
					    	  value: (vhost.ServerName == '' ? (globalServerName == '' ? 'unknown' : globalServerName)  : vhost.ServerName)
					      },
					      {
					    	  id : 'file',
					    	  name: 'File:',
					    	  value: vhost.file
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
					        id: 'grid-' + that.currentHostSummary,
					        store: store,
					        structure: layout,
					        selectable: true,
				            style: 'width:100%;',
				            autoHeight:true,
				            rowSelector: "20px"
			        	});
				
				var div = document.createElement('div');
				div.innerHTML = '<h5>Default For: ' + name + '</h5>';
				dom.byId('name_virtual_host_container').appendChild(div);
				
			    grid.placeAt("name_virtual_host_container");

			    grid.startup();		
			    
			    div = document.createElement('div');
				div.innerHTML = '<h5>Virtual Hosts For: ' + name + '</h5>';
				dom.byId('name_virtual_host_container').appendChild(div);
			    
			    that.currentHostSummary ++;
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
					var serverName = data.ServerName;
					
					var nameVirtualHostContainer = dom.byId('name_virtual_host_container');
					var otherVirtualHostContainer = dom.byId('other_virtual_host_container');
					
					for(host in hosts) {
						
						var hostArray = hosts[host];
						
						if(hostArray.length > 1) {
							
							for(var i=0; i<hostArray.length; i++) {
								if(i==0) {
									buildHostSummary(host, hostArray[i], serverName);
								}
							}
							
						} else {
							
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