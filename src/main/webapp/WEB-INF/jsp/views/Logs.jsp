<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
        
<!DOCTYPE html>
<html lang="en">
<head>
    <%-- Include standard js and css includes --%>
    <jsp:include page="/jsp/Head.jsp" flush="true" />

    <link rel="stylesheet" href="../resources/codemirror/lib/codemirror.css?version=${version}">

    <script src="../resources/codemirror/lib/codemirror.js?version=${version}"></script>

    <script>
           require([
             <jsp:include page="/jsp/RequireIncludes.jsp" flush="true" />
         ], function() {
             require([
                      "net/apachegui/Logs",
                       "dijit/form/Select",
                       "dojo/dom",
                      "dojo/parser",
                      "dojo/domReady!"
             ], function(Logs, Select, dom, parser) {
                 parser.parse();

                    net.apachegui.Main.getInstance().init('Logs-${filePath}');
                 dom.byId('tailLogButton').innerHTML='Start Tail';

                    var logs=net.apachegui.Logs.getInstance();

                 logs.setSearchTextArea(CodeMirror.fromTextArea(document.getElementById("searchTextArea"), {mode: 'text/plain'}));
                 logs.setTailTextArea(CodeMirror.fromTextArea(document.getElementById("tailTextArea"), {mode: 'text/plain'}));

                 logs.setCurrOption('${option}');
                 logs.updateSelection();

                 dom.byId("logsBody").style.visibility='visible';
             });
         });
    </script>
</head>
<body class="${theme}" id="logsBody" style="visibility:hidden">

    <jsp:include page="/jsp/Init.jsp"     flush="true" />

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

        <jsp:include page="/jsp/Heading.jsp"     flush="true" />

        <jsp:include page="/jsp/Menu.jsp"     flush="true" />

        <div class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'" style="width: 100%; height:100%;overflow:auto;">
        <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.BorderContainer" style="width: 100%; height:100%;overflow:auto;">
            <div id="optionPane" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'top'">
                <h3>Log Options</h3>
                <table>
                    <tr>
                        <td><b>Log File:</b></td>
                        <td><span id="filePath">${filePath}</span></td>
                    </tr>
                    <tr>
                        <td><b>Log Size:</b></td>
                        <td>${fileSize} KB</td>
                    </tr>
                    <tr>
                        <td><label for="logAction"><b>Action</b></label></td>
                        <td>
                            <select name="logAction" id="logAction" dojoType="dijit.form.Select">
                                <option value="search" <c:if test="${option == 'search'}">selected='selected'</c:if>>
                                    Search
                                </option>
                                <option value="download">
                                       Download
                                </option>
                                <option value="tail" <c:if test="${option == 'tail'}">selected='selected'</c:if>>
                                    Tail
                                </option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="logSearchDiv" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
                <div class="centerPanel" data-dojo-type="dijit.layout.BorderContainer">
                    <div id="searchOptions"  data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'top'">
                        <div class="dijitDialogPaneContentArea">
                            <label for='searchFilter'>
                                <b>Search Filter (Java Regex):</b>
                               </label>

                            <div dojoType="dijit.form.TextBox" id="searchFilter">
                            </div>

                            <button id="searchButton" dojoType="dijit.form.Button" type="button">
                                Search
                            </button>
                            <button id="searchClearButton" dojoType="dijit.form.Button" type="button">
                                Clear&nbsp;
                            </button>
                            <button id="searchExportButton" dojoType="dijit.form.Button" type="button">
                                Export
                            </button>
                        </div>
                    </div>
                    <div data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
                        <table style="width: 100%; height:90%;">
                            <tr valign="top">
                                <td style="width: 100%;height:95%;">
                                    <textarea id="searchTextArea"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div id="logTailDiv" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
                <div  class="centerPanel" data-dojo-type="dijit.layout.BorderContainer">
                    <div id="tailOptions" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'top'">
                        <div class="dijitDialogPaneContentArea">
                                <label for='tailFilter'>
                                    <b>Tail Filter (Java Regex):&nbsp;</b>
                                   </label>
                                <span dojoType="dijit.form.TextBox" id="tailFilter">
                                </span>
                                <button id="tailLogButton" dojoType="dijit.form.Button" type="button">
                                    Start Tail
                                </button>
                                <button id="clearTailLogButton" dojoType="dijit.form.Button" type="button">
                                    Clear
                                </button>
                            </div>
                    </div>
                    <div data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
                        <table style="width: 100%; height:90%;">
                            <tr valign="top">
                                <td style="width: 100%;height:95%;">
                                    <textarea id="tailTextArea"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

</body>
</html>
