import React, { useContext } from 'react';
import { View, Text, Switch, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppSettingsContext } from './AppSettingsContext';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const { darkMode, fontSize, toggleDarkMode, increaseFontSize, decreaseFontSize } = useContext(AppSettingsContext);

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      {/* FLECHA VOLVER */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#0A4825'} />
        <Text style={[styles.backText, { color: darkMode ? '#fff' : '#0A4825' }]}>Volver</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text style={[styles.title, { fontSize: fontSize + 6 }]}>Ajustes</Text>

        <View style={styles.row}>
          <Text style={{ fontSize, color: darkMode ? '#fff' : '#000' }}>Modo oscuro</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <View style={styles.row}>
          <Text style={{ fontSize, color: darkMode ? '#fff' : '#000' }}>Tamaño fuente</Text>
          <View style={{ flexDirection:'row', gap:8 }}>
            <Button title="A-" onPress={decreaseFontSize} />
            <Button title="A+" onPress={increaseFontSize} />
          </View>
        </View>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('About')}>
          <Text style={{ color: darkMode ? '#fff' : '#0A4825' }}>Acerca de CHEFBYTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Politicas')}>
          <Text style={{ color: darkMode ? '#fff' : '#0A4825' }}>Políticas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Terminos')}>
          <Text style={{ color: darkMode ? '#fff' : '#0A4825' }}>Términos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16 },
  title:{ fontWeight:'700', marginBottom:12, color: '#0A4825' },
  row:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10 },
  link:{ marginTop:12, padding:10, borderBottomWidth:1, borderColor:'#eee' },

  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600', fontSize: 16 },

  dark:{ backgroundColor:'#121212' }, 
  light:{ backgroundColor:'#fff' }
});
