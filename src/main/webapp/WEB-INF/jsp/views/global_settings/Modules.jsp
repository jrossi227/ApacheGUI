<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- Modules Menu Listeners --%>
<div style="display: none;">
    <ul dojoType="dijit.Menu" id="sharedModules_menu">
           <div id="sharedModulesMenuItem" dojoType="dijit.MenuItem">
               Mark For Removal
           </div>
    </ul>
</div>

<div style="display: none;">
    <ul dojoType="dijit.Menu" id="availableModules_menu">
           <div id="availableModulesMenuItem" dojoType="dijit.MenuItem">
               Show Load Directive
           </div>
    </ul>
</div>

<div class="dijitDialogPaneContentArea">
    <h4>Compiled In</h4>
</div>
<span dojoType="dojo.data.ItemFileWriteStore" jsId="staticModulesStore" url="../web/Modules?option=${staticModulesType}" urlPreventCache="true">
</span>
<table dojoType="dojox.grid.DataGrid" jsId="staticModulesGrid" store="staticModulesStore" query="{ name: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
    <thead>
         <tr>
             <th width="250px" field="name">
                 Module Name
             </th>
             <th width="auto" field="type">
                     Module Type
             </th>
         </tr>
    </thead>
</table>

<br>
<div class="dijitDialogPaneContentArea">
    <strong>Loaded In</strong>&nbsp;&nbsp;&nbsp;
    <button id="removalButton" dojoType="dijit.form.Button" type="button">Apply Removal</button>
     <button id="resetRemovalButton" dojoType="dijit.form.Button" type="button">&nbsp;&nbsp;Reset Grid&nbsp;&nbsp;</button>
 
    <span id="modulesTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
    <div class="dijitHidden">
        <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'modulesTooltip'">
            <div class="warningDialog">${restartWarning}</div>
        </div>
    </div>
</div>

<span dojoType="dojo.data.ItemFileWriteStore" jsId="sharedModulesStore" url="../web/Modules?option=${sharedModulesType}" urlPreventCache="true">
</span>
<table dojoType="dojox.grid.DataGrid" jsId="sharedModulesGrid" store="sharedModulesStore" query="{ name: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
    <thead>
         <tr>
             <th width="250px" field="name">
                 Module Name
             </th>
             <th width="250px" field="type">
                     Module Type
             </th>
             <th width="auto" field="status">
                     Status
             </th>
         </tr>
    </thead>
</table>

<br>
<div class="dijitDialogPaneContentArea">
    <strong>Available Modules in ${modulesDirectory}</strong>&nbsp;&nbsp;&nbsp;
    <button id="resetAvailableButton" dojoType="dijit.form.Button" type="button">&nbsp;&nbsp;Reset Grid&nbsp;&nbsp;</button>
</div>

<span dojoType="dojo.data.ItemFileWriteStore" jsId="availableModulesStore" url="../web/Modules?option=${availableModulesType}" urlPreventCache="true">
</span>
<table dojoType="dojox.grid.DataGrid" jsId="availableModulesGrid" store="availableModulesStore" query="{ name: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
    <thead>
         <tr>
             <th width="250px" field="name">
                 Module Name
             </th>
             <th width="250px" field="filename">
                     Module Filename
             </th>
             <th width="auto" field="status">
                     Status
             </th>
         </tr>
    </thead>
</table>
