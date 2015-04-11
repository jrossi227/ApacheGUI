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
                     "dojo/domReady!"
            ], function(dom, parser) {
                parser.parse();
                dom.byId("loginBody").style.visibility='visible';

                <c:if test="${advisory == true}">
                net.apachegui.Util.alert('Advisory','<b>Username:</b> admin <br/><b>Password:</b> admin <br/><b>Please change your credentials when you log in.</b>');
                </c:if>

                <c:if test="${supportedBrowser == false}">
                net.apachegui.Util.alert('Unsupported Browser','<p><b>Warning</b><br/> Your browser does not appear to be supported.<br/> Some content might not render correctly.<br/> Please use a browser from the list below.</p>' +
                    '<h4>Supported Browsers</h4>' +
                    '<img alt="Google Chrome" src="../resources/images/chrome.jpg"/>' +
                    '<img alt="Firefox" src="../resources/images/firefox.gif"/>' +
                    '<img alt="Safari" src="../resources/images/safari.jpg"/>');
                </c:if>

                <c:if test="${error == true}">
                net.apachegui.Util.alert('Login Failure','You have entered invalid credentials');
                </c:if>

            });
        });

    </script>
</head>
<body class="${theme}" id="loginBody" style="visibility:hidden">

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

            <jsp:include page="/jsp/Heading.jsp"     flush="true" />

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