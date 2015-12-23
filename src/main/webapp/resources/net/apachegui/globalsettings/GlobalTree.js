//TODO add check to see if global config changed and force refresh
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
            this.configTree = new ConfigurationTree({
                id: 'global_tree',
                loadTreeJSON: this.loadGlobalTreeJSON
            });
            this.configTree.startup();
            this.addListeners();

            domConstruct.place(this.configTree.domNode, dom.byId('global_tree_container'), 'last');
        },

        addListeners: function() {
            var that = this;

        }

    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.GlobalTree);
    
});    
