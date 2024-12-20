import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import App from '../src/components/Main/App';
import BarcodeScaner from '../src/components/BarcodeScaner/BarcodeScaner';
import MapsModule from '../src/components/MapsModule/MapsModule';
import BluetoothModule from '../src/components/BluetoothModule/BluetoothModule';
import WifiModule from '../src/components/WiFiModule/WifiModule';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




export type BottomTabParamList = {
  BarcodeScaner: undefined;
  Bluetooth: undefined;
  Wifi: undefined;
  Maps: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<BottomTabParamList>();

function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
            // tabBarIcon: ({ focused, color, size }) => {
            //   let iconName;
  
            //   if (route.name === 'Home') {
            //     iconName = focused ? 'home' : 'home-outline';
            //   } else if (route.name === 'Profile') {
            //     iconName = focused ? 'person' : 'person-outline';
            //   } else if (route.name === 'Settings') {
            //     iconName = focused ? 'settings' : 'settings-outline';
            //   }
  
            //   return <Ionicons name={iconName as any} size={size} color={color} />;
            // },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
           headerTintColor:'tomato',
          })}
      >
        <Tab.Screen name="BarcodeScaner" component={BarcodeScaner} />
        <Tab.Screen name="Wifi" component={WifiModule} />
        <Tab.Screen name="Bluetooth" component={BluetoothModule} />
        <Tab.Screen name="Maps" component={MapsModule} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabs;
