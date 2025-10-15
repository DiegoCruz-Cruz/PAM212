import { Text, StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';
import ContadorScreen from './ContadorScreen';
import BotonesScreen from './BotonesScreen';

export default function MenuScreen() {
    const [screen,setScreen]=useState('menu');

    switch(screen){
        case 'contador':
            return <ContadorScreen/>;
        case 'botones':
            return <BotonesScreen/>;
        case 'menu':
            default:
                return (
                    <View style={styles.container}>
                        <Text style={styles.textoTitulo}>Menú de Practicas</Text>
                        <View style={styles.contenedorBotones}>
                            <Button color='#cf0d0dff' onPress={()=>setScreen('contador')} title="Pract:Contador"/>
                            <Button color='#ef9607ff' onPress={()=>setScreen('botones')}  title="Pract:Botones"/>
                            <Button color='#610dcfff' onPress={()=>setScreen('botones')}  title="Pract:TextInput"/>
                            <Button color='#cf0d0dff' onPress={()=>setScreen('botones')} title="Pract:ImageBackgroung"/>
                            <Button color='#ef9607ff' onPress={()=>setScreen('botones')}  title="Pract:ScrollView"/>
                            <Button color='#610dcfff' onPress={()=>setScreen('botones')}  title="Pract:ActivityIndicator"/>
                            <Button color='#cf0d0dff' onPress={()=>setScreen('botones')} title="Pract:FlatList"/>
                            <Button color='#ef9607ff' onPress={()=>setScreen('botones')}  title="Pract:Modal"/>
                            <Button color='#610dcfff' onPress={()=>setScreen('botones')}  title="Pract:Bottom Sheet"/>
                        </View>
                    </View>
                )

    }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#510808ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoTitulo: {
    color: '#ffffffff',
    fontSize: 70,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
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
    flexDirection: 'column',
    gap: 20,
  },
});