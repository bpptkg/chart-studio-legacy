import {
  EdmConfig,
  GpsBaselineConfig,
  GpsCoordinateConfig,
  LavaDomesConfig,
  MagneticConfig,
  SeismicityConfig,
  SeriesConfig,
  SubplotConfig,
  YAxisOption as CSYAxisOption,
} from '@/model/types'
import { YAXisOption } from 'echarts/types/dist/shared'
import { createEdmYAxisOption } from './edm'
import { createGpsBaselineYAxisOption } from './gpsBaseline'
import { createGpsCoordinateYAxisOption } from './gpsCoordinate'
import { createLavaDomesYAxisOption } from './lavaDomes'
import { createMagneticYAxisOption } from './magnetic'
import { createSeismicityYAxisOption } from './seismicity'

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
      case 'Seismicity':
        return createSeismicityYAxisOption(config as SeismicityConfig)
      case 'GpsBaseline':
        return createGpsBaselineYAxisOption(config as GpsBaselineConfig)
      case 'GpsCoordinate':
        return createGpsCoordinateYAxisOption(config as GpsCoordinateConfig)
      case 'LavaDomes':
        return createLavaDomesYAxisOption(config as LavaDomesConfig)
      case 'Magnetic':
        return createMagneticYAxisOption(config as MagneticConfig)
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
