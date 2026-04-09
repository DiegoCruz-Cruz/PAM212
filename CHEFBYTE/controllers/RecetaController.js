// controllers/RecetaController.js
import RecetaModel from "../models/RecetaModel";

export default class RecetaController {
  static async obtenerTodas() {
    return RecetaModel.all();
  }

  static async buscarPorId(id) {
    return RecetaModel.findById(id);
  }
}
