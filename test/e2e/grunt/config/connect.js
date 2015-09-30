module.exports = function () {
    'use strict';

    return {
        options: {
            port: process.env.PORT || 9003,
                hostname: process.env.IP || 'localhost',
                livereload: 35729
        },
        // 'server' is used for debugging
        debugMocks : {
            options: {
                open: true,
                    keepalive : true,
                    base: '<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>'
            }
        },
        livereload: {
            options: {
                open: true,
                    base: [
                    '<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>',
                    '<%= yeoman.e2e %>/reports'
                ]
            }
        },
        coverageE2E: {
            options: {
                open: false,
                    base: [
                    '<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>'
                ]
            }
        }
    };
}