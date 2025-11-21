import { View, Text, StyleSheet, } from "react-native";

export default function Detalle() {
    return (
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Text style={styles.title}>Perfil usuario</Text>
                <Text style={styles.subtitle}>Detalles de usuario</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 27,
    color: '#000000ff',
  },
  subtitle: {
    fontSize: 17,
    color: '#1932b1ff',
  },
});