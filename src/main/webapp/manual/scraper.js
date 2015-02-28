(function() {
    // requires jsdom 3.1.2 if running on node js
    // npm install 'jsdom@3.1.2' -g
    var jsdom = require('jsdom');

    var fileBase = process.argv[1];
    fileBase = fileBase.substr(0,fileBase.lastIndexOf('/')) + '/';
    console.log('fileBase: ' + fileBase);
    
    var version = process.argv[2];
    console.log('version: ' + version);

    var infoObj = {};
    var directiveList = [];
    jsdom.env({
        file : fileBase + version + '/mod/directives.html',
        scripts : [ 'http://code.jquery.com/jquery-1.11.2.min.js' ],
        done : function(err, window) {
            
            var $ = window.jQuery;

            $('#directive-list').find('a').each(function() {
                console.log($(this).attr('href'));
            });
        }
    });
})();
