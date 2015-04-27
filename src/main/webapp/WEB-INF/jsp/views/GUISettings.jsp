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
                "net/apachegui/GUISettings",
                "dojox/grid/DataGrid",
                "dojo/data/ItemFileWriteStore",
                "dijit/ProgressBar",
                "dijit/form/Select",
                "dojo/dom",
                "dojo/parser",
                "dojo/domReady!"
            ], function(GUISettings, DataGrid, ItemFileWriteStore, ProgressBar, Select, dom, parser) {
                parser.parse();

                net.apachegui.Main.getInstance().init('GUISettings');

                dom.byId("guiSettingsBody").style.visibility='visible';
            });
        });

    </script>
</head>
<body class="${theme}" id="guiSettingsBody" style="visibility:hidden">

<jsp:include page="/jsp/Init.jsp"     flush="true" />

<div style="display: none;">
    <ul dojoType="dijit.Menu" id="settings_menu">
        <div id="editSettingsMenuItem" dojoType="dijit.MenuItem">
            Edit
        </div>
    </ul>
</div>
<div dojoType="dijit.Dialog" id="updateServerRootDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateServerRootForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingServerRoot'>
                        Server Root:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingServerRoot">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="serverRootUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="serverRootUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updateConfDirectoryDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateConfDirectoryForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingConfDirectory'>
                        Configuration Directory:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingConfDirectory">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="configurationDirectoryUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="configurationDirectoryUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updateConfFileDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateConfFileForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingConfFile'>
                        Configuration File:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingConfFile">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="configurationFileUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="configurationFileUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updateLogDirectoryDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateLogDirectoryForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingLogDirectory'>
                        Log Directory:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingLogDirectory">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="logDirectoryUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="logDirectoryUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updateModulesDirectoryDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateModulesDirectoryForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingModulesDirectory'>
                        Modules Directory:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingModulesDirectory">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="modulesDirectoryUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="modulesDirectoryUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updateBinFileDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateBinFileForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingBinFile'>
                        Binary File:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingBinFile">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="binaryFileUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="binaryFileUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updateUsernameDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateUsernameForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingUsername'>
                        Username:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingUsername">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="usernameUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="usernameUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updatePasswordDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updatePasswordForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingPassword1'>
                        Password1:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingPassword1" type="password">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateSettingPassword2'>
                        Password2:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="updateSettingPassword2" type="password">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="passwordUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="passwordUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="updateThemeDialog" title="Update" style="display: none">
    <form dojoType="dijit.form.Form" id="updateThemeForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='claro'>
                        Claro:
                    </label>
                </td>
                <td>
                    <input type="radio" name="themeType" id="claro" value="claro">
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='nihilo'>
                        Nihilo:
                    </label>
                </td>
                <td>
                    <input type="radio" name="themeType" id="nihilo" value="nihilo">
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='soria'>
                        Soria:
                    </label>
                </td>
                <td>
                    <input type="radio" name="themeType" id="soria" value="soria">
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='tundra'>
                        Tundra:
                    </label>
                </td>
                <td>
                    <input type="radio" name="themeType" id="tundra" value="tundra">
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="themeUpdate" dojoType="dijit.form.Button" type="button">
                Submit
            </button>
            <button id="themeUpdateCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>

<div dojoType="dijit.Dialog" id="updateEncodingDialog" title="Update" style="display: none">

    <p>This GUI uses the UTF-8 character encoding for updates to all text files. This is the preferred character encoding for web pages throughout the internet and cannot be changed.</p>
    <div class="dijitDialogPaneActionBar">
        <button id="encodingUpdateCancel" dojoType="dijit.form.Button" type="button">
            Ok
        </button>
    </div>
</div>

<div data-dojo-type="dijit/Dialog" id="updateEnableAuthenticationDialog" title="Update" style="display: none">
    <form data-dojo-type="dijit/form/Form" id="updateEnableAuthenticationForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='updateEnableAuthentication'>
                        Enable Authentication:
                    </label>
                </td>
                <td>
                    <select name="updateEnableAuthentication" id="updateEnableAuthentication" data-dojo-type="dijit/form/Select">
                        <option value="yes">
                            yes
                        </option>
                        <option value="no">
                            no
                        </option>
                    </select>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="enableAuthenticationUpdate" data-dojo-type="dijit/form/Button" type="button">
                Submit
            </button>
            <button id="enableAuthenticationUpdateCancel" data-dojo-type="dijit/form/Button" type="button">
                Cancel
            </button>
        </div>
    </form>
</div>

<div dojoType="dijit.Dialog" id="guiInfoDialog" title="GUI Info" style="display: none" >
    <table id="guiInfoTable">
        <tr class="dijitDialogPaneContentArea">
            <td width="125">
                Version:
            </td>
            <td width="200">
                ${version}
            </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
            <td>
                Homepage:
            </td>
            <td>
                <a target="_blank" href="${website}">${website}</a>
            </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
            <td>
                Support:
            </td>
            <td>
                <a target="_blank" href="${supportWebsite}">${supportWebsite}</a><br>
                <a href="mailto:${supportAddress}">${supportAddress}</a>
            </td>
        </tr>
    </table>
    <div class="dijitDialogPaneActionBar">
        <button id="guiInfoClose" dojoType="dijit.form.Button" type="button">
            Ok
        </button>
    </div>
</div>
<div id="appLayout" class="demoLayout" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">

    <jsp:include page="/jsp/Heading.jsp"     flush="true" />

    <jsp:include page="/jsp/Menu.jsp"     flush="true" />

    <div id="centerPanel" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">
        <div class="dijitDialogPaneContentArea"><h3>Application Settings</h3></div>
            <span dojoType="dojo.data.ItemFileWriteStore" jsId="settingsStore" url="../web/GUISettings/Current" urlPreventCache="true">
            </span>
        <table id="settingsGrid" dojoType="dojox.grid.DataGrid" jsId="settingsGrid" store="settingsStore" query="{ name: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
            <thead>
            <tr>
                <th width="200px" field="name">
                    Setting Name
                </th>
                <th width="auto" field="value">
                    Setting Value
                </th>
            </tr>
            </thead>
        </table>
        <div>
            <button id="serverInfoButton" dojoType="dijit.form.Button" type="button">
                Apache Info
            </button>
            <button id="guiInfoButton" dojoType="dijit.form.Button" type="button">
                &nbsp;GUI Info&nbsp;&nbsp;
            </button>
            <button id="newServerButton" dojoType="dijit.form.Button" type="button">
                New Server&nbsp;
            </button>
        </div>
    </div>
</div>

</body>
</html>
