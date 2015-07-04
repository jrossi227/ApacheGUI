<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="leftCol"  data-dojo-type="dojox.layout.ExpandoPane" data-dojo-props="region: 'left', splitter: true">
        <ul dojoType="dijit.Menu" id="tree_menu" style="display: none;">
            <div id="renameMenuItem" dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconUndo">
                Rename
            </div>
            <div id="newMenuItem" dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconSave">
                New
            </div>
            <div id="cutMenuItem" dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconCut">
                Cut
            </div>
            <div id="copyMenuItem" dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconCopy">
                Copy
            </div>
            <div id="pasteMenuItem" dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconPaste">
                Paste
            </div>
            <div id="deleteMenuItem" dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconDelete">
                Delete
            </div>
            <div id="refreshMenuItem" dojoType="dijit.MenuItem" iconClass="dijitEditorIcon dijitEditorIconRedo">
                Refresh
            </div>
            <div id="uploadMenuItem" dojoType="dijit.MenuItem">
                Upload
            </div>
            <div id="downloadMenuItem" dojoType="dijit.MenuItem">
                Download
            </div>
            <div id="searchMenuItem" dojoType="dijit.MenuItem">
                Search
            </div>
            <div id="newTabMenuItem" dojoType="dijit.MenuItem">
                New Tab
            </div>
        </ul>
        <!--  <div dojoType="dojo.data.ItemFileWriteStore" jsId="apacheStore" url="../web/Menu/rest">
        </div>-->
        <div dojoType="dojox.data.JsonRestStore" jsId="apacheStore" target="<%=(request.getContextPath() + "/web/Menu/rest") %>" labelAttribute="name"></div>

        <div dojoType="dijit.tree.ForestStoreModel" jsId="apacheModel" store="apacheStore"
            rootId="apacheRoot" rootLabel="Apache" childrenAttrs="children" deferItemLoadingUntilExpand="true" >
        </div>

        <div dojoType="net.apachegui.RefreshableTree" id="menuTree" model="apacheModel" openOnClick="true" showRoot="false" persist="true"></div>
</div>
<div dojoType="dijit.Dialog" id="newFileDialog" title="New File" style="display: none">
    <form dojoType="dijit.form.Form" id="newFileForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='newFileFilename'>
                        Filename:
                        </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="newFileFilename">
                    </div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    Type:
                   </td>
                <td>
                    <input type="radio" name="newFileFileType" id="newFileFileTypeFile" value="newFileFileTypeFile" checked="checked">
                      <label for="newFileFileTypeFile">File</label>
                      <input type="radio" name="newFileFileType" id="newFileFileTypeDirectory" value="Directory">
                      <label for="newFileFileTypeDirectory">Directory</label>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="newFileCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
            <button dojoType="dijit.form.Button" type="submit">
                Submit
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="renameFileDialog" title="Rename File" style="display: none">
    <form dojoType="dijit.form.Form" id="renameFileForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    Old Filename:
                   </td>
                <td>
                    <div id="renameFileOldFile"></div>
                </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='renameFileFilename'>
                        New Filename:
                        </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="renameFileFilename">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="renameFileCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
            <button dojoType="dijit.form.Button" type="submit">
                Submit
            </button>
        </div>
    </form>
</div>
<div dojoType="dijit.Dialog" id="uploadFileDialog" title="Upload File" style="width: 700px; height: auto;">
    <form dojoType="dijit.form.Form" id="uploadFileForm" action="../web/UploadFile" enctype="multipart/form-data" method="post">
        <input type="hidden" name="uploadDirectoryName" id="uploadDirectoryName"/>
        <input type="hidden" name="currentURL" id="currentURL"/>
        
         <div>
            <fieldset>
                <legend>Upload Files</legend>
                <input name="uploadFile" multiple="true" type="file" id="uploadFile" data-dojo-type="dojox/form/Uploader" data-dojo-props="label: 'Select Files'">
                <div id="upload_file_list" data-dojo-type="dojox/form/uploader/FileList" data-dojo-props="uploaderId: 'uploadFile'"></div>
            </fieldset>
        </div>
        
        <div class="dijitDialogPaneActionBar">
            <button id="uploadFileCancel" dojoType="dijit.form.Button" type="button">
                Done
            </button>
            <button dojoType="dijit.form.Button" type="submit">
                Submit
            </button>
        </div>
    </form>
</div>

<div dojoType="dijit.Dialog" id="searchConfigurationDialog" title="Search Configuration" style="display: none">
    <form dojoType="dijit.form.Form" id="searchConfigurationForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label>
                            Search Directory:
                            </label>
                       </td>
                    <td>
                        ${confDirectory}
                    </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label for='searchConfigurationFilter'>
                            Filter (Java Regex):
                            </label>
                       </td>
                    <td>
                        <div dojoType="dijit.form.ValidationTextBox" required="true" id="searchConfigurationFilter">
                        </div>
                    </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label for='searchConfigurationActiveFilesFilter'>
                            Include Active Files Only:
                            </label>
                       </td>
                    <td>
                        <input type="checkbox" name="searchConfigurationActiveFilesFilter" id="searchConfigurationActiveFilesFilter">
                    </td>
            </tr>
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label for='searchConfigurationCommentsFilter'>
                            Include Commented Lines:
                            </label>
                       </td>
                    <td>
                        <input type="checkbox" name="searchConfigurationCommentsFilter" id="searchConfigurationCommentsFilter">
                    </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="submitSearchConfigurationButton" dojoType="dijit.form.Button" type="button">
                Search
            </button>
            <button id="hideSearchConfigurationButton" dojoType="dijit.form.Button" type="button">
                Done
            </button>
        </div>
    </form>
</div>

<div dojoType="dijit.Dialog" id="searchDialog" title="Search" style="display: none">
    <form dojoType="dijit.form.Form" id="searchForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label>
                            Search Directory:
                            </label>
                       </td>
                    <td id="searchDirectoryDisplay">

                    </td>
            </tr>
        
            <tr class="dijitDialogPaneContentArea">
                    <td>
                        <label for='searchFileFilter'>
                            Filter (Java Regex):
                            </label>
                       </td>
                    <td>
                        <div dojoType="dijit.form.ValidationTextBox" required="true" id="searchFileFilter">
                        </div>
                    </td>
            </tr>

            <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='searchFileList'>
                           File extension list:
                           <span id="searchFileTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
                        <div class="dijitHidden">
                            <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'searchFileTooltip'">
                                <div class="warningDialog">
                                    The file list requires a comma separated list of regular expressions that specify which files to include. GZIP'd text files are supported.<br/><br/>
                                    Example regular expression to search for the following:<br/><br/>
                                    1. All html files<br/>
                                    2. All css files<br/>
                                    3. Files ending with .log.[anything].gz<br/><br/>
                                    .*\.html,.*\.css,.*\.log\..*\.gz
                                </div>
                            </div>
                        </div>
                           </label>
                      </td>
                   <td>
                       <div dojoType="dijit.form.ValidationTextBox" required="true" id="searchFileList">
                       </div>
                   </td>
            </tr>

            <tr class="dijitDialogPaneContentArea">
                   <td>
                       <label for='searchRecursively'>
                           Search Recursively:
                      </label>
                  </td>
                   <td>
                       <input type="checkbox" name="searchRecursively" id="searchRecursively">
                   </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="submitSearchButton" dojoType="dijit.form.Button" type="button">
                Search
            </button>
            <button id="hideSearchButton" dojoType="dijit.form.Button" type="button">
                Done
            </button>
        </div>
    </form>
</div>

<div dojoType="net.apachegui.NoCloseDialog" id="searchProgressDialog" title="Searching" style="display: none; width: 450px;">
    
    <div id="searchProgressMessage" style="text-align:center"></div>

    <div class="dijitDialogPaneActionBar">
         <button id="searchProgressCancel" dojoType="dijit.form.Button" type="button">
             Cancel
         </button>
     </div>

</div>
