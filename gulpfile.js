var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmini = require('gulp-htmlmin');
var uglify = require('gulp-uglify');

var scssFiles = './app/scss/*.scss';
var htmlFiles = './app/*.html';
var jsFiles = './app/js/*.js';

var cssDistDest = './dist/css';
var htmlDistDest = './dist';
var jsDistDest = './dist/js';


// Options for production
var sassProdOptions = {
    outputStyle: 'compressed'
}

function sassprod() {
    return gulp.src(scssFiles)
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(gulp.dest(cssDistDest));
};

function htmlminify(){
    return gulp.src(htmlFiles)
        .pipe(htmlmini({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDistDest));
}

function jsminify(){
    return gulp.src(jsFiles)
        .pipe(uglify())
        .pipe(gulp.dest(jsDistDest));
}

function watchSCSS() {
    gulp.watch(scssFiles, gulp.parallel(sassprod));
}

function watchHTML(){
    gulp.watch(htmlFiles, gulp.parallel(htmlminify));
}

function watchScript(){
    gulp.watch(jsFiles, gulp.parallel(jsminify));
}

gulp.task('default', gulp.parallel(sassprod, watchSCSS, watchHTML, watchScript, htmlminify, jsminify));