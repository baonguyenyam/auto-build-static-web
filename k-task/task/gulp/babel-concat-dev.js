'use strict';

import path from 'path';
import concat from 'gulp-concat';

module.exports = function (gulp, setgulp, plugins, config, target, browserSync) {
	let url = config;
	let dest = path.join(target);
	let destjs = path.join(target, url.scripts.assets);
	let arrayJSList = []

	arrayJSList.push(path.join(url.source, url.scripts.javascript, '**/*.js'))
	arrayJSList.push(path.join(url.src2, '**/index.js'))
	arrayJSList.push((setgulp.production || process.argv.slice(2).indexOf("builder") > -1) ? '!' + path.join(url.source, url.scripts.javascript, '**/canhcam-dev.js') : path.join())
	arrayJSList.push('!' + path.join(url.src2, '{**/\_*,**/\_*/**}'))

	// Run task
	gulp.task('babel-concat-dev', () => {
		return gulp.src(arrayJSList)
			.pipe(concat(url.concat.babelconcat + '.js'))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.babel())
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));
	});

};
