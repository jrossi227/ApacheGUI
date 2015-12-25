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
                          "dijit/layout/TabContainer",
                        "dojo/data/ItemFileWriteStore",
                        "dojox/grid/DataGrid",
                        "dijit/form/Select",
                        'dijit/layout/AccordionContainer',
                        "dijit/Tooltip",
                        "dijit/TooltipDialog",
                        "dijit/form/DropDownButton",
                        "net/apachegui/TitlePane",
                        "net/apachegui/globalsettings/GlobalSettings",
                        "net/apachegui/Control",
                         "dojo/dom",
                         "dojo/parser",
                         "dojo/domReady!"
                 ], function(TabContainer, ItemFileWriteStore, DataGrid, Select, AccordionContainer, Tooltip, TooltipDialog, DropDownButton, TitlePane, GlobalSettings,
                             Networking, Modules, Mime, Control, dom, parser) {
                     dojo.parser.parse();

                     net.apachegui.Main.getInstance().init('Global_Settings');

                     dojo.byId("GlobalSettingsBody").style.visibility='visible';
                 });
             });

    </script>
</head>
<body class="${theme}" id="GlobalSettingsBody" style="visibility:hidden">

    <jsp:include page="/jsp/Init.jsp"     flush="true" />

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

            <jsp:include page="/jsp/Heading.jsp"     flush="true" />

            <jsp:include page="/jsp/Menu.jsp"     flush="true" />

            <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
                <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 100%;" id="globalSettingsTabs">

                    <div data-dojo-type="dijit/layout/ContentPane" title="Networking" id="networkingTab">

                    </div>

                    <div data-dojo-type="dijit/layout/ContentPane" title="MIME Types" id="mimeTab">

                    </div>

                    <div data-dojo-type="dijit/layout/ContentPane" title="Modules" id="modulesTab">

                    </div>

             </div>
         </div>
    </div>

</body>
</html>