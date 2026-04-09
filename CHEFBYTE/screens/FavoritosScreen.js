// FavoritosScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
import { FavoritesContext } from "../FavoritesContext";

export default function FavoritosScreen({ navigation }) {
  const { favorites, editFavoriteNote, removeFavorite } = useContext(FavoritesContext);

  const [modalEdit, setModalEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [nuevaNota, setNuevaNota] = useState("");

  const abrirEditar = (recipe) => {
    setSelected(recipe);
    setNuevaNota(recipe.nota);
    setModalEdit(true);
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>CHEFBYTE</Text>
          <Text style={styles.subtitle}>Recetas Sustentables</Text>
        </View>

        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Text style={{ fontSize: 22 }}>👤</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Recetas Favoritas</Text>

      {favorites.length === 0 ? (
        <Text style={{ marginLeft: 20, marginTop: 10, color: "#555" }}>
          Aún no has guardado recetas
        </Text>
      ) : (
        <View style={styles.grid}>
          {favorites.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.card}
              onPress={() => abrirEditar(recipe)}
            >
              <Text style={styles.cardTitle}>{recipe.nombre}</Text>
              <Text style={styles.cardTime}>{recipe.tiempo}</Text>

              <TouchableOpacity
                onPress={() => abrirEditar(recipe)}
                style={{
                  marginTop: 10,
                  padding: 8,
                  backgroundColor: "#B4D96E",
                  borderRadius: 8
                }}
              >
                <Text style={{ textAlign: "center", fontWeight: "600" }}>
                  Ver / Editar Nota
                </Text>
              </TouchableOpacity>

              <Text style={{ marginTop: 5, color: "#333", fontSize: 13 }}>
                {recipe.nota || "Sin nota"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* MODAL EDITAR */}
      {selected && (
        <Modal visible={modalEdit} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={[styles.modalCard, { padding: 20 }]}>

              <Text style={{ fontSize: 18, fontWeight: "700" }}>Editar Nota</Text>

              <TextInput
                style={[styles.input, { marginTop: 15, height: 80 }]}
                multiline
                value={nuevaNota}
                onChangeText={setNuevaNota}
              />

              <TouchableOpacity
                style={styles.exploreBtn}
                onPress={() => {
                  editFavoriteNote(selected.id, nuevaNota);
                  setModalEdit(false);
                }}
              >
                <Text style={styles.exploreText}>Guardar cambios</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.closeBtn, { backgroundColor: "#900" }]}
                onPress={() => {
                  removeFavorite(selected.id);
                  setModalEdit(false);
                }}
              >
                <Text style={styles.closeText}>Eliminar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalEdit(false)}
              >
                <Text style={styles.closeText}>Cancelar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },

  header: {
    backgroundColor: "#B4D96E",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { fontSize: 28, fontWeight: "bold", color: "#0A4825" },
  subtitle: {
    fontSize: 13,
    marginTop: -4,
    opacity: 0.8,
    fontWeight: "500",
    color: "#0A4825",
  },
  profileIcon: {
    width: 42,
    height: 42,
    backgroundColor: "#D9E6B5",
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  title: { fontSize: 24, fontWeight: "700", marginLeft: 20, marginTop: 20 },
  grid: { width: "100%", padding: 20, gap: 15 },

  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardTime: { color: "#666", fontSize: 14 },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  exploreBtn: {
    backgroundColor: "#0A4825",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  exploreText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  closeBtn: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
