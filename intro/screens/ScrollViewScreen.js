// screens/ScrollViewScreen.js
import React, { useRef } from 'react';
import { View, Animated, ScrollView, Text, StyleSheet, Button } from 'react-native';

export default function ScrollViewScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [200, 80],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.title}>Ejemplo ScrollView</Text>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {[...Array(15)].map((_, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.text}>Elemento {i + 1}</Text>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', paddingTop: 30 },
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  text: { fontSize: 16 },
});
