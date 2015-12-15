var gulp = require ('gulp'),
	compass = require('gulp-compass'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');


gulp.task('compass', function(){
	gulp.src('app/scss/styles.scss')
	.pipe(compass({
		config_file: './config.rb',
		css: 'app/css',
		sass: 'app.scss'
	}))
	.pipe(gulp.dest('app/css/'));
});

gulp.task('scripts', function() {
	gulp.src(['app/js/**/*.js', '!app/js/**/*/.min.js'])
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app.js'));
});

gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);