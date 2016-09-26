var gulp = require('gulp');
var jshint = require("gulp-jshint");
/*
 * 语法检查
 */
gulp.task('jsHint', function () {
    gulp.src('./app/scripts/base.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});