define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/on",
         "dojo/keys",
         "dojo/dom-geometry",
         "dojo/dom-attr",
         "net/apachegui/AutoSuggest"
], function(declare, dom, on, keys, domGeom, domAttr, AutoSuggest) {
    
    return declare(null, {    
        
        autoSuggest: null,
        input: null,
        
        constructor: function(input) {
            this.input = input;
            
            this.loadAutoSuggest();
            this.addListeners();
        },
        
        loadAutoSuggest: function() {
            var that = this;
            
            this.autoSuggest = new AutoSuggest({
                onShow: function() {
                    
                },
                onHide: function() {
                    
                },
                onHighlight: function(name) {
                    that.input.focus();
                },
                onSelect: function(name) {
                    that.input.value = name;
                    that.input.focus();
                }
            });
        },    
        
        updateAutoSuggest: function() {
            if (!!this.autoSuggest) {
                var position = domGeom.position(this.input);
                var xpos = position.x;
                var ypos = position.y;
                
                var windowHeight = window.innerHeight;
                if(ypos < (windowHeight / 2)) {
                    ypos += this.input.offsetHeight;
                }
                
                var value = this.input.value;
                var start = this.input.selectionStart;
                if(domAttr.get(this.input, "data-type") == 'enclosure') {
                    value = '<' + value;
                    start ++;
                }
                this.autoSuggest.updateSuggestions(value, start, xpos, ypos);
            }
        },
        
        addListeners: function() {
            var that = this;
            
            on(this.input, 'keyup', function(e) {
                switch (e.keyCode) {
                case keys.UP_ARROW:
                case keys.DOWN_ARROW:
                case keys.RIGHT_ARROW:
                case keys.LEFT_ARROW:
                case keys.ENTER:    
                    break;    
                default:
                    that.updateAutoSuggest();
                    break;
                }
                
            });
            
        }
        
    });
    
});