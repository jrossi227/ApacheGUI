define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/array", 
         "dojo/data/ItemFileWriteStore", 
         "dijit/form/Button",
         "dojo/_base/json"
], function(declare, dom, registry, on, request, array, ItemFileWriteStore, Button, json){	
	
	declare("ca.apachegui.Control", null, {
		
		currentControlMenuId:null,
		refreshTimerHandler:null,
		currentExtendedStatus:false,
		initialized:false,
		startButton:null,
		stopButton:null,
		restartButton:null,
		serverState:null,
		processesStore: null,
		extendedProcessesStore: null,
		extendedError: false,
		
		init: function() {
			if(this.initialized===false) {
				var that=this;
				
				//check if tasklist and taskkill are installed if not display error alert
				this.checkProcessCommand();
			
				//disable extended status if its disabled in the configuration
				if(this.checkExtendedStatusRestart() && this.isExtendedStatusEnabled()) {
					this.updateExtendedStatus(false);
				}
				
				this.addListeners();
				
				this.updateProcessInfoButton();
				
				this.isServerRunning(
					function() {
						that.displayServerStarted();
						that.setRefreshTimer();
					},function() {
						that.displayServerStopped();
						that.setRefreshTimer();
				}); 
							
				this.initialized=true;
			}
		},
		
		setCurrentMenuId: function(id){
			this.currentControlMenuId=id.toString();
		},
		
		getCurrentMenuId: function() {
			return this.currentControlMenuId;
		},
		
		isServerRunning: function (running, notRunning){
			request.get("../web/Control", {
				query: 	{
					option: 'isServerRunning'
				},
				handleAs: 'json',
				sync: false,
				preventCache: true
			}).response.then(
				function(response) {				
					var result=response.data.result;
					
					if(result==true) {
						if(!!running) {
							running();
						}
					} else {
						if(!!notRunning) {
							notRunning();
						}
					}
					
				},
				function(error) {
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		checkProcessCommand: function() {
			//check tasklist and taskkill here
			request.get("../web/Control", {
				query: 	{
					option: 'checkProcessCommand'
				},
				handleAs: 'json',
				preventCache: true,
				sync: true
			}).response.then(
				function(response) {
				
				},
				function(error) {
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		setRefreshTimer: function() {
			ca.apachegui.Interval.clearInterval ( this.refreshTimerHandler );
			
			//convert to milliseconds
			var refreshRate=(dom.byId('processInfoRefreshRate').value * 1000);
			if(refreshRate>0) {
				this.refreshTimerHandler = ca.apachegui.Interval.setInterval(this.refreshProcessInfo.bind(this), refreshRate);	
			}
		},
		
		refreshProcessInfo: function() {		
			var that=this;
			
			this.isServerRunning(
				function() {
					that.displayServerStarted();
					
					that.refreshStandardProcessInfo();
						
					if(that.isExtendedStatusEnabled()) {
						that.refreshExtendedServerInfo();
						that.refreshExtendedProcessInfo();
					}	
				}, function() {
					that.displayServerStopped();
				});		
		}, 
		
		refreshStandardProcessInfo: function () {
			var that=this;
			
			request.get("../web/Control", {
				query: 	{
					option: 'runningProcesses'
				},
				handleAs: 'json',
				preventCache: true,
				sync: false
			}).response.then(
				function(response) {
				
					var data = response.data;

					that.processesStore.fetch({query : {pid : '*'},
			             onItem : function (item ) {
			            	 if(item!=null) {
			            		 that.processesStore.deleteItem(item);
			            		 that.processesStore.save();
			            	 }
			              }
						
			        });
					
				   for(var k in data.items)
				   {   
					   var itemit=data.items[k];
					   that.processesStore.newItem({id: itemit.id, uid : itemit.uid, pid : itemit.pid, ppid : itemit.ppid, cpuTime : itemit.cpuTime, command : itemit.command});
				   }
					
					
				}, function(error) {
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
		
		refreshExtendedServerInfo: function() { 
			
			request.get("../web/Control", {
				query: 	{
					option: 'extendedServerInfo'
				},
				handleAs: 'json',
				preventCache: true,
				sync: false
			}).response.then(
				function(response) {
					var data = response.data;
	
					dom.byId('totalRequests').innerHTML=data.totalRequests;
					dom.byId('totalKB').innerHTML=data.totalKB;
					if(!ca.apachegui.Main.getInstance().isWindows()) {
						dom.byId('cpuUsage').innerHTML=data.cpuUsage;
					}
					dom.byId('upTime').innerHTML=data.upTime;
					dom.byId('requestsPerSecond').innerHTML=data.requestsPerSecond;
					dom.byId('bytesPerSecond').innerHTML=data.bytesPerSecond;
					dom.byId('bytesPerRequest').innerHTML=data.bytesPerRequest;
					dom.byId('busyWorkers').innerHTML=data.busyWorkers;
					dom.byId('idleWorkers').innerHTML=data.idleWorkers;
					
					
				}, function(error) {
					if(!that.extendedError) {
						that.extendedError = true;
						ca.apachegui.Util.alert('Info',error.response.data.message);
					}
				}
			);
		},
	
		refreshExtendedProcessInfo: function() {
			var that=this;
	
			request.get("../web/Control", {
				query: 	{
					option: 'extendedRunningProcesses'
				},
				handleAs: 'json',
				preventCache: true,
				sync: false
			}).response.then(
				function(response) {
				
					var data = response.data;

					that.extendedProcessesStore.fetch({query : {id : '*'},
			             onItem : function (item ) {

			            	 if(item!=null) {
			            		 that.extendedProcessesStore.deleteItem(item);
			            		 that.extendedProcessesStore.save();
			            	 }
			              }
						
			        });
					
				   for(var k in data.items)
				   {   
					   var itemit=data.items[k];
					   that.extendedProcessesStore.newItem({id: itemit.id, extendedPid: itemit.extendedPid, extendedRequests: itemit.extendedRequests, extendedCpu: itemit.extendedCpu, extendedTimeSinceLastRequest: itemit.extendedTimeSinceLastRequest, extendedTimeToProcessLastRequest: itemit.extendedTimeToProcessLastRequest, extendedMegaBytesThisConnection: itemit.extendedMegaBytesThisConnection, extendedClient: itemit.extendedClient, extendedVirtualHost: itemit.extendedVirtualHost,extendedRequest: itemit.extendedRequest });
				   }					
					
				}, function(error) {
					if(!that.extendedError) {
						that.extendedError = true;
						ca.apachegui.Util.alert('Info',error.response.data.message);
					}
				}
			);
		},
	
		updateProcessInfo: function() {
			var that=this;
			
			request.post("../web/Control", {
				data: 	{
					option: 'updateProcessInfo',
					processInfoRefreshRate: dom.byId('processInfoRefreshRate').value,
					off: dom.byId('processInfoRefreshRatecb').checked
				},
				handleAs: 'json',
				sync: true
			}).response.then(
				function(response) {
				
					var data = response.data;

					var timer = data.result;
					if(timer == 0) {
						dom.byId('processInfoRefreshRateDisplay').innerHTML='(Refresh Off)';
						dom.byId('processInfoRefreshRatecb').checked=true;
						registry.byId('processInfoRefreshRate').set('disabled', true);
					}
					else
					{
						dom.byId('processInfoRefreshRateDisplay').innerHTML='(Refresh ' + timer + ' Seconds)';
						dom.byId('processInfoRefreshRatecb').checked=false;
						registry.byId('processInfoRefreshRate').set('disabled', false);
					}	
					
					registry.byId('processInfoRefreshRate').set('value', timer);
					that.setRefreshTimer();
					
				}, function(error) {
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
		},
	
		updateExtendedStatus: function(forcedStatus) {
			var that=this;
			
			var status='';
			
			if(!!forcedStatus) {
				status=forcedStatus;
			}
			else {
				status=dom.byId('extendedStatusToggle').checked;
			}	
				
			request.post("../web/Control", {
				data: 	{
					option: 'updateExtendedStatus',
					extendedStatus: status
				},
				handleAs: 'json',
				sync: true
			}).response.then(
				function(response) {
				
					var data = response.data;
	
					if(data.result=='on') 
					{
						dom.byId('extendedStatusToggle').checked=true;
						if(data.change==true && that.serverState=='started') {
							that.buildExtendedServerInfo();
							that.buildExtendedProcessGrid();
						}
					}
					else
					{
						dom.byId('extendedStatusToggle').checked=false;
						if(data.change==true && that.serverState=='started') {
							that.destroyExtendedServerInfo();
							that.destroyExtendedProcessGrid();
						}
					}
					
				}, function(error) {
					ca.apachegui.Util.alert('Info',error.response.data.message);
				}
			);
			
		},
		
		updateProcessInfoButton: function() {
			if(this.isExtendedStatusEnabled()) {
				dom.byId('extendedStatusToggle').checked=true;
			} 
			else
			{
				dom.byId('extendedStatusToggle').checked=false;
			}	
			
			var refreshRate=this.getRefreshRate();
			if(refreshRate==0) 
			{
				dom.byId('processInfoRefreshRateDisplay').innerHTML='(Refresh Off)';
				registry.byId('processInfoRefreshRate').set('disabled', true);
				dom.byId('processInfoRefreshRatecb').checked=true;
			} 
			else 
			{
				dom.byId('processInfoRefreshRateDisplay').innerHTML='(Refresh ' + refreshRate + ' Seconds)';
				registry.byId('processInfoRefreshRate').set('disabled', false);
				dom.byId('processInfoRefreshRatecb').checked=false;
			}
			registry.byId('processInfoRefreshRate').set('value', refreshRate);
		},
	
		extendedStatusModuleCheck: function () {
			var that=this;
			
			if(dom.byId('extendedStatusToggle').checked==true && this.isExtendedStatusEnabled()==false)
			{	
				request.get("../web/Control", {
					query: 	{
						option: 'checkExtendedStatusModule'
					},
					handleAs: 'json',
					sync: true,
					preventCache: true
				}).response.then(
					function(response) {
					
						var data = response.data;			
						
						if(data.result==false) {
							dom.byId('extendedStatusToggle').checked=false;
							ca.apachegui.Util.alert("status_module not available", "Turning on extended status requires that the status_module is loaded into apache.<BR/> This module is not currently loaded and is not in the available modules folder.");
						}
						else {
							that.extendedStatusRestartWarning();
						}
						
					}, function(error) {
						ca.apachegui.Util.alert('Error',error.response.data.message);
						dom.byId('extendedStatusToggle').checked=false;
					}
				);
			}
		},
	
		extendedStatusRestartWarning: function ()  {
			if(this.serverState=='stopped') {
				return;
			}
			
			if(dom.byId('extendedStatusToggle').checked==true && this.isExtendedStatusEnabled()==false)
			{	
				
				if(this.checkExtendedStatusRestart()==true) 
				{
					ca.apachegui.Util.alert("Turn On Extended Status", "Turning on extended status requires a server restart.<BR/> The server will restart after you submit this change!");
				}
			}
		},
		
		checkExtendedStatusRestart: function ()  {
			
			var restart=false;
			
			request.get("../web/Control", {
				query: 	{
					option: 'checkExtendedStatusRestart'
				},
				handleAs: 'json',
				sync: true,
				preventCache: true
			}).response.then(
				function(response) {
					var data = response.data;
					restart=data.result; 
					
				}, function(error) {
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
			return restart;
	
		},
	
		initProcessMenu: function() {
			var that=this;
			ca.apachegui.Util.confirmDialog("Kill Process", "Do you want to kill process " + this.currentControlMenuId + "?", function confirm(conf) {
					if(conf)
					{
						that.killProcess(that.currentControlMenuId);
					}
				});
		},
	
		killProcess: function(pid) {
			var that=this;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Killing', 'Killing Process Please Wait...');
			thisdialog.show();
			
			request.post("../web/Control", {
				data: 	{
					option: 'killProcess',
					pid: pid
				},
				handleAs: 'json',
				sync: false
			}).response.then(
				function(response) {
					that.refreshProcessInfo();
					thisdialog.remove();
				}, function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
				
		},
	
		isExtendedStatusEnabled: function() {
			var enabled=false;
			
			request.get("../web/Control", {
				query: 	{
					option: 'isExtendedStatusEnabled'
				},
				handleAs: 'json',
				sync: true,
				preventCache: true
			}).response.then(
				function(response) {
				
					var data = response.data;
					enabled=data.result;
					
				}, function(error) {
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
			
			return enabled;
		},
		
		getRefreshRate: function() {
			var refreshRate=0;
			
			request.get("../web/Control", {
				query: 	{
					option: 'getRefreshRate'
				},
				handleAs: 'json',
				sync: true,
				preventCache: true
			}).response.then(
				function(response) {
				
					var data = response.data;
					refreshRate=data.result;
					
				}, function(error) {
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
			
			return refreshRate;
		},
		
		startServer: function() {
			var that=this;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Starting', 'Starting Please Wait...');
			thisdialog.show();
			
			request.post("../web/Control", {
				data: 	{
					option: 'startServer'
				},
				handleAs: 'json',
				sync: false
			}).response.then(
				function(response) {
				
					registry.byId('startApacheForm').hide();
					that.displayServerStarted();
					
					thisdialog.remove();
					
				}, function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
		},
		
		restartServer: function() {
			var that=this;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Restarting', 'Restarting Please Wait...');
			thisdialog.show();
			
			request.post("../web/Control", {
				data: 	{
					option: 'restartServer'
				},
				handleAs: 'json',
				sync: false
			}).response.then(
				function(response) {
				
					registry.byId('restartApacheForm').hide();
					that.refreshProcessInfo();
					
					thisdialog.remove();
					
				}, function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
		},
	
		stopServer: function() {
			var that=this;
			
			var thisdialog = ca.apachegui.Util.noCloseDialog('Stopping', 'Stopping Please Wait...');
			thisdialog.show();
			
			request.post("../web/Control", {
				data: 	{
					option: 'stopServer'
				},
				handleAs: 'json',
				sync: false
			}).response.then(
				function(response) {
				
					registry.byId('stopApacheForm').hide();
					that.displayServerStopped();
					
					thisdialog.remove();
					
				}, function(error) {
					thisdialog.remove();
					ca.apachegui.Util.alert('Error',error.response.data.message);
				}
			);
		},
		
		displayServerStarted: function() {
			if(this.serverState==null || this.serverState=='stopped') {
			
				var display='<table>' +
								'<tr>' +
									'<td colspan="2">' +
										'<span class="running">RUNNING</span>' +
										'</td>' +
								'</tr>' +
								'<tr>' +
									'<td>' +
										'<img alt="Apache Logo" src="../resources/images/green.png"/>'	+
									'</td>' +
									'<td id="restartStopButtonCol" valign="middle">' +
									'</td>' +
								'</tr>' +
							'</table>';
				
				dom.byId('runningStatusDiv').innerHTML=display;
			
				dom.byId('restartStopButtonCol').appendChild(this.restartButton.domNode);
				dom.byId('restartStopButtonCol').appendChild(this.stopButton.domNode);
				
				this.buildProcessGrid();
				
				if(this.isExtendedStatusEnabled()) {
					//show extended status stuff
					this.buildExtendedServerInfo();
					this.buildExtendedProcessGrid();
				}
				
				this.serverState='started';
			}
		},
	
		displayServerStopped: function() {
			if(this.serverState==null || this.serverState=='started') {
				var display='<table>' +
								'<tr>' +
									'<td colspan="2">' +
										'<span class="stopped">STOPPED</span>' +
									'</td>' +
								'</tr>' +
								'<tr>' +
									'<td>' +
										'<img alt="Apache Logo" src="../resources/images/red.png"/>' +
									'</td>' +
									'<td id="startButtonCol" valign="middle">' +
									'</td>' +
								'</tr>' +
							'</table>';
				
				//stop refresh here
				
				dom.byId('runningStatusDiv').innerHTML=display;
				dom.byId('startButtonCol').appendChild(this.startButton.domNode);
				
				this.destroyProcessGrid();
				
				if(this.isExtendedStatusEnabled()) {
					//remove extended status stuff
					this.destroyExtendedServerInfo();
					this.destroyExtendedProcessGrid();
				}
				
				this.serverState='stopped';
			}
		},
		
		buildProcessGrid: function() {
			var that=this;
			
			this.processesStore = new ItemFileWriteStore({url: '../web/Control?option=runningProcesses', urlPreventCache: true, clearOnClose: true});
			
			var gridStructure =[[
		                          { 
		                        	  field: "uid",
		                              name: "UID",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "pid",
		                              name: "Process ID",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "ppid",
		                              name: "Process Parent ID",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "cpuTime",
		                              name: "CPU Time",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "command",
		                              name: "Command",
		                              width: "auto"
		                          }
		                    ]
		              ];
	
			
			var processesGrid = new dojox.grid.DataGrid({
	            id: "processesGrid",
	            store: this.processesStore,
	            structure: gridStructure,
	            selectable: true,
	            style: 'width:100%;',
	            autoHeight:true,
	            rowSelector: "20px"
	        });
			
			dom.byId("processInfoContainer").innerHTML='<div class="dijitDialogPaneContentArea"><h3>Current Process Information</h3></div>';
			
			dom.byId("processInfoContainer").appendChild(processesGrid.domNode);
			
			processesGrid.startup();
			
			processesGrid.onRowContextMenu= function(e) {	
				var item = processesGrid.getItem(e.rowIndex);
				array.forEach(processesGrid.store.getAttributes(item), function(attribute) {
						
					var id = processesGrid.store.getValues(item, attribute);
						
					if(attribute=='pid') {	  
						that.setCurrentMenuId(id); 
					}
				});
			};
			
			
			//bind right click menu to process grid
			var processMenu = registry.byId("processes_menu");
			// when we right-click anywhere on the grid, make sure we open the menu
			processMenu.bindDomNode(processesGrid.domNode);
		},
		
		destroyProcessGrid: function() {
			if(this.serverState==null){
				return;
			}
			
			registry.byId('processesGrid').destroyRecursive();
			
			dom.byId("processInfoContainer").innerHTML='';
		},
		
		buildExtendedServerInfo: function() {
			dom.byId("extendedServerInfoContainer").style.display='block';
			
			this.refreshExtendedServerInfo();
		},
		
		destroyExtendedServerInfo: function() {
			if(this.serverState==null){
				return;
			}
			
			dom.byId("extendedServerInfoContainer").style.display='none';
		},
		
		buildExtendedProcessGrid: function() {
			this.extendedProcessesStore = new ItemFileWriteStore({url: '../web/Control?option=extendedRunningProcesses', urlPreventCache: true, clearOnClose: true});
			
			var gridStructure;
			
			if(ca.apachegui.Main.getInstance().isWindows()) {
				gridStructure =[[
		                          { 
		                        	  field: "extendedPid",
		                              name: "PID",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedRequests",
		                              name: "REQ",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedTimeSinceLastRequest",
		                              name: "Last REQ Time",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedTimeToProcessLastRequest",
		                              name: "Last REQ Dur",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedMegaBytesThisConnection",
		                              name: "MEG",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedClient",
		                              name: "Client",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedVirtualHost",
		                              name: "Virtual Host",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedRequest",
		                              name: "Request",
		                              width: "auto"
		                          }
		                    ]
		              ];
			} else {
			
				gridStructure =[[
		                          { 
		                        	  field: "extendedPid",
		                              name: "PID",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedRequests",
		                              name: "REQ",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedCpu",
		                              name: "CPU",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedTimeSinceLastRequest",
		                              name: "Last REQ Time",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedTimeToProcessLastRequest",
		                              name: "Last REQ Dur",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedMegaBytesThisConnection",
		                              name: "MEG",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedClient",
		                              name: "Client",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedVirtualHost",
		                              name: "Virtual Host",
		                              width: "auto"
		                          },
		                          { 
		                        	  field: "extendedRequest",
		                              name: "Request",
		                              width: "auto"
		                          }
		                    ]
		              ];
		    }          
			
			var extendedProcessesGrid = new dojox.grid.DataGrid({
	            id: "extendedProcessesGrid",
	            store: this.extendedProcessesStore,
	            structure: gridStructure,
	            selectable: true,
	            style: 'width:100%;',
	            autoHeight:true,
	            rowSelector: "20px"
	        });
			
			dom.byId("extendedProcessInfoContainer").appendChild(extendedProcessesGrid.domNode);
			
			extendedProcessesGrid.startup();
			
			dom.byId('extendedProcessInfoTable').style.display='block';
		},
		
		destroyExtendedProcessGrid: function() {
			if(this.serverState==null){
				return;
			}
			
			registry.byId('extendedProcessesGrid').destroyRecursive();
			
			dom.byId('extendedProcessInfoTable').style.display='none';
		},
		
		addListeners : function() {
			var that = this;	
			
			on(registry.byId('killProcessMenuItem'), "click", function() {
				that.initProcessMenu();
			});
				
			on(registry.byId('cancelStartApacheButton'), "click", function() {
				registry.byId('startApacheForm').hide();
			});
				
			on(registry.byId('startApacheButton'), "click", function() {
				that.startServer();
			});
				
			on(registry.byId('cancelRestartApacheButton'), "click", function() {
				registry.byId('restartApacheForm').hide();
			});
				
			on(registry.byId('restartApacheButton'), "click", function() {
				that.restartServer();
			});
				
			on(registry.byId('cancelStopApacheButton'), "click", function() {
				registry.byId('stopApacheForm').hide();
			});
				
			on(registry.byId('stopApacheButton'), "click", function() {
				that.stopServer();
			});
				
			on(registry.byId('processSettingsShow'), "click", function() {
				registry.byId('processSettingsForm').show();
			});
				
			on(dom.byId('extendedStatusToggle'), "change", function() {
				that.extendedStatusModuleCheck();
			});
				
			on(dom.byId('processInfoRefreshRatecb'), "change", function() {
				if(dom.byId('processInfoRefreshRatecb').checked==true) {
					registry.byId('processInfoRefreshRate').set('disabled', true);
				}
				else {
					registry.byId('processInfoRefreshRate').set('disabled', false);
				}
			});
			
			on(registry.byId('hideProcessSettings'), "click", function() {
				that.updateProcessInfoButton();
				registry.byId('processSettingsForm').hide();
			});
				
			on(registry.byId('submitProcessSettings'), "click", function() {
				that.updateProcessInfo();
				that.updateExtendedStatus();
				registry.byId('processSettingsForm').hide();
			});
			
			//initialize button widgets
			this.startButton = new Button({
	            label: "Start",
	            onClick: function() {
	            	registry.byId('startApacheForm').show();
	            }
	        });
			
			this.stopButton = new Button({
	            label: "Stop",
	            onClick: function() {
	            	registry.byId('stopApacheForm').show();
	            }
	        });
			
			this.restartButton = new Button({
	            label: "Restart",
	            onClick: function() {
	            	registry.byId('restartApacheForm').show();
	            }
	        });
		}
	});
	
	ca.apachegui.Control.currentControl=null;
	//used globally to grab instance
	ca.apachegui.Control.getInstance = function() {
		if(!ca.apachegui.Control.currentControl) {
			ca.apachegui.Control.currentControl=new ca.apachegui.Control();
		}
		return ca.apachegui.Control.currentControl;
	};
	
});	