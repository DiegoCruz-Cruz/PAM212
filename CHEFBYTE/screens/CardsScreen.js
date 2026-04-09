// screens/CardsScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas guardadas</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Receta", { id: 1 })}>
        <Text style={styles.cardText}>Receta Ejemplo 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Receta", { id: 2 })}>
        <Text style={styles.cardText}>Receta Ejemplo 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { backgroundColor: "#c6e377", padding: 16, borderRadius: 10, marginBottom: 12 },
  cardText: { fontSize: 16, fontWeight: "bold", color: "#1b5e20" },
});