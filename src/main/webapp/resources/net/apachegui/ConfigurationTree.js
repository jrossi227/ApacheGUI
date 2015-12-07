//TODO stub out this file into a re-usable widget for GlobalTree.js
define([
    "dojo/_base/declare",
    "dojo/dom",
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
    "dijit/PopupMenuItem",
    "dojo/_base/lang",
    "dojo/request",
    "net/apachegui/InputAutoSuggest"
], function(declare, dom, _WidgetBase, ItemFileWriteStore, Observable, RefreshableTree, Tree, ForestStoreModel, on, registry, Menu, MenuItem, PopupMenuItem, lang, request, InputAutoSuggest){

    return declare([_WidgetBase], {

        id: '',
        tree: null,
        menu: null,
        currentTreeItem: null,
        editable: true,
        treeJSON: {},
        autoExpand: false,
        inputAutoSuggest: null,

        LineTypes: {
            ENCLOSURE: 'enclosure',
            DIRECTIVE: 'directive'
        },

        /**
         *  @param params - params are as follows:
         *      id - the id to give the tree
         *      treeJSON - the JSON structure for the tree
         *      autoExpand - true to auto expand the tree, false other wise, defualts to false
         */
        constructor: function(params){
            this.id = params.id;
            this.treeJSON = params.treeJSON || {};
            this.autoExpand = params.autoExpand || false;

            var store = new ItemFileWriteStore({
                data : this.treeJSON
            });
            store = new Observable(store);

            var treeModel = new ForestStoreModel({
                store : store,
                query : {
                    "type" : "rootNode"
                },
                rootId : "0",
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
                autoExpand : this.autoExpand,
                openOnClick : true,
                id : this.id + '_tree',
                persist : true,
                _createTreeNode : function(args) {
                    return new HostTreeNode(args);
                }
            });

            this._autoExpandRootNode();
            this._initializeAutoSuggest();
        },

        buildRendering: function(){
            var that = this;

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
                label : "Exapnd All",
                onClick : function() {
                    that.expandAll();
                }
            }));

            this.menu.addChild(new MenuItem({
                label : "Collapse All",
                onClick : function() {
                    that.collapseAll();
                }
            }));

            this.menu.addChild(new MenuItem({
                label : "Edit",
                onClick : function() {
                    //TODO implement menu functions, take them from virtual hosts
                    that._showEditLineDialog();
                }
            }));

            this.menu.addChild(new MenuItem({
                label : "Delete",
                onClick : function() {
                    that._deleteLine()
                }
            }));

            var subMenu = new Menu();
            subMenu.addChild(new MenuItem({
                label : "New Enclosure",
                onClick: function() {
                    that._showAddLineDialog(this.LineTypes.ENCLOSUE);
                }
            }));
            subMenu.addChild(new MenuItem({
                label : "New Directive",
                onClick: function() {
                    that._showAddLineDialog(this.LineTypes.DIRECTIVE);
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

        collapseAll: function() {
            this.tree.collapseAll();
        },

        expandAll: function() {
            this.tree.expandAll();
        },

        disableEditing: function() {
            this.editable = false;
        },

        enableEditing: function() {
            this.editable = true;
        },

        reload: function(treeJSON) {
            this.treeJSON = treeJSON;
            this.tree.model.store = new ItemFileWriteStore({
                data : this.treeJSON
            });

            this.tree.reload();

            this._autoExpandRootNode();
        },

        //--- PRIVATE FUNCTIONS -----------------------------------------------------------//
       _getItemProperty : function(item,name) {
            var val = item[name];

            if(lang.isArray(val)){
                return val[0];
            }

            return val;
        },

        _getTreeItem : function(id, items) {

            var item = null;

            for (var i = 0; i < items.length; i++) {

                if (items[i].id == id) {
                    item = items[i];
                } else if (!!items[i].children) {
                    item = this._getTreeItem(id, items[i].children);
                }

                if (!!item) {
                    break;
                }
            }

            return item;
        },

        _getSelectedTreeItem : function() {
            var itemId = this.currentTreeItem.id;
            var items = this.treeJSON.items;

            var item = this._getTreeItem(itemId, items);

            if (this.currentTreeItem.type != this._getItemProperty(item,'type') && this.currentTreeItem.value != this._getItemProperty(item, 'value')) {
                //TODO out of date tree

                return null;
            }

            return item;
        },

        _initializeAutoSuggest: function() {
            this.inputAutoSuggest = new InputAutoSuggest(dom.byId('addLineType'));
        },

        _autoExpandRootNode: function() {
            if(!this.autoExpand) {
                var nodes = this.tree.getNodesByItem("0");

                for(var i=0; i<nodes.length; i++) {
                    if (!nodes[i].isExpanded) {
                        this.tree._expandNode(nodes[i]);
                    }
                }
            }
        },

        _showEditLineDialog: function() {
            if(!this.editable) {
                this.onDisabledError();
                return;
            }

            var item = this._getSelectedTreeItem();
            if (!!item) {

                var type = this._getItemProperty(item, 'type');
                var value = this._getItemProperty(item, 'value');

                var shouldShow = this.onShowEditDialog(type, value);
                if(!shouldShow) {
                    return;
                }

                dom.byId('editLineType').innerHTML = type;
                dom.byId('editLineValue').value = value;
                dom.byId('editLineLineType').value = this._getItemProperty(item,'lineType');
                dom.byId('editLineFile').value = this._getItemProperty(item,'file');
                dom.byId('editLineLineOfStart').value = this._getItemProperty(item,'lineOfStart');
                dom.byId('editLineLineOfEnd').value = this._getItemProperty(item,'lineOfEnd');

                var dialog = registry.byId('editLineDialog');
                dialog.set('title', this._getItemProperty(item,'lineType') == this.LineTypes.ENCLOSURE ? 'Edit Enclosure' : 'Edit Directive');
                dialog.show();
            }
        },

        _submitEditLine : function() {
            var that = this;

            var type = dom.byId('editLineType').innerHTML;
            var value = dom.byId('editLineValue').value.trim();
            var lineType = dom.byId('editLineLineType').value;
            var file = dom.byId('editLineFile').value;
            var lineOfStart = dom.byId('editLineLineOfStart').value;
            var lineOfEnd = dom.byId('editLineLineOfEnd').value;

            var shouldEdit = this.onBeforeEditLine(type, value);
            if(!shouldEdit) {
                return;
            }

            var thisdialog = net.apachegui.Util.noCloseDialog('Modifying', 'Modifying Please Wait...');
            thisdialog.show();

            that.checkModifiedTimes = false;
            request.post("../web/ConfigurationTree", {
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
                    thisdialog.remove();
                    registry.byId('editLineDialog').hide();

                    that.onAfterEditLine(type, value, response);
                }, function(error) {
                    thisdialog.remove();

                    var response = error.response;
                    net.apachegui.Util.alert('Error', response.data.message);
                    that.onEditLineError(type, value, response);
                });

        },

        _deleteLine: function() {

        },

        _showAddLineDialog: function(type) {

        },

        _addListeners: function() {
            var that = this;

            var that = this;

            on(registry.byId('editLineSubmit'), 'click', function() {
                that._submitEditLine();
            });

            on(registry.byId('editLineCancel'), 'click', function() {
                registry.byId('editLineDialog').hide();
            });

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
                        return true;
                    });

         configTree.on("showeditdialog", function() {
                        return true;
                    });
        **/
        onMenuFocus: function() {
            return true;
        },

        onDisabledError: function() {
            return true;
        },

        onShowEditDialog: function(type, value) {
            return true;
        },

        onBeforeEditLine: function(type, value) {
            return true;
        },

        onAfterEditLine: function(type, value, response) {
            return true;
        },

        onEditLineError: function(type, value, response) {
            return true;
        }
    });
});