define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/on",
         "dojo/query",
         "net/apachegui/AutoSuggest"
], function(declare, dom, on, query, AutoSuggest){    

    return declare(null, {    
    
        editor: null,
        editorInstance: null,
        autoSuggest: null,
        
        constructor: function(editor, editorInstance) {
            var that = this;
            
            this.editor = editor;
            this.editorInstance = editorInstance;
            
            var onChange = this.editor.getOption('onChange');
            var newOnChange = function() {
                onChange();
                that.updateAutoSuggest();
            };
            this.editor.setOption('onChange',newOnChange);
            
            this.loadAutoSuggest();
            this.addListeners();
        },

        loadAutoSuggest: function() {
            var that = this;
            
            this.autoSuggest = new AutoSuggest({
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
            if (!!this.autoSuggest && this.editorInstance.getMode() == 'conf') {
               var cursorCoords = this.getCursorCoords();
               this.autoSuggest.updateSuggestions(this.editor.getLine(this.editor.getCursor().line), this.editor.getCursor().ch, cursorCoords.xpos, cursorCoords.ypos);
           }
        },
       
        addListeners : function() {
           var that = this;
           
           query('.CodeMirror-scroll').on('scroll', function() {
               if(!!that.autoSuggest) {
                   that.autoSuggest.hide();
               }
           });
       }    
    
    });
    
});