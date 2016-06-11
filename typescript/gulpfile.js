var gulp = require("gulp");
var ts = require("gulp-typescript");

var tsProject = ts.createProject('tsconfig.json');
gulp.task('default', function() {
    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(ts(tsProject));
 
    return tsResult.js.pipe(gulp.dest('dist/'));
});