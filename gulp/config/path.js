//Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // Также ожно использовать rootFolder
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  }, // объект пути конечных файлов (результат)
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    sass: `${srcFolder}/sass/style.sass`,
    html: `${srcFolder}/*.pug`,
    files: `${srcFolder}/files/**/*.*`, //**/*.* означчает, что передаем абсолютно все папки и вложенные файлы с любым расширением
    svgicons: `${srcFolder}/svgicons/*.svg`,
  }, // объект пути к исходным файлам
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    sass: `${srcFolder}/sass/**/*.sass`,
    html: `${srcFolder}/**/*.pug`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    files: `${srcFolder}/files/**/*.*`,
  }, // объект файлов, за которыми GULP должен следить
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`,
};
