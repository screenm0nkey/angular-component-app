module.exports = function () {
    'use strict';

    return {
        coverage: {
            path: '<%= yeoman.e2e %>/reports/index.html',
            app: 'Chrome'
        }
    };
}