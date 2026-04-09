// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { AppSettingsProvider } from "./screens/AppSettingsContext";
import { FavoritesProvider } from "./FavoritesContext";

// Screens
import HomeScreen from "./screens/HomeScreen";
import FiltersScreen from "./screens/FiltersScreen";
import FavoritosScreen from "./screens/FavoritosScreen";
import HistorialScreen from "./screens/HistorialScreen";
import RecetaScreen from "./screens/RecetaScreen";
import PerfilScreen from "./screens/PerfilScreen";
import InicioSesionScreen from "./screens/InicioSesionScreen";
import RegistroScreen from "./screens/RegistroScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PoliticasScreen from "./screens/PoliticasScreen";
import TerminosScreen from "./screens/TerminosScreen";
import ReportarScreen from "./screens/ReportarScreen";
import CommentsScreen from "./screens/CommentsScreen";
import AboutChefByteScreen from "./screens/AboutChefByteScreen";

// 🔥 Stacks
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ---------- Stacks de Tabs ----------
function BuscarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BuscarHome" component={HomeScreen} />
      <Stack.Screen name="Receta" component={RecetaScreen} />
    </Stack.Navigator>
  );
}

function FavoritasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritasHome" component={FavoritosScreen} />
      <Stack.Screen name="Receta" component={RecetaScreen} />
    </Stack.Navigator>
  );
}

function FiltrosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FiltrosHome" component={FiltersScreen} />
      <Stack.Screen name="Receta" component={RecetaScreen} />
    </Stack.Navigator>
  );
}

// ---------- Perfil y Auth juntos 🔥 CORREGIDO ----------
function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="InicioSesion" component={InicioSesionScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}

// ---------- Tabs ----------
function TabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Buscar"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Buscar") iconName = focused ? "search" : "search-outline";
          if (route.name === "Favoritas") iconName = focused ? "heart" : "heart-outline";
          if (route.name === "Filtros") iconName = focused ? "filter" : "filter-outline";
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#0a4825",
        tabBarInactiveTintColor: "#8a8a8a",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 72,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          elevation: 12,
        },
      })}
    >
      <Tab.Screen name="Buscar" component={BuscarStack} />
      <Tab.Screen name="Favoritas" component={FavoritasStack} />
      <Tab.Screen name="Filtros" component={FiltrosStack} />
    </Tab.Navigator>
  );
}

// ---------- ROOT APP ----------
export default function App() {
  return (
    <AppSettingsProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Tabs */}
            <Stack.Screen name="Tabs" component={TabsNavigator} />

            {/* Perfil & Auth dentro del Root */}
            <Stack.Screen name="PerfilStack" component={PerfilStack} />

            {/* Otras pantallas */}
            <Stack.Screen name="Historial" component={HistorialScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Politicas" component={PoliticasScreen} />
            <Stack.Screen name="Terminos" component={TerminosScreen} />
            <Stack.Screen name="Reportar" component={ReportarScreen} />
            <Stack.Screen name="Comentarios" component={CommentsScreen} />
            <Stack.Screen name="About" component={AboutChefByteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </AppSettingsProvider>
  );
}
