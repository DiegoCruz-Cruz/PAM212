// navigation/SettingsStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/SettingsScreen';
import AboutChefByteScreen from '../screens/AboutChefByteScreen';
import TerminosScreen from '../screens/TerminosScreen';
import PoliticasScreen from '../screens/PoliticasScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen} 
        options={{ title: 'Ajustes' }} 
      />

      <Stack.Screen 
        name="Acerca" 
        component={AboutChefByteScreen}
        options={{ title: 'Acerca de ChefByte' }}
      />

      <Stack.Screen 
        name="Terminos" 
        component={TerminosScreen}
        options={{ title: 'Términos y Condiciones' }}
      />

      <Stack.Screen 
        name="Politicas" 
        component={PoliticasScreen}
        options={{ title: 'Políticas de Privacidad' }}
      />
    </Stack.Navigator>
  );
}
