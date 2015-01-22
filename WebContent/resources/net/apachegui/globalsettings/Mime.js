define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/array", 
         "dojo/data/ItemFileWriteStore"
], function(declare, dom, registry, on, request, array, ItemFileWriteStore){
    
    declare("net.apachegui.globalsettings.Mime", null, {

        initialized: false,
        currentGlobalAddedMimesMenuId: null,
        
        init: function () {
            if(this.initialized===false) {
                this.addListeners();
                this.bindAddedMimesMenu();
                this.initialized=true;
            }
        },    
        
        setCurrentGlobalAddedMimesMenuId: function(id) {
            this.currentGlobalAddedMimesMenuId=id.toString();
        },
        
        bindAddedMimesMenu: function() {
            var menu = registry.byId("added_mimes_menu");
            // when we right-click anywhere on the grid, make sure we open the menu
            menu.bindDomNode(globalAddedMimesGrid.domNode);
        },
        
        resetAddedMimesGrid: function() {
            globalAddedMimesGridStore = new ItemFileWriteStore({url: '../web/Mime?option=addedMimes', urlPreventCache: true});
            globalAddedMimesGrid.setStore(globalAddedMimesGridStore);
        },
        
        addListeners: function () {
            var that=this;
            
            /** Mime listeners **/
            on(registry.byId('searchServerMimeTypeButton'), "click", function() {
                
                var searchTypeTerm=registry.byId('searchServerMimeTypeInput').get('value').trim();
                
                if(searchTypeTerm == '' ) {
                    net.apachegui.Util.alert("Error","You must enter a search term");
                    return;
                }
                
                globalServerMimesGrid.filter({
                    type: "*" + searchTypeTerm + "*"
                });
            });
            
            on(registry.byId('searchServerMimeExtensionsButton'), "click", function() {
                
                var searchExtensionsTerm=registry.byId('searchServerMimeExtensionsInput').get('value').trim();
                
                if(searchExtensionsTerm == '' ) {
                    net.apachegui.Util.alert("Error","You must enter a search term");
                    return;
                }
                
                globalServerMimesGrid.filter({
                    extensions: "*" + searchExtensionsTerm + "*"
                });
            });
            
            on(registry.byId('searchServerMimeResetButton'), "click", function() {
                globalServerMimesGrid.filter({
                    type: "*"
                });
                
                registry.byId('searchServerMimeTypeInput').reset();
                registry.byId('searchServerMimeExtensionsInput').reset();
            });
            
            globalAddedMimesGrid.onRowContextMenu= function(e) {    
                var item = globalAddedMimesGrid.getItem(e.rowIndex);
                array.forEach(globalAddedMimesGrid.store.getAttributes(item), function(attribute) {
                    var id = globalAddedMimesGrid.store.getValues(item, attribute);
                    if(attribute=='id')
                    {      
                        that.setCurrentGlobalAddedMimesMenuId(id); 
                    }
                 });
            }; 
             
            on(registry.byId('addMimeMenuItem'), "click", function() {
                registry.byId('addMimeDialog').show();
            });
            
            on(registry.byId('addMimeCloseButton'), "click", function() {
                registry.byId('addMimeDialog').hide();
            });
            
            on(registry.byId('addMimeSubmitButton'), "click", function() {
                var type=registry.byId('addMimeType').get('value').trim();
                var extensions=registry.byId('addMimeExtensions').get('value').trim();
                
                if(type == '') {
                    net.apachegui.Util.alert('Error','You must specify a type');
                    return;
                }
                
                if(extensions == '') {
                    net.apachegui.Util.alert('Error','You must specify an extension');
                    return;
                }
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Adding', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Mime", {
                    data:     {
                        option: 'addMime',
                        type: type,
                        extensions: extensions
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                    
                        that.resetAddedMimesGrid();
                        registry.byId('addMimeDialog').hide();
                        registry.byId('addMimeType').reset();
                        registry.byId('addMimeExtensions').reset();
                        
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
            });
            
            on(registry.byId('editMimeMenuItem'), "click", function() {
                var type='', extensions='';
                var item = globalAddedMimesGrid.getItem(that.currentGlobalAddedMimesMenuId);
                array.forEach(globalAddedMimesGrid.store.getAttributes(item), function(attribute) {
                    var attr = globalAddedMimesGrid.store.getValues(item, attribute);
                    if(attribute=='type')
                    {      
                        type=attr; 
                    }
                    
                    if(attribute=='extensions')
                    {      
                        extensions=attr; 
                    }
                 });
                
                dom.byId('editMimeType').innerHTML = type;
                registry.byId('editMimeExtensions').set('value',extensions);
                
                registry.byId('editMimeDialog').show();
            });
            
            on(registry.byId('editMimeCloseButton'), "click", function() {
                registry.byId('editMimeDialog').hide();
            });
            
            on(registry.byId('editMimeSubmitButton'), "click", function() {
                
                var type = dom.byId('editMimeType').innerHTML.trim();
                var extensions = registry.byId('editMimeExtensions').get('value').trim();
                
                if(type == '') {
                    net.apachegui.Util.alert('Error','You must specify a type');
                    return;
                }
                
                if(extensions == '') {
                    net.apachegui.Util.alert('Error','You must specify an extension');
                    return;
                }
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Mime", {
                    data:     {
                        option: 'editMime',
                        type: type,
                        extensions: extensions
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {

                        that.resetAddedMimesGrid();
                        registry.byId('editMimeDialog').hide();
                    
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
            });
            
            on(registry.byId('removeMimeMenuItem'), "click", function() {
                var type='', extensions='';
                var item = globalAddedMimesGrid.getItem(that.currentGlobalAddedMimesMenuId);
                array.forEach(globalAddedMimesGrid.store.getAttributes(item), function(attribute) {
                    var attr = globalAddedMimesGrid.store.getValues(item, attribute);
                    if(attribute=='type')
                    {      
                        type=attr; 
                    }
                    
                    if(attribute=='extensions')
                    {      
                        extensions=attr; 
                    }
                 });
                
                net.apachegui.Util.confirmDialog("Please Confirm", "Are you sure you want to delete the follwing MIME?<br/>" +
                        "<strong>Type</strong>: " + type + "<br/>" +
                        "<strong>Extensions</strong>: " + extensions + "<br/>",
                            function confirm(conf) {
                                if(conf)
                                {
                                    var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Please Wait...');
                                    thisdialog.show();
                                    
                                    request.post("../web/Mime", {
                                        data:     {
                                            option: 'removeMime',
                                            type: type,
                                            extensions: extensions
                                        },
                                        handleAs: 'json',
                                        sync: false
                                    }).response.then(
                                        function(response) {
                                        
                                            that.resetAddedMimesGrid();        
                                            
                                            thisdialog.remove();
                                        },
                                        function(error) {
                                            thisdialog.remove();
                                            net.apachegui.Util.alert('Error',error.response.data.message);
                                        }
                                    );
                                }
                        });
            });
        }
        
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.Mime);
    
});    