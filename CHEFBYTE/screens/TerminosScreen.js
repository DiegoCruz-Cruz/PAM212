import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppSettingsContext } from './AppSettingsContext';
import { Ionicons } from '@expo/vector-icons';

export default function PoliticasScreen({ navigation }) {
  const { darkMode, fontSize } = useContext(AppSettingsContext);
  const theme = darkMode ? styles.dark : styles.light;
  const text = darkMode ? styles.textDark : styles.textLight;

  return (
    <View style={[styles.container, theme]}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#000'} />
        <Text style={[styles.backText, { color: darkMode ? '#fff' : '#000', fontSize }]}>Volver</Text>
      </TouchableOpacity>

      <ScrollView>
  <Text style={[styles.title, text, { fontSize: fontSize + 4 }]}>
    Términos y Condiciones
  </Text>

  <Text style={[text, { fontSize }]}>
    Bienvenido a CHEFBYTE, una aplicación que ofrece recetas sustentables, 
    recomendaciones, información culinaria y herramientas para que los usuarios 
    organicen sus alimentos. Al utilizar la aplicación, aceptas los siguientes 
    Términos y Condiciones:{"\n\n"}

    1. Aceptación del Servicio{"\n"}
    Al acceder o utilizar CHEFBYTE, aceptas cumplir estos términos. 
    Si no estás de acuerdo, te recomendamos no utilizar la aplicación.{"\n\n"}

    2. Uso de la Aplicación{"\n"}
    CHEFBYTE proporciona recetas, consejos alimentarios, buscador inteligente 
    y funciones para guardar favoritos y notas. Estos contenidos se ofrecen solo 
    con fines informativos, educativos y de organización personal, no constituyen 
    asesoría profesional nutricional o médica.{"\n\n"}

    3. Responsabilidad del Usuario{"\n"}
    El usuario es responsable del uso que realice de la aplicación.{"\n"}
    CHEFBYTE no garantiza que los alimentos o ingredientes recomendados 
    sean adecuados para todas las personas.{"\n"}
    El usuario debe verificar alergias, restricciones alimentarias y 
    condiciones de salud antes de preparar cualquier receta.{"\n\n"}

    4. Propiedad Intelectual{"\n"}
    Todo el contenido, incluyendo recetas, imágenes, diseño de interfaz, 
    iconos y marcas, es propiedad de CHEFBYTE o de sus licenciantes. 
    No está permitido reproducir, modificar, vender o distribuir el contenido 
    sin autorización previa.{"\n\n"}

    5. Contenido Generado por el Usuario{"\n"}
    Las notas personales, descripciones y datos ingresados por el usuario 
    dentro de CHEFBYTE son responsabilidad exclusiva del usuario. 
    CHEFBYTE podrá almacenar esta información solo para mejorar la experiencia 
    y funcionalidad de la aplicación.{"\n\n"}

    6. Limitación de Responsabilidad{"\n"}
    CHEFBYTE no se hace responsable de:{"\n"}
    • Daños derivados de la preparación o consumo de ingredientes sugeridos.{"\n"}
    • Errores en la información nutricional estimada o recomendaciones generadas automáticamente.{"\n"}
    • Disponibilidad, precios o calidad de los ingredientes mencionados.{"\n\n"}

    7. Modificaciones del Servicio{"\n"}
    CHEFBYTE se reserva el derecho de modificar, suspender o actualizar 
    funcionalidades, recetas o información sin previo aviso.{"\n\n"}

    8. Privacidad y Tratamiento de Datos{"\n"}
    CHEFBYTE puede recopilar información básica con fines de mejora 
    y personalización. No compartiremos datos personales con terceros 
    sin tu autorización, de acuerdo con nuestra Política de Privacidad.{"\n\n"}

    9. Edad Mínima de Uso{"\n"}
    El uso de CHEFBYTE está destinado a personas mayores de 13 años. 
    Si eres menor de edad, debes utilizarla bajo supervisión de un adulto.{"\n\n"}

    10. Contacto{"\n"}
    Si tienes dudas sobre estos términos, puedes comunicarte con:{"\n"}
    124048797@upq.edu.mx{"\n\n"}

    Al crear una cuenta, descargar o utilizar la aplicación, confirmas 
    que has leído y aceptas estos Términos y Condiciones.
  </Text>
</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600' },
  title:{ fontWeight:'700', marginBottom:10 },
  dark:{ backgroundColor:'#121212' }, 
  light:{ backgroundColor:'#fff' },
  textDark:{ color:'#fff' }, 
  textLight:{ color:'#222' }
});
