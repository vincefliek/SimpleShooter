(function() {

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    runSequence = require('run-sequence'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    stylus = require('gulp-stylus'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    htmlreplace = require('gulp-html-replace'),
    htmlmin = require('gulp-htmlmin'),
    open = require('gulp-open'),
    CacheBuster = require('gulp-cachebust'),
    cachebust = new CacheBuster(),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

  // Define app file path variables
  var paths = {
    root: './app/',                               // App root path
    css: './app/css/',                            // CSS path
    js: './app/js/',                              // JS path
    img: './app/img/',                            // Img path
    assets: './assets/',                          // Assets path
    bower: './assets/bower_components/',          // Bower path
    stylus: './assets/stylus/'                    // Stylus path
  };

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the compiled folders
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('clean', function () {
    return del([
      paths.root,
      paths.assets + 'css/'
    ]);
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// lint *.js files
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('lint:js', function() {
    return gulp.src( paths.assets + 'js/*.js' )
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish));
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// replace index.html to the app folder with new files' paths
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('index.html', function() {
    return gulp.src( paths.assets + 'index.html' )
      .pipe(htmlreplace({
        'css': 'css/bundle.min.css',
        'js': 'js/bundle.min.js'
      }))
      .pipe(htmlmin({collapseWhitespace: true}))
      .on('error', gutil.log)
      .pipe(cachebust.references())
      .pipe(gulp.dest( paths.root ));
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// replace twitter bootstrap to the assets/css/ folder
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('bs:css', function() {
    return gulp
      .src([
        paths.bower + 'bootstrap/dist/css/bootstrap.min.css'
      ])
      .pipe(gulp.dest( paths.assets + 'css/' ));
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// compile *.styl and replace to the assets/css/ folder
// stylus' errors are processed properly
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('stylus', function (done) {
    gulp.src( paths.stylus + 'styles.styl' )
      .pipe(stylus({
          compress: true
        })
        .on('error', function(err) {
          done(err);
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest( paths.assets + 'css/' ))
      .on('end', function() {
        done();
      });
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// CSS bundle (concatenated and minified)
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('css-concat', function() {
    return gulp
      .src([
        paths.assets + 'css/*.css'
      ])
      .pipe(concat('bundle.min.css'))
      .pipe(gulp.dest( paths.css ));
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// Javascript bundle - the order of the js files is determined by Browserify
//
/////////////////////////////////////////////////////////////////////////////////////

  var brsfy = browserify({
    entries: paths.assets + 'js/app.js'
  });

  gulp.task('js-browserify', function() {
    return brsfy.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(cachebust.resources())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(uglify())
      .pipe(rename('bundle.min.js'))
      .on('error', gutil.log)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest( paths.js ));
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// replace images to the app folder
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('images', function() {
    return gulp.src( paths.assets + 'img/**/*' )
      .pipe(cache(imagemin()))
      .pipe(gulp.dest( paths.img ));
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// watches files and triggers separate tasks when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('watch', function() {
    var files = [
      paths.stylus + '*.styl',
      paths.assets + '*.html',
      paths.assets + 'js/*.js',
      paths.assets + 'img/**/*'
    ];

    gulp.watch( files[0], ['stylus', 'css-concat'] );
    gulp.watch( files[1], ['index.html'] );
    gulp.watch( files[2], ['js-browserify'] );
    gulp.watch( files[3], ['images'] );
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server with livereload and open app in browser
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: 'http://localhost:8000/app/index.html'
      }));
  });

/////////////////////////////////////////////////////////////////////////////////////
//
// build
//
/////////////////////////////////////////////////////////////////////////////////////

  gulp.task('default', function(callback) {
    // run tasks sync
    runSequence(
      'lint:js',
      'index.html',
      'bs:css',
      'stylus',
      'css-concat',
      'js-browserify',
      'images',
      'webserver',
      'watch',
      callback
    );
  });

})();