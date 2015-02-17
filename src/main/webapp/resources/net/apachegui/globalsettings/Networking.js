define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/registry",
         "dojo/on",
         "dojo/request",
         "dojo/_base/array", 
         "dojo/data/ItemFileWriteStore",
         "dojo/query",
         "dojo/dom-class",
         "net/apachegui/Main"
], function(declare, dom, registry, on, request, array, ItemFileWriteStore, query, domClass, Main){
    
    declare("net.apachegui.globalsettings.Networking", null, {
        
        initialized: false,
        currentListenMenuId: null,
        currentNameVirtualHost: null,
        
        init: function () {
            if(this.initialized===false) {
                this.addListeners();
                this.bindRemoveListenMenu();
                this.bindRemoveNameVirtualHostMenu();
                registry.byId('serverSignatureSelector').onChange();
                registry.byId('serverSignatureButton').set('disabled', true);
                this.initialized=true;
            }
        },
        
        setCurrentListenMenuId: function(id) {
            this.currentListenMenuId=id.toString();
        },
        
        setCurrentNameVirtualHostMenuId: function(id) {
            this.currentNameVirtualHostMenuId=id.toString();
        },
        
        bindRemoveListenMenu: function() {
            var menu = registry.byId("remove_listen_menu");
            // when we right-click anywhere on the grid, make sure we open the menu
            menu.bindDomNode(globalListeningGrid.domNode);
        },
        
        bindRemoveNameVirtualHostMenu: function() {
            var menu = registry.byId("remove_name_virtual_host_menu");
            // when we right-click anywhere on the grid, make sure we open the menu
            menu.bindDomNode(globalNameVirtualHostGrid.domNode);
        },
        
        addListenSubmit: function() {
            
            var allIp=dom.byId('addAllListenIp').checked;
            var ip=registry.byId('addListenIp').get('value').trim();
            var port=registry.byId('addListenPort').get('value').trim();
            var protocol=registry.byId('addListenProtocol').get('value').trim();
            
            if(allIp == false &&  ip == "") {
                net.apachegui.Util.alert('Error','You must specify either All IP Addresses or a specific IP Address.');
                return;
            }
            
            if(port == "") {
                net.apachegui.Util.alert('Error','You must specify a Port');
                return;
            }
            
            if(isNaN(port)) {
                net.apachegui.Util.alert('Error','The Port must be numeric');
                return;
            }
            
            var isValidIp = (function isIP(obj) {
                
                 //IPv6 validation
                 var ip6Regex = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
                 if(ip6Regex.test(obj)) {
                     return true;
                 }
                 
                 //IPv4 validation
                 var ary = obj.split(".");
                 var currIp = true;
                 
                 for (var i in ary) { 
                     currIp = (!ary[i].match(/^\d{1,3}$/) || (Number(ary[i]) > 255)) ? false : currIp; 
                 }
                 currIp = (ary.length != 4) ? false : currIp;
    
                 if (!currIp) {    
                     return false;
                 }
                 
                 return true;
            })(ip);
            
            if(allIp == false &&  !isValidIp) {
                net.apachegui.Util.alert('Error','The IP Address you entered is not valid.');
                return;
            }
            
            var that=this;

            var thisdialog = net.apachegui.Util.noCloseDialog('Adding', 'Please Wait...');
            thisdialog.show();
            
            request.post("../web/Networking", {
                data:     {
                    option: 'addListen',
                    allIp: allIp,
                    ip: ip,
                    port: port,
                    protocol: protocol
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                
                    dom.byId('addAllListenIp').checked=false;
                    registry.byId('addListenIp').set('disabled', false);
                    registry.byId('addListenIp').reset();
                    registry.byId('addListenPort').reset();
                    registry.byId('addListenProtocol').reset();
                    registry.byId('addListenDialog').hide();
                    that.resetListenGrid();        
                    
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
        },
        
        resetListenGrid: function() {
            globalListeningStore = new ItemFileWriteStore({url: '../web/Networking?option=listening', urlPreventCache: true});
            globalListeningGrid.setStore(globalListeningStore);
        },
        
        addNameVirtualHostSubmit: function() {
            var address=registry.byId('addNameVirtualHostAddress').get('value').trim();
            var port=registry.byId('addNameVirtualHostPort').get('value').trim();
        
            if(address == "") {
                net.apachegui.Util.alert('Error','You must specify an address');
                return;
            }
            
            var that=this;
            
            var thisdialog = net.apachegui.Util.noCloseDialog('Adding', 'Please Wait...');
            thisdialog.show();
            
            request.post("../web/Networking", {
                data:     {
                    option: 'addNameVirtualHost',
                    address: address,
                    port: port
                },
                handleAs: 'json',
                sync: false
            }).response.then(
                function(response) {
                
                    registry.byId('addNameVirtualHostAddress').reset();
                    registry.byId('addNameVirtualHostPort').reset();
                    registry.byId('addNameVirtualHostDialog').hide();
                    that.resetNameVirtualHostGrid();
                    
                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Error',error.response.data.message);
                }
            );
        },
        
        resetNameVirtualHostGrid: function() {
            globalNameVirtualHostStore = new ItemFileWriteStore({url: '../web/Networking?option=nameVirtualHost', urlPreventCache: true});
            globalNameVirtualHostGrid.setStore(globalNameVirtualHostStore);
        },
        
        showSuccessfullSave: function() {
            net.apachegui.Util.alert('Success','The changes were successfully saved');
        },
        
        setServerSignature: function() {
            var serverSignatureValue = registry.byId('serverSignatureSelector').get('value');
            var serverTokenValue = registry.byId('serverTokensSelector').get('value');
            
            var serverSignaturePreviewContainer=dom.byId('serverSignaturePreview');
            var serverString=(serverSignatureValue == 'Email' ? ' Server at <a href="mailto:webmaster@localhost">localhost</a> Port 80': ' Server at localhost Port 80');
            if(serverSignatureValue == 'On' || serverSignatureValue == 'Email') {
                
                switch(serverTokenValue) {
                    case 'Major':
                        serverSignaturePreviewContainer.innerHTML = 'Apache/2' + serverString;
                        break;
                    case 'Minor':
                        serverSignaturePreviewContainer.innerHTML = 'Apache/2.4' + serverString;
                        break;
                    case 'Min':
                        serverSignaturePreviewContainer.innerHTML = 'Apache/2.4.2' + serverString;
                        break;
                    case 'Prod':
                        serverSignaturePreviewContainer.innerHTML = 'Apache' + serverString;
                        break;
                    case 'OS':
                        serverSignaturePreviewContainer.innerHTML = 'Apache/2.4.2 (Unix)' + serverString;
                        break;
                    case 'Full':
                        serverSignaturePreviewContainer.innerHTML = 'Apache/2.4.2 (Unix) PHP/4.2.2 MyMod/1.2' + serverString;
                        break;    
                }
            } else {
                serverSignaturePreviewContainer.innerHTML = '';
            } 
        },
        
        addListeners: function() {
            var that=this;
            
            /** Listen listeners **/
            
            on(registry.byId('addListenButton'), "click", function() {
                registry.byId('addListenDialog').show();
            });
            
            on(dom.byId('addAllListenIp'), "click", function() {
                if(this.checked==true) {
                    registry.byId('addListenIp').set('value','');
                    registry.byId('addListenIp').set('disabled', true);
                } else {
                    registry.byId('addListenIp').set('disabled', false);
                }
            });
            
            on(registry.byId('addListenIp'), "change", function() {
                if(this.value.trim() != "") {
                    dom.byId('addAllListenIp').disabled=true;
                } else {
                    dom.byId('addAllListenIp').disabled=false;
                }
            });
        
            on(registry.byId('addListenSubmitButton'), "click", function() {
                that.addListenSubmit();
            });
            
            on(registry.byId('addListenCloseButton'), "click", function() {
                registry.byId('addListenDialog').hide();
            });
            
            globalListeningGrid.onRowContextMenu= function(e) {    
                var item = globalListeningGrid.getItem(e.rowIndex);
                array.forEach(globalListeningGrid.store.getAttributes(item), function(attribute) {
                    var id = globalListeningGrid.store.getValues(item, attribute);
                    if(attribute=='id')
                    {      
                        that.setCurrentListenMenuId(id); 
                    }
                 });
            };
            
            on(registry.byId('removeListenMenuItem'), "click", function() {
                //alert(this.currentListenMenuId);
                var ip='', port='', protocol='';
                var item = globalListeningGrid.getItem(that.currentListenMenuId);
                array.forEach(globalListeningGrid.store.getAttributes(item), function(attribute) {
                    var attr = globalListeningGrid.store.getValues(item, attribute);
                    if(attribute=='ip')
                    {      
                        ip=attr; 
                    }
                    
                    if(attribute=='port')
                    {      
                        port=attr; 
                    }
                    
                    if(attribute=='protocol')
                    {      
                        protocol=attr; 
                    }
                 });
                
                net.apachegui.Util.confirmDialog("Please Confirm", "Are you sure you want to delete the Listener with the following properties?<br/>" +
                                                "<strong>IP</strong>: " + ip + "<br/>" +
                                                "<strong>Port</strong>: " + port + "<br/>" +
                                                "<strong>Protocol</strong>: " + protocol,
                    function confirm(conf) {
                        if(conf)
                        {
                            var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Please Wait...');
                            thisdialog.show();
                            
                            request.post("../web/Networking", {
                                data:     {
                                    option: 'deleteListen',
                                    ip: ip,
                                    port: port,
                                    protocol: protocol
                                },
                                handleAs: 'json',
                                sync: false
                            }).response.then(
                                function(response) {
                                
                                    that.resetListenGrid();
                                            
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
            
            /** Name Based Virtual Hosts Listeners **/
            
            on(registry.byId('addNameVirtualHostButton'), "click", function() {
                registry.byId('addNameVirtualHostDialog').show();
            });
        
            on(registry.byId('addNameVirtualHostSubmitButton'), "click", function() {
                that.addNameVirtualHostSubmit();
            });
            
            on(registry.byId('addNameVirtualHostCloseButton'), "click", function() {
                registry.byId('addNameVirtualHostDialog').hide();
            });
            
            globalNameVirtualHostGrid.onRowContextMenu= function(e) {    
                var item = globalNameVirtualHostGrid.getItem(e.rowIndex);
                array.forEach(globalNameVirtualHostGrid.store.getAttributes(item), function(attribute) {
                    var id = globalNameVirtualHostGrid.store.getValues(item, attribute);
                    if(attribute=='id')
                    {      
                        that.setCurrentNameVirtualHostMenuId(id); 
                    }
                 });
            };
            
            on(registry.byId('removeNameVirtualHostMenuItem'), "click", function() {
                var address='', port='';
                var item = globalNameVirtualHostGrid.getItem(that.currentNameVirtualHostMenuId);
                array.forEach(globalNameVirtualHostGrid.store.getAttributes(item), function(attribute) {
                    var attr = globalNameVirtualHostGrid.store.getValues(item, attribute);
                    if(attribute=='address')
                    {      
                        address=attr; 
                    }
                    
                    if(attribute=='port')
                    {      
                        port=attr; 
                    }
                 });
                
                net.apachegui.Util.confirmDialog("Please Confirm", "Are you sure you want to delete the Name Based Virtual Host with the following properties?<br/>" +
                                                "<strong>Address</strong>: " + address + "<br/>" +
                                                "<strong>Port</strong>: " + port + "<br/>",
                    function confirm(conf) {
                        if(conf)
                        {
                            var thisdialog = net.apachegui.Util.noCloseDialog('Deleting', 'Please Wait...');
                            thisdialog.show();
                            
                            request.post("../web/Networking", {
                                data:     {
                                    option: 'deleteNameVirtualHost',
                                    address: address,
                                    port: port
                                },
                                handleAs: 'json',
                                sync: false
                            }).response.then(
                                function(response) {
                                
                                    that.resetNameVirtualHostGrid();        
                                    
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
            
            /** Keep Alive Listeners **/
            
            on(dom.byId('keepAliveStatusOn'), "change", function() {
                registry.byId('keepAliveStatusButton').set('disabled', false);
            });
            
            on(dom.byId('keepAliveStatusOff'), "change", function() {
                registry.byId('keepAliveStatusButton').set('disabled', false);
            });
            
            on(registry.byId('keepAliveStatusButton'), "click", function() {
                
                var status='';
                
                var radioButtons=query('#keepAliveStatusContainer input:checked'); 
                array.forEach(radioButtons, function(radio){
                    status=radio.value;
                });
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Networking", {
                    data:     {
                        option: 'modifyKeepAliveStatus',
                        status: status
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                    
                        that.showSuccessfullSave();
                        
                        if(status == 'on') {
                            dom.byId('keepAliveOptionsContainer').style.display='block';
                        } else {
                            dom.byId('keepAliveOptionsContainer').style.display='none';
                        }
                        
                        registry.byId('keepAliveStatusButton').set('disabled', true);

                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    });
                    
            });    
            
            on(registry.byId('keepAliveTimeoutSeconds'), "keyup", function() {
                registry.byId('saveKeepAliveTimeoutButton').set('disabled', false);
            });
            
            on(registry.byId('saveKeepAliveTimeoutButton'), "click", function() {
                
                var seconds=dom.byId('keepAliveTimeoutSeconds').value;
    
                if(seconds == '' ) {
                    net.apachegui.Util.alert('Error','You must specify a value for seconds');
                    return;
                }
                    
                if(isNaN(seconds)) {
                    net.apachegui.Util.alert('Error','The specified seconds must be numeric');
                    return;
                }
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Networking", {
                    data:     {
                        option: 'modifyKeepAliveTimeout',
                        seconds: seconds
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                        
                        that.showSuccessfullSave();
                        registry.byId('saveKeepAliveTimeoutButton').set('disabled', true);    
                        
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
            });
            
            on(dom.byId('requestsPerConnectionUnlimited'), "change", function() {
                registry.byId('requestsPerConnectionButton').set('disabled', false);
            });
            
            on(dom.byId('requestsPerConnectionNumber'), "change", function() {
                registry.byId('requestsPerConnectionButton').set('disabled', false);
            });
            
            on(registry.byId('requestsPerConnectionNum'), "keyup", function() {
                registry.byId('requestsPerConnectionButton').set('disabled', false);
            });
            
            on(registry.byId('requestsPerConnectionButton'), "click", function() {
                var numberOfRequestsOption='';
                var numberOfRequests = '0'; 
                
                var radioButtons=query('#requestsPerConnectionContainer input:checked'); 
                array.forEach(radioButtons, function(radio){
                    numberOfRequestsOption=radio.value;
                });
                
                if(numberOfRequestsOption == 'number') {
                    numberOfRequests = dom.byId('requestsPerConnectionNum').value;
                }
                
                if(numberOfRequests == '' ) {
                    net.apachegui.Util.alert('Error','You must specify a value for Requests per Connection');
                    return;
                }
                    
                if(isNaN(numberOfRequests)) {
                    net.apachegui.Util.alert('Error','The specified Requests per Connection must be numeric');
                    return;
                }
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Networking", {
                    data:     {
                        option: 'modifyMaxKeepAliveRequests',
                        numberOfRequests: numberOfRequests
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                    
                        if(numberOfRequests == '0' ) {
                            dom.byId('requestsPerConnectionNum').value = '';
                            var buttons=query('#requestsPerConnectionContainer input'); 
                            array.forEach(buttons, function(radio){
                                if(radio.value == 'unlimited') {
                                    radio.checked=true;
                                } else {
                                    radio.checked=false;
                                }
                            });
                        }
                        that.showSuccessfullSave();
                        registry.byId('requestsPerConnectionButton').set('disabled', true);        
                        
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
            });
            
            on(registry.byId('requestTimeoutSeconds'), "keyup", function() {
                registry.byId('requestTimeoutButton').set('disabled', false);
            });
            
            on(registry.byId('requestTimeoutButton'), "click", function() {
                var seconds=dom.byId('requestTimeoutSeconds').value;
    
                if(seconds == '' ) {
                    net.apachegui.Util.alert('Error','You must specify a value for seconds');
                    return;
                }
                    
                if(isNaN(seconds)) {
                    net.apachegui.Util.alert('Error','The specified seconds must be numeric');
                    return;
                }
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Networking", {
                    data:     {
                        option: 'modifyRequestTimeout',
                        seconds: seconds
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                    
                        that.showSuccessfullSave();
                        registry.byId('requestTimeoutButton').set('disabled', true);    
                        
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
                
            });
            
            on(registry.byId('listenBackLogLength'), "keyup", function() {
                registry.byId('listenBackLogButton').set('disabled', false);
            });
            
            on(registry.byId('listenBackLogButton'), "click", function() {
                var backLogLength=dom.byId('listenBackLogLength').value;
    
                if(backLogLength == '' ) {
                    net.apachegui.Util.alert('Error','You must specify a value for the Queue Length');
                    return;
                }
                    
                if(isNaN(backLogLength)) {
                    net.apachegui.Util.alert('Error','The specified Queue Length must be numeric');
                    return;
                }
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Networking", {
                    data:     {
                        option: 'modifyListenBackLog',
                        backLogLength: backLogLength
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                    
                        that.showSuccessfullSave();
                        registry.byId('listenBackLogButton').set('disabled', true);    
                        
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
                
            });
            
            on(registry.byId('serverTokensSelector'), "change", function() {
                registry.byId('serverTokensButton').set('disabled', false);
                
                var serverTokenValue = registry.byId('serverTokensSelector').get('value');
                
                query("#serverTokenPreviewContainer .serverTokenPreview").removeClass("selected");
                
                domClass.add("serverTokens_" + serverTokenValue + "_preview", "selected");
                
                that.setServerSignature();
            });
            
            on(registry.byId('serverTokensButton'), "click", function() {
                var serverTokens=registry.byId('serverTokensSelector').get('value');
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Networking", {
                    data:     {
                        option: 'modifyServerTokens',
                        serverTokens: serverTokens
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                    
                        that.showSuccessfullSave();
                        registry.byId('serverTokensButton').set('disabled', true);    
                        
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
            });
            
            on(registry.byId('serverSignatureSelector'), "change", function() {
                registry.byId('serverSignatureButton').set('disabled', false);
                
                that.setServerSignature();
            });
            
            on(registry.byId('serverSignatureButton'), "click", function() {
                var serverSignature=registry.byId('serverSignatureSelector').get('value');
                
                var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                thisdialog.show();
                
                request.post("../web/Networking", {
                    data:     {
                        option: 'modifyServerSignature',
                        serverSignature: serverSignature
                    },
                    handleAs: 'json',
                    sync: false
                }).response.then(
                    function(response) {
                    
                        that.showSuccessfullSave();
                        registry.byId('serverSignatureButton').set('disabled', true);
                        
                        thisdialog.remove();
                    },
                    function(error) {
                        thisdialog.remove();
                        net.apachegui.Util.alert('Error',error.response.data.message);
                    }
                );
            });
            
            if(!net.apachegui.Main.getInstance().isWindows()) {
                
                on(registry.byId('apacheUser'), "keyup", function() {
                    registry.byId('apacheUserButton').set('disabled', false);
                });
                
                on(registry.byId('apacheUserButton'), "click", function() {
                    
                    var user=dom.byId('apacheUser').value;
        
                    if(user == '' ) {
                        net.apachegui.Util.alert('Error','You must specify a value for user');
                        return;
                    }
                        
                    var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                    thisdialog.show();
                    
                    request.post("../web/Networking", {
                        data:     {
                            option: 'modifyUser',
                            user: user
                        },
                        handleAs: 'json',
                        sync: false
                    }).response.then(
                        function(response) {
                        
                            that.showSuccessfullSave();
                            registry.byId('apacheUserButton').set('disabled', true);
                        
                            thisdialog.remove();
                        },
                        function(error) {
                            thisdialog.remove();
                            net.apachegui.Util.alert('Error',error.response.data.message);
                        }
                    );
                });
                
                on(registry.byId('apacheGroup'), "keyup", function() {
                    registry.byId('apacheGroupButton').set('disabled', false);
                });
                
                on(registry.byId('apacheGroupButton'), "click", function() {
                    
                    var group=dom.byId('apacheGroup').value;
        
                    if(group == '' ) {
                        net.apachegui.Util.alert('Error','You must specify a value for group');
                        return;
                    }
                        
                    var thisdialog = net.apachegui.Util.noCloseDialog('Updating', 'Please Wait...');
                    thisdialog.show();
                    
                    request.post("../web/Networking", {
                        data:     {
                            option: 'modifyGroup',
                            group: group
                        },
                        handleAs: 'json',
                        sync: false
                    }).response.then(
                        function(response) {
                        
                            that.showSuccessfullSave();
                            registry.byId('apacheGroupButton').set('disabled', true);
                            
                            thisdialog.remove();
                        },
                        function(error) {
                            thisdialog.remove();
                            net.apachegui.Util.alert('Error',error.response.data.message);
                        }
                    );
                });
            }
        }
        
    });
   
    net.apachegui.Util.setupSingletonInstance(net.apachegui.globalsettings.Networking);
    
});
    