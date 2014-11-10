var ca = (ca || {});
ca.apachegui = (ca.apachegui || {});

require([ "dojo/_base/window",
          "dijit/Dialog",
          "dijit/form/Button",
          "ca/apachegui/NoCloseDialog"
], function(win, Dialog, Button, NoCloseDialog){	
	ca.apachegui.Util = (function() {
		
		return {
			alert: function(txtTitle, txtContent){
				var thisdialog = new Dialog({ title: txtTitle, content: txtContent});
				
				var div = document.createElement('div');
				div.className='dijitDialogPaneActionBar';
				
				var okButton = new Button({ label: 'OK', onClick: function(){
					thisdialog.hide().then(function(){ 
					    thisdialog.destroyRecursive(); 
					});
				}});
				
				thisdialog.containerNode.appendChild(div);
				div.appendChild(okButton.domNode);
				
				thisdialog.show();
			},
			
			confirmDialog: function(title, question, callbackFn) {
	
				var errorDialog = new NoCloseDialog({ title: title, content: question});
				
				var div = document.createElement('div');
				div.className='dijitDialogPaneActionBar';
				
				var yesButton = new Button({ label: 'Yes', onClick: function(){
					callbackFn(true);
					errorDialog.remove();
				}});
				
				
				var noButton = new Button({ label: 'No', onClick: function(){
					callbackFn(false);
					errorDialog.remove();
				}});
				
				errorDialog.containerNode.appendChild(div);
				div.appendChild(yesButton.domNode);
				div.appendChild(noButton.domNode);
				errorDialog.show();
			},
			
			getQueryParam: function (name) {
				name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
				var regexS = "[\\?&]" + name + "=([^&#]*)";
				var regex = new RegExp(regexS);
				var results = regex.exec(window.location.search);
				if(results == null)
				  return "";
				else
				  return decodeURIComponent(results[1].replace(/\+/g, " "));
			},
			
			noCloseDialog: function(title, content) {
				var thisdialog = new NoCloseDialog({ title: title, content: content});
				
				return thisdialog;
			}
		};
		
	})();
});
