import { Text, StyleSheet, View } from 'react-native'
import SwitchButton from './Switch'

export default function BotonesScreen() {
  const info = [
    { 
      id: 1,
      title: 'Mantener la pantalla encendida',
      value: false
    },
    {
      id: 2,
      title: 'Brillo',
      value: false
    },
    {
      id: 3,
      title: 'WiFi',
      value: false
    },
    {
      id: 4,
      title: 'Bluetooth',
      value: false
    },
  ]

  const Item = ({ title, value }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemBox}>
          <Text style={styles.itemtitle}>{title}</Text>
        </View>
        <View style={styles.switch}>
          <SwitchButton temporal={value} isButton={true} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.Encabezado}>
        <Text style={styles.EncabezadoTitle}>Configuración</Text>
      </View>
      <View style={styles.footer}>
        {info.map(x => (
          <Item key={x.id} title={x.title} value={x.value} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  Encabezado: {
    height: 75,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  EncabezadoTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#383838',
    marginLeft: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  item: {
    height: 55,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  itemBox: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemtitle: {
    fontSize: 15,
    fontWeight: '300',
    color: '#383838',
  },
  switch: {
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
