import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { AppSettingsContext } from './AppSettingsContext';

export default function ReportarScreen() {
  const { darkMode, fontSize } = useContext(AppSettingsContext);
  const [causa, setCausa] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const enviar = () => {
    if (!causa.trim() || !descripcion.trim()) return Alert.alert('Campos','Completa los campos');
    Alert.alert('Enviado','Tu reporte ha sido enviado');
    setCausa(''); setDescripcion('');
  };

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, { fontSize: fontSize + 4 }]}>Reportar receta incorrecta</Text>
      <Text style={[{ fontSize }]}>Causa</Text>
      <TextInput style={[styles.input]} value={causa} onChangeText={setCausa} placeholder="Motivo" />
      <Text style={[{ fontSize, marginTop:10 }]}>Descripción</Text>
      <TextInput style={[styles.input, { height:100 }]} multiline value={descripcion} onChangeText={setDescripcion} placeholder="Detalles" />
      <View style={{ marginTop:12 }}><Button title="Enviar" onPress={enviar} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16 },
  title:{ fontWeight:'700', marginBottom:10 },
  input:{ borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:8, marginTop:6 },
  dark:{ backgroundColor:'#121212' }, light:{ backgroundColor:'#fff' }
});
