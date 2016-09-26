var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
/*
 * 压缩、重命名
 */
gulp.task('concatScript',function(){
     gulp.src('./app/scripts/*.js')
         .pipe(concat('join.js'))
         .pipe(uglify()).pipe(rename('join.min.js'))
         .pipe(gulp.dest('dist/scripts'));
});