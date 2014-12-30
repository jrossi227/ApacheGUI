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
	
	<div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">
	
		<jsp:include page="/jsp/Heading.jsp" 	flush="true" />
		
		<jsp:include page="/jsp/Menu.jsp" 	flush="true" />
		
		<div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
		
		   <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 100%;" id="virtualHostsTabs">
                    <div data-dojo-type="dijit/layout/ContentPane" title="Tree View" id="treeTab">
                        
                        <div id="tree_virtual_host_container">
                        
                        </div>
                        
                    </div>
                  
                    <div data-dojo-type="dijit/layout/ContentPane" title="Hierarchical View" id="hierarchyTab">
                        
                        <h3 id="name_virtual_host_header">Name Virtual Hosts</h3>
			            <div id="name_virtual_host_container">
			                <p id="name_virtual_host_container_none">There are no configured Name Virtual Hosts</p>
			                        
			            </div>
			            
			            <h3 id="other_virtual_host_header">Other Virtual Hosts</h3>
			            <div id="other_virtual_host_container">
			                <p id="other_virtual_host_container_none">There are no other configured Virtual Hosts</p>
			            
			            </div>
                             
                    </div>
                
            </div> 

		</div>
	</div>

</body>

</html>