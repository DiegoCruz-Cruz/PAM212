export default class Comentario {
  constructor(id = null, receta_id = null, usuario_id = null, texto = "") {
    this.id = id;
    this.receta_id = receta_id;
    this.usuario_id = usuario_id;
    this.texto = texto;
  }

  toJSON() {
    return {
      id: this.id,
      receta_id: this.receta_id,
      usuario_id: this.usuario_id,
      texto: this.texto
    };
  }
}
