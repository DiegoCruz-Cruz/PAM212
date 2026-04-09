import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { AppSettingsContext } from './AppSettingsContext';

export default function CommentsScreen() {
  const { darkMode, fontSize } = useContext(AppSettingsContext);
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');

  const submit = () => {
    if (!nombre.trim() || !comentario.trim()) {
      Alert.alert('Completa los campos', 'Nombre y comentario son requeridos.');
      return;
    }
    // Aquí podrías enviar el comentario a la BD o API
    Alert.alert('Gracias', 'Tu comentario se ha enviado');
    setNombre(''); setComentario('');
  };

  const theme = darkMode ? styles.dark : styles.light;
  const text = darkMode ? styles.textDark : styles.textLight;

  return (
    <View style={[styles.container, theme]}>
      <Text style={[styles.title, text, { fontSize: fontSize + 2 }]}>Enviar comentario</Text>

      <Text style={[text, { fontSize }]}>Nombre</Text>
      <TextInput style={[styles.input, theme]} value={nombre} onChangeText={setNombre} placeholder="Tu nombre" />

      <Text style={[text, { fontSize, marginTop: 10 }]}>Comentario</Text>
      <TextInput style={[styles.input, theme, { height: 100 }]} multiline value={comentario} onChangeText={setComentario} placeholder="Escribe tu comentario" />

      <View style={{ marginTop: 12 }}>
        <Button title="Enviar" onPress={submit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginTop: 6 },
  dark: { backgroundColor: '#121212', borderColor: '#333' },
  light: { backgroundColor: '#fff' },
  textDark: { color: '#fff' },
  textLight: { color: '#222' },
});
