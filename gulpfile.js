var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// var sass = require('gulp-sass');
var concat = require('gulp-concat');
var less = require('gulp-less');

gulp.task('less', function(done) {
    gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(concat("style.css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
        // .pipe(browserSync.reload());
        // browserSync.reload()
    done();
});

gulp.task('serve', function(done) {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // gulp.watch("scr/less/*.less", gulp.series('less'));
    gulp.watch("src/less/*.less", gulp.series('less'));
    gulp.watch("*.html").on('change', () => {
      browserSync.reload();
      done();
    });
  

    done();
});

// gulp.task('default', gulp.series('less', 'serve'));
gulp.task('default', gulp.series('serve'));
