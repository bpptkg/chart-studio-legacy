import {
  EdmConfig,
  GpsBaselineConfig,
  GpsCoordinateConfig,
  LavaDomesConfig,
  MagneticConfig,
  RfapDirectionConfig,
  RfapDistanceConfig,
  RfapEnergyConfig,
  RfapTypeConfig,
  RsamSeismicConfig,
  SeismicEnergyConfig,
  SeismicityConfig,
  SeriesConfig,
  SubplotConfig,
  ThermalConfig,
  TiltmeterConfig,
  VogamosEmissionConfig,
  YAxisOption as CSYAxisOption,
} from '@/model/types'
import { YAXisOption } from 'echarts/types/dist/shared'

import { createEdmYAxisOption } from './edm'
import { createGpsBaselineYAxisOption } from './gpsBaseline'
import { createGpsCoordinateYAxisOption } from './gpsCoordinate'
import { createLavaDomesYAxisOption } from './lavaDomes'
import { createMagneticYAxisOption } from './magnetic'
import { createRfapDirectionYAxisOption } from './rfapDirection'
import { createRfapDistanceYAxisOption } from './rfapDistance'
import { createRfapEnergyYAxisOption } from './rfapEnergy'
import { createRfapTypeYAxisOption } from './rfapType'
import { createRsamSeismicYAxisOption } from './rsamSeismic'
import { createSeismicEnergyYAxisOption } from './seismicEnergy'
import { createSeismicityYAxisOption } from './seismicity'
import { createThermalYAxisOption } from './thermal'
import { createTiltmeterYAxisOption } from './tiltmeter'
import { createVogamosEmissionYAxisOption } from './vogamosEmission'

export function getLeftYAxisSeries(subplot: SubplotConfig): SeriesConfig[] {
  return subplot.series.filter((series) => {
    return series.config.yAxis?.position
      ? series.config.yAxis?.position !== 'right'
      : true
  })
}

export function getRightYAxisSeries(subplot: SubplotConfig): SeriesConfig[] {
  return subplot.series.filter((series) => {
    return series.config.yAxis?.position === 'right'
  })
}

export function getYAxisOption(series: SeriesConfig[]): YAXisOption[] {
  return series.map(({ dataType, config }) => {
    switch (dataType) {
      case 'Edm':
        return createEdmYAxisOption(config as EdmConfig)
      case 'GpsBaseline':
        return createGpsBaselineYAxisOption(config as GpsBaselineConfig)
      case 'GpsCoordinate':
        return createGpsCoordinateYAxisOption(config as GpsCoordinateConfig)
      case 'LavaDomes':
        return createLavaDomesYAxisOption(config as LavaDomesConfig)
      case 'Magnetic':
        return createMagneticYAxisOption(config as MagneticConfig)
      case 'RfapDirection':
        return createRfapDirectionYAxisOption(config as RfapDirectionConfig)
      case 'RfapDistance':
        return createRfapDistanceYAxisOption(config as RfapDistanceConfig)
      case 'RfapEnergy':
        return createRfapEnergyYAxisOption(config as RfapEnergyConfig)
      case 'RfapType':
        return createRfapTypeYAxisOption(config as RfapTypeConfig)
      case 'RsamSeismic':
        return createRsamSeismicYAxisOption(config as RsamSeismicConfig)
      case 'SeismicEnergy':
        return createSeismicEnergyYAxisOption(config as SeismicEnergyConfig)
      case 'Seismicity':
        return createSeismicityYAxisOption(config as SeismicityConfig)
      case 'Thermal':
        return createThermalYAxisOption(config as ThermalConfig)
      case 'Tiltmeter':
        return createTiltmeterYAxisOption(config as TiltmeterConfig)
      case 'VogamosEmission':
        return createVogamosEmissionYAxisOption(config as VogamosEmissionConfig)
      default:
        return {}
    }
  })
}

export function deduceYAxisOption(
  subplot: SubplotConfig,
  position: CSYAxisOption['position']
): YAXisOption {
  const leftSeries = getLeftYAxisSeries(subplot)
  const rightSeries = getRightYAxisSeries(subplot)
  const options =
    position === 'left'
      ? getYAxisOption(leftSeries)
      : getYAxisOption(rightSeries)
  return options.length ? options[0] : {}
}
