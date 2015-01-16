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

	<jsp:include page="/jsp/Init.jsp" 	flush="true" />
	
	<div data-dojo-type="dijit/Dialog" id="editDialog" title="Edit " style="width: 700px; display: none">
	    <table>
	        <tr class="dijitDialogPaneContentArea">
	                <td>
	                    <label for='editType'>
	                        Type:
	                     </label>
	                </td>
	                <td>
	                    <span id="editType"></span>
	                </td>
	        </tr>
	        <tr class="dijitDialogPaneContentArea">
	                   <td>
	                       <label for='editValue'>
	                           Value:
	                        </label>
	                   </td>
	                   <td>
	                       <input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: true" id="editValue" style="width: 630px;" />
	                   </td>
	           </tr>
	    </table>
	    
	    <input type="hidden" id="editLineType" value=""/>
	    <input type="hidden" id="editLineOfStart" value=""/>
	    <input type="hidden" id="editLineOfEnd" value=""/>
	    
	    <div class="dijitDialogPaneActionBar">
	        <button id="editSubmit" data-dojo-type="dijit.form.Button" type="button">
	            Submit
	        </button>
	        <button id="editCancel" data-dojo-type="dijit.form.Button" type="button">
	            Cancel
	        </button>
	    </div>
    </div>
	
	<div data-dojo-type="dijit/Dialog" id="addDialog" title="Add " style="width: 700px; display: none">
        <table>
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label for='addType'>
                            Type:
                         </label>
                    </td>
                    <td>
                        <input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: true" id="addType" style="width: 630px;" />
                    </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                       <td>
                           <label for='addValue'>
                               Value:
                            </label>
                       </td>
                       <td>
                           <input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: true" id="addValue" style="width: 630px;" />
                       </td>
               </tr>
        </table>
        
        <input type="hidden" id="addBeforeLineType" value=""/>
        <input type="hidden" id="addLineType" value=""/>
        <input type="hidden" id="addLineOfStart" value=""/>
        
        <div class="dijitDialogPaneActionBar">
            <button id="addSubmit" data-dojo-type="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="addCancel" data-dojo-type="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </div>
	
	<div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">
	
		<jsp:include page="/jsp/Heading.jsp" 	flush="true" />
		
		<jsp:include page="/jsp/Menu.jsp" 	flush="true" />
		
		<div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
		
		   <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 100%;" id="virtualHostsTabs">
                    <div data-dojo-type="dijit/layout/ContentPane" title="Tree View" id="treeTab">
                        
                        <div class="centerPanel" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="region: 'center', tabPosition: 'top'">
                        
	                        <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'top', title:'Modify'">
	                            <div id="example_container">
	                               <span class="example dijitFolderOpened"></span> = Enclosure <span class="example dijitLeaf"></span> = Directive
	                            </div>
	                            <div id="select_host_container">
	                               Host: <div id="select_host_box"></div>
	                            </div>
	                        </div>
	                        
	                        <div id="tree_virtual_host_content_pane" class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'center', title:'Edit'" >
	                        
	                            <div id="tree_virtual_host_container">
	                            
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