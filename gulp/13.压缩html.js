var gulp = require('gulp');
var minifyHtml = require("gulp-minify-html");
/*
 * 压缩html
 */
gulp.task('copyHtml',function(){
	return gulp.src('./app/index.html')
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist'));
});