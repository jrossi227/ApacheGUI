define([ "dojo/_base/declare",
         "dijit/Dialog",
         "dojo/dom-style",
         "dojo/keys"
], function(declare, Dialog, domStyle, keys){	
 	
 	declare("ca.apachegui.NoCloseDialog", [dijit.Dialog], {	
 
    	// summary:
    	// extended version of the dojo Dialog widget with the option to disable
    	// the close button and supress the escape key.
     
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
    	
    	remove: function() 
    	{
    		this.hide();
			this.destroyRecursive();
    	}
    });
 });