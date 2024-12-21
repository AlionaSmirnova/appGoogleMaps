import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../../../navigation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;

type MainTabsNavigationProp = NativeStackNavigationProp<
  BottomTabParamList,
  'Maps'
>;
type PropTypes = {
  navigation: MainTabsNavigationProp;
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  wifiMarker:{
    backgroundColor:'yellow',
  }
});

const MapsModule: React.FC<PropTypes> = ({navigation}: PropTypes) => {
  const networksData = useSelector((state: RootState) => state.main.networks);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    getLocation();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access to location',
          message:
            'This app needs access to your location to show your position on the map.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to access your current location.',
      );
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
      },
      error => {
        Alert.alert('Помилка', `Увімкніть геолокацію!`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        followsUserLocation={true}
        region={
          userLocation
            ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }
            : undefined
        }
        showsUserLocation={true}>
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Ви тут"
            description={userLocation.latitude.toString()}
          />
        )}
        {networksData && networksData.length &&
          networksData.map((item, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.SSID}
                description={item.latitude?.toString()}
                pinColor={'green'}
              />
            );
          })}
      </MapView>
    </View>
  );
};

export default MapsModule;
