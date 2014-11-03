/*jshint rhino:true white:false */
/*global Packages:false com:false */
function writeFile(filename, contents, encoding, cb) {
	if (arguments.length === 3 && typeof encoding !== "string") {
		cb = encoding;
		encoding = 0;
	}
	var
		outFile = new java.io.File(filename),
		outWriter;
	if(encoding){
		outWriter = new java.io.OutputStreamWriter(new java.io.FileOutputStream(outFile), encoding);
	}else{
		outWriter = new java.io.OutputStreamWriter(new java.io.FileOutputStream(outFile));
	}

	var os = new java.io.BufferedWriter(outWriter);
	try{
		os.write(contents);
	}finally{
		os.close();
	}
	if (cb) {
		cb(0);
	}
}

var built = "//>>built\n";

function sscompile(src, dest, optimizeSwitch, copyright){
	// decode the optimize switch
	var
		options = optimizeSwitch.split("."),
		comments = 0,
		keepLines = 0,
		strip = null;
	while(options.length){
		switch(options.pop()){
			case "normal":
				strip = "normal";
				break;
			case "warn":
				strip = "warn";
				break;
			case "all":
				strip = "all";
				break;
			case "keeplines":
				keepLines = 1;
				break;
			case "comments":
				comments = 1;
				break;
		}
	}

	//Use rhino to help do minifying/compressing.
	var context = Packages.org.mozilla.javascript.Context.enter(),
		text;
	try{
		// Use the interpreter for interactive input (copied this from Main rhino class).
		context.setOptimizationLevel(-1);

		text = readFile(src, "utf-8");
		if(comments){
			//Strip comments
			var script = context.compileString(text, dest, 1, null);
			text = new String(context.decompileScript(script, 0));

			//Replace the spaces with tabs.
			//Ideally do this in the pretty printer rhino code.
			text = text.replace(/	 /g, "\t");
		}else{
			//Apply compression using custom compression call in Dojo-modified rhino.
			text = new String(Packages.org.dojotoolkit.shrinksafe.Compressor.compressScript(text, 0, 1, strip));
			if(!keepLines){
				text = text.replace(/[\r\n]/g, "");
			}
		}
	}finally{
		Packages.org.mozilla.javascript.Context.exit();
	}
	writeFile(dest, copyright + built + text, "utf-8");
}

var JSSourceFilefromCode, closurefromCode, jscomp = 0;
function ccompile(src, dest, optimizeSwitch, copyright, optimizeOptions, useSourceMaps){
	if(!jscomp){
		JSSourceFilefromCode=java.lang.Class.forName("com.google.javascript.jscomp.JSSourceFile").getMethod("fromCode", [java.lang.String, java.lang.String]);
		closurefromCode = function(filename,content){
			return JSSourceFilefromCode.invoke(null,[filename,content]);
		};
		jscomp = com.google.javascript.jscomp;
	}

	//Fake extern
	var externSourceFile = closurefromCode("fakeextern.js", " ");

	//Set up source input
	// it is possible dest could have backslashes on windows (particularly with cygwin)
	var destFilename = dest.match(/^.+[\\\/](.+)$/)[1],
		jsSourceFile = closurefromCode(destFilename + ".uncompressed.js", String(readFile(src, "utf-8")));

	//Set up options
	var options = new jscomp.CompilerOptions();
	for(var k in optimizeOptions){
		options[k] = optimizeOptions[k];
	}
	// Must have non-null path to trigger source map generation, also fix version
	options.setSourceMapOutputPath("");
	options.setSourceMapFormat(jscomp.SourceMap.Format.V3);
	if(optimizeSwitch.indexOf(".keeplines") !== -1){
		options.prettyPrint = true;
	}

	var FLAG_compilation_level = jscomp.CompilationLevel.SIMPLE_OPTIMIZATIONS;
	FLAG_compilation_level.setOptionsForCompilationLevel(options);
	var FLAG_warning_level = jscomp.WarningLevel.DEFAULT;
	FLAG_warning_level.setOptionsForWarningLevel(options);

	//Prevent too-verbose logging output
	Packages.com.google.javascript.jscomp.Compiler.setLoggingLevel(java.util.logging.Level.SEVERE);

	// Run the compiler
	// File name and associated map name
	var mapTag = useSourceMaps ? ("\n//# sourceMappingURL=" + destFilename + ".map") : "",
		compiler = new Packages.com.google.javascript.jscomp.Compiler(Packages.java.lang.System.err);
	compiler.compile(externSourceFile, jsSourceFile, options);
	writeFile(dest, copyright + built + compiler.toSource() + mapTag, "utf-8");

	if(useSourceMaps){
		var sourceMap = compiler.getSourceMap();
		sourceMap.setWrapperPrefix(copyright + built);
		var sb = new java.lang.StringBuffer();
		sourceMap.appendTo(sb, destFilename);
		writeFile(dest + ".map", sb.toString(), "utf-8");
	}
}


var
	console = new java.io.BufferedReader(new java.io.InputStreamReader(java.lang.System["in"])),
	readLine = function(){
		// the + "" convert to a Javascript string
		return console.readLine() + "";
	},
	src,
	dest,
	optimizeSwitch;

while(1){
	src = readLine();
	if(src === "."){
		break;
	}
	dest = readLine();
	optimizeSwitch = readLine();
	var options = eval("(" + readLine() + ")");
	print(dest + ":");
	var start = (new Date()).getTime(),
		exception = "";
	try{
		if(/closure/.test(optimizeSwitch)){
			ccompile(src, dest, optimizeSwitch, options.copyright, options.options, options.useSourceMaps);
		}else{
			sscompile(src, dest, optimizeSwitch, options.copyright);
		}
	}catch(e){
		exception = ". OPTIMIZER FAILED: " + e;
	}
	print("Done (compile time:" + ((new Date()).getTime()-start)/1000 + "s)" + exception);
}
