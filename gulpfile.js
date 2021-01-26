// siempre para compilar se tiene que colocar en consola "gulp y el nombre de la tarea que se quiere compilar"
//series: compila por orden, dest: el destino a donde va lo compilado, watch: es compilar de manera automatica
const { series, src, dest, watch, parallel } = require ('gulp'); // descargar gulp
const sass = require('gulp-sass'); // descargar sass en gulp
const imagemin = require('gulp-imagemin'); // esto es para minificar imagenes
const notify = require('gulp-notify'); // esto es para que de notificaciones de tareas listas
const webp = require('gulp-webp'); // pasar las imagenes a formato webp
const concat = require('gulp-concat'); // esto es para concatenar diferentes archivos en un solo archivo
// const { postcss } = require('autoprefixer');

// UTILIDADES CSS

// const autoprefixer = require('autoprefixer');  // nos permite agregar prefijos aunque ya casi no se usa
// const postcss = require('gulp-postcss'); // esta erramienta nos va a agregar cierto procesamiento en nuestro css
// const cssnano = require('cssnano'); // esto es para minificar todo el codigo de css
// const sourcemaps = require('gulp-sourcemaps'); // esto es para asignarle ruta a cada elemento css desde a web y poder ubicarlo en el codigo inspecionando el elemento en la pagina


// ----------UTILIDADES JS-----------------
// optimizar nuestro codigo JS instalando  npm install --save-dev gulp-terser-js

const terser = require('gulp-terser-js');

//Funcion que compila SASS

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css(  ) {
    return src( paths.scss )
    // .pipe( sourcemaps.init() ) // para iniciar el sourcemaps osea el mapa
    .pipe( sass({
            outputStyle: 'expanded'
        }) ) // ejecuta la tarea de sass
        // .pipe( postcss([ autoprefixer(), cssnano() ]))
        // .pipe( sourcemaps.write('.')) // esto escribe el propio mapa en un archivo y asi logramos ubicar donde esta cada elemento de DOM
        .pipe( dest('./build/css') ) // o compila en el archivo de css
}

function minificarcss () {
    return src( paths.scss )
        .pipe( sass({  //.pipe es para ejecutar en gulp
            outputStyle: 'compressed' // outpuStyle es para cambiarle el estilo al archivo "compressed es para que todo el codigo css quede comprimido en una linea"
        }) )
        .pipe( dest('./build/css') ) //compila en el archivo css
}

function javascript() { // 
    return src(paths.js)
        .pipe(sourcemaps.init()) // iniciar el mapa
        .pipe( concat('bundle.js'))
        .pipe( terser() ) // minificar el codigo js
        .pipe(sourcemaps.write('.')) // llevar el mapa a un archivo
        .pipe( dest('./build/js'))
}

function imagenes() {  // esto es para minificar imagenes con la dependencia en consola de "npm install --save-dev gulp-imagemin"
    return src(paths.imagenes) // retorna hasta la carpete de imagenes y selecciona todas las imagenes
        .pipe( imagemin() )  // ejecuta la tarea de iamgenmin
        .pipe( dest('./build/img')) // y enviala a la carpena de img en build
        .pipe( notify({ message: 'Imagen Minificada' }));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() ) // para ejecutar la funcion de webp
        .pipe( dest('./build/img') )
        .pipe( notify({message: 'Veriòn webP lista'}));
}

function watchArchivos() { // whatch toma el archivo y que tarea queremos que aplique en ese archivo ( que archivos tiene que estar escuchando cambios)
    watch( paths.scss, css ); // cada vez que el archivo cambie se ejecuta la funcion de css que esta arriba
    watch( paths.js, javascript ) // cada vez que ell archivo de js cambie, se ejecuta la funcion de javascript
}// un * = La carpeta actual   // aunque ** = todos los archivos con esa extension 

exports.css = css;  // esto es para registrar o crear tareas nuevas
exports.minificarcss = minificarcss; // c
exports.imagenes = imagenes; // esto es para crear la tarea y mandarla a llamar
exports.watchArchivos = watchArchivos; // crear o registrar tareas nuevas


exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos )

// series empieza a ejecutar tareas por orden
// parallel empieza a ejecutar todas las tareas al tiempo

// lo ultimo para obtimizar mas el codigo css y que cada elemento le salgan sus rutas en la web para saber donde se encuentran y poderle hacer cambios
//hay que descargar lo siguiente en la consola: npm install --save-dev autoprefixer gulp-postcss gulp-sourcemaps cssnano postcss
// autoprefixer:
// gulps-postcss:
// gulp-sourcemaps:
// cssnano: