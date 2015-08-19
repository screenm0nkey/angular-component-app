var gulp = require('gulp');


gulp.task('play', function () {
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

gulp.task('default', ['play']);