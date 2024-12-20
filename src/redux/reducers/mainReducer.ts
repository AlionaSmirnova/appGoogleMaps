import {

  ADD_TEXTUAL_DATA,
  ADD_DEVICE,SET_DEVICES,
  ADD_WIFI_NETWORKS,
  WifiNetworkWithLocation
} from '../actionTypes/actionTypes';

export interface MainState {

  scannedData: any[];
  devices: { id: string; name: string | null }[];
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

    case ADD_TEXTUAL_DATA:
      return {
        ...state,
        scannedData: [...state.scannedData, action.payload], // Добавляем новые данные в массив
      };
      case ADD_DEVICE:
        const exists = state.devices.some((d) => d.id === action.payload.id);
        return exists
          ? state
          : { ...state, devices: [...state.devices, action.payload] };
      case SET_DEVICES:
        return { ...state, devices: action.payload };
        case ADD_WIFI_NETWORKS:
          return {
            ...state,
            networks: [...state.networks, ...action.payload],
          };

    default:
      return state;
  }
};
