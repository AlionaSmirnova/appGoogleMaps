import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Alert, Platform, Pressable, FlatList} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../../../navigation';
import {BleManager, Device} from 'react-native-ble-plx';
import { setDevices, addDevice } from '../../redux/actions/actions';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

type MainTabsNavigationProp = NativeStackNavigationProp<
  BottomTabParamList,
  'Bluetooth'
>;
type PropTypes = {
  navigation: MainTabsNavigationProp;
};

const BluetoothModule: React.FC<PropTypes> = ({navigation}: PropTypes) => {
  const [bleManager] = useState(new BleManager());
  const [scanning, setScanning] = useState(false);
  const dispatch = useDispatch();

  const savedDevicesData = useSelector((state: RootState) => state.main.devices);

  useEffect(() => {
    return () => {
      bleManager.destroy();
    };
  }, [bleManager]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      const allGranted = Object.values(granted).every(
        permission => permission === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (!allGranted) {
        Alert.alert(
          'Permissions denied',
          'Bluetooth дозволи на використання обовʼязкові.',
        );
        return false;
      }
    }
    return true;
  };

  const scanDevices = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setScanning(true);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {

        Alert.alert('Помилка', 'Помилка сканування девайсів: увімкніть Bluetooth!');
        setScanning(false);
        return;
      }
      console.log(device?.name,'device');

      if (device && device.localName && device.name) {
        dispatch(addDevice({ id: device.id, name: device.name }));
      }
    });
    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
      Alert.alert('Сканування завершено');
    }, 20000);
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Pressable
        style={{
          backgroundColor: scanning ? '#ccc' : '#007BFF',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={scanDevices}
        disabled={scanning}>
        <Text style={{color: '#fff', fontSize: 16}}>
          {scanning ? 'Сканується...' : 'Пошук девайсів'}
        </Text>
      </Pressable>
      <FlatList
      data={savedDevicesData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={{
            padding: 15,
            backgroundColor: '#f8f8f8',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, color:'#000000' }}>{item.name || 'Невідомий пристрій'}</Text>
          <Text style={{ fontSize: 12, color: '#555' }}>{item.id}</Text>
        </Pressable>
      )}
    />
    </View>
  );
};

export default BluetoothModule;
