//TODO stub out this file into a re-usable widget for GlobalTree.js
//TODO VirtualHost js should end up using this widget (started)
//TODO disable menu on root node
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
    "dojo/dom-attr",
    "net/apachegui/InputAutoSuggest",
    "dojo/dom-construct"
], function(declare, dom, _WidgetBase, ItemFileWriteStore, Observable, RefreshableTree, Tree, ForestStoreModel, on, registry, Menu, MenuItem, PopupMenuItem, lang, request, domAttr, InputAutoSuggest, domConstruct){

    return declare([_WidgetBase], {

        id: '',
        tree: null,
        menu: null,
        currentTreeItem: null,
        editable: true,
        treeJSON: {
            identifier: "id",
            items: [],
            label: "name"
        },
        autoExpand: false,
        inputAutoSuggest: null,

        LineTypes: {
            ENCLOSURE: 'enclosure',
            DIRECTIVE: 'directive'
        },

        /**
         * This function should be overriden with a custom JSON loader
         * @param callback(treeJSON) callback function to execute. treeJSON should be passed in as a parameter
         */
        loadTreeJSON: function(callback) {

        },

        /**
         *  @param params - params are as follows:
         *      id - the id to give the tree
         *      treeJSON - the JSON structure for the tree
         *      autoExpand - true to auto expand the tree, false other wise, defualts to false
         */
        constructor: function(params){
            this.id = params.id;
            this.treeJSON = params.treeJSON || this.treeJSON;
            this.autoExpand = params.autoExpand || false;
            this.rootType = params.rootType || 'rootNode';
            this.loadTreeJSON = params.loadTreeJSON || this.loadTreeJSON;

            var store = new ItemFileWriteStore({
                data : this.treeJSON
            });
            store = new Observable(store);

            var treeModel = new ForestStoreModel({
                store : store,
                query : {
                    "type" : this.rootType
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

            return this;
        },

        buildRendering: function(){
            var that = this;

            // create the DOM for this widget
            var div = document.createElement('div');
            div.appendChild(this.tree.domNode);
            this.domNode = div;

            this.menu = new Menu({
                selector : ".dijitTreeNode"
            });

            this.menu.bindDomNode(div);

            this.menu.addChild(new MenuItem({
                label : "Expand All",
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
                    that._showAddLineDialog(that.LineTypes.ENCLOSURE);
                }
            }));
            subMenu.addChild(new MenuItem({
                label : "New Directive",
                onClick: function() {
                    that._showAddLineDialog(that.LineTypes.DIRECTIVE);
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
            if(this.treeJSON.items.length == 0) {
                this.reload();
            }
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

        reload: function() {
            var that = this;

            this.loadTreeJSON(function(treeJSON) {
                that.treeJSON = treeJSON;
                that.tree.model.store = new ItemFileWriteStore({
                    data : that.treeJSON
                });

                that.tree.reload();

                that._autoExpandRootNode();
            });
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
                this.onOutOfDateError();

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
                this.onEditDisabledError();
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
                    that.reload();
                }, function(error) {
                    thisdialog.remove();

                    var response = error.response;
                    net.apachegui.Util.alert('Error', response.data.message);
                    that.onEditLineError(type, value, response);
                });

        },

        _deleteLine: function() {
            var that = this;

            if(!this.editable) {
                this.onDeleteDisabledError();
                return;
            }

            var item = this._getSelectedTreeItem();

            if (!!item) {
                var type = this._getItemProperty(item, 'type');
                var value = this._getItemProperty(item, 'value');

                var shouldShow = this.onShowDeleteDialog(type, value);
                if(!shouldShow) {
                    return;
                }

                net.apachegui.Util.confirmDialog("Please Confirm", "Are you sure you want to delete the following " + this._getItemProperty(item,'lineType') + ":<br/><br/>" + this._getItemProperty(item,'name'), function confirm(conf) {
                    if (conf) {

                        var shouldDelete = that.onBeforeDeleteLine(type, value);
                        if(!shouldDelete) {
                            return;
                        }

                        var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Deleting Please Wait...');
                        thisdialog.show();

                        request.post("../web/ConfigurationTree", {
                            data : {
                                option : 'deleteLine',
                                file : that._getItemProperty(item,'file'),
                                lineOfStart : that._getItemProperty(item,'lineType') == 'enclosure' ? that._getItemProperty(item,'enclosureLineOfStart') : that._getItemProperty(item,'lineOfStart'),
                                lineOfEnd : that._getItemProperty(item,'lineType') == 'enclosure' ? that._getItemProperty(item,'enclosureLineOfEnd') : that._getItemProperty(item,'lineOfEnd')
                            },
                            handleAs : 'json',
                            sync : false
                        }).response.then(function(response) {
                                thisdialog.remove();

                                that.onAfterDeleteLine(type, value, response);
                                that.reload();
                            }, function(error) {
                                thisdialog.remove();
                                var response = error.response;
                                net.apachegui.Util.alert('Error', response.data.message);
                                that.onDeleteLineError(type, value, response);
                            });
                    }
                });
            }
        },

        _showAddLineDialog: function(type) {
            //todo implement add line
            if(!this.editable) {
                this.onAddDisabledError();
                return;
            }

            var item = this._getSelectedTreeItem();
            if (!!item) {

                var shouldShow = this.onShowAddDialog(type);
                if(!shouldShow) {
                    return;
                }

                var addLineType = dom.byId('addLineType');
                addLineType.value = '';
                domAttr.set(addLineType, "data-type", type);
                dom.byId('addLineValue').value = '';
                dom.byId('addLineBeforeLineType').value = this._getItemProperty(item,'lineType');
                dom.byId('addLineLineType').value = type;
                dom.byId('addLineFile').value = this._getItemProperty(item,'file');
                dom.byId('addLineLineOfStart').value = (parseInt(this._getItemProperty(item,'lineOfEnd')) + 1);

                var dialog = registry.byId('addLineDialog');
                dialog.set('title', type == this.LineTypes.ENCLOSURE ? 'Add Enclosure' : 'Add Directive');
                dialog.show();
            }
        },

        _submitAddLine: function() {

            var that = this;


            var file = dom.byId('addLineFile').value.trim();;
            var type = dom.byId('addLineType').value.trim();
            var value = dom.byId('addLineValue').value.trim();
            var beforeLineType = dom.byId('addLineBeforeLineType').value;
            var lineType = dom.byId('addLineLineType').value;
            var lineOfStart = dom.byId('addLineLineOfStart').value;

            var shouldAdd = this.onBeforeAddLine(type, value);
            if(!shouldAdd) {
                return;
            }

            var thisdialog = net.apachegui.Util.noCloseDialog('Adding', 'Adding Please Wait...');
            thisdialog.show();

            request.post("../web/ConfigurationTree", {
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
                    thisdialog.remove();
                    registry.byId('addLineDialog').hide();

                    that.onAfterAddLine(type, value, response);
                    that.reload();
                }, function(error) {
                    thisdialog.remove();

                    var response = error.response;
                    net.apachegui.Util.alert('Error', response.data.message);
                    that.onAddLineError(type, value, response);
                });


        },

        _addListeners: function() {
            var that = this;

            //todo implement tree line hover

            on(registry.byId('editLineSubmit'), 'click', function() {
                that._submitEditLine();
            });

            on(registry.byId('editLineCancel'), 'click', function() {
                registry.byId('editLineDialog').hide();
            });

            on(registry.byId('addLineSubmit'), 'click', function() {
                that._submitAddLine();
            });

            on(registry.byId('addLineCancel'), 'click', function() {
                registry.byId('addLineDialog').hide();
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

        **/
        onMenuFocus: function() {
            return true;
        },

        onOutOfDateError: function() {
            return true;
        },

        onAddDisabledError: function() {
            return true;
        },

        onShowAddDialog: function(type) {
            return true;
        },

        onBeforeAddLine: function(type, value) {
            return true;
        },

        onAfterAddLine: function(type, value, response) {
            return true;
        },

        onAddLineError: function(type, value, response) {
            return true;
        },

        onEditDisabledError: function() {
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
        },

        onDeleteDisabledError: function() {
            return true;
        },

        onShowDeleteDialog: function(type, value) {
            return true;
        },

        onBeforeDeleteLine: function(type, value) {
            return true;
        },

        onAfterDeleteLine: function(type, value, response) {
            return true;
        },

        onDeleteLineError: function(type, value, response) {
            return true;
        }
    });
});