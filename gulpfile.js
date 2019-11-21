const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    minCSS = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    minify = require('gulp-minify'),
    browserSync = require('browser-sync').create();
    

gulp.task('fontmin', function(done) {

    gulp.src('./prod/assets/fonts/*')
        .pipe(gulp.dest('./dist/assets/fonts'));
    done();
});

gulp.task('pug', function (done) {
    gulp.src('./prod/*.pug')
        .pipe(pug({
            'pretty': true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());

    done();
});

gulp.task('sass', function (done) {
    gulp.src('./prod/assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minCSS())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('minifyjs', function(done) {
    gulp.src('./prod/assets/js/*min.js')
        .pipe(gulp.dest('./dist/assets/js'));
    gulp.src('./prod/assets/js/*.js')
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('./dist/assets/js'));
    done();
});

gulp.task('minCSS', function(done) {
    gulp.src('./prod/assets/css/*.css')
        .pipe(minCSS())
        .pipe(gulp.dest('./dist/assets/css'));
    done();
});

gulp.task('imagemin', function(done) {
    gulp.src('./prod/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img'));
    done();
});


gulp.task('serve', function(done) {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./prod/assets/scss/*.scss", gulp.series('sass'));
    gulp.watch("./prod/assets/css/*.css", gulp.series('minCSS'));
    gulp.watch("./prod/assets/js/*.js", gulp.series('minifyjs'));
    gulp.watch("./prod/assets/fonts/*", gulp.series('fontmin'));
    gulp.watch("./prod/*.pug", gulp.series('pug'));
    gulp.watch("./dist/*.html").on('change', browserSync.reload);

    done();
});


gulp.task('default', gulp.series('pug','sass','minifyjs','minCSS','imagemin','fontmin','serve'));



