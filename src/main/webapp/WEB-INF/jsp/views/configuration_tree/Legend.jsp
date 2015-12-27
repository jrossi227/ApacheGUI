<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="configuration_tree_legend_container">
    <div class="tree_container" id="example_container">
        <span class="example enclosure"></span> = Enclosure <span class="example directive"></span> = Directive
    </div>

    <div id="right_click_container">
        <span id="rightClickTooltip" class="warningTooltip" onmouseover="dijit.Tooltip.defaultPosition=['below', 'above']"></span>
        <div class="dijitHidden">
            <div data-dojo-type="dijit.Tooltip" data-dojo-props="connectId:'rightClickTooltip'">
                <div class="warningDialog">You may right click a line
                    below for various options. If you choose to add a Directive
                    or Enclosure then it will be added to the configuration file
                    after the line that has been right clicked.</div>
            </div>
        </div>
    </div>
</div>