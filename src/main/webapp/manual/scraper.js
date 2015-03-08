/**
 * Modules to install
 * npm install 'jsdom@3.1.2'
 * npm install 'jquery@1.11.2'
 * npm install node-minify
 * 
 */

var net = (net || {});
net.apachegui = (net.apachegui || {});


net.apachegui = (function() {

    var jsdom = require('jsdom');

    var fileBase = process.argv[1];
    fileBase = fileBase.substr(0, fileBase.lastIndexOf('/')) + '/';
    console.log('fileBase: ' + fileBase);

    var version = process.argv[2];
    console.log('version: ' + version);
    if(typeof version == 'undefined') {
        console.log('PLEASE SPECIFY THE APACHE VERSION WHEN RUNNING THE PROGRAM');
    }

    /**
     * Example object for directives:
     * {
     *    'listen' : {
     *        name : 'Listen',
     *        href : '/ApacheGUI/manual/2.4/mods/mpm_common.html#listen',
     *        items : [
     *          {
     *              name : 'Description:',
     *              value : 'IP addresses and ports that the server listens to'
     *          },
     *          {
     *              name : 'Syntax:',
     *              value : '<code>' +
     *                          'Listen [' +
     *                          '<var>IP-address</var>' +
     *                          ':]' +
     *                           '<var>portnumber</var>' +
     *                          '[' +
     *                          '<var>protocol</var>' +
     *                          ']' +
     *                      '</code>';
     *          }
     *          
     *          ...
     *          
     *        ]
     *    }
     * }
     **/
    var directives = {};
    
    /**
     * Tree like structure to enable efficient auto-completion
     * 
     * {
     *      a {
     *      
     *          directives : [
     *              'acceptfilter',
     *              'acceptpathinfo',
     *              'accessfilename',
     *              'action',
     *              'addalt',
     *              ... 
     *              [maximum of 10 entries]
     *          ]
     *          
     *          c {
     *          
     *              directives : [
     *                  'acceptfilter',
     *                  'acceptpathinfo',
     *                  'accessfilename',
     *                  'action',
     *              ]
     *          
     *          }
     *          
     *          ...
     *          
     *       }
     * 
     **/
    var directiveTree = {};
    
    var addToDirectiveTree = function(obj, directive, index) {
        
        if(index == directive.length) {
            return;
        }
        
        var char = directive[index];
        if(!obj[char]) {
            obj[char] = {};
            obj[char].directives = [];
        }
        
        if(obj[char].directives.length < 10) {
            obj[char].directives.push(directive);
        }
        addToDirectiveTree(obj[char], directive, index + 1);
    }; 
    
    var generateDirectiveTree = function() {
        console.log("Generating directive tree");
        
        for(var directive in directives) {
            addToDirectiveTree(directiveTree, directive, 0);
        }
                
        var file = "directives_" + version.replace('.','')+ ".js";
        
        console.log('Writing json to file: ' + file);

        var out = 'var net = (net || {});\n' + 
                  'net.apachegui = (net.apachegui || {});\n' + 
                  'net.apachegui.DIRECTIVES = ' + JSON.stringify(directives, null, 4) + ';\n\n' +
                  'net.apachegui.DIRECTIVETREE = ' + JSON.stringify(directiveTree, null, 4) + ';';
        
        var fs = require('fs');
        fs.writeFile(file, out, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was successfully saved");
                
                var fileMin = file.replace('.js', '.min.js');
                console.log("Minifying file to: " + fileMin);
                var compressor = require('node-minify');
                new compressor.minify({
                    type: 'yui-js',
                    fileIn: file,
                    fileOut: fileMin,
                    callback: function(err, min){
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("The file was successfully minified");
                        }
                    }
                });
            }
        });
    }
    
    var index = 0;
    var buildDirectives = function(parseList) {

        var buildDirective = function(parseObj) {

            console.log('Processing ' + (index + 1) + ' of ' + parseList.length);
            console.log('key: ' + parseObj.key);
            console.log('link: ' + parseObj.link);

            jsdom.env({
                file : fileBase + version + '/mod/' + parseObj.link,
                done : function(err, window) {

                    var $ = require('jquery')(window);

                    var key = parseObj.key;
                    directives[key] = {};

                    var $section = $('#' + key).closest('.directive-section');
                    directives[key].name = $section.find('h2').find('a').eq(0).attr('name');
                    directives[key].href = '/ApacheGUI/manual/' + version + '/mod/' + parseObj.link + '#' + key;

                    var items = [];
                    $section.find('.directive').find('tr').each(function() {
                        var $this = $(this);

                        var obj = {}
                        obj.name = $this.find('th').find('a').html();
                        obj.value = $this.find('td').html();

                        items.push(obj);
                    });

                    directives[key].items = items;

                    window.close();

                    index++;

                    if (index < parseList.length) {
                        buildDirective(parseList[index]);
                    } else {
                        generateDirectiveTree();
                    }
                }
            });
        };

        buildDirective(parseList[index]);
    };

    return {
        generateDirectives : function() {
            var parseList = [];
            jsdom.env({
                file : fileBase + version + '/mod/directives.html',
                done : function(err, window) {

                    var $ = require('jquery')(window);

                    $('#directive-list').find('a').each(function() {

                        var $this = $(this);

                        var parts = $this.attr('href').split('#');
                        var key = parts[1];
                        var link = parts[0];

                        var obj = {
                            key : key,
                            link : link
                        };

                        console.log('Pushing:')
                        console.log('key: ' + key)
                        console.log('link: ' + link)

                        parseList.push(obj);
                    });

                    window.close();

                    buildDirectives(parseList);
                }
            });
        }
    }
    
})();

net.apachegui.generateDirectives();
