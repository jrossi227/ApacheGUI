<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

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
                "net/apachegui/GlobalTree",
                "dojo/dom",
                "dojo/parser",
                "dojo/domReady!"
            ], function(GlobalTree, dom, parser) {
                parser.parse();

                net.apachegui.Main.getInstance().init('Global_Tree');

                dom.byId("globalTreeBody").style.visibility='visible';
            });
        });
    </script>
</head>
<body class="${theme}" id="globalTreeBody" style="visibility:hidden">

    <jsp:include page="/jsp/Init.jsp"     flush="true" />

    <jsp:include page="/jsp/configuration_tree/Dialogs.jsp"     flush="true" />

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design: 'headline'">

        <jsp:include page="/jsp/Heading.jsp"     flush="true" />

        <jsp:include page="/jsp/Menu.jsp"     flush="true" />

        <div class="centerPanel" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="region: 'center'">

            <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'top'">

                <jsp:include page="/jsp/configuration_tree/Legend.jsp" flush="true" />

            </div>

            <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'center'" >

                <div class="tree_container" id="global_tree_container">

                </div>

            </div>

        </div>
    </div>
</body>
</html>


