var gulp=require('gulp');
/*
 * 拷贝一个文件  新建文件夹app index.html是开发环境代码，dist文件夹是线上环境代码
 * pipe管道
 */
gulp.task('copyHtml',function(){
	return gulp.src('./app/index.html')
		.pipe(gulp.dest('dist'));
});