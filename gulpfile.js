const gulp = require('gulp')
const webpack = require('webpack-stream')
const del = require('del')
const configs = require('./webpack.config')

gulp.task('clean', function() {
  return del(['./dist/'])
})

gulp.task('build:umd', function() {
  return gulp
    .src('src/index.ts')
    .pipe(webpack(configs.umdConfig))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('build:standalone', function() {
  return gulp
    .src('src/index.ts')
    .pipe(webpack(configs.standaloneConfig))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('build:test', function() {
  return gulp
    .src('tests/index.ts')
    .pipe(webpack(configs.testConfig))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', gulp.series(['clean', 'build:umd', 'build:standalone']))
