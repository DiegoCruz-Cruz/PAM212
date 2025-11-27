export class Usuario {
    constructor(id, nombre, fechaCreacion) {
        this.id = id;
        this.nombre = nombre
        this.fechaCreacion = fechaCreacion;
    }
    static validar(nombre) {
        if (!nombre || nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres');
        }
        if (nombre.length > 50) {
            throw new Error('El nombre no puede tener más de 50 caracteres');
        }
        return true;
    }
}