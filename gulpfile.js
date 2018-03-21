var path = require('path');

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var browserSync = require('browser-sync').create();//创建本地服务器

var sassPath = './src/scss';//scss文件路径
var cssPath = './src/css';

//编译scss文件
gulp.task('sass',function(){
  gulp.src(sassPath+'/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssPath))
});

//服务器插件中，监视文件并自动刷新
gulp.task('serve',
function() {
  browserSync.init({ server: { baseDir: 'src' } })
});

gulp.watch(['src/scss/*.scss'],function(){
  gulp.run('sass');
});

gulp.watch(['src/js/**/*.js','src/css/*.css','src/html/*.html','src/html/*.js','src/*.html'],
  function(){
    browserSync.reload();
});

//默认行为,直接调用服务器
gulp.task('default',
  function(){
    gulp.run('serve');
    gulp.run('sass');
});

