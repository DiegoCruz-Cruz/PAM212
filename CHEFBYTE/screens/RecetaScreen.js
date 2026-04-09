// screens/RecetaScreen.js
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppSettingsContext } from "./AppSettingsContext";
import RecetaController from "../controllers/RecetaController";

const RecetaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params ?? {};
  const { darkMode, fontSize } = useContext(AppSettingsContext);

  const [receta, setReceta] = useState(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const r = await RecetaController.buscarPorId(id);
      setReceta(r || null);
    })();
  }, [id]);

  if (!receta) {
    return (
      <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
        <Text style={{ textAlign: "center", marginTop: 30 }}>Cargando receta...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <View style={[styles.header, { backgroundColor: "#c6e377" }]}>
        <Text style={[styles.logo, { color: "#1b5e20" }]}>CHEFBYTE</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={[styles.title, { fontSize: fontSize + 6 }]}>{receta.titulo}</Text>

        {receta.imagen ? <Image source={{ uri: receta.imagen }} style={styles.image} /> : null}

        <Text style={[styles.section]}>Ingredientes</Text>
        <Text style={[styles.instructions]}>{receta.ingredientes}</Text>

        <Text style={[styles.section]}>Pasos</Text>
        <Text style={[styles.instructions]}>{receta.pasos}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Comentarios", { recetaId: receta.id })}>
          <Text style={styles.footerIcon}>💬 Comentarios</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Reportar", { recetaId: receta.id })}>
          <Text style={styles.footerIcon}>🚩 Reportar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 12, margin: 15 },
  logo: { flex: 1, fontWeight: "bold", fontSize: 22 },
  title: { fontWeight: "bold", marginHorizontal: 20, marginTop: 10, marginBottom: 8 },
  image: { width: "90%", height: 200, alignSelf: "center", borderRadius: 12, marginBottom: 10 },
  section: { fontWeight: "bold", fontSize: 18, marginHorizontal: 20, marginTop: 12, marginBottom: 6 },
  instructions: { fontSize: 15, marginHorizontal: 20, lineHeight: 22, marginBottom: 12 },
  footer: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#c6e377", paddingVertical: 12, borderRadius: 10, position: "absolute", left: 10, right: 10, bottom: 10 },
  footerIcon: { color: "#1b5e20", fontWeight: "bold", fontSize: 16 },

  dark: { backgroundColor: "#222" },
  light: { backgroundColor: "#fff" },
});

export default RecetaScreen;
