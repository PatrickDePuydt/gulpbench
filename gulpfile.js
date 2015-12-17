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

	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	
	.pipe(plumber())
	
	.pipe(rename({suffix:'.min'}))
	
	.pipe(uglify())

	.pipe(gulp.dest('app/js'))

	//.pipe(reload({stream: true}));

});


gulp.task('sass', function(){

	gulp.src('app/scss/styles.scss')

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

	gulp.watch('app/js/**/*.js', ['scripts']);
	
	gulp.watch('app/scss/**/*.scss', ['sass']);
	
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