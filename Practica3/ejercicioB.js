function verificarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    if (usuario === "admin") {
      resolve("Acceso concedido");
    } else {
      reject("Acceso denegado");
    }
  });
}

verificarUsuario("admin")
  .then(res => console.log(res))  // Acceso concedido
  .catch(err => console.error(err));

verificarUsuario("Diego")
  .then(res => console.log(res))
  .catch(err => console.error(err)); // Acceso denegado
