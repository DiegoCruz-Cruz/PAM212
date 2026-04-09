// navigation/ButtonsNavigator.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TabsNavigator() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botones de navegación */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Buscar')}>
          <Ionicons name="search-outline" size={24} color="#0A4825" />
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favoritas')}>
          <Ionicons name="heart-outline" size={24} color="#0A4825" />
          <Text style={styles.buttonText}>Favoritas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filtros')}>
          <Ionicons name="filter-outline" size={24} color="#0A4825" />
          <Text style={styles.buttonText}>Filtros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#B4D96E',
    borderRadius: 16,
    elevation: 5,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',       // Para que el icono y texto estén alineados
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    elevation: 3,
    gap: 6,
    color: '#0A4825',                     // Espacio entre icono y texto
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A4825',
  },
});
