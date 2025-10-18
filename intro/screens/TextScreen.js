import React, { use, useState } from 'react';
import { View, Text, TextInput, Alert, Button, StyleSheet } from 'react-native';

export default function TextScreen() {
  
  const [nombre, setNombre] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [comentario, setComenttario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarDatos = () => {
    if(nombre.trim()  === '' || contrasenia.trim() === '' || comentario.trim() ==='') {
      Alert.alert('Error', 'Por favor, ingresa un nombre');
      alert('Error: Por favor, ingresa un nombre');
      setMensaje('Campo en blanco, por favor ingrese un nombre')
    } else {
      Alert.alert('¡Éxito!', 'Datos enviados correctamente');
      alert('¡Éxito! Datos enviados correctamente');
      setMensaje('Datos enviados correctamente ');
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Práctica para ingresar tu nombre usando TextInput y Alert </Text>
      
      {/* Input para el nombre*/}
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={nombre}
        onChangeText={setNombre}
        keyboardType='numeric'
      />

      <TextInput
        style={styles.input}
        placeholder="Escribe tu contrasenia"
        value={contrasenia}
        onChangeText={setContrasenia}
        secureTextEntry={true}
      />

      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top'}]}
        placeholder="Escribe un comentario"
        value={comentario}
        onChangeText={setComenttario}
        multiline={true}
        numberOfLines={4}
      />
      <Button title="Enviar" onPress={enviarDatos} />
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    gap:10
  },
  title:{
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    width:'80%',
    borderWidth:3,
    borderColor:'#741414ff',
    padding:12,
    borderRadius:9
  },
  mensaje:{
    marginTop:20,
    fontSize:18,
    color:'#ff8c21ff',
    textAlign:'center'
  }
});