import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

const { height } = Dimensions.get("window");

export default function SplashScreenPro() {
  const [showMain, setShowMain] = useState(false);

  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const rotateLogo = useRef(new Animated.Value(0)).current;
  const slideText = useRef(new Animated.Value(height / 2)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = async () => {
      await SplashScreen.preventAutoHideAsync();

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

      const timer = setTimeout(async () => {
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(async () => {
          await SplashScreen.hideAsync();
          setShowMain(true);
        });
      }, 3000);

      return () => clearTimeout(timer);
    };

    startAnimation();
  }, []);

  const rotateInterpolate = rotateLogo.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  if (showMain) {
    return (
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.text}>¡Bienvenido!</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#680909ff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 5,
  },  
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
});