const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const sourceMaps = require("gulp-sourcemaps");

const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

const webpack = require("webpack-stream");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");

gulp.task("clean:dev", function (done) {
  if (fs.existsSync("./build/")) {
    return gulp.src("./build/", { read: false }).pipe(clean({ force: true }));
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

gulp.task("html:dev", function () {
  return gulp
    .src(["./src/html/**/*.html", "!./src/html/blocks/**/*.html"])
    .pipe(changed("./build/", { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify("HTML")))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(gulp.dest("./build"));
});

gulp.task("sass:dev", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(changed("./build/css/"))
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
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
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("images:dev", function () {
  return (
    gulp
      .src("./src/img/**/*", { encoding: false })
      .pipe(changed("./build/img/"))
      //.pipe(imagemin({ verbose: true }))
      .pipe(gulp.dest("./build/img/"))
  );
});

gulp.task("custom:dev", function () {
  return gulp
    .src("./src/custom/**/*", { encoding: false })
    .pipe(gulp.dest("./build/custom/"));
});

gulp.task("fonts:dev", function () {
  return gulp
    .src("./src/fonts/**/*", { encoding: false })
    .pipe(changed("./build/fonts/"))
    .pipe(gulp.dest("./build/fonts/"));
});

gulp.task("js:dev", function () {
  return (
    gulp
      .src("./src/js/*.js")
      .pipe(changed("./build/js/"))
      .pipe(plumber(plumberNotify("JS")))
      //.pipe(babel())
      .pipe(webpack(require("./../webpack.config.js")))
      .pipe(gulp.dest("./build/js/"))
  );
});

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task("server:dev", function () {
  return gulp.src("./build/").pipe(server(serverOptions));
});

gulp.task("watch:dev", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass:dev"));
  gulp.watch("./src/html/**/*.*", gulp.parallel("html:dev"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev"));
  gulp.watch("./src/img/**/*", gulp.parallel("images:dev"));
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts:dev"));
  gulp.watch("./src/custom/**/*", gulp.parallel("custom:dev"));
});
