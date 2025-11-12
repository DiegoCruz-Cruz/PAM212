import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

/* 
import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  Button, 
  StyleSheet, 
  ImageBackground, 
  Animated, 
  Dimensions 
} from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import SwitchButton from './Botones/Switch'; 

const { height } = Dimensions.get("window");

export default function PrimerRepaso() {
  const [showMain, setShowMain] = useState(false);

  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const rotateLogo = useRef(new Animated.Value(0)).current;
  const slideText = useRef(new Animated.Value(height / 2)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    Animated.parallel([
      Animated.timing(fadeLogo, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(rotateLogo, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(slideText, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      delay: 800,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        SplashScreen.hideAsync()
          .then(() => setShowMain(true))
          .catch(console.warn);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const rotateInterpolate = rotateLogo.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const enviarDatos = () => {
    if (nombre.trim() === '' || correo.trim() === '') {
      Alert.alert('Error', 'Por favor, ingresa nombre y correo');
      alert('Error: Por favor, ingresa un nombre y correo');
      setMensaje('Campos en blanco, por favor ingrese nombre y correo');
      return;
    }
    
    if (!validarCorreo(correo)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      alert('Error: Por favor, ingresa un correo electrónico válido');
      setMensaje('Correo inválido. Debe tener formato: usuario@dominio.com');
      return;
    }
    
    if (!aceptarTerminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones');
      alert('Error: Debes aceptar los términos y condiciones');
      setMensaje('Debes aceptar los términos y condiciones');
      return;
    }
    
    Alert.alert('¡Éxito!', 'Datos enviados correctamente');
    alert('Datos enviados correctamente');
    setMensaje('Datos enviados correctamente');
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {!showMain && (
        <Animated.View style={[styles.container, { opacity: fadeOut }]}>
          <Animated.Image
            source={require("../assets/2.png")}
            resizeMode="contain"
            style={[
              styles.logoImage,
              {
                opacity: fadeLogo,
                transform: [{ scale: scaleLogo }, { rotate: rotateInterpolate }],
              },
            ]}
          />
          <Animated.Text
            style={[styles.text, { transform: [{ translateY: slideText }] }]}
          >
            ¡ImageBackground & Splash Screen!
          </Animated.Text>
          <View style={styles.loader} />
        </Animated.View>
      )}

      {showMain && (
        <View style={styles.containerGrey}>
          <View style={styles.container}>
            <Text style={styles.title}>Registro de Usuario</Text>

            <TextInput
              style={styles.input}
              placeholder="Escribe tu nombre"
              value={nombre}
              onChangeText={setNombre}
              keyboardType="default"
            />

            <TextInput
              style={styles.input}
              placeholder="Escribe tu correo (ej: usuario@dominio.com)"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>Aceptar términos y condiciones</Text>
              <SwitchButton 
                value={aceptarTerminos}
                onValueChange={setAceptarTerminos}
              />
            </View>

            <Button title="Enviar" onPress={enviarDatos} />
            
            <Text style={styles.mensaje}>{mensaje}</Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loader: {
    width: 60,
    height: 6,
    backgroundColor: "#fff",
    borderRadius: 3,
    marginTop: 15,
  },
  containerGrey: {
    width: '80%',
    padding: 12,
    borderRadius: 9,
    backgroundColor: '#626262a0'
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    width: '80%',
    borderWidth: 3,
    borderColor: '#741414ff',
    padding: 12,
    borderRadius: 9,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#fff'
  },
  mensaje: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  termsText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  }
});
*/