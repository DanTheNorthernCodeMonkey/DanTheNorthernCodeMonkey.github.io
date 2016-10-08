var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    fs = require('fs'),
    paths = {
        scriptsSource: './_js/**/*.js',
        scriptsDestination: './js',
        stylesSource: ['./_css/**/*.css','./_scss/**/*.scss'], 
        stylesDestination: './css',
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
    var version = "version";
    var fileContent = fs.readFileSync("sw.js", "utf8");
    
    console.log('Read service worker file');

    var versionDeclarationIndex = fileContent.indexOf(version);
    var serviceWorkerVersonInteger = versionDeclarationIndex + version.length + 3
    var serviceWorkerVersionDeclaration = fileContent.substring(versionDeclarationIndex, serviceWorkerVersonInteger +1);

    console.log(serviceWorkerVersionDeclaration);

    var previousVersionNumber = fileContent.charAt(serviceWorkerVersonInteger)
    var newVersionNumber = previousVersionNumber;
    ++newVersionNumber;

    var previousVersionStatement = serviceWorkerVersionDeclaration;
    var newVersionStatment = serviceWorkerVersionDeclaration.replace(previousVersionNumber, newVersionNumber);

    console.log('version number found');
    console.log('Replacing: ' + serviceWorkerVersionDeclaration + ' with ' + newVersionStatment);

    fileContent = fileContent.replace(previousVersionStatement, newVersionStatment);
    console.log('Service worker version upgraded from: ' +  previousVersionNumber + ' to: ' + newVersionNumber);

   console.log(fileContent);

    fs.writeFile('sw.js', fileContent, {flag: 'w'}, function(err) {
        if (err) throw err;
        console.log('file saved');
    });
});

gulp.task('default', ['wipe', 'srvCss', 'srvJs', 'incrementServiceWorkerVersion']);

