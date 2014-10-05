define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/json",
         "ca/apachegui/Control"
], function(declare, dom, registry, on, request, json, Control){
	
	declare("ca.apachegui.History", null,{
		initialized: false,
		
		init: function() {
			if(this.initialized==false) {
				
				this.changeHistoryChoice('search');
			
				var historyRetention=this.getHistoryRetention();
				dom.byId('historyRetention').value=historyRetention;
			
				var historyBuffer=this.getHistoryBuffer();
				dom.byId('historyBuffer').value=historyBuffer;
			
				var currentTime = new Date();
				var month = (currentTime.getMonth() + 1).toString();
				if(month.length==1)
					month='0' + month;
			
				var day = (currentTime.getDate()).toString();
				if(day.length==1)
					day='0' + day;
			
				var year = (currentTime.getFullYear()).toString();
			
				var hours = (currentTime.getHours()).toString();
				if(hours.length==1)
					hours='0' + hours;
			
				var minutes = (currentTime.getMinutes()).toString();
				if(minutes.length==1)
					minutes='0' + minutes;
			
				var seconds = (currentTime.getSeconds()).toString();
				if(seconds.length==1)
					seconds='0' + seconds;
			
				dom.byId('startDate').value=day +'/' + month + '/' + year;
				dom.byId('startTime').value='00:00:00';
			
				dom.byId('endDate').value=day +'/' + month + '/' + year;
				dom.byId('endTime').value=hours + ':' + minutes + ':' + seconds;
			
				this.populateEnabled();
				this.populateDisabled();
				
				this.addListeners();
				
				this.initialized=true;
			}
		},
		
		populateEnabled: function() {
			dom.byId("history_enabled_hosts_container").innerHTML = '';
			
			request.get("../web/History", {
				query: 	{
					option: 'getEnabled'
				},
				handleAs: 'json',
				sync: false,
				preventCache: true
			}).response.then(
				function(response) {
					dom.byId("history_enable_loading_container").style.display = 'none';
					
				},
				function(error) {
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
			
		},
		
		populateDisabled: function() {
			dom.byId("history_disabled_hosts_container").innerHTML = '';
			
			request.get("../web/History", {
				query: 	{
					option: 'getDisabled'
				},
				handleAs: 'json',
				sync: false,
				preventCache: true
			}).response.then(
				function(response) {
					dom.byId("history_disable_loading_container").style.display = 'none';
					
				},
				function(error) {
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
		},
		
		search: function () {
			if(dom.byId('startDate').value == '' || dom.byId('startTime').value == '' || dom.byId('endDate').value == '' || dom.byId('endTime').value == '') {
				ca.apachegui.Util.alert("Error","Please fill in all required fields");
			}
			else if(!registry.byId('startDate').isValid() || !registry.byId('startTime').isValid() || !registry.byId('endDate').isValid() || !registry.byId('endTime').isValid()) {
				ca.apachegui.Util.alert("Error","Please fix required field formats");
			}
			else {	
				window.open('SearchResults.jsp?startDate=' + dom.byId('startDate').value + '&startTime=' + dom.byId('startTime').value + '&endDate=' + dom.byId('endDate').value + '&endTime=' + dom.byId('endTime').value + '&host=' + dom.byId('host').value + '&userAgent=' + escape(dom.byId('userAgent').value) + '&requestString=' + escape(dom.byId('requestString').value) + '&status=' + dom.byId('status').value + '&contentSize=' + dom.byId('contentSize').value + '&maxResults=' + dom.byId('maxResults').value);
			}
		},
		
		csv: function () {
			if(dom.byId('startDate').value == '' || dom.byId('startTime').value == '' || dom.byId('endDate').value == '' || dom.byId('endTime').value == '') {
				ca.apachegui.Util.alert("Error","Please fill in all required fields");
			}
			else if(!registry.byId('startDate').isValid() || !registry.byId('startTime').isValid() || !registry.byId('endDate').isValid() || !registry.byId('endTime').isValid()) {
				ca.apachegui.Util.alert("Error","Please fix required field formats");
			}
			else
			{	
				var thisdialog = ca.apachegui.Util.noCloseDialog('Generating', 'Please wait...');
				thisdialog.show();
				
				request.get("../web/SearchResults", {
					query: 	{
						option: 'csv',
						startDate: dom.byId('startDate').value,
						startTime: dom.byId('startTime').value,
						endDate: dom.byId('endDate').value,
						endTime: dom.byId('endTime').value,
						host: dom.byId('host').value,
						userAgent: dom.byId('userAgent').value,
						requestString: dom.byId('requestString').value,
						status: dom.byId('status').value,
						contentSize: dom.byId('contentSize').value,
						maxResults: dom.byId('maxResults').value
					},
					handleAs: 'json',
					sync: false,
					preventCache: true
				}).response.then(
					function(response) {
						thisdialog.remove();
						document.location='../HistoryFiles/ApacheGUIHistory.csv';	
					},
					function(error) {
						thisdialog.remove();
						ca.apachegui.Util.alert('Error',error.response.data.message);
					}
				);
				
			}
		},
		
		deleteHistory: function () {
			
			ca.apachegui.Util.confirmDialog(
				"Please Confirm", 
				"Are you sure you want to delete this History?",
				function confirm(conf){
					if(conf) {
						var thisdialog = ca.apachegui.Util.noCloseDialog('Deleting ', 'Please wait...');
						thisdialog.show();
						
						request.get("../web/SearchResults", {
							query: 	{
								option: 'delete',
								startDate: dom.byId('startDate').value,
								startTime: dom.byId('startTime').value,
								endDate: dom.byId('endDate').value,
								endTime: dom.byId('endTime').value,
								host: dom.byId('host').value,
								userAgent: dom.byId('userAgent').value,
								requestString: dom.byId('requestString').value,
								status: dom.byId('status').value,
								contentSize: dom.byId('contentSize').value
							},
							handleAs: 'json',
							sync: false,
							preventCache: true
						}).response.then(
							function(response) {
								window.location.reload();
							},
							function(error) {
								thisdialog.remove();
								ca.apachegui.Util.alert('Error',error.response.data.message);
							}
						);
					}
				}
			);
		},
		
		changeHistoryChoice: function (choice) {
			if(choice=='search') {
				dom.byId('searchTable').style.display='block';
				dom.byId('graphTable').style.display='none';
				dom.byId('historySearchChoice').checked=true;
			}
			if(choice=='graph') {
				dom.byId('searchTable').style.display='none';
				dom.byId('graphTable').style.display='block';
				dom.byId('historyGraphChoice').checked=true;
			}	
		},
		
		graph: function () {
			if(dom.byId('graphDate').value == '') {
				ca.apachegui.Util.alert("Error","Please fill in all required fields");
			}
			if(!registry.byId('graphDate').isValid()) {
				ca.apachegui.Util.alert("Error","Please fix required field formats");
			}
			else {
				window.open('GenerateGraph.jsp?date=' + dom.byId('graphDate').value + '&type=' + registry.byId('graphType').value + '&host=' + dom.byId('graphHost').value + '&userAgent=' + escape(dom.byId('graphUserAgent').value) + '&requestString=' + escape(dom.byId('graphRequestString').value) + '&status=' + dom.byId('graphStatus').value + '&contentSize=' + dom.byId('graphContentSize').value);
			}	
		},
		
		getHistoryRetention: function () {
			var retentionDays=ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.historyRetention);
			return retentionDays;
		},
		
		updateHistoryRetention: function () {
			var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.historyRetention,dom.byId('historyRetention').value);
			
			if(change===true) {
				ca.apachegui.Util.alert('Success',"The days to keep history was successfully updated");
			}
		},
		
		getHistoryBuffer: function () {
			var historyBuffer=ca.apachegui.Settings.getInstance().getSetting(ca.apachegui.Settings.getInstance().settingsMap.historyBuffer);
			return historyBuffer;
		},
		
		updateHistoryBuffer: function () {
			var change=ca.apachegui.Settings.getInstance().setSetting(ca.apachegui.Settings.getInstance().settingsMap.historyBuffer,dom.byId('historyBuffer').value);
			
			if(change===true) {
				ca.apachegui.Util.alert('Success',"The insert buffer size was successfully updated");
			}
		},
		
		addListeners: function() {
			var that = this;
			
			on(registry.byId('historySearchButton'), "click", function() {
				that.search();
			});
			
			on(registry.byId('historyCSVButton'), "click", function() {
				that.csv();
			});
	
			on(registry.byId('historyDeleteButton'), "click", function() {
				that.deleteHistory();
			});

			on(registry.byId('historyGraphButton'), "click", function() {
				that.graph();
			});
			
			on(registry.byId('historyRetentionButton'), "click", function() {
				that.updateHistoryRetention();
			});
			
			on(registry.byId('historyBufferButton'), "click", function() {
				that.updateHistoryBuffer();
			});
			
			on(dom.byId('historySearchChoice'), "click", function() {
				that.changeHistoryChoice('search');
			});
			
			on(dom.byId('historyGraphChoice'), "click", function () {
				that.changeHistoryChoice('graph');
			});
		}
	});
	
	ca.apachegui.History.currentHistory=null;
	//used globally to grab instance
	ca.apachegui.History.getInstance = function() {
		if(!ca.apachegui.History.currentHistory) {
			ca.apachegui.History.currentHistory=new ca.apachegui.History();
		}
		
		return ca.apachegui.History.currentHistory;
	};
	
});