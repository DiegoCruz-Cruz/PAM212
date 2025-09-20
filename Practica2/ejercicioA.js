const persona = {
    nombre: "Diego Francisco",
    edad: 18,
    direccion: {
        ciudad: "Qro",
        pais: "MX"
    }
};

const {nombre, edad, direccion: {ciudad, pais}} = persona;
    
console.log("Hola, me llamo "+ nombre + ", tengo " + edad + " años y vivo en " + ciudad);