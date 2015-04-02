"use strict";

var gulp = require('gulp'),
    del = require('del'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

/* Compile jsx and browserify code */
gulp.task('js', function() {

  browserify({
    standalone: 'First',
    transform: ['reactify'],
    extensions: ['.jsx'],
    entries: ['./src/jsx/first.jsx']
  })
  .bundle()
  .pipe(source('first.js'))
  .pipe(gulp.dest('./dist/js'))
});

/* Watch the files for changes */
gulp.task('watch', function() {
  gulp.watch(['src/**/*'], ['js'])
});
