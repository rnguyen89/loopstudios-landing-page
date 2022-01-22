'use strict';

// const { watch, series, src, dest } = require("gulp");
const { watch, series, src, dest } = require("gulp");


// const sass = require("gulp-sass");
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

const browserSync = require("browser-sync");

sass.compiler = require("node-sass")

function runSass() {
  return src("src/css/*")
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(
    cleanCSS({
      compatibility: 'ie8'
    })
  )
  .pipe(sourcemaps.write())
  .pipe(dest("dist/css"))
  .pipe(browserSync.stream())
}

function html() {
  return src("src/*.html")
  .pipe(dest("dist"))
}

function img() {
  return src("src/img/*", "src/img/desktop/*", "src/img/mobile/*")
  .pipe(dest("dist/img"))
}

function imgDesktop() {
  return src("src/img/desktop/*")
  .pipe(dest("dist/img/desktop"))
}

function imgMobile() {
  return src("src/img/mobile/*")
  .pipe(dest("dist/img/mobile"))
}

function watchSass() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })

  watch("src/*.html", html).on("change", browserSync.reload)
  watch("src/css/styles.scss", runSass)
  watch("src/img/*", img)
  watch("src/img/desktop/*", imgDesktop)
  watch("src/img/mobile/*", imgMobile)


}

exports.default = series(html, runSass, img, imgDesktop, imgMobile, watchSass)