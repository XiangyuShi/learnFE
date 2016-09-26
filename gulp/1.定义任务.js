var gulp=require('gulp');
// 定义一个任务
gulp.task('hello',function(){
	console.log('你好hello');
});
gulp.task('world',function(){
	console.log('你好world');
});
// 定义一个组合任务
gulp.task('default',['hello','world'],function(){
	console.log('done');
});
