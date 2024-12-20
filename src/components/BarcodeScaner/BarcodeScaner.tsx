import React, {useCallback, useState, useEffect, useRef} from 'react';
import styles from './styles';
import {View, Text, Button, FlatList, Pressable, Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../../../navigation';
import {Barkoder, BarkoderView} from 'barkoder-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { addTextualData } from '../../redux/actions/actions';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import firestore from '@react-native-firebase/firestore';
const usersBarcodes = firestore().collection('barcodes');


const license =
  'PEmBIohr9EZXgCkySoetbwP4gvOfMcGzgxKPL2X6uqNoGwylCVOTPh0nA6zNPHWe-XPjNuyYKCRaLo8WneYaSkL4q6x3ykFoQaVJWrSMARU6r2tAy-I5PTwmJRKd3KsyhlAoEOzGyphPsu6CG3uIVofvv-ZxUwAHDUPOXYk2lzDyTETMMH2NJvCaFv94nxgoYvg2v1ehyXDf9pf6wMlpaVqS2pM8JvHaVvVHzAYn8R21V5Y_kZiPKwEuTmF13jiC';

type MainTabsNavigationProp = NativeStackNavigationProp<
  BottomTabParamList,
  'BarcodeScaner'
>;
type PropTypes = {
  navigation: MainTabsNavigationProp;
};

const BarcodeScaner: React.FC<PropTypes> = ({navigation}: PropTypes) => {
  const dispatch = useDispatch();

  const scannedData = useSelector((state: RootState) => state.main.scannedData);

  const [isScanning, setIsScanning] = useState<boolean>(false);
 
  const [barkoder, setBarkoder] = useState<Barkoder>(null);
  const [showList, setShowList] = useState(false);

  const onBarkoderViewCreated = async (_barkoder: Barkoder) => {
    try {
      await _barkoder.setBarcodeTypeEnabled(Barkoder.BarcodeType.ean13, true);

      await _barkoder.setRegionOfInterestVisible(true);
      await _barkoder.setZoomFactor(2.0);
      await _barkoder.setCloseSessionOnResultEnabled(false);
      await _barkoder.setMaximumResultsCount(200);
      await _barkoder.setDuplicatesDelayMs(0);
      await _barkoder.setMulticodeCachingDuration(3000);
      await _barkoder.setMulticodeCachingEnabled(true);
  
      setBarkoder(_barkoder);
    } catch (error) {
      console.error('Помилка ініціалізації сканеру', error);
    }
  };
const setToFirestore =(textualData:string) =>{
  usersBarcodes.add({
    name: textualData,
  })
  .then(() => {
    console.log('Поле додано в базу');
  });
};

  const startScanning = () => {
    if (!barkoder) return;

    setIsScanning(true);
    barkoder.startScanning(

      result => {
        const textualData = result.decoderResults[0]?.textualData || '';
        dispatch(addTextualData(textualData)); 
        setIsScanning(false);
        setToFirestore(textualData);
        setTimeout(() => barkoder.stopScanning(), 1000);
      },
      (error: any) => {
        console.error('Scanning error:', error);
        setIsScanning(false);
      },
    );
  };

  const stopScanning = () => {
    if (barkoder) {
      barkoder.stopScanning();
      setIsScanning(false);
    }
  };

  const setList = useCallback(() => {
    setShowList(!showList);
  },[showList]);


  return (
    <SafeAreaView style={styles.layout}>

      <BarkoderView
        style={styles.barkoderView}
        licenseKey={license}
        onBarkoderViewCreated={(barkoder: Barkoder) =>
          onBarkoderViewCreated(barkoder)
        }
      /> 
     <View style={styles.btnContainer}>
        <Button
          title="Відсканувати"
          onPress={startScanning}
          disabled={isScanning}
        />
        <Button
          title="Зупинити сканування"
          onPress={stopScanning}
          disabled={!isScanning}
        />
      </View>
      <Pressable onPress={() => setList()} style={styles.pressable}>
      <Text style={styles.titleText}>{!showList ? "Переглянути штрихкоди" : "Вийти з режиму перегляду"}</Text>
      </Pressable>
     {showList && scannedData && (
      <FlatList
        data={scannedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <Text style={styles.text}>{index+1}{')'} {item}</Text>}
      />
    )}

    </SafeAreaView>
  );
};


export default BarcodeScaner;
