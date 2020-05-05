var stylus = require('gulp-stylus');
var webserver = require('gulp-webserver');
var jade = require('gulp-jade');
var gulp = require('gulp');
var nib = require('nib');
var cssbeautify = require('gulp-cssbeautify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var webpack = require('webpack-stream')

gulp.task('stylus', function () {
  gulp.src('./source/stylus/*.styl')
  	.pipe(plumber(function (error) {
        gutil.log(error.message);
        this.emit('end');
       gutil.beep();
    }))
	 .pipe(stylus({
	  use: [nib()]}))
	 .pipe(cssbeautify({
	  	indent: '	',
	  autosemicolon: true
	}))
	.pipe(gulp.dest('./public/css'));
});




gulp.task('jade', function() {
	gulp.src('./source/*.jade')
	.pipe(plumber(function (error) {
	gutil.log(error.message);
	this.emit('end');
    gutil.beep();
    }))
	.pipe(jade({
	  pretty: true
	     }))

	.pipe(gulp.dest('./public'))
});


gulp.task('webserver', function() {
  gulp.src('public')
	.pipe(webserver({
	  livereload: true,
	  directoryListing: true,
	  open: '/index.html'
	}));
});

gulp.task('script' , function() {
  return gulp.src('./source/**/*.js')
	  .pipe(webpack( require('./webpack.config.js') ))
	.pipe(gulp.dest('public/js'));
});



gulp.task('watch', function() {
  gulp.watch('./source/**/*.jade', ['jade']);
  gulp.watch('./source/**/*.js', ['script']);
  gulp.watch('./source/**/*.styl', ['stylus']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'stylus', 'jade', 'script', 'webserver']);
