var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    fs = require('fs'),
    paths = {
        scriptsSource: './assets/_js/**/*.js',
        scriptsDestination: './assets/prod/js',
        stylesSource: ['./assets/_css/**/*.css','./assets/_sass/**/*.scss'], 
        stylesDestination: './assets/prod/css',
    };

gulp.task('wipe', function () {
    return gulp.src(['./css', './js'], {read: false})
        .pipe(clean());
});

gulp.task('srvJs', function () {
    return gulp.src(paths.scriptsSource)
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(paths.scriptsDestination));
});

gulp.task('srvCss', function () {
    return gulp.src(paths.stylesSource)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.min.css'))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.stylesDestination));
});

gulp.task('incrementServiceWorkerVersion', function () {
    var fileContent = fs.readFileSync("sw.js", "utf8");
    
    console.log('Read service worker file');

    var regex = /version = (\d*)/g;
    var result = regex.exec(fileContent);

    var temp = result[1];
    var previousVersionNumber = temp;
    var newVersionNumber = ++temp;

    var newVersionStatement = result[0].replace(previousVersionNumber, newVersionNumber);

    console.log('Replacing: ' + result[0] + ' with ' + newVersionStatement);

    fileContent = fileContent.replace(result[0], newVersionStatement);

    fs.writeFile('sw.js', fileContent, {flag: 'w'}, function(err) {
        
        if (err) 
            throw err;

        console.log('file saved');
    });
});

gulp.task('default', ['wipe', 'srvCss', 'srvJs', 'incrementServiceWorkerVersion']);

