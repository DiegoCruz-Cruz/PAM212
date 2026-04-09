// models/RecetaModel.js
import DatabaseService from "../services/DatabaseService";

export default class RecetaModel {
  static async all() {
    const db = await DatabaseService.getConnection();
    return db.allAsync(`SELECT * FROM recetas ORDER BY created_at DESC`);
  }

  static async findById(id) {
    const db = await DatabaseService.getConnection();
    const result = await db.allAsync(`SELECT * FROM recetas WHERE id = ?`, [id]);
    return result[0] || null;
  }
}
