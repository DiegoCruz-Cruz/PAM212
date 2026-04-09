// navigation/PerfilStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PerfilScreen from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Perfil" 
        component={PerfilScreen}
        options={{ title: 'Mi Perfil' }}
      />
    </Stack.Navigator>
  );
}
