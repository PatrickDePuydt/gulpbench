// 1 --------------- > /////
// Variables
// /////////////////////////////

var gulp = require('gulp'),

	browserSync = require('browser-sync'),

	reload = browserSync.reload,

	autoprefixer = require('gulp-autoprefixer'),
	
	compass = require('gulp-compass'),
	
	uglify = require('gulp-uglify'),
	
	plumber = require('gulp-plumber'),

	sass = require('gulp-sass'),

	maps = require('gulp-sourcemaps'),
	
	rename = require('gulp-rename');

// 2 --------------- > /////
// Tasks
// /////////////////////////////

gulp.task('html', function(){

	gulp.src('app/**/*.html')
	
	.pipe(reload({stream: true}));

});

gulp.task('scripts', function() {

	gulp.src(['app/js/**/*.js', '!app/js/**/*/.min.js'])
	
	.pipe(plumber())
	
	.pipe(rename({suffix:'.min'}))
	
	.pipe(uglify())
	
	.pipe(gulp.dest('app.js'))

	.pipe(reload({stream: true}));

});

gulp.task('compass', function(){
	
	gulp.src('app/scss/styles.scss')
	
	.pipe(plumber())
	
	.pipe(compass({
	
		config_file: 'config.rb',
	
		sourcemap: true,
	
		debug: true,
	
		css: 'app/css',
	
		sass: 'app/scss'
	}))
	
	.pipe(autoprefixer())
	
	.pipe(gulp.dest('app/css/'))
	
	.pipe(reload({stream: true}));

});

gulp.task('sass', function(){

	gulp.src('app/scss/styles.scss')

	.pipe(maps.init())

	.pipe(sass())

	.pipe(maps.write('./'))
	
	.pipe(plumber())

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

gulp.task('default', [ 'scripts', 'sass', 'html', 'browser-sync', 'watch']);