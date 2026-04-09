import { FavoritesContext } from '../FavoritesContext';
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importación de imágenes locales
import EnsaladaFrescaImg from '../assets/EnsaladaFresca.jpg';
import PolloParrillaImg from '../assets/PolloParrilla.jpg';
import PastaChampinonesImg from '../assets/PastaChampinones.jpg';
import TostadaAguacateImg from '../assets/TostadaAguacate.jpg';
import SopaVerdeImg from '../assets/SopaVerde.jpg';
import WrapImg from '../assets/Wrap.jpg';
import ArrozVerdurasImg from '../assets/ArrozVerduras.jpg';
import SmoothieImg from '../assets/Smoothie.jpeg';
import TacosGarbanzoImg from '../assets/TacosGarbanzo.jpg';
import OmeletteEspinacaImg from '../assets/OmeletteEspinaca.jpeg';

export default function HomeScreen({ navigation }) {

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [recipes, setRecipes] = useState([]);
  const [modalRecetaVisible, setModalRecetaVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // 🍏 Etiquetas nutricionales
  const etiquetasNutricion = {
    proteina: ["pollo", "huevo", "garbanzo", "tofu"],
    carbohidratos: ["pasta", "arroz", "tortilla", "pan"],
    vegetales: ["ensalada", "espinaca", "verduras", "aguacate"],
    energia: ["smoothie", "miel", "frutas"]
  };

  // 🍽️ Recetas
  const recetasEjemplo = [
    {
      id: 1,
      nombre: "Ensalada Fresca",
      tiempo: "10 min",
      imagen: EnsaladaFrescaImg,
      perfil: ["vegetales"],
      descripcion: "Una ensalada deliciosa con ingredientes frescos.",
      ingredientes: ["Lechuga", "Tomate", "Pepino", "Aceite de oliva", "Limón", "Sal"],
      pasos: [
        "Lavar y picar la lechuga, tomate y pepino.",
        "Colocar en un tazón.",
        "Agregar aceite de oliva, limón y sal al gusto.",
        "Mezclar bien y servir."
      ]
    },
    {
      id: 2,
      nombre: "Pollo a la Parrilla",
      tiempo: "25 min",
      imagen: PolloParrillaImg,
      perfil: ["proteina"],
      descripcion: "Pollo jugoso con especias naturales.",
      ingredientes: ["Pechuga de pollo", "Sal", "Pimienta", "Aceite de oliva", "Lomón"],
      pasos: [
        "Sazonar el pollo con sal y pimienta.",
        "Calentar una parrilla con aceite.",
        "Cocinar 6-7 minutos por lado.",
        "Agregar limón encima y servir."
      ]
    },
    {
      id: 3,
      nombre: "Pasta con Champiñones",
      tiempo: "20 min",
      imagen: PastaChampinonesImg,
      perfil: ["carbohidratos"],
      descripcion: "Pasta cremosa con champiñones salteados.",
      ingredientes: ["Pasta", "Champiñones", "Crema", "Ajo", "Sal", "Pimienta"],
      pasos: [
        "Hervir la pasta hasta que esté al dente.",
        "Saltear champiñones con ajo.",
        "Agregar crema, sal y pimienta.",
        "Mezclar con la pasta y servir."
      ]
    },
    {
      id: 4,
      nombre: "Tostada de Aguacate",
      tiempo: "5 min",
      imagen: TostadaAguacateImg,
      perfil: ["vegetales", "energia"],
      descripcion: "Pan tostado con aguacate, limón y semillas.",
      ingredientes: ["Aguacate", "Pan integral", "Limón", "Semillas", "Sal"],
      pasos: [
        "Tostar una rebanada de pan.",
        "Machacar el aguacate con limón y sal.",
        "Untar en el pan.",
        "Agregar semillas y servir."
      ]
    },
    {
      id: 5,
      nombre: "Sopa Verde",
      tiempo: "18 min",
      imagen: SopaVerdeImg,
      perfil: ["vegetales"],
      descripcion: "Sopa caliente con espinaca, cilantro y vegetales.",
      ingredientes: ["Espinaca", "Cilantro", "Caldo de verduras", "Ajo", "Sal"],
      pasos: [
        "Cocinar espinacas y cilantro en el caldo.",
        "Agregar ajo y sal.",
        "Licuar la mezcla.",
        "Calentar y servir."
      ]
    },
    {
      id: 6,
      nombre: "Wrap Saludable",
      tiempo: "12 min",
      imagen: WrapImg,
      perfil: ["vegetales", "proteina"],
      descripcion: "Wrap de tortilla integral con verduras frescas.",
      ingredientes: ["Tortilla integral", "Lechuga", "Tomate", "Pollo o tofu", "Zanahoria"],
      pasos: [
        "Calentar tortilla.",
        "Rellenar con verduras y proteína.",
        "Enrollar bien.",
        "Cortar por la mitad y servir."
      ]
    },
    {
      id: 7,
      nombre: "Arroz con Verduras",
      tiempo: "30 min",
      imagen: ArrozVerdurasImg,
      perfil: ["carbohidratos"],
      descripcion: "Arroz salteado con vegetales mixtos.",
      ingredientes: ["Arroz", "Zanahoria", "Chícharos", "Aceite", "Sal"],
      pasos: [
        "Cocer el arroz.",
        "Saltear zanahoria y chícharos.",
        "Mezclar con el arroz.",
        "Agregar sal y servir."
      ]
    },
    {
      id: 8,
      nombre: "Smoothie Energético",
      tiempo: "3 min",
      imagen: SmoothieImg,
      perfil: ["energia"],
      descripcion: "Batido natural con frutas y semillas.",
      ingredientes: ["Plátano", "Fresas", "Leche o bebida vegetal", "Chía", "Miel"],
      pasos: [
        "Agregar frutas, leche y miel a la licuadora.",
        "Licuar hasta obtener mezcla cremosa.",
        "Servir y agregar chía."
      ]
    },
    {
      id: 9,
      nombre: "Tacos de Garbanzo",
      tiempo: "15 min",
      imagen: TacosGarbanzoImg,
      perfil: ["proteina"],
      descripcion: "Tacos veganos con garbanzo y salsa.",
      ingredientes: ["Tortillas", "Garbanzo cocido", "Cebolla", "Limón", "Salsa roja"],
      pasos: [
        "Aplastar garbanzo con cebolla y limón.",
        "Calentar tortillas.",
        "Rellenar con mezcla de garbanzo.",
        "Agregar salsa y servir."
      ]
    },
    {
      id: 10,
      nombre: "Omelette de Espinaca",
      tiempo: "12 min",
      imagen: OmeletteEspinacaImg,
      perfil: ["proteina", "vegetales"],
      descripcion: "Omelette suave con espinacas frescas.",
      ingredientes: ["Huevos", "Espinacas", "Sal", "Aceite", "Queso opcional"],
      pasos: [
        "Batir huevos con sal.",
        "Agregar espinacas picadas.",
        "Verter en sartén con aceite.",
        "Agregar queso opcional, doblar y servir."
      ]
    }
  ];

  // 🔍 Buscador inteligente
  const buscarRecetas = (texto) => {
    setBusqueda(texto);

    if (texto.trim() === "") return setRecipes([]);

    const lower = texto.toLowerCase();

    const matchNutricional = Object.entries(etiquetasNutricion)
      .filter(([cat, items]) => items.some(i => i.includes(lower)))
      .map(([cat]) => cat);

    const resultados = recetasEjemplo.filter(r =>
      r.nombre.toLowerCase().includes(lower) ||
      r.ingredientes.some(ing => ing.toLowerCase().includes(lower)) ||
      r.perfil.some(p => matchNutricional.includes(p))
    );

    setRecipes(resultados);
  };

  const explorar = () => setRecipes(recetasEjemplo);

  const abrirModalReceta = (recipe) => {
    setSelectedRecipe(recipe);
    setModalRecetaVisible(true);
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
          onPress={() => navigation.navigate('PerfilStack')}
        >
          <Text style={{ fontSize: 22 }}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* BUSCADOR */}
      <Text style={styles.question}>¿Qué ingredientes tienes hoy?</Text>

      <TextInput
        placeholder="Agregar ingrediente"
        style={styles.input}
        placeholderTextColor="#777"
        value={busqueda}
        onChangeText={buscarRecetas}
      />

      {/* BOTÓN EXPLORAR */}
      <TouchableOpacity style={styles.exploreBtn} onPress={explorar}>
        <Text style={styles.exploreText}>Explorar recetas</Text>
      </TouchableOpacity>

      {/* LISTA DE RECETAS */}
      <Text style={styles.sectionTitle}>Recetas recomendadas</Text>

      {recipes.length === 0 ? (
        <Text style={{ marginLeft: 20, marginTop: 10, color: '#777' }}>
          No hay recetas disponibles
        </Text>
      ) : (
        recipes.map(recipe => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.card}
            onPress={() => abrirModalReceta(recipe)}
          >
            <Image source={recipe.imagen} style={styles.cardImg} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.cardTitle}>{recipe.nombre}</Text>
                <Text style={styles.cardTime}>{recipe.tiempo}</Text>
              </View>

              <TouchableOpacity onPress={() => toggleFavorite(recipe)}>
                <Ionicons
                  name={favorites.some(f => f.id === recipe.id) ? "heart" : "heart-outline"}
                  size={28}
                  color={favorites.some(f => f.id === recipe.id) ? "#0A4825" : "#999"}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* MODAL RECETA */}
      {selectedRecipe && (
        <Modal visible={modalRecetaVisible} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modalCard}>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={selectedRecipe.imagen} style={styles.modalImg} />

                <Text style={styles.modalTitle}>{selectedRecipe.nombre}</Text>
                <Text style={styles.modalDesc}>{selectedRecipe.descripcion}</Text>

                <Text style={styles.subTitle}>Ingredientes</Text>
                {selectedRecipe.ingredientes.map((item, index) => (
                  <Text key={index} style={styles.listItem}>• {item}</Text>
                ))}

                <Text style={styles.subTitle}>Preparación</Text>
                {selectedRecipe.pasos.map((item, index) => (
                  <Text key={index} style={styles.listItem}>• {item}</Text>
                ))}

                {/* 🔥 BOTÓN AHORA SOLO CIERRA */}
                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => setModalRecetaVisible(false)}
                >
                  <Text style={styles.exploreText}>Cerrar</Text>
                </TouchableOpacity>

              </ScrollView>

            </View>
          </View>
        </Modal>
      )}

    </ScrollView>
  );
}

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },

  header: {
    backgroundColor: '#B4D96E',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  logo: { fontSize: 28, fontWeight: 'bold', color: '#0A4825' },
  subtitle: { fontSize: 13, marginTop: -4, opacity: 0.8, fontWeight: '500', color: '#0A4825' },

  profileIcon: {
    backgroundColor: '#D9E6B5',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },

  question: { marginTop: 20, marginLeft: 20, fontSize: 21, fontWeight: '700' },
  input: {
    backgroundColor: '#FFF',
    marginTop: 15,
    marginHorizontal: 20,
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DDD'
  },

  exploreBtn: { backgroundColor: '#0A4825', margin: 20, padding: 12, borderRadius: 10 },
  exploreText: { color: '#FFF', textAlign: 'center', fontWeight: '700' },

  sectionTitle: { marginLeft: 20, fontSize: 20, marginTop: 20, fontWeight: '700' },

  card: { backgroundColor: '#FFF', margin: 20, borderRadius: 12, padding: 12, elevation: 3 },
  cardImg: { width: '100%', height: 160, borderRadius: 12, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardTime: { color: '#555' },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '88%', backgroundColor: '#FFF', borderRadius: 20, padding: 20, maxHeight: '85%' },
  modalImg: { width: '100%', height: 200, borderRadius: 12 },
  modalTitle: { fontSize: 22, fontWeight: '700', marginTop: 10 },
  modalDesc: { marginTop: 10, fontSize: 15, color: '#444' },
  subTitle: { fontSize: 18, fontWeight: '700', marginTop: 15 },
  listItem: { fontSize: 15, color: '#333', marginTop: 5 },

  closeBtn: { backgroundColor:'#0A4825', padding:12, borderRadius:10, marginTop:25, marginBottom:30 },
  closeText: { color:'#FFF', textAlign:'center', fontWeight:'700' }
});
