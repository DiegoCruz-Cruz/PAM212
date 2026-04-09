import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistorialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* FLECHA VOLVER */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#0A4825" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.subtitleInfo}>Has visto 6 recetas</Text>

        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <TouchableOpacity key={i} style={styles.card}>
              <Text style={styles.cardTitle}>Nombre receta</Text>
              <Text style={styles.cardTime}>Tiempo</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F2F2F2' },

  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600', fontSize: 16, color: '#0A4825' },

  title: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  subtitleInfo: { fontSize: 14, color: '#444', marginBottom: 20 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'center',
  },

  card: {
    width: 150,
    height: 130,
    backgroundColor: '#dddddd4d',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'flex-end'
  },

  cardTitle: { fontWeight: '700', fontSize: 15 },
  cardTime: { fontSize: 12, color: '#444' },
});
