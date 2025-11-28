import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator, Platform, Modal } from 'react-native';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function InsertUsuarioScreen() {

  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [editVisible, setEditVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState('');

  const cargarUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await controller.obtenerUsuarios();
      setUsuarios(data);
      console.log(`${data.length} Usuarios cargados`);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await controller.initialize();
      await cargarUsuarios();
    };

    init();

    controller.addListener(cargarUsuarios);

    return () => {
      controller.removeListener(cargarUsuarios);
    };
  }, [cargarUsuarios]);

  const handleAgregar = async () => {
    if (guardando) return;
    try {
      setGuardando(true);
      const usuarioCreado = await controller.crearUsuario(nombre);
      Alert.alert('Usuario Creado', `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`);
      setNombre('');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setGuardando(false);
    }
  };

  const abrirEditar = (usuario) => {
    setEditId(usuario.id);
    setEditNombre(usuario.nombre);
    setEditVisible(true);
  };

  const guardarEdicion = async () => {
    if (!editNombre.trim()) {
      Alert.alert("Error", "El nombre no puede estar vacío");
      return;
    }

    try {
      await controller.editarUsuario(editId, editNombre.trim());
      setEditVisible(false);
      Alert.alert("Listo", "Usuario actualizado");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const eliminar = async (id) => {
    Alert.alert(
      "Eliminar Usuario",
      "¿Seguro que deseas eliminarlo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await controller.eliminarUsuario(id);
              Alert.alert("Eliminado", "Usuario borrado.");
            } catch (err) {
              Alert.alert("Error", err.message);
            }
          }
        }
      ]
    );
  };

  const renderUsuario = ({ item, index }) => (
    <View style={styles.userItem}>
      <View style={styles.userNumber}>
        <Text style={styles.userNumberText}>{index + 1}</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nombre}</Text>
        <Text style={styles.userId}>ID: {item.id}</Text>
        <Text style={styles.userDate}>
          {new Date(item.fechaCreacion).toLocaleDateString('es-MX')}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => abrirEditar(item)}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => eliminar(item.id)}
        >
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Modal visible={editVisible} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}>

          <View style={{
            backgroundColor: 'white',
            width: '100%',
            padding: 20,
            borderRadius: 10
          }}>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Editar Usuario
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nuevo nombre"
              value={editNombre}
              onChangeText={setEditNombre}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setEditVisible(false)}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: '#555' }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={guardarEdicion}
                style={{ backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 6 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Guardar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <Text style={styles.title}> INSERT & SELECT</Text>
      <Text style={styles.subtitle}>
        {Platform.OS === 'web' ? ' WEB (LocalStorage)' : ` ${Platform.OS.toUpperCase()} (SQLite)`}
      </Text>

      <View style={styles.insertSection}>
        <Text style={styles.sectionTitle}> Insertar Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
          editable={!guardando}
        />

        <TouchableOpacity
          style={[styles.button, guardando && styles.buttonDisabled]}
          onPress={handleAgregar}
          disabled={guardando} >

          <Text style={styles.buttonText}>
            {guardando ? ' Guardando...' : 'Agregar Usuario'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.selectSection}>

        <View style={styles.selectHeader}>
          <Text style={styles.sectionTitle}>Lista de Usuarios</Text>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={cargarUsuarios} >
            <Text style={styles.refreshText}>Recargar</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Cargando usuarios...</Text>
          </View>
        ) : (
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUsuario}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}> No hay usuarios</Text>
                <Text style={styles.emptySubtext}>Agrega el primero arriba</Text>
              </View>
            }
            contentContainerStyle={usuarios.length === 0 && styles.emptyList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  insertSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButton: {
    padding: 8,
  },
  refreshText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  userItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  userNumber: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userId: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 2,
  },
  userDate: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
  editButton: {
    backgroundColor: '#FFB300',
    padding: 8,
    borderRadius: 6,
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    padding: 8,
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
