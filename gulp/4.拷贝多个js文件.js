var gulp=require('gulp');
/*
 * 拷贝多个js或css文件
 * ! 表示拒绝匹配，排除文件
 */
gulp.task('copyScripts',function(){
	// return gulp.src(['./app/scripts/base.js','./app/scripts/page.js'])
	// 	.pipe(gulp.dest('dist/scripts'));

	// return gulp.src(['./app/scripts/*.js'])
	// 	.pipe(gulp.dest('dist/scripts'));

	// ! 表示拒绝匹配，排除文件
	return gulp.src(['./app/scripts/base.js','!./app/scripts/page.js'])
		.pipe(gulp.dest('dist/scripts'));
});