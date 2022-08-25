export interface YAxisOption {
  position?: 'left' | 'right'
}

export interface ParameterConfigCommon {
  visible?: boolean
  yAxis?: YAxisOption
}

export type ParameterConfig<T> = T & ParameterConfigCommon

export interface SeismicityParameterConfig {
  eventType: string
}

export interface EdmParameterConfig {
  benchmark: string
  reflector: string
  type: 'slope' | 'csd' | 'rate'
}

export interface SeismicEnergyParameterConfig {
  type: 'total' | 'vta' | 'vtbmp'
  aggregate: 'daily' | 'daily-cumulative'
}

export interface RfapEnergyParameterConfig {
  field:
    | 'count'
    | 'energy'
    | 'count-rf'
    | 'count-ap'
    | 'rfap-stack'
    | 'energy-cumulative'
}

export interface RsamSeismicParameterConfig {
  station: string
  band: string
  field: 'value' | 'value-cumulative'
}

export interface GpsBaselineParameterConfig {
  station1: string
  station2: string
}

export interface GpsCoordinateParameterConfig {
  station: string
  field: 'east' | 'north' | 'up'
}

export interface TiltmeterParameterConfig {
  type: 'platform' | 'borehole' | 'tlr'
  station: string
  field: 'x' | 'y' | 'temperature'
}

export interface VogamosEmissionParameterConfig {
  field: string
}

export interface VogamosTemperatureParameterConfig {
  field: string
}

export interface DoasParameterConfig {
  station: string
}

export interface LavaDomesParameterConfig {
  location: string
  field: string
}

export interface WeatherPasarbubarParameterConfig {
  field: string
}

export interface WeatherBabadanParameterConfig {
  field: string
}

export interface RainfallStationParameterConfig {
  station: string
}

export interface RfapDistanceParameterConfig {
  field: 'rf-count' | 'rf-dist' | 'ap-count' | 'ap-dist'
}

export interface RfapDirectionParameterConfig {
  field: 'count' | 'distance'
}

export interface RfapTypeParameterConfig {
  type: 'seen' | 'heard' | 'seen-heard'
  field: 'count' | 'distance'
}

export interface MagneticParameterConfig {
  station: string
  field: string
}

export interface ThermalParameterConfig {
  station: string
  area: string
  field: string
}

export type SeismicityConfig = ParameterConfig<SeismicityParameterConfig>
export type EdmConfig = ParameterConfig<EdmParameterConfig>
export type SeismicEnergyConfig = ParameterConfig<SeismicEnergyParameterConfig>
export type RfapEnergyConfig = ParameterConfig<RfapEnergyParameterConfig>
export type RsamSeismicConfig = ParameterConfig<RsamSeismicParameterConfig>
export type GpsBaselineConfig = ParameterConfig<GpsBaselineParameterConfig>
export type GpsCoordinateConfig = ParameterConfig<GpsCoordinateParameterConfig>
export type TiltmeterConfig = ParameterConfig<TiltmeterParameterConfig>
export type VogamosEmissionConfig =
  ParameterConfig<VogamosEmissionParameterConfig>
export type VogamosTemperatureConfig =
  ParameterConfig<VogamosTemperatureParameterConfig>
export type DoasConfig = ParameterConfig<DoasParameterConfig>
export type LavaDomesConfig = ParameterConfig<LavaDomesParameterConfig>
export type WeatherPasarbubarConfig =
  ParameterConfig<WeatherPasarbubarParameterConfig>
export type WeatherBabadanConfig =
  ParameterConfig<WeatherBabadanParameterConfig>
export type RainfallStationConfig =
  ParameterConfig<RainfallStationParameterConfig>
export type RfapDistanceConfig = ParameterConfig<RfapDistanceParameterConfig>
export type RfapDirectionConfig = ParameterConfig<RfapDirectionParameterConfig>
export type RfapTypeConfig = ParameterConfig<RfapTypeParameterConfig>
export type MagneticConfig = ParameterConfig<MagneticParameterConfig>
export type ThermalConfig = ParameterConfig<ThermalParameterConfig>

export type ParameterConfigType =
  | SeismicityConfig
  | EdmConfig
  | SeismicEnergyConfig
  | RfapEnergyConfig
  | RsamSeismicConfig
  | GpsBaselineConfig
  | GpsCoordinateConfig
  | TiltmeterConfig
  | VogamosEmissionConfig
  | VogamosTemperatureConfig
  | DoasConfig
  | LavaDomesConfig
  | WeatherBabadanConfig
  | WeatherPasarbubarConfig
  | RainfallStationConfig
  | RfapDistanceConfig
  | RfapDirectionConfig
  | RfapTypeConfig
  | MagneticConfig
  | ThermalConfig

export interface ParameterConfigMap {
  Seismicity: SeismicityConfig
  Edm: EdmConfig
  SeismicEnergy: SeismicEnergyConfig
  RfapEnergy: RfapEnergyConfig
  RsamSeismic: RsamSeismicConfig
  GpsBaseline: GpsBaselineConfig
  GpsCoordinate: GpsCoordinateConfig
  Tiltmeter: TiltmeterConfig
  VogamosEmission: VogamosEmissionConfig
  VogamosTemperature: VogamosTemperatureConfig
  Doas: DoasConfig
  LavaDomes: LavaDomesConfig
  WeatherBabadan: WeatherBabadanConfig
  WeatherPasarbubar: WeatherPasarbubarConfig
  RainfallStation: RainfallStationConfig
  RfapDistance: RfapDistanceConfig
  RfapDirection: RfapDirectionConfig
  RfapType: RfapTypeConfig
  Magnetic: MagneticConfig
  Thermal: ThermalConfig
}

export type DataType = keyof ParameterConfigMap

export const DataTypeNameMap: {
  [key in DataType]: string
} = {
  Seismicity: 'Seismicity',
  Edm: 'EDM',
  SeismicEnergy: 'Seismic Energy',
  RfapEnergy: 'RF & AP Energy',
  RsamSeismic: 'RSAM Seismic',
  GpsBaseline: 'GPS Baseline',
  GpsCoordinate: 'GPS Coordinate',
  Tiltmeter: 'Tiltmeter',
  VogamosEmission: 'Vogamos Emission',
  VogamosTemperature: 'Vogamos Temperature',
  Doas: 'DOAS',
  LavaDomes: 'Lava Domes',
  WeatherBabadan: 'Weather Babadan',
  WeatherPasarbubar: 'Weather Pasarbubar',
  RainfallStation: 'Rainfall Station',
  RfapDistance: 'RF & AP Distance',
  RfapDirection: 'RF & AP Direction',
  RfapType: 'RF & AP Type',
  Magnetic: 'Magnetic',
  Thermal: 'Thermal',
}

export interface SeismicityData {
  readonly timestamp: string
  readonly count: number
}

export interface EdmData {
  readonly timestamp: string
  readonly slope_distance: number
  readonly csd: number
  readonly dt: number
  readonly rate: number
}

export interface SeismicEnergyData {
  readonly timestamp: string
  readonly energy: number
}

export interface RfapEnergyData {
  readonly timestamp: string
  readonly count: number
  readonly energy: number
  readonly count_ROCKFALL: number
  readonly count_AWANPANAS: number
}

export interface RsamSeismicData {
  readonly timestamp: string
  readonly band0?: number
  readonly band1?: number
  readonly band2?: number
  readonly band3?: number
  readonly band4?: number
  readonly band5?: number
  readonly band6?: number
  readonly band7?: number
  readonly band8?: number
  readonly band9?: number
  readonly band10?: number
  readonly band11?: number
  readonly band12?: number
  readonly band13?: number
}

export interface GpsBaselineData {
  readonly timestamp: string
  readonly baseline: number
}

export interface GpsCoordinateData {
  readonly timestamp: string
  readonly east: number
  readonly north: number
  readonly up: number
  readonly err_east: number
  readonly err_north: number
  readonly err_up: number
  readonly orbit: number
}

export interface TiltmeterData {
  readonly timestamp: string
  readonly x: number
  readonly y: number
  // temperature may and id may not present in the borehole or if the data is
  // aggregated daily
  readonly temperature?: number | null
  readonly id?: number | null
}

export interface VogamosEmissionData {
  readonly timestamp: string
  readonly co2_min: number
  readonly co2_max: number
  readonly co2_avg: number
  readonly temperature_min: number
  readonly temperature_max: number
  readonly temperature_avg: number
  readonly humidity_min: number
  readonly humidity_max: number
  readonly humidity_avg: number
  readonly input_battery_voltage: number
}

export interface VogamosTemperatureData {
  readonly timestamp: string
  readonly temperature1: number
  readonly temperature2: number
  readonly temperature3: number
  readonly temperature4: number
  readonly battery_voltage: number
}

export interface DoasData {
  readonly starttime: string
  readonly endtime: string
  readonly angle: number
  readonly flux: number
}

export interface LavaDomesData {
  readonly timestamp: string
  readonly volume: number
  readonly rate: number
}

export interface WeatherPasarbubarData {
  readonly timestamp: string
  readonly wind_direction: number
  readonly wind_speed: number
  readonly air_temperature: number
  readonly air_humidity: number
  readonly air_pressure: number
  readonly rainfall: number
  readonly amount: number
  readonly battery_voltage: number
  readonly power_temperature: number
  readonly actual_rainfall: number | null
  readonly cumulative_rainfall: number | null
  readonly rate: number | null
}

export interface RainfallEvent {
  readonly start: string
  readonly end: string
  readonly duration: number
  readonly total: number
  readonly intensity: number
  readonly state: number
}

export interface RainfallRecord {
  readonly data: RainfallEvent[]
  readonly count: number
}

export interface WeatherPasarbubarResponseData {
  readonly events: RainfallRecord
  readonly data: WeatherPasarbubarData[]
  readonly max_counter_value: number
}

export interface WeatherBabadanData {
  readonly timestamp: string
  readonly air_temperature: number | null
  readonly relative_humidity: number | null
  readonly air_pressure: number | null
  readonly internal_temperature: number | null
  readonly wind_direction_min: number | null
  readonly wind_direction_avg: number | null
  readonly wind_direction_max: number | null
  readonly wind_speed_min: number | null
  readonly wind_speed_avg: number | null
  readonly wind_speed_max: number | null
  readonly rain_acc: number | null
  readonly rain_duration: number | null
  readonly rain_intensity: number | null
  readonly rain_peak_intensity: number | null
  readonly hail_acc: number | null
  readonly hail_duration: number | null
  readonly hail_intensity: number | null
  readonly hail_peak_intensity: number | null
  readonly heating_temperature: number | null
  readonly supply_voltage: number | null
  readonly ref_voltage: number | null
  readonly heating_voltage: number | null
  readonly id: string | null
}

export interface WeatherBabadanResponseData {
  readonly events: RainfallRecord
  readonly data: WeatherBabadanData[]
  readonly max_counter_value: number
}

export interface RainfallStationData {
  readonly timestamp: string
  readonly sharp: number
  readonly rainfall: number | null
  readonly cumulative_rainfall: number | null
  readonly rate: number | null
}

export interface RfapDistanceData {
  readonly timestamp: string
  readonly rf_count: number | null
  readonly rf_dist: number | null
  readonly ap_count: number | null
  readonly ap_dist: number | null
}

export interface RfapDirectionData {
  readonly timestamp: string
  readonly count: number
  readonly distance: number | null
  readonly rf_count: number | null
  readonly ap_count: number | null
  readonly rf_distance: number | null
  readonly ap_distance: number | null
  readonly countdir: { [key: string]: number } | null
  readonly distdir: { [key: string]: number } | null
}

export interface RfapTypeData {
  readonly timestamp: string
  readonly count: number
  readonly distance: number | null
  readonly rf_count: number | null
  readonly ap_count: number | null
  readonly rf_distance: number | null
  readonly ap_distance: number | null
  readonly countsta: { [key: string]: number } | null
}

export interface MagneticData {
  readonly timestamp: string
  readonly x: number
  readonly y: number
  readonly z: number
  readonly r: number
  readonly temperature: number | null
  readonly battery: number | null
}

export interface ThermalData {
  readonly id?: number
  readonly filename?: string
  readonly area?: string
  readonly timestamp: string
  readonly temperature: number
  readonly density: number
  readonly created?: string
  readonly updated?: string
}

export interface DataItemTypeMap {
  Seismicity: SeismicityData
  Edm: EdmData
  SeismicEnergy: SeismicEnergyData
  RfapEnergy: RfapEnergyData
  RsamSeismic: RsamSeismicData
  GpsBaseline: GpsBaselineData
  GpsCoordinate: GpsCoordinateData
  Tiltmeter: TiltmeterData
  VogamosEmission: VogamosEmissionData
  VogamosTemperature: VogamosTemperatureData
  Doas: DoasData
  LavaDomes: LavaDomesData
  WeatherBabadan: WeatherBabadanResponseData
  WeatherPasarbubar: WeatherBabadanResponseData
  RainfallStation: RainfallStationData
  RfapDistance: RfapDistanceData
  RfapDirection: RfapDirectionData
  RfapType: RfapTypeData
  Magnetic: MagneticData
  Thermal: ThermalData
}

export enum DateIntervalType {
  Relative,
  Offset,
  Ytd,
  Custom,
}

export interface DateInterval {
  start: string
  end: string
}

export type DataRepository = Record<string, unknown>

export interface SeriesConfig<T extends DataType = DataType> {
  dataType: T
  config: ParameterConfigMap[T]
}

export interface SubplotConfig<T extends DataType = DataType> {
  dataType: T
  series: SeriesConfig[]
}

export interface SeriesDataKey<T extends DataType = DataType> {
  interval: DateInterval
  series: SeriesConfig<T>
}

export interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface RenderModel {
  subplots: SubplotConfig[]
  interval: DateInterval
  dataRepository: DataRepository
  title?: string
  subtitle?: string
  backgroundColor?: string
  margin?: Margin
}
