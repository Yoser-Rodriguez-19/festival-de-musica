
// document.addEventListener para tener el documento listo completo
document.addEventListener('DOMContentLoaded', function() {
    crearGaleria() // aqui se manda a llamar la funcion
})


// aqui se define la funcion

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes'); // aqui seleccionamos la clase en el documento que queremos agregarle la funcion

    // for es para crear una funcion inteligente de manera cilica
    for( i = 1; i <= 12; i++  ) {

        // primero genero la imagen por imagen
        const imagen = document.createElement('IMG') // esto es para crear cada imagen
        imagen.src = `build/img/thumb/${i}.webp`;  // esto es para agregar la imagen segun el src que tenga y usamos el build por que es donde contiene las imagenes que estan obtimisadas
        imagen.dataset.imagenId = i; // esto es para agregarle un atributo nuevo y personalisados a cada imagen

        // Añadir la funcion de mostrarImagen
        imagen.onclick = mostrarImagen;


        // luego genero el LI para mostrar las imagenes
        const lista = document.createElement('LI') // creamos el elemento LI en el documento llamando lista
        lista.appendChild(imagen); //agregamos la imagen a cada LI

        // agrego la lista en galeria y se muestra en pantalla
        galeria.appendChild(lista);
    }
    // inicia en la imagen 1, hasta la imagen 12, y ve incrementando en 1
}

// para al dar click mostrar la imagen mas grande

function mostrarImagen(e) {
    // el tipeof es para ver que tipo es, si es string o numero
    // console.log( typeof e.target.dataset.imagenId);
    // como es un string se convierte en numero con un parseIn que es una funcion que nos permite convertir un string a un numero siempre y cuando tenga la estructura de un numero
    // target es para que me muestre el elemento que le doy click y dataset es para leer el atributo que le estamos dando a cada imagen y saber a que imagen le estamos dando click, y le colocamos imagenId es para ser mas especificos y ver solo el valor que se le esta dando a cada imagen
    const id = parseInt( e.target.dataset.imagenId );
    // console.log(id); // al verlo en consola veremos en color azul donde sabemos que ya es un numero.

    // creamos una constante llamada imagen tambien ya que estamos en funciones diferentes.
    const imagen = document.createElement('IMG'); // creamos la imagen
    imagen.src = `build/img/grande/${id}.webp`;  // esto es para agregar la imagen segun el src pero con la diferencia que estas son las imagenes grandes y seria el id de la imagen que le estamos asignando


    // overlay es un nombre que se le da para notar que va delante de lo demas
    const overlay = document.createElement('DIV'); // creamos el DIV
    overlay.appendChild(imagen); // le agregamos la imagen al div
    overlay.classList.add('overlay'); // esto es para agregarle una clase y darle estilos CSS

    // cuando se da click por fuera de la imagen tambien cerrarla
    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    // boton para cerrar la imagen
    const cerrarImagen = document.createElement('P'); // creamos el elemento
    cerrarImagen.textContent = 'X'; // le damos el vamos de X
    cerrarImagen.classList.add('btn-cerrar'); // le creamos la clase para darle estilos

    // cuando se preciona el boton de X para cerrar la imagen
    cerrarImagen.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrarImagen); // se lo agregamos al overlay para que se vea solo cuando este la imagen grande

    
    // Mostrar en el HTML
    const body = document.querySelector('body'); // selecciono todo el body ya que la imagen estara delante de todo y practicamente cubre todo e body
    body.appendChild(overlay); // appendChild es una forma en la que se agrega las variables o tu codigo de JS dentro de tu codigo HTMLS
    // hacer que cuando este la imagen grande "overlay" que no se pueda dar scroll
    body.classList.add('fijar-body');
}