module.exports = function () {
    'use strict';

    return {
        options: {
            configFile: 'protractor.conf.js', // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                coverageDir: '<%= yeoman.instrumentedE2E %>',
                args: {}
        },
        phantom: {
            options: {
                args: {
                    baseUrl: 'http://127.0.0.1:9003/',
                        // Arguments passed to the command
                        'browser': 'phantomjs'
                }
            }
        },
        chrome: {
            options: {
                args: {
                    baseUrl: 'http://127.0.0.1:9003/',
                        // Arguments passed to the command
                        'browser': 'chrome'
                }
            }
        }
    };
}