
let gulp = require('gulp');
let minify = require('gulp-minify');
let deleteLines = require('gulp-delete-lines');
let rename = require('gulp-rename');


gulp.task('default', ['minify-with-debug', 'strip-debug', 'minify-strip-debug']);

gulp.task('minify-with-debug', function () {
    return gulp.src('script/soundmanager2.js')
        .pipe(minify({
            ext: {
                min: '-jsmin.js'
            },
            exclude: ['tasks'],
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('script'))
});

gulp.task('strip-debug', function () {
    let src = gulp.src('script/soundmanager2.js');
    src = stripDebug(src);
    return src.pipe(rename('soundmanager2-nodebug.js'))
        .pipe(gulp.dest('script'));
});

gulp.task('minify-strip-debug', function () {
    let src = gulp.src('script/soundmanager2.js');
    src = stripDebug(src);

    return src.pipe(minify({
        ext: {
            min: '-nodebug-jsmin.js'
        },
        exclude: ['tasks'],
        preserveComments: 'some'
    }))
        .pipe(gulp.dest('script'));
});

function stripDebug(src) {
    return src
        .pipe(deleteLines({ 'filters': [/.*\s+sm2._wD\(*.+?\);/i] }))
        .pipe(deleteLines({ 'filters': [/.*\s+_wDS\(*.+?\);/i] }))
        .pipe(deleteLines({ 'filters': [/.*\s+debugTS\(*.+?\);/i] }))
        .pipe(deleteLines({ 'filters': [/.*\s+complain\(*.+?\);/i] }));
};
