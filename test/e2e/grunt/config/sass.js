module.exports = function () {
    'use strict';

    return {
        dist : {
            options : {
                "loadPath": ["styles"]
            },
            files: [
                {
                    src: ["src/styles/main.scss"],
                    dest: "<%= yeoman.instrumentedE2E %>/src/styles/main.css"
                }
            ]
        }
    };
}