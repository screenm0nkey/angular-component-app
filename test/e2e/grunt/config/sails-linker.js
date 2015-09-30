module.exports = function () {
    "use strict";

    var resourcesJson = require('../../../../resources.json');

    var yeomanConfig = {
        app: require('../../../../bower.json').appPath || 'src',
        css: resourcesJson.css || [],
        fonts: resourcesJson.fonts || []
    };

    var externalJsSrc = resourcesJson.javascript.external.map(function (path) {
        return yeomanConfig.app + '/' + path;
    });

    var appJs = resourcesJson.javascript.app.map(function (path) {
        return yeomanConfig.app + '/' + path;
    });

    //    jquery introduces issues with 'use strict'
    var jqueryPath = "/bower_components/msjquery/jquery.min.js",
        jquerySrcDev = [yeomanConfig.app + "/" + "../" + jqueryPath];

    var msHeaderPath = "/bower_components/ms-header-navigation/application-header-navigation.js",
        msHeaderSrcDev = [yeomanConfig.app + "/" + "../" + msHeaderPath];

    //    LightStreamer introduces issues with 'use strict'
    var lightStreamerPath = "/bower_components/lightstreamer/lightstreamer.js",
        lightStremerSrcDev = [yeomanConfig.app + "/" + "../" + lightStreamerPath];

    var prototypeAppJs = appJs.slice(0); //copy appJs

    prototypeAppJs.splice(1, 0, (yeomanConfig.app + '/dev/**/*.js')); //insert dev stuff (mocks etc) after module.js
    var devJsArray = jquerySrcDev.concat(msHeaderSrcDev.concat(lightStremerSrcDev.concat(externalJsSrc.concat(prototypeAppJs))));

    var cssFiles = function (env) {
        var stylePaths = {
            dev:'<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>/styles/'
        };

        var styles = resourcesJson.css.map(function(file){
            var parts = file.split('/');
            return stylePaths[env] + parts[parts.length-1];
        });
        styles.push(stylePaths[env] + 'main.css');
        return styles;
    };

    return {
        "devJs": {
            "options": {
                "startTag": "<!--INJECT SCRIPTS-->",
                "endTag": "<!--/INJECT SCRIPTS-->",
                "fileTmpl": "<script src=\"%s\"></script>",
                "appRoot": "<%= yeoman.app %>",
                "relative": true
            },
            "files": {
                "<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>/index.html": devJsArray
            }
        },
        "devStyles": {
            "options": {
                "startTag": "<!--INJECT STYLES-->",
                "endTag": "<!--/INJECT STYLES-->",
                "fileTmpl": "<link rel=\"stylesheet\" href=\"%s\">",
                "appRoot": "<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>",
                "relative": true
            },
            "files": {
                "<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>/index.html": cssFiles('dev')
            }
        }
    };
};
