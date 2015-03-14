define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/dom-style",
         "dojo/request/script",
         "dojo/on",
         "dojo/keys",
         "dojo/dom-class",
         "dojo/query"
], function(declare, dom, domStyle, script, on, keys, domClass, query){    
     
     return declare(null, {    
         
         initialized: false,
         isShown: false,
         onShow: null,
         onHide: null,
         selectedItem: -1,
         
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
             this.updatePosition(xpos,ypos);
             if(!this.isShown) {
                 domStyle.set('autoSuggestContainer','display','block');
                 
                 this.onShow();
                 this.isShown = true;
             }
         },
         
         updatePosition: function(xpos, ypos) {
             //position either above or below line
             var windowHeight = window.innerHeight;
             if((windowHeight / 2) > ypos) {
                 domStyle.set('autoSuggestContainer','bottom','auto');
                 domStyle.set('autoSuggestContainer','top',ypos + 'px');
                 domStyle.set('autoSuggestContainer','left',xpos + 'px');
             } else {
                 domStyle.set('autoSuggestContainer','top','auto');
                 domStyle.set('autoSuggestContainer','bottom',(windowHeight - ypos) + 'px');
                 domStyle.set('autoSuggestContainer','left',xpos + 'px');
             }
             
         },
         
         hide: function() {
             if(this.isShown) {
                 domStyle.set('autoSuggestContainer','display','none');
                 
                 this.onHide();
                 this.isShown = false;
             }
         },
         
         selectItem: function(item) {
             this.selectedItem = item;
             
             query('li', dom.byId('autoSuggestKeywordList')).removeClass('selected');
             if(item > -1) {
                 domClass.add(query('li', dom.byId('autoSuggestKeywordList'))[item],'selected');
                 domStyle.set('autoSuggestDescriptionContainer','display','block');
             } else {
                 domStyle.set('autoSuggestDescriptionContainer','display','none');
             }
         },
         
         buildKeywordList: function(items) {
             var list ='';
             for(var i=0; i<items.length; i++) {
                 list += '<li data-value="' + items[i] + '">' + items[i] + '</li>'
             }
             
             return list;
         },
         
         buildDescriptionContainer: function(item) {
             
         },
         
         updateSuggestions: function(line, cursorCharNum, xpos, ypos) {
             if(!this.initialized) {
                 return;
             }
              
             this.selectedItem = -1;
             
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
                     dom.byId('autoSuggestKeywordList').innerHTML = this.buildKeywordList(obj.items);
                     
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
                 that.hide();
             });
             
             on(document, "keyup", function(event) {
                if(!that.isShown) {
                    return;
                }
                 
                switch (event.keyCode) {
                case keys.UP_ARROW:
                    event.preventDefault();
                    
                    if(that.selectedItem > -1) {
                        that.selectItem(that.selectedItem -1);                        
                    } else {
                        that.hide();
                    } 
                 
                    break;
                case keys.DOWN_ARROW:
                    event.preventDefault();
                    
                    var numOfItems = query('li', dom.byId('autoSuggestKeywordList')).length;
                    if(that.selectedItem < (numOfItems-1)) {
                        that.selectItem(that.selectedItem + 1);     
                    }    
                    
                    break;
                case keys.RIGHT_ARROW:
                    event.preventDefault();
                    
                    break;
                case keys.LEFT_ARROW:
                    event.preventDefault();
                    
                    break;    
                
                }
            });
             
             
         }
         
     });
     
});     