// screens/RecetaCompleta.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function RecetaCompleta({ route }) {
  const { receta } = route.params ?? {};

  if (!receta) return <Text>Cargando receta...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{receta.titulo}</Text>
      {receta.imagen ? <Image source={{ uri: receta.imagen }} style={styles.image} /> : null}
      <Text style={styles.section}>Ingredientes</Text>
      <Text style={styles.body}>{receta.ingredientes}</Text>
      <Text style={styles.section}>Pasos</Text>
      <Text style={styles.body}>{receta.pasos}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 12, marginBottom: 6 },
  body: { fontSize: 16, lineHeight: 22 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 12 },
});
