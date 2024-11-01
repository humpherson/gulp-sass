'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const stylelint = require('gulp-stylelint')

sass.compiler = require('node-sass');

gulp.task('sass:lint', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(stylelint({
      failAfterError: true,
      reporters: [
        { formatter: 'verbose', console: true }
      ]
    }))
});

gulp.task('compile:dev', done => {
  gulp.src('./sass/**/*.scss')
  .pipe(concat('styles.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dev/'));
  done();
});

gulp.task('compile:dist', done => {
  gulp.src('./sass/**/*.scss')
  .pipe(concat('all.min.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/'));
  done();
});

gulp.task('sass:build', gulp.series(['sass:lint', 'compile:dist']))

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', { ignoreInitial:false }, gulp.series('sass:lint', 'compile:dev'));
});
