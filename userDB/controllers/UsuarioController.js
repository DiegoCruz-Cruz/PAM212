import { Usuario } from '../models/usuario';
import DatabaseService from '../database/DatabaseService';

export class UsuarioController {
    constructor() {
        this.listeners = [];
    }

    async initialize() {
        await DatabaseService.initialize();
    }

    async obtenerUsuarios() {
        try {
            const data = await DatabaseService.getAll();
            return data.map(u => new Usuario(u.id, u.nombre, u.fecha_creacion));
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw new Error('No se pudieron cargar los usuarios');
        }
    }

    async crearUsuario(nombre){
        try {
            Usuario.validar(nombre);

            const nuevoUsuario = await DatabaseService.add(nombre.trim());

            this.notifyListeners();

            return new Usuario(
                nuevoUsuario.id,
                nuevoUsuario.nombre,
                nuevoUsuario.fecha_creacion
            );
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    //UPDATE
    async editarUsuario(id, nuevoNombre) {
        Usuario.validar(nuevoNombre);
        await DatabaseService.update(id, nuevoNombre.trim());
        this.notifyListeners();
    }

    //DELETE
    async eliminarUsuario(id) {
        await DatabaseService.delete(id);
        this.notifyListeners();
    }

    //Observadores
    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
}