import EdmOptions from './EdmOptions.vue'
import RfapEnergyOptions from './RfapEnergyOptions.vue'
import SeismicEnergyOptions from './SeismicEnergyOptions.vue'
import SeismicityOptions from './SeismicityOptions.vue'
import RsamSeismicOptions from './RsamSeismicOptions.vue'
import GpsBaselineOptions from './GpsBaselineOptions.vue'
import GpsCoordinateOptions from './GpsCoordinateOptions.vue'
import TiltmeterOptions from './TiltmeterOptions.vue'

export type ComponentOptions =
  | typeof SeismicityOptions
  | typeof EdmOptions
  | typeof SeismicEnergyOptions
  | typeof RfapEnergyOptions
  | typeof RsamSeismicOptions
  | typeof GpsBaselineOptions
  | typeof GpsCoordinateOptions
  | typeof TiltmeterOptions

export interface ComponentOptionsMapInternal {
  [k: string]: ComponentOptions
}

export const ComponentOptionsMap: ComponentOptionsMapInternal = {
  Seismicity: SeismicityOptions,
  Edm: EdmOptions,
  SeismicEnergy: SeismicEnergyOptions,
  RfapEnergy: RfapEnergyOptions,
  RsamSeismic: RsamSeismicOptions,
  GpsBaseline: GpsBaselineOptions,
  GpsCoordinate: GpsCoordinateOptions,
  Tiltmeter: TiltmeterOptions,
}
