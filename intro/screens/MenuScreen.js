import { ScrollView, Text, StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';
import ContadorScreen from './ContadorScreen';
import BotonesScreen from './Botones/BotonesScreen';
import Botones from './Botones/Botones';
import TextScreen from './TextScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import PrimerRepasoScreen from './PrimerRepasoScreen'
import ScrollViewVScreen from './ScrollViewVerticalScreen';
import ScrollViewHScreen from './ScrollViewHorizontalScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListSectionListScreen from './FlatListSectionListScreen';
import ModalScreen from './ModalScreen';
import BottomSheetScreen from './BottomSheetScreen';

export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'contador':
            return <ContadorScreen />;
        case 'botones':
            return <BotonesScreen />;
        case 'botoness':
            return <Botones />;
        case 'textInput':
            return <TextScreen />;
        case 'imageBackground':
            return <ImageBackgroundScreen />;
        case 'primerRepaso':
            return <PrimerRepasoScreen />;
        case 'scrollv':
            return <ScrollViewVScreen />;
        case 'scrollh':
            return <ScrollViewHScreen />;
        case 'activityIndicator':
            return <ActivityIndicatorScreen />;
        case 'flatListSectionList':
            return <FlatListSectionListScreen />;
        case 'modal':
            return <ModalScreen />;
        case 'bottomSheet':
            return <BottomSheetScreen />;
        case 'menu':
        default:
            return (
                <View style={styles.container}>
                    <Text style={styles.textoTitulo}>Menú de Prácticas</Text>
                    <View style={styles.contenedorBotones}>
                        <Button color='#cf0d0dff' onPress={() => setScreen('contador')} title="Pract: Contador" />
                        <Button color='#ef9607ff' onPress={() => setScreen('botones')} title="Pract: Botones" />
                        <Button color='#610dcfff' onPress={() => setScreen('botoness')} title="Pract: Botones 2" />
                        <Button color='#cf0d0dff' onPress={() => setScreen('textInput')} title="Pract: TextInput" />
                        <Button color='#ef9607ff' onPress={() => setScreen('imageBackground')} title="Pract: ImageBackground" />
                        <Button color='#610dcfff' onPress={() => setScreen('scrollv')} title="Pract: ScrollViewV" />
                        <Button color='#cf0d0dff' onPress={() => setScreen('scrollh')} title="Pract: ScrollViewH" />
                        <Button color='#ef9607ff' onPress={() => setScreen('primerRepaso')} title="Pract: Primer Repaso" />
                        <Button color='#610dcfff' onPress={() => setScreen('activityIndicator')} title="Pract: ActivityIndicator" />
                        <Button color='#cf0d0dff' onPress={() => setScreen('flatListSectionList')} title="Pract: FlatList" />
                        <Button color='#ef9607ff' onPress={() => setScreen('modal')} title="Pract: Modal" />
                        <Button color='#610dcfff' onPress={() => setScreen('bottomSheet')} title="Pract: Bottom Sheet" />
                    </View>
                </View>
            );
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
