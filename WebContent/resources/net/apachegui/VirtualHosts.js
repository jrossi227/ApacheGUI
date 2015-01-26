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
         "dojo/_base/array",
         "dojo/_base/lang",
         "dojo/dom-construct",
         "dijit/Tooltip"
], function(declare, dom, request, registry, on, ItemFileWriteStore, DataGrid, TitlePane, RefreshableTree, Tree, ForestStoreModel, Observable, Menu, MenuItem, PopupMenuItem, Select, scroll, query, array, lang, domConstruct, Tooltip) {

    declare("net.apachegui.VirtualHosts", null, {

        /**
        {
            number: 0,
            tree: __tree object__,
            host: __host object,
            lastModified : {
                file: __file path__,
                lastModifiedTime: 0
            }
        }
        **/
        virtualHosts : [],
        
        currentHierarchicalHostSummaryCount : 0,

        currentTreeSummaryCount : 0,
        currentVirtualHost : null,
        currentTreeItem : null,
        treeHostSelect : null,
        treeGlobalServerName : '',

        checkModifiedTimes : true,
        isModifiedDialogShown : false,
        disableEditing : false,
        
        addHostFileSelect: null,
        
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
            for(var i=0; i<this.virtualHosts.length; i++) {
                files.push(this.virtualHosts[i].lastModified.file);
            }
            
            return files;
        },
        
        updateLastModifiedTime : function(file, lastModifiedTime, callback) {
            var that = this;
            
            var updateFileTime = function(lastModifiedTime) {
                for(var i=0; i < that.virtualHosts.length; i++) {
                    if(that.virtualHosts[i].lastModified.file == file) {
                        that.virtualHosts[i].lastModified.lastModifiedTime = lastModifiedTime;
                    }
                }
                
                that.checkModifiedTimes = true;
                
                if(!!callback) {
                    callback();
                }
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
          
            if(files.length > 0) {
                net.apachegui.Main.getInstance().getLastModifiedTimes(
                        files, 
                        function(response) {
                            
                            for(var i=0; i<response.lastModifiedTimes.length; i++) {
                                that.updateLastModifiedTime(response.lastModifiedTimes[i].file, response.lastModifiedTimes[i].lastModifiedTime);
                            }
                            
                            that.launchLastModifedUpdaterInterval();
                        }, 
                        function(response) {
                            net.apachegui.Util.alert('Error',JSON.parse(response.response.data).message);
                    });
                
            } else {
                that.launchLastModifedUpdaterInterval();
            }
            
        },
        
        launchLastModifedUpdaterInterval: function() {
            var that = this;
            
            net.apachegui.Interval.setInterval(function() {
                
                if(that.checkModifiedTimes) {
                
                    var files = that.getLastModifiedFileList();
                    
                    if(files.length > 0) {
                        net.apachegui.Main.getInstance().getLastModifiedTimes(
                                files, 
                                function(response) {
                                    that.isModifiedDialogShown = false;
                                    
                                    for(var i=0; i<that.virtualHosts.length; i++) {
                                        for(var j=0; j<response.lastModifiedTimes.length; j++) {
                                            if(that.virtualHosts[i].lastModified.file == response.lastModifiedTimes[j].file) {
                                                if(that.virtualHosts[i].lastModified.lastModifiedTime != response.lastModifiedTimes[j].lastModifiedTime) {
                                                    if(!that.isModifiedDialogShown) {
                                                        that.isModifiedDialogShown = true;
                                                        that.disableTreeEditing();
                                                        net.apachegui.Util.confirmDialog("Reload", 'It appears that ' + that.virtualHosts[i].lastModified.file + ' has been updated outside of the editor.<br/>' +
                                                                                                   'Please refresh the page to grab the latest Virtual Host Configuration.<br/>' +
                                                                                                   'You may not edit any virtual hosts until you have refreshed the page.<br/>' +
                                                                                                   'Would you like to refresh now?', function confirm(conf) {
                                                            if(conf) {
                                                                window.location.reload();
                                                            } 
                                                        });
                                                    }
                                                    
                                                    that.virtualHosts[i].lastModified.lastModifiedTime = response.lastModifiedTimes[j].lastModifiedTime;
                                                }
                                            }
                                        }
                                    }
                                }, 
                                function(response) {
                                    net.apachegui.Util.alert('Error',JSON.parse(response.response.data).message);
                            });
                        
                    }
                
                }
                
            }, 5000);
            
        },
        
        //-----------------END OF LAST MODIFIED TRACKING---------------//

        //------------------TREE VIRTUAL HOSTS-------------------------//
        getItemProperty : function(item,name) {
            var val = item[name];
            
            if(lang.isArray(val)){
                return val[0];
            }
            
            return val;
        },
        
        valueContainsLogHolder : function (value) {
            if(value.indexOf('apacheguilogholder') > -1) {
                return true;
            }
            
            return false;
        },
        
        showLogHolderError : function() {
            net.apachegui.Util.alert('Error', 'The selected line is currently being used by the History functionality.<br/>' +
                                              'To edit or remove this line you must navigate to the History page and disable the selected Virtual Host.');
        },
        
        showTreeHostOutOfDateError : function() {
            net.apachegui.Util.alert('Error', 'It appears that the VirtualHost has been updated outside of the editor.<br/>' +
                                              'Please reload the page to grab the latest Virtual Host Configuration.');
        },
        
        showDisabledError : function() {
            net.apachegui.Util.alert('Error', 'You may not edit any hosts until you refresh the page.');
        },
        
        showNoConfiguredHosts : function() {
            dom.byId('tree_virtual_host_container').innerHTML = 'There are no configured Virtual Hosts';
        },

        getTreeHostServerName : function(host) {
            var serverName = (host.ServerName == '' ? (this.treeGlobalServerName == '' ? 'unknown' : this.treeGlobalServerName) : host.ServerName);
            return serverName;
        },

        getCurrentTreeContainerId : function() {
            return 'tree-' + this.currentVirtualHost.number;
        },

        getCurrentTreeId : function() {
            return 'tree-' + this.getCurrentTreeContainerId();
        },

        getTreePositionFromHost : function(host) {
            for (var i = 0; i < this.virtualHosts.length; i++) {

                if (this.areHostsEqual(this.virtualHosts[i].host, host)) {
                    return i;
                }

            }
        },
        
        getHost : function(ServerName, NetworkInfo) {
          
            var newHost = {};
            newHost.ServerName = ServerName;
            newHost.NetworkInfo = NetworkInfo;
            
            for (var i = 0; i < this.virtualHosts.length; i++) {
                
                var treeHost = this.virtualHosts[i].host;
                if (this.areHostsEqual(treeHost, newHost)) {
                    return treeHost;
                }
            }
            
            return null;
        },
        
        showHostExistsError : function(host) {
            net.apachegui.Util.alert('Error', 'There is already a Virtual Host with the follwing values:<br/><br/>' +                                                         
                    
                    '<strong>File</strong>: ' + host.file + ' Line: ' + host.lineOfStart +'<br/>' +
                    '<strong>ServerName</strong>: ' + host.ServerName + '<br/>' +
                    '<strong>NetworkInfo</strong>: ' + this.buildNetworkInfoString(host) + '<br/><br/>' +
                    
                    'You may not duplicate Virtual Hosts');
        },
        
        buildNetworkInfoString : function(host) {
            var networkInfoValue = '';
            var networkInfo = host.NetworkInfo;
            for (var j = 0; j < networkInfo.length; j++) {
                networkInfoValue += networkInfo[j].value;
            }
            
            return networkInfoValue;
        },
        
        buildTreeHeadingFromHost : function(host) {
            var serverName = this.getTreeHostServerName(host);
            var networkInfoValue = this.buildNetworkInfoString(host);
          
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
            var items = this.currentVirtualHost.host.tree.items;

            var item = this.getTreeItem(itemId, items);

            if (this.currentTreeItem.type != this.getItemProperty(item,'type') && this.currentTreeItem.value != this.getItemProperty(item, 'value')) {
                this.showTreeHostOutOfDateError();

                return null;
            }

            return item;
        },

        buildTreeHostSelectOption : function(host) {
            var serverName = this.getTreeHostServerName(host);
            var networkInfoValue = this.buildNetworkInfoString(host);
            
            return serverName + ' ' + networkInfoValue;
        },
        
        buildTreeHostSelect : function() {

            var options = [];
            options.push({
                label : 'Select',
                value : ''
            });

            var host;
            for (var i = 0; i < this.virtualHosts.length; i++) {
                host = this.virtualHosts[i].host;
                options.push({
                    label : this.buildTreeHostSelectOption(host),
                    value : this.virtualHosts[i].number.toString()
                });
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
            
            registry.byId('editLineSubmit').set('disabled', true);            
            registry.byId('addLineSubmit').set('disabled', true);
            registry.byId('addHostSubmit').set('disabled', true);
        },
        
        deleteLine : function() {
            var that = this;

            if(this.disableEditing) {
                this.showDisabledError();
                return;
            }
            
            var item = this.getSelectedTreeItem();
            var type = this.getItemProperty(item, 'type');
            var value = this.getItemProperty(item, 'value');
            
            if(this.valueContainsLogHolder(value)) {
                this.showLogHolderError();
                return;
            }
            
            if (!!item) {
                net.apachegui.Util.confirmDialog("Please Confirm", "Are you sure you want to delete the following " + this.getItemProperty(item,'lineType') + ":<br/><br/>" + this.getItemProperty(item,'name'), function confirm(conf) {
                    if (conf) {

                        if(that.disableEditing) {
                            that.showDisabledError();
                            return;
                        }
                        
                        var tree = that.currentVirtualHost.tree;
                        var host = that.currentVirtualHost.host;
                        
                        var callback;
                        if (type == "VirtualHost") {
                            callback = function() {
                                var index = that.getTreePositionFromHost(host);
                                
                                tree.destroyRecursive();
                                
                                var container = dom.byId(that.getCurrentTreeContainerId());
                                container.parentNode.removeChild(container);
                                
                                that.virtualHosts.splice(index,1);
                                that.currentVirtualHost = null;

                                that.buildTreeHostSelect();
                            };
                        }

                        if (type == "ServerName") {

                            var currHost = that.getHost('', host.NetworkInfo);
                            if (!!currHost) {
                                that.showHostExistsError(currHost);
                                return;
                            }

                            callback = function() {
                                host.ServerName = '';
                                dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(host);
                                that.buildTreeHostSelect();
                            };
                        }

                        var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Deleting Please Wait...');
                        thisdialog.show();

                        that.checkModifiedTimes = false;
                        var file = host.file;
                        request.post("../web/VirtualHosts", {
                            data : {
                                option : 'deleteLine',
                                file : file,
                                lineOfStart : that.getItemProperty(item,'lineType') == 'enclosure' ? that.getItemProperty(item,'enclosureLineOfStart') : that.getItemProperty(item,'lineOfStart'),
                                lineOfEnd : that.getItemProperty(item,'lineType') == 'enclosure' ? that.getItemProperty(item,'enclosureLineOfEnd') : that.getItemProperty(item,'lineOfEnd')
                            },
                            handleAs : 'json',
                            sync : false
                        }).response.then(function(response) {
                            if (!!callback) {
                                callback();
                            }

                            that.reloadTreeHost(that.currentVirtualHost);
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

                var type = this.getItemProperty(item, 'type');
                var value = this.getItemProperty(item, 'value');
                
                if(this.valueContainsLogHolder(value)) {
                    this.showLogHolderError();
                    return;
                }
                
                dom.byId('editLineType').innerHTML = type;
                dom.byId('editLineValue').value = value;
                dom.byId('editLineLineType').value = this.getItemProperty(item,'lineType');
                dom.byId('editLineLineOfStart').value = this.getItemProperty(item,'lineOfStart');
                dom.byId('editLineLineOfEnd').value = this.getItemProperty(item,'lineOfEnd');

                var dialog = registry.byId('editLineDialog');
                dialog.set('title', this.getItemProperty(item,'lineType') == 'enclosure' ? 'Edit Enclosure' : 'Edit Directive');
                dialog.show();
            }
        },

        submitEditLine : function() {
            var that = this;

            // cover special case when editing servername
            var host = this.currentVirtualHost.host;
            var file = host.file;

            var type = dom.byId('editLineType').innerHTML;
            var value = dom.byId('editLineValue').value.trim();
            var lineType = dom.byId('editLineLineType').value;
            var lineOfStart = dom.byId('editLineLineOfStart').value;
            var lineOfEnd = dom.byId('editLineLineOfEnd').value;
            
            // cover special case when editing virtual host network info
            var callback;
            if (type == "VirtualHost") {
                
                var NetworkInfo = that.buildNetworkInfoArrayFromValue(value);
                
                var currHost = this.getHost(host.ServerName, NetworkInfo);
                if (!!currHost) {
                    this.showHostExistsError(currHost);
                    return;
                }
                
                callback = function() {                    
                    host.NetworkInfo = NetworkInfo;

                    dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(host);
                    that.buildTreeHostSelect();

                };
            }

            if (type == "ServerName") {
                
                var currHost = this.getHost(value, host.NetworkInfo);
                if (!!currHost) {
                    this.showHostExistsError(currHost);
                    return;
                }
                
                callback = function() {
                    
                    host.ServerName = value;
                    dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(host);
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

                that.reloadTreeHost(that.currentVirtualHost);
                thisdialog.remove();
                registry.byId('editLineDialog').hide();
                
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

                dom.byId('addLineType').value = '';
                dom.byId('addLineValue').value = '';
                dom.byId('addLineBeforeLineType').value = this.getItemProperty(item,'lineType');
                dom.byId('addLineLineType').value = type;
                dom.byId('addLineLineOfStart').value = (parseInt(this.getItemProperty(item,'lineOfEnd')) + 1);

                var dialog = registry.byId('addLineDialog');
                dialog.set('title', type == 'enclosure' ? 'Add Enclosure' : 'Add Directive');
                dialog.show();
                
            }
        },
        
        submitAddLine : function() {
            
            var that = this;

            // cover special case when editing servername
            var host = this.currentVirtualHost.host;
            
            var file = host.file;
            var type = dom.byId('addLineType').value.trim();
            var value = dom.byId('addLineValue').value.trim();
            var beforeLineType = dom.byId('addLineBeforeLineType').value;
            var lineType = dom.byId('addLineLineType').value;
            var lineOfStart = dom.byId('addLineLineOfStart').value;
                        
            var callback;
            if (type == "ServerName") {
                
                var currHost = this.getHost(value, host.NetworkInfo);
                if (!!currHost) {
                    this.showHostExistsError(currHost);
                    return;
                }
                
                callback = function() {
                    
                    host.ServerName = value;
                    dom.byId('heading-' + that.getCurrentTreeContainerId()).innerHTML = that.buildTreeHeadingFromHost(host);
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

                that.reloadTreeHost(that.currentVirtualHost);
                thisdialog.remove();
                registry.byId('addLineDialog').hide();
                
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
            if(hosts.length == 0) {
                this.showNoConfiguredHosts();
            } else {
            
                for (var i = 0; i < hosts.length; i++) {
                    host = hosts[i];
    
                    for (var j = 0; j < this.virtualHosts.length; j++) {
    
                        treeHost = this.virtualHosts[j].host;
                        if (this.areHostsEqual(treeHost, host)) {
                            this.virtualHosts[j].host = host;
                        }
    
                    }
                }
            }

            //reload hierarchical hosts in the background
            this.populateHierarchicalVirtualHosts();

        },

        reloadTreeHost : function(virtualHost) {
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

                if (!!virtualHost) {
                                        
                    var host;
                    for (var i = 0; i < hosts.length; i++) {
                        host = hosts[i];

                        if (that.areHostsEqual(virtualHost.host, host)) {
                                                        
                            virtualHost.tree.model.store = new ItemFileWriteStore({
                                data : host.tree
                            });
                            
                            virtualHost.tree.reload();
                                                        
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

        buildTreeHost : function(host, container, pos) {
            var that = this;
            
            //build the tree
            var id = "tree-" + this.currentTreeSummaryCount;

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
            
            var div = document.createElement('div');
            div.id = id;
            div.innerHTML = '<h4 id=heading-' + id + '>' + this.buildTreeHeadingFromHost(host) + '</h4>';
            div.appendChild(hostTree.domNode);
            
            domConstruct.place(div, container, pos);

            hostTree.startup();

            var menu = new Menu({
                targetNodeIds : [ id ],
                selector : ".dijitTreeNode"
            });

            menu.addChild(new MenuItem({
                label : "Edit",
                onClick : this.showEditLineDialog.bind(this)
            }));

            menu.addChild(new MenuItem({
                label : "Delete",
                onClick : this.deleteLine.bind(this)
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

            var virtualHost = (function(num) {
                return {
                    number : num,
                    tree : hostTree,
                    host : host,
                    lastModified : {
                        file : host.file,
                        lastModifiedTime : 0
                    }
                };
            })(this.currentTreeSummaryCount);
            
            this.virtualHosts.push(virtualHost);
            
            on(menu, "focus", function(e) {
                var tn = registry.getEnclosingWidget(this.currentTarget);
                that.currentTreeItem = tn.item;
                that.currentVirtualHost = virtualHost;
            });

            this.currentTreeSummaryCount++;
            
            return div;
        },
        
        populateTreeVirtualHosts : function() {
            var that = this;

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

                if(hosts.length == 0) {
                    that.showNoConfiguredHosts();
                } else {
                    
                    var hostsError = false;
                    for (var i = 0; i < hosts.length && !hostsError; i++) {
                        
                        for (var j = i+1; j < hosts.length; j++) {
                            if(that.areHostsEqual(hosts[i], hosts[j])) {
                                dom.byId('tree_virtual_host_container').innerHTML = 'There was an error processing the hosts';
                                
                                net.apachegui.Util.alert('Error', 'There was an error processing the Virtual Hosts.<br/>' + 
                                        'There are duplicate hosts with the following values:<br/><br/>' +
                                        
                                        '<strong>File</strong>: ' + hosts[i].file + ' Line: ' + hosts[i].lineOfStart +'<br/>' +
                                        '<strong>ServerName</strong>: ' + hosts[i].ServerName + '<br/>' +
                                        '<strong>NetworkInfo</strong>: ' + that.buildNetworkInfoString(hosts[i]) + '<br/><br/>' +
                                        
                                        '<strong>File</strong>: ' + hosts[j].file + ' Line: ' + hosts[j].lineOfStart +'<br/>' +
                                        '<strong>ServerName</strong>: ' + hosts[j].ServerName + '<br/>' +
                                        '<strong>NetworkInfo</strong>: ' + that.buildNetworkInfoString(hosts[j]) + '<br/><br/>' +
                                        
                                        'You must fix the configuration error before using the Virtual Host functionality');
                                
                                hostsError = true;
                                break;
                            }
                        }
                        
                    }
                    
                    if(!hostsError) {
                        for (var i = 0; i < hosts.length; i++) {
                            that.buildTreeHost(hosts[i],dom.byId('tree_virtual_host_container'),'last');
                        }
                    }
                }
                
                that.buildTreeHostSelect();
                that.populateHierarchicalVirtualHosts();              
                that.launchLastModifedUpdater();    
                thisdialog.remove();
                
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
                    }, {
                        id : 'serveralias',
                        name : 'ServerAlias',
                        value : vhost.ServerAlias
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
                                div.innerHTML = '<h5>Default <span id="default_dialog_' + that.currentHierarchicalHostSummaryCount + '"  class="warningTooltip"></span></h5>';
                                nameVirtualHostContainer.appendChild(div);

                                new Tooltip({
                                    connectId: ['default_dialog_' + that.currentHierarchicalHostSummaryCount],
                                    label : "The default Virtual Host is used when a request comes in with a domain that does not match a ServerName or ServerAlias for the specified address and port."
                                });
                                
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

        //-----------------------END OF HIERARCHICAL VIRTUAL HOSTS--------------------//

        //----------------------------ADDING VIRTUAL HOSTS----------------------------//
        
        buildAddHostFileSelect : function(files) {

            var options = [];
            options.push({
                label : 'Select',
                value : ''
            });

            for (var i = 0; i < files.length; i++) {
                options.push({
                    label : files[i],
                    value : files[i]
                });
            }

            if (!!this.addHostFileSelect) {
                this.addHostFileSelect.destroyRecursive();
            }

            this.addHostFileSelect = new Select({
                name : "addHostFile",
                id : "addHostFile",
                options : options
            });
            this.addHostFileSelect.placeAt(dom.byId('add_host_select_box'));
            this.addHostFileSelect.startup();
            
            on(this.addHostFileSelect, "change", function() {
                var value = this.get("value");

                if (value != '') {
                    registry.byId('addHostNewFile').set('value','');
                    registry.byId('addHostNewFile').set('disabled', true);
                } else {
                    registry.byId('addHostNewFile').set('disabled', false);
                }
            });
        },
        
        submitAddHost : function() {
            var that = this;
            
            var allHostAddress=dom.byId('addHostAllAddress').checked;
            var hostAddress=registry.byId('addHostAddress').get('value').trim();
            var port=registry.byId('addHostPort').get('value').trim();
            var serverName=registry.byId('addHostServerName').get('value').trim();
            var documentRoot=registry.byId('addHostDocumentRoot').get('value').trim();
            var file=this.addHostFileSelect.get('value');
            var newFile=registry.byId('addHostNewFile').get('value').trim();
            
            if(allHostAddress == false &&  hostAddress == "") {
                net.apachegui.Util.alert('Error',"You must specify either All IP's and hosts or a specific IP or host.");
                return;
            }
            
            if(port != "" && isNaN(port)) {
                net.apachegui.Util.alert('Error','The Port must be numeric');
                return;
            }
            
            if(newFile == "" &&  file == "") {
                net.apachegui.Util.alert('Error','You must specify a file');
                return;
            }
             
            hostAddress = allHostAddress == true ? '*' : hostAddress; 
            file = file == '' ? newFile :  file;
            
            var currHost = this.getHost(serverName, [{
                "port": port == "" ? -1 : parseInt(port),
                "address": hostAddress,
                "value": ''
            }]);
            
            if (!!currHost) {
                this.showHostExistsError(currHost);
                return;
            }
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Adding', 'Adding Please Wait...');
            thisdialog.show();

            this.checkModifiedTimes = false;
            request.post("../web/VirtualHosts", {
                data : {
                    option : 'addHost',
                    hostAddress : hostAddress,
                    port : port,
                    serverName : serverName,
                    documentRoot : documentRoot,
                    file : file
                },
                handleAs : 'json',
                sync : false
            }).response.then(function(response) {

                // Add logic to insert host into page, response should be tree
                // json
                var hosts = response.data.hosts;

                if(hosts.length == 1) {
                    dom.byId('tree_virtual_host_container').innerHTML = '';
                }
                
                var found = false;
                var index = 0;
                for (var i = 0; i < that.virtualHosts.length; i++) {

                    if (!that.areHostsEqual(that.virtualHosts[i].host, hosts[i])) {
                        that.buildTreeHost(hosts[i], dom.byId('tree-' + that.virtualHosts[i].number), 'before');
                        found = true;
                        index = i;
                        break;
                    }
                }

                if (!found) {
                    //last position in the array
                    index = hosts.length - 1;
                    that.buildTreeHost(hosts[hosts.length - 1], dom.byId('tree_virtual_host_container'), 'last');
                    
                } else {
                    // move the tree in the correct index
                    var tempVirtualHost = that.virtualHosts[that.virtualHosts.length - 1];
                    for (var i = that.virtualHosts.length - 1; i > index; i--) {
                        that.virtualHosts[i] = that.virtualHosts[i - 1];
                    }
    
                    that.virtualHosts[index] = tempVirtualHost;
                }
                
                that.buildTreeHostSelect();
                
                thisdialog.remove();
                registry.byId('addHostDialog').hide();
                
                that.treeHostSelect.set('value', that.virtualHosts[index].number);
                
                file = that.virtualHosts[index].lastModified.file;
                
                if(newFile != '') {
                    net.apachegui.Menu.getInstance().refresh();
                    
                    that.updateLastModifiedTime(file, null, function() {
                        that.checkModifiedTimes = false;
                        
                        that.updateLastModifiedTime(net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.confFile));
                    });
                    
                } else {
                    that.updateLastModifiedTime(file);
                }
                
                that.reloadTreeHost();
            }, function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Error', error.response.data.message);
            });
            
        },
        
        //----------------------------------------------------------------------------//
        
        addListeners : function() {
            var that = this;

            on(registry.byId('editLineSubmit'), 'click', function() {
                that.submitEditLine();
            });

            on(registry.byId('editLineCancel'), 'click', function() {
                registry.byId('editLineDialog').hide();
            });
            
            on(registry.byId('addLineSubmit'), 'click', function() {
                that.submitAddLine();
            });

            on(registry.byId('addLineCancel'), 'click', function() {
                registry.byId('addLineDialog').hide();
            });
            
            on(registry.byId('addHostButton'), 'click', function() {
                
                if(that.disableEditing) {
                    that.showDisabledError();
                    return;
                }
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading Active Files ...');
                thisdialog.show();
                net.apachegui.Main.getInstance().getActiveFileList(function(files) {                    
                    
                    dom.byId('addHostAllAddress').checked = false;
                    registry.byId('addHostAddress').set('value','');
                    registry.byId('addHostAddress').set('disabled',false);
                    
                    registry.byId('addHostPort').set('value','');
                    registry.byId('addHostServerName').set('value','');
                    registry.byId('addHostDocumentRoot').set('value','');
                    
                    registry.byId('addHostNewFile').set('value','');
                    registry.byId('addHostNewFile').set('disabled',false);
                    
                    that.buildAddHostFileSelect(files);
                    
                    registry.byId('addHostDialog').show(); 
                    
                    thisdialog.remove();
                });
                
            });
            
            on(dom.byId('addHostAllAddress'), "click", function() {
                if(this.checked==true) {
                    registry.byId('addHostAddress').set('value','');
                    registry.byId('addHostAddress').set('disabled', true);
                } else {
                    registry.byId('addHostAddress').set('disabled', false);
                }
            });
            
            on(registry.byId('addHostAddress'), "focus", function() {
                dom.byId('addHostAllAddress').disabled=true;
            });
            
            on(registry.byId('addHostAddress'), "blur", function() {
                if(registry.byId('addHostAddress').get('value').trim() == "") {
                    dom.byId('addHostAllAddress').disabled=false;
                } 
            });
            
            on(registry.byId('addHostNewFile'), "focus", function() {
                registry.byId('addHostFile').set('disabled',true);
            });
            
            on(registry.byId('addHostNewFile'), "blur", function() {
                if(registry.byId('addHostNewFile').get('value').trim() == "") {
                    registry.byId('addHostFile').set('disabled',false);
                } 
            });
            
            on(registry.byId('addHostCancel'), 'click', function() {
                registry.byId('addHostDialog').hide(); 
            });
            
            on(registry.byId('addHostSubmit'), 'click', function() {
                that.submitAddHost();
            });
            
        }

    });

    net.apachegui.Util.setupSingletonInstance(net.apachegui.VirtualHosts);

});