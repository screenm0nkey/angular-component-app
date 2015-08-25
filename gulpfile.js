var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');

var PATHS = {
    src: {
        sass : [
            'src/styles/**/*.scss',
            'src/scripts/components/**/*.scss'
        ]
    }
};

gulp.task('clean', function(done) {
    del(['.tmp'], done);
});

gulp.task('sass', function () {
    gulp.src(PATHS.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp'))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('src'));
});


gulp.task('serve', function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');
    var port = 3000;
    var app;

    app = connect();

    app.use('/lib', serveStatic(__dirname + '/bower_components'));
    app.use('/components', serveStatic(__dirname + '/src/scripts/components'));
    app.use(serveStatic(__dirname + '/src'));

    http.createServer(app).listen(port, function () {
        console.log('Server listening on port', port);
        open('http://localhost:' + port);
    });
});


gulp.watch(PATHS.src.sass, ['sass', 'clean']);

gulp.task('play', function (done){
    runSequence('sass', 'clean', 'serve', done);
});