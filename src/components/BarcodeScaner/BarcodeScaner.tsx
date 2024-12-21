import React, {useCallback, useState, useEffect, useRef} from 'react';
import styles from './styles';
import {
  View,
  Text,
  Button,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../../../navigation';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {addBarcode} from '../../redux/actions/actions';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
  getCameraDevice,
  CodeScanner,
} from 'react-native-vision-camera';

import {runOnJS} from 'react-native-reanimated';

import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import firestore from '@react-native-firebase/firestore';

const usersBarcodes = firestore().collection('barcodes');

type MainTabsNavigationProp = NativeStackNavigationProp<
  BottomTabParamList,
  'BarcodeScaner'
>;
type PropTypes = {
  navigation: MainTabsNavigationProp;
};

const BarcodeScaner: React.FC<PropTypes> = ({navigation}: PropTypes) => {
  const [isActiveCamera, setIsActiveCamera] = useState(false);
  const scannedData = useSelector((state: RootState) => state.main.scannedData);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const devices = useCameraDevices();
  const device = getCameraDevice(devices, 'back');
  const dispatch = useDispatch();

  const [showList, setShowList] = useState(false);

  const [isScanning, setIsScanning] = useState<boolean>(true);

  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      console.log(cameraPermission);
      setHasPermission(cameraPermission === 'granted');
    };

    getPermissions();
  }, []);

  const setList = useCallback(() => {
    setShowList(!showList);
  }, [showList]);

  const setToFirestore = (type: string, value: string) => {
    usersBarcodes
      .add({
        type: type,
        value: value,
      })
      .then(() => {
        console.log('Поле додано в базу');
      });
  };
  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: codes => {
      for (const code of codes) {
        setIsScanning(false);
        dispatch(addBarcode({type: code.type, value: code.value}));
        setToFirestore(code.type, code.value);
        Alert.alert('Відскановано:', `${code.value}, ${code.type}`, [
          {
            text: 'OK',
            onPress: () => setIsScanning(true), // Stop scanning after alert
          },
        ]);
      }
    },
  });

  if (device == null) return <Text>Loading camera...</Text>;
  if (!hasPermission) return <Text>No camera permission</Text>;

  return (
    <View style={styles.container}>
      {isActiveCamera && (
        <Camera
          style={styles.scanner}
          device={device}
          isActive={true}
          frameProcessorFps={2}
          // {...props}
          codeScanner={isScanning ? codeScanner : undefined}
        />
      )}

      <View style={styles.btnContainer}>
        <Pressable
          onPress={() => setIsActiveCamera(!isActiveCamera)}
          style={styles.pressable}>
          <Text style={styles.titleText}>
            {isActiveCamera ? 'Вимкнути сканування' : 'Почати сканування'}
          </Text>
        </Pressable>
        <Pressable onPress={() => setList()} style={styles.pressable}>
          <Text style={styles.titleText}>
            {!showList ? 'Переглянути штрихкоди' : 'Вийти з режиму перегляду'}
          </Text>
        </Pressable>
        {showList && scannedData && (
          <FlatList
            data={scannedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Text style={styles.text}>
                {index + 1}
                {')'}
                {item.value}, {item.type}
              </Text>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default BarcodeScaner;
