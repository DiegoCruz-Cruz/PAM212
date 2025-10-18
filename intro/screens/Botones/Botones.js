import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from 'react-native';

export default function BotonesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tipos de Botones en React Native</Text>

      {/* 1. Button nativo */}
      <Text style={styles.title}>1. Button (nativo)</Text>
      <Button title="Presionar" onPress={() => alert("Botón básico")} />

      {/* 2. TouchableOpacity */}
      <Text style={styles.title}>2. TouchableOpacity</Text>
      <TouchableOpacity style={styles.btnOpacity} onPress={() => alert("Opacity")}>
        <Text style={styles.text}>Botón Opacity</Text>
      </TouchableOpacity>

      {/* 3. TouchableHighlight */}
      <Text style={styles.title}>3. TouchableHighlight</Text>
      <TouchableHighlight
        style={styles.btnHighlight}
        underlayColor="#002a3dff"
        onPress={() => alert("Highlight")}
      >
        <Text style={styles.text}>Botón Highlight</Text>
      </TouchableHighlight>

      {/* 4. TouchableWithoutFeedback */}
      <Text style={styles.title}>4. TouchableWithoutFeedback</Text>
      <TouchableWithoutFeedback onPress={() => alert("Sin feedback")}>
        <View style={styles.btnNoFeedback}>
          <Text style={styles.text}>Sin feedback</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* 5. Pressable */}
      <Text style={styles.title}>5. Pressable</Text>
      <Pressable
        onPress={() => alert("Pressable!")}
        style={({ pressed }) => [
          styles.btnPressable,
        {     
            backgroundColor: pressed ? "#ff7043" : "#66bb6a",
            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
            opacity: pressed ? 0.7 : 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: pressed ? 1 : 4 },
            shadowOpacity: pressed ? 0.3 : 0.6,
            shadowRadius: pressed ? 2 : 4,
        },
        ]}
      > 
        <Text style={styles.text}>Botón Pressable</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    color: "#333",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  btnOpacity: {
    backgroundColor: "#2a9fffff",
    padding: 10,
    borderRadius: 8,
  },
  btnHighlight: {
    backgroundColor: "#29b6f6",
    padding: 10,
    borderRadius: 8,
  },
  btnNoFeedback: {
    backgroundColor: "#ab47bc",
    padding: 10,
    borderRadius: 8,
  },
  btnPressable: {
    padding: 10,
    borderRadius: 8,
  },
  btnNative: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});