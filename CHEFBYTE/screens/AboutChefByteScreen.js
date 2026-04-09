import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppSettingsContext } from './AppSettingsContext';
import { Ionicons } from '@expo/vector-icons';

export default function AboutChefByteScreen({ navigation }) {
  const { darkMode, fontSize } = useContext(AppSettingsContext);
  const theme = darkMode ? styles.dark : styles.light;
  const textTheme = darkMode ? styles.textDark : styles.textLight;

  return (
    <View style={[styles.container, theme]}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#000'} />
        <Text style={[styles.backText, { color: darkMode ? '#fff' : '#000', fontSize }]}>Volver</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text style={[styles.title, textTheme, { fontSize: fontSize + 4 }]}>
          Acerca de CHEFBYTE
        </Text>

        <Text style={[styles.paragraph, textTheme, { fontSize }]}>
          CHEFBYTE es una aplicación móvil creada para impulsar la gastronomía sustentable, 
          apoyando a cualquier persona que desee aprender, mejorar o practicar técnicas culinarias 
          mientras cuida el planeta. Nuestro objetivo es facilitar el acceso a recetas prácticas,
          económicas y responsables con el medio ambiente.{"\n\n"}

          A través de CHEFBYTE encontrarás recetas diseñadas para aprovechar mejor los ingredientes,
          reducir el desperdicio de alimentos y descubrir opciones más saludables y ecológicas.
          Además, brindamos herramientas que permiten organizar tus platillos, agregar notas 
          personalizadas y guardar tus recetas favoritas para consultarlas cuando lo necesites.{"\n\n"}

          La aplicación está pensada tanto para principiantes que se están adentrando al mundo 
          culinario, como para personas con experiencia que desean nuevas ideas o técnicas 
          más sostenibles. Con filtros inteligentes, listado de recetas, funciones de búsqueda 
          y un apartado de favoritos editable, CHEFBYTE te permite crear tu propio recetario digital.{"\n\n"}

          Nuestra misión es fomentar una cocina creativa, responsable y accesible,
          donde cada usuario pueda aprender y disfrutar del proceso de preparar alimentos,
          sin complicaciones y con un enfoque sustentable.{"\n\n"}

          Gracias por ser parte de esta propuesta culinaria.
          ¡Cocinemos juntos con conciencia, sabor y creatividad!
        </Text>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600' },
  title: { fontWeight: '700', marginBottom: 10 },
  paragraph: { lineHeight: 22 },
  dark: { backgroundColor: '#121212' },
  light: { backgroundColor: '#fff' },
  textDark: { color: '#fff' },
  textLight: { color: '#222' },
});
