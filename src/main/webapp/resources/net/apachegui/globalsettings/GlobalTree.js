define([
    "dojo/_base/declare",
    "dojo/request",
    "dojo/dom",
    "dojo/data/ItemFileWriteStore",
    "dojo/store/Observable",
    "net/apachegui/RefreshableTree",
    "dijit/Tree",
    "dijit/tree/ForestStoreModel",
    "dojo/dom-construct"

], function(declare, request, dom, ItemFileWriteStore, Observable, RefreshableTree, Tree, ForestStoreModel, domConstruct){
    
    declare("net.apachegui.globalsettings.GlobalTree", null, {

        initialized: false,

        init: function () {
            if(this.initialized===false) {
                this.buildGlobalTree();
                this.addListeners();
                this.initialized=true;
            }
        },

        buildGlobalTree: function() {
            request.get('../web/GlobalTree', {
                query: {
                    option: 'getGlobalTree'
                },
                handleAs: 'json',
                preventCache: true,
                sync: false
            }).response.then(function (response) {
                    var data = response.data;
                    var tree = data.tree;

                    var store = new ItemFileWriteStore({
                        data : tree
                    });
                    store = new Observable(store);

                    var treeModel = new ForestStoreModel({
                        store : store,
                        query : {
                            "type" : "rootNode"
                        },
                        rootId : 0,
                        childrenAttrs : [ "children" ],
                        id : 'GlobalTreeModel'
                    });

                    var HostTreeNode = declare(Tree._TreeNode, {
                        _setLabelAttr : {
                            node : "labelNode",
                            type : "innerHTML"
                        }
                    });

                    var hostTree = new RefreshableTree({
                        model : treeModel,
                        showRoot : false,
                        autoExpand : true,
                        openOnClick : true,
                        id : 'GlobalTreeTree',
                        persist : true,
                        _createTreeNode : function(args) {
                            return new HostTreeNode(args);
                        }
                    });

                    var div = document.createElement('div');
                    div.id = 'global_tree';
                    div.appendChild(hostTree.domNode);

                    domConstruct.place(div, dom.byId('global_tree_container'), 'last');

                    hostTree.startup();

                });
        },

        addListeners: function() {

        }

    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.GlobalTree);
    
});    
