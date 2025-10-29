import React from 'react';
import { View, Text, FlatList, SectionList, StyleSheet, } from 'react-native';

const alumnos = [
  { id: '1', nombre: 'Ariana Grande' },
  { id: '2', nombre: 'Sabrina Carpenter' },
  { id: '3', nombre: 'Rafa Polinesio' },
  { id: '4', nombre: 'Danna Paola' },
  { id: '5', nombre: 'Adele' },
];

const categorias = [
  { titulo: 'Primavera', data: ['Marzo', 'Abril', 'Mayo'],},
  { titulo: 'Verano', data: ['Junio', 'Julio', 'Agosto'],},
  { titulo: 'Otoño', data: ['Septiembre', 'Octubre', 'Noviembre'],},
  { titulo: 'Invierno', data: ['Diciembre', 'Enero', 'Febrero'],},
];

export default function FlatListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplo de FlatList</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={alumnos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>* {item.nombre}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Ejemplo de SectionList</Text>

      <SectionList
        showsVerticalScrollIndicator={false}
        sections={categorias}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>• {item}</Text>
        )}
        renderSectionHeader={({ section: { titulo } }) => (
          <Text style={styles.sectionHeader}>{titulo}</Text>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#510808ff',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffffff',
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
    marginTop: 60,
  },
  itemBox: {
    backgroundColor: '#cf0d0dff',
    padding: 20,
    marginVertical: 5,
    borderRadius: 8,
  },
  itemText: {
    color: '#ffffffff',
    fontSize: 16,
  },
  sectionHeader: {
    color: '#ef9607ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});