<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
    <%-- Include standard js and css includes --%>
    <jsp:include page="/jsp/Head.jsp" flush="true" />

    <c:if test="${fileType == 'text'}">
        <jsp:include page="/jsp/editor/EditorIncludes.jsp"     flush="true" />
    </c:if>

    <script>
        require([
             <jsp:include page="/jsp/RequireIncludes.jsp" flush="true" />
         ], function() {
             require([
                      "net/apachegui/Documents",
                      "dijit/MenuBar",
                      "dijit/PopupMenuBarItem",
                      "dijit/Toolbar",
                      "dijit/form/Select",
                       "dojo/dom",
                      "dojo/parser",
                      "dojo/domReady!"
             ], function(Documents, MenuBar, PopupMenuBarItem, Toolbar, Select, dom, parser) {
                 parser.parse();

                 <c:if test="${fileType == 'text'}">
                     var documents=net.apachegui.Documents.getInstance();

                     documents.setIsText(true);
                     documents.setEditor('fileTextArea', ${mode});
                     documents.setOpenTime(${openTime});

                     var editorDiv = $('.CodeMirror-scroll');
                     editorDiv.height('100%');
                     editorDiv.width('100%');

                 </c:if>

                 net.apachegui.Main.getInstance().init('Documents-${filePath}');

                 dom.byId("documentsBody").style.visibility='visible';
             });
         });
    </script>
</head>
<body class="${theme} editor" id="documentsBody" style="visibility:hidden">

    <jsp:include page="/jsp/Init.jsp" flush="true" />
    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

        <jsp:include page="/jsp/Heading.jsp"     flush="true" />

        <jsp:include page="/jsp/Menu.jsp"     flush="true" />

        <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="region: 'center', tabPosition: 'top'">

            <c:if test="${fileType == 'text'}">

                <jsp:include page="/jsp/editor/EditorMenu.jsp"     flush="true" >
                    <jsp:param name="option" value="Documents" />
                </jsp:include>

            </c:if>

            <div id="pane2" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center', title:'Edit'">
            <c:if test="${fileType == 'text'}">

                <div id="fileform"><textarea id="fileTextArea" name="fileTextArea">Loading File...</textarea></div>
            </c:if>
            <c:if test="${fileType == 'image'}">

                <img alt="image" src="../web/Image?file=${filePath}" />

            </c:if>
            </div>
        </div>
    </div>
</body>
</html>