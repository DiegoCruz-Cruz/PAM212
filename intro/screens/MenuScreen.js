import { Text, StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';
import ContadorScreen from './ContadorScreen';
import BotonesScreen from './BotonesScreen';
import ScrollViewScreen from './ScrollViewScreen';

export default function MenuScreen() {
    const [screen,setScreen]=useState('menu');

    switch(screen){
        case 'contador':
            return <ContadorScreen/>;
        case 'botones':
            return <BotonesScreen/>;
        case 'scroll':
            return <ScrollViewScreen />;
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
                            <Button color='#ef9607ff' onPress={()=>setScreen('scroll')}  title="Pract:ScrollView"/>
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
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  contenedorBotones: {
    marginTop: 25,
    flexDirection: 'column',
    gap: 15,
  },
});