import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

class DatabaseService {
  constructor() {
    this.db = null;
    this.storageKey = "usuarios";
  }

  async initialize() {
    if (Platform.OS === "web") {
      console.log("⚠ Usando LocalStorage (web)");
    } else {
      console.log("📌 Usando SQLite (móvil)");
      this.db = await SQLite.openDatabaseAsync("chefbyte.db");

      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          email TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          telefono TEXT,
          palabraSecreta TEXT,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
  }

  /** SELECT TODOS */
  async getUsuarios() {
    if (Platform.OS === "web") {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } else {
      const rows = await this.db.getAllAsync(
        "SELECT * FROM usuarios ORDER BY id DESC;"
      );
      return rows ?? [];
    }
  }

  /** INSERT */
  async addUsuario(nombre, email, password_hash, telefono, palabraSecreta) {
    if (Platform.OS === "web") {
      const usuarios = await this.getUsuarios();

      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email,
        password_hash,
        telefono,
        palabraSecreta,
        fecha_creacion: new Date().toISOString(),
      };

      usuarios.unshift(nuevoUsuario);
      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      return nuevoUsuario;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO usuarios (nombre, email, password_hash, telefono, palabraSecreta)
         VALUES (?, ?, ?, ?, ?);`,
        [nombre, email, password_hash, telefono, palabraSecreta]
      );

      return {
        id: result.lastInsertRowid,
        nombre,
        email,
        password_hash,
        telefono,
        palabraSecreta,
        fecha_creacion: new Date().toISOString(),
      };
    }
  }

  /** SELECT LOGIN */
  async login(email, password_hash) {
    if (Platform.OS === "web") {
      const usuarios = await this.getUsuarios();
      return usuarios.find(
        (u) => u.email === email && u.password_hash === password_hash
      );
    } else {
      const rows = await this.db.getAllAsync(
        `SELECT * FROM usuarios WHERE email = ? AND password_hash = ? LIMIT 1;`,
        [email, password_hash]
      );
      return rows?.[0] ?? null;
    }
  }
}

export default new DatabaseService();
