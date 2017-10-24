var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    pug = require('gulp-pug'),
    zip = require('gulp-zip'),
    browserSync = require('browser-sync').create(),
    spritesmith = require('gulp.spritesmith'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlminify = require("gulp-html-minify"),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge-stream');
    cleanCss = require('gulp-clean-css');
/**每个文件夹生成单独一个文件
 * src/less
 * less/a/*.less
 * less/b/*.less
 * 
 * dist/css/a.css
 * dist/css/a.min.css
 * 
 * dist/css/b.css
 * dist/css/b.min.css
 * 
 */
/**
 * 照抄
 */
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}
var entryLess = 'src/less';
var outputLess = 'dist/css'

gulp.task('css', function() {
    var folders = getFolders(entryLess);
    var tasks = folders.map(function(folder) {
        /**
         * 拼接成foldername.less
         * 
         * 写入输出
         * 
         * 重命名为folder.min.css
         * 
         * 写入输出
         *
         */
        return gulp.src(path.join(entryLess, folder, '/*.less'))
               .pipe(changed('dist/css',{
                    extension: '.css',
                    hasChanged: changed.compareLastModifiedTime
                }))
               .pipe(less())
               .pipe(concat(folder + '.css'))
               .pipe(gulp.dest(outputLess))
               .pipe(plumber())
               .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
               .pipe(rename({suffix: '.min'}))
               .pipe(cleanCss())
               .pipe(gulp.dest(outputLess))
               .pipe(browserSync.reload({stream: true}))
               .pipe(notify('CSS Task Complete!'))
    })
})


var entryJs = 'src/javascripts';
var outputJs = 'dist/js'

gulp.task('js',function(){
    var folders = getFolders(entryJs); 
    var task = folders.map(function(folder) {
        return gulp.src(path.join(entryJs, folder, '/*.js'))
            .pipe(changed('dist/js',{
                extension: '.js',
                hasChanged: changed.compareLastModifiedTime
            }))
            .pipe(plumber())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat(folder + '.js'))
            .pipe(gulp.dest(outputJs))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(outputJs))
            .pipe(browserSync.reload({stream: true}))
            .pipe(notify('js Task Complete!'))
    })
})

gulp.task('pic', function() {
    return gulp.src('src/images/*.{png,jpg}')
        .pipe(plumber())
        .pipe(changed('dist/img/*',{
            hasChanged: changed.compareLastModifiedTime
        }))
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify('Pictures Compressed!'));
});

gulp.task('html', function (){
    return gulp.src('views/*.html')
        .pipe(plumber())
        .pipe(htmlminify())
        .pipe(changed('dist/',{
            extension: '.html',
            hasChanged: changed.compareSha1Digest
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify('HTML Task Complete!'));
});
gulp.task('vendor:css', function() {
    return gulp.src('vendor/*.css')
        .pipe(plumber())
        .pipe(changed('vendor/css',{
            extension: '.css',
            hasChanged: changed.compareSha1Digest
        }))
        .pipe(gulp.dest('vendor/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify('Vendor Task Complete!'));
});
gulp.task('vendor:js', function() {
    return gulp.src('vendor/*.js')
        .pipe(plumber())
        // .pipe(jshint())
        // .pipe(changed('vendor/js',{
        //     extension: '.js',
        //     hasChanged: changed.compareSha1Digest
        // }))
        .pipe(babel({
           presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/vendor'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/vendor'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify('Vendor Task Complete!'));
});
gulp.task('vendor:pic', function() {
    return gulp.src('vendor/*.{jpg, png, gif, ico}')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(changed('dist/img',{
            hasChanged: changed.compareLastModifiedTime
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify('Vendor Task Complete!'));
});
gulp.task('sprite', function () {
    return gulp.src('src/images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: '../../dist/css/sprite.css',//保存合并后对于css样式的地址
            imgPath: '../img/sprite.png',
            padding: 5,//合并时两个图片的间距
            algorithm: 'binary-tree',
            cssTemplate: function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-" + sprite.name +
                    "{" +
                    "background-image: url('" + sprite.escaped_image+ "');"+
                    "background-position: " + parseFloat(sprite.px.offset_x) + "px " + parseFloat(sprite.px.offset_y) + "px;" +
                    "width:" +(parseFloat(sprite.px.width)/2)+"px;" +
                    "height:" +(parseFloat(sprite.px.height)/2)+"px;" +
                    "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'pic', 'js', 'html', 'vendor:css', 'vendor:js','vendor:pic')
});

gulp.task('clean', function() {
    return del(['dist/']);
});
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            online: false
        }
    });
    gulp.watch('src/less/**/*.less', ['css']);
    gulp.watch('src/images/*.{png,jpg}', ['pic']);
    gulp.watch('src/javascripts/**/*.js', ['js']);
    gulp.watch('views/**/*.html', ['html']);
    gulp.watch('vendor/*.js',['vendor:js']);
    gulp.watch('vendor/*.css',['vendor:css'])
    gulp.watch('vendor/*.{jpg, png, gif, ico}',['vendor:pic'])
});
gulp.task('zip',function() {
    return gulp.src(['dist/**'])
        .pipe(zip('project.zip'))
        .pipe(gulp.dest(process.cwd()));
});
