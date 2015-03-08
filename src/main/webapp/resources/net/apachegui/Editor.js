define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dojo/_base/window",
         "dojo/query",
         "dojo/_base/event",
         "dojo/_base/json"
], function(declare, dom, registry, on, request, domClass, domConstruct, win, query, event, json){
    
    declare("net.apachegui.Editor", null, {    

        editor: null,
        lastPos: null, 
        lastQuery: null,
        saveState: false,
        currTheme: null,
        tabsShown: false,
        currMode: null,
        openTime: -1,
        refreshUpdateTimerHandler: null,
        reloadDialogOpen: false,
        scrolledLine: -1,
        
        modes : {
            'plain'         :    'text/plain',
            'conf'          :   'text/apache-conf',
            'html'          :    'text/html',
            'css'           :    'text/css',
            'xml'           :    'application/xml',
            'javascript'    :    'text/javascript',
            'json'          :    'application/json',
            'php'           :    'application/x-httpd-php',
            'python'        :    'text/x-python',
            'perl'          :    'text/x-perl',
            'shell'         :    'text/x-sh',
            'properties'    :    'text/x-properties'
        },
        
        init: function() {
            //Load editor theme from settings
            var storedTheme=net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.editorTheme);
            if(storedTheme=='') {
                this.setTheme('default'); 
            } else {
                this.setTheme(storedTheme);
            }
            
            var storedShowTabs=net.apachegui.Settings.getInstance().getSetting(net.apachegui.Settings.getInstance().settingsMap.showTabs);
            if(storedShowTabs=='' || storedShowTabs=='false') {
                this.tabsShown=false;
                this.hideTabs();
            } else {
                this.tabsShown=true;
                this.showTabs();
            }
            
            //create search pane for find and replace toolbars
            domConstruct.create("div", { id: 'searchPane' }, win.body());
            
            this.initToolbar();
            
            this.startUpdateTimer();
        },
        
        setOpenTime: function(time) {
            time = parseInt(time);
            
            this.openTime = time;
        },
        
        getOpenTime: function() {
            return this.openTime;
        },
        
        startUpdateTimer: function() {
            this.stopUpdateTimer();
            
            this.refreshUpdateTimerHandler = net.apachegui.Interval.setInterval(this.checkLastModifiedTime.bind(this), 5000);    
        },
        
        stopUpdateTimer: function() {
            net.apachegui.Interval.clearInterval( this.refreshUpdateTimerHandler );
        },
        
        //Override for auto-suggest
        autoSuggest: function() {
            
        },
        
        getInitEditorOptions: function() {
            var that=this;
            
            var options = {
                lineNumbers : true,
                tabMode : 'indent',
                onChange : function() {
                    that.updateEditor();
                },
                onFocus : function() {
                    if(that.scrolledLine > -1) {
                        that.editor.setLineClass(that.scrolledLine, null, null);
                        that.scrolledLine = -1;
                    }
                },
                onCursorActivity : function() {
                    that.editor.matchHighlight("CodeMirror-matchhighlight");
                    that.autoSuggest();
                }
            };
        
            return options;
        },
        
        setEditor: function(textAreaId, mode) {
            this.editor=CodeMirror.fromTextArea(document.getElementById(textAreaId), this.getInitEditorOptions());    
            
            if(!!mode) {
                this.setMode(mode);
            } else {
                this.setMode('plain');
            }
            
            this.clearSaveState();
        },
        
        scrollToLine : function(lineNum) {
            lineNum -= 1;
            
            var that = this;

            this.editor.setCursor(lineNum);
            window.setTimeout(function() {
                that.editor.setLineClass(lineNum, null, "center-me");
                var $line = $('.CodeMirror-lines').find('.center-me');
                var $scroll = $('.CodeMirror-scroll');
                
                $scroll.scrollTop(0).scrollTop($line.offset().top - $scroll.offset().top - Math.round($scroll.height() / 2));
                
                that.scrolledLine = lineNum;
            }, 200);
            
        },
        
        initToolbar: function() {
            registry.byId('editorToolbarSave').set('disabled', true);
            registry.byId('editorToolbarRedo').set('disabled', true);
            registry.byId('editorToolbarUndo').set('disabled', true);
        },
        
        setValue: function(value) {
            this.editor.setValue(value);
        },
        
        getValue: function() {
            return this.editor.getValue();
        },
        
        updateEditor: function() {
            this.saveState=true;
            this.setToolbarFades();
        },
        
        setToolbarFades : function() {
            registry.byId('editorToolbarSave').set('disabled', !this.saveState);
            
            var changeHistory=this.editor.historySize();
            registry.byId('editorToolbarUndo').set('disabled', !(changeHistory.undo > 0));
            registry.byId('editorToolbarRedo').set('disabled', !(changeHistory.redo > 0));
        },
        
        setFileFades: function() {
            registry.byId('editorFileSave').set('disabled', !this.saveState);
        },
        
        setEditFades: function() {
            var that=this;
            
            var changeHistory=this.editor.historySize();
            
            registry.byId('editorEditUndo').set('disabled', !(changeHistory.undo > 0));
            registry.byId('editorEditRedo').set('disabled', !(changeHistory.redo > 0));
            
            query("#editorEditAutoFormat, #editorEditComment, #editorEditUnComment").forEach(function(node){
                registry.byId(node.id.toString()).set('disabled', (!(that.editor.getSelection().length >0) || !that.isFormattable()));
            });
        },
        
        undo: function() {
            this.editor.undo();
        },
        
        redo: function() {
            this.editor.redo();
        },
        
        clearHistory : function() {
            this.editor.clearHistory();
        },
        
        setReadOnly: function() {        
            this.editor.setOption('readOnly', true);
            
            registry.byId('editorToolbarSave').set('disabled', true);
            registry.byId('editorToolbarUndo').set('disabled', true);
            registry.byId('editorToolbarRedo').set('disabled', true);
            
            registry.byId('editorFileSave').set('disabled', true);
            registry.byId('editorEditUndo').set('disabled', true);
            registry.byId('editorEditRedo').set('disabled', true);
        },
        
        getReadOnly: function() {
            return this.editor.getOption('readOnly');
        },
        
        clearSaveState: function() {
            this.saveState=false;
        },
        
        setTheme: function(theme) {
            this.editor.setOption("theme", theme);
            
            domClass.toggle(theme, "menu_selected");
            
            if(!!this.currTheme) {
                domClass.toggle(this.currTheme, "menu_selected");
                net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.editorTheme, theme);
            }
            
            if(registry.byId('editorThemeSelector').get('value')!=theme) {
                registry.byId('editorThemeSelector').set('value', theme);
            }
            
            this.currTheme=theme;
        },
        
        setMode: function(mode) {
            this.editor.setOption("mode", this.modes[mode]);
            
            domClass.toggle(mode, "menu_selected");
            
            if(!!this.currMode) {
                domClass.toggle(this.currMode, "menu_selected");
            }
            
            if(registry.byId('editorModeSelector').get('value')!=mode) {
                registry.byId('editorModeSelector').set('value', mode);
            }
            
            //Set Mode specific options
            
            /*automatic tag closing*/
            if(mode=='html'|| mode=='xml' || mode=='php') {
                this.editor.setOption('extraKeys', {
                    "'>'": function(cm) { cm.closeTag(cm, '>'); },
                    "'/'": function(cm) { cm.closeTag(cm, '/'); }
                });
            } else {
                this.editor.setOption('extraKeys', null);
            }
            
            /* code Folding */
            if(mode=='html'|| mode=='xml') {
                 var foldFunc = CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
                 this.editor.setOption('onGutterClick', foldFunc);
            }
            else if(mode=='php' || mode=='css' || mode=='javascript' || mode=='json') {
                 var foldFunc = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
                 this.editor.setOption('onGutterClick', foldFunc);
            }
            else {
                 this.editor.setOption('onGutterClick', null);
            }
            
            this.currMode=mode;
        },
        
        showTabs: function() {
            domClass.add('editorEditShowTabs', "menu_selected");
            domClass.remove('editorEditHideTabs', "menu_selected");
            query('link[title=tabs_sheet]')[0].disabled=false;
            
            if(this.tabsShown==false) {
                net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.showTabs, 'true');
            }
            
            this.tabsShown=true;
        },
        
        hideTabs: function() {
            domClass.remove('editorEditShowTabs', "menu_selected");
            domClass.add('editorEditHideTabs', "menu_selected");
            query('link[title=tabs_sheet]')[0].disabled=true;
            
            if(this.tabsShown==true) {
                net.apachegui.Settings.getInstance().setSetting(net.apachegui.Settings.getInstance().settingsMap.showTabs, 'false');
            }
            
            this.tabsShown=false;
        },
        
        toggleTabs: function() {
            if(this.tabsShown==false) {
                this.showTabs();
            } else {
                this.hideTabs();
            }
        },
        
        isTabsShown: function() {
            return this.tabsShown;
        },
        
        getSelectedRange: function() {
            return { from: this.editor.getCursor(true), to: this.editor.getCursor(false) };
        },
          
        autoFormatSelection: function() {
            var range = this.getSelectedRange();
            this.editor.autoFormatRange(range.from, range.to);
        },
          
        commentSelection: function() {
            var range = this.getSelectedRange();
            this.editor.commentRange(true, range.from, range.to);
        },
        
        unCommentSelection: function() {
            var range = this.getSelectedRange();
            this.editor.commentRange(false, range.from, range.to);
        },
        
        isFormattable: function() {
            return (this.currMode=='html'|| this.currMode=='xml' || this.currMode=='css' || this.currMode=='javascript' || this.currMode=='json');
        },
        
        newFile: function () {
            registry.byId('editorNewFileDialog').show();
        },
        
        newFileSubmit: function () {
            var file=net.apachegui.Util.getQueryParam('file').substring(0, net.apachegui.Util.getQueryParam('file').lastIndexOf("/")) + '/' + dom.byId('editorNewFileFilename').value;
            
            var type='file';
            request.post("../web/Menu", {
                data:     {
                    option: 'newFile',
                    filename: file,
                    type: type
                },
                handleAs: 'text',
                sync: true
            }).response.then(function(response) {
                
                var data = response.data;
                
                var status = response.status;
                if(status!=200) {
                    net.apachegui.Util.alert('Error',data);
                }
                else
                {
                    //goto new file
                    window.open(window.location.href.substring(0, window.location.href.indexOf('?')) + '?file=' + file);
                    
                    net.apachegui.Menu.getInstance().refresh();
                    
                    registry.byId('editorNewFileDialog').hide();
                }    
            });
        },
        
        setEditorFromFile: function (url, file, callback) {
            var that = this;
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Loading File Please Wait...');
            thisdialog.show();
            
            request.get(url, {
                query:     {
                    option: 'getFileAsString',
                    file: file
                },
                handleAs: 'text',
                preventCache: true,
                sync: false
            }).response.then(
                function(response) {
                    var data = response.data;
            
                    that.setValue(data);
                    that.clearHistory();
                    that.clearSaveState();
                    that.setToolbarFades();
                    
                    dom.byId('filename_container').innerHTML = '<em>File</em>: ' + file;
                    
                    if(!!callback) {
                        callback();
                    }
                    
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Error',error.response.data);
                }
            );
        },
        
        checkLastModifiedTime: function() {
            var that = this;
            
            var path=net.apachegui.Util.getQueryParam('file');
            
            net.apachegui.Main.getInstance().getLastModifiedTime(
                    path, 
                    function(response) {
                        var data = response.data;
                        
                        var time = parseInt(data.time);
                        if(time > that.getOpenTime()) {
                            that.setOpenTime(time);
                            
                            if(!that.reloadDialogOpen) {
                                
                                that.reloadDialogOpen = true;
                                net.apachegui.Util.confirmDialog("Reload", "This file has been modified outside of this editor. Would you like to reload?", function confirm(conf) {
                                    if(conf) {
                                        window.location.reload();
                                    } else {
                                        that.reloadDialogOpen = false;
                                    }
                                });
                            }
                        }
                    }, 
                    function(error) {
                        net.apachegui.Util.alert('Error',error.response.data.message);
                });
        },
        
        addListeners: function() {
            var that=this;
                        
            on(registry.byId("editorFileMenu"), "open", function() {
                that.setFileFades();
            });
            
            on(registry.byId("editorEditMenu"), "open", function() {
                that.setEditFades();
            });
            
            on(registry.byId('editorFileSave'), "click", function() {
                that.save();
            });
            
            on(registry.byId('editorFileNew'), "click", function() { 
                that.newFile();
            });
            
            on(registry.byId('editorNewFileCancel'), "click", function() {
                registry.byId('editorNewFileDialog').hide();
            });
            
            on(registry.byId('editorNewFileForm'), "submit", function(e) {
                event.stop(e); // prevent the default submit
                if (!this.isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
    
                that.newFileSubmit();
            });
            
            on(registry.byId('editorEditUndo'), "click", function() { 
                that.undo();
            });
            
            on(registry.byId('editorEditRedo'), "click", function() { 
                that.redo();
            });
            
            on(registry.byId('editorEditFind'), "click", function() {
                CodeMirror.commands.find(that.editor);
            });
            
            on(registry.byId('editorEditReplace'), "click", function() {
                CodeMirror.commands.replace(that.editor);
            });
            
            on(registry.byId('editorEditReplaceAll'), "click", function() {
                CodeMirror.commands.replaceAll(that.editor);
            });
            
            on(registry.byId('editorToolbarSave'), "click", function() { 
                that.save();
            });
            
            on(registry.byId('editorToolbarUndo'), "click", function() { 
                that.undo();
            });
                    
            on(registry.byId('editorToolbarRedo'), "click", function() { 
                that.redo();
            });
            
            /*Lookup commands*/
            query(".command").forEach(function(node){
                  var currId=node.id.toString();
                  dom.byId(currId).innerHTML=CodeMirror.keyMap.getCurrentKey(currId,'default');
            });
            
            /*Theme listeners */
            query(".editor_theme").forEach(function(node){
                  var currId=node.id.toString();
                  on(registry.byId(currId), "click", function() {
                        that.setTheme(currId);
                   });
            });
            
            on(registry.byId('editorThemeSelector'), "change", function() {
                that.setTheme(this.get('value'));
            });
            
            on(registry.byId('editorEditHideTabs'), "click", function() { 
                that.hideTabs();
            });
            
            on(registry.byId('editorEditShowTabs'), "click", function() { 
                that.showTabs();
            });
            
            on(registry.byId('editorToolbarTabs'), "click", function() { 
                that.toggleTabs();
            });
            
            /*Mode listeners */
            query(".editor_mode").forEach(function(node){
                  var currId=node.id.toString();
                  on(registry.byId(currId), "click", function() {
                        that.setMode(currId);
                   });
            });
            
            on(registry.byId('editorModeSelector'), "change", function() {
                that.setMode(this.get('value'));
            });
            
            /*Add confirmation if the user tries to close the window with unsaved data */
            on(window, "beforeunload", function(e) {
                if(that.saveState==true && net.apachegui.Main.getInstance().isSessionActive()) {
                    var msg = "You have not saved your changes. Please confirm that you want to leave this page.";
                    if (e) {
                        e.returnValue = msg;
                    }
                    
                    return msg;
                }
            });
            
            var unsupportedMessage='Sorry, this command is only supported for html, xml, css, json and javascript modes';
            
            CodeMirror.commands.autoFormat= function(){
                if(that.isFormattable()) {
                    that.autoFormatSelection();
                } else {
                    net.apachegui.Util.alert('Unsupported',unsupportedMessage);
                }
            };
            
            CodeMirror.commands.comment = function(){
                if(that.isFormattable()) {
                    that.commentSelection();
                } else {
                    net.apachegui.Util.alert('Unsupported',unsupportedMessage);
                }
            };
            
            CodeMirror.commands.unComment= function(){
                if(that.isFormattable()) {
                    that.unCommentSelection();
                } else {
                    net.apachegui.Util.alert('Unsupported',unsupportedMessage);
                }
            };
            
            on(registry.byId('editorEditAutoFormat'), "click", function(){
                CodeMirror.commands.autoFormat(that.editor);
            });
            
            on(registry.byId('editorEditComment'), "click", function(){
                CodeMirror.commands.comment(that.editor);
            });
            
            on(registry.byId('editorEditUnComment'), "click", function(){
                CodeMirror.commands.unComment(that.editor);
            });
            
        }
    });
    
});    