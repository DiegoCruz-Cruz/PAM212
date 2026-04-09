export default class Reporte {
  constructor(id = null, usuario_id = null, asunto = "", detalle = "") {
    this.id = id;
    this.usuario_id = usuario_id;
    this.asunto = asunto;
    this.detalle = detalle;
  }

  toJSON() {
    return {
      id: this.id,
      usuario_id: this.usuario_id,
      asunto: this.asunto,
      detalle: this.detalle
    };
  }
}
