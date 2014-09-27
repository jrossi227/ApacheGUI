define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/request",
         "dijit/registry",
         "dojo/on"
], function(declare, dom, request, registry, on){
	
	declare("ca.apachegui.VirtualHosts", null, {
		
		init : function() {
			this.populateVirtualHosts();
		},
		
		populateVirtualHosts : function() {
			
			var buildHostSummary = function(name, vhost, globalServerName) {
				
				var html = '<h5>Default</h5>';
				html +=	'<table class="vhost_summary_table">' +
							'<tbody>' +
								'<tr>' +
									'<td>Network:</td>' +
									'<td>' + name + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td>ServerName:</td>' +
									'<td>' + (vhost.ServerName == '' ? (globalServerName == '' ? 'unknown' : globalServerName)  : vhost.ServerName) + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td>File:</td>' +
									'<td>' + vhost.file + '</td>' +
								'</tr>' +
							'</tbody>' +
						'</table>';
				
				var div = document.createElement('div');
				div.className = 'vhost_summary';
				div.innerHTML = html;
				
				return div;
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
									var div = buildHostSummary(host, hostArray[i], serverName);
									nameVirtualHostContainer.appendChild(div);
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