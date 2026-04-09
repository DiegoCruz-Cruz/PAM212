// controllers/ReporteController.js
export default class ReporteController {
  static async enviar({ usuario_id = null, asunto, detalle }) {
    try {
      console.log("Reporte enviado:", { usuario_id, asunto, detalle });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }
}
