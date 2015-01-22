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
         "dojo/query",
         "dojo/_base/array"
], function(declare, dom, request, registry, on, ItemFileWriteStore, DataGrid, TitlePane, RefreshableTree, Tree, ForestStoreModel, Observable, Menu, MenuItem, PopupMenuItem, Select, scroll, query, array) {

    declare("net.apachegui.VirtualHosts", null, {

        currentHierarchicalHostSummaryCount : 0,

        currentTreeSummaryCount : 0,
        currentTreeIndex : 0,
        currentTreeItem : null,
        trees : [],
        treeHostSelect : null,
        treeGlobalServerName : '',

        lastModifiedTimes : [],
        checkModifiedTimes : true,
        isModifiedDialogShown : false,
        disableEditing : false,
        
        initialized : false,

        init : function() {
            if (this.initialized === false) {
                this.populateTreeVirtualHosts();
                this.addListeners();
                this.initialized = true;
            }
        },

        areHostsEqual : function(host1, host2) {

            if (host1.ServerName != host2.ServerName) {
                return false;
            }

            var networkInfo1 = host1.NetworkInfo;
            var networkInfo2 = host2.NetworkInfo;

            if (networkInfo1.length != networkInfo2.length) {
                return false;
            }

            var foundNetworkInfo = true;

            for (var i = 0; i < networkInfo1.length && foundNetworkInfo; i++) {

                foundNetworkInfo = false;
                for (var j = 0; j < networkInfo2.length; j++) {
                    if (networkInfo1[i].port == networkInfo2[j].port && networkInfo1[i].address == networkInfo2[j].address) {
                        foundNetworkInfo = true;
                        break;
                    }
                }
            }

            return foundNetworkInfo;
        },
        
        //-----------------LAST MODIFIED TRACKING----------------------//
        
        getLastModifiedFileList : function() {
            var files = [];
            for(var i=0; i<this.trees.length; i++) {
                if (!!this.trees[i]) {
                    files.push(this.trees[i].get('host').file);
                }
            }
            
            return files;
        },
        
        updateLastModifiedTime : function(file, lastModifiedTime) {
            var that = this;
            
            var updateFileTime = function(lastModifiedTime) {
                for(var i=0; i < that.lastModifiedTimes.length; i++) {
                    if(that.lastModifiedTimes[i].file == file) {
                        that.lastModifiedTimes[i].lastModifiedTime = lastModifiedTime;
                    }
                }
                
                that.checkModifiedTimes = true;
            };
            
            if(!!lastModifiedTime) {
                updateFileTime(lastModifiedTime);
            } else {
                net.apachegui.Main.getInstance().getLastModifiedTime(
                        file,
                        function(response) {
                            var data = response.data;
                            
                            updateFileTime(data.time);
                        }, 
                        function(error) {
                            net.apachegui.Util.alert('Error',error.response.data.message);
                        }
                );
            }
        },
        
        launchLastModifedUpdater : function() {
            var that = this;
            
            var files = this.getLastModifiedFileList();
          
            net.apachegui.Main.getInstance().getLastModifiedTimes(
                    files, 
                    function(response) {
                        that.lastModifiedTimes = response.lastModifiedTimes;
                        that.launchLastModifedUpdaterInterval();
                    }, 
                    function(response) {
                        net.apachegui.Util.alert('Error',JSON.parse(response.response.data).message);
                });
            
        },
        
        launchLastModifedUpdaterInterval: function() {
            var that = this;
            
            net.apachegui.Interval.setInterval(function() {
                
                if(that.checkModifiedTimes) {
                
                    var files = that.getLastModifiedFileList();
                    
                    net.apachegui.Main.getInstance().getLastModifiedTimes(
                            files, 
                            function(response) {
                                that.isModifiedDialogShown = false;
                                
                                for(var i=0; i<that.lastModifiedTimes.length; i++) {
                                    for(var j=0; j<response.lastModifiedTimes.length; j++) {
                                        if(that.lastModifiedTimes[i].file == response.lastModifiedTimes[j].file) {
                                            if(that.lastModifiedTimes[i].lastModifiedTime != response.lastModifiedTimes[i].lastModifiedTime) {
                                                if(!that.isModifiedDialogShown) {
                                                    net.apachegui.Util.alert('Error', 'It appears that ' + that.lastModifiedTimes[i].file + ' has been updated outside of the editor.<br/>Please refresh the page to grab the latest Virtual Host Configuration.<br/>You may not edit any virtual hosts until you have refreshed the page.');
                                                    that.isModifiedDialogShown = true;
                                                    that.disableTreeEditing();
                                                }
                                                
                                                that.lastModifiedTimes[i].lastModifiedTime = response.lastModifiedTimes[i].lastModifiedTime;
                                            }
                                        }
                                    }
                                }
                            }, 
                            function(response) {
                                net.apachegui.Util.alert('Error',JSON.parse(response.response.data).message);
                        });
                
                }
                
            }, 5000);
            
        },
        
        //-----------------END OF LAST MODIFIED TRACKING---------------//

        //------------------TREE VIRTUAL HOSTS-------------------------//
        showTreeHostOutOfDateError : function() {
            net.apachegui.Util.alert('Error', 'It appears that the VirtualHost has been updated outside of the editor. Please reload the page to grab the latest Virtual Host Configuration.');
        },
        
        showDisabledError : function() {
            net.apachegui.Util.alert('Error', 'You may not edit any hosts until you refresh the page.');
        },

        getTreeHostServerName : function(host) {
            var serverName = (host.ServerName == '' ? (this.treeGlobalServerName == '' ? 'unknown' : this.treeGlobalServerName) : host.ServerName);
            return serverName;
        },

        getCurrentTreeContainerId : function() {
            return 'tree-' + this.currentTreeIndex;
        },

        getCurrentTreeId : function() {
            return 'tree-' + this.getCurrentTreeContainerId();
        },

        buildTreeHeadingFromHost : function(host) {
            var serverName = this.getTreeHostServerName(host);
            var networkInfoValue = '';
            var networkInfo = host.NetworkInfo;
            for (var j = 0; j < networkInfo.length; j++) {
                networkInfoValue += networkInfo[j].value;
            }

            return '<span class="network">' + serverName + ' ' + networkInfoValue + '</span>&nbsp;&nbsp;&nbsp;<span class="file">File: ' + host.file + ' Line: ' + host.lineOfStart + '</span>';
        },

        getTreeItem : function(id, items) {

            var item = null;

            for (var i = 0; i < items.length; i++) {

                if (items[i].id == id) {
                    item = items[i];
                } else if (!!items[i].children) {
                    item = this.getTreeItem(id, items[i].children);
                }

                if (!!item) {
                    break;
                }
            }

            return item;
        },

        getSelectedTreeItem : function() {
            var itemId = this.currentTreeItem.id;
            var items = registry.byId(this.getCurrentTreeId()).get('host').tree.items;

            var item = this.getTreeItem(itemId, items);

            if (this.currentTreeItem.type != item.type && this.currentTreeItem.value != item.value) {
                this.showTreeHostOutOfDateError();

                return null;
            }

            return item;
        },

        buildTreeHostSelectOption : function(host) {
            var serverName = this.getTreeHostServerName(host);
            var networkInfoValue = '';
            var networkInfo = host.NetworkInfo;
            for (var j = 0; j < networkInfo.length; j++) {
                networkInfoValue += networkInfo[j].value;
            }

            return serverName + ' ' + networkInfoValue;
        },
        
        buildTreeHostSelect : function() {

            var options = [];
            options.push({
                label : 'Select',
                value : ''
            });

            var host;
            for (var i = 0; i < this.trees.length; i++) {

                if (!!this.trees[i]) {
                    host = this.trees[i].get('host');
                    options.push({
                        label : this.buildTreeHostSelectOption(host),
                        value : i.toString()
                    });
                }
            }

            var currentValue;
            if (!!this.treeHostSelect) {
                currentValue = this.treeHostSelect.get('value');
                this.treeHostSelect.destroyRecursive();
            }

            this.treeHostSelect = new Select({
                name : "host_select",
                id : "host_select",
                options : options
            });
            this.treeHostSelect.placeAt(dom.byId('select_host_box'));
            this.treeHostSelect.startup();

            if (!!currentValue) {
                this.treeHostSelect.set('value', currentValue, false);
            }

            on(this.treeHostSelect, "change", function() {
                var value = this.get("value");

                if (value != '') {
                    dojox.fx.smoothScroll({
                        node : query('#tree-' + value)[0],
                        win : dom.byId('tree_virtual_host_content_pane')
                    }).play();
                }
            });
        },

        buildNetworkInfoArrayFromValue : function(value) {

            var NetworkInfo;
            //use the server to build network info from input string
            request.get('../web/VirtualHosts', {
                query : {
                    option : 'getNetworkInfoArrayFromValue',
                    value : value
                },
                handleAs : 'json',
                preventCache : true,
                sync : true
            }).response.then(function(response) {
                var data = response.data;

                NetworkInfo = data.NetworkInfo;
            });

            return NetworkInfo;
        },

        disableTreeEditing : function () {
            this.disableEditing = true;
            
            registry.byId('editValue').set('disabled', true);
            registry.byId('editSubmit').set('disabled', true);
            
            registry.byId('addType').set('disabled', true);
            registry.byId('addValue').set('disabled', true);
            registry.byId('addSubmit').set('disabled', true);
        },
        
        deleteLine : function() {
            var that = this;

            if(this.disableEditing) {
                this.showDisabledError();
                return;
            }
            
            var item = this.getSelectedTreeItem();
            if (!!item) {
                net.apachegui.Util.confirmDialog("Please Confirm", "Are you sure you want to delete the following " + item.lineType + ":<br/><br/>" + item.name, function confirm(conf) {
                    if (conf) {

                        var tree = registry.byId(that.getCurrentTreeId());

                        var type = item.type;
                        var callback;
                        if (type == "VirtualHost") {
                            callback = function() {
                                tree.destroyRecursive();
                                that.trees[that.currentTreeIndex] = null;

                                var container = dom.byId(that.getCurrentTreeContainerId());
                                container.parentNode.removeChild(container);

                                that.buildTreeHostSelect();
                            };
                        }

                        if (type == "ServerName") {
                            callback = function() {
                                tree.get('host').ServerName = '';
                                dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(tree.get('host'));
                                that.buildTreeHostSelect();
                            };
                        }

                        var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Deleting Please Wait...');
                        thisdialog.show();

                        that.checkModifiedTimes = false;
                        var file = tree.get('host').file;
                        request.post("../web/VirtualHosts", {
                            data : {
                                option : 'deleteLine',
                                file : file,
                                lineOfStart : item.lineType == 'enclosure' ? item.enclosureLineOfStart : item.lineOfStart,
                                lineOfEnd : item.lineType == 'enclosure' ? item.enclosureLineOfEnd : item.lineOfEnd
                            },
                            handleAs : 'json',
                            sync : false
                        }).response.then(function(response) {
                            if (!!callback) {
                                callback();
                            }

                            that.reloadTreeHost(that.currentTreeIndex);
                            thisdialog.remove();
                            
                            var data = response.data;
                            that.updateLastModifiedTime(data.file, data.lastModifiedTime);
                        }, function(error) {
                            thisdialog.remove();
                            net.apachegui.Util.alert('Error', error.response.data.message);
                            that.updateLastModifiedTime(file);
                        });
                    }
                });
            }
        },

        showEditLineDialog : function() {
            
            if(this.disableEditing) {
                this.showDisabledError();
                return;
            }
            
            var item = this.getSelectedTreeItem();
            if (!!item) {

                dom.byId('editType').innerHTML = item.type;
                dom.byId('editValue').value = item.value;
                dom.byId('editLineType').value = item.lineType;
                dom.byId('editLineOfStart').value = item.lineOfStart;
                dom.byId('editLineOfEnd').value = item.lineOfEnd;

                var dialog = registry.byId('editDialog');
                dialog.set('title', item.lineType == 'enclosure' ? 'Edit Enclosure' : 'Edit Directive');
                dialog.show();
            }
        },

        submitEditLine : function() {
            var that = this;

            // cover special case when editing servername
            var tree = registry.byId(that.getCurrentTreeId());
            var file = tree.get('host').file;

            var type = dom.byId('editType').innerHTML;
            var value = dom.byId('editValue').value.trim();
            var lineType = dom.byId('editLineType').value;
            var lineOfStart = dom.byId('editLineOfStart').value;
            var lineOfEnd = dom.byId('editLineOfEnd').value;

            // cover special case when editing virtual host network info
            var callback;
            if (type == "VirtualHost") {
                callback = function() {
                    //set local network info to match the server host
                    var NetworkInfo = that.buildNetworkInfoArrayFromValue(value);
                    tree.get('host').NetworkInfo = NetworkInfo;

                    dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(tree.get('host'));
                    that.buildTreeHostSelect();

                };
            }

            if (type == "ServerName") {
                callback = function() {
                    
                    tree.get('host').ServerName = value;
                    dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(tree.get('host'));
                    that.buildTreeHostSelect();
                };
            }

            var thisdialog = net.apachegui.Util.noCloseDialog('Modifying', 'Modifying Please Wait...');
            thisdialog.show();

            that.checkModifiedTimes = false;
            request.post("../web/VirtualHosts", {
                data : {
                    option : 'editLine',
                    type : type,
                    value : value,
                    lineType : lineType,
                    file : file,
                    lineOfStart : lineOfStart,
                    lineOfEnd : lineOfEnd
                },
                handleAs : 'json',
                sync : false
            }).response.then(function(response) {

                if (!!callback) {
                    callback();
                }

                that.reloadTreeHost(that.currentTreeIndex);
                thisdialog.remove();
                registry.byId('editDialog').hide();
                
                var data = response.data;
                that.updateLastModifiedTime(data.file, data.lastModifiedTime);
            }, function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Error', error.response.data.message);
                that.updateLastModifiedTime(file);
            });

        },

        showAddLineDialog : function(type) {
            
            if(this.disableEditing) {
                this.showDisabledError();
                return;
            }
            
            var item = this.getSelectedTreeItem();
            if (!!item) {

                dom.byId('addType').value = '';
                dom.byId('addValue').value = '';
                dom.byId('addBeforeLineType').value = item.lineType;
                dom.byId('addLineType').value = type;
                dom.byId('addLineOfStart').value = (parseInt(item.lineOfEnd) + 1);

                var dialog = registry.byId('addDialog');
                dialog.set('title', type == 'enclosure' ? 'Add Enclosure' : 'Add Directive');
                dialog.show();
                
            }
        },
        
        submitAddLine : function() {
            
            var that = this;

            // cover special case when editing servername
            var tree = registry.byId(that.getCurrentTreeId());
            var file = tree.get('host').file;

            var type = dom.byId('addType').value.trim();
            var value = dom.byId('addValue').value.trim();
            var beforeLineType = dom.byId('addBeforeLineType').value;
            var lineType = dom.byId('addLineType').value;
            var lineOfStart = dom.byId('addLineOfStart').value;
            
            var callback;
            if (type == "ServerName") {
                callback = function() {
                    
                    tree.get('host').ServerName = value;
                    dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(tree.get('host'));
                    that.buildTreeHostSelect();
                };
            }
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Adding', 'Adding Please Wait...');
            thisdialog.show();

            that.checkModifiedTimes = false;
            request.post("../web/VirtualHosts", {
                data : {
                    option : 'addLine',
                    type : type,
                    value : value,
                    lineType : lineType,
                    beforeLineType : beforeLineType,
                    file : file,
                    lineOfStart : lineOfStart
                },
                handleAs : 'json',
                sync : false
            }).response.then(function(response) {

                if (!!callback) {
                    callback();
                }

                that.reloadTreeHost(that.currentTreeIndex);
                thisdialog.remove();
                registry.byId('addDialog').hide();
                
                var data = response.data;
                that.updateLastModifiedTime(data.file, data.lastModifiedTime);
            }, function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Error', error.response.data.message);
                that.updateLastModifiedTime(file);
            });
            
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

                    if (!!this.trees[j]) {
                        treeHost = this.trees[j].get('host');
                        if (this.areHostsEqual(treeHost, host)) {
                            this.trees[j].set('host', host);
                        }
                    }

                }
            }

            //reload hierarchical hosts in the background
            this.populateHierarchicalVirtualHosts();

        },

        reloadTreeHost : function(index) {
            // request all virtual hosts
            var that = this;

            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading Tree Host...');
            thisdialog.show();

            request.get('../web/VirtualHosts', {
                query : {
                    option : 'getTreeHosts'
                },
                handleAs : 'json',
                preventCache : true,
                sync : false
            }).response.then(function(response) {
                var data = response.data;

                var hosts = data.hosts;

                var tree = that.trees[index];
                if (!!tree) {
                    var host;
                    for (var i = 0; i < hosts.length; i++) {
                        host = hosts[i];

                        // compare network info and ServerName to matching tree 

                        //if we find a matching host
                        if (that.areHostsEqual(tree.get('host'), host)) {
                            tree.model.store = new ItemFileWriteStore({
                                data : host.tree
                            });

                            tree.reload();
                            that.reloadAllTreeHosts(hosts);

                            break;
                        }
                    }
                } else {
                    that.reloadAllTreeHosts(hosts);
                }

                thisdialog.remove();
            }, function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Info', error.response.data.message);
            });

        },

        populateTreeVirtualHosts : function() {
            var that = this;

            var buildTreeHost = function(host) {
                //build the tree
                var id = "tree-" + that.currentTreeSummaryCount;

                var store = new ItemFileWriteStore({
                    data : host.tree
                });
                store = new Observable(store);

                var modelId = 'model-' + id;

                var treeModel = new ForestStoreModel({
                    store : store,
                    query : {
                        "type" : "VirtualHost"
                    },
                    rootId : 0,
                    childrenAttrs : [ "children" ],
                    id : modelId
                });

                var HostTreeNode = declare(Tree._TreeNode, {
                    _setLabelAttr : {
                        node : "labelNode",
                        type : "innerHTML"
                    }
                });

                var treeId = 'tree-' + id;

                var hostTree = new RefreshableTree({
                    model : treeModel,
                    showRoot : false,
                    autoExpand : true,
                    openOnClick : true,
                    id : treeId,
                    persist : true,
                    _createTreeNode : function(args) {
                        return new HostTreeNode(args);
                    }
                });
                hostTree.set({
                    host : host
                });

                var div = document.createElement('div');
                div.id = id;
                div.innerHTML = '<h4 id=heading-' + id + '>' + that.buildTreeHeadingFromHost(host) + '</h4>';
                div.appendChild(hostTree.domNode);

                dom.byId('tree_virtual_host_container').appendChild(div);

                hostTree.startup();

                var menu = new Menu({
                    targetNodeIds : [ id ],
                    selector : ".dijitTreeNode"
                });

                menu.addChild(new MenuItem({
                    label : "Edit",
                    onClick : that.showEditLineDialog.bind(that)
                }));

                menu.addChild(new MenuItem({
                    label : "Delete",
                    onClick : that.deleteLine.bind(that)
                }));

                var subMenu = new Menu();
                subMenu.addChild(new MenuItem({
                    label : "New Enclosure",
                    onClick: function() {
                        that.showAddLineDialog('enclosure');
                    }
                }));
                subMenu.addChild(new MenuItem({
                    label : "New Directive",
                    onClick: function() {
                        that.showAddLineDialog('directive');
                    }
                }));
                menu.addChild(new PopupMenuItem({
                    label : "Add",
                    popup : subMenu
                }));

                var generateFocusListener = function(index) {
                    on(menu, "focus", function(e) {
                        var tn = registry.getEnclosingWidget(this.currentTarget);
                        that.currentTreeItem = tn.item;
                        that.currentTreeIndex = index;
                    });
                };
                generateFocusListener(that.currentTreeSummaryCount);

                // when we right-click anywhere on the tree, make sure we open the menu
                //menu.bindDomNode(hostTree.domNode);

                that.trees.push(hostTree);

                that.currentTreeSummaryCount++;
            };

            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading Tree Hosts...');
            thisdialog.show();

            request.get('../web/VirtualHosts', {
                query : {
                    option : 'getTreeHosts'
                },
                handleAs : 'json',
                preventCache : true,
                sync : false
            }).response.then(function(response) {
                var data = response.data;

                var hosts = data.hosts;
                that.treeGlobalServerName = data.ServerName;

                //TODO handle case where theres no virtual host
                
                for (var i = 0; i < hosts.length; i++) {

                    buildTreeHost(hosts[i]);
                }

                that.buildTreeHostSelect();

                thisdialog.remove();

                that.populateHierarchicalVirtualHosts();
                                
                that.launchLastModifedUpdater();                
                
            }, function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Info', error.response.data.message);
            });
        },

        //------------------END OF TREE VIRTUAL HOSTS-------------------------//

        //------------------HIERARCHICAL VIRTUAL HOSTS-------------------------//

        // called after tree hosts are loaded or a tree host has been modified
        populateHierarchicalVirtualHosts : function() {
            var that = this;

            var buildHierarchicalHost = function(name, vhost, containerId, globalServerName, globalDocumentRoot) {

                var documentRoot = (vhost.DocumentRoot == '' ? (globalDocumentRoot == '' ? 'unknown' : globalDocumentRoot) : vhost.DocumentRoot);
                var serverName = (vhost.ServerName == '' ? (globalServerName == '' ? 'unknown' : globalServerName) : vhost.ServerName);

                var data = {
                    identifier : "id",
                    label : "name",
                    items : [ {
                        id : 'networkname',
                        name : 'Network',
                        value : name
                    }, {
                        id : 'port',
                        name : 'Port',
                        value : vhost.NetworkInfo.port == -1 ? '' : vhost.NetworkInfo.port
                    }, {
                        id : 'address',
                        name : 'Address',
                        value : vhost.NetworkInfo.address
                    }, {
                        id : 'file',
                        name : 'File',
                        value : '<a target="_blank" href="Configuration.jsp?file=' + vhost.file + '">' + vhost.file + '</a> Line: ' + vhost.lineOfStart
                    }, {
                        id : 'documentroot',
                        name : 'DocumentRoot',
                        value : documentRoot
                    }, {
                        id : 'servername',
                        name : 'ServerName',
                        value : serverName
                    } ]
                };

                var store = new ItemFileWriteStore({
                    data : data
                });

                var layout = [ [ {
                    name : ' ',
                    field : 'name',
                    width : '150px'
                }, {
                    name : ' ',
                    field : 'value',
                    width : 'auto'
                } ] ];

                var grid = new DataGrid({
                    id : 'grid-' + that.currentHierarchicalHostSummaryCount,
                    store : store,
                    structure : layout,
                    selectable : true,
                    style : 'width:100%;',
                    autoHeight : true,
                    escapeHTMLInData : false,
                    rowSelector : "20px"
                });

                var tp = new TitlePane({
                    title : serverName,
                    content : grid,
                    open : false
                });
                dom.byId(containerId).appendChild(tp.domNode);
                tp.startup();

                grid.startup();

                that.currentHierarchicalHostSummaryCount++;

            };

            request.get('../web/VirtualHosts', {
                query : {
                    option : 'getHierarchicalHosts'
                },
                handleAs : 'json',
                preventCache : true,
                sync : false
            }).response.then(function(response) {
                var data = response.data;

                var nameVirtualHostContainer = dom.byId('name_virtual_host_container');
                var otherVirtualHostContainer = dom.byId('other_virtual_host_container');

                //clear the containers
                array.forEach(registry.findWidgets(nameVirtualHostContainer), function(w) {
                    w.destroyRecursive();
                });

                nameVirtualHostContainer.innerHTML = '';

                array.forEach(registry.findWidgets(otherVirtualHostContainer), function(w) {
                    w.destroyRecursive();
                });

                otherVirtualHostContainer.innerHTML = '';

                var hosts = data.hosts;
                var globalServerName = data.ServerName;
                var globalDocumentRoot = data.DocumentRoot;

                for (host in hosts) {

                    var hostArray = hosts[host];

                    if (hostArray.length > 1) {

                        for (var i = 0; i < hostArray.length; i++) {
                            if (i == 0) {

                                var div = document.createElement('div');
                                div.innerHTML = '<h4>' + host + '</h4>';
                                nameVirtualHostContainer.appendChild(div);

                                div = document.createElement('div');
                                div.innerHTML = '<h5>Default</h5>';
                                nameVirtualHostContainer.appendChild(div);

                                buildHierarchicalHost(host, hostArray[i], "name_virtual_host_container", globalServerName, globalDocumentRoot);

                                div = document.createElement('div');
                                div.innerHTML = '<h5>Other Virtual Hosts</h5>';
                                nameVirtualHostContainer.appendChild(div);
                            } else {

                                buildHierarchicalHost(host, hostArray[i], "name_virtual_host_container", globalServerName, globalDocumentRoot);
                            }
                        }

                    } else {
                        var div = document.createElement('div');
                        div.innerHTML = '<h4>' + host + '</h4>';
                        otherVirtualHostContainer.appendChild(div);

                        buildHierarchicalHost(host, hostArray[0], "other_virtual_host_container", globalServerName, globalDocumentRoot);
                    }

                }

                if (nameVirtualHostContainer.innerHTML.trim() == "") {
                    nameVirtualHostContainer.innerHTML = '<p>There are no configured Name Virtual Hosts</p>';
                }

                if (otherVirtualHostContainer.innerHTML.trim() == "") {
                    otherVirtualHostContainer.innerHTML = '<p>There are no other configured Virtual Hosts</p>';
                }

            }, function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Info', error.response.data.message);
            });

        },

        //------------------END OF HIERARCHICAL VIRTUAL HOSTS-------------------------//

        addListeners : function() {
            var that = this;

            on(registry.byId('editSubmit'), 'click', function() {
                that.submitEditLine();
            });

            on(registry.byId('editCancel'), 'click', function() {
                registry.byId('editDialog').hide();
            });
            
            on(registry.byId('addSubmit'), 'click', function() {
                that.submitAddLine();
            });

            on(registry.byId('addCancel'), 'click', function() {
                registry.byId('addDialog').hide();
            });
            
        }

    });

    net.apachegui.Util.setupSingletonInstance(net.apachegui.VirtualHosts);

});