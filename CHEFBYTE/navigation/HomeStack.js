// navigation/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import HomeScreen2 from '../screens/HomeScreen2';
import RecetaScreen from '../screens/RecetaScreen';
import FiltersScreen from '../screens/FiltersScreen';
import CommentsScreen from '../screens/CommentsScreen';
import ReportarScreen from '../screens/ReportarScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'ChefByte' }}
      />

      <Stack.Screen 
        name="Home2" 
        component={HomeScreen2}
        options={{ title: 'Explorar' }}
      />

      <Stack.Screen 
        name="Receta" 
        component={RecetaScreen}
        options={{ title: 'Receta' }}
      />

      <Stack.Screen 
        name="Filtros" 
        component={FiltersScreen}
        options={{ title: 'Filtros' }}
      />

      <Stack.Screen 
        name="Comentarios" 
        component={CommentsScreen}
        options={{ title: 'Comentarios' }}
      />

      <Stack.Screen 
        name="Reportar" 
        component={ReportarScreen}
        options={{ title: 'Reportar Publicación' }}
      />
    </Stack.Navigator>
  );
}
