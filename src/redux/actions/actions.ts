import {
  ADD_TEXTUAL_DATA,
  ADD_DEVICE,
  SET_DEVICES,
  ADD_WIFI_NETWORKS,
  WifiNetworkWithLocation,
} from '../actionTypes/actionTypes';


export const addTextualData = (textualData: string) => ({
  type: ADD_TEXTUAL_DATA,
  payload: textualData,
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
