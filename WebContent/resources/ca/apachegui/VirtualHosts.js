define([ "dojo/_base/declare",
         "dojo/request",
         "dijit/registry",
         "dojo/on"
], function(declare, request, registry, on){
	
	declare("ca.apachegui.VirtualHosts", null, {
		
		init : function() {
		
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