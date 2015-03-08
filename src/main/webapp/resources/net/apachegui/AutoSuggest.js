define([ "dojo/_base/declare",
         "dojo/request/script"
], function(declare, script){    
     
     return declare(null, {    
         
         constructor: function(version) {
             if(!!net.apachegui.AutoSuggest) {
                 return;
             }
             
             var url = '/ApacheGUI/manual/auto_suggest_' + version.replace('.','') + '.min.js';
             script.get(url); 
         },
         
         updateSuggestions: function(line, xpos, ypos) {
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
                     console.log(obj.items);
                 }
             }
         }
         
     });
     
});     