import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Pressable, Alert, FlatList, TextInput} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../../../navigation';
import {PermissionsAndroid} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import {addWifiNetworks} from '../../redux/actions/actions';
import {WifiNetworkWithLocation} from '../../redux/actionTypes/actionTypes';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';


type MainTabsNavigationProp = NativeStackNavigationProp<
  BottomTabParamList,
  'Wifi'
>;
type PropTypes = {
  navigation: MainTabsNavigationProp;
};

const WifiModule: React.FC<PropTypes> = ({navigation}: PropTypes) => {
  const dispatch = useDispatch();
  const [wifiNetworks, setWifiNetworks] = useState<WifiNetworkWithLocation[]>(
    [],
  );
  const [selectedSSID, setSelectedSSID] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const scanWifiNetworks = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Помилка',
        'Неможливо сканувати мережі без дозволу геолокації. Увімкніть геолокацію.',
      );
      return;
    }

    try {
      const networks = await WifiManager.loadWifiList();
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const networksWithLocation = networks.map(network => ({
            ...network,
            latitude,
            longitude,
          }));
          setWifiNetworks(networksWithLocation);
          dispatch(addWifiNetworks(networksWithLocation));
        },
        error => {
          Alert.alert(
            'Помилка',
            `Не вдалося отримати геопозицію: ${error.message}`,
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      Alert.alert('Помилка', 'Помилка сканування мереж. Увімкніть геолокацію');
    }
  };

  const connectToWifi = async () => {
    if (!selectedSSID) {
      Alert.alert('Помилка', 'Не обрано мережу WiFi.');
      return;
    }
    try {
      await WifiManager.connectToProtectedSSID(
        selectedSSID,
        password,
        false,
        true,
      );
      Alert.alert('Успіх!', `Підключено до мережі ${selectedSSID}`);
    } catch (error) {
      Alert.alert(
        'Помилка',
        'Помилка підключення до WiFi. Перевірте ваш пароль.',
      );
    }
  };

  return (
    <View style={styles.layout}>
      <Pressable onPress={scanWifiNetworks} style={styles.pressable}>
        <Text style={styles.networkText}>Почати пошук WIFI мереж...</Text>
      </Pressable>

      {wifiNetworks.length > 0 && (
        <>
          <Text style={styles.text}>Доступні мережі. Оберіть одну: </Text>
          <FlatList
            style={styles.list}
            data={wifiNetworks}
            keyExtractor={item => item.BSSID}
            renderItem={({item}) => (
              <Pressable
                style={styles.networkItem}
                onPress={() => setSelectedSSID(item.SSID)}>
                <Text style={styles.networkText}>{item.SSID}</Text>
                <Text style={styles.networkText}>{item.level + ' dBm'}</Text>
              </Pressable>
            )}
          />
        </>
      )}

      {selectedSSID && (
        <View style={styles.connectionContainer}>
          <Text style={styles.selectedSSID}>Обрана мережа: {selectedSSID}</Text>
          <TextInput
            style={styles.passwordInput}
            placeholder="Введіть WiFi пароль"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.button} onPress={connectToWifi}>
            <Text style={styles.buttonText}>Підключити</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default WifiModule;
