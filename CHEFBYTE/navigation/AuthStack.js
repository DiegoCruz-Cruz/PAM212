// navigation/AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioSesionScreen from "../screens/InicioSesionScreen";
import RegistroScreen from "../screens/RegistroScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InicioSesion" component={InicioSesionScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}
