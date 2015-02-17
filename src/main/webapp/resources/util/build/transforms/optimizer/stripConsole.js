define(["../../buildControl"], function(bc){
	if(bc.stripConsole){
		var consoleMethods = "assert|count|debug|dir|dirxml|group|groupEnd|info|profile|profileEnd|time|timeEnd|trace|log";
		if(bc.stripConsole === "warn"){
			consoleMethods += "|warn";
		}else if(bc.stripConsole === "all"){
			consoleMethods += "|warn|error";
		}
		var stripConsoleRe = new RegExp("console\\.(" + consoleMethods + ")\\s*\\(", "g");
		return function(text){
			return text.replace(stripConsoleRe, "0 && $&");
		};
	}else{
		return function(text){
			return text;
		};
	}
});