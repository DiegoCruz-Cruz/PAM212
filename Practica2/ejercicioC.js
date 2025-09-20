const personas = [
    { nombre: "Ana", edad: 22 },
    { nombre: "Luis", edad: 35 },
    { nombre: "María", edad: 28}
]

let personaLuis = personas.find(persona => persona.nombre == "Luis");
console.log(personaLuis);

personas.forEach(function(persona){
    console.log(persona.nombre, persona.edad);
});

let sumaEdades = personas.reduce((sumaTotal, persona) => sumaTotal + persona.edad, 0);
console.log(sumaEdades);