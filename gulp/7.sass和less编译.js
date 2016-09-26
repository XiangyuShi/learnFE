var gulp=require('gulp');
// var sass=require('gulp-sass');
var less=require('gulp-less');
/*
 * 编译sass和less
 */
// gulp.task('sass',function(){
// 	return gulp.src('./app/styles/main.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('dis/css'));
// });
gulp.task('less',function(){
	return gulp.src('./app/styles/page.less')
		.pipe(less())
		.pipe(gulp.dest('./dist/css'));
});
// 监听任务
// gulp.task('default',['sass','less']);
gulp.task('default',['less']);




// 注意：我在windows安装gulp-sas出现问题，所以安装的是gulp-ruby-sass，
// 不过需要安装ruby环境，然后安装sass，再安装gulp-ruby-sass	
// http://my.oschina.net/guopengfei/blog/391574?p={{totalPage}}
// var gulp = require('gulp');
// var sass = require('gulp-ruby-sass');

// gulp.task('sass', function () {
//   return sass('./app/styles/mian.scss')
//     .on('error', sass.logError)
//     .pipe(gulp.dest('./dist/css'));
// });