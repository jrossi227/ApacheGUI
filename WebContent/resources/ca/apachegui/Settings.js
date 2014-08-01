define([ "dojo/_base/declare",
         "dojo/request",
         "dojo/_base/json"
], function(declare, request, json){	
	
	declare("ca.apachegui.Settings", null, {	
		settingsMap: {},
		
		constructor: function() {
			var currSettingsMap={};
			request.post('../Settings', {
				data: 	{
					option: 'getAllSettingsNames'
				},
				handleAs: 'text',
				sync: true
			}).response.then(function(response) {
				
				var data = json.fromJson(response.data);
				var status = response.status;
				if(status!=200)
				{
					ca.apachegui.Util.alert('Error',data);
				}
				else
				{
					currSettingsMap=data;
				}	
			});
			
			this.settingsMap=currSettingsMap;
		},
		
		getSetting: function(name) {
			var setting='';
			
			request.post('../Settings', {
				data: 	{
					option: 'getSetting',
					name: name
				},
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
					setting=data;
				}	
			});
			
			return setting;
		},
		
		setSetting: function(name, value) {
			var change=true;
			
			request.post('../Settings', {
				data: 	{
					option: 'setSetting',
					name: name,
					value: value
				},
				handleAs: 'text',
				sync: true
			}).response.then(function(response) {
				
				var data = response.data;
				var status = response.status;
				if(status!=200)
				{
					change=false;
					ca.apachegui.Util.alert('Error',data);
				}	
			});
			
			return change;
		}
	});
	
	ca.apachegui.Settings.currentSettings=null;
	//used globally to grab instance
	ca.apachegui.Settings.getInstance = function() {
		if(!ca.apachegui.Settings.currentSettings) {
			ca.apachegui.Settings.currentSettings=new ca.apachegui.Settings();
		}
		
		return ca.apachegui.Settings.currentSettings;
	};
	
});		
		
		