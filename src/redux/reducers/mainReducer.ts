import {
  ADD_BARCODE,
  ADD_DEVICE,
  SET_DEVICES,
  ADD_WIFI_NETWORKS,
  WifiNetworkWithLocation,
  BarcodeData,
} from '../actionTypes/actionTypes';

export interface MainState {
  scannedData: BarcodeData[];
  devices: {id: string; name: string | null}[];
  networks: WifiNetworkWithLocation[];

}

const initialState: MainState = {
  scannedData: [],
  devices: [],
  networks: [],
};

export const mainReducer = (
  state = initialState,
  action: {type: string; payload?: number},
): MainState => {
  switch (action.type) {
    case ADD_BARCODE:
      const existsData = state.scannedData.some(
        (barcode) => barcode.value === action.payload.value
      );
      if (existsData) return state;

      return {
        ...state,
        scannedData: [...state.scannedData, action.payload],
      };
   
    case ADD_DEVICE:
      const exists = state.devices.some(d => d.id === action.payload.id);
      return exists
        ? state
        : {...state, devices: [...state.devices, action.payload]};
    case SET_DEVICES:
      return {...state, devices: action.payload};
    case ADD_WIFI_NETWORKS:
      return {
        ...state,
        networks: [...state.networks, ...action.payload],
      };

    default:
      return state;
  }
};
