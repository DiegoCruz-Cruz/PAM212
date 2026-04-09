import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InicioSesionScreens from "../screens/InicioSesionScreens";
import PerfilScreen from "../screens/PerfilScreen";
import HistorialScreen from "../screens/HistorialScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pantallas de Login */}
        <Stack.Screen name="Login" component={InicioSesionScreens} />

        {/* Pantallas protegidas */}
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
