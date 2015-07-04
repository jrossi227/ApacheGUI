<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 
<%-- MIME Menu Listeners --%>
<div style="display: none;">
    <ul dojoType="dijit.Menu" id="added_mimes_menu">
           <div id="addMimeMenuItem" dojoType="dijit.MenuItem">
               Add New Mime
           </div>
           <div id="editMimeMenuItem" dojoType="dijit.MenuItem">
               Edit Mime
           </div>
           <div id="removeMimeMenuItem" dojoType="dijit.MenuItem">
               Remove Mime
           </div>
    </ul>
</div>

<div dojoType="dijit.Dialog" id="addMimeDialog" title="Add New Mime Type" style="display: none">
   <table>
        <tr class="dijitDialogPaneContentArea">
               <td>
                   <label for='addMimeType'>
                       <strong>Type:</strong>
                       </label>
                  </td>
               <td>
                   <div dojoType="dijit.form.ValidationTextBox" required="true" id="addMimeType">
                   </div>
               </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
               <td>
                   <label for='addMimeExtensions'>
                       <strong>Extensions:</strong>
                       </label>
                  </td>
               <td>
                   <div  dojoType="dijit.form.TextBox" required="true" id="addMimeExtensions">
                   </div>
               </td>
        </tr>
   </table>
   <div class="dijitDialogPaneActionBar">
       <button id="addMimeSubmitButton" dojoType="dijit.form.Button" type="button">
           Add
       </button>
       <button id="addMimeCloseButton" dojoType="dijit.form.Button" type="button">
           Cancel
       </button>
   </div>
</div>

<div dojoType="dijit.Dialog" id="editMimeDialog" title="Edit Mime Type" style="display: none">
    <table>
        <tr class="dijitDialogPaneContentArea">
              <td>
                  <label for='editMimeType'>
                      <strong>Type:</strong>
                      </label>
                 </td>
              <td>
                  <span id="editMimeType"></span>
              </td>
        </tr>
        <tr class="dijitDialogPaneContentArea">
               <td>
                   <label for='editMimeExtensions'>
                       <strong>Extensions:</strong>
                       </label>
                  </td>
               <td>
                   <div  dojoType="dijit.form.TextBox" required="true" id="editMimeExtensions">
                   </div>
               </td>
        </tr>
    </table>
    <div class="dijitDialogPaneActionBar">
        <button id="editMimeSubmitButton" dojoType="dijit.form.Button" type="button">
            Submit
        </button>
        <button id="editMimeCloseButton" dojoType="dijit.form.Button" type="button">
            Cancel
        </button>
    </div>
</div>

<div dojoType="dijit.layout.AccordionContainer" style="height: 100%">

    <div title="Server MIME Types" dojoType="dijit.layout.ContentPane" id="serverMimeTypesContainer">
        <!-- Server MIME Types -->
        <h4>
            Current Server Mime Types:
        </h4>

        <div>
            <strong>Server MIME File:</strong> ${serverMimeFile}
            <div data-dojo-type="dijit.form.DropDownButton" data-dojo-props="dropDownPosition: ['above']">
                <span>Search</span>
                <div data-dojo-type="dijit.TooltipDialog" title="Search Server Mime Type">
                    <table style="width:350px;">
                        <tr class="dijitDialogPaneContentArea">
                            <td>
                                <label for='searchServerMimeTypeInput'>
                                                Type:
                                </label>
                            </td>
                            <td>
                                <input  dojoType="dijit.form.TextBox" id="searchServerMimeTypeInput"/>
                                <button id="searchServerMimeTypeButton" dojoType="dijit.form.Button" type="button" style="float: right;">
                                                Search
                                </button>
                            </td>
                        </tr>
                        <tr class="dijitDialogPaneContentArea">
                            <td>
                                <label for='searchServerMimeExtensionsInput'>
                                             Extension:
                                         </label>
                            </td>
                            <td>
                                <input  dojoType="dijit.form.TextBox" id="searchServerMimeExtensionsInput"/>
                                <button id="searchServerMimeExtensionsButton" dojoType="dijit.form.Button" type="button" style="float: right;">
                                                Search
                                </button>
                            </td>
                        </tr>
                        <tr class="dijitDialogPaneContentArea">
                            <td></td>
                            <td>
                                <button id="searchServerMimeResetButton" dojoType="dijit.form.Button" type="button" style="float: right;">
                                                &nbsp;Reset&nbsp;
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <span id="serverMimeTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
            <div class="dijitHidden">
                <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'serverMimeTooltip'">
                    <div class="warningDialog">${serverMimesWarning}</div>
                </div>
            </div>
        </div>

        <span dojoType="dojo.data.ItemFileWriteStore" jsId="globalServerMimesStore" url="../web/Mime?option=serverMimes" urlPreventCache="true"></span>
        <table id="globalServerMimesGrid" dojoType="dojox.grid.DataGrid" jsId="globalServerMimesGrid" store="globalServerMimesStore" query="{ id: '*' }" clientSort="false" selectable="true" style="width: 100%; height: 500px;" rowSelector="20px" rowsPerPage="25" selectionMode="single">
            <thead>
                <tr>
                    <th width="75px" field="id" filterable="false">
                                             #
                    </th>
                    <th width="auto" field="type">
                                 Type
                    </th>
                    <th width="auto" field="extensions">
                                  Extensions
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    <div title="Added MIME Types" dojoType="dijit.layout.ContentPane" id="addedMimeTypesContainer">
        <!-- AddType MIME Types -->
        <h4>
            Current Added Mime Types:

            <span id="addedMimeTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
            <div class="dijitHidden">
                <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'addedMimeTooltip'">
                    <div class="warningDialog">${restartWarning}</div>
                </div>
            </div>
        </h4>

        <span dojoType="dojo.data.ItemFileWriteStore" jsId="globalAddedMimesStore" url="../web/Mime?option=addedMimes" urlPreventCache="true"></span>
        <table id="globalAddedMimesGrid" dojoType="dojox.grid.DataGrid" jsId="globalAddedMimesGrid" store="globalAddedMimesStore" query="{ type: '*' }" clientSort="false" selectable="true" style="width: 100%;" autoHeight="true" rowSelector="20px">
            <thead>
                <tr>
                    <th width="auto" field="type">
                                 Type
                    </th>
                    <th width="auto" field="extensions">
                                  Extensions
                    </th>
                </tr>
            </thead>
        </table>
    </div>
</div>