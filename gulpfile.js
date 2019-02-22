var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmini = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var scssFiles = './app/scss/*.scss';
var htmlFiles = './app/*.html';
var jsFiles = './app/js/*.js';
var imagesFile = './app/img'

var cssDistDest = './dist/css';
var htmlDistDest = './dist';
var jsDistDest = './dist/js';
var imagesDisDest = './dist/img';


// Options for production
var sassProdOptions = {
    outputStyle: 'compressed'
}

function sassprod() {
    return gulp.src(scssFiles)
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(gulp.dest(cssDistDest));
};

function minifyimage(){
    return gulp.src(imagesFile)
      .pipe(imagemin())
      .pipe(gulp.dest(imagesDisDest))
}

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
    gulp.watch(scssFiles, sassprod);
}

function watchHTML(){
    gulp.watch(htmlFiles, htmlminify);
}

function watchScript(){
    gulp.watch(jsFiles, jsminify);
}

function watchImages(){
    gulp.watch(imagesFile, minifyimage);
}

gulp.task('default', gulp.parallel(sassprod, watchSCSS, watchHTML,watchImages, watchScript,minifyimage, htmlminify, jsminify));