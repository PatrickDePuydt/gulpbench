// 1 --------------- > /////
// Variables
// /////////////////////////////

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
<<<<<<< HEAD
=======

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
<<<<<<< HEAD
=======

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	del = require('del'),
	notify = require('gulp-notify'),
<<<<<<< HEAD
=======

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
	rename = require('gulp-rename');

// 2 --------------- > /////
// Tasks
// /////////////////////////////

gulp.task('html', function(){
	gulp.src('app/**/*.html')
<<<<<<< HEAD
=======

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
	.pipe(reload({stream: true}));

});

gulp.task('scripts', function() {
	gulp.src(['app/js/**/*.js'])

	.pipe(maps.init())

	.on('error', notify.onError({
	 	message: 'Error: <%= error.message %>'
	}))

	.pipe(concat('scripts.js'))
	.pipe(maps.write('./'))
<<<<<<< HEAD
=======

	//.pipe(plumber())

	//.pipe(rename({suffix:'.min'}))

	//.pipe(uglify())

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
	.pipe(gulp.dest('app/'))
	.pipe(reload({stream: true}));

});

gulp.task('sass', function(){
	gulp.src('app/scss/styles.scss')
	.pipe(plumber())
	.pipe(maps.init())
	.pipe(sass())
	.on('error', notify.onError({
		message: 'Error: <%= error.message %>'
	}))
	.pipe(autoprefixer())
	.pipe(maps.write('./'))
<<<<<<< HEAD
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream: true}));
=======

	.pipe(gulp.dest('app/css/'))

	.pipe(reload({stream: true}));

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
});

// 3 --------------- > /////
// Server and Watch
// /////////////////////////////

gulp.task('browser-sync', function() {
	browserSync({
<<<<<<< HEAD
		server: {
			baseDir: "./app/"
		}
=======

		server: {

			baseDir: "./app/"

		}

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
	});
});

gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
<<<<<<< HEAD
	gulp.watch('app/scss/**/*.scss', ['sass']);
=======

	gulp.watch('app/scss/**/*.scss', ['sass']);

>>>>>>> 330b6ccce741ef07e744048bae1c81cca33a0690
	gulp.watch('app/**/*.html', ['html']);
});

// 4 --------------- > /////
// Build Tasks
// /////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function (cb) {
	del([
		'build/**'
	], cb);
});

// task to create build directory of all files
gulp.task('build:copy', ['build:cleanfolder'], function(){
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy'], function (cb) {
	del(config.buildFilesFoldersRemove, cb);
});

gulp.task('build', ['build:copy', 'build:remove']);


// 9999 --------------- > /////
// Gulp Master Tasks
// /////////////////////////////

gulp.task('default', [ 'scripts', 'sass', 'html', 'browser-sync', 'watch']);