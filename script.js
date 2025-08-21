//Forma tradicional de definir funciones

function mostrarMensaje(){
    alert("Hola Dulceros Marplatenses")
}

mostrarMensaje()


function saludar(){
    console.log("Bienvenidos...¡Vamos a hacer y comer delicias!")
}
saludar();

console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.")


function pasostorta(pasos){
    console.log("Paso" + pasos)
}

pasostorta("1 Pienso tipos de bizcochuelos, rellenos, decoraciones");
pasostorta("2 Hago los bizcochuelos");
pasostorta("3 Hago los rellenos");
pasostorta("4 Ensamblo todo");
pasostorta("5 Decoro según pedido del cliente");

console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.")


// Array de tortas con su sabor y precio unitario 
let tortas = [
    { sabor: "vainilla", precio: 20000 },
    { sabor: "chocolate", precio: 22000 },
    { sabor: "ambos sabores-Mixta", precio: 21000 }
];

tortas.forEach(function(torta) {
    console.log("Torta de " + torta.sabor + " cuesta $" + torta.precio);
});

console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.")

// Función para calcular el valor según los sabores elegidos

function calcularPrecio(sabor, cantidad) {
  let precioBase = 0;
  if (sabor === "vainilla") precioBase = 20000;
  if (sabor === "chocolate") precioBase = 22000;
  if (sabor === "mixto") precioBase = 21000;

  return precioBase * cantidad;
}

console.log("El precio de 2 tortas de chocolate es $" + calcularPrecio("chocolate", 2));
console.log("El precio de 2 tortas de vainilla es $" + calcularPrecio("vainilla", 2));
console.log("El precio de 2 tortas Mixtas es $" + calcularPrecio("mixto", 2));

console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.")