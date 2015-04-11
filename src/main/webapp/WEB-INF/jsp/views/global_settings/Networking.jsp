<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- Global Settings menu Listeners --%>

<div style="display: none;">
    <ul dojoType="dijit.Menu" id="remove_listen_menu">
           <div id="removeListenMenuItem" dojoType="dijit.MenuItem">
               Remove Listener
           </div>
    </ul>
</div>

<div style="display: none;">
    <ul dojoType="dijit.Menu" id="remove_name_virtual_host_menu">
           <div id="removeNameVirtualHostMenuItem" dojoType="dijit.MenuItem">
               Remove Name Virtual Host
           </div>
    </ul>
</div>

<div dojoType="dijit.Dialog" id="addListenDialog" title="Add Listen" style="display: none">
       <table>
           <tr class="dijitDialogPaneContentArea">
                   <td colspan="2">
                       <strong>IP Address (Specify One):</strong>
                      </td>
           </tr>
           <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='addAllListenIp'>
                           All:
                       </label>
                      </td>
                   <td>
                       <input type="checkbox" id="addAllListenIp"/>
                   </td>
           </tr>
           <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='addListenIp'>
                           Address:
                           </label>
                      </td>
                   <td>
                       <div dojoType="dijit.form.TextBox" id="addListenIp">
                       </div>
                   </td>
           </tr>
           <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='addListenPort'>
                           <strong>Port:</strong>
                           </label>
                      </td>
                   <td>
                       <div dojoType="dijit.form.ValidationTextBox" required="true" id="addListenPort" style="width: 4em;">
                       </div>
                   </td>
           </tr>
           <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='addListenProtocol'>
                           <strong>Protocol:</strong>
                           </label>
                      </td>
                   <td>
                       <select name="editorThemeSelector" id="addListenProtocol" dojoType="dijit.form.Select">
                           <option value="">
                               ALL
                           </option>
                           <option value="http">
                               HTTP
                           </option>
                           <option value="https">
                               HTTPS
                           </option>
                       </select>
                   </td>
           </tr>
       </table>
       <div class="dijitDialogPaneActionBar">
           <button id="addListenSubmitButton" dojoType="dijit.form.Button" type="button">
               Add
           </button>
           <button id="addListenCloseButton" dojoType="dijit.form.Button" type="button">
               Cancel
           </button>
       </div>
</div>

<div dojoType="dijit.Dialog" id="addNameVirtualHostDialog" title="Add Name Based Virtual Host" style="display: none">
       <table>
           <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='addNameVirtualHostAddress'>
                           <strong>Address:</strong>
                           </label>
                      </td>
                   <td>
                       <div dojoType="dijit.form.ValidationTextBox" required="true" id="addNameVirtualHostAddress">
                       </div>
                   </td>
           </tr>
           <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='addNameVirtualHostPort'>
                           <strong>Port:</strong>
                           </label>
                      </td>
                   <td>
                       <div  dojoType="dijit.form.TextBox" id="addNameVirtualHostPort" style="width: 4em;">
                       </div>
                   </td>
           </tr>
       </table>
       <div class="dijitDialogPaneActionBar">
           <button id="addNameVirtualHostSubmitButton" dojoType="dijit.form.Button" type="button">
               Add
           </button>
           <button id="addNameVirtualHostCloseButton" dojoType="dijit.form.Button" type="button">
               Cancel
           </button>
       </div>
</div>


<div title="Listening" open="true" data-dojo-type="net/apachegui/TitlePane" id="listeningContainer">

    <h4>
        Current Listeners:&nbsp;

        <span id="listenTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
        <div class="dijitHidden">
            <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'listenTooltip'">
                <div class="warningDialog">
                    ${restartWarning}
                </div>
            </div>
        </div>
    </h4>

    <span dojoType="dojo.data.ItemFileWriteStore" jsId="globalListeningStore" url="../web/Networking?option=listening" urlPreventCache="true"></span>
    <table id="globalListeningGrid" dojoType="dojox.grid.DataGrid" jsId="globalListeningGrid" store="globalListeningStore" query="{ ip: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
        <thead>
            <tr>
                <th width="auto" field="ip">
                    IP
                </th>
                <th width="auto" field="port">
                    Port
                </th>
                <th width="auto" field="protocol">
                    Protocol
                </th>
            </tr>
        </thead>
    </table>

    <button id="addListenButton" dojoType="dijit.form.Button" type="button">Add</button>

</div>


<div title="Name Based Virtual Hosts" open="false" data-dojo-type="net/apachegui/TitlePane" id="nameVirtualHostContainer" <c:if test="${NameVhostSupport == false}">style="display:none;"</c:if>>

    <h4>
        Current Name Based Virtual Hosts:&nbsp;

        <span id="nameVirtualHostTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
        <div class="dijitHidden">
            <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'nameVirtualHostTooltip'">
                <div class="warningDialog">
                    ${restartWarning}
                </div>
            </div>
        </div>
    </h4>

    <span dojoType="dojo.data.ItemFileWriteStore" jsId="globalNameVirtualHostStore" url="../web/Networking?option=nameVirtualHost" urlPreventCache="true"></span>
    <table id="globalNameVirtualHostGrid" dojoType="dojox.grid.DataGrid" jsId="globalNameVirtualHostGrid" store="globalNameVirtualHostStore" query="{ address: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
        <thead>
            <tr>
                <th width="auto" field="address">
                    Address
                </th>
                <th width="auto" field="port">
                    Port
                </th>
            </tr>
        </thead>
    </table>

    <button id="addNameVirtualHostButton" dojoType="dijit.form.Button" type="button">Add</button>

</div>

<div title="Keep Alive" open="false" data-dojo-type="net/apachegui/TitlePane" id="keepAliveContainer">
    <div id="keepAliveStatusContainer">
        <h4>
            Keep Alive:&nbsp;

            <span id="keepAliveTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
            <div class="dijitHidden">
                <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'keepAliveTooltip'">
                    <div class="warningDialog">
                        ${restartWarning}
                    </div>
                </div>
            </div>
        </h4>

        <input type="radio" id="keepAliveStatusOn" name="keepAliveStatus" value="on" <c:if test="${keepAlive == true}">checked</c:if>>&nbsp;<strong>On</strong> <br/>

        <input type="radio" id="keepAliveStatusOff" name="keepAliveStatus" value="off" <c:if test="${keepAlive == false}">checked</c:if>>&nbsp;<strong>Off</strong> <br/>


        <button id="keepAliveStatusButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>

    </div>

    <div id="keepAliveOptionsContainer" <c:if test="${keepAlive == false}">style="display:none;"</c:if>>
        <div class="column_two" id="keepAliveTimeoutContainer">
            <h4>Keep Alive Timeout:</h4>

            <div style="float:left">

                <div  dojoType="dijit.form.TextBox" id="keepAliveTimeoutSeconds" style="width: 4em;" value="${keepAliveTimeout}"></div> (Seconds) <br/>

                <button id="saveKeepAliveTimeoutButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>
            </div>

        </div>
        <div class="column_two" id="requestsPerConnectionContainer">
            <h4>Requests per Connection:</h4>

            <div style="float:left">

                <input type="radio" name="requestsPerConnection" id="requestsPerConnectionUnlimited" value="unlimited" <c:if test="${maxKeepAliveRequests == 0}">checked</c:if>>&nbsp;<strong>Unlimited</strong> <br/>

                <input type="radio" name="requestsPerConnection" id="requestsPerConnectionNumber" value="number" <c:if test="${maxKeepAliveRequests != 0}">checked</c:if>>
                <div  dojoType="dijit.form.TextBox" id="requestsPerConnectionNum" style="width: 4em;" value="<c:if test="${maxKeepAliveRequests != 0}">${maxKeepAliveRequests}</c:if>"></div><br/>

                <button id="requestsPerConnectionButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>
            </div>
        </div>
    </div>
</div>

<div title="Request Settings" open="false" data-dojo-type="net/apachegui/TitlePane" id="requestSettingsContainer">

    <div>
        <h4>
            Request Settings

            <span id="requestSettingsTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
            <div class="dijitHidden">
                <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'requestSettingsTooltip'">
                    <div class="warningDialog">
                        ${restartWarning}
                    </div>
                </div>
            </div>
        </h4>
    </div>

    <div class="column_two" id="requestTimeoutContainer">
        <h4>Request Timeout:</h4>

        <div style="float:left">

            <div  dojoType="dijit.form.TextBox" id="requestTimeoutSeconds" style="width: 4em;" value="${timeout}"></div> (Seconds) <br/>

            <button id="requestTimeoutButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>
        </div>
    </div>

    <div class="column_two" id="listenBackLogContainer">
        <h4>Listen Queue Length:</h4>

        <div style="float:left">

            <div  dojoType="dijit.form.TextBox" id="listenBackLogLength" style="width: 4em;" value="${listenBackLogLength}"></div><br/>

            <button id="listenBackLogButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>
        </div>
    </div>

</div>

<div title="Server Settings" open="false" data-dojo-type="net/apachegui/TitlePane" id="serverSettingsContainer">

    <div  class="column_two">
        <h4>
            Server HTTP Header

            <span id="serverHeaderRestartTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
            <div class="dijitHidden">
                <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'serverHeaderRestartTooltip'">
                    <div class="warningDialog">
                        ${restartWarning}
                    </div>
                </div>
            </div>
        </h4>

        <select name="serverTokensSelector" id="serverTokensSelector" dojoType="dijit.form.Select">
            <option value="Major" <c:if test="${serverToken == ServerToken_MAJOR}">selected="selected"</c:if>>
                Major
            </option>
            <option value="Minor" <c:if test="${serverToken == ServerTokens_MINOR}">selected="selected"</c:if>>
                Minor
            </option>
            <option value="Min" <c:if test="${serverToken == ServerTokens_MINIMAL}">selected="selected"</c:if>>
                Min
            </option>
            <option value="Prod" <c:if test="${serverToken == ServerTokens_PROD}">selected="selected"</c:if>>
                Prod
            </option>
            <option value="OS" <c:if test="${serverToken == ServerTokens_OS}">selected="selected"</c:if>>
                OS
            </option>
            <option value="Full" <c:if test="${serverToken == ServerTokens_FULL}">selected="selected"</c:if>>
                Full
            </option>
        </select>

        <button id="serverTokensButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>

        <div id="serverTokenPreviewContainer">
            <h4>
                Example Header:

                <span id="serverTokensTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                <div class="dijitHidden">
                    <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'serverTokensTooltip'">
                        <div class="warningDialog">The following is an example
                            only. The real http header will differ based on your operating
                            system and Apache version.</div>
                    </div>
                </div>
            </h4>

            <span class="serverTokenPreview hidden<c:if test="${serverToken == ServerTokens_MAJOR}"> selected</c:if>" id="serverTokens_Major_preview">
                Server: Apache/2
            </span>
            <span class="serverTokenPreview hidden<c:if test="${serverToken == ServerTokens_MINOR}"> selected</c:if>" id="serverTokens_Minor_preview">
                Server: Apache/2.4
            </span>
            <span class="serverTokenPreview hidden<c:if test="${serverToken == ServerTokens_MINIMAL}"> selected</c:if>" id="serverTokens_Min_preview">
                Server: Apache/2.4.2
            </span>
            <span class="serverTokenPreview hidden<c:if test="${serverToken == ServerTokens_PROD}"> selected</c:if>" id="serverTokens_Prod_preview">
                Server: Apache
            </span>
            <span class="serverTokenPreview hidden<c:if test="${serverToken == ServerTokens_OS}"> selected</c:if>" id="serverTokens_OS_preview">
                Server: Apache/2.4.2 (Unix)
            </span>
            <span class="serverTokenPreview hidden<c:if test="${serverToken == ServerTokens_FULL}"> selected</c:if>" id="serverTokens_Full_preview">
                Server: Apache/2.4.2 (Unix) PHP/4.2.2 MyMod/1.2
            </span>
        </div>
    </div>

    <!-- Server Signature (ServerSignature)-->
    <div  class="column_two">
        <h4>
            Server Signature

            <span id="serverSignatureRestartTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
            <div class="dijitHidden">
                <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'serverSignatureRestartTooltip'">
                    <div class="warningDialog">
                        ${restartWarning}
                    </div>
                </div>
            </div>
        </h4>
        <select name="serverSignatureSelector" id="serverSignatureSelector" dojoType="dijit.form.Select">
            <option value="On" <c:if test="${serverSignature == ServerSignature_ON}">selected="selected"</c:if>>
                On
            </option>
            <option value="Off" <c:if test="${serverSignature == ServerSignature_OFF}">selected="selected"</c:if>>
                Off
            </option>
            <option value="Email" <c:if test="${serverSignature == ServerSignature_EMAIL}">selected="selected"</c:if>>
                Email
            </option>
        </select>

        <button id="serverSignatureButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>

        <div id="serverSignaturePreviewContainer">
            <h4>
                Example Signature:

                <span id="serverSignatureTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                <div class="dijitHidden">
                    <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'serverSignatureTooltip'">
                        <div class="warningDialog">The following is an example only. The
                            real server signature will differ based on your operating system
                            and Apache version.</div>
                    </div>
                </div>
            </h4>

            <span id="serverSignaturePreview">
            </span>
        </div>
    </div>

    <c:if test="${windows == false}">
        <!-- Server Name -->

        <div  class="column_two">
            <h4>
                Run as user

                <span id="serverNameRestartTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                <div class="dijitHidden">
                    <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'serverNameRestartTooltip'">
                        <div class="warningDialog">
                            ${restartWarning}
                        </div>
                    </div>
                </div>
            </h4>

            <div style="float:left">

                <div  dojoType="dijit.form.TextBox" id="apacheUser" value="${user}"></div><br/>

                <button id="apacheUserButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>
            </div>

        </div>

        <!-- Server Admin Email -->
        <div  class="column_two">
            <h4>
                Run as group

                <span id="serverEmailRestartTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                <div class="dijitHidden">
                    <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'serverEmailRestartTooltip'">
                        <div class="warningDialog">
                            ${restartWarning}
                        </div>
                    </div>
                </div>
            </h4>

            <div style="float:left">

                <div  dojoType="dijit.form.TextBox" id="apacheGroup" value="${group}"></div><br/>

                <button id="apacheGroupButton" dojoType="dijit.form.Button" type="button" disabled="disabled">Save</button>
            </div>

        </div>
    </c:if>

</div>
