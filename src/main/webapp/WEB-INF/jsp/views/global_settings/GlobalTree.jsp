<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<jsp:include page="/jsp/configuration_tree/Dialogs.jsp"     flush="true" />

<div class="centerPanel" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="region: 'center', tabPosition: 'top'">

    <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'top'">

        <jsp:include page="/jsp/configuration_tree/Legend.jsp" flush="true" />

    </div>

    <div class="centerPanel" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'center'" >

        <div class="tree_container" id="global_tree_container">

        </div>

    </div>

</div>


