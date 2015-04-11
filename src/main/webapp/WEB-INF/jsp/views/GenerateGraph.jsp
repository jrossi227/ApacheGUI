<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>ApacheGUI Graph</title>
        <script type="text/javascript" src="../resources/flot/jquery.js"></script>
        <script type="text/javascript" src="../resources/flot/jquery.flot.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td align="center" class="AppTitle">
                    ${dateTitle}
                </td>
            </tr>
            <tr>
                <td>
                       <div align="center" valign="center" id="placeholder" style="width:900px;height:500px;"></div>
                    <p id="hoverdata">
                        (<span id="x">0</span>, <span id="y">0</span>) Click A Point For The Exact Coordinates <span id="clickdata"></span>
                    </p>
                    <script id="source" language="javascript" type="text/javascript">
                        $(function () {
                            var d = [${coordinates}];
                            var options = {
                                    series: {lines: { show: true },points: { show: true }},
                                    grid: { hoverable: true, clickable: true },
                                    xaxis: {tickSize: 1}
                                };
                            var plot = $.plot($("#placeholder"), [{ color: "#000066", label: "Transactions",  data: d}], options);
                            $("#placeholder").bind("plothover", function (event, pos, item) {
                                            $("#x").text(pos.x.toFixed(2));
                                            $("#y").text(pos.y.toFixed(2));
                            });
                            $("#placeholder").bind("plotclick", function (event, pos, item) {
                                        if (item)
                                        {
                                        $("#clickdata").text("(" + item.datapoint + ")");
                                            plot.highlight(item.series, item.datapoint);
                                        }
                            });
                        });
                    </script>
                </td>
            </tr>
        </table>
    </body>
</html>