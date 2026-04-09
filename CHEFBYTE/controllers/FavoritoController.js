import DatabaseService from "../services/DatabaseService";

class FavoritoController {
  async marcar(usuarioId, recetaId) {
    try {
      const db = await DatabaseService.getConnection();

      // Evita duplicados
      const existe = await db.getAsync(
        `SELECT * FROM favoritos WHERE usuario_id = ? AND receta_id = ?`,
        [usuarioId, recetaId]
      );

      if (existe) {
        return { ok: false, mensaje: "La receta ya está en favoritos." };
      }

      await db.runAsync(
        `INSERT INTO favoritos (usuario_id, receta_id)
         VALUES (?, ?)`,
        [usuarioId, recetaId]
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async obtenerFavoritos(usuarioId) {
    try {
      const db = await DatabaseService.getConnection();

      return await db.allAsync(
        `SELECT recetas.*
         FROM recetas
         INNER JOIN favoritos ON recetas.id = favoritos.receta_id
         WHERE favoritos.usuario_id = ?`,
        [usuarioId]
      );
    } catch (error) {
      return [];
    }
  }

  async eliminar(usuarioId, recetaId) {
    try {
      const db = await DatabaseService.getConnection();

      await db.runAsync(
        `DELETE FROM favoritos WHERE usuario_id = ? AND receta_id = ?`,
        [usuarioId, recetaId]
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

export default new FavoritoController();
