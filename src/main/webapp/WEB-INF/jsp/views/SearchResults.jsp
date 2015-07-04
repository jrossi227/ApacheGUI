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
                      "dojo/data/ItemFileWriteStore",
                      "dojox/grid/DataGrid",
                      "dojo/dom",
                      "dojo/parser",
                      "net/apachegui/SearchResults",
                      "dojo/domReady!"
             ], function(ItemFileWriteStore, DataGrid, dom, parser, SearchResults) {
                 parser.parse();
                 dom.byId("searchResultsBody").style.visibility='visible';

                 net.apachegui.SearchResults.getInstance().generateGrid("${query}");
             });
         });

    </script>
</head>
<body class="${theme}" id="searchResultsBody" style="visibility:hidden">

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

        <div id="mainPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'top'" style="width: 100%; height:100%;overflow:auto;">
            <div id="grid"></div>
        </div>
    </div>

</body>
</html>