<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="titlePane" class="edgePanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'top'">
    <div id="titleContainer">
        <div id="leftTitlePane">
            <div><a href="http://www.apache.org/"><img alt="Apache Logo" src="../resources/images/apache-logo.png"/></a>
            </div>

            <c:if test="${enableAuthentication=='yes'}">
                <div id="logoutButtonContainer">
                    <button id="logoutButton" data-dojo-type="dijit/form/Button"
                            onclick="window.location.href='Logout.jsp'">Logout
                    </button>
                </div>
            </c:if>
        </div>
        <div id="mainHeading">
            <h1>Apache GUI</h1>
        </div>
    </div>
</div>