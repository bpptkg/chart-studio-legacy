export interface YAxisOption {
  position?: 'left' | 'right'
}

export interface ParameterConfigCommon {
  visible?: boolean
  yAxis?: YAxisOption
  name?: string
}

export type ParameterConfig<T> = T & ParameterConfigCommon

export interface SeismicityParameterConfig {
  eventType: string
  barGap?: number
  barWidth?: number
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
    | 'count-ap'
    | 'count-rf'
    | 'count'
    | 'energy-cumulative'
    | 'energy'
    | 'rfap-stack'
}

export interface RsamSeismicParameterConfig {
  station: string
  band:
    | 'band0'
    | 'band1'
    | 'band2'
    | 'band3'
    | 'band4'
    | 'band5'
    | 'band6'
    | 'band7'
    | 'band8'
    | 'band9'
    | 'band10'
    | 'band11'
    | 'band12'
    | 'band13'
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
  field:
    | 'co2_min'
    | 'co2_max'
    | 'co2_avg'
    | 'temperature_min'
    | 'temperature_max'
    | 'temperature_avg'
    | 'humidity_min'
    | 'humidity_max'
    | 'humidity_avg'
}

export interface VogamosTemperatureParameterConfig {
  field: 'temperature1' | 'temperature2' | 'temperature3' | 'temperature4'
}

export interface DoasParameterConfig {
  station: string
}

export interface LavaDomesParameterConfig {
  location: string
  field: 'volume' | 'rate'
}

export interface WeatherPasarbubarParameterConfig {
  field:
    | 'air_humidity'
    | 'air_pressure'
    | 'air_temperature'
    | 'wind_direction'
    | 'wind_speed'
}

export interface WeatherBabadanParameterConfig {
  field:
    | 'air_pressure'
    | 'air_temperature'
    | 'relative_humidity'
    | 'wind_direction_avg'
    | 'wind_speed_avg'
}

export interface RainfallStationParameterConfig {
  station: string
}

export interface RfapDistanceParameterConfig {
  field: 'rf-count' | 'rf-dist' | 'ap-count' | 'ap-dist' | 'rfap-stack'
}

export interface RfapDirectionParameterConfig {
  field: 'count' | 'distance'
}

export interface RfapTypeParameterConfig {
  type: 'all' | 'seen' | 'heard' | 'seen-heard'
  field: 'count' | 'distance'
}

export interface MagneticParameterConfig {
  station: string
  field: 'x' | 'y' | 'z'
}

export interface ThermalParameterConfig {
  station: string
  area: string
  field: 'temperature' | 'density'
}

export type DoasConfig = ParameterConfig<DoasParameterConfig>
export type EdmConfig = ParameterConfig<EdmParameterConfig>
export type GpsBaselineConfig = ParameterConfig<GpsBaselineParameterConfig>
export type GpsCoordinateConfig = ParameterConfig<GpsCoordinateParameterConfig>
export type LavaDomesConfig = ParameterConfig<LavaDomesParameterConfig>
export type MagneticConfig = ParameterConfig<MagneticParameterConfig>
export type RainfallStationConfig =
  ParameterConfig<RainfallStationParameterConfig>
export type RfapDirectionConfig = ParameterConfig<RfapDirectionParameterConfig>
export type RfapDistanceConfig = ParameterConfig<RfapDistanceParameterConfig>
export type RfapEnergyConfig = ParameterConfig<RfapEnergyParameterConfig>
export type RfapTypeConfig = ParameterConfig<RfapTypeParameterConfig>
export type RsamSeismicConfig = ParameterConfig<RsamSeismicParameterConfig>
export type SeismicEnergyConfig = ParameterConfig<SeismicEnergyParameterConfig>
export type SeismicityConfig = ParameterConfig<SeismicityParameterConfig>
export type ThermalConfig = ParameterConfig<ThermalParameterConfig>
export type TiltmeterConfig = ParameterConfig<TiltmeterParameterConfig>
export type VogamosEmissionConfig =
  ParameterConfig<VogamosEmissionParameterConfig>
export type VogamosTemperatureConfig =
  ParameterConfig<VogamosTemperatureParameterConfig>
export type WeatherBabadanConfig =
  ParameterConfig<WeatherBabadanParameterConfig>
export type WeatherPasarbubarConfig =
  ParameterConfig<WeatherPasarbubarParameterConfig>

export type ParameterConfigType =
  | DoasConfig
  | EdmConfig
  | GpsBaselineConfig
  | GpsCoordinateConfig
  | LavaDomesConfig
  | MagneticConfig
  | RfapDirectionConfig
  | RfapDistanceConfig
  | RfapEnergyConfig
  | RfapTypeConfig
  | RsamSeismicConfig
  | SeismicEnergyConfig
  | SeismicityConfig
  | ThermalConfig
  | TiltmeterConfig
  | VogamosEmissionConfig
  | VogamosTemperatureConfig
  | WeatherBabadanConfig
  | WeatherPasarbubarConfig

export interface ParameterConfigMap {
  Doas: DoasConfig
  Edm: EdmConfig
  GpsBaseline: GpsBaselineConfig
  GpsCoordinate: GpsCoordinateConfig
  LavaDomes: LavaDomesConfig
  Magnetic: MagneticConfig
  RfapDirection: RfapDirectionConfig
  RfapDistance: RfapDistanceConfig
  RfapEnergy: RfapEnergyConfig
  RfapType: RfapTypeConfig
  RsamSeismic: RsamSeismicConfig
  SeismicEnergy: SeismicEnergyConfig
  Seismicity: SeismicityConfig
  Thermal: ThermalConfig
  Tiltmeter: TiltmeterConfig
  VogamosEmission: VogamosEmissionConfig
  VogamosTemperature: VogamosTemperatureConfig
  WeatherBabadan: WeatherBabadanConfig
  WeatherPasarbubar: WeatherPasarbubarConfig
}

export type DataType = keyof ParameterConfigMap
export type DataTypeNameMapInternal = { [key in DataType]: string }

export const DataTypeNameMap: DataTypeNameMapInternal = {
  Doas: 'DOAS',
  Edm: 'EDM',
  GpsBaseline: 'GPS Baseline',
  GpsCoordinate: 'GPS Coordinate',
  LavaDomes: 'Lava Domes',
  Magnetic: 'Magnetic',
  RfapDirection: 'RF & AP Direction',
  RfapDistance: 'RF & AP Distance',
  RfapEnergy: 'RF & AP Energy',
  RfapType: 'RF & AP Type',
  RsamSeismic: 'RSAM Seismic',
  SeismicEnergy: 'Seismic Energy',
  Seismicity: 'Seismicity',
  Thermal: 'Thermal',
  Tiltmeter: 'Tiltmeter',
  VogamosEmission: 'Vogamos Emission',
  VogamosTemperature: 'Vogamos Temperature',
  WeatherBabadan: 'Weather Babadan',
  WeatherPasarbubar: 'Weather Pasarbubar',
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
  readonly band0: number
  readonly band1: number
  readonly band2: number
  readonly band3: number
  readonly band4: number
  readonly band5: number
  readonly band6: number
  readonly band7: number
  readonly band8: number
  readonly band9: number
  readonly band10: number
  readonly band11: number
  readonly band12: number
  readonly band13: number
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
  readonly temperature: number
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
  readonly actual_rainfall: number
  readonly cumulative_rainfall: number
  readonly rate: number
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
  readonly air_temperature: number
  readonly relative_humidity: number
  readonly air_pressure: number
  readonly internal_temperature: number
  readonly wind_direction_min: number
  readonly wind_direction_avg: number
  readonly wind_direction_max: number
  readonly wind_speed_min: number
  readonly wind_speed_avg: number
  readonly wind_speed_max: number
  readonly rain_acc: number
  readonly rain_duration: number
  readonly rain_intensity: number
  readonly rain_peak_intensity: number
  readonly hail_acc: number
  readonly hail_duration: number
  readonly hail_intensity: number
  readonly hail_peak_intensity: number
  readonly heating_temperature: number
  readonly supply_voltage: number
  readonly ref_voltage: number
  readonly heating_voltage: number
  readonly id: string
}

export interface WeatherBabadanResponseData {
  readonly events: RainfallRecord
  readonly data: WeatherBabadanData[]
  readonly max_counter_value: number
}

export interface RainfallStationData {
  readonly timestamp: string
  readonly sharp: number
  readonly rainfall: number
  readonly cumulative_rainfall: number
  readonly rate: number
}

export interface RfapDistanceData {
  readonly timestamp: string
  readonly rf_count: number
  readonly rf_dist: number
  readonly ap_count: number
  readonly ap_dist: number
}

export interface RfapDirectionData {
  readonly timestamp: string
  readonly count: number
  readonly distance: number
  readonly rf_count: number
  readonly ap_count: number
  readonly rf_distance: number
  readonly ap_distance: number
  readonly countdir: { [key: string]: number }
  readonly distdir: { [key: string]: number }
}

export interface RfapTypeData {
  readonly timestamp: string
  readonly count: number
  readonly distance: number
  readonly rf_count: number
  readonly ap_count: number
  readonly rf_distance: number
  readonly ap_distance: number
  readonly countsta: { [key: string]: number }
}

export interface MagneticData {
  readonly timestamp: string
  readonly x: number
  readonly y: number
  readonly z: number
  readonly r: number
  readonly temperature: number
  readonly battery: number
}

export interface ThermalData {
  readonly timestamp: string
  readonly temperature: number
  readonly density: number
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

/**
 * It stores series data for particular series config in the form of mapping.
 * Its key refer to hashed series config and its value refer to its data.
 */
export type DataRepository = Record<string, unknown>

export interface SeriesConfig<T extends DataType = DataType> {
  dataType: T
  config: ParameterConfigMap[T]
}

export interface SubplotConfig<T extends DataType = DataType> {
  dataType: T
  series: SeriesConfig[]
  leftYAxisLabel?: string
  rightYAxisLabel?: string
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

/**
 * This object acts as a container to store several data necessarily for
 * renderer function to convert the model into concrete object. For example, you
 * can convert this RenderModel into ECharts chart option, into JSON object, or
 * other chart vendor object.
 */
export interface RenderModel {
  subplots: SubplotConfig[]
  interval: DateInterval
  dataRepository: DataRepository
  title?: string
  subtitle?: string
  backgroundColor?: string
  margin?: Margin
}
