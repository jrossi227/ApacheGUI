// Open simple dialogs on top of an editor. Relies on dialog.css.

(function() {
  function dialogDiv(cm, template) {
    var wrap = $('#searchPane');
    var dialog = document.createElement("div");
    dialog.className = "CodeMirror-dialog";
    dialog.innerHTML = '<div>' + template + '</div>';
    wrap.empty();
    wrap.append(dialog);
    wrap.draggable();
    return dialog;
  }

  CodeMirror.defineExtension("openDialog", function(template, callback) {
    var currQuery='';
    var updatedQuery='';
	var init=false;
	var dialog = dialogDiv(this, template);
    var closed = false, me = this;
    function close() {
      if (closed) return;
      closed = true;
      dialog.parentNode.removeChild(dialog);
      CodeMirror.commands.clearSearch(me);
      me.focus();
    }
    var inp = dialog.getElementsByTagName("input")[0], button;
    if (inp) {
    	CodeMirror.connect(inp, "keydown", function(e) {
    		currQuery=inp.value;
      });
      inp.focus();
      
      var closeButton = $(dialog).find('.closeButton').get(0);
      if(closeButton) {
    	  CodeMirror.connect(closeButton, "click", close);
      }
      
      var searchNextButton = $(dialog).find('.searchNextButton').get(0);
      if(searchNextButton) {
    	  CodeMirror.connect(searchNextButton, "click", function() {
    		  if(currQuery!=updatedQuery) {
    			  init=false;
    			  updatedQuery=currQuery;
    			  CodeMirror.commands.clearSearch(me);
    		  }
    		  
    		  if(init==false) {
    			  callback(inp.value);
    			  init=true;
    		  } else {
    			  if(currQuery=='') {
        			  return;
        		  }
    			  CodeMirror.commands.findNext(me);
    		  }
    	});
    	  
    	CodeMirror.connect(inp, "keydown", function(e) {
    		if (e.keyCode == 13) {
    			searchNextButton.click();
    		}
        });  
      }	
      
      var searchPreviousButton = $(dialog).find('.searchPreviousButton').get(0);
      if(searchPreviousButton) {
    	  CodeMirror.connect(searchPreviousButton, "click", function() {
    		  if(currQuery!=updatedQuery) {
    			  init=false;
    			  updatedQuery=currQuery;
    			  CodeMirror.commands.clearSearch(me);
    		  }
    		  
    		  if(init==false) {
    			  callback(inp.value);
    			  init=true;
    		  } else {
    			  if(currQuery=='') {
        			  return;
        		  }
    			  CodeMirror.commands.findPrev(me);
    		  }
    	  });
      }	
      
      var replaceNextButton = $(dialog).find('.replaceNextButton').get(0);
      if(replaceNextButton) {
    	  CodeMirror.connect(replaceNextButton, "click", function() {
    		  callback(inp.value); 
    	  });
    	  
    	  CodeMirror.connect(inp, "keydown", function(e) {
      		if (e.keyCode == 13) {
      			replaceNextButton.click();
      		}
          });
      }
      
      var replaceWithButton = $(dialog).find('.replaceWithButton').get(0);
      if(replaceWithButton) {
    	  CodeMirror.connect(replaceWithButton, "click", function() {
    		  callback(inp.value);  
    	  });
    	  
    	  CodeMirror.connect(inp, "keydown", function(e) {
        		if (e.keyCode == 13) {
        			replaceWithButton.click();
        		}
          });
      }
      
      var replaceAllButton = $(dialog).find('.replaceAllButton').get(0);
      if(replaceAllButton) {
    	  CodeMirror.connect(replaceAllButton, "click", function() {
    		  callback(inp.value);  
    	  });
    	  
    	  CodeMirror.connect(inp, "keydown", function(e) {
      		if (e.keyCode == 13) {
      			replaceAllButton.click();
      		}
          });
      }
      
    } else if (button = dialog.getElementsByTagName("button")[0]) {
      CodeMirror.connect(button, "click", function() {
        close();
        me.focus();
      });
      button.focus();
      CodeMirror.connect(button, "blur", close);
    }
    return close;
  });

  CodeMirror.defineExtension("openConfirm", function(template, callbacks) {
    var dialog = dialogDiv(this, template);
    var buttons = dialog.getElementsByTagName("button");
    var closed = false, me = this, blurring = 1;
    function close() {
      if (closed) return;
      closed = true;
      dialog.parentNode.removeChild(dialog);
      me.focus();
    }
    buttons[0].focus();
    for (var i = 0; i < buttons.length; ++i) {
      var b = buttons[i];
      (function(callback) {
        CodeMirror.connect(b, "click", function(e) {
          CodeMirror.e_preventDefault(e);
          close();
          if (callback) callback(me);
        });
      })(callbacks[i]);
      CodeMirror.connect(b, "blur", function() {
        --blurring;
        setTimeout(function() { if (blurring <= 0) close(); }, 200);
      });
      CodeMirror.connect(b, "focus", function() { ++blurring; });
    }
  });
})();