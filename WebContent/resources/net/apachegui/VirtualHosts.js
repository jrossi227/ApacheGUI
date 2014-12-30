define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/request",
         "dijit/registry",
         "dojo/on",
         "dojo/data/ItemFileWriteStore",
         "dojox/grid/DataGrid",
         "net/apachegui/TitlePane",
         "dijit/Tree",
         "dijit/tree/ForestStoreModel"
], function(declare, dom, request, registry, on, ItemFileWriteStore, DataGrid, TitlePane, Tree, ForestStoreModel){
    
    declare("net.apachegui.VirtualHosts", null, {
        
        currentHierarchicalHostSummaryCount: 0,
        initialized: false,
        
        init : function() {
            if(this.initialized===false) {
                this.populateTreeVirtualHosts();
                this.populateHierarchicalVirtualHosts();
                this.initialized = true;
            }
        },
        
        populateTreeVirtualHosts: function() {
           
           var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading Tree Hosts...');
           thisdialog.show();
           
           request.get('../web/VirtualHosts', {
               query:     {
                   option: 'getTreeHosts'
               },
               handleAs: 'json',
               preventCache: true,
               sync: false
           }).response.then(
               function(response) {
                   var data = response.data;
                   
                   var hosts = data.hosts;
                   var globalServerName = data.ServerName;
                   
                   var host;
                   for(var i=0; i<hosts.length; i++) {
                       host = hosts[i];
                       
                     //build the tree
                       var storeData = host.tree;
                       var store = new ItemFileWriteStore({data: storeData});
                       
                       var treeModel = new ForestStoreModel({
                           store: store,
                           query: {"type": "VirtualHost"},
                           rootId: 0,
                           childrenAttrs: ["children"]
                       });

                       var myTree = new Tree({
                           model: treeModel,
                           showRoot: false,
                           autoExpand: true
                       });
                       
                       var serverName = (host.ServerName == '' ? (globalServerName == '' ? 'unknown' : globalServerName)  : host.ServerName);
                       
                       var networkInfoValue = '';
                       var networkInfo = host.NetworkInfo;
                       for(var j=0; j<networkInfo.length; j++) {
                           networkInfoValue += networkInfo[j].value;
                       }
                       
                       var div = document.createElement('div');
                       div.innerHTML = '<h4>' + serverName + ' ' + networkInfoValue + '</h4>';
                       div.appendChild(myTree.domNode);
                       
                       dom.byId('tree_virtual_host_container').appendChild(div);
                       
                       myTree.startup();
                   }
                                       
                   thisdialog.remove();
               },
               function(error) {
                   thisdialog.remove();
                   net.apachegui.Util.alert('Info',error.response.data.message);
               }
           );
        },
        
        populateHierarchicalVirtualHosts : function() {
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
                    id: 'grid-' + that.currentHierarchicalHostSummaryCount,
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
                
                that.currentHierarchicalHostSummaryCount ++;
                
            };
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading Hierarchical Hosts...');
            thisdialog.show();
            
            request.get('../web/VirtualHosts', {
                query:     {
                    option: 'getHierarchicalHosts'
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
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
            
        }
    
    });
    
    net.apachegui.VirtualHosts.currentVirtualHosts=null;
    //used globally to grab instance
    net.apachegui.VirtualHosts.getInstance = function() {
        if(!net.apachegui.VirtualHosts.currentVirtualHosts) {
            net.apachegui.VirtualHosts.currentVirtualHosts=new net.apachegui.VirtualHosts();
        }
        
        return net.apachegui.VirtualHosts.currentVirtualHosts;
    };
    
});    