const { series, parallel, src, dest, watch } = require('gulp')
const browserSync = require('browser-sync')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const del = require('del')
const uglify = require('gulp-uglify')
const merge = require('merge-stream')
const server = browserSync.create()

let devMode = process.env.NODE_ENV !== 'production'

function cleanAll() {
  return del([
    './dist',
    './assets/css/*.css',
    './assets/js/bundle/*.js',
    './assets/js/vendor',
    './assets/scss/bootstrap',
    './assets/fonts/font-awesome'
  ])
}
function cleanCss() {
  return del([
    './dist/assets/css/*.css',
    './assets/css/*.css'
  ])
}

function cleanJs() {
  return del([
    './dist/assets/js/bundle/*.js',
    './assets/js/bundle/*.js'
  ])
}

function cleanVendor() {
  return del([
    './assets/js/vendor',
    './assets/scss/bootstrap',
    './assets/fonts/font-awesome'
  ])
}

async function installVendorJs() {
  return src([
    './node_modules/bootstrap/dist/js/*',
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js',
    './node_modules/popper.js/dist/umd/popper.*'
  ]).pipe(dest('./assets/js/vendor'))
}

async function installVendorScss() {
  return src(['./node_modules/bootstrap/scss/**/**/*'])
    .pipe(dest('./assets/scss/bootstrap'))
}

async function installVendorFonts() {
  return src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(dest('./assets/fonts/font-awesome'))

}

function compileScss() {
  return src(['./assets/scss/app.scss'])
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ basename: 'app' }))
    .pipe(dest('./assets/css'))
}

function compileJs() {
  return src(['./assets/js/src/*.js'])
    .pipe(
      webpack({
        mode: devMode ? 'development': 'production',
        externals: { jquery: 'jQuery' },
        output: { filename: 'app.js' }
      })
    )
    .pipe(dest('./assets/js/bundle'))
}

function reload(done) {
  server.reload()
  done()
}

function serve(done) {
  server.init({ server: { baseDir: './' } })
  done()
}


function watchFiles() {
  watch('./assets/scss/*.scss', series(compileScss, reload))
  watch('./assets/js/src/*.js', series(compileJs, reload))
}

function minifyCss() {
  return src('./assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./assets/css'))
}

function minifyJS() {
  return src(['./assets/js/src/*.js'])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./assets/js'))
}



function copyJs() {
  return src('./assets/js/bundle/*.js')
    .pipe(dest('./dist/assets/js/bundle'))
}

function copyCss() {
  return src('./assets/css/*.css')
    .pipe(dest('./dist/assets/css'))
}

function copyAssets() {
  return src(['*.html', 'favicon.ico', 'assets/img/**', 'assets/fonts/**'], { base: './' })
    .pipe(dest('dist'))
}

function buildVendor() {
  let jsStream = src([
    './assets/js/vendor/bootstrap.min.js',
    './assets/js/vendor/jquery.min.js',
    './assets/js/vendor/popper.min.js'
  ])
    .pipe(dest('./dist/assets/js/vendor'))

  let fontStream = src(['./assets/fonts/font-awesome/**/*.*'])
    .pipe(dest('./dist/assets/fonts/font-awesome'))

  let icaFontStream = src(['./assets/fonts/ica/**/*.*'])
    .pipe(dest('./dist/assets/fonts/ica'))

  return merge(jsStream, fontStream, icaFontStream)
}


const buildCss = series(cleanCss, compileScss, copyCss)
const buildJs = series(cleanJs, compileJs, copyJs)

exports.cleanAll = cleanAll
exports.cleanvendor = cleanVendor
exports.install = series(cleanVendor, installVendorFonts, installVendorScss, installVendorJs)

exports.compile = series(compileScss, compileJs)
exports.watch = series(serve, watchFiles)
exports.build = series(buildCss, buildJs, buildVendor, copyAssets)

exports.default = series(serve, watchFiles)
