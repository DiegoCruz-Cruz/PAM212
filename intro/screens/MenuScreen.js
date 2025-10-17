import { Text, StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';
import ContadorScreen from './ContadorScreen';
import BotonesScreen from './Botones/BotonesScreen';
import Botones from './Botones/Botones';
import TextScreen from './TextScreen';
import ImageBackgroungScreen from './ImageBackgroungScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListSectionListScreen from './FlatListSectionListScreen';
import ModalScreen from './ModalScreen';
import BottomSheetScreen from './BottomSheetScreen';

export default function MenuScreen() {
    const [screen,setScreen]=useState('menu');

    switch(screen){
        case 'contador':
            return <ContadorScreen/>;
        case 'botones':
            return <BotonesScreen/>;
        case 'botoness':
            return <Botones/>;
        case 'textInput':
            return <TextScreen/>;
        case 'imageBackgroung':
            return <ImageBackgroungScreen/>;
        case 'activityIndicator':
            return <ActivityIndicatorScreen/>;
        case 'scroll':
            return <ScrollViewScreen />;
        case 'flatListSectionList':
            return <FlatListSectionListScreen/>;
        case 'modal':
            return <ModalScreen/>;
        case 'bottomSheet':
            return <BottomSheetScreen/>;
        case 'menu':
            default:
                return (
                    <View style={styles.container}>
                        <Text style={styles.textoTitulo}>Menú de Practicas</Text>
                        <View style={styles.contenedorBotones}>
                            <Button color='#cf0d0dff' onPress={()=>setScreen('contador')} title="Pract:Contador"/>
                            <Button color='#ef9607ff' onPress={()=>setScreen('botones')}  title="Pract:Botones"/>
                            <Button color='#ef9607ff' onPress={()=>setScreen('botoness')}  title="Pract:Botones 2"/>
                            <Button color='#610dcfff' onPress={()=>setScreen('textInput')}  title="Pract:TextInput"/>
                            <Button color='#cf0d0dff' onPress={()=>setScreen('imageBackgroung')} title="Pract:ImageBackgroung"/>
                            <Button color='#ef9607ff' onPress={()=>setScreen('scroll')}  title="Pract:ScrollView"/>
                            <Button color='#610dcfff' onPress={()=>setScreen('activityIndicator')}  title="Pract:ActivityIndicator"/>
                            <Button color='#cf0d0dff' onPress={()=>setScreen('flatListSectionList')} title="Pract:FlatList"/>
                            <Button color='#ef9607ff' onPress={()=>setScreen('modal')}  title="Pract:Modal"/>
                            <Button color='#610dcfff' onPress={()=>setScreen('bottomSheet')}  title="Pract:Bottom Sheet"/>
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