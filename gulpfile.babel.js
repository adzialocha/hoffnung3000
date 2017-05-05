import autoprefixer from 'gulp-autoprefixer'
import babelify from 'babelify'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import cleancss from 'gulp-clean-css'
import del from 'del'
import eslint from 'gulp-eslint'
import fs from 'fs'
import gulp from 'gulp'
import handlebars from 'gulp-compile-handlebars'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import rename from 'gulp-rename'
import rev from 'gulp-rev'
import runIf from 'gulp-if'
import runSequence from 'run-sequence'
import sass from 'gulp-sass'
import sasslint from 'gulp-sass-lint'
import source from 'vinyl-source-stream'
import tap from 'gulp-tap'
import uglify from 'gulp-uglify'

const VENDOR_MODULES = [
  'classnames',
  'history',
  'keymirror',
  'path',
  'prop-types',
  'react',
  'react-addons-update',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-dom',
  'react-router-redux',
  'redux',
  'redux-logger',
  'redux-thunk',
]

const APP_PATH = './app'
const DIST_PATH = './public'
const TMP_PATH = './.tmp'

/**
 * Helper method for checking if build
 * is for a production environment
 */

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

/**
 * Helper methods for loading configuration files
 */

function readJsonSync(path) {
  return JSON.parse(
    fs.readFileSync(path, 'utf8')
  )
}

function getBabelConfiguration() {
  return readJsonSync('./.babelrc')
}

function getRevisioningManifest() {
  return readJsonSync(`${DIST_PATH}/rev-manifest.json`)
}

/**
 * We need these Handlebar Options to utilize our own
 * methods for static asset revisioning replacement in
 * .html files
 */

const handlebarOptions = {
  helpers: {
    assets: (path, context) => {
      return context.data.root[path]
    },
  },
}

const handlebarOptionsDevelopment = {
  helpers: {
    assets: (path) => {
      return path
    },
  },
}

/**
 * Cleanup tasks to delete the temporary
 * or production build folder
 */

gulp.task('clean:tmp', () => {
  return del.sync([
    `${TMP_PATH}/**`,
  ])
})

gulp.task('clean:dist', () => {
  return del.sync([
    `${DIST_PATH}/**`,
  ])
})

gulp.task('clean:rev', () => {
  return del.sync([
    `${DIST_PATH}/rev-manifest.json`,
  ])
})

gulp.task('clean', [
  'clean:tmp',
  'clean:dist',
])

/**
 * A collection of tasks for preparing, minifing,
 * bundling different kinds of assets for our app
 */

gulp.task('assets:styles', (done) => {
  gulp.src(`${APP_PATH}/styles/app.scss`)
    .pipe(sass({
      errLogToConsole: true,
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
    }))
    .pipe(runIf(isProduction(), cleancss()))
    .pipe(gulp.dest(`${TMP_PATH}/styles/`))
    .on('end', done)
})

gulp.task('assets:scripts:app', (done) => {
  gulp.src(`${APP_PATH}/scripts/index.js`, { read: false })
    .pipe(tap((file) => {
      file.contents = browserify(
        file.path, {
          debug: !isProduction(),
          bundleExternal: false,
        })
        .transform(babelify.configure(getBabelConfiguration()))
        .bundle()
    }))
    .pipe(buffer())
    .pipe(runIf(isProduction(), uglify({
      enclose: true,
    })))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(`${TMP_PATH}/scripts/`))
    .on('end', done)
})

gulp.task('assets:scripts:vendor', (done) => {
  const dependencies = browserify()

  VENDOR_MODULES.forEach(lib => {
    dependencies.require(lib)
  })

  dependencies.bundle()
    .pipe(source('lib.js'))
    .pipe(buffer())
    .pipe(runIf(isProduction(), uglify({
      enclose: true,
    })))
    .pipe(gulp.dest(`${TMP_PATH}/scripts/`))
    .on('end', done)
})

gulp.task('assets:scripts', (done) => {
  runSequence(
    'assets:scripts:app',
    'assets:scripts:vendor',
    done
  )
})

gulp.task('assets:images', (done) => {
  gulp.src(`${APP_PATH}/images/**/*.{png,jpg,svg,gif,ico}`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${TMP_PATH}/images/`))
    .on('end', done)
})

gulp.task('assets:fonts', (done) => {
  gulp.src(`${APP_PATH}/fonts/**/*`)
    .pipe(gulp.dest(`${TMP_PATH}/fonts/`))
    .on('end', done)
})

gulp.task('assets:html', (done) => {
  gulp.src(`${APP_PATH}/index.html`)
    .pipe(handlebars({}, handlebarOptionsDevelopment))
    .pipe(gulp.dest(TMP_PATH))
    .on('end', done)
})

gulp.task('assets:manifest', (done) => {
  gulp.src(`${APP_PATH}/manifest.json`)
    .pipe(gulp.dest(TMP_PATH))
    .on('end', done)
})

gulp.task('assets', (done) => {
  runSequence(
    'assets:styles',
    'assets:fonts',
    'assets:scripts',
    'assets:images',
    'assets:html',
    'assets:manifest',
    done
  )
})

/**
 * Check against style violations
 */

gulp.task('lint:js', (done) => {
  gulp.src(['./gulpfile.babel.js', `${APP_PATH}/scripts/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .on('end', done)
})

gulp.task('lint:scss', (done) => {
  gulp.src(`${APP_PATH}/styles/**/*.scss`)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .on('end', done)
})

gulp.task('lint', [
  'lint:js',
  'lint:scss',
])

/**
 * Build the app for production
 */

gulp.task('build:rev:pre', (done) => {
  // copy all files without revisioning into dist folder
  gulp.src([`${TMP_PATH}/**/*`, `!${TMP_PATH}/**/{app,lib}.{js,css}`])
    .pipe(gulp.dest(DIST_PATH))
    .on('end', done)
})

gulp.task('build:rev', (done) => {
  // copy assets with revisioning and build a version manifest
  gulp.src(`${TMP_PATH}/**/{app,lib}.{js,css}`)
    .pipe(rev())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(rev.manifest())
    .pipe(gulp.dest(DIST_PATH))
    .on('end', done)
})

gulp.task('build:rev:post', (done) => {
  // read the asset name version manifest
  const manifest = getRevisioningManifest()

  // replace asset file names via handlebars in .html files
  gulp.src(`${APP_PATH}/*.html`)
    .pipe(handlebars(manifest, handlebarOptions))
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    }))
    .pipe(gulp.dest(DIST_PATH))
    .on('end', done)
})

gulp.task('build', (done) => {
  if (!isProduction()) {
    console.info('Ignore build task when NODE_ENV is not set to production') // eslint-disable-line no-console
    return done()
  }

  return runSequence(
    'clean',
    'assets',
    'build:rev:pre',
    'build:rev',
    'build:rev:post',
    'clean:rev',
    done
  )
})

/**
 * Main tasks for development and deployment
 */

gulp.task('watch', ['clean:tmp', 'assets'], () => {
  gulp.watch(`${APP_PATH}/styles/**/*.scss`, ['assets:styles', 'lint:scss'])
  gulp.watch(`${APP_PATH}/scripts/**/*.js`, ['assets:scripts:app', 'lint:js'])
  gulp.watch(`${APP_PATH}/images/**/*`, ['assets:images'])
  gulp.watch(`${APP_PATH}/fonts/**/*`, ['assets:fonts'])
  gulp.watch(`${APP_PATH}/index.html`, ['assets:html'])
  gulp.watch(`${APP_PATH}/manifest.json`, ['assets:manifest'])
})

gulp.task('default', ['build'])
