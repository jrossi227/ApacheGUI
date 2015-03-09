define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/dom-style",
         "dojo/request/script",
         "dojo/on"
], function(declare, dom, domStyle, script, on){    
     
     return declare(null, {    
         
         initialized: false,
         
         constructor: function(version) {
             var that = this;

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
         
         updateSuggestions: function(line, xpos, ypos) {
             if(!this.initialized) {
                 return;
             }
             
             var directivePatten = /^(\s*\w+)$/m;
             var enclosurePattern = /^(\s*<\s*\w+)$/m;

             var obj = null;
             if(directivePatten.test(line)) {
                 obj = net.apachegui.AutoSuggest.DIRECTIVETREE;
             }
             if(enclosurePattern.test(line)) {
                 obj = net.apachegui.AutoSuggest.ENCLOSURETREE;
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
                     
                     domStyle.set('autoSuggestContainer','top',ypos + 'px');
                     domStyle.set('autoSuggestContainer','left',xpos + 'px');
                     domStyle.set('autoSuggestContainer','display','block');
                 } else {
                     domStyle.set('autoSuggestContainer','display','none');
                 }
             }
         },
         
         addListeners: function() {
             on(dom.byId('autoSuggestContainer'),'click', function(e) {
                e.stopPropagation(); 
             });
             
             on(document, 'click', function() {
                 domStyle.set('autoSuggestContainer','display','none');
             });
         }
         
     });
     
});     