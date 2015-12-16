// 1 --------------- > /////
// Variables
// /////////////////////////////

var gulp = require('gulp'),

	browserSync = require('browser-sync'),

	reload = browserSync.reload,

	autoprefixer = require('gulp-autoprefixer'),

	uglify = require('gulp-uglify'),

	plumber = require('gulp-plumber'),

	sass = require('gulp-sass'),

	maps = require('gulp-sourcemaps'),

	del = require('del'),

	rename = require('gulp-rename');

// 2 --------------- > /////
// Tasks
// /////////////////////////////

gulp.task('html', function(){

	gulp.src('app/**/*.html')

	.pipe(reload({stream: true}));

});

gulp.task('scripts', function() {


	gulp.src(['app/src/js/*.js'])
	.pipe(plumber())

	.pipe(rename({suffix:'.min'}))

	.pipe(uglify())

	.pipe(gulp.dest('app/js/'))

	.pipe(reload({stream: true}));

});


gulp.task('sass', function(){

	gulp.src('app/src/scss/*.scss')

	.pipe(plumber())

	.pipe(maps.init())

	.pipe(sass())

	.pipe(autoprefixer())

	.pipe(maps.write('./'))

	.pipe(gulp.dest('app/css/'))

	.pipe(reload({stream: true}));

});

// 3 --------------- > /////
// Server and Watch
// /////////////////////////////

gulp.task('browser-sync', function() {

	browserSync({

		server: {

			baseDir: "./app/"

		}

	});

});

gulp.task('watch', function(){

	gulp.watch('app/src/js/*.js', ['scripts']);

	gulp.watch('app/src/scss/*.scss', ['sass']);

	gulp.watch('app/**/*.html', ['html']);

});

// 4 --------------- > /////
// Build Tasks
// /////////////////////////////

// Clean out all files and folders from build folder
gulp.task('build:cleanout', function(callBack){

	del([

			'build/**'

		], callBack);
});

// Create build directory for all files.
gulp.task('build:copy', ['build:cleanout'], function(){

	return gulp.src('app/**/*/')

	.pipe(gulp.dest('build'));

});

// Remove unwanted files and folders from Build

gulp.task('build:remove', ['build:copy'], function(callBack){

	del([

		'build/scss/',

		'build/js/'

		 ], callBack);

});


// 9999 --------------- > /////
// Gulp Master Tasks
// /////////////////////////////

gulp.task('build', ['build:copy', 'build:remove']);

gulp.task('default', [ 'scripts', 'sass', 'html', 'browser-sync', 'watch']);
