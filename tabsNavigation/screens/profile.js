import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Profile({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Text style={styles.title}>Perfil usuario</Text>

                <Pressable
                    style={[styles.button, styles.buttonProfile]}
                    onPress={() => navigation.navigate('Detalle')}
                >
                    <Text style={styles.buttonText}>Detalles de usuario</Text>
                </Pressable>

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

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },

  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  button: {
    paddingVertical: 7,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
    align: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonProfile: {
    backgroundColor: '#007BFF',
  },
});
