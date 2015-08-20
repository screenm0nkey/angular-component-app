// Karma configuration
// Generated on Wed Aug 19 2015 16:28:22 GMT+0100 (GMT Daylight Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // app lib dependencies
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/cmelion-component-factory/angular-component-factory.js',
            // app configuration files for bootstrapping app
            'src/scripts/app.js',
            'src/scripts/config/config.js',
            'src/scripts/config/component-loader.js',
            // files to be tested
            'src/scripts/**/*_.js',
            // jasmine matchers
            'test/jasmine-matchers/*.js',
            // need this for ng-html2js. look at Elements tab in Devtools when debugging
            'src/scripts/components/**/*.html',
            // test spec files
            'src/scripts/**/*_spec.js'
        ],

        preprocessors: {
            'src/scripts/components/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'myApp.templates'
        },


        // list of files to exclude
        exclude: [],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],//PhantomJS


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
