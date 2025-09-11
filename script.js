// Productos Disponibles en mi página Sin Culpa - falta agregar vasos 

const productos = [
  { id: 1, nombre: "Torta de Cumpleaños", precio: 80000 },
  { id: 2, nombre: "Cheesecake de Chocolate", precio: 65000 }
];

// Carrito de compras de las tortas y cheesecake 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// DOM : para que se vea el carrito que va armando el cliente

function mostrarCarrito() {
  const divCarrito = document.getElementById("carrito");
  divCarrito.innerHTML = "<h3> Tu pedido:</h3>";

  if (carrito.length === 0) {
    divCarrito.innerHTML += "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach((item, i) => {
    divCarrito.innerHTML += `
      <p>
        ${i + 1}. ${item.nombre} - $${item.precio.toLocaleString()}
        <button onclick="eliminarDelCarrito(${i})">❌ Eliminar</button>
      </p>
    `;
  });

  // Total con el cálculo de los productos seleccionados 

  let total = carrito.reduce((acc, item) => acc + item.precio, 0);
  divCarrito.innerHTML += `<h4>Total: $${total.toLocaleString()}</h4>`;
}

// Función para eliminar de a un solo producto

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1); // sacar el producto según el índice
  localStorage.setItem("carrito", JSON.stringify(carrito)); // actualizar storage, o sea lo almacenado hasta el momento
  mostrarCarrito(); // refrescar vista del cliente
}

// Función que muestra: agregar una torta o vaso al carrito

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Pasos para hacer una torta

function mostrarPasosTorta() {
  const pasos = [
    "El cliente selecciona tipos de bizcochuelos, rellenos y decoraciones con un mes de anticipación.",
    "Próximo a la fecha de entrega, hago los bizcochuelos.",
    "Preparo los rellenos.",
    "Ensamblo todo, siempre procurando que la misma sea húmeda y prolija.",
    "Decoro según pedido del cliente.",
    "Se entrega con el packaging correspondiente para que la torta llegue en perfecto estado.",
  ];

  const lista = document.getElementById("pasosTorta");
  lista.innerHTML = ""; // limpiar antes de cargar

  pasos.forEach((p, i) => {
    let li = document.createElement("li");
    li.textContent = `Paso ${i + 1}: ${p}`;
    lista.appendChild(li);
  });
}

// Formulario del cliente

function validarFormulario() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const errores = document.getElementById("errores");

  errores.innerHTML = "";

  if (!nombre || !email || !mensaje) {
    errores.innerHTML = "<p style='color:red;'>⚠️ Por favor, completá todos los campos.</p>";
    return false; // No envia, lo anula
  }

  return true; // El cliente si puede enviar
}


// Eventos al cargar la página, o sea las acciones del cliente (ej. clics, teclas que presionó, movimientos de mouse) - Ayuda memoria

document.addEventListener("DOMContentLoaded", () => {

  // Botones de compra
  
  const botonTorta = document.querySelector(".botoncomprartorta");
  const botonCheesecake = document.querySelector(".botoncomprarcheescake");

  if (botonTorta) {
    botonTorta.addEventListener("click", () => {
      agregarAlCarrito(productos[0]);
    });
  }

  if (botonCheesecake) {
    botonCheesecake.addEventListener("click", () => {
      agregarAlCarrito(productos[1]);
    });
  }

  // Mostrar el carrito al inicio

  mostrarCarrito();

  // Mostrar los pasos de la torta

  mostrarPasosTorta();

  // Validación del formulario
  const formulario = document.getElementById("form-contacto");
  if (formulario) {
    formulario.addEventListener("submit", (e) => {
      if (!validarFormulario()) {
        e.preventDefault(); // evita enviar si hay errores
      }
    });
  }
});