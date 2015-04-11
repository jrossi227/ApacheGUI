<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="editorPane" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'top', title:'Modify'">

<div id="editorMenu" data-dojo-type="dijit.MenuBar">
    <div id="editorFile" data-dojo-type="dijit.PopupMenuBarItem">
        <span>File</span>
        <div id="editorFileMenu" data-dojo-type="dijit.Menu">
            <div id="editorFileSave" data-dojo-type="dijit.MenuItem" data-dojo-props="disabled: 'true'">
                <div class="editorMenuItem">
                    <div class="option">Save</div>
                    <div id="save" class="command">Ctrl+S</div>
                </div>
            </div>
            <div id="editorFileNew" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">New</div>
                </div>
            </div>
        </div>
    </div>
    <div id="editorEdit" data-dojo-type="dijit.PopupMenuBarItem">
        <span>Edit</span>
        <div id="editorEditMenu" data-dojo-type="dijit.Menu">
            <div id="editorEditUndo" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Undo</div>
                    <div id="undo" class="command">Ctrl+Z</div>
                </div>
            </div>
            <div id="editorEditRedo" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Redo</div>
                    <div id="redo" class="command">Ctrl+Shift+Z</div>
                </div>
            </div>
            <div id="editorEditFind" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Find</div>
                    <div id="find" class="command">Ctrl+F</div>
                </div>
            </div>
            <div id="editorEditReplace" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Replace</div>
                    <div id="replace" class="command">Shift-Ctrl-F</div>
                </div>
            </div>
            <div id="editorEditReplaceAll" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Replace All</div>
                    <div id="replaceAll" class="command">Shift-Ctrl-R</div>
                </div>
            </div>
            <div id="editorEditAutoFormat" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Auto Format</div>
                    <div id="autoFormat" class="command">Shift-Ctrl-F</div>
                </div>
            </div>
            <div id="editorEditComment" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Comment</div>
                    <div id="comment" class="command">Shift-Ctrl-C</div>
                </div>
            </div>
            <div id="editorEditUnComment" data-dojo-type="dijit.MenuItem">
                <div class="editorMenuItem">
                    <div class="option">Uncomment</div>
                    <div id="unComment" class="command">Shift-Ctrl-U</div>
                </div>
            </div>
            <div id="editorEditTheme" data-dojo-type="dijit.PopupMenuItem">
                <span>Theme</span>
                <div id="editorEditThemeMenu" data-dojo-type="dijit.Menu">
                    <div id="default" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        default
                    </div>
                    <div id="ambiance" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        ambiance
                    </div>
                    <div id="blackboard" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        blackboard
                    </div>
                    <div id="cobalt" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        cobalt
                    </div>
                    <div id="eclipse" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        eclipse
                    </div>
                    <div id="elegant" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        elegant
                    </div>
                    <div id="erlang-dark" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        erlang-dark
                    </div>
                    <div id="lesser-dark" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        lesser-dark
                    </div>
                    <div id="monokai" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        monokai
                    </div>
                    <div id="neat" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        neat
                    </div>
                    <div id="night" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        night
                    </div>
                    <div id="vibrant-ink" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        vibrant-ink
                    </div>
                    <div id="xq-dark" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_theme'">
                        xq-dark
                    </div>
                </div>
            </div><!-- end of sub-menu -->
            <div id="editorEditTabs" data-dojo-type="dijit.PopupMenuItem">
                <span>Tabs</span>
                <div id="editorEditTabsMenu" data-dojo-type="dijit.Menu">
                    <div id="editorEditHideTabs" data-dojo-type="dijit.MenuItem">
                        Hide Tabs
                    </div>
                    <div id="editorEditShowTabs" data-dojo-type="dijit.MenuItem">
                        Show Tabs
                    </div>
                </div>
            </div> 
            <div id="editorEditMode" data-dojo-type="dijit.PopupMenuItem">
                <span>Mode</span>
                <div id="editorEditModeMenu" data-dojo-type="dijit.Menu">
                    <div id="plain" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        Plain Text
                    </div>
                    <div id="conf" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        Conf
                    </div>
                    <div id="html" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        HTML
                    </div>
                    <div id="css" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        CSS
                    </div>
                    <div id="xml" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        XML
                    </div>
                    <div id="javascript" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        JavaScript
                    </div>
                    <div id="json" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        JSON
                    </div>
                    <div id="php" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        PHP
                    </div>
                    <div id="python" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        Python
                    </div>
                    <div id="perl" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        Perl
                    </div>
                    <div id="shell" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        Shell
                    </div>
                    <div id="properties" data-dojo-type="dijit.MenuItem" data-dojo-props="class: 'editor_mode'">
                        Properties
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%-- Extensions are defined here --%>

    <%-- Configuration extension --%>
    <c:if test="${option == 'Configuration'}">
        <jsp:include page="/jsp/editor/ConfigurationExtension.jsp"     flush="true" />
    </c:if>

    <c:if test="${option == 'Documents'}">
        <jsp:include page="/jsp/editor/DocumentsExtension.jsp"     flush="true" />
    </c:if>
</div>
<div id="menu_toolbar" dojoType="dijit.Toolbar">
    <div dojoType="dijit.form.Button" id="editorToolbarSave" iconClass="dijitEditorIcon dijitEditorIconSave" showLabel="false">
        Save
    </div>
    <div dojoType="dijit.form.Button" id="editorToolbarRedo" iconClass="dijitEditorIcon dijitEditorIconRedo" showLabel="false">
        Redo
    </div>
    <div dojoType="dijit.form.Button" id="editorToolbarUndo" iconClass="dijitEditorIcon dijitEditorIconUndo" showLabel="false">
        Undo
    </div>
    <div dojoType="dijit.form.Button" id="editorToolbarTabs" iconClass="dijitEditorIcon dijitEditorIconIndent" showLabel="false">
        Toggle Tab Visibility
    </div>
    
    <select name="editorThemeSelector" id="editorThemeSelector" dojoType="dijit.form.Select">
        <option value="default">
            default
        </option>
        <option value="ambiance">
            ambiance
        </option>
        <option value="blackboard">
            blackboard
        </option>
        <option value="cobalt">
            cobalt
        </option>
        <option value="eclipse">
            eclipse
        </option>
        <option value="elegant">
            elegant
        </option>
        <option value="erlang-dark">
            erlang-dark
        </option>
        <option value="lesser-dark">
            lesser-dark
        </option>
        <option value="monokai">
            monokai
        </option>
        <option value="neat">
            neat
        </option>
        <option value="night">
            night
        </option>
        <option value="vibrant-ink">
            vibrant-ink
        </option>
        <option value="xq-dark">
            xq-dark
        </option>
    </select>

    <select name="editorModeSelector" id="editorModeSelector" dojoType="dijit.form.Select">
        <option value="plain">
            Plain Text
        </option>
        <option value="conf">
            Conf
        </option>
        <option value="html">
            HTML
        </option>
        <option value="css">
            CSS
        </option>
        <option value="xml">
            XML
        </option>
        <option value="javascript">
            JavaScript
        </option>
        <option value="json">
            JSON
        </option>
        <option value="php">
            PHP
        </option>
        <option value="python">
            Python
        </option>
        <option value="perl">
            Perl
        </option>
        <option value="shell">
            Shell
        </option>
        <option value="properties">
            Properties
        </option>
    </select>

    <span id="filename_container"></span>

</div>


</div>
<!-- end of sub-menu -->

<div dojoType="dijit.Dialog" id="editorNewFileDialog" title="New File" style="display: none">
    <form dojoType="dijit.form.Form" id="editorNewFileForm">
        <table>
            <tr class="dijitDialogPaneContentArea">
                <td>
                    <label for='editorNewFileFilename'>
                        Filename:
                        </label>
                   </td>
                <td>
                    <div dojoType="dijit.form.ValidationTextBox" required="true" id="editorNewFileFilename">
                    </div>
                </td>
            </tr>
        </table>
        <div class="dijitDialogPaneActionBar">
            <button id="editorNewFileCancel" dojoType="dijit.form.Button" type="button">
                Cancel
            </button>
            <button dojoType="dijit.form.Button" type="submit">
                Submit
            </button>
        </div>
    </form>
</div>