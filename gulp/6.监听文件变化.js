var gulp=require('gulp');
/*
 * 合并子任务
 * **匹配任何字符，包括路径分隔符
 * ! 表示拒绝匹配，排除文件
 */
gulp.task('copyHtml',function(){
	return gulp.src('./app/*.html')
		.pipe(gulp.dest('dist'));
});
// 监听任务
gulp.task('watch',function(){
	gulp.watch('./app/*.html',['copyHtml']);
});