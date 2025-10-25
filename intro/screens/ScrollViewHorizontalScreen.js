import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const DATA = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
];

const SimpleHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>ScrollView Horizontal</Text>
    </View>
  );
};
// cambia la lin 27 estilo a container
const SimpleScrollView = () => {
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent} //agregar con estilo
      >
        {DATA.map(val => {
          return (
            <View style={styles.card} key={val.id}>
              <Text style={styles.subtitle}>!Soy una tarjeta¡</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SimpleScrollView;

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
  scrollContent: { //agrega
    paddingVertical: 10,
  },
  card: {
    width: 100, // se agrega
    height: 150, // cambia a 150
    backgroundColor: '#E6DDC4',
    marginLeft: 10, // Margintop
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, // Horizontal
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
});