import {
    ADD_BARCODE,
  ADD_DEVICE,
  SET_DEVICES,
  ADD_WIFI_NETWORKS,
  WifiNetworkWithLocation,
  BarcodeData, 
} from '../actionTypes/actionTypes';


export const addBarcode = (barcode: BarcodeData) => ({
    type: ADD_BARCODE,
    payload: barcode,
  });
export const addDevice = (device: {id: string; name: string | null}) => ({
  type: ADD_DEVICE,
  payload: device,
});
export const setDevices = (devices: {id: string; name: string | null}[]) => ({
  type: SET_DEVICES,
  payload: devices,
});

export const addWifiNetworks = (networks: WifiNetworkWithLocation[]) => ({
  type: ADD_WIFI_NETWORKS,
  payload: networks,
});
