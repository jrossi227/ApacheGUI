define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/dom-style",
         "dojo/request/script",
         "dojo/on",
         "dojo/keys"
], function(declare, dom, domStyle, script, on, keys){    
     
     return declare(null, {    
         
         initialized: false,
         isShown: false,
         onShow: null,
         onHide: null,
         
         constructor: function(obj) {
            var that = this;

            //initialize
            var version = obj.version; 
            this.onShow = obj.onShow || function(){};
            this.onHide = obj.onHide || function(){};
            
            if (!!net.apachegui.AutoSuggest) {
                this.initialized = true;
            } else {
                var url = '/ApacheGUI/manual/auto_suggest_' + version.replace('.', '') + '.min.js';
                script.get(url).then(function() {
                    that.initialized = true;
                });
            }

            this.addListeners();
         },
         
         show: function(xpos, ypos) {
             domStyle.set('autoSuggestContainer','top',ypos + 'px');
             domStyle.set('autoSuggestContainer','left',xpos + 'px');
             domStyle.set('autoSuggestContainer','display','block');
             
             this.onShow();
             this.isShown = true;
         },
         
         hide: function() {
             domStyle.set('autoSuggestContainer','display','none');
             
             this.onHide();
             this.isShown = false;
         },
         
         updateSuggestions: function(line, cursorCharNum, xpos, ypos) {
             if(!this.initialized) {
                 return;
             }
                          
             var obj = null;
             //if the next character isn't whitespace dont show suggestions
             if(line.length == cursorCharNum || (line.length > cursorCharNum && /\s/m.test(line[cursorCharNum]))) {
                 var directivePatten = /^(\s*\w+)$/m;
                 var enclosurePattern = /^(\s*<\s*\w+)$/m;

                 line = line.substring(0, cursorCharNum);
                 if(directivePatten.test(line)) {
                     obj = net.apachegui.AutoSuggest.DIRECTIVETREE;
                 }
                 if(enclosurePattern.test(line)) {
                     obj = net.apachegui.AutoSuggest.ENCLOSURETREE;
                 }
             }
             
             if(!!obj) {
                 line = line.trim().toLowerCase().replace('<','');
                 for(var i=0; i<line.length; i++) {
                     if(!!obj[line[i]]) {
                         obj = obj[line[i]];
                     } else {
                         obj = {};
                         break;
                     }
                 }
                 
                 if(!!obj.items) {
                     var list ='';
                     var items = obj.items;
                     for(var i=0; i<items.length; i++) {
                         list += '<li data-value="' + items[i] + '">' + items[i] + '</li>'
                     }
                     dom.byId('autoSuggestKeywordList').innerHTML = list;
                     
                     this.show(xpos, ypos);
                 } else {
                     this.hide();
                 }
             } else {
                 this.hide();
             }
         },
         
         addListeners: function() {
             var that = this;
             
             on(dom.byId('autoSuggestContainer'),'click', function(e) {
                e.stopPropagation(); 
             });
             
             on(document, 'click', function() {
                 domStyle.set('autoSuggestContainer','display','none');
             });
             
             on(document, "keyup", function(event) {
                if(!that.isShown) {
                    return;
                }
                 
                switch (event.keyCode) {
                case keys.UP_ARROW:
                    event.preventDefault();
                    
                    //check if selected else close
                    
                    console.log("up arrow has been pressed");
                    break;
                case keys.DOWN_ARROW:
                    event.preventDefault();
                    
                    console.log("down arrow has been pressed");
                    break;
                case keys.RIGHT_ARROW:
                    event.preventDefault();
                    
                    console.log("right arrow has been pressed");
                    break;
                case keys.LEFT_ARROW:
                    event.preventDefault();
                    
                    console.log("left arrow has been pressed");
                    break;    
                
                }
            });
             
             
         }
         
     });
     
});     