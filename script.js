const productos = [ 
  { id: 1, nombre: "Torta de Cumpleaños", precio: 80000 },
  { id: 2, nombre: "Cheesecake de Chocolate", precio: 65000 },
  { id: 3, nombre: "Shots Clásicos", precio: 28000 },
  { id: 4, nombre: "Shots Seleccionados", precio: 32000 },
  { id: 5, nombre: "Vaso Kinder", precio: 14000 },
  { id: 6, nombre: "Vaso Café", precio: 12000 },
  { id: 7, nombre: "Vaso Frutilla", precio: 12000 },
  { id: 8, nombre: "Vaso Oreo", precio: 12000 },
  { id: 9, nombre: "Vaso Chocotorta", precio: 13000 }
];

// ----------------------------
// Estado del carrito
// ----------------------------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar en storage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Formatear números en Espanol
function fmt(n) {
  return n.toLocaleString("es-AR");
}

// Funciones del carrito

function agregarAlCarritoPorId(id) {
  const p = productos.find(x => x.id === Number(id));
  if (!p) return;

  const existe = carrito.find(i => i.id === p.id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ id: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1 });
  }

  guardarCarrito();
  renderCarrito();
}

function cambiarCantidad(id, delta) {
  const idx = carrito.findIndex(i => i.id === Number(id));
  if (idx === -1) return;

  carrito[idx].cantidad += delta;
  if (carrito[idx].cantidad <= 0) carrito.splice(idx, 1);

  guardarCarrito();
  renderCarrito();
}

function calcularTotal() {
  return carrito.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
}


// DOM

function renderCarrito() {
  const cont = document.getElementById("carrito");
  if (!cont) return;

  cont.innerHTML = "<h5>🛒 Tu pedido</h5>";

  if (carrito.length === 0) {
    cont.innerHTML += "<p>El carrito está vacío</p>";
    return;
  }

  const list = document.createElement("div");

  carrito.forEach(it => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div>
        <strong>${it.nombre}</strong><br/>
        <small>$${fmt(it.precio)} x ${it.cantidad} = $${fmt(it.precio * it.cantidad)}</small>
      </div>
      <div class="item-controls">
        <button data-action="minus" data-id="${it.id}">-</button>
        <button data-action="plus" data-id="${it.id}">+</button>
        <button data-action="remove" data-id="${it.id}">❌</button>
      </div>
    `;
    list.appendChild(div);
  });

  cont.appendChild(list);

  const totalDiv = document.createElement("div");
  totalDiv.className = "total";
  totalDiv.innerHTML = `<h4>Total: $${fmt(calcularTotal())}</h4>`;
  cont.appendChild(totalDiv);

  // Botón de vaciar carrito
  const limpiar = document.createElement("button");
  limpiar.textContent = "Vaciar carrito";
  limpiar.className = "btn btn-sm btn-outline-secondary mt-2";
  limpiar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
  });
  cont.appendChild(limpiar);
}


// Eventos - Acciones que hace el cliente (ayuda memoria)

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches(".btn-add")) {
    const id = target.dataset.id;
    agregarAlCarritoPorId(id);
  }

  if (target.dataset && target.dataset.action) {
    const action = target.dataset.action;
    const id = target.dataset.id;

    if (action === "plus") cambiarCantidad(id, +1);
    if (action === "minus") cambiarCantidad(id, -1);
    if (action === "remove") {
      carrito = carrito.filter(it => it.id !== Number(id));
      guardarCarrito();
      renderCarrito();
    }
  }
});


// Inicializar

document.addEventListener("DOMContentLoaded", renderCarrito);

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

document.addEventListener("DOMContentLoaded", () => {
  mostrarPasosTorta();
});

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