define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/array", 
         "dojo/data/ItemFileWriteStore"
], function(declare, dom, registry, on, request, array, ItemFileWriteStore){
    
    declare("net.apachegui.globalsettings.Modules", null, {

        currentSharedModulesMenuId: "",
        currentSharedModulesRow: "",
        markedSharedModules: new Array(),
        currentAvailableModulesMenuId: "",
        currentAvailableModulesRow: "",
        initialized: false,
        
        init: function () {
            if(this.initialized===false) {
                var sharedMenu = registry.byId("sharedModules_menu");
                // when we right-click anywhere on the grid, make sure we open the menu
                sharedMenu.bindDomNode(sharedModulesGrid.domNode);
            
                var availableMenu = registry.byId("availableModules_menu");
                // when we right-click anywhere on the grid, make sure we open the menu
                availableMenu.bindDomNode(availableModulesGrid.domNode);
            
                this.addListeners();
                
                this.initialized=true;
            }
        },
        
        setCurrentSharedModulesMenuId: function(id) {
            this.currentSharedModulesMenuId=id.toString();
        },
        
        setCurrentSharedModulesRow:function (row) {
            this.currentSharedModulesRow=row;
        },
        
        getMarkedSharedModules: function() {
            return this.markedSharedModules;
        },
        
        getMarkedAvailableModules: function() {
            return this.markedAvailableModules;
        },
        
        markForRemoval:function () {
            if(this.markedSharedModules.indexOf(this.currentSharedModulesMenuId)==-1) {
                this.markedSharedModules.push(this.currentSharedModulesMenuId);
            }    
            
            sharedModulesStore.setValue(sharedModulesGrid.getItem(this.currentSharedModulesRow), "status", "Marked For Removal");
            if (sharedModulesStore.isDirty()) {
                sharedModulesStore.save();
            }
        },
        
        removeSharedModules: function() {
            var that=this;
            
            var mods=new Object();
            mods.option='removeSharedModules';
            mods.sharedModules='';
            var i=0;
            for(i=0;i<this.markedSharedModules.length; i++)
            {
                mods.sharedModules=mods.sharedModules + this.markedSharedModules[i];
                
                if(i!=(this.markedSharedModules.length-1)) {
                    mods.sharedModules=mods.sharedModules + ':';
                }    
            }    
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
            thisdialog.show();
            
            request.post("../web/Modules", {
                data:     mods,
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                    
                    that.refreshAll();
                    
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
        },
        
        refreshSharedModules: function() {
            sharedModulesStore = new ItemFileWriteStore({url: '../web/Modules?option=shared', urlPreventCache: true});
            sharedModulesGrid.setStore(sharedModulesStore);
            this.markedSharedModules=new Array();
        },
        
        setCurrentAvailableModulesMenuId: function(id) {
            this.currentAvailableModulesMenuId=id.toString();
        },
        
        setCurrentAvailableModulesRow:function (row) {
            this.currentAvailableModulesRow=row;
        },
        
        showLoadDirective:function () {
            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Please Wait...');
            thisdialog.show();
            
            request.get("../web/Modules", {
                query: {
                    option: 'getLoadDirective',
                    name: this.currentAvailableModulesMenuId
                },
                handleAs: 'json',
                sync: false,
                preventCache: true
            }).response.then(function(response) {
                
                var data = response.data;
            
                net.apachegui.Util.alert('Load Directive', 'To use this module add the following directive to your apache configuration:<br/>' +
                                                          '<span style="font-weight:bold;">' + data.directive + '</span>');    
                
                thisdialog.remove();
            },
            function(error) {
                thisdialog.remove();
                net.apachegui.Util.alert('Error',error.response.data.message);
            });
        },
        
        refreshAvailableModules: function() {
            availableModulesStore = new ItemFileWriteStore({url: '../web/Modules?option=available', urlPreventCache: true});
            availableModulesGrid.setStore(availableModulesStore);
            this.markedAvailableModules=new Array();
        },
        
        refreshAll: function () {
            this.refreshSharedModules();
            this.refreshAvailableModules();
        },
        
        addListeners: function () {
            var that=this;
            
            on(registry.byId('sharedModulesMenuItem'), "click", function() {
                that.markForRemoval();
            });
            
            on(registry.byId('availableModulesMenuItem'), "click", function() {
                that.showLoadDirective();
            });
            
            on(registry.byId('removalButton'), "click", function(){
                if(that.getMarkedSharedModules().length==0)
                {
                    net.apachegui.Util.alert("Nothing Selected","You have not selected any shared modules for removal.<br/>To select a module right click and select \"Mark For Removal\".");
                }
                else
                {
                    net.apachegui.Util.confirmDialog("Please Confirm", "Are you sure you want to remove all marked modules?",function confirm(conf){
                        if(conf)
                        {
                            that.removeSharedModules();
                        }
                    });
                }
            });
            
            on(registry.byId('resetRemovalButton'), "click", function() {
                that.refreshSharedModules();
            });
            
            sharedModulesGrid.onRowContextMenu= function(e) {    
                var item = sharedModulesGrid.getItem(e.rowIndex);
                that.setCurrentSharedModulesRow(e.rowIndex); 
                array.forEach(sharedModulesGrid.store.getAttributes(item), function(attribute) {
                    var id = sharedModulesGrid.store.getValues(item, attribute);
                    if(attribute=='id')
                    {      
                        that.setCurrentSharedModulesMenuId(id); 
                    }
                });
            };
            
            on(registry.byId('resetAvailableButton'), "click", function() {
                that.refreshAvailableModules();
            });
            
            availableModulesGrid.onRowContextMenu= function(e) {    
                var item = availableModulesGrid.getItem(e.rowIndex);
                that.setCurrentAvailableModulesRow(e.rowIndex); 
                array.forEach(availableModulesGrid.store.getAttributes(item), function(attribute) {
                    var id = availableModulesGrid.store.getValues(item, attribute);
                    if(attribute=='id')
                    {      
                        that.setCurrentAvailableModulesMenuId(id); 
                    }
                });    
            };
        } 
    });
    
    net.apachegui.globalsettings.Modules.currentModules=null;
    //used globally to grab instance
    net.apachegui.globalsettings.Modules.getInstance = function() {
        if(!net.apachegui.globalsettings.Modules.currentModules) {
            net.apachegui.globalsettings.Modules.currentModules=new net.apachegui.globalsettings.Modules();
        }
        
        return net.apachegui.globalsettings.Modules.currentModules;
    };
    
});    
