define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/dom-style",
         "dojo/request/script",
         "dojo/on",
         "dojo/keys",
         "dojo/dom-class",
         "dojo/query",
         "dojo/dom-attr",
         "dojo/_base/event"
], function(declare, dom, domStyle, script, on, keys, domClass, query, domAttr, event){    
     
     return declare(null, {    
         
         initialized: false,
         isShown: false,
         onSelect: null,
         onShow: null,
         onHide: null,
         selectedItem: -1,
         
         constructor: function(obj) {
            var that = this;

            //initialize
            var version = obj.version; 
            this.onSelect = obj.onSelect || function() {};
            this.onHighlight = obj.onHighlight || function() {};
            this.onShow = obj.onShow || function(){};
            this.onHide = obj.onHide || function(){};
            this.id = 0;
            
            if (!!net.apachegui.AutoSuggest) {
                this.initialized = true;
            } else {
                var url = '/ApacheGUI/manual/auto_suggest_' + version.replace('.', '') + '.min.js';
                script.get(url).then(function() {
                    that.initialized = true;
                });
            }

            this.addToPage();
            this.addListeners();
         },
         
         getAutoSuggestContainer : function() {
             return dom.byId(this.id + '-' + 'autoSuggestContainer');
         },
         
         getAutoSuggestKeywordContainer : function() {
            return dom.byId(this.id + '-' + 'autoSuggestKeywordContainer'); 
         },
         
         getAutoSuggestDescriptionContainer: function() {
             return dom.byId(this.id + '-' + 'autoSuggestDescriptionContainer');
         },
         
         getAutoSuggestKeywordList : function() {
             return dom.byId(this.id + '-' + 'autoSuggestKeywordList');
         },
         
         addToPage: function() {
             //count the current amount of auto suggest
             this.id = query('.autoSuggestContainer').length;
             var div = document.createElement('div');
             div.id = this.id + '-autoSuggestContainer';
             
             domClass.add(div,'autoSuggestContainer');
             domStyle.set(div, 'display', 'none');
             
             div.innerHTML = '<div class="autoSuggestKeywordContainer" id="' + this.id + '-autoSuggestKeywordContainer">' +
             
                                 '<ul class="autoSuggestKeywordList" id="' + this.id + '-autoSuggestKeywordList">' +
                                     
                                 '</ul>' +
                             
                             '</div>' +
                             
                             '<div class="autoSuggestDescriptionContainer" id="' + this.id + '-autoSuggestDescriptionContainer" style="display: none;">' +
                             
                             '</div>';
             
             document.body.appendChild(div);                
         },
         
         show: function(xpos, ypos) {
             
             if(!this.isShown) {
                 domStyle.set(this.getAutoSuggestContainer(),'display','block');
                 this.updatePosition(xpos,ypos);
                 
                 this.onShow();
                 this.isShown = true;
             } 
             
             this.highlightItem(0);    
             this.updatePosition(xpos,ypos);
         },
         
         updatePosition: function(xpos, ypos) {
             var autoSuggestContainer = this.getAutoSuggestContainer();
             
             //position either above or below line
             var windowHeight = window.innerHeight;
             if((windowHeight / 2) > ypos) {
                 domStyle.set(autoSuggestContainer,'bottom','auto');
                 domStyle.set(autoSuggestContainer,'top',ypos + 'px');
             } else {
                 domStyle.set(autoSuggestContainer,'top','auto');
                 domStyle.set(autoSuggestContainer,'bottom',(windowHeight - ypos) + 'px');
             }
             
             // position either left or right
             var windowWidth = window.innerWidth;
             var keywordWidth = this.getAutoSuggestKeywordContainer().offsetWidth;
             
             var maxWidth = -10;
             if((windowWidth / 2) > xpos) {
                 domStyle.set(autoSuggestContainer,'left',xpos + 'px');
                 domStyle.set(autoSuggestContainer,'right','auto');
                 maxWidth += windowWidth - xpos - keywordWidth;
             } else {
                 domStyle.set(autoSuggestContainer,'left','auto');
                 domStyle.set(autoSuggestContainer,'right',(windowWidth - xpos) + 'px');
                 maxWidth += windowWidth - (windowWidth - xpos) - keywordWidth;
             }
             
             domStyle.set(this.getAutoSuggestDescriptionContainer(), 'max-width', maxWidth + 'px')
                          
         },
         
         hide: function() {
             if(this.isShown) {
                 domStyle.set(this.getAutoSuggestContainer(),'display','none');
                 
                 this.onHide();
                 this.isShown = false;
             }
         },
         
         getKeywordListItems: function() {
             return  query('li', this.getAutoSuggestKeywordList());
         },
         
         getNameFromListItem: function(item) {
             return domAttr.get(item, "data-value");
         },
         
         highlightItem: function(itemNum) {
             var keywords = this.getKeywordListItems();
             
             var numOfItems = keywords.length;
             if(itemNum < numOfItems && itemNum >= 0) {
                 this.selectedItem = itemNum;
                 
                 keywords.removeClass('selected');
                 domClass.add(keywords[itemNum],'selected');
                 var name = this.getNameFromListItem(keywords[itemNum]).toLowerCase();
                 
                 var item = net.apachegui.AutoSuggest.DIRECTIVES[name];
                 if(typeof item == 'undefined') {
                     item = net.apachegui.AutoSuggest.ENCLOSURES[name];
                 }
                 
                 var items = item['items'];
                 var html = '<div">' +
                                 '<div class="header">' + item.name + '</div>' +
                                 
                                 '<table>';
                                     for(var i=0; i<items.length; i++) {
                     html +=            '<tr>' +
                                            '<td class="name">' + items[i].name + '</td>' +
                                            '<td class="value">' + items[i].value + '</td>' +
                                         '</tr>';
                                     }
                     html +=     '</table>' +
                                 '<p class="manual_link"><a href="' + item.href + '" target="_blank">Full Description</a></p>' +
                            '</div>';
                 
                 var autoSuggestDescriptionContainer = this.getAutoSuggestDescriptionContainer();    
                     
                 autoSuggestDescriptionContainer.innerHTML = html;
                 
                 //populate description container
                 domStyle.set(autoSuggestDescriptionContainer,'display','inline-block');
                 
                 this.onHighlight(name);
             }
         },
         
         selectItem: function(itemNum) {
           
             var item = this.getKeywordListItems()[itemNum];
             var name = this.getNameFromListItem(item);
             
             this.onSelect(name);
             this.hide();
         },
         
         buildKeywordList: function(items) {
             var list ='';
             for(var i=0; i<items.length; i++) {
                 list += '<li data-index="' + i + '" data-value="' + items[i] + '">' + items[i] + '</li>'
             }
             
             return list;
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
                     this.getAutoSuggestKeywordList().innerHTML = this.buildKeywordList(obj.items);
                     
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
             
             on(this.getAutoSuggestContainer(),'click', function(e) {
                e.stopPropagation(); 
             });
             
             on(document, 'click', function() {
                 that.hide();
             });
             
             on(this.getAutoSuggestKeywordList(), "li:click", function() {
                 var index = parseInt(domAttr.get(this, "data-index"));
                 if(that.selectedItem != index) {
                     that.highlightItem(index); 
                 } else {
                     that.selectItem(index);
                 }
             });
             
             on(document, "keydown", function(e) {
                if(!that.isShown) {
                    return;
                }
                 
                switch (e.keyCode) {
                case keys.UP_ARROW:
                    event.stop(e);
                    that.highlightItem(that.selectedItem -1);                        
                    break;
                case keys.DOWN_ARROW:
                    event.stop(e);
                    that.highlightItem(that.selectedItem + 1);     
                    break;
                case keys.RIGHT_ARROW:
                    event.stop(e);
                    that.hide();
                    break;
                case keys.LEFT_ARROW:
                    event.stop(e);
                    that.hide();
                    break;    
                case keys.ENTER:
                    event.stop(e);
                    that.selectItem(that.selectedItem);
                    break;
                }
            });
             
             
         }
         
     });
     
});     