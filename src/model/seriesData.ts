export interface SeismicityData {
  timestamp: number;
  count: number;
}

export interface EdmData {
  timestamp: number;
  slope_distance: number;
}

export interface SeriesDataItemTypeMap {
  Seismicity: SeismicityData;
  Edm: EdmData;
}
