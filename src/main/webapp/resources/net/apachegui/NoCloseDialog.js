define([ "dojo/_base/declare",
         "dijit/Dialog",
         "dojo/dom-style",
         "dojo/keys"
], function(declare, Dialog, domStyle, keys){    
     
     return declare("net.apachegui.NoCloseDialog", [dijit.Dialog], {    
 
        // summary:
        // extended version of the dojo Dialog widget with the option to disable
        // the close button and supress the escape key.
         showing: false,
         isShown: false,
        disableCloseButton: true,
     
        /* *********************************************************** postCreate */
        postCreate: function()
        {
            this.inherited(arguments);
            this._updateCloseButtonState();
        },
     
        /* *************************************************************** _onKey */
        _onKey: function(evt)
        {
            if(this.disableCloseButton && evt.charOrCode == keys.ESCAPE) return;
            this.inherited(arguments);
        },
     
        /* ************************************************ setCloseButtonDisabled*/
        setCloseButtonDisabled: function(flag)
        {
            this.disableCloseButton = flag;
            this._updateCloseButtonState();
        },
     
        /* ********************************************** _updateCloseButtonState */
        _updateCloseButtonState: function()
        {
            domStyle.set(this.closeButtonNode,"display",this.disableCloseButton ? "none" : "block");
        },
        
        /* ********************************************** show */
        show: function() {
            var that = this;
                        
            this.showing = true;
            this.inherited(arguments).then(function() {
                that.isShown = true;
            });
        },
        
        /* ********************************************** remove */
        remove: function() 
        {            
            this._removeIfShown();
        },
        
        /* ********************************************** _removeIfShown */
        _removeIfShown: function() {
            var that = this;
                     
            if(!this.isShown && this.showing) {
                setTimeout(this._removeIfShown.bind(this),100);
            } else {
                this.hide().then(function() { 
                    that.destroyRecursive(); 
                });
            }
        }
    });
 });