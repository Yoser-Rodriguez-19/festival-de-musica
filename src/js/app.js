// lo primero que haremos es registrar un eventlistener para el documento 
// osea cuando este listo el documento vamos a ejecutar una funcion
// aqui vamos a poner las funciones que necesitemos en todo e DOM con JS
document.addEventListener('DOMContentLoaded', function() {
    scrollNav(); 

    navegacionFija(); //aqui estamos diciendole que aplique esta funcion en el documento completo y  luego la definimos
});

// definimos la funcion
function navegacionFija() {

    //seleccionamos el header que es toda la barra y le pasamos ese valor a la constante que estamos definiendo
    const barra = document.querySelector('.header');
    
    //se usa una api que se llama Intersection Observer que se divide en 2 partes:
    // Registrar el Intersection Observer
    // definimos una const con la api que lleva primero el new
    const Observer = new IntersectionObserver( function( entries ) { // entries nos va a dar la informacion de el elemento a observar
        // con la informacion en consola de isIntersecting: true o false, gracias a esta api podemos hacer lo siguiente
        if(entries[0].isIntersecting) {
           barra.classList.remove('fijo'); // le quitamos la clase de fijo para que siga igual
        } else {
            barra.classList.add('fijo'); // le colocamos la clase de fijo en donde le daremos estilos en el _header.scss
        }
        
        // console.log(entries[0]) // esto es para ver en consola la informacion de isIntersecting cuando esta visible y cuando no

    }); 


    // Y que elemento a observar
    Observer.observe(document.querySelector('.sobre-festival'))
}

// creamos la funcion que estamos definiendo con el nombre de scrollNav
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a') // seleccionamos todos los enlaces de la navegacion principal

    // tenemos que registrar un addeventlistener para darle una funcion a cada elemento pero no se puede llamar enlaces por que enlaces ya esta definido para 3 elementos y eventlistener solo selecciona a un solo elemento
    // entonces primero utilizamos en enlaces con un forEach para recorrer todos los elementos de el enlace y que me arroje uno por uno llamado cada uno como enlace
    enlaces.forEach( function( enlace ) { // asi tenemos acceso a cada uno de os enlaces 
        // entonces ahora si podemos atar el addeventlistener a cada enlace de la siguiente manera y asignarle una funcion a cada enlace al momento de hacer click
        enlace.addEventListener('click', function(e){ // le pasamos el evento que se pasa cuando tienes un addeventlistener
            e.preventDefault(); // con esto le quitamos la funcion que tiene por default para darle nosotros mismos la funcion que queremos

            // console.log(e.target.attributes.href.value); // para acceder al valor que queremos conseguir que es el id de cada enlace

            const seccion = document.querySelector(e.target.attributes.href.value) // definimos una constante para asignarle el valor de los id que estamos buscando en cada enlace

            // con esto se dirige al dar click en el enlace a la seccion que definimos con el id que corresponde
            seccion.scrollIntoView({
                behavior: 'smooth' // con behavior: 'smooth' es para darle mas lentitud al salto de pagina hacia la otra seccion al dar click en el enlace
            }); 
        })
    });
}

