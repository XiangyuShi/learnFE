/**
 * Created by hnsxy on 2016/8/31 0031.
 */
var gulp = require('gulp');
var rev = require('gulp-rev');//版本号 根据内容生产哈希码
var revReplace = require('gulp-rev-replace');//更新版本号
var useref = require('gulp-useref');//根据注释 合并js或css文件
var filter = require('gulp-filter');//刷选符合条件的文件
var uglify = require('gulp-uglify');//压缩js
var csso = require('gulp-csso');//压缩css

gulp.task('default', function () {
    var jsFilter =filter('**/*.js',{restore:true});
    var cssFilter = filter('**/*.css',{restore:true});
    var indexHtmlFilter=filter(['**/*','!**/index.html'],{restore:true});
    
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'))
})