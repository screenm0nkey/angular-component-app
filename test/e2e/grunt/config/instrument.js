module.exports = function () {
    'use strict';

    return {
        files: [
            '<%= yeoman.app %>/dev/**/*.js',
            '<%= yeoman.app %>/components/**/*.js',
            '<%= yeoman.app %>/scripts/**/*.js'
        ],
            options: {
            lazy: true,
                basePath: '<%= yeoman.instrumentedE2E %>/'
        }
    };
}