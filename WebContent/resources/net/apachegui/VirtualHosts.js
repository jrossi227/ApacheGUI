define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/request",
         "dijit/registry",
         "dojo/on",
         "dojo/data/ItemFileWriteStore",
         "dojox/grid/DataGrid",
         "net/apachegui/TitlePane",
         "net/apachegui/RefreshableTree",
         "dijit/Tree",
         "dijit/tree/ForestStoreModel",
         "dojo/store/Observable",
         "dijit/Menu",
         "dijit/MenuItem",
         "dijit/PopupMenuItem",
         "dijit/form/Select",
         "dojox/fx/scroll",
         "dojo/query"
], function(declare, dom, request, registry, on, ItemFileWriteStore, DataGrid, TitlePane, RefreshableTree, Tree, ForestStoreModel, Observable, Menu, MenuItem, PopupMenuItem, Select, scroll, query){
    
    declare("net.apachegui.VirtualHosts", null, {
        
        currentHierarchicalHostSummaryCount: 0,
       
        currentTreeSummaryCount: 0,
        currentTreeId: '',
        currentTreeItem: null,
        trees: [],
        
        initialized: false,
        
        init : function() {
            if(this.initialized===false) {
                this.populateTreeVirtualHosts();
                this.populateHierarchicalVirtualHosts();
                this.addListeners();
                this.initialized = true;
            }
        },
        
        areHostsEqual: function(host1, host2) {
          
            if(host1.ServerName != host2.ServerName) {
                return false;
            }
            
            var networkInfo1 = host1.NetworkInfo;
            var networkInfo2 = host2.NetworkInfo;
            
            if(networkInfo1.length != networkInfo2.length) {
                return false;
            }
            
            var foundNetworkInfo = true;
            
            for(var i=0; i<networkInfo1.length && foundNetworkInfo; i++) {
                
                foundNetworkInfo = false;
                for(var j=0; j<networkInfo2.length; j++) {
                    if(networkInfo1[i].port == networkInfo2[j].port &&
                       networkInfo1[i].address == networkInfo2[j].address) {
                        foundNetworkInfo = true;
                        break;
                    }
                }
            }
            
            return foundNetworkInfo;
        },
        
        //------------------TREE VIRTUAL HOSTS-------------------------//
        showOutOfDateError: function() {
            net.apachegui.Util.alert('Error','It appears that the VirtualHost has been updated outside of the editor. Please reload the page to grab the latest Virtual Host Settings.');
        },
        
        getItem: function(id,items) {
                      
            var item = null;
            
            for(var i=0; i<items.length; i++) {
                
                if(items[i].id == id) {
                    item = items[i];
                } else if(!!items[i].children) {
                    item = this.getItem(id, items[i].children);
                }
                
                if(!!item) {
                    break;
                }
            }
            
            return item;
        },
        
        getSelectedItem: function() {
            var itemId = this.currentTreeItem.id;
            var items = registry.byId(this.currentTreeId).get('host').tree.items;
            
            var item = this.getItem(itemId, items);
            
            if(this.currentTreeItem.type != item.type && this.currentTreeItem.value != item.value) {
                this.showOutOfDateError();
                
                return null;
            } 
            
            return item;
        }, 
        
        deleteLine: function() {
            var that = this;
            
            var item = this.getSelectedItem();
            if(!!item) {
                net.apachegui.Util.confirmDialog(
                    "Please Confirm", 
                    "Are you sure you want to delete the following " + item.lineType + ":<br/><br/>" + item.name,
                    function confirm(conf) {
                        if(conf) {
                            var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Deleting Please Wait...');
                            thisdialog.show();
                            
                            var tree = registry.byId(that.currentTreeId);
                            request.post("../web/VirtualHosts", {
                                data:     {
                                    option: 'deleteLine',
                                    file: tree.get('host').file,
                                    lineOfStart: item.lineType == 'enclosure' ? item.enclosureLineOfStart : item.lineOfStart,
                                    lineOfEnd: item.lineType == 'enclosure' ? item.enclosureLineOfEnd : item.lineOfEnd        
                                },
                                handleAs: 'json',
                                sync: false
                            }).response.then(
                                function(response) {
                                    that.reloadTreeHost(tree);
                                    thisdialog.remove();
                                }, function(error) {
                                    thisdialog.remove();
                                    net.apachegui.Util.alert('Error',error.response.data.message);
                                }
                            );
                        }
                    }
                );
            }
        },
        
        editLine: function() {
            var item = this.getSelectedItem();
            if(!!item) {
                
                dom.byId('editType').value = item.type;
                dom.byId('editValue').value = item.value;
                dom.byId('editLineType').value = item.lineType;
                dom.byId('editLineOfStart').value = item.lineType == 'enclosure' ? item.enclosureLineOfStart : item.lineOfStart;
                dom.byId('editLineOfEnd').value = item.lineType == 'enclosure' ? item.enclosureLineOfEnd : item.lineOfEnd;    
                
                var dialog = registry.byId('editDialog');
                dialog.set('title', item.lineType == 'enclosure' ? 'Edit Enclosure' : 'Edit Directive');
                dialog.show();
            }
        },
        
        submitEditLine: function() {
            //cover special case when editing virtual host network info
            var tree = registry.byId(that.currentTreeId);
            tree.get('host').file;
        },
        
        add: function() {
            var item = this.getSelectedItem();
            if(!!item) {
                
            }
        },
        
        reloadAllTreeHosts : function(hosts) {

            // compare network info and ServerName

            // reload the host property, this has up to date lineOfStart and
            // lineOfEnd
            var host;
            var treeHost;
            for (var i = 0; i < hosts.length; i++) {
                host = hosts[i];

                for (var j = 0; j < this.trees.length; j++) {

                    treeHost = this.trees[j].get('host');
                    if (this.areHostsEqual(treeHost, host)) {
                        this.trees[j].set('host', host);
                    }

                }
            }

        },
        
        reloadTreeHost: function(tree) {
            // request all virtual hosts
            var that = this;
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading Tree Host...');
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
                    
                    var host;
                    for(var i=0; i<hosts.length; i++) {                       
                        host = hosts[i];
                                                
                        // compare network info and ServerName to matching tree 
                        
                        //if we find a matching host
                        if(that.areHostsEqual(tree.get('host'),host)) {
                            tree.model.store= new ItemFileWriteStore({data: host.tree});
                        
                            tree.reload();
                            that.reloadAllTreeHosts(hosts);
                            
                            break;
                        }
                    }
                                        
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
            
        },
        
        populateTreeVirtualHosts: function() {
           var that = this;
            
           var buildTreeHost = function(host,serverName) {
               //build the tree
               var id = "tree-" + that.currentTreeSummaryCount;
                              
               var store = new ItemFileWriteStore({
                   data: host.tree
               });
               store = new Observable(store);
               
               var modelId = 'model-' + id;
               
               var treeModel = new ForestStoreModel({
                   store: store,
                   query: {"type": "VirtualHost"},
                   rootId: 0,
                   childrenAttrs: ["children"],
                   id: modelId
               });

               var HostTreeNode = declare(Tree._TreeNode, {
                   _setLabelAttr: {node: "labelNode", type: "innerHTML"}
               });
               
               var treeId = 'tree-' + id;
               
               var hostTree = new RefreshableTree({
                   model: treeModel,
                   showRoot: false,
                   autoExpand: true,
                   openOnClick: true,
                   id: treeId,
                   persist: true,
                   _createTreeNode: function(args){
                       return new HostTreeNode(args);
                   }
               });
               hostTree.set({
                   host: host
               });
               
               var networkInfoValue = '';
               var networkInfo = host.NetworkInfo;
               for(var j=0; j<networkInfo.length; j++) {
                   networkInfoValue += networkInfo[j].value;
               }
               
               var div = document.createElement('div');
               div.id = id;
               div.innerHTML = '<h4>' + serverName + ' ' + networkInfoValue + '</h4>';
               div.appendChild(hostTree.domNode);
               
               dom.byId('tree_virtual_host_container').appendChild(div);
               
               hostTree.startup();
               
               var menu = new Menu({
                   targetNodeIds: [id],
                   selector: ".dijitTreeNode"
               });
               
               menu.addChild(new MenuItem({
                   label: "Edit",
                   onClick: that.editLine.bind(that)
               }));
               
               menu.addChild(new MenuItem({
                   label: "Delete",
                   onClick: that.deleteLine.bind(that)
               }));
               
               var subMenu = new Menu();
               subMenu.addChild(new MenuItem({
                   label: "New Enclosure"
               }));
               subMenu.addChild(new MenuItem({
                   label: "New Directive"
               }));
               menu.addChild(new PopupMenuItem({
                   label: "Add",
                   popup: subMenu
               }));
               
               on(menu, "focus", function(e) {
                   var tn = registry.getEnclosingWidget(this.currentTarget);
                   that.currentTreeItem = tn.item;
                   that.currentTreeId = treeId;
               });
                              
               // when we right-click anywhere on the tree, make sure we open the menu
               //menu.bindDomNode(hostTree.domNode);
               
               that.trees.push(hostTree);
               
               that.currentTreeSummaryCount++;
           };
           
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
                   
                   var options = [];
                   options.push({
                       label: 'Select',
                       value: ''
                   });
                   
                   var serverName;
                   var networkInfoValue;
                   var networkInfo;
                   for(var i=0; i<hosts.length; i++) {                       
                       
                       serverName = (hosts[i].ServerName == '' ? (globalServerName == '' ? 'unknown' : globalServerName)  : hosts[i].ServerName);
                       
                       networkInfoValue = '';
                       networkInfo = hosts[i].NetworkInfo;
                       for(var j=0; j<networkInfo.length; j++) {
                           networkInfoValue += networkInfo[j].value;
                       }
                       
                       options.push({
                           label: serverName + ' ' + networkInfoValue,
                           value: that.currentTreeSummaryCount.toString()
                       });
                       
                       buildTreeHost(hosts[i],serverName);
                   }
                    
                   var select = new Select({
                       name: "host_select",
                       id: "host_select",
                       options: options
                   },'select_host_box');
                   select.startup();
                                 
                   on(select,"change", function(){
                       var value = this.get("value");
                       
                       if(value != '') {
                           dojox.fx.smoothScroll({
                               node: query('#tree-' + value)[0],
                               win: dom.byId('tree_virtual_host_content_pane')
                           }).play();
                       }
                   });
                   
                   thisdialog.remove();
               },
               function(error) {
                   thisdialog.remove();
                   net.apachegui.Util.alert('Info',error.response.data.message);
               }
           );
        },
        
        //------------------END OF TREE VIRTUAL HOSTS-------------------------//
        
        //------------------HIERARCHICAL VIRTUAL HOSTS-------------------------//
        
        populateHierarchicalVirtualHosts : function() {
            var that = this;
            
            var buildHierarchicalHost = function(name, vhost, containerId, globalServerName, globalDocumentRoot) {
                
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
                                    
                                    buildHierarchicalHost(host, hostArray[i], "name_virtual_host_container", globalServerName, globalDocumentRoot);
                                    
                                    div = document.createElement('div');
                                    div.innerHTML = '<h5>Other Virtual Hosts</h5>';
                                    dom.byId('name_virtual_host_container').appendChild(div);
                                } else {
                                
                                    buildHierarchicalHost(host, hostArray[i], "name_virtual_host_container", globalServerName, globalDocumentRoot);
                                }
                            }
                                                        
                        } else {
                            dom.byId('other_virtual_host_container_none').style.display = 'none';
                            
                            var div = document.createElement('div');
                            div.innerHTML = '<h4>' + host + '</h4>';
                            dom.byId('other_virtual_host_container').appendChild(div);
                            
                            buildHierarchicalHost(host, hostArray[0], "other_virtual_host_container", globalServerName, globalDocumentRoot);                            
                        }
                        
                    }
                                        
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
            
        },
        
        //------------------END OF HIERARCHICAL VIRTUAL HOSTS-------------------------//
    
        addListeners: function() {
            var that = this;
            
            on(registry.byId('editSubmit'),'click', function() {
                that.submitEditLine();
            });
            
            on(registry.byId('editCancel'),'click', function() {
                registry.byId('editDialog').hide();
            });
            
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