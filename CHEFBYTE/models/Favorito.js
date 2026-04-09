export default class Favorito {
  constructor(id = null, usuario_id = null, receta_id = null) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.receta_id = receta_id;
  }

  toJSON() {
    return {
      id: this.id,
      usuario_id: this.usuario_id,
      receta_id: this.receta_id
    };
  }
}
