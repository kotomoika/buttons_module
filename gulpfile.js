var gulp   = require('gulp');
var stylus = require('gulp-stylus');
var prefix   = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    src: 'src',
    dest: 'css'
}

gulp.task('compile_stylus', function() {
    gulp.src(paths.src + '/app.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write())
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('production', function() {
    gulp.src(paths.src + '/app.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(minify())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('prefix', function () {
      gulp.src(paths.dest + '/*.css')
        .pipe(prefix(["last 8 version", "> 1%", "ie 8"]))
        .pipe(gulp.dest(paths.dest));
    });

gulp.task('watch', function() {
    gulp.watch( 'src/**/*.styl', ['compile_stylus'] );
});

gulp.task('default', ['compile_stylus','watch']);

gulp.task('build', ['production', 'prefix']);
