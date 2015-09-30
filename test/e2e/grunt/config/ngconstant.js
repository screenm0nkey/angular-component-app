module.exports = function (grunt) {
    'use strict';

    return {
        options : {
            name: 'creditSalesLink',
                deps : false,
                dest: '<%= yeoman.instrumentedE2E %>/src/config/constants/mocks.js',
                template : grunt.file.read('grunt/custom-tasks/ngconstant.tpl.ejs'),
                constants: {
                mocks: {
                    useMocks : true
                }
            }
        },
        build: {}
    };
}