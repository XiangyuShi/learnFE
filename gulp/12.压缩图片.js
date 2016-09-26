var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
/*
 * 压缩、重命名css
 */
gulp.task('copyImage',function(){
	// 某一种类型图片
	// return gulp.src('./app/images/*.jpg')
	// 	.pipe(gulp.dest('dist/images'));

	//一级目录的所有图片
	// return gulp.src('./app/images/*.{jpg,png}')
	// 	.pipe(gulp.dest('dist/images'));

	//**匹配任何字符，包括路径分隔符
	return gulp.src('./app/images/**/*.{jpg,png}')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});