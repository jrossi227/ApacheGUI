define([ "dojo/_base/declare",
         "dijit/Tree",
         "dojo/_base/kernel",
         "dojo/_base/lang"
], function(declare, Tree, dojo, lang){	
 	
 	return declare("net.apachegui.RefreshableTree", [dijit.Tree], {	
		_reloadPaths: null, 
		_reloadOnLoadConnect: null, 
		
		onLoad: function(){
			this.inherited(arguments);
		},
		
		_destroy: function(){
			if(this._curSearch){
				clearTimeout(this._curSearch.timer);
				delete this._curSearch;
			}
			if(this.rootNode){
				this.rootNode.destroyRecursive();
			}
			if(this.dndController && !lang.isString(this.dndController)){
				this.dndController.destroy();
			}
			this.rootNode = null;
		},
		
		reload: function () {
			
			/* reset tree: */
			this._destroy();
			this.dndController = "dijit.tree._dndSelector";
			
			if (dojox && dojox.rpc && dojox.rpc.Rest && dojox.rpc.Rest._index) {
				for (idx in dojox.rpc.Rest._index) {
					if (idx.match("^" + this.model.store.target)) {
						delete dojox.rpc.Rest._index[idx];
					}
				};
			}
	
			// reset the tree.model's root
			this.model.constructor({
				rootId: 'apacheRoot',
				rootLabel: 'Apache'
			});
			
			// rebuild the tree
			this.postMixInProperties();
			this.postCreate();
		} 
	});
});	
