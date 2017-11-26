var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');

/*图片压缩 */
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function(){
  return gulp.src('src/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});


/*主管道 */
gulp.task('sass', function(){
    gulp.src('src/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-assets', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

/*监控、热加载*/
gulp.task('watch', function(){
    gulp.watch(['src/index.html'], ['copy-assets']);
    gulp.watch(['src/main.scss'], ['sass']);
})

gulp.task('default', ['sass', 'copy-assets', 'watch']);

