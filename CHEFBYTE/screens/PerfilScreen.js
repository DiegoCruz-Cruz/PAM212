// PerfilScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import UsuarioController from '../controllers/UsuarioController';
import { AppSettingsContext } from './AppSettingsContext';
import { Feather } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const { darkMode, fontSize } = useContext(AppSettingsContext);

  useEffect(() => {
    const u = UsuarioController.getUsuarioActual ? UsuarioController.getUsuarioActual() : null;
    setUsuario(u);

    const obs = (action, data) => {
      if (action === 'USUARIO_LOGIN' || action === 'USUARIO_ACTUALIZADO') setUsuario(data);
      if (action === 'USUARIO_LOGOUT') setUsuario(null);
    };
    if (UsuarioController.subscribe) UsuarioController.subscribe(obs);
    return () => { if (UsuarioController.unsubscribe) UsuarioController.unsubscribe(obs); };
  }, []);

  const handleLogout = () => {
    if (UsuarioController.logout) UsuarioController.logout();
    Alert.alert('Sesión', 'Has cerrado sesión');
    navigation.replace('InicioSesion');
  };

  const opciones = [
    { label: 'Historial', icon: 'clock', action: () => navigation.navigate('Historial') },
    { label: 'Ajustes', icon: 'settings', action: () => navigation.navigate('Settings') },
  ];

  return (
    <ScrollView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Tabs')}>
          <Feather name="arrow-left" size={24} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { fontSize: fontSize + 4 }]}>Perfil</Text>
      </View>

      {usuario ? (
        <View style={styles.userInfo}>
          <Text style={[styles.name, { fontSize: fontSize + 2 }]}>{usuario.nombre || usuario.name}</Text>
          <Text style={[styles.email, { fontSize }]}>{usuario.correo || usuario.email}</Text>
          <Text style={[styles.phone, { fontSize }]}>{usuario.telefono || '-'}</Text>
        </View>
      ) : (
        <View style={styles.userInfo}>
          <Text style={{ marginBottom: 10 }}>No hay usuario conectado</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('InicioSesion')}>
            <Text style={{ color:'#fff', fontWeight:'700' }}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.optionsContainer}>
        {opciones.map((opt, index) => (
          <TouchableOpacity key={index} style={[styles.optionCard, darkMode ? styles.cardDark : styles.cardLight]} onPress={opt.action}>
            <Feather name={opt.icon} size={22} color={darkMode ? '#fff' : '#333'} />
            <Text style={[styles.optionText, { fontSize }]}>{opt.label}</Text>
            <Feather name="chevron-right" size={22} color={darkMode ? '#fff' : '#333'} />
          </TouchableOpacity>
        ))}
      </View>

      {usuario && (
        <TouchableOpacity style={[styles.logoutBtn]} onPress={handleLogout}>
          <Text style={{ color:'#fff', fontWeight:'700' }}>Cerrar sesión</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dark: { backgroundColor: '#121212' },
  light: { backgroundColor: '#f9f9f9' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },

  title: { fontWeight: '700', flex: 1, textAlign: 'center' },

  userInfo: { alignItems: 'center', marginVertical: 20 },
  name: { fontWeight: '700', marginBottom: 4, color: '#0A4825' },
  email: { marginBottom: 2, color: '#555' },
  phone: { marginBottom: 8, color: '#555' },

  loginBtn: { backgroundColor: '#0A4825', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 12 },

  optionsContainer: { marginTop: 20, paddingHorizontal: 16 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardLight: { backgroundColor: '#fff' },
  cardDark: { backgroundColor: '#1E1E1E' },
  optionText: { fontWeight: '600', flex: 1, marginLeft: 12 },

  logoutBtn: { backgroundColor: '#d9534f', margin: 20, padding: 14, borderRadius: 12, alignItems: 'center' },
});
