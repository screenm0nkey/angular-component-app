module.exports = function () {
    'use strict';

    return {
        src: '<%= yeoman.instrumentedE2E %>/*.json',
            options: {
            type: 'html',
                dir: '<%= yeoman.e2e %>/reports',
                print: 'detail'
            //        type: 'lcov',
            //        dir: 'reports',
            //        print: 'detail'
        }
    };
}