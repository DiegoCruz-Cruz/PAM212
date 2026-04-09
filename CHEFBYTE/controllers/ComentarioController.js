import DatabaseService from "../services/DatabaseService";

class ComentarioController {
  async agregarComentario(recetaId, usuarioId, texto) {
    try {
      const db = await DatabaseService.getConnection();

      if (!texto || texto.trim() === "") {
        return { ok: false, mensaje: "El comentario no puede estar vacío." };
      }

      await db.runAsync(
        `INSERT INTO comentarios (receta_id, usuario_id, texto)
         VALUES (?, ?, ?)`,
        [recetaId, usuarioId, texto]
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async obtenerPorReceta(recetaId) {
    try {
      const db = await DatabaseService.getConnection();

      return await db.allAsync(
        `SELECT c.*, u.nombre AS usuario_nombre
         FROM comentarios c
         LEFT JOIN usuarios u ON c.usuario_id = u.id
         WHERE c.receta_id = ?
         ORDER BY c.id DESC`,
        [recetaId]
      );
    } catch (error) {
      return [];
    }
  }
}

export default new ComentarioController();
