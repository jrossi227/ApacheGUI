define([
    "../../dojo/_base/declare",
    "dojo/request",
    "dojo/dom",
    "net/apachegui/ConfigurationTree",
    "dojo/dom-construct"
], function(declare, request, dom, ConfigurationTree, domConstruct){
    
    declare("net.apachegui.GlobalTree", null, {

        initialized: false,
        configTree: null,
        checkModifiedTimes: true,
        lastModifiedTimes: [],

        init: function () {
            if(this.initialized===false) {
                this.buildGlobalTree();
                this.initLastModifiedTimes();
                this.launchLastModifiedUpdateInterval();
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

            this.configTree = new ConfigurationTree({
                id: 'global_tree',
                loadTreeJSON: this.loadGlobalTreeJSON
            });
            this.configTree.startup();

            domConstruct.place(this.configTree.domNode, dom.byId('global_tree_container'), 'last');

            this.configTree.on("beforeAddLine", function(type, value) {
                that.checkModifiedTimes = false;
            });
            this.configTree.on("afterAddLine", function(type, value) {
               that.refreshModifiedTimes();
            });
            this.configTree.on("beforeEditLine", function(type, value) {
                that.checkModifiedTimes = false;
            });
            this.configTree.on("afterEditLine", function(type, value) {
                that.refreshModifiedTimes();
            });
            this.configTree.on("beforeDeleteLine", function(type, value) {
                that.checkModifiedTimes = false;
            });
            this.configTree.on("afterDeleteLine", function(type, value) {
                that.refreshModifiedTimes();
            });
        },

        initLastModifiedTimes: function() {
            var that = this;

            this.getLastModifiedTimes(function(lastModifiedTimes) {
                that.lastModifiedTimes = lastModifiedTimes;
            });
        },

        getLastModifiedTimes : function(callback) {
            net.apachegui.Main.getInstance().getActiveFileList(function(files) {

                net.apachegui.Main.getInstance().getLastModifiedTimes(
                    files,
                    function(response) {
                        callback(response.lastModifiedTimes);
                    }
                );

            });
        },

        refreshModifiedTimes: function() {
            var that = this;
            this.getLastModifiedTimes(function(lastModifiedTimes) {
                that.checkModifiedTimes = true;
                that.lastModifiedTimes = lastModifiedTimes;
            })
        },

        checkIfModifiedTimesHaveChanged: function() {
            var that = this;
            if(this.lastModifiedTimes.length == 0) {
                return;
            }
            this.getLastModifiedTimes(function(lastModifiedTimes) {

                var reload = false;
                if(that.lastModifiedTimes.length != lastModifiedTimes.length) {
                    reload = true;
                }

                for(var i=0; i<that.lastModifiedTimes.length && !reload; i++) {
                    var filtered = lastModifiedTimes.filter(function(lastModfiedTime) {
                       if( that.lastModifiedTimes[i].file == lastModfiedTime.file &&
                           that.lastModifiedTimes[i].lastModifiedTime == lastModfiedTime.lastModifiedTime) {
                           return true;
                       }

                        return false;
                    });

                    if(filtered.length == 0) {
                        reload = true;
                    }

                }

                if(reload) {
                    that.configTree.reload();
                }

                that.lastModifiedTimes = lastModifiedTimes;
            });
        },

        launchLastModifiedUpdateInterval: function() {
            var that = this;

            net.apachegui.Interval.setInterval(function() {
                if (that.checkModifiedTimes) {
                    that.checkIfModifiedTimesHaveChanged();
                }
            }, 5000);
        }

    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.GlobalTree);
    
});    
