<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<input type="hidden" id="currentConfigurationTreeId" value=""/>
<div data-dojo-type="dijit/Dialog" id="editLineDialog" title="Edit " style="width: 700px; display: none">
  <table>
    <tr class="dijitDialogPaneContentArea">
      <td>
        <label for='editLineType'>
          Type:
        </label>
      </td>
      <td>
        <span id="editLineType" class="directive_type"></span>
      </td>
    </tr>
    <tr class="dijitDialogPaneContentArea">
      <td>
        <label for='editLineValue'>
          Value:
        </label>
      </td>
      <td>
        <input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: true" id="editLineValue" style="width: 630px;" />
      </td>
    </tr>
  </table>

  <input type="hidden" id="editLineLineType" value=""/>
  <input type="hidden" id="editLineLineOfStart" value=""/>
  <input type="hidden" id="editLineFile" value=""/>
  <input type="hidden" id="editLineLineOfEnd" value=""/>

  <div class="dijitDialogPaneActionBar">
    <button id="editLineSubmit" data-dojo-type="dijit.form.Button" type="button">
      Submit
    </button>
    <button id="editLineCancel" data-dojo-type="dijit.form.Button" type="button">
      Cancel
    </button>
  </div>
</div>

<div data-dojo-type="dijit/Dialog" id="addLineDialog" title="Add " style="width: 700px; display: none">
  <table>
    <tr class="dijitDialogPaneContentArea">
      <td>
        <label for='addLineType'>
          Type:
        </label>
      </td>
      <td>
        <input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: true" id="addLineType" style="width: 630px;" />
      </td>
    </tr>
    <tr class="dijitDialogPaneContentArea">
      <td>
        <label for='addLineValue'>
          Value:
        </label>
      </td>
      <td>
        <input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="required: true" id="addLineValue" style="width: 630px;" />
      </td>
    </tr>
  </table>

  <input type="hidden" id="addLineBeforeLineType" value=""/>
  <input type="hidden" id="addLineLineType" value=""/>
  <input type="hidden" id="addLineFile" value=""/>
  <input type="hidden" id="addLineLineOfStart" value=""/>

  <div class="dijitDialogPaneActionBar">
    <button id="addLineSubmit" data-dojo-type="dijit.form.Button" type="button">
      Submit
    </button>
    <button id="addLineCancel" data-dojo-type="dijit.form.Button" type="button">
      Cancel
    </button>
  </div>
</div>