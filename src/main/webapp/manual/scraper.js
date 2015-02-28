(function() {
    
    // npm install 'jsdom@3.1.2'
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
        done : function(err, window) {
            
            // npm install 'jquery@1.11.2'
            var $ = require('jquery')(window);

            $('#directive-list').find('a').each(function() {
                console.log($(this).attr('href'));
            });
        }
    });
})();
