module.exports = function () {
    "use strict";

    return {
        coverageE2E: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>',
                    // the 'instrument' task copies all the JS files into 'coverage' folder
                    src: [
                        'config/**/*.js',
                        '*.{ico,png,txt,html}',
                        '.htaccess',
                        'assets/**/*',
                        'components/**/*.html',
                        'dev/**/*.*'
                    ]
                },
                {
                    "dest": "<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>/index.html",
                    "src": "<%= yeoman.app %>/index.template"
                },
                {
                    "expand": true,
                    "cwd": "src",
                    "dest": "<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>/assets/fonts",
                    "flatten": true,
                    "src": '<%= yeoman.fonts %>'
                },
                {
                    "expand": true,
                    "cwd": "src",
                    "dest": "<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>/styles",
                    "flatten": true,
                    "src": '<%= yeoman.css %>'
                },
                {
                    "expand": true,
                    "cwd": "<%= yeoman.instrumentedE2E %>/assets/images",
                    "dest": "<%= yeoman.dist %>/assets/images",
                    "src": ["generated/*"]
                },
                {
                    expand: true,
                    cwd: '.',
                    dest: '<%= yeoman.instrumentedE2E %>/<%= yeoman.app %>',
                    src: 'bower_components/**/*'
                }

            ]
        }
    };
};
