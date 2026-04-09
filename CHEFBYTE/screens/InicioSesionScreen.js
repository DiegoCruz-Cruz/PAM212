import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import UsuarioController from "../controllers/UsuarioController";
import Logo from "../assets/logo.png"; // ← LOGO IMPORTADO

export default function InicioSesionScreen({ navigation }) {
  const [modo, setModo] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Campos vacíos", "Completa todos los campos");
      return;
    }

    const usuario = await UsuarioController.login(email, password);

    if (usuario) {
      Alert.alert("Bienvenido", "Inicio de sesión exitoso");
      navigation.replace("Perfil");
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  const handleRegister = async () => {
    if (!nombre.trim() || !email.trim() || !password) {
      Alert.alert("Campos vacíos", "Completa todos los campos");
      return;
    }

    try {
      await UsuarioController.registrar(
        nombre,
        email,
        password,
        "default",
        null
      );

      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada");
      navigation.replace("Perfil");
    } catch (error) {
      Alert.alert("Error", "Este correo ya está registrado.");
    }
  };

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <Image source={Logo} style={styles.logo} />

      <Text style={styles.title}>
        {modo === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
      </Text>

      {modo === "register" && (
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
      )}

      <TextInput
        placeholder="Correo"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={modo === "login" ? handleLogin : handleRegister}
      >
        <Text style={styles.btnText}>
          {modo === "login" ? "Entrar" : "Registrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setModo(modo === "login" ? "register" : "login")
        }
      >
        <Text style={{ color: "#0a4825", marginTop: 10 }}>
          {modo === "login"
            ? "¿No tienes cuenta? Crear una"
            : "¿Ya tienes cuenta? Inicia Sesión"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },

  logo: {
    width: 240,
    height: 240,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain"
  },

  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center" },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  btn: {
    backgroundColor: "#0a4825",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
