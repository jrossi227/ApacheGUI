<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>

    <%-- Include standard js and css includes --%>
    <jsp:include page="/jsp/Head.jsp" flush="true" />

    <jsp:include page="/jsp/editor/EditorIncludes.jsp"     flush="true" />

    <script>
        require([
             <jsp:include page="/jsp/RequireIncludes.jsp" flush="true" />
         ], function() {
             require([
                      "net/apachegui/Configuration",
                      "dijit/MenuBar",
                      "dijit/PopupMenuBarItem",
                      "dijit/Toolbar",
                      "dijit/form/Select",
                       "dojo/dom",
                      "dojo/parser",
                      "dojo/domReady!"
             ], function(Configuration, MenuBar, PopupMenuBarItem, Toolbar, Select, dom, parser) {
                 parser.parse();

                 var configuration = net.apachegui.Configuration.getInstance();

                 configuration.setEditor('fileTextArea', ${mode});
                 configuration.setOpenTime(${openTime});

                 var editorDiv = $('.CodeMirror-scroll');
                 editorDiv.height('100%');
                 editorDiv.width('100%');

                 net.apachegui.Main.getInstance().init('Configuration-' + net.apachegui.Util.getQueryParam('file'));

                 dom.byId("configurationBody").style.visibility='visible';
             });
         });
    </script>
</head>
<body class="${theme} editor" id="configurationBody" style="visibility:hidden" >

    <jsp:include page="/jsp/Init.jsp" flush="true" />

    <jsp:include page="/jsp/configuration_tree/Dialogs.jsp"     flush="true" />

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

        <jsp:include page="/jsp/Heading.jsp"     flush="true" />

        <jsp:include page="/jsp/Menu.jsp"     flush="true" />

        <div id="centerPanel" class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'center'">
            <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 100%;" id="configurationTabs">

                <div data-dojo-type="dijit/layout/ContentPane" title="Editor View" id="editorTab">

                    <div class="centerPanel" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="region: 'center', tabPosition: 'top'">

                        <jsp:include page="/jsp/editor/EditorMenu.jsp"     flush="true" >
                            <jsp:param name="option" value="Configuration" />
                        </jsp:include>

                        <div id="pane2" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center', title:'Edit'" >
                            <div id="fileform"><textarea id="fileTextArea" name="fileTextArea">Loading File...</textarea></div>
                        </div>
                    </div>

                </div>

                <div data-dojo-type="dijit/layout/ContentPane" title="Tree View" id="treeTab">

                    <div class="centerPanel" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="region: 'center', tabPosition: 'top'">
                        <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'top'">

                            <jsp:include page="/jsp/configuration_tree/Legend.jsp" flush="true" /><span><strong>File</strong>: ${filePath}</span>

                        </div>

                        <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'center'">
                            <div class="tree_container" id="configuration_tree_container">

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

</body>
</html>