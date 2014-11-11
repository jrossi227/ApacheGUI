<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div dojoType="net.apachegui.NoCloseDialog" id="initDialogInstallationType" title="How was Apache installed?" style="display: none">
    <form dojoType="dijit.form.Form" id="initFormInstallationType">
        <table>
        	<tr class="dijitDialogPaneContentArea">
            	<td>
            		<label for='source'>
                		Source:
           			</label>
           		</td>
            	<td>
            		<input type="radio" name="installType" id="source" value="source" checked="checked">
            	</td>
        	</tr>
        	<tr class="dijitDialogPaneContentArea">
            	<td>
            		<label for='package'>
                		Package:
            		</label>
            	</td>
            	<td>
            		<input type="radio" name="installType" id="package" value="package">
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
            		<label for='password1'>
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
            		<label for='password2'>
                		Password:
            		</label>
            	</td>
            	<td>
            		<div dojoType="dijit.form.ValidationTextBox" required="true" type="password" id="password2Source">
            		</div>
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