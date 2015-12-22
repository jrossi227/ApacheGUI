<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html lang="en">
<head>
    <%-- Include standard js and css includes --%>
    <jsp:include page="/jsp/Head.jsp" flush="true" />
    
    <script>

        require([
            <jsp:include page="/jsp/RequireIncludes.jsp" flush="true" />     
        ], function() {
            require([
                     "dijit/layout/TabContainer",
                     "net/apachegui/VirtualHosts",
                     "dojo/dom",
                     "dojo/parser",
                     "dojo/domReady!"
            ], function(TabContainer, VirtualHosts, dom, parser) {
                 parser.parse();
                
                 net.apachegui.Main.getInstance().init('Virtual_Hosts');
                 
                 dom.byId("virtualHostsBody").style.visibility='visible';
            });
        });
    </script>
</head>

<body class="${theme}" id="virtualHostsBody" style="visibility:hidden">

    <jsp:include page="/jsp/Init.jsp"     flush="true" />

    <jsp:include page="/jsp/configuration_tree/Dialogs.jsp"     flush="true" />
    
    <div data-dojo-type="dijit/Dialog" id="addHostDialog" title="Add Virtual Host" style="display: none">
       <table>
        <tr class="dijitDialogPaneContentArea">
                <td colspan="2">
                    <strong>IP Address/Host (Specify One Option Below):</strong>
                    </td>  
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='addHostAllAddress'>
                        All IP's and Hosts:                            
                    </label>
                    </td>
                <td>
                    <input type="checkbox" id="addHostAllAddress"/>
                </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='addHostAddress'>
                        IP Address/Host:
                         </label>
                    </td>
                <td>
                    <div data-dojo-type="dijit/form/TextBox" id="addHostAddress">
                    </div>
                </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='addHostPort'>
                        <strong>Port (Optional):</strong>
                         </label>
                    </td>
                <td>
                    <div data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: false" id="addHostPort" style="width: 4em;">
                    </div>
                </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='addHostServerName'>
                        <strong>ServerName (Optional):</strong>
                         </label>
                    </td>
                <td>
                    <div data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: false" id="addHostServerName">
                    </div>
                </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='addHostDocumentRoot'>
                        <strong>DocumentRoot (Optional):</strong>
                         </label>
                    </td>
                <td>
                    <div data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: false" id="addHostDocumentRoot">
                    </div>
                </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td colspan="2">
                    &nbsp;<br/>
                    <strong>File to add the host to (Specify One Option Below):</strong>
                    </td>  
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='add_host_select_box'>
                        Current File:
                         </label>
                    </td>
                <td>
                    <div id="add_host_select_box"></div>
                </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='addHostNewFile'>
                        New File (Specify the file path):
                         </label>
                    </td>
                <td>
                    <div data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: false" id="addHostNewFile">
                    </div>
                </td>
        </tr>
       </table>
       <div class="dijitDialogPaneActionBar">
           <button id="addHostSubmit" data-dojo-type="dijit/form/Button" type="button">
               Add
           </button>
           <button id="addHostCancel" data-dojo-type="dijit/form/Button" type="button">
               Cancel
           </button>
       </div>
    </div>
    
    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">
    
        <jsp:include page="/jsp/Heading.jsp"     flush="true" />
        
        <jsp:include page="/jsp/Menu.jsp"     flush="true" />
        
        <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
        
           <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 100%;" id="virtualHostsTabs">
                    <div data-dojo-type="dijit/layout/ContentPane" title="Tree View" id="treeTab">
                        
                        <div class="centerPanel" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="region: 'center', tabPosition: 'top'">
                        
                            <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'top', title:'Modify'">

                                <jsp:include page="/jsp/configuration_tree/Legend.jsp" flush="true" />
                                
                                <div id="select_host_container">
                                   Host: <div id="select_host_box"></div>
                                </div>
                                <div id="add_host_container">
                                   <button id="addHostButton" data-dojo-type="dijit/form/Button">Add Virtual Host</button>
                                </div>
                            </div>
                            
                            <div id="tree_virtual_host_content_pane" class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'center', title:'Edit'" >
                            
                                <div class="tree_container" id="tree_virtual_host_container">
                                
                                </div>
                            
                            </div>
                        
                        </div>

                    </div>
                  
                    <div data-dojo-type="dijit/layout/ContentPane" title="Hierarchical View" id="hierarchyTab">
                        
                        <h3 id="name_virtual_host_header">Name Virtual Hosts</h3>
                        <div id="name_virtual_host_container">
                                    
                        </div>
                        
                        <h3 id="other_virtual_host_header">Other Virtual Hosts</h3>
                        <div id="other_virtual_host_container">
                        
                        </div>
                             
                    </div>
                
            </div> 

        </div>
    </div>

</body>

</html>