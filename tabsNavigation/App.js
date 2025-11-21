import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/home';
import Profile from './screens/profile';
import Settings from './screens/settings';
import Detalle from './screens/detalle';  

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackEnDetalle() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Detalle" component={Detalle} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home-outline';
            if (route.name === 'ProfileStack') iconName = 'person-outline';
            if (route.name === 'Settings') iconName = 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="ProfileStack" component={StackEnDetalle} options={{ title: "Profile", headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
