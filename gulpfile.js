var path = require('path');

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var browserSync = require('browser-sync').create();//创建本地服务器

var sassPath = './src/scss';//scss文件路径
var cssPath = './src/css';

//添加版本号start
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

gulp.task('css',function(){
return gulp.src('src/css/*.*')
         .pipe(rev())
         .pipe(gulp.dest('dist/css'))
         .pipe(rev.manifest())
         .pipe(gulp.dest('rev/css'))
})      

gulp.task('js',function(){
return gulp.src("src/js/**/*.*")
         .pipe(rev())
         .pipe(gulp.dest("dist/js"))
         .pipe(rev.manifest())
         .pipe(gulp.dest('rev/js'))
})
// ,'src/html/*.html'
gulp.task('htmlJs',function(){
return gulp.src(["src/html/*.js"])
          .pipe(rev())
          .pipe(gulp.dest("dist/html"))
          .pipe(rev.manifest())
          .pipe(gulp.dest('rev/htmlJs'))
})

gulp.task('pay',function(){
return gulp.src(["src/pay/**/*.*"])
          .pipe(rev())
          .pipe(gulp.dest("dist/pay"))
          .pipe(rev.manifest())
          .pipe(gulp.dest('rev/pay'))
})

gulp.task('payCode',function(){
return gulp.src(["src/pay_scan_code/**/*.*"])
          .pipe(rev())
          .pipe(gulp.dest("dist/pay_scan_code"))
          .pipe(rev.manifest())
          .pipe(gulp.dest('rev/payCode'))
})

gulp.task('img',function(){
return gulp.src(["src/image/**/*.*"])
          .pipe(rev())
          .pipe(gulp.dest("dist/image"))
          .pipe(rev.manifest())
          .pipe(gulp.dest('rev/img'))
})

gulp.task('imgs',function(){
return gulp.src(["src/images/**/*.*"])
          .pipe(rev())
          .pipe(gulp.dest("dist/images"))
          .pipe(rev.manifest())
          .pipe(gulp.dest('rev/imgs'))
})

gulp.task('rev',['css','js','htmlJs','pay','payCode','img','imgs'],function(){
return gulp.src(['rev/**/*.json','src/**/*.html'])
         .pipe(revCollector({
             replaceReved: true
         })).pipe(gulp.dest('dist'))
})
//添加版本号end

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

