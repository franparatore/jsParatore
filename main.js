document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Disyuntor',
            precio: 25000,
            imagen: '../img/disyuntor.jpg'
        },
        {
            id: 2,
            nombre: 'Termica',
            precio: 1200,
            imagen: '../img/termica.jpg'
        },
        {
            id: 3,
            nombre: 'Toma',
            precio: 300,
            imagen: '../img/tomacorriente.jpg'
        },
        {
            id: 4,
            nombre: 'Lampara',
            precio: 2300,
            imagen: '../img/lampara.jpg'
        },
        {
            id: 5,
            nombre: 'Tablero',
            precio: 5000,
            imagen: '../img/tablero.jpg'
        },
        {
            id: 6,
            nombre: 'Bandeja',
            precio: 850,
            imagen: '../img/bandeja.jpg'
        },
        {
            id: 7,
            nombre: 'Cablecanal x 1,5mt',
            precio: 320,
            imagen: '../img/cablecanal.jpg'
        },
        {
            id: 8,
            nombre: 'Pelacables',
            precio: 1800,
            imagen: '../img/pelacables.jpg'
        },
        {
            id: 9,
            nombre: 'Temporizador',
            precio: 3800,
            imagen: '../img/temporizador.jpg'
        }

    ];

    let carrito = [];
    const moneda = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Funciones

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${moneda}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertar
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    //

    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    //

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });

            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);

            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${moneda}`;
            
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
       
       DOMtotal.textContent = calcularTotal();
    }

    //

    function borrarItemCarrito(evento) {
        
        const id = evento.target.dataset.item;
        
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        
        renderizarCarrito();
    }

    //

    function calcularTotal() {
         
        return carrito.reduce((total, item) => {
            
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
    
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    //

    function vaciarCarrito() {
        
        carrito = [];
        
        renderizarCarrito();
    }

    
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderizarProductos();
    renderizarCarrito();
  });