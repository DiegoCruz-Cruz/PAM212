const productos = [
    { nombre: "Laptop", precio: 12000 },
    { nombre: "Mouse", precio: 250 },
    { nombre: "Teclado", precio: 750 },
    { nombre: "Monitor", precio: 3000 }
];

let filtrados = productos.filter(producto => producto.precio > 1000);
console.log("Los productos con precio mayor a 1000 son:");
console.log(filtrados);

let nuevoArreglo = filtrados.map( filtrado => filtrado.nombre);
console.log(nuevoArreglo);