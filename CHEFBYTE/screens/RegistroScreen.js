import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function RecetaScreen({ route, navigation }) {
  // route.params puede traer receta; si no, mostrar demo
  const receta = route?.params?.receta ?? {
    titulo: 'Pay de limón',
    imagen: 'https://www.gourmet.cl/wp-content/uploads/2022/11/Pay-de-limon-1.jpg',
    instrucciones: ['Preparar base', 'Hacer relleno', 'Refrigerar']
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CHEFBYTE</Text>
        <Text style={styles.subtitle}>Recetas Sustentables</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>{receta.titulo}</Text>
        <Image source={{ uri: receta.imagen }} style={styles.image} />
        <Text style={styles.section}>Instrucciones</Text>
        {receta.instrucciones.map((s, i) => <Text key={i} style={styles.step}>{`Paso ${i+1}: ${s}`}</Text>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff' },
  header:{ flexDirection:'row', alignItems:'center', backgroundColor:'#c6e377', padding:12, borderRadius:12, margin:15 },
  logo:{ flex:1, fontWeight:'bold', color:'#1b5e20', fontSize:22 },
  subtitle:{ flex:1, color:'#1b5e20' },
  title:{ fontWeight:'700', fontSize:26, marginHorizontal:20, marginTop:10 },
  image:{ width:'90%', height:200, alignSelf:'center', borderRadius:12, marginVertical:12 },
  section:{ fontSize:20, fontWeight:'700', marginHorizontal:20, marginTop:10 },
  step:{ marginHorizontal:20, marginTop:6 }
});
