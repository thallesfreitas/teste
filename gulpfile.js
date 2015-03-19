'use strict';
var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    jadeInheritance = require('gulp-jade-inheritance'),
    jade         = require('gulp-jade'),
    notify       = require('gulp-notify'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    shell        = require('gulp-shell'),
    plumber      = require('gulp-plumber'),
    config       = {
      proxy: "http://localhost:8888/",
      logPrefix: "teste huge",
      open: "external"
    };




gulp.task('jade-inheritance', function () {
  gulp.src('./www/jade/*.jade')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(jade())
    .on('error', function (err) { console.log(err.message); })
    .pipe(plumber.stop())
    .pipe(gulp.dest('./www/'));
});


//Task to compile SASS
gulp.task('styles', function () {
  gulp.src('./www/scss/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .on('error', function (err) { console.log(err.message); })
    .pipe(plumber.stop())
    .pipe(gulp.dest('./www/css/'));
});

// browser-sync task to run a local server
gulp.task('browser-sync', function() {
  browserSync(config);
});

// Reload all Browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Reload all Browsers
/*
gulp.task('prefixer', function () {
  gulp.src('./www/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./www/css/'));
});
*/
// Start server and watch css and php files
gulp.task('default', ['browser-sync','styles'],function (event) {
  //gulp.watch(["./www/jade/*.jade"], ['jade']);
  gulp.watch(["./www/scss/*.scss"], ['styles']);
  gulp.watch(["./www/css/*.css","./www/*.php","./www/js/**", "./www/*.html"], ['bs-reload']);
//  gulp.watch(["./www/css/style.css"], ['prefixer']);
});






