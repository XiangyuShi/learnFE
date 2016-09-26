var gulp=require('gulp');
/*
 * 合并子任务
 * **匹配任何字符，包括路径分隔符
 * ! 表示拒绝匹配，排除文件
 */
gulp.task('copyHtml',function(){
	return gulp.src('./app/index.html')
		.pipe(gulp.dest('dist'));
});
gulp.task('copyImage',function(){
	return gulp.src('./app/images/**/*.{jpg,png}')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('copyScripts',function(){
	// ! 表示拒绝匹配，排除文件
	return gulp.src(['./app/scripts/base.js','!./app/scripts/page.js'])
		.pipe(gulp.dest('dist/scripts'));
});
gulp.task('default',['copyHtml','copyImage','copyScripts']);