<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
	<%-- Include standard js and css includes --%>
	<jsp:include page="/jsp/Head.jsp" flush="true" />
	
	<script>
		require([
			<jsp:include page="/jsp/RequireIncludes.jsp" flush="true" />     
		], function() {
			require([
			         "dojo/dom",
			         "dojo/parser",
			         "dijit/registry",
			         "dojo/domReady!"
			], function(dom, parser, registry) {
				parser.parse();
				registry.byId('errorDialog').show();
				dom.byId("errorBody").style.visibility='visible';
			});
		});
	    
	</script>
</head>
<body class="${theme}" id="errorBody" style="visibility:hidden">
	<div dojoType="dijit.Dialog" id="errorDialog" title="Login Error">
		You have entered invalid credentials
    	<div class="dijitDialogPaneActionBar">
            <button dojoType="dijit.form.Button" type="button" onclick="window.location.href='GUISettings.jsp'">
                		OK
            </button>
        </div>
	</div>
	<div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">
			
			<jsp:include page="/jsp/Heading.jsp" 	flush="true" />
			
			<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
				<form dojoType="dijit.form.Form" id="loginForm" action="j_security_check" method="post">
        			<table width="300" align="center">
        				<tr class="dijitDialogPaneContentArea">
            				<td>
            					<label for='j_username'>
                					Username:
           				 		</label>
           					</td>
            				<td>
            					<div dojoType="dijit.form.ValidationTextBox" type="text" name="j_username" id="j_username" required="true" style="width: 100%;">
            					</div>
            				</td>
        				</tr>
        				<tr class="dijitDialogPaneContentArea">
            				<td>
            					<label for='j_password'>
                					Password:
           				 		</label>
           					</td>
            				<td>
            					<div dojoType="dijit.form.ValidationTextBox" name="j_password" id="j_password" type="password" required="true" style="width: 100%;">
            					</div>
            				</td>
        				</tr>
        				<tr class="dijitDialogPaneActionBar">
        					<td colspan="2">
            					<button dojoType="dijit.form.Button" type="submit">
                					Submit
            					</button>
            				</td>
        				</tr>
        			</table>
        			
        		</form>
			</div>
	</div>		
</body>
</html>