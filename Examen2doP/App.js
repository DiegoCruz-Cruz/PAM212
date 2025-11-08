import { StatusBar } from 'expo-status-bar';
import { ScrollView,  StyleSheet, Text, View, Image, Button } from 'react-native';

const SimpleHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>EL MULTIVERSAL</Text>
    </View>
  );
};

//  <>    =>

export default function SimpleScrollView() {
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <ScrollView 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <Text style={styles.subtitle}>!Midas regresa a la tienda¡</Text>
          <Text style={styles.fecha}>05 de noviembre del 2025</Text>
          <Text style={styles.descrip}>La legendaria skin de Midas regresará a la tienda a fortnite, después de tantas especulaciones acerca de su regreso, por fin los creadores de fortnite decidieron implementarlo en la tienda para su venta a todos los que puedan comprarla, esta es una excelente noticia para todos los jugadores.</Text>
           
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>!Apple iPhone 17 Pro Max de 256 GB Naranja cósmico¡</Text>
          <Text style={styles.fecha}>06 de noviembre del 2025</Text>
          <Text style={styles.descrip}>El iPhone más potente hasta la fecha. Nuestra mejor pantalla hasta la fecha con Ceramic Shield 2 en la parte frontal, el potente chip A19 Pro, cámaras traseras de 48 MP y la nueva cámara frontal Center Stage. Estructura unibody. La innovación hace la fuerza.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>!Apple iPhone 17 Pro Max de 256 GB Naranja cósmico¡</Text>
          <Text style={styles.fecha}>06 de noviembre del 2025</Text>
          <Text style={styles.descrip}>!Soy una tarjeta¡</Text>
        </View>

      </ScrollView>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {//agrega
    flex: 1,
  },
  header: {
    height: 120,
    backgroundColor: '#181D31',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  card: {
    width: 700,
    height: 700,
    backgroundColor: '#E6DDC4',
    marginLeft: 10,

    marginVertical: 10,
  },
  subtitle: {
    fontSize: 30,
    color: '#181D31',
    fontWeight: 'bold',
  },
  fecha: {
    color: '#5c5d5eff',
  },
  descrip: {
    color: '#181D31',
    fontWeight: 'bold',
  },
    navIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  iconCircle: {
    width: 50,       
    height: 50,
    borderRadius: 25, 
    backgroundColor: "#A084E8",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,  
  },
    bottomNav: {
    position: "absolute",
    bottom: 10,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#eae2ff",
    paddingVertical: 12,
    borderRadius: 30,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#A084E8",
    justifyContent: "center",
    alignItems: "center",
  },

  navIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },

  centerButton: {
    backgroundColor: "#7f6aff",
    padding: 15,
    borderRadius: 40,
    marginBottom: 25,
  },
}); 