/**
 * Modules to install
 * npm install 'jsdom@3.1.2'
 * npm install 'jquery@1.11.2'
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
    
    var generateDirectiveTree = function() {
        console.log("Generating directive tree");
        
        for(var directive in directives) {
            console.log(directive);
            var chars = [];
            for(var i=0; i<directive.length; i++) {
                chars.push(directive[i]);
                for(var j=0; j<chars.length; j++) {
                    if(!!directiveTree[chars[j]])
                }
            }
        }
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
                        console.log('writing json to file');

                        var out = 'var net = (net || {});\n' + 
                                  'net.apachegui = (net.apachegui || {});\n' + 
                                  'net.apachegui.DIRECTIVES = ' + JSON.stringify(directives, null, 4) + ';';

                        var fs = require('fs');
                        fs.writeFile("directives.js", out, function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("The file was saved!");
                                generateDirectiveTree();
                            }
                        });
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
