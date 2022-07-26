export interface ParameterConfigCommon {
  visible: boolean;
}

export type ParameterConfig<T> = T & ParameterConfigCommon;

export interface SeismicityParameterConfig {
  eventType: string;
}

export enum EdmParameterType {
  SlopeDistance,
  CSD,
  Rate,
}

export interface EdmParameterConfig {
  benchmark: string;
  reflector: string;
  type: EdmParameterType;
}

export interface SeismicEnergyParameterConfig {
  type: 'total' | 'vta' | 'vtbmp';
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RfapEnergyParameterConfig {}

export type SeismicityConfig = ParameterConfig<SeismicityParameterConfig>;
export type EdmConfig = ParameterConfig<EdmParameterConfig>;
export type SeismicEnergyConfig = ParameterConfig<SeismicEnergyParameterConfig>;
export type RfapEnergyConfig = ParameterConfig<RfapEnergyParameterConfig>;

export type ParameterConfigType =
  | SeismicityConfig
  | EdmConfig
  | SeismicEnergyConfig
  | RfapEnergyConfig;

export interface ParameterConfigMap {
  Seismicity: SeismicityConfig;
  Edm: EdmConfig;
  SeismicEnergy: SeismicEnergyConfig;
  RfapEnergy: RfapEnergyConfig;
}

export type DataType = keyof ParameterConfigMap;

export interface SeismicityData {
  timestamp: string;
  count: number | null;
}

export interface EdmData {
  timestamp: string;
  slope_distance: number;
  csd: number;
  dt: number;
  rate: number;
}

export interface SeismicEnergyData {
  timestamp: string;
  energy: number | null;
}

export interface RfapEnergyData {
  timestamp: string;
  count: number;
  energy: number;
  count_ROCKFALL: number;
  count_AWANPANAS: number;
}

export interface DataItemTypeMap {
  Seismicity: SeismicityData;
  Edm: EdmData;
  SeismicEnergy: SeismicEnergyData;
  RfapEnergy: RfapEnergyData;
}

export enum DateIntervalType {
  Relative,
  Offset,
  Ytd,
  Custom,
}

export interface DateInterval {
  start: string;
  end: string;
}

export type DataRepository = Record<string, unknown>;

export interface SeriesConfig<T extends DataType = DataType> {
  dataType: T;
  config: ParameterConfigMap[T];
}

export interface SubplotConfig<T extends DataType = DataType> {
  dataType: T;
  series: SeriesConfig[];
}
