define([ "dojo/_base/declare",
         "dojo/request",
         "dojo/_base/json"
], function(declare, request, json){    
    
    declare("net.apachegui.Settings", null, {    
        settingsMap: {},
        
        constructor: function() {
            var currSettingsMap={};
            request.get('../web/Settings', {
                query:     {
                    option: 'getAllSettingsNames'
                },
                handleAs: 'json',
                sync: true,
                preventCache: true
            }).response.then(
                function(response) {
                    var data = response.data;
                    currSettingsMap=data;    
                },
                function(error) {
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
            
            this.settingsMap=currSettingsMap;
        },
        
        getSetting: function(name) {
            var setting='';
            
            request.get('../web/Settings', {
                query:     {
                    option: 'getSetting',
                    name: name
                },
                handleAs: 'json',
                sync: true,
                preventCache: true
            }).response.then(
                function(response) {
                
                    var data = response.data;
                    setting=data.value;    
                },
                function(error) {
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
            
            return setting;
        },
        
        setSetting: function(name, value) {
            var change=true;
            
            request.post('../web/Settings', {
                data:     {
                    option: 'setSetting',
                    name: name,
                    value: value
                },
                handleAs: 'json',
                sync: true
            }).response.then(
                function(response) {
                
                },
                function(error) {
                    change = false;
                    net.apachegui.Util.alert('Error',error.response.data.message);
                });
                
            return change;
        }
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Settings);
    
});        
        
        