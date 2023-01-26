import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; //Сжатие CSS-файла
import webpcss from "gulp-webpcss"; //Вывод WEBP-изображений
import autoprefixer from "gulp-autoprefixer"; //Добавление вендорных префиксов (автоматическая кроссбраузерность)
import groupCssMediaQueries from "gulp-group-css-media-queries"; //Группировка медиа-запросов

const sassStyle = gulpSass(dartSass);

export const sass = () => {
  return app.gulp
    .src(app.path.src.sass, { sourcemaps: app.isDev }) //Стили прописаны во множестве файлов. Sourcemaps позволит увидеть, из какого именно файла взят тот или иной стиль
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SASS",
          message: "Error: <%= error.message%>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      sassStyle({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({
          webpClass: ".webp", //Если браузер поддерживает webp - будет выводиться webp
          noWebpClass: ".no-webp", //а если не поддерживается - то нет
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css)) //Закомментировать, если нужен только сжатый файл min.css (при выгрузке)
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css)) //Выгружаем в папку
    .pipe(app.plugins.browsersync.stream()); //Обновляем браузер
};
