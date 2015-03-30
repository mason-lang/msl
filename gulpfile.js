'use strict'

require('source-map-support').install()
const
	babel = require('gulp-babel'),
	header = require('gulp-header'),
	gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

gulp.task('default', [ 'watch' ])

gulp.task('run', function() {
	const test = require('./js/meta/test')
	_ms.getModule(test)
})

// TODO: Run-all-tests does not work yet. Need to figure out how to do reflection on requirejs modules.
gulp.task('run-requirejs', function() {
	const requirejs = require('requirejs')
	requirejs.config({
		baseUrl: 'js',
		nodeRequire: require
	})
	const test = requirejs('meta/test')
	_ms.getModule(test)
})

const src_ms = 'src/**/*.ms',  src_js = 'src/**/*.js'
const dest = 'js'

function pipeMs(stream) {
	// This can only be required after we've created it, so 'ms' task depends on 'js'.
	const ms = require('./js/meta/compile/gulp-ms')
	return stream
	.pipe(sourcemaps.init())
	.pipe(ms())
	.pipe(sourcemaps.write('.', {
		debug: true,
		includeContent: false,
		sourceRoot: './src'
	}))
	.pipe(gulp.dest(dest))
}

function pipeJs(stream) {
	return stream
	.pipe(sourcemaps.init())
	.pipe(babel({
		modules: 'amd',
		whitelist: [
			'es6.arrowFunctions',
			'es6.classes',
			'es6.destructuring',
			'es6.modules',
			'es6.parameters.rest',
			'es6.spread',
			'es6.properties.shorthand',
			'es6.templateLiterals',
			'strict'
		]
	}))
	.pipe(header("if (typeof define !== 'function') { var define = require('amdefine')(module) }"))
	.pipe(sourcemaps.write('.', {
		debug: true,
		sourceRoot: '/src'
	}))
	.pipe(gulp.dest(dest))
}

gulp.task('js', function() {
	return pipeJs(gulp.src(src_js))
})

gulp.task('ms', [ 'js' ], function() {
	return pipeMs(gulp.src(src_ms))
})

gulp.task('watch-js', function() {
	pipeJs(gulp.src(src_js).pipe(watch(src_js)))
})

gulp.task('watch', function() {
	pipeMs(gulp.src(src_ms).pipe(watch(src_ms)))
	pipeJs(gulp.src(src_js).pipe(watch(src_js)))
})

gulp.task('lint', function() {
	// For some reason, requiring this makes es6-shim unhappy.
	// So, can't lint and do other things in the same task.
	const eslint = require('gulp-eslint')
	return gulp.src(src_js)
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failOnError())
})