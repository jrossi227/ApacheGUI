<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Apache GUI</title>

<link rel="stylesheet" href="../resources/dijit/themes/${theme}/${theme}.css?version=${version}" type="text/css">
<link rel="stylesheet" type="text/css" href="../resources/dojox/grid/resources/${theme}Grid.css?version=${version}" />
<link rel="stylesheet" type="text/css" href="../resources/dojox/grid/resources/Grid.css?version=${version}" />
<link rel="stylesheet" type="text/css" href="../resources/dojox/layout/resources/ExpandoPane.css?version=${version}" />
<link rel="stylesheet" type="text/css" href="../resources/dojox/form/resources/FileUploader.css?version=${version}" />
<link rel="stylesheet" type="text/css" href="../resources/dojox/form/resources/UploaderFileList.css?version=${version}" />
<link rel="stylesheet" type="text/css" href="../resources/dojox/form/resources/FileInput.css?version=${version}" />
<link rel="stylesheet" href="../resources/style/style.css?version=${version}" media="screen" type="text/css">

<script>

//Dojo configuration needs to be included before script import
var dojoConfig = {
    isDebug: false,
    cacheBust: true,
    parseOnLoad: false,
    locale: "en-us"
};

</script>

<script src="../resources/dojo/dojo.js?version=${version}"></script>

<script src="../resources/net/apachegui/Util.js?version=${version}"></script>
<script src="../resources/net/apachegui/String.js?version=${version}"></script>
<script src="../resources/net/apachegui/Interval.js?version=${version}"></script>

<script>
require([ "net/apachegui/Main"
], function(Main){
    net.apachegui.Main.getInstance().setApacheGuiVersion('${version}');
    net.apachegui.Main.getInstance().setIsWindows(${windows});
});
</script>
