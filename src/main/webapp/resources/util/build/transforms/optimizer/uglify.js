/*jshint node:true */
define([
	"../../buildControl",
	"../../fs",
	"./stripConsole",
	"dojo/_base/lang",
	"dojo/has",
	"dojo/has!host-node?dojo/node!uglify-js:"
], function(bc, fs, stripConsole, lang, has, uglify){
	if(!uglify){
		throw new Error("Unknown host environment: only nodejs is supported by uglify optimizer.");
	}

	return function(resource, text, copyright, optimizeSwitch, callback){
		copyright = copyright || "";

		var options = bc.optimizeOptions || {};

		if(optimizeSwitch.indexOf(".keeplines") > -1){
			options.gen_options = options.gen_options || {};
			options.gen_options.beautify = true;
			options.gen_options.indent_level = 0; //don't indent, just keep new lines
		}
		if(optimizeSwitch.indexOf(".comments") > -1){
			throw new Error("'comments' option is not supported by uglify optimizer.");
		}

		process.nextTick(function(){
			try{
				var result = copyright + "//>>built" + bc.newline + uglify(stripConsole(text), options);

				fs.writeFile(resource.dest, result, resource.encoding, function(err){
					if(err){
						bc.log("optimizeFailedWrite", ["filename", result.dest]);
					}
					callback(resource, err);
				});
			}catch(e){
				bc.log("optimizeFailed", ["module identifier", resource.mid, "exception", e + ""]);
				callback(resource, 0);
			}
		});

		return callback;
	};
});
