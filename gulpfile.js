const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('lib', function () {
    return gulp.src('lib/*')
        .pipe(gulp.dest('build/lib'));
});

gulp.task('sass', function () {
    return gulp.src('css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

gulp.task('html', function () {
    return gulp.src('html/*.html')
        .pipe(gulp.dest('build/html'));
});


gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build/js'));
});

// browserify
gulp.task("browserify", function () {
    return browserify({
            entries: "build/js/index.js"
        }).bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("build/js"));
});

gulp.task('default', function () {
    gulp.run('lib', 'sass', 'html', 'js', 'browserify');

    gulp.watch('lib/*', ['lib']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch('html/*.html', ['html']);
    gulp.watch('js/*.js', ['js', 'browserify']);
});