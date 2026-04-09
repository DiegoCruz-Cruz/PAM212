import DatabaseService from "../services/DatabaseService";
import * as Crypto from "expo-crypto";

let usuarioActual = null;
let observers = [];

DatabaseService.initialize(); // Inicializar BD correctamente

export default {
  async login(email, password) {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const user = await DatabaseService.login(email, hash);

    if (user) {
      usuarioActual = user;
      notify("USUARIO_LOGIN", user);
      return user;
    }
    return null;
  },

  async registrar(nombre, email, password, palabraSecreta, telefono = null) {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const newUser = await DatabaseService.addUsuario(
      nombre,
      email,
      hash,
      telefono,
      palabraSecreta
    );

    usuarioActual = newUser;
    notify("USUARIO_LOGIN", newUser);
    return newUser;
  },

  getUsuarioActual() {
    return usuarioActual;
  },

  async updateUsuario(id, nombre, telefono) {
    await DatabaseService.updateUsuario(id, nombre, telefono);
    usuarioActual = { ...usuarioActual, nombre, telefono };
    notify("USUARIO_ACTUALIZADO", usuarioActual);
  },

  async logout() {
    usuarioActual = null;
    notify("USUARIO_LOGOUT");
  },

  subscribe(fn) {
    observers.push(fn);
  },

  unsubscribe(fn) {
    observers = observers.filter((o) => o !== fn);
  },
};

function notify(action, data) {
  observers.forEach((fn) => fn(action, data));
}
