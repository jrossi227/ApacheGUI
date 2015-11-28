define([ "dojo/_base/declare"

], function(declare){
    
    declare("net.apachegui.globalsettings.GlobalTree", null, {

        initialized: false,

        init: function () {
            if(this.initialized===false) {
                this.addListeners();
                this.initialized=true;
            }
        },

        addListeners: function() {

        }

    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.GlobalTree);
    
});    
