var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync');

// browserSync
gulp.task('browser-sync', ['build', 'sass'], function(){
    browserSync({
        server: {
            baseDir: 'dist/'
        }
    })
});
gulp.task('rebuild', ['build'] ,function(){
    browserSync.reload();
});

// gulpwrap
gulp.task('build', function(){
    gulp.src('src/works.html')
        .pipe(wrap({src:"src/layout/default.html"}))        
        .pipe(gulp.dest('dist/'));
    gulp.src('src/blog.html')
        .pipe(wrap({src:"src/layout/default.html"}))        
        .pipe(gulp.dest('dist/'));
    gulp.src('src/index.html')
        .pipe(wrap({src:"src/layout/default.html"}))        
        .pipe(gulp.dest('dist/'));
});

// handleError防止错误中断gulp,加了handleError可报错后重连
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

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
        .pipe(sass()).on('error', handleError)
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest('dist/'))
        // 监听修改
        .pipe(browserSync.reload({stream: true}));
});



/*监控、热加载*/
gulp.task('watch', function(){
    gulp.watch(['src/**/*.html'], ['rebuild']);
    gulp.watch(['src/*.scss'], ['sass']);
})

// 有了browsersync，不需要sass，build了—— gulp.task('default', ['sass', 'build', 'watch']);
gulp.task('default', ['browser-sync', 'watch']);

