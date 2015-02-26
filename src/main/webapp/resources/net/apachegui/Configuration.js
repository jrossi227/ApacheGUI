define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "net/apachegui/Editor",
         "dojo/_base/json"
], function(declare, dom, registry, on, request, Editor, json){    
    
    declare("net.apachegui.Configuration", [net.apachegui.Editor], {        
        
        initialized: false,
        
        init: function() {
            
            if(this.initialized===false) {
                this.inherited(arguments);
                this.addListeners();
                this.initialized=true;
            }    
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
                for(var i in files) {
                    list=list + '<a target="_blank" href="Configuration.jsp?file=' + files[i] + '">' + files[i] + '</a>' + "<br/>";
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
            
        }    
            
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Configuration);
    
});