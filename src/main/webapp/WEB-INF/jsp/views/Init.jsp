<%@ page import="net.apachegui.global.Constants" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div dojoType="net.apachegui.NoCloseDialog" id="initDialogInstallationType" title="How was Apache installed?" style="display: none">
    <form dojoType="dijit.form.Form" id="initFormInstallationType">
        <h4>Please select your Apache Server installation method.</h4>
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td colspan="2">
                    <p> Select the Package option if you have installed Apache through your Operating Systems package manager.
                        The Apache installation is typically spread out through your operating system.</p>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td width="60px">
                    <label for='package'>
                        Package:
                    </label>
                </td>
                <td>
                    <input type="radio" name="installType" id="package" value="package" checked="checked">
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td colspan="2">
                    <p> Select the Source option if you have compiled the Apache server from its source code.
                        The entire Apache installation is typically contained in one Server Root directory.</p>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td width="60px">
                    <label for='source'>
                        Source:
                    </label>
                </td>
                <td>
                    <input type="radio" name="installType" id="source" value="source">
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button dojoType="dijit.form.Button" type="submit">
                OK
            </button>
        </div>
    </form>
</div>
<div dojoType="net.apachegui.NoCloseDialog" id="initDialogSource" title="Apache Source Parameters" style="display: none">
    <form dojoType="dijit.form.Form" id="initFormSource">
        <table>
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label for='serverRootSource'>
                            Server Root:
                            </label>
                       </td>
                    <td>
                        <div dojoType="dijit.form.ValidationTextBox" required="true" id="serverRootSource">
                        </div>
                    </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='usernameSource'>
                        Username:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="usernameSource">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='password1Source'>
                        Password:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" type="password" id="password1Source">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='password2Source'>
                        Password:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" type="password" id="password2Source">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='enableAuthenticationSource'>
                        Enable Authentication:
                        <span id="enableAuthenticationSourceTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                        <div class="dijitHidden">
                            <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'enableAuthenticationSourceTooltip'">
                                <div class="warningDialog"><%=Constants.AUTHENTICATION_ADVISORY%></div>
                            </div>
                        </div>

                    </label>
                </td>
                <td>
                    <select name="enableAuthenticationSource" id="enableAuthenticationSource" data-dojo-type="dijit/form/Select">
                        <option value="yes" selected="selected">
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
            <button id="hideSourceOption" dojoType="dijit.form.Button" type="button" <c:if test="${windows == true}">style="display:none;"</c:if>>
                Back
            </button>
            <button dojoType="dijit.form.Button" type="submit">
                Submit
            </button>
        </div>
    </form>
</div>
<div dojoType="net.apachegui.NoCloseDialog" id="initDialogPackage" title="Apache Package Parameters" style="display: none">
    <form dojoType="dijit.form.Form" id="initFormPackage">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='operatingSystemSuggestionPackage'>
                        Operating System Suggestion (Optional):
                    </label>
                </td>
                <td>
                    <select name="operatingSystemSuggestionPackage" id="operatingSystemSuggestionPackage" data-dojo-type="dijit/form/Select">
                        <option value="select" selected="selected">
                            Select
                        </option>
                        <option value="mac">
                            Mac OSX
                        </option>
                        <option value="debian">
                            Debian, Ubuntu, Other Debian variants
                        </option>
                        <option value="fedora">
                            Fedora, CentOS, RHEL, other fedora variants
                        </option>
                        <option value="suse32">
                            OpenSUSE and SLES 32 bit
                        </option>
                        <option value="suse64">
                            OpenSUSE and SLES 64 bit
                        </option>
                    </select>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='serverRootPackage'>
                        Server Root:
                        </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="serverRootPackage">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='confFilePackage'>
                        Primary Configuration File:
                        </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="confFilePackage">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='confDirectoryPackage'>
                        Configuration Directory:
                        </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="confDirectoryPackage">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='logDirectoryPackage'>
                        Log Directory:
                       </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="logDirectoryPackage">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='modulesDirectoryPackage'>
                        Modules Directory:
                       </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="modulesDirectoryPackage">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='binFilePackage'>
                        Binary File:
                       </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="binFilePackage">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='usernamePackage'>
                        Username:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="usernamePackage">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='password1Package'>
                        Password:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" type="password" id="password1Package">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='password2Package'>
                        Password:
                    </label>
                </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" type="password" id="password2Package">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='enableAuthenticationPackage'>
                        Enable Authentication:
                        <span id="enableAuthenticationPackageTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                        <div class="dijitHidden">
                            <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'enableAuthenticationPackageTooltip'">
                                <div class="warningDialog"><%=Constants.AUTHENTICATION_ADVISORY%></div>
                            </div>
                        </div>
                    </label>
                </td>
                <td>
                    <select name="enableAuthenticationPackage" id="enableAuthenticationPackage" data-dojo-type="dijit/form/Select">
                        <option value="yes" selected="selected">
                            Yes
                        </option>
                        <option value="no">
                            No
                        </option>
                    </select>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="hidePackageOption" dojoType="dijit.form.Button" type="button">
                Back
            </button>
            <button dojoType="dijit.form.Button" type="submit">
                Submit
            </button>
        </div>
    </form>
</div>