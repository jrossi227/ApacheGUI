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
                     "net/apachegui/Control",
                     "dojox/grid/DataGrid",
                     "dojo/data/ItemFileWriteStore",
                     "dijit/form/NumberSpinner",
                     "dojo/dom",
                     "dojo/parser",
                     "dojo/domReady!"
            ], function(Control, DataGrid, ItemFileWriteStore, NumberSpinner, dom, parser) {
                 parser.parse();

                 net.apachegui.Main.getInstance().init('Control');

                 dom.byId("controlBody").style.visibility='visible';
            });
        });
    </script>
</head>
<body class="${theme}" id="controlBody" style="visibility:hidden">

    <jsp:include page="/jsp/Init.jsp"     flush="true" />

    <ul dojoType="dijit.Menu" id="processes_menu" style="display: none;">
        <div id="killProcessMenuItem" dojoType="dijit.MenuItem">
            Kill
        </div>
    </ul>

    <div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

        <jsp:include page="/jsp/Heading.jsp"     flush="true" />

        <jsp:include page="/jsp/Menu.jsp"     flush="true" />

        <!--  <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.TabContainer" data-dojo-props="region: 'center', tabPosition: 'top'">-->
        <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
            <div id="tab1" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="title: 'Current'">
                <div dojoType="dijit.Dialog" id="startApacheForm" title="Start Apache">
                    <table>
                        <tr>
                              <td><label for="startApacheOptions"></label></td>
                              <td><b>Command: </b>${startCommand} start</td>
                          </tr>
                        </table>
                        <div class="dijitDialogPaneActionBar">
                               <button id="cancelStartApacheButton" dojoType="dijit.form.Button" type="button">
                                   Cancel
                               </button>
                               <button id="startApacheButton" dojoType="dijit.form.Button" type="button">
                                   Start
                               </button>
                        </div>
                </div>
                <div dojoType="dijit.Dialog" id="restartApacheForm" title="Restart Apache">
                    <table>
                        <tr>
                              <td></td>
                              <td><b>Command: </b>${restartCommand} restart</td>
                          </tr>
                        </table>
                        <div class="dijitDialogPaneActionBar">
                               <button id="cancelRestartApacheButton" dojoType="dijit.form.Button" type="button">
                                   Cancel
                               </button>
                               <button id="restartApacheButton" dojoType="dijit.form.Button" type="button">
                                   Restart
                               </button>
                        </div>
                </div>
                <div dojoType="dijit.Dialog" id="stopApacheForm" title="Stop Apache">
                    <table>
                        <tr>
                              <td></td>
                              <td><b>Command: </b>${stopCommand} stop</td>
                          </tr>
                        </table>
                        <div class="dijitDialogPaneActionBar">
                               <button id="cancelStopApacheButton" dojoType="dijit.form.Button" type="button">
                                   Cancel
                               </button>
                               <button id="stopApacheButton" dojoType="dijit.form.Button" type="button">
                                   Stop
                               </button>
                        </div>
                </div>
                <div>
                    <h3>
                        Apache Status
                    </h3>
                        <div id="runningStatusDiv"></div>
                </div>
                <div id="processInfoContainer">
                </div>
                <div id="extendedServerInfoContainer" style="display:none">
                    <div class="dijitDialogPaneContentArea" id="extendedProcessTitle"><h3>Extended Process Information</h3></div>
                        <div class="dijitDialogPaneContentArea">
                            <table width="100%">
                                <tr>
                                    <td width="50%">
                                        <table>
                                            <tr>
                                                <td>
                                                    <b>Total Requests </b>
                                                </td>
                                                <td>
                                                    <span id="totalRequests"></span>
                                                </td>
                                            </tr>
                                            <c:if test="${windows == false}">
                                                <tr>
                                                    <td>
                                                        <b>CPU Load % </b>
                                                    </td>
                                                    <td>
                                                        <span id="cpuUsage"></span>
                                                    </td>
                                                </tr>
                                            </c:if>
                                            <tr>
                                                <td>
                                                    <b>Requests/Second </b>
                                                </td>
                                                <td>
                                                    <span id="requestsPerSecond"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Bytes/Request </b>
                                                </td>
                                                <td>
                                                    <span id="bytesPerRequest"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Idle Workers </b>
                                                </td>
                                                <td>
                                                    <span id="idleWorkers"></span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%">
                                        <table>
                                            <tr>
                                                <td>
                                                    <b>Total KB </b>
                                                </td>
                                                <td>
                                                    <span id="totalKB"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Up Time </b>
                                                </td>
                                                <td>
                                                    <span id="upTime"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Bytes/Second </b>
                                                </td>
                                                <td>
                                                    <span id="bytesPerSecond"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Busy Workers </b>
                                                </td>
                                                <td>
                                                    <span id="busyWorkers"></span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                </div>
                <div id="extendedProcessInfoContainer">
                </div>

                <div id="extendedProcessInfoTable" style="display:none">

                    <table width="100%">

                        <c:choose>
                            <c:when test="${windows == true}">
                                <tr>
                                    <td width="50%">
                                        <table>
                                            <tr>
                                                <td><b>PID </b></td>
                                                <td>Process ID</td>
                                            </tr>
                                            <tr>
                                                <td><b>Last REQ Time </b></td>
                                                <td>Time Since Last Request (Seconds)</td>
                                            </tr>
                                            <tr>
                                                <td><b>MEG </b></td>
                                                <td>Megabytes transferred on this connection</td>
                                            </tr>
                                            <tr>
                                                <td><b>Virtual Host </b></td>
                                                <td>Virtual Host used to process request</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%">
                                        <table>
                                            <tr>
                                                <td><b>REQ </b></td>
                                                <td>Number Of Requests</td>
                                            </tr>
                                            <tr>
                                                <td><b>Last REQ Dur </b></td>
                                                <td>Time taken to process last request (Milliseconds)</td>
                                            </tr>
                                            <tr>
                                                <td><b>Client </b></td>
                                                <td>Client IP Address</td>
                                            </tr>
                                            <tr>
                                                <td><b>Request </b></td>
                                                <td>Request String</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </c:when>
                            <c:otherwise>
                                <tr>
                                    <td width="50%">
                                        <table>
                                            <tr>
                                                <td><b>PID </b></td>
                                                <td>Process ID</td>
                                            </tr>
                                            <tr>
                                                <td><b>CPU </b></td>
                                                <td>CPU Usage (Seconds)</td>
                                            </tr>
                                            <tr>
                                                <td><b>Last REQ Dur </b></td>
                                                <td>Time taken to process last request (Milliseconds)</td>
                                            </tr>
                                            <tr>
                                                <td><b>Client </b></td>
                                                <td>Client IP Address</td>
                                            </tr>
                                            <tr>
                                                <td><b>Request </b></td>
                                                <td>Request String</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%">
                                        <table>
                                            <tr>
                                                <td><b>REQ </b></td>
                                                <td>Number Of Requests</td>
                                            </tr>
                                            <tr>
                                                <td><b>Last REQ Time </b></td>
                                                <td>Time Since Last Request (Seconds)</td>
                                            </tr>
                                            <tr>
                                                <td><b>MEG </b></td>
                                                <td>Megabytes transferred on this connection</td>
                                            </tr>
                                            <tr>
                                                <td><b>Virtual Host </b></td>
                                                <td>Virtual Host used to process request</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </c:otherwise>
                        </c:choose>
                    </table>
                </div>

                <div>
                    <table>
                        <tr>
                            <td>
                                <div class="dijitDialogPaneContentArea">
                                      <button id="processSettingsShow" dojoType="dijit.form.Button" type="button">
                                          Settings <span id="processInfoRefreshRateDisplay"><</span>
                                    </button>
                                    <div dojoType="dijit.Dialog" id="processSettingsForm" title="Process Info Settings">
                                        <table>
                                            <tr>
                                                  <td><label for="processInfoRefreshRate">Refresh Rate: </label></td>
                                                  <td><input dojoType="dijit.form.NumberSpinner" value="" class="medium" constraints="{min:0,places:0}" name="processInfoRefreshRate" id="processInfoRefreshRate"></td>
                                                  <td><label for="processInfoRefreshRatecb">Off </label></td>
                                                  <td><input type="checkbox" name="processInfoRefreshRatecb" id="processInfoRefreshRatecb"></td>
                                              </tr>
                                              <tr>
                                                  <td colspan="2"><label for="extendedStatusToggle">Extended Status View: </label></td>
                                                  <td colspan="2">On <input type="checkbox" name="extendedStatusToggle" id="extendedStatusToggle"></td>
                                              </tr>
                                        </table>
                                        <div class="dijitDialogPaneActionBar">
                                                <button id="hideProcessSettings" dojoType="dijit.form.Button" type="button">
                                                    Cancel
                                                </button>
                                                <button id="submitProcessSettings" dojoType="dijit.form.Button" type="button">
                                                    Submit
                                                </button>
                                        </div>
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