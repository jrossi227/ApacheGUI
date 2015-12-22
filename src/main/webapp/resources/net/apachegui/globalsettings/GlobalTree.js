define([
    "dojo/_base/declare",
    "dojo/request",
    "dojo/dom",
    "net/apachegui/ConfigurationTree",
    "dojo/dom-construct"
], function(declare, request, dom, ConfigurationTree, domConstruct){
    
    declare("net.apachegui.globalsettings.GlobalTree", null, {

        initialized: false,
        configTree: null,

        init: function () {
            if(this.initialized===false) {
                this.buildGlobalTree();
                this.initialized=true;
            }
        },

        loadGlobalTreeJSON: function(callback) {
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
                    callback(tree);
                });
        },

        buildGlobalTree: function() {
            var that = this;

            this.loadGlobalTreeJSON(function(treeJSON) {
                that.configTree = new ConfigurationTree({
                    id: 'global_tree',
                    treeJSON: treeJSON,
                    loadTreeJSON: that.loadGlobalTreeJSON
                });
                that.configTree.startup();
                that.addListeners();

                domConstruct.place(that.configTree.domNode, dom.byId('global_tree_container'), 'last');
            });
        },

        addListeners: function() {
            var that = this;

        }

    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.GlobalTree);
    
});    
