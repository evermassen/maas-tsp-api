const gulp = require('gulp');
const replace = require('gulp-replace');
const yaml = require('gulp-yaml');
const del = require('del');
const connect = require('gulp-connect');

const swaggerRoot = 'specs/maas-v1.json'

gulp.task('copy-swagger-ui', function() {
  return gulp.src(['node_modules/swagger-ui/dist/**/*', '!node_modules/swagger-ui/dist/index.html'])
    .pipe(gulp.dest('docs'));
});

gulp.task('replace-swagger-index', function() {
  return gulp.src(['node_modules/swagger-ui/dist/index.html'])
    .pipe(replace('http://petstore.swagger.io/v2/swagger.json', swaggerRoot))
    .pipe(gulp.dest('docs'));
});

gulp.task('copy-specs', function() {
  return gulp.src(['specs/**/*.json', 'specs/**/*.png', 'specs/**/*.svg'])
    .pipe(gulp.dest('docs/specs'));
});

gulp.task('transform-yaml', function() {
  return gulp.src('./specs/*.yml')
    .pipe(yaml({ safe: true, space: 2 }))
    .pipe(gulp.dest('./specs/'))
});

gulp.task('clean:docs', function () {
  return del(['docs/**/*']);
});

gulp.task('serve', function() {
  return connect.server({
    root: 'docs',
    livereload: true
  });
});

// Aliases

gulp.task('docs', ['copy-swagger-ui', 'replace-swagger-index', 'copy-specs']);
gulp.task('build', ['transform-yaml']);
gulp.task('clean', ['clean:docs']);