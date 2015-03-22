define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "net/apachegui/Editor",
         "dojo/_base/json",
         "dojo/query",
         "net/apachegui/AutoSuggest"
], function(declare, dom, registry, on, request, Editor, json, query, AutoSuggest){    
    
    declare("net.apachegui.Configuration", [net.apachegui.Editor], {        
        
        initialized: false,
        autoSuggest: null,
        
        init: function() {
            
            if(this.initialized===false) {
                this.inherited(arguments);
                this.addListeners();
                this.loadAutoSuggest();
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
        
        loadAutoSuggest: function() {
            that = this;
            
            net.apachegui.Main.getInstance().getApacheVersion(function(version) {
                that.autoSuggest = new AutoSuggest({
                    version : version,
                    onShow: function() {
                        CodeMirror.keyMap.basic.Up = '';
                        CodeMirror.keyMap.basic.Down = '';
                        CodeMirror.keyMap.basic.Left = '';
                        CodeMirror.keyMap.basic.Right = '';
                        CodeMirror.keyMap.basic.Enter = '';
                    },
                    onHide: function() {
                        CodeMirror.keyMap.basic.Up = 'goLineUp';
                        CodeMirror.keyMap.basic.Down = 'goLineDown';
                        CodeMirror.keyMap.basic.Left = 'goCharLeft';
                        CodeMirror.keyMap.basic.Right = 'goCharRight';
                        CodeMirror.keyMap.basic.Enter = 'newlineAndIndent';
                    },
                    onHighlight: function(name) {
                        that.editor.focus();
                    },
                    onSelect: function(name) {
                        var currentLine = that.editor.getLine(that.editor.getCursor().line);
                        
                        var firstCharacterIndex = currentLine.search(/\S/m);
                        if(currentLine[firstCharacterIndex] == '<') {
                            firstCharacterIndex ++;
                        }
                        
                        var secondWhiteSpaceIndex = currentLine.substring(firstCharacterIndex).search(/\s/m);
                        if(secondWhiteSpaceIndex == -1) {
                            secondWhiteSpaceIndex = currentLine.length;
                        } else {
                            secondWhiteSpaceIndex += firstCharacterIndex;
                        }
                        
                        currentLine = currentLine.replace(currentLine.substring(firstCharacterIndex, secondWhiteSpaceIndex), name);
                        
                        that.editor.setLine(that.editor.getCursor().line, currentLine);
                        that.editor.setCursor({
                            line: that.editor.getCursor().line,
                            ch: firstCharacterIndex + name.length
                        });
                        
                        that.editor.focus();
                    }
                });
            });
            
        },
        
        getCursorCoords: function() {
            var pos = this.editor.cursorCoords(true, 'page');
            var xpos = pos.x;
            var ypos = pos.y;
            
            var windowHeight = window.innerHeight;
            if(ypos < (windowHeight / 2)) {
                ypos += 18;
            }
            
            return {
                xpos: xpos,
                ypos: ypos
            }
        },
        
        updateAutoSuggest: function() {
             if (!!this.autoSuggest) {
                var cursorCoords = this.getCursorCoords();
                this.autoSuggest.updateSuggestions(this.editor.getLine(this.editor.getCursor().line), this.editor.getCursor().ch, cursorCoords.xpos, cursorCoords.ypos);
            }
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
            
            query('.CodeMirror-scroll').on('scroll', function() {
                if(!!that.autoSuggest) {
                    that.autoSuggest.hide();
                }
            });
        }    
            
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Configuration);
    
});