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
                      "dojo/domReady!"
             ], function(ItemFileWriteStore, DataGrid, dom, parser) {
                 parser.parse();
                 dom.byId("searchResultsBody").style.visibility='visible';
             });
         });

    </script>
</head>
<body class="${theme}" id="searchResultsBody" style="visibility:hidden">

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

        <div id="mainPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'top'" style="width: 100%; height:100%;overflow:auto;">
            <span dojoType="dojo.data.ItemFileWriteStore" jsId="historyStore" url="../web/SearchResults?option=window&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&host=${host}&userAgent=${userAgent}&requestString=${requestString}&status=${status}&contentSize=${contentSize}&maxResults=${maxResults}">
            </span>
            <table dojoType="dojox.grid.DataGrid" jsId="historyGrid" store="historyStore" query="{ insertDate: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
                <thead>
                    <tr>
                        <th width="75px" field="id">
                              Result
                          </th>
                        <th width="auto" field="insertDate">
                              Insert Date
                          </th>
                          <th width="auto" field="host">
                              Host
                          </th>
                          <th width="auto" field="userAgent">
                                  User Agent
                          </th>
                          <th width="auto" field="requestString">
                                  Request String
                          </th>
                          <th width="auto" field="status">
                                  Status
                          </th>
                          <th width="auto" field="contentSize">
                                  Content Size
                          </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>

</body>
</html>