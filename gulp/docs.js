const gulp = require("gulp");

//HTML
const fileInclude = require("gulp-file-include");
const htmlclean = require("gulp-htmlclean");
const webpHTML = require("gulp-webp-html");

//SASS
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const csso = require("gulp-csso");
const webpCss = require("gulp-webp-css");
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const sourceMaps = require("gulp-sourcemaps");
const groupMedia = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

const webpack = require("webpack-stream");
const babel = require("gulp-babel");

//Images
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const webp = require("gulp-webp");

gulp.task("clean:docs", function (done) {
  if (fs.existsSync("./docs/")) {
    return gulp.src("./docs/", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSetting = {
  prefix: "@@",
  basepath: "@file",
};

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

gulp.task("html:docs", function () {
  return gulp
    .src(["./src/html/**/*.html", "!./src/html/blocks/**/*.html"])
    .pipe(changed("./docs/"))
    .pipe(plumber(plumberNotify("HTML")))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(webpHTML())
    .pipe(htmlclean())
    .pipe(gulp.dest("./docs"));
});

gulp.task("sass:docs", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(changed("./docs/scss/"))
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(groupMedia())
    .pipe(
      sass({
        silenceDeprecations: [
          "legacy-js-api",
          "mixed-decls",
          "color-functions",
          "global-builtin",
          "import",
        ],
      })
    )
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./docs/css"));
});

gulp.task("images:docs", function () {
  return gulp
    .src("./src/img/**/*", { encoding: false })
    .pipe(changed("./docs/img/"))
    .pipe(webp())
    .pipe(gulp.dest("./docs/img/"))
    .pipe(gulp.src("./src/img/**/*", { encoding: false }))
    .pipe(changed("./docs/img/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./docs/img/"));
});

gulp.task("custom:docs", function () {
  return gulp
    .src("./src/custom/**/*", { encoding: false })
    .pipe(gulp.dest("./docs/custom/"));
});

gulp.task("fonts:docs", function () {
  return gulp
    .src("./src/fonts/**/*", { encoding: false })
    .pipe(gulp.dest("./docs/fonts/"));
});

gulp.task("js:docs", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("./docs/js/"))
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel())
    .pipe(webpack(require("./../webpack.config.js")))
    .pipe(gulp.dest("./docs/js"));
});

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task("server:docs", function () {
  return gulp.src("./docs/").pipe(server(serverOptions));
});
