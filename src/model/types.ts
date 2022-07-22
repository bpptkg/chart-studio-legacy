export interface SeismicityParameterConfig {
  eventType: string;
}

export interface EdmParameterConfig {
  benchmark: string;
  reflector: string;
}

export interface SeismicEnergyParameterConfig {
  type: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RfapEnergyParameterConfig {}

export interface ParameterConfigMap {
  Seismicity: SeismicityParameterConfig;
  Edm: EdmParameterConfig;
  SeismicEnergy: SeismicEnergyParameterConfig;
  RfapEnergy: RfapEnergyParameterConfig;
}

export type DataType = keyof ParameterConfigMap;

export interface SubplotConfig<T extends DataType = DataType> {
  type: T;
  config: ParameterConfigMap[T];
}
