'use strict';

module.exports = function (grunt) {
    var _ = require('lodash');

    grunt.file.setBase('../../');

    // load grunt tasks listed in package.json
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Project settings
    var resourcesJson = require('../../resources.json');

    // load the config files required for configuring grunt tasks listed in package.json
    var configs = require('load-grunt-configs')(grunt, {
        config : {
            src: 'test/e2e/grunt/config/*.*'
        },
        yeoman : {
            app: require('../../bower.json').appPath || 'src',
            dist: require('../../bower.json').distPath || 'dist,',
            e2e: 'coverage/e2e',
            static: 'static',
            instrumentedServer: 'coverage/server/instrument',
            instrumentedE2E: 'coverage/e2e/instrumented',
            css: resourcesJson.css || [],
            fonts: resourcesJson.fonts || []
        }
    });

    grunt.initConfig(configs);

    // load the config for grunt Alias tasks. Alias tasks load other tasks i.e. 'run-app'
    var tasks = grunt.file.readJSON('test/e2e/grunt/tasks.json');
    var keys = _.keys(tasks);
    _.each(keys, function(key) {
        grunt.registerTask(key, tasks[key]);
    });
};
