export const ADD_BARCODE = 'ADD_BARCODE';
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_DEVICES = 'SET_DEVICES';

export const ADD_WIFI_NETWORKS = 'ADD_WIFI_NETWORKS';

export type WifiNetworkWithLocation = {
    SSID: string;
    BSSID: string;
    capabilities: string;
    frequency: number;
    level: number;
    timestamp: number;
    latitude: number | null;
    longitude: number | null;
  };

export type BarcodeData = {
    type: string |undefined;
    value: string |undefined;
  };