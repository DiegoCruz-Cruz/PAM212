import { useState, useEffect, useRef } from 'react' 
import { Text, StyleSheet, View, Pressable, Animated } from 'react-native'

export default function SwitchButton({ temporal, isButton }) {

  const toggle = useRef(new Animated.Value(temporal ? 1 : 0)).current
  const [value, setValue] = useState(temporal)

  useEffect(() => {
    Animated.timing(toggle, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false
    }).start()
  }, [value])

  const animatedStyles = {
    transform: [
      {
        translateX: toggle.interpolate({
          inputRange: [0, 1],
          outputRange: [2.5, 25.4],
          extrapolate: 'clamp'
        })
      }
    ]
  }

  return (
    <View style={styles.container}>
      {isButton ? (

        <Pressable onPress={() => setValue(!value)}>
          {}
          <View style={[styles.button, { backgroundColor: value ? '#14949c' : '#adadad' }]}>
            {}
            <Animated.View style={[styles.circle, animatedStyles]} />
            {}
            <View style={[styles.titlebox, { left: value ? 8 : 27 }]}>
              <Text style={styles.titletext}>{value ? 'on' : 'off'}</Text>
            </View>
          </View>
        </Pressable>
      ) : (

        <View style={[styles.button, { backgroundColor: value ? '#14949c' : '#adadad' }]}>
          <Animated.View style={[styles.circle, animatedStyles]} />
          <View style={[styles.titlebox, { left: value ? 8 : 27 }]}>
            <Text style={styles.titletext}>{value ? 'on' : 'off'}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  button: {
    width: 48,
    height: 24.8,
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 35,
    overflow: 'hidden'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 35,
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0
  },
  titlebox: {
    position: 'absolute'
  },
  titletext: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 7.5,
    paddingBottom: 1.5
  }
})