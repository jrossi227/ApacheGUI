<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="database_info" scope="page">
    <h4>Database Version:</h4>
    <p>SQLite version 3.8.11.2</p>

    <h4>Database File:</h4>
    <p>${databaseFile}</p>

    <h4>Table Info:</h4>

    <div>

<pre><span class="SQLKeyword">CREATE</span> <span class="SQLKeyword">TABLE</span> LOGDATA (
    host          <span class="SQLKeyword">VARCHAR</span>(50)<span class="SQLOperator">,</span>
    insertdate    <span class="SQLKeyword">TIMESTAMP</span><span class="SQLOperator">,</span>
    useragent     <span class="SQLKeyword">VARCHAR</span>(500)<span class="SQLOperator">,</span>
    requeststring <span class="SQLKeyword">VARCHAR</span>(1000)<span class="SQLOperator">,</span>
    status        <span class="SQLKeyword">VARCHAR</span>(5)<span
            class="SQLOperator">,</span>
    contentsize   <span class="SQLKeyword">VARCHAR</span>(10)
)</pre>

    </div>
</c:set>

<!DOCTYPE html>
<html lang="en">
<head>

    <script src="../resources/codemirror/lib/codemirror.js?version=${version}"></script>
    <link rel="stylesheet" href="../resources/codemirror/lib/codemirror.css?version=${version}">
    <script src="../resources/codemirror/mode/mysql/mysql.js?version=${version}"></script>

    <%-- Include standard js and css includes --%>
    <jsp:include page="/jsp/Head.jsp" flush="true" />

    <script>
        require([
            <jsp:include page="/jsp/RequireIncludes.jsp" flush="true" />
        ], function() {
            require([
                     "net/apachegui/History",
                     "dijit/form/DateTextBox",
                      "dijit/form/TimeTextBox",
                      "dijit/form/Select",
                      "dijit/form/NumberSpinner",
                      "dijit/form/DropDownButton",
                      "dijit/TooltipDialog",
                      "dijit/Tooltip",
                      "net/apachegui/TitlePane",
                      "dijit/ProgressBar",
                      "dojox/grid/DataGrid",
                      "dijit/layout/TabContainer",
                      "dojo/data/ItemFileWriteStore",
                      "dojo/dom",
                     "dojo/parser",
                     "dojo/domReady!"
            ], function(History, DateTextBox, TimeTextBox, Select, NumberSpinner, DropDownButton, TooltipDialog, Tooltip, TitlePane, ProgressBar, DataGrid, TabContainer, ItemFileWriteStore, dom, parser) {
                 parser.parse();

                 net.apachegui.Main.getInstance().init('History');

                 dom.byId("historyBody").style.visibility='visible';
            });
        });
    </script>
</head>
<body class="${theme}" id="historyBody" style="visibility:hidden">

    <jsp:include page="/jsp/Init.jsp"     flush="true" />

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

        <jsp:include page="/jsp/Heading.jsp"     flush="true" />

        <jsp:include page="/jsp/Menu.jsp"     flush="true" />

        <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
            <div class="dijitDialogPaneContentArea">
                <h3>Historical Data</h3>
            </div>

            <span dojoType="dojo.data.ItemFileWriteStore" jsId="historyStore" url="../web/History/Current" urlPreventCache="true"></span>

            <table dojoType="dojox.grid.DataGrid" jsId="historyGrid" store="historyStore" query="{ numHistory: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
                <thead>
                    <tr>
                        <th width="auto" field="numHistory">
                            Number Of Entries
                        </th>
                        <th width="auto" field="oldHistory">
                                Oldest Time
                        </th>
                        <th width="auto" field="newHistory">
                                Newest Time
                        </th>
                    </tr>
                </thead>
            </table>
            <br/>

            <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%;" doLayout="false">

                <div data-dojo-type="dijit/layout/ContentPane" title="Search" data-dojo-props="selected:true">
                    <table id="searchTable">
                        <tr>
                            <td colspan="2"><h3>Search/Delete History</h3></td>
                        </tr>
                        <tr>
                            <td colspan="2"><b>Start Time</b></td>
                        </tr>
                        <tr>
                            <td width="250">Date:</td>
                            <td><input constraints="{datePattern:'dd/MM/yyyy'}" dojoType="dijit.form.DateTextBox" type="text" id="startDate" name="startDate" required="true"></td>
                          </tr>
                          <tr>
                              <td>Time:</td>
                              <td><input id="startTime" type="text" name="startTime" class="medium" value="" dojoType="dijit.form.TimeTextBox" constraints="{timePattern:'HH:mm:ss'}" required="true" invalidMessage="Invalid time. Use HH:mm:ss where HH is 00 - 23 hours."></td>
                          </tr>
                          <tr>
                              <td colspan="2"><b>End Time</b></td>
                          </tr>
                          <tr>
                              <td>Date:</td>
                              <td><input constraints="{datePattern:'dd/MM/yyyy'}" dojoType="dijit.form.DateTextBox" type="text" id="endDate" name="endDate" required="true"></td>
                          </tr>
                          <tr>
                              <td>Time:</td>
                              <td><input id="endTime" type="text" name="endTime" class="medium" value="" dojoType="dijit.form.TimeTextBox" constraints="{timePattern:'HH:mm:ss'}" required="true" invalidMessage="Invalid time. Use HH:mm:ss where HH is 00 - 23 hours."></td>
                          </tr>
                          <tr>
                              <td><b>Host</b></td>
                              <td><input id="host" type="text" name="host" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>User Agent</b></td>
                              <td><input id="userAgent" type="text" name="userAgent" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>Request String</b></td>
                              <td><input id="requestString" type="text" name="requestString" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>Status</b></td>
                              <td><input id="status" type="text" name="status" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>Content Size</b></td>
                              <td><input id="contentSize" type="text" name="contentSize" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>Max Results</b></td>
                              <td><input id="maxResults" type="text" name="maxResults" class="medium" value="100" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                            <td colspan="2">
                                <div id="search_database_schema" data-dojo-type="net/apachegui/TitlePane" data-dojo-props="title: 'Database Schema', open: false">
                                    ${database_info}
                                </div>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                                <div id="search_database_query" data-dojo-type="net/apachegui/TitlePane" data-dojo-props="title: 'View/Edit Database Query', open: false">

                                    <p>This auto-generated query is used when you click the Search or CSV button below. You may manually adjust the query.</p>

                                    <textarea id="search_database_textarea">

                                    </textarea>

                                </div>
                            </td>
                          </tr>
                          <tr>
                             <td colspan="2">
                                 <div id="delete_database_update" data-dojo-type="net/apachegui/TitlePane" data-dojo-props="title: 'View/Edit Delete Update', open: false">

                                     <p>This auto-generated statement is used when you click the Delete button below. You may manually adjust the statement.</p>

                                    <textarea id="delete_database_textarea">

                                    </textarea>

                                </div>
                             </td>
                          </tr>
                          <tr class="dijitDialogPaneActionBar">
                              <td>
                              </td>
                              <td>
                                  <button dojoType="dijit.form.Button" id="historySearchButton" type="button">
                                    Search
                                </button>
                                <button dojoType="dijit.form.Button" id="historyCSVButton" type="button">
                                    &nbsp;CSV&nbsp;
                                </button>
                                <button dojoType="dijit.form.Button" id="historyDeleteButton" type="button">
                                    Delete
                                </button>
                              </td>
                          </tr>
                      </table>
                </div>

                <div data-dojo-type="dijit/layout/ContentPane" title="Graph">
                    <table id="graphTable">
                          <tr>
                            <td colspan="2"><h3>Graph History</h3></td>
                        </tr>
                        <tr>
                            <td><b>Graph Date:</b></td>
                            <td><input constraints="{datePattern:'dd/MM/yyyy'}" dojoType="dijit.form.DateTextBox" type="text" id="graphDate" name="graphDate" required="true"></td>
                          </tr>
                          <tr>
                            <td><b>Graph Type:</b></td>
                            <td>
                                  <select name="graphType" id="graphType" dojoType="dijit.form.Select">
                                    <option value="day" selected="selected">
                                        Day
                                    </option>
                                    <option value="month">
                                           Month
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                              <td><b>Host</b></td>
                              <td><input id="graphHost" type="text" name="graphHost" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>User Agent</b></td>
                              <td><input id="graphUserAgent" type="text" name="graphUserAgent" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>Request String</b></td>
                              <td><input id="graphRequestString" type="text" name="graphRequestString" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>Status</b></td>
                              <td><input id="graphStatus" type="text" name="graphStatus" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                          <tr>
                              <td><b>Content Size</b></td>
                              <td><input id="graphContentSize" type="text" name="graphContentSize" class="medium" value="" dojoType="dijit.form.TextBox"></td>
                          </tr>
                        <tr>
                            <td colspan="2">
                                <div id="graph_database_schema" data-dojo-type="net/apachegui/TitlePane" data-dojo-props="title: 'Database Schema', open: false">
                                    ${database_info}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div id="graph_database_query" data-dojo-type="net/apachegui/TitlePane" data-dojo-props="title: 'View/Edit Graph Database Query', open: false">

                                    <p>This auto-generated query is used when you click the Graph button below. You may manually adjust the query.</p>

                                    <textarea id="graph_database_textarea">

                                    </textarea>

                                </div>
                            </td>
                        </tr>
                        <tr class="dijitDialogPaneActionBar">
                              <td>
                              </td>
                              <td>
                                  <button dojoType="dijit.form.Button" id="historyGraphButton" type="button">
                                    Graph
                                </button>
                            </td>
                        </tr>
                      </table>
                </div>

                <div data-dojo-type="dijit/layout/ContentPane" title="Options">
                    <table id="optionsTable" >
                        <tr>
                            <td colspan="2"><h3>Options</h3></td>
                        </tr>
                        <tr>
                            <td>Days To Keep History:</td>
                            <td>
                                <input data-dojo-type="dijit.form.NumberSpinner" data-dojo-props="constraints:{min:0,max:1000000,places:0,pattern:'#'}" type="text" id="historyRetention" name="historyRetention">
                                &nbsp;
                                <button dojoType="dijit.form.Button" id="historyRetentionButton" type="button">Update</button>
                            </td>
                             </tr>
                             <tr>
                            <td>
                                Insert Buffer Size:&nbsp;
                                <span id="bufferWarningTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                                 <div class="dijitHidden">
                                     <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'bufferWarningTooltip'">
                                         <div class="warningDialog">
                                             This field controls how many transactions are buffered before being written to the Apache
                                            GUI internal database. This field has performance
                                            impacts and the buffer should be kept as large as possible on
                                            high usage servers.
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <input data-dojo-type="dijit.form.NumberSpinner" data-dojo-props="constraints:{min:0,max:1000000,places:0,pattern:'#'}" type="text" id="historyBuffer" name="historyBuffer">
                                &nbsp;
                                <button dojoType="dijit.form.Button" id="historyBufferButton" type="button">Update</button>
                            </td>
                             </tr>
                        <tr>
                            <td colspan="2">
                                <div id="history_enable_container" data-dojo-type="net/apachegui/TitlePane" data-dojo-props="title: 'Enabled', open: false">
                                    <div id="history_enable_loading_container">
                                        Loading ...
                                        <div data-dojo-type="dijit/ProgressBar" data-dojo-props="indeterminate: true" style="width:300px"></div>
                                    </div>
                                    <div id="history_enabled_hosts_container">

                                    </div>

                                    <div class="button_container">
                                        <button id="saveDisableButton" data-dojo-type="dijit/form/Button" type="button">
                                               Disable
                                           </button>
                                       </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div id="history_disable_container" data-dojo-type="net/apachegui/TitlePane" data-dojo-props="title: 'Disabled', open: false">
                                    <div id="history_disable_loading_container">
                                        Loading ...
                                        <div data-dojo-type="dijit/ProgressBar" data-dojo-props="indeterminate: true" style="width:300px"></div>
                                    </div>
                                    <div id="history_disabled_hosts_container">

                                    </div>

                                    <div class="button_container">
                                        <button id="saveEnableButton" data-dojo-type="dijit/form/Button" type="button">
                                               Enable
                                           </button>
                                       </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
