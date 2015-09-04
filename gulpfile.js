var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var del = require('del');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');

var PATHS = {
    src: {
        js : 'src/scripts/**/*_.js',
        sass : [
            'src/styles/**/*.scss',
            'src/scripts/components/**/*.scss'
        ]
    }
};

gulp.task('clean', function(done) {
    del(['.tmp'], {force : true},  done);
});

gulp.task('sass', function () {
    gulp.src(PATHS.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp'))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('src'));
});

gulp.task('lint', function(){
    return gulp.src(PATHS.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('serve', function () {
    var fs = require('fs');
    var path = require('path');
    var express = require('express');
    var path = require('path');
    var open = require('open');
    var app = express();

    app.use('/lib', express.static(path.join(__dirname, '/bower_components')));
    app.use('/components', express.static(path.join(__dirname, '/src/scripts/components')));
    app.use(express.static(path.join(__dirname, '/src')));

    app.use('/someapi/myapp/message', function (req, res) {
        res.json({"msg":"this is from the backend"});
        res.end();
    });

    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'));
//    open('http://localhost:' + app.get('port'));
});


gulp.task('watch', ['lint'], function(){
    gulp.watch(PATHS.src.js, ['lint']);
    gulp.watch(PATHS.src.sass, ['sass', 'clean']);
});

gulp.task('play', function (done){
    // clean twice to stop gulp read errors
    runSequence('clean', 'sass', 'clean', 'watch', 'serve', done);
});