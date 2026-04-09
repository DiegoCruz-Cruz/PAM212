import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();

  const screens = [
    'AboutChefByteScreen',
    'AppSettingsContext',
    'CommentsScreen',
    'FiltersScreen',
    'HomeScreen',
    'HomeScreen2',
    'Inicio SesionScreen',
    'MenuScreen',
    'PerfilScreen',
    'PoliticasScreen',
    'RecetaScreen',
    'ReportarScreen',
    'SettingsScreen',
    'TerminosScreen',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menú de Pantallas</Text>

      {screens.map((screen, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(screen)}
        >
          <Text style={styles.buttonText}>{screen}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
