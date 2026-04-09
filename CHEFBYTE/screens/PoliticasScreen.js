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
    Políticas de Privacidad
  </Text>

  <Text style={[text, { fontSize }]}>
    CHEFBYTE respeta y protege tu información personal. Al utilizar la aplicación, 
    aceptas la recopilación y uso de datos descritos en esta Política de Privacidad.{"\n\n"}

    1. Información que Recopilamos{"\n"}
    CHEFBYTE puede recopilar información básica del usuario, como:{"\n"}
    • Preferencias culinarias y alimentos guardados.{"\n"}
    • Historial de búsqueda y acciones dentro de la aplicación.{"\n"}
    • Información proporcionada voluntariamente en notas, descripciones o recetas guardadas.{"\n"}
    En ningún momento se solicita información médica, financiera o datos sensibles.{"\n\n"}

    2. Uso de la Información{"\n"}
    La información recopilada se utiliza para:{"\n"}
    • Mejorar la experiencia y personalización de recetas.{"\n"}
    • Recomendar alimentos y sugerencias sustentables.{"\n"}
    • Guardar tus favoritos, notas y descripciones.{"\n"}
    • Optimizar el rendimiento de la aplicación.{"\n\n"}

    3. Información Generada por el Usuario{"\n"}
    Cualquier dato agregado por el usuario, como notas personales o descripciones, 
    es responsabilidad exclusiva del usuario. CHEFBYTE no modifica ni interviene en esta información, 
    pero puede almacenarla con el único fin de permitir su consulta, edición o eliminación dentro de la app.{"\n\n"}

    4. Compartición de Datos con Terceros{"\n"}
    CHEFBYTE NO vende, intercambia ni comparte datos personales con terceros, a menos que:{"\n"}
    • Exista obligación legal.{"\n"}
    • Sea necesario para mantener el funcionamiento de la aplicación, siempre garantizando el uso seguro y limitado de los datos.{"\n"}
    No compartimos información comercial ni publicitaria sin tu consentimiento.{"\n\n"}

    5. Seguridad de la Información{"\n"}
    Implementamos medidas técnicas para proteger tus datos contra accesos no autorizados. 
    Sin embargo, ningún sistema es completamente seguro, y el usuario acepta este riesgo al usar la aplicación.{"\n\n"}

    6. Publicidad y Cookies{"\n"}
    CHEFBYTE no utiliza cookies ni rastreadores externos dentro de la app. 
    Sin embargo, puede usar herramientas internas de análisis para medir rendimiento y preferencias, 
    sin identificar de forma personal al usuario.{"\n\n"}

    7. Retención de Datos{"\n"}
    Los datos guardados por el usuario permanecerán almacenados mientras la app esté instalada en el dispositivo. 
    Si desinstalas CHEFBYTE, toda la información puede eliminarse de forma permanente.{"\n\n"}

    8. Derechos del Usuario{"\n"}
    El usuario puede en cualquier momento:{"\n"}
    • Editar o eliminar sus notas y favoritos.{"\n"}
    • Solicitar aclaraciones sobre la privacidad.{"\n"}
    • Interrumpir el uso de la aplicación si no está de acuerdo con esta política.{"\n\n"}

    9. Privacidad de Menores{"\n"}
    CHEFBYTE no está dirigida a menores de 13 años sin supervisión de un adulto. 
    Al utilizar la app, confirmas que cumples esta condición o cuentas con supervisión.{"\n\n"}

    10. Contacto{"\n"}
    Si tienes dudas sobre esta Política de Privacidad, puedes contactarnos al correo:{"\n"}
    124048797@upq.edu.mx{"\n\n"}

    Al continuar utilizando CHEFBYTE, confirmas que has leído, comprendido y aceptas esta Política de Privacidad.
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
