
const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");

function browser_sync() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false,
	});
};

// Пользовательские скрипты проекта


function js() {
	return src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/slick-1.8.1/slick/slick.min.js',
		'src/js/common.min.js', // Всегда в конце
	])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify()) // Минимизировать весь js (на выбор)
		.pipe(dest('src/js'))
		.pipe(browserSync.reload({ stream: true }));
};

function common_js() {
	return src([
		'src/js/common.js',
	])
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(dest('src/js'));
};

function sassFunc(done) {
	return src('src/sass/main.sass')
		.pipe(sass())
		.pipe(dest('src/css'))
		.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(dest('src/css'))
		.pipe(browserSync.stream())

};

function watchFunc() {
	watch('src/sass/**/*.sass').on("change", sassFunc);
	watch(['src/js/common.js', 'libs/**/*.js'], series(common_js, js));
	watch('src/*.html').on("change", browserSync.reload);
};

function imageminFunc() {
	return src('src/images/**/*')
		.pipe(cache(imagemin())) // Cache Images
		.pipe(dest('dist/images'));
};

function construct(done) {
	var buildFiles = src([
		'src/*.html'
	]).pipe(dest('dist'));

	var buildCss = src([
		'src/css/main.min.css',
	]).pipe(dest('dist/css'));

	var buildJs = src([
		'src/js/scripts.min.js',
	]).pipe(dest('dist/js'));

	var buildFonts = src([
		'src/fonts/**//*',
	]).pipe(dest('dist/fonts'));

	var buildIcons = src([
		'src/icons/**//*',
	]).pipe(dest('dist/icons'));

	var buildImg = src([
		'src/img/**//*',
	]).pipe(dest('dist/img'));

	done();
};

function removedist(done) {
	del.sync('dist');
	done();
};
function clearcache() {
	return cache.clearAll();
};

exports.watch = watchFunc;
exports.js = js;
exports.sassF = sassFunc;
exports.browser_sync = browser_sync;
exports.default = series(common_js, js, sassFunc, browser_sync, watchFunc);
exports.build = series(removedist, imageminFunc, sassFunc, common_js, js, construct);