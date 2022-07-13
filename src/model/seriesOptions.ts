export enum PlotType {
  Line,
  Bar,
  Scatter,
}

export interface SeriesOptionsCommon {
  name: string;
  visible: boolean;
  plotType: PlotType;
}

export interface SeismicityRequiredOptions {
  eventType: string;
}

export interface EdmRequiredOptions {
  benchmark: string;
  reflector: string;
}

export type SeriesOptions<T> = T & SeriesOptionsCommon;

export type SeismicitySeriesOptions = SeriesOptions<SeismicityRequiredOptions>;

export type EdmSeriesOptions = SeriesOptions<EdmRequiredOptions>;

export interface SeriesOptionsMap {
  Seismicity: SeismicitySeriesOptions;
  Edm: EdmSeriesOptions;

  // // Seismic
  // Seismicity: SeismicitySeriesOptions;
  // Rsam: Record<string, unknown>;
  // SeismicEnergy: Record<string, unknown>;
  // RfapEquivalentEnergy: Record<string, unknown>;
  // // EDM
  // EDM: EdmSeriesOptions;
  // // GPS
  // GPS: Record<string, unknown>;
  // // Tiltmeter
  // Tiltmeter: Record<string, unknown>;
  // // Geochemistry
  // Vogamos: Record<string, unknown>;
  // DOAS: Record<string, unknown>;
  // // Lava Dome
  // LavaDome: Record<string, unknown>;
  // // Weather
  // Weather: Record<string, unknown>;
  // // Observation
  // RfCount: Record<string, unknown>;
  // ApCount: Record<string, unknown>;
  // RfDistance: Record<string, unknown>;
  // ApDistance: Record<string, unknown>;
  // RfapMaxDistance: Record<string, unknown>;
  // // Magnetic
  // Magnetic: Record<string, unknown>;
}

export type SeriesType = keyof SeriesOptionsMap;
