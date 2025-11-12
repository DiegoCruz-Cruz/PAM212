import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false); 

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplo del componente Modal</Text>

      <Button color='#610dcfff' title="Abrir Modal" onPress={abrirModal} /> 

      <Modal 
        animationType="fade"            
        transparent={true}               
        visible={modalVisible}           
        onRequestClose={cerrarModal}   
      >

        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Hola! Este es un Modal.</Text>
            <Button color='#610dcfff' title="Cerrar" onPress={cerrarModal} /> {/* PROP onPress: cierra modal */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7e0202ff',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
  },
});