//1. Import: Zona de declaraciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button} from 'react-native';
import React,{useState} from 'react';

//2. Main: Zona de componentes
export default function App() {
  const[contador,setContador]=useState(0);

  return (
    <View style={styles.container}>

      <Text style={styles.texto}> Contador: </Text>
      <Text style={styles.texto2}> {contador} </Text>
      
      <View style={styles.contenedorBotones}>
      <Button color='#cf0d0dff' title="Incrementar"onPress={()=>setContador(contador+1)}/>
      <Button color='#ef9607ff' title="Disminuir"onPress={()=>setContador(contador-1)}/>
      <Button color='#610dcfff' title="Reiniciar"onPress={()=>setContador(0)}/>
      </View>

      <StatusBar style="auto" />
      

    </View>

  );
}

//3. Estilos: Zona de estética y posicionamiento 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#510808ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#cf0d0dff',
    fontSize: 30,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
  },
  texto2: {
    color: '#cf0d0dff',
    fontSize: 40,
    fontFamily: 'Courier',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  contenedorBotones: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 20,
  },
});