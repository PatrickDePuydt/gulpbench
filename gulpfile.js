var browserSync     = require('browser-sync').create();

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	compass = require('gulp-compass'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename');


gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(browserSync.stream());
});



gulp.task('scripts', function() {
	gulp.src(['app/js/**/*.js', '!app/js/**/*/.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app.js'));
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
	.pipe(browserSync.stream());
});

//Local Server
gulp.task('serve', function() {

  browserSync.init({

      server: 'app/'

  });


	gulp.watch('app/scss/**/*.scss', ['compass']);

	gulp.watch('app/html/**/*.html', ['html']);

	//Watches for changes to the HTML and then reloads.
	gulp.watch('app/**/*.html').on('change', browserSync.reload());

});

gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['compass']);
	gulp.watch('app/html/**/*.html', ['html']);
});

gulp.task('default', ['scripts', 'html', 'compass', 'watch', 'serve']);