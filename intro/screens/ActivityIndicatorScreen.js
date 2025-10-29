import React, { useState } from 'react'
import { Text, StyleSheet, View, Button, ActivityIndicator } from 'react-native'


export default function ActivityIndicatorScreen() {
  const [cargando, setCargando ]= useState(false);

  const iniciarCarga = () => {setCargando(true);setTimeout(() => setCargando(false), 6000);};
  
  const detenerCarga = () => {setCargando(false);};
    return (
      <View style={styles.container}>

        <Text style={styles.texto}> Práctica: Activity Indicator </Text>

        <View style = {styles.boton}>
          <Button color = 'green'
          title = {cargando ? 'Cargando...' : 'Iniciar Carga'}
          onPress={iniciarCarga}></Button>
        </View>

        <View style = {styles.boton}>
          <Button color = 'red'
          title = 'Detener Carga'
          onPress={detenerCarga}></Button>
        </View>

        <View style = {styles.carga}>
          <ActivityIndicator 
          size = 'large'
          color = '#ef9607ff'
          animating={cargando}
          hidesWhenStopped={true}
          ></ActivityIndicator>
        
        <Text style={styles.textoCarga}>
          {cargando ? 'Cargando datos...' : 'Presiona el botón verde :)'}
        </Text>

        </View>
      </View>
    )
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#6e0c0cff',
    alignItems: 'center',
    justifyContent: 'center',
},
texto: {
    color: "#ffffffff",
    fontSize: 30,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginBottom: 20,
},
boton: {
    width: 220,
    marginBottom: 16,
},
carga: {
    alignItems: 'center',
    marginTop: 20,
},
textoCarga: {
    marginTop: 12,
    fontSize: 16,
    color: '#ffffffff',
},
});