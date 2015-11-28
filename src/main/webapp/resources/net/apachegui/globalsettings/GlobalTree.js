define([
    "dojo/_base/declare",
    "dojo/request",
    "dojo/dom",
    "net/apachegui/ConfigurationTree",
    "dojo/dom-construct"
], function(declare, request, dom, ConfigurationTree, domConstruct){
    
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

                    var configTree = new ConfigurationTree({
                        id: 'global_tree',
                        treeJSON: tree
                    });
                    configTree.startup();

                    domConstruct.place(configTree.domNode, dom.byId('global_tree_container'), 'last');
                });
        },

        addListeners: function() {

        }

    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.GlobalTree);
    
});    
