var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
  return sass('./app/styles/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('default',['sass']);