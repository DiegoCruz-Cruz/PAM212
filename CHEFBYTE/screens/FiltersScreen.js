import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppSettingsContext } from './AppSettingsContext';
import { Feather } from '@expo/vector-icons';

const preferencias = ['Vegano', 'Vegetariano', 'Keto', 'Sin gluten', 'Low Carb', 'Sin lactosa'];

export default function FiltersScreen({ navigation }) {
  const { darkMode, fontSize } = useContext(AppSettingsContext);
  const theme = darkMode ? styles.dark : styles.light;
  const textStyle = darkMode ? styles.textDark : styles.textLight;

  const [seleccionadas, setSeleccionadas] = useState([]);

  const togglePreference = (pref) => {
    if (seleccionadas.includes(pref)) {
      setSeleccionadas(seleccionadas.filter(p => p !== pref));
    } else {
      setSeleccionadas([...seleccionadas, pref]);
    }
  };

  const aplicarFiltros = () => {
    // Aquí puedes integrar la lógica para filtrar recetas
    console.log('Filtros aplicados:', seleccionadas);
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, theme]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { fontSize: fontSize + 4 }]}>Filtros</Text>
      </View>

      {/* Sección de preferencias */}
      <Text style={[textStyle, { fontSize, marginBottom: 10 }]}>Preferencias</Text>
      <View style={styles.box}>
        {preferencias.map(pref => {
          const active = seleccionadas.includes(pref);
          return (
            <TouchableOpacity
              key={pref}
              style={[styles.row, active ? styles.rowActive : null]}
              onPress={() => togglePreference(pref)}
            >
              <Text style={[textStyle, { fontSize }]}>{pref}</Text>
              {active && <Feather name="check" size={20} color="#fff" />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botón aplicar */}
      <TouchableOpacity style={styles.applyBtn} onPress={aplicarFiltros}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: fontSize }}>Aplicar filtros</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  dark: { backgroundColor: '#121212' },
  light: { backgroundColor: '#fff' },
  textDark: { color: '#fff' },
  textLight: { color: '#222' },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 16 },
  title: { fontWeight: '700', flex: 1, textAlign: 'center' },

  box: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c6e377',
    backgroundColor: '#F6F6F6',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: '#fff',
    elevation: 1
  },
  rowActive: { backgroundColor: '#B4D96E' },

  applyBtn: {
    backgroundColor: '#c6e377',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3
  }
});
