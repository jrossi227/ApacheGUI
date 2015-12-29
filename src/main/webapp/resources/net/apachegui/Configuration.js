//TODO add click handler for file links

define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "net/apachegui/Editor",
         "dojo/_base/json",
         "dojo/dom-construct",
         "net/apachegui/ConfigurationTree",
         "dijit/popup"
], function(declare, dom, registry, on, request, Editor, json, domConstruct, ConfigurationTree, popup){
    
    declare("net.apachegui.Configuration", [net.apachegui.Editor], {        
        
        initialized: false,
        loadedTabs: [],
        file: '',
        configTree: null,
        isTreeUpdated: false,
        isEditorUpdated: false,
        TABS: {
            EDITOR: 'editorTab',
            TREE: 'treeTab'
        },

        init: function() {
            
            if(this.initialized===false) {
                this.inherited(arguments);
                this.addListeners();
                this.loadTab(this.TABS.EDITOR);
                this.initialized=true;
            }    
        },

        loadTab: function(tabId) {
            if (this.loadedTabs.indexOf(tabId) == -1) {
                if(tabId==this.TABS.TREE) {
                    this.buildConfigurationTree();
                }

                this.loadedTabs.push(tabId);
            } else {
                if(tabId==this.TABS.EDITOR && this.isTreeUpdated) {
                    this.isTreeUpdated = false;
                    this.refreshEditor();
                }
                if(tabId==this.TABS.TREE && this.isEditorUpdated) {
                    this.isEditorUpdated = false;
                    this.configTree.reload();
                }
            }
        },

        refreshEditor: function() {
            this.setEditorFromFile('../web/Configuration', net.apachegui.Util.getQueryParam('file'));
        },

        loadConfigurationTreeJSON: function(callback) {

            var file = net.apachegui.Util.getQueryParam('file');
            request.get('../web/Configuration', {
                query: {
                    option: 'getConfigurationTree',
                    file: file
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

        buildConfigurationTree: function() {
            var that = this;

            this.configTree = new ConfigurationTree({
                id: 'configuration_tree',
                loadTreeJSON: this.loadConfigurationTreeJSON,
                handleTreeLink: function(file, lineNumber) {
                    popup.close();
                    registry.byId("configurationTabs").selectChild(registry.byId('editorTab'));
                    that.scrollToLine(lineNumber);
                }
            });
            this.configTree.startup();

            var handleBefore = function() {
                that.stopUpdateTimer();
            };
            var handleAfterResponse = function(response) {
                var data = response.data;
                that.setOpenTime(data.lastModifiedTime);
                that.isTreeUpdated = true;
                that.startUpdateTimer();
            };
            this.configTree.on("beforeAddLine", function(type, value) {
                handleBefore();
            });
            this.configTree.on("afterAddLine", function(type, value, response) {
                handleAfterResponse(response);
            });
            this.configTree.on("beforeEditLine", function(type, value) {
                handleBefore();
            });
            this.configTree.on("afterEditLine", function(type, value, response) {
                handleAfterResponse(response);
            });
            this.configTree.on("beforeDeleteLine", function(type, value) {
                handleBefore();
            });
            this.configTree.on("afterDeleteLine", function(type, value, response) {
                handleAfterResponse(response);
            });

            domConstruct.place(this.configTree.domNode, dom.byId('configuration_tree_container'), 'last');
        },

        testConfiguration: function () {
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading ...');
            thisdialog.show();
            
            request.get('../web/Configuration', {
                query:     {
                    option: 'test'
                },
                handleAs: 'json',
                preventCache: true,
                sync: false
            }).response.then(
                function(response) {
                    var data = response.data;
                    
                    thisdialog.remove();
                    net.apachegui.Util.alert('Info',data.result);
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
        },
        
        getActiveFileList: function() {
            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading ...');
            thisdialog.show();
            
            net.apachegui.Main.getInstance().getActiveFileList(function(files) {
                var list='';

                var duplicates = [];
                var processed = {};
                for(var i=0; i< files.length; i++) {
                    list += '<a target="_blank" href="Configuration.jsp?file=' + files[i] + '">' + files[i] + '</a>' + "<br/>";

                    if(processed[files[i]] === true) {
                        if(duplicates.indexOf(files[i]) == -1) {
                            duplicates.push(files[i]);
                        }
                    }
                    processed[files[i]] = true;
                }

                if(duplicates.length > 0) {
                    list +=  '<div style="margin-top: 10px;">' +
                                '<strong>Warning!</strong><br>' +
                                'The following file(s) have been included in the configuration multiple times:' +
                                '<ul>';

                    for(var i=0; i<duplicates.length; i++) {
                     list +=        '<li>' + duplicates[i] + '</li>';
                    }

                    list +=     '</ul>' +
                            '</div>';
                }
                
                net.apachegui.Util.alert('Active File List',list);
                
                thisdialog.remove();
            });
        },
        
        save: function() {
            var that=net.apachegui.Configuration.getInstance();
            
            if(that.getReadOnly() == true) {
                return;
            }
            
            var path=net.apachegui.Util.getQueryParam('file');
            
            var url='../web/Configuration';
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Saving', 'Saving Please Wait...');
            thisdialog.show();
            
            that.stopUpdateTimer();
            
            request.post(url, {
                data:     {
                    option: 'save', 
                    path: path, 
                    content: that.editor.getValue()
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                    var data = response.data;
                    
                    that.clearSaveState();
                    that.setToolbarFades();
                    
                    if(data.time != -1) {
                        that.setOpenTime(data.time);
                    }
                    
                    thisdialog.remove();

                    that.isEditorUpdated = true;
                    that.startUpdateTimer();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
        },
        
        preview: function(line) {
            net.apachegui.Util.alert('Preview',escape(line));
        },
        
        addListeners : function() {
            var that = this;
            
            this.inherited(arguments);
            
            CodeMirror.commands.save=this.save;
            
            on(registry.byId('editorConfigurationTest'), "click", function() {
                that.testConfiguration();
            });
            
            on(registry.byId('editorConfigurationActiveList'), "click", function() {
                that.getActiveFileList();
            });
            
            on(registry.byId('editorConfigurationSearch'), "click", function() {
                registry.byId('searchConfigurationDialog').show();
            });

            registry.byId("configurationTabs").watch("selectedChildWidget", function(name, oval, nval){
                that.loadTab(nval.id);
            });
        }    
            
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Configuration);
    
});