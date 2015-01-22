define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/json",
         "dojo/_base/event",
         "dojo/dom-geometry",
         "dojo/query",
         "dojo/dom-style"
], function(declare, dom, registry, on, request, json, event, domGeom, query, domStyle){
    
    declare("net.apachegui.Menu", null,{
    
        currentMenuId: null,
        fileBuffer: null,
        initialized: false,
        menuConnection:null,
        currWidth: 0,
        searchInterval: null,
        
        constructor: function() {
            this.currentMenuId=new String(''),
            this.fileBuffer=new Object();
        },
        
        init: function () {
            if(this.initialized===false) {
                this.addListeners();
                this.bindMenu();
                this.initialized=true;
            }
        },
        
        bindMenu: function () {            
            var menu = registry.byId("tree_menu");
            menu.selector = '.dijitTreeNode';
            // when we right-click anywhere on the tree, make sure we open the menu
            menu.bindDomNode(registry.byId("menuTree").domNode);
        },
        
        setCurrentMenuId: function(id) {
            this.currentMenuId=id.toString();
        },
        
        getCurrentMenuId: function() {
            return this.currentMenuId;
        },
        
        setMenuFades: function (tn) {
            registry.byId('renameMenuItem').set('disabled', false);
            registry.byId('newMenuItem').set('disabled', false);
            registry.byId('cutMenuItem').set('disabled', false);
            registry.byId('copyMenuItem').set('disabled', false);
            registry.byId('pasteMenuItem').set('disabled', false);
            registry.byId('deleteMenuItem').set('disabled', false);
            registry.byId('uploadMenuItem').set('disabled', false);
            registry.byId('downloadMenuItem').set('disabled', tn.item.children);
            registry.byId('searchMenuItem').set('disabled', !tn.item.children);
            registry.byId('newTabMenuItem').set('disabled', tn.item.children);
    
            
            if(this.currentMenuId.substring(0,14)=='Configuration-')
            {
                registry.byId('newMenuItem').set('disabled', !tn.item.children);
                registry.byId('pasteMenuItem').set('disabled', !tn.item.children);
                
                //Add paste disable logic here, should be a file in the buffer
                if(!this.fileBuffer.type || !this.fileBuffer.file)
                {
                    registry.byId('pasteMenuItem').set('disabled', true);
                }    
                
                registry.byId('uploadMenuItem').set('disabled', !tn.item.children);
                return;
            }
            if(this.currentMenuId.substring(0,10)=='Documents-')
            {
                registry.byId('newMenuItem').set('disabled', !tn.item.children);
                registry.byId('pasteMenuItem').set('disabled', !tn.item.children);
                
                //Add paste disable logic here, should be a file in the buffer
                if(!this.fileBuffer.type || !this.fileBuffer.file)
                {
                    registry.byId('pasteMenuItem').set('disabled', true);
                }    
                registry.byId('uploadMenuItem').set('disabled', !tn.item.children);
                return;
            }
            if(this.currentMenuId.substring(0,5)=='Logs-')
            {
                registry.byId('renameMenuItem').set('disabled', true);
                registry.byId('newMenuItem').set('disabled', true);
                registry.byId('cutMenuItem').set('disabled', true);
                registry.byId('copyMenuItem').set('disabled', true);
                registry.byId('pasteMenuItem').set('disabled', true);
                registry.byId('uploadMenuItem').set('disabled', true);
                registry.byId('deleteMenuItem').set('disabled', tn.item.children);
                return;
            }    
            
            registry.byId('renameMenuItem').set('disabled', true);
            registry.byId('newMenuItem').set('disabled', true);
            registry.byId('cutMenuItem').set('disabled', true);
            registry.byId('copyMenuItem').set('disabled', true);
            registry.byId('pasteMenuItem').set('disabled', true);
            registry.byId('uploadMenuItem').set('disabled', true);
            registry.byId('downloadMenuItem').set('disabled', true);
            registry.byId('searchMenuItem').set('disabled', true);
            registry.byId('deleteMenuItem').set('disabled', true);
        },
        
        rename: function () {
            //cant delete a file you are focused on
            //cant delete a file you are focused on
            if(this.currentMenuId==net.apachegui.Main.getInstance().getCurrentOption())
            {
                net.apachegui.Util.alert('Error','You can not rename a file that you are focused on');
                return;
            }
            
            dom.byId('renameFileOldFile').innerHTML=this.currentMenuId.substring(this.currentMenuId.lastIndexOf("/")+1);
            
            registry.byId('renameFileFilename').set('value','');
            
            registry.byId('renameFileDialog').show();
        },
        
        renameFileSubmit: function () {
            var that=this;
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Renaming', 'Renaming Please Wait...');
            thisdialog.show();
            
            request.post("../web/Menu", {
                data: {
                    option: 'renameFile',
                    oldFile: this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1),
                    newFile: (this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1,this.currentMenuId.lastIndexOf("/")+1) + dom.byId('renameFileFilename').value)
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                
                    //update menu here
                    registry.byId('renameFileDialog').hide();
                    that.refresh();    
                    
                    thisdialog.remove();
                },
                function(error) {
                    net.apachegui.Util.alert('Info',error.response.data.message);
                    thisdialog.remove();
                }
            );
        },
        
        newFile: function () {
            registry.byId('newFileDialog').show();
        },
        
        newFileSubmit: function () {
            var that=this;
            
            var type='file';
            if(dom.byId('newFileFileTypeDirectory').checked) {
                type='directory';
            }
            
            var thisdialog = net.apachegui.Util.noCloseDialog('New File', 'Creating New File Please Wait...');
            thisdialog.show();
            
            request.post("../web/Menu", {
                data: {
                    option: 'newFile',
                    filename: (this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1) + '/' + dom.byId('newFileFilename').value),
                    type: type
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                
                    //update menu here
                    registry.byId('newFileDialog').hide();
                    that.refresh();
                    
                    thisdialog.remove();
                },
                function(error) {
                    net.apachegui.Util.alert('Info',error.response.data.message);
                    thisdialog.remove();
                }
            );
        },
        
        cut: function () {
            this.fileBuffer.type='cut';
            this.fileBuffer.file=this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1);
        },
        
        copy: function () {
            this.fileBuffer.type='copy';
            this.fileBuffer.file=this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1);
        },
        
        paste: function () {
            var that=this;
            
            if(!this.fileBuffer.type || !this.fileBuffer.file) {
                return;
            }    
            var option=this.fileBuffer.type;
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Pasting', 'Pasting Please Wait...');
            thisdialog.show();
            
            request.post("../web/Menu", {
                data: {
                    option: option,
                    oldFile: this.fileBuffer.file, 
                    directory: this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1)
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                
                    //update menu here
                    that.fileBuffer=new Object();
                    that.refresh();    
                    
                    thisdialog.remove();
                },
                function(error) {
                    net.apachegui.Util.alert('Info',error.response.data.message);
                    thisdialog.remove();
                }
            );
        },
        
        deleteFile: function () {
            var that=this;
            
            net.apachegui.Util.confirmDialog('Confirm', 'Are you sure that you would like to delete ' + this.currentMenuId.substring(this.currentMenuId.indexOf("-")+1) + '?', function (confirm){
                    if(!confirm) {
                        return;
                    }
                    
                    var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Deleting Please Wait...');
                    thisdialog.show();
                
                    request.post("../web/Menu", {
                        data: {
                            option: 'deleteFile',
                            filename: that.currentMenuId.substring(that.currentMenuId.indexOf("-")+1)
                        },
                        handleAs: 'json',
                        sync: false
                    }).response.then(
                        function(response) {
                        
                            that.refresh();    
                            
                            thisdialog.remove();
                        },
                        function(error) {
                            net.apachegui.Util.alert('Info',error.response.data.message);
                            thisdialog.remove();
                        }
                    );
                    
                });
        },
        
        hideNewFile: function () {
            registry.byId('newFileDialog').hide();
        },
        
        hideRenameFile: function () {
            registry.byId('renameFileDialog').hide();
        },
        
        newTab: function () {
             if(this.isGUISettings(this.getCurrentMenuId()))
             {
                 window.open('GUISettings.jsp');
             }
             
             if(this.isHistory(this.getCurrentMenuId()))
             {
                 window.open('History.jsp');
             }
             
             if(this.isControl(this.getCurrentMenuId()))
             {
                 window.open('Control.jsp');
             }
             
             if(this.isGlobalSettings(this.getCurrentMenuId()))
             {
                 window.open('GlobalSettings.jsp');
             }
             
             if(this.isVirtualHosts(this.getCurrentMenuId()))
             {
                 window.open('VirtualHosts.jsp');
             }
             
             if(this.isLogs(this.getCurrentMenuId()))
             {
                 window.open('Logs.jsp?file=' + this.extractLogFile(this.getCurrentMenuId()));         
             }
             
             if(this.isDocuments(this.getCurrentMenuId()))
             {
                 window.open('Documents.jsp?file=' + this.extractDocumentFile(this.getCurrentMenuId()));             
             }
             
             if(this.isConfiguration(this.getCurrentMenuId()))
             {
                 window.open('Configuration.jsp?file=' + this.extractConfigurationFile(this.getCurrentMenuId()));             
             }      
             
        },
        
        upload:function () {
            
            if(this.isDocuments(this.getCurrentMenuId()))
            {
                dom.byId('uploadDirectoryName').value=this.extractDocumentFile(this.getCurrentMenuId());
            }         
            

            if(this.isConfiguration(this.getCurrentMenuId()))
            {
                dom.byId('uploadDirectoryName').value=this.extractConfigurationFile(this.getCurrentMenuId());
            }              
                        
            registry.byId('uploadFileDialog').show();
        },
        
        download: function () {
             if(this.isLogs(this.getCurrentMenuId()))
             {
                 window.open('../web/DownloadFile?file=' + this.extractLogFile(this.getCurrentMenuId()));
             }         
            
             if(this.isDocuments(this.getCurrentMenuId()))
             {
                 window.open('../web/DownloadFile?file=' + this.extractDocumentFile(this.getCurrentMenuId()));
             }         

             if(this.isConfiguration(this.getCurrentMenuId()))
             {
                 window.open('../web/DownloadFile?file=' + this.extractConfigurationFile(this.getCurrentMenuId()));
             }    
        },
        
        search: function() {
            
            if(this.isConfiguration(this.getCurrentMenuId()))
            {
                registry.byId('searchConfigurationDialog').show();
                return;
            } 
            
            if(this.isDocuments(this.getCurrentMenuId()))
            {
                dom.byId('searchDirectoryDisplay').innerHTML = this.extractDocumentFile(this.getCurrentMenuId());
            }
            
            if(this.isLogs(this.getCurrentMenuId()))
            {
                dom.byId('searchDirectoryDisplay').innerHTML = this.extractLogFile(this.getCurrentMenuId());    
            }
            
            registry.byId('searchDialog').show();
        },
        
        clearSearchInterval: function() {
            if(!!this.searchInterval) {
                net.apachegui.Interval.clearInterval( this.searchInterval );
            }
        },
        
        submitSearch: function() {
            var that = this;
            
            var searchFilter=dom.byId('searchFileFilter').value.trim();
            if(searchFilter == '') {
                net.apachegui.Util.alert('Info','Filter is required.');
                return;
            }
            
            var searchFileList=dom.byId('searchFileList').value.trim();
            if(searchFileList == '') {
                net.apachegui.Util.alert('Info','File extension list is required.');
                return;
            }
            
            var searchRecursively=dom.byId('searchRecursively').checked;
            
            var searchDirectory = dom.byId('searchDirectoryDisplay').innerHTML.trim();
            
            request.post('../web/Menu', {
                data:     {
                    option: 'submitSearch',
                    searchFilter: searchFilter,
                    searchFileList: searchFileList,
                    searchRecursively: searchRecursively,
                    searchDirectory: searchDirectory
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                
                    var data = response.data;
                    
                    var message = '';
                    
                    var started = data.started;
                    if(started) {
                        // run interval
                        message = 'Grabbing the list of files to search...';
                    } else {
                        //search in Progress
                        message = 'There appears to be a search already in progress';
                    }
                    
                    dom.byId('searchProgressMessage').innerHTML = message;
                                        
                    registry.byId('searchProgressDialog').show();
                    
                    that.clearSearchInterval();
                    
                    that.searchInterval = net.apachegui.Interval.setInterval(function() {
                        that.searchCheck();
                    }, 2000);    
                    
                },
                function(error) {
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
        },
        
        searchCheck: function() {
            var that = this;
            
            request.get('../web/Menu', {
                query:     {
                    option: 'searchCheck'
                },
                handleAs: 'json',
                sync: false,
                preventCache: true
            }).response.then(
                function(response) {
                
                    var data = response.data;
    
                    var searchStatus = data.status;
                    if(searchStatus == 'running') {
                        dom.byId('searchProgressMessage').innerHTML = data.output;
                    } 
                    
                    if(searchStatus == 'done') {
                        var list='<div id="searchResults">';
                        var results = data.results;
                        
                        if(results.length==0) {
                            list += 'Search string not found';
                        }
                        else {
                            
                            list += 'Returning a maximum of ' + data.maxResults + ' results<br/>';
                            var iter =1;
                            for(var i in results) {
                                
                                var displayPage = 'Documents.jsp';
                                if(results[i].path.startsWith(net.apachegui.Main.getInstance().getLogDirectoryPath())) {
                                    displayPage = "Logs.jsp";
                                }
                                
                                list += '<strong>' + iter + '</strong>: <a href="' + displayPage + '?file=' + results[i].path + '" target="_blank">' + results[i].path + ' Line ' + results[i].line + '</a>';
                                list += '<br/>';
                                list += '<p>' + results[i].content + '</p>';
                                
                                iter ++;
                            }
                        }
                        list += '</div>';
                        
                        net.apachegui.Util.alert('Search Results',list);
                        
                        registry.byId('searchProgressDialog').hide();
                                                
                        that.clearSearchInterval();
                    }
                    
                    if(searchStatus == 'cancelled') {
                        that.clearSearchInterval();
                        registry.byId('searchProgressDialog').hide();
                    }

                },
                function(error) {
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
        },
        
        searchCancel: function() {
            
            this.clearSearchInterval();
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Cancelling', 'Cancelling Please Wait...');
            thisdialog.show();
            
            request.post('../web/Menu', {
                data:     {
                    option: 'searchCancel'
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                
                    registry.byId('searchProgressDialog').hide();
                    
                    thisdialog.remove();
                },
                function(error) {
                    net.apachegui.Util.alert('Info',error.response.data.message);
                    thisdialog.remove();
                }
            );
        },
        
        submitConfigurationSearch: function() {
            var filter=dom.byId('searchConfigurationFilter').value.trim();
            if(filter == '') {
                net.apachegui.Util.alert('Info','Filter is required.');
                return;
            }
            
            var activeFilesFilter=dom.byId('searchConfigurationActiveFilesFilter').checked;
            var commentsFilter=dom.byId('searchConfigurationCommentsFilter').checked;
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Generating', 'Searching Files Please Wait...');
            thisdialog.show();
                
            request.get('../web/Configuration', {
                query:     {
                    option: 'search',
                    filter: filter,
                    activeFilesFilter: activeFilesFilter,
                    commentsFilter: commentsFilter
                },
                handleAs: 'json',
                preventCache: true,
                sync: false
            }).response.then(
                function(response) {
                
                    var data = response.data;
                    
                    var list='<div id="searchResults">';
                    var results = data.results;
                    
                    if(results.length==0) {
                        list += 'Search string not found';
                    }
                    else {
                        list += 'Returning a maximum of ' + data.maxResults + ' results<br/>';
                        var iter =1;
                        for(var i in results) {
                            list += '<strong>' + iter + '</strong>: <a href="Configuration.jsp?file=' + results[i].path + '" target="_blank">' + results[i].path + ' Line ' + results[i].line + '</a>';
                            list += '<br/>';
                            list += '<p>' + results[i].content + '</p>';
                            
                            iter ++;
                        }
                    }
                    list += '</div>';
                    
                    net.apachegui.Util.alert('Search Results',list);
                    
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Info',error.response.data.message);
                }
            );
        },
        
        refresh: function () {
            
            registry.byId('menuTree').reload();
            this.focusMenuOption(net.apachegui.Main.getInstance().getCurrentOption());
        },
        
        focusMenuOption: function(option) {
                        
            this.setCurrentMenuId(option);
            
            var mainInstance = net.apachegui.Main.getInstance();
            
            var vtree = registry.byId('menuTree');
            if(this.isGUISettings(option))
            {
                vtree.set('path', ['apacheRoot','GUISettings']);
            }
            
            if(this.isHistory(option))
            {
                vtree.set('path', ['apacheRoot','History']);
            }
            
            if(this.isControl(option))
            {
                vtree.set('path', ['apacheRoot','Control']);
            }
            
            if(this.isGlobalSettings(option))
            {
                vtree.set('path', ['apacheRoot','Global_Settings']);
            }
            
            if(this.isVirtualHosts(option))
            {
                vtree.set('path', ['apacheRoot','Virtual_Hosts']);
            }
            
            var pathArray;
            var subOption;
            var i;
            if(this.isLogs(option)) {
                
                pathArray=new Array();
                var logFilePath = mainInstance.getLogDirectoryPath();
                subOption=option.substring(5);
                    
                pathArray.push('apacheRoot');
                pathArray.push('Logs-' + logFilePath);
                i=0;
                for(i=logFilePath.length + 1; i<=subOption.length; i++)
                {
                    if(i==subOption.length)
                    {
                        pathArray.push('Logs-' + subOption);
                    }    
                    else if(subOption.charAt(i)=='/')
                    {
                        pathArray.push('Logs-' + subOption.substring(0, i));
                    }    
                }
                vtree.set('path', pathArray);
            }
            
            if(this.isDocuments(option)) {
                
                pathArray=new Array();
                
                //We need to start with the windows drive eg C:/
                var docFilePath = mainInstance.isWindows() ? mainInstance.getDocDirectoryPath() : "/";
                
                subOption=option.substring(10);
                if(mainInstance.validateFileExists(subOption))
                {        
                    pathArray.push('apacheRoot');
                    pathArray.push('Documents-' + docFilePath);
                    i=0;
                    for(i=docFilePath.length + 1; i<=subOption.length; i++)
                    {
                        if(i==subOption.length)
                        {
                            pathArray.push('Documents-' + subOption);
                        }    
                        else if(subOption.charAt(i)=='/')
                        {
                            pathArray.push('Documents-' + subOption.substring(0, i));
                        }    
                    }
                    vtree.set('path', pathArray);
                }
            }
            
            if(this.isConfiguration(option)) {    
                
                pathArray=new Array();
                var confFilePath = mainInstance.getConfDirectoryPath();
                subOption=option.substring(14);
                if(mainInstance.validateFileExists(subOption))
                {    
                    pathArray.push('apacheRoot');
                    pathArray.push('Configuration-' + confFilePath);
                    i=0;
                    for(i=confFilePath.length + 1; i<=subOption.length; i++)
                    {
                        if(i==subOption.length)
                        {
                            pathArray.push('Configuration-' + subOption);
                        }    
                        else if(subOption.charAt(i)=='/')
                        {
                            pathArray.push('Configuration-' + subOption.substring(0, i));
                        }    
                    }
                    vtree.set('path', pathArray);
                    
                }
            }
            
        },
        
        menuClick: function (id, type) {
             var sid=id.toString();
             
             if(this.isGUISettings(sid))
             {
                 window.location.href='GUISettings.jsp';
             }
             if(this.isHistory(sid))
             {
                 window.location.href='History.jsp';
             }
             if(this.isControl(sid))
             {
                 window.location.href='Control.jsp';
             }
             if(this.isGlobalSettings(sid))
             {
                 window.location.href='GlobalSettings.jsp';
             }
             if(this.isVirtualHosts(sid))
             {
                 window.location.href='VirtualHosts.jsp';
             }
             if(this.isLogs(sid))
             {
                 window.location.href='Logs.jsp?file=' + this.extractLogFile(sid);         
             }
             
             if(this.isDocuments(sid))
             {
                 window.location.href='Documents.jsp?file=' + this.extractDocumentFile(sid);             
             }
             
             if(this.isConfiguration(sid))
             {
                 window.location.href='Configuration.jsp?file=' + this.extractConfigurationFile(sid);             
             }      
        },
        
        getItemByIdentity: function(id) {
            var item;
            apacheStore.fetchItemByIdentity({
                identity:id,
                onItem:function(poItem){
                    item=poItem;
                }
            });
            return item;
    
        },
        
        isConfiguration: function(menuOption) {
            return menuOption.startsWith('Configuration-');
        },
        
        extractConfigurationFile: function(menuOption) {
            if(this.isConfiguration) {
                return menuOption.substring(14);
            }
            
            return null;
        },
        
        isDocuments: function(menuOption) {
            return menuOption.startsWith('Documents-');
        },
        
        extractDocumentFile: function(menuOption) {
            if(this.isDocuments) {
                return menuOption.substring(10);
            }
            
            return null;
        },
        
        isLogs: function(menuOption) {
            return menuOption.startsWith('Logs-');
        },
        
        extractLogFile: function(menuOption) {
            if(this.isLogs) {
                return menuOption.substring(5);
            }
            
            return null;
        },
        
        isControl: function(menuOption) {
            return menuOption == 'Control';
        },
        
        isGlobalSettings: function(menuOption) {
            return menuOption == 'Global_Settings';
        },
        
        isHistory: function(menuOption) {
            return menuOption == 'History';
        },
        
        isGUISettings: function(menuOption) {
            return menuOption == 'GUISettings';
        },
        
        isVirtualHosts: function(menuOption) {
            return menuOption == 'Virtual_Hosts';
        },
        
        addListeners: function() {
            var that=this;
            
            on(registry.byId('renameMenuItem'), "click", function() {
                that.rename();
            });
            
            on(registry.byId('newMenuItem'), "click", function() {
                that.newFile();
            });
            
            on(registry.byId('cutMenuItem'), "click", function() {
                that.cut();
            });
                
            on(registry.byId('copyMenuItem'), "click", function() {
                that.copy();
            });
            
            on(registry.byId('pasteMenuItem'), "click", function(){
                that.paste();
            });
            
            on(registry.byId('deleteMenuItem'), "click", function() {
                that.deleteFile();
            });
            
            on(registry.byId('refreshMenuItem'), "click", function() {
                that.refresh();
            });
            
            on(registry.byId('uploadMenuItem'), "click", function() {
                that.upload();
            });
            
            on(registry.byId('downloadMenuItem'), "click", function() {
                that.download();
            });
            
            on(registry.byId('searchMenuItem'), "click", function() {
                that.search();
            });
            
            on(registry.byId('newTabMenuItem'), "click", function() {
                that.newTab();
            });
            
            on(registry.byId('menuTree'), "click", function(item) {
                that.menuClick(item.id, item.type);
            });
            
            on(registry.byId('tree_menu'), "focus", function(e) {
                var tn = registry.getEnclosingWidget(this.currentTarget);
                that.setCurrentMenuId(tn.item.id);
                that.setMenuFades(tn);
            });
            
            on(registry.byId('newFileCancel'), "click", function() {
                that.hideNewFile();
            });
            
            on(registry.byId('renameFileCancel'), "click", function(){
                that.hideRenameFile();
            });
            
            on(registry.byId('uploadFileCancel'), "click", function() {
                registry.byId('uploadFileDialog').hide();
            });
            
            on(registry.byId('newFileForm'), "submit", function(e) {
                event.stop(e); // prevent the default submit
                if (!this.isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
    
                that.newFileSubmit();
            });
            
            on(registry.byId('renameFileForm'), "submit", function(e) {
                event.stop(e); // prevent the default submit
                if (!this.isValid()) {
                    net.apachegui.Util.alert('Error','Please fix fields');
                    return;
                }
    
                that.renameFileSubmit();
            });
            
            on(registry.byId('uploadFile'), "complete", function() {
                that.refresh();
            });
            
            on(registry.byId('submitSearchConfigurationButton'), "click", function() {
                that.submitConfigurationSearch();
            });
                
            on(registry.byId('hideSearchConfigurationButton'), "click", function() {
                registry.byId('searchConfigurationDialog').hide();
            });
            
            on(registry.byId('submitSearchButton'), "click", function() {
                that.submitSearch();
            });
                
            on(registry.byId('hideSearchButton'), "click", function() {
                registry.byId('searchDialog').hide();
            });
            
            on(registry.byId('searchProgressCancel'), "click", function() {
                that.searchCancel();
            });
            
            var treeContainerNode = query('.dijitTreeContainer',dom.byId('menuTree'))[0];
            
            var updateMenuWidth = function() {
                var treeContainer = domGeom.position(treeContainerNode);
                
                var width = treeContainer.w;
                    
                var padding = 20;
                
                width += padding;
                
                if(that.currWidth != width && width > padding) {
                
                    that.currWidth = width;
                    
                    domStyle.set('leftCol', "width", width + 'px');                
                    
                    registry.byId('appLayout').resize();
                    registry.byId('leftCol')._afterResize();
                }
            };
            
            net.apachegui.Interval.setInterval(updateMenuWidth, 150);
        }
    });
    
    net.apachegui.Util.setupSingletonInstance(net.apachegui.Menu);
    
});