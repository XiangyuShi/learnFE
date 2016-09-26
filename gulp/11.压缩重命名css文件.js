var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
/*
 * 压缩、重命名css
 */
gulp.task('less',function(){
	return gulp.src('./app/styles/page.less')
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename('page.min.css'))
		.pipe(gulp.dest('./dist/css'));
});