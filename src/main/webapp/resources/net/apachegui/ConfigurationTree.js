//TODO stub out this file into a re-usable widget for GlobalTree.js
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dojo/data/ItemFileWriteStore",
    "dojo/store/Observable",
    "net/apachegui/RefreshableTree",
    "dijit/Tree",
    "dijit/tree/ForestStoreModel",
    "dojo/on",
    "dijit/registry",
    "dijit/Menu",
    "dijit/MenuItem",
    "dijit/PopupMenuItem"
], function(declare, _WidgetBase, ItemFileWriteStore, Observable, RefreshableTree, Tree, ForestStoreModel, on, registry, Menu, MenuItem, PopupMenuItem){

    return declare([_WidgetBase], {

        id: '',
        tree: null,
        menu: null,
        currentTreeItem: null,

        /**
         *  @param params - params are as follows:
         *      id - the id to give the tree
         *      treeJSON - the JSON structure for the tree
         */
        constructor: function(params){
            this.id = params.id;

            var store = new ItemFileWriteStore({
                data : params.treeJSON
            });
            store = new Observable(store);

            var treeModel = new ForestStoreModel({
                store : store,
                query : {
                    "type" : "rootNode"
                },
                rootId : 0,
                childrenAttrs : [ "children" ],
                id : this.id + '_model'
            });

            var HostTreeNode = declare(Tree._TreeNode, {
                _setLabelAttr : {
                    node : "labelNode",
                    type : "innerHTML"
                }
            });

            this.tree = new RefreshableTree({
                model : treeModel,
                showRoot : false,
                autoExpand : true,
                openOnClick : true,
                id : this.id + '_tree',
                persist : true,
                _createTreeNode : function(args) {
                    return new HostTreeNode(args);
                }
            });
        },

        buildRendering: function(){
            // create the DOM for this widget
            var id  = this.id + '_container';

            var div = document.createElement('div');
            div.id = id;
            div.appendChild(this.tree.domNode);
            this.domNode = div;

            this.menu = new Menu({
                targetNodeIds : [ id ],
                selector : ".dijitTreeNode"
            });

            this.menu.addChild(new MenuItem({
                label : "Edit",
                onClick : function() {
                    //TODO implement menu functions, take them from virtual hosts
                }
            }));

            this.menu.addChild(new MenuItem({
                label : "Delete",
                onClick : function() {

                }
            }));

            var subMenu = new Menu();
            subMenu.addChild(new MenuItem({
                label : "New Enclosure",
                onClick: function() {

                }
            }));
            subMenu.addChild(new MenuItem({
                label : "New Directive",
                onClick: function() {

                }
            }));
            this.menu.addChild(new PopupMenuItem({
                label : "Add",
                popup : subMenu
            }));
        },

        postCreate: function(){
            this._addListeners();
        },

        startup: function() {
            this.tree.startup();
        },

        destroy: function() {
            this.tree.destroy();
        },

        _addListeners: function() {
            var that = this;

            on(this.menu, "focus", function(e) {
                var tn = registry.getEnclosingWidget(this.currentTarget);
                that.currentTreeItem = tn.item;
                that.onMenuFocus();
            });
        },

        //--- EVENTS -----------------------------------------------------------//
        // These will all be left empty, it will be used as the extension point
        /**
         configTree.on("menufocus", function() {
                        console.log( " received notification " );
                    });
        **/
        onMenuFocus: function() {

        }
    });
});