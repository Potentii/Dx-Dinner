const gulp = require('gulp');
const del = require('del');



const PARCEL_WATCH_CACHE = '../output/parcel-watch-cache/**/*';
const PARCEL_WATCH       = '../output/parcel-watch/**/*';

const PARCEL_SERVE_CACHE = '../output/parcel-serve-cache/**/*';
const PARCEL_SERVE       = '../output/parcel-serve/**/*';

const PARCEL_BUILD       = '../output/parcel-build/**/*';



gulp.task('clear-output:watch-cache', function(){
	return del([ PARCEL_WATCH_CACHE ], { force: true });
});

gulp.task('clear-output:watch', function(){
	return del([ PARCEL_WATCH ], { force: true });
});


gulp.task('clear-output:serve-cache', function(){
	return del([ PARCEL_SERVE_CACHE ], { force: true });
});

gulp.task('clear-output:serve', function(){
	return del([ PARCEL_SERVE ], { force: true });
});


gulp.task('clear-output:build', function(){
	return del([ PARCEL_BUILD ], { force: true });
});



switch(process.env.GULP_COMMAND){
case 'CLEAR_WATCH_OUTPUT':
	gulp.task('clear-watch-output', gulp.parallel([ 'clear-output:watch-cache', 'clear-output:watch' ]));
	gulp.task('default', gulp.series([ 'clear-watch-output' ]));
	break;
case 'CLEAR_SERVE_OUTPUT':
	gulp.task('clear-serve-output', gulp.parallel([ 'clear-output:serve-cache', 'clear-output:serve' ]));
	gulp.task('default', gulp.series([ 'clear-serve-output' ]));
	break;
case 'CLEAR_BUILD_OUTPUT':
	gulp.task('clear-build-output', gulp.parallel([ 'clear-output:build' ]));
	gulp.task('default', gulp.series([ 'clear-build-output' ]));
	break;
default:
	throw new Error(`Invalid 'GULP_COMMAND' value`);
}

