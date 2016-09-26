var gulp = require('gulp');
var concat = require('gulp-concat');
/*
 * 合并
 */
gulp.task('concatScript',function(){
     gulp.src('./app/scripts/*.js')
         .pipe(concat('join.js'))
         .pipe(gulp.dest('dist/scripts'));
});