define([ "dojo/_base/declare",
         "dijit/TitlePane",
         "dojo/_base/kernel",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dijit/registry"
], function(declare, TitlePane, dojo, lang, array, registry){ 
    
   
    return declare("net.apachegui.TitlePane", [dijit.TitlePane], {
        toggle : function() {                                                                                                                                                                                                                                                        
            this.inherited(arguments);     
            
            if(this.open) {
                array.forEach(registry.findWidgets(this.domNode), function(w) {
                    if(w.resize) {
                        w.resize();
                    }
                });
            }
        }    
            
    });
    
});    
