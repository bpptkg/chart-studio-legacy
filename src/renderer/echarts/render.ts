import {
  DoasData,
  EdmConfig,
  EdmData,
  GpsBaselineConfig,
  GpsBaselineData,
  GpsCoordinateConfig,
  GpsCoordinateData,
  LavaDomesConfig,
  LavaDomesData,
  MagneticConfig,
  MagneticData,
  RenderModel,
  RfapDirectionConfig,
  RfapDirectionData,
  RfapDistanceConfig,
  RfapDistanceData,
  RfapEnergyConfig,
  RfapEnergyData,
  RfapTypeConfig,
  RfapTypeData,
  RsamSeismicConfig,
  RsamSeismicData,
  SeismicEnergyConfig,
  SeismicEnergyData,
  SeismicityConfig,
  SeismicityData,
  SeriesConfig,
  SeriesDataKey,
  SubplotConfig,
  ThermalConfig,
  ThermalData,
  TiltmeterConfig,
  TiltmeterData,
  VogamosEmissionConfig,
  VogamosEmissionData,
  VogamosTemperatureConfig,
  VogamosTemperatureData,
  WeatherBabadanConfig,
  WeatherBabadanData,
  WeatherPasarbubarConfig,
  WeatherPasarbubarData,
} from '@/model/types'
import { isDef } from '@/shared/util'
import { EChartsOption, SeriesOption } from 'echarts'
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'
import objectHash from 'object-hash'

import { createEdmSeries } from './edm'
import { createGpsBaselineSeries } from './gpsBaseline'
import { createGpsCoordinateSeries } from './gpsCoordinate'
import { createRowGrid } from './grid'
import { createMagneticSeries } from './magnetic'
import { createRfapDirectionSeries } from './rfapDirection'
import { createRfapEnergySeries } from './rfapEnergy'
import { createRfapTypeSeries } from './rfapType'
import { createRsamSeismicSeries } from './rsamSeismic'
import { createSeismicEnergySeries } from './seismicEnergy'
import { createSeismicitySeries } from './seismicity'
import { createThermalSeries } from './thermal'
import { renderTooltip } from './tooltip'
import { toMilliseconds, toKilometers } from './util'

/**
 * It specifies whether not to contain zero position of axis compulsively. When
 * the axis scale is set to be true, the axis may not contain zero position,
 * which is useful in the scatter chart for both value axes.
 */
export function shouldAxisScale(subplot: SubplotConfig): boolean {
  const isLavaDomesRateSeries = (seriesConfig: SeriesConfig): boolean => {
    const series = seriesConfig as SeriesConfig<'LavaDomes'>
    return series.config.field === 'rate'
  }

  return subplot.series.some((series) => {
    return (
      [
        'Doas',
        'Edm',
        'GpsBaseline',
        'GpsCoordinate',
        'Magnetic',
        'Thermal',
        'Tiltmeter',
        'WeatherBabadan',
        'WeatherPasarbubar',
      ].includes(series.dataType) || isLavaDomesRateSeries(series)
    )
  })
}

/**
 * Check whether particular subplot has multiple series or not.
 */
export function hasMultipleSeries(subplot: SubplotConfig): boolean {
  return subplot.series.length > 1
}

/**
 * Check whether particular subplot has secondary y axis or not. Particular
 * subplot has secondary y axis if it has both left and right y axes.
 */
export function hasSecondaryYAxis(subplot: SubplotConfig): boolean {
  if (hasMultipleSeries(subplot)) {
    let foundLeft = true
    let foundRight = false

    subplot.series.forEach((series) => {
      const yAxis = series.config.yAxis
      if (yAxis?.position === 'left') {
        foundLeft = true
      }
      if (yAxis?.position === 'right') {
        foundRight = true
      }
    })

    return foundLeft && foundRight
  } else {
    return false
  }
}

/**
 * Determine y axis index for particular series in the subplot.
 */
export function findYAxisIndex(
  subplots: SubplotConfig[],
  subplotIndex: number,
  seriesIndex: number
): number {
  const cfg = subplots[subplotIndex].series[seriesIndex].config
  const isAxisPositionRight = cfg.yAxis?.position === 'right'
  let offset = -1
  for (let i = 0; i < subplotIndex + 1; i++) {
    const subplot = subplots[i]
    if (hasSecondaryYAxis(subplot)) {
      offset += 2
    } else {
      offset += 1
    }
  }
  const subplot = subplots[subplotIndex]
  if (hasSecondaryYAxis(subplot)) {
    return isAxisPositionRight ? offset : offset - 1
  } else {
    return offset
  }
}

/**
 * Render chart model to ECharts chart option.
 *
 * @param model Chart model.
 * @returns ECharts chart option.
 */
export function renderToECharts(model: RenderModel): EChartsOption {
  const {
    subplots,
    interval,
    dataRepository,
    title = '',
    subtitle = '',
    backgroundColor = '#fff',
    margin = {},
  } = model as RenderModel

  // Render grid spec.
  const grid = createRowGrid(subplots.length > 0 ? subplots.length : 1, margin)

  // Render y axis.
  const yAxis: YAXisOption[] = subplots
    .map((subplot, index) => {
      const createAxis = (option: YAXisOption = {}): YAXisOption => {
        return {
          ...option,
          gridIndex: index,
          splitLine: { show: false },
          type: 'value',
          scale: shouldAxisScale(subplot),
        }
      }
      const axes: YAXisOption[] = []
      if (hasMultipleSeries(subplot)) {
        axes.push(createAxis())
        if (hasSecondaryYAxis(subplot)) {
          axes.push(createAxis({ position: 'right' }))
        }
      } else {
        const cfg = subplot.series[0] ? subplot.series[0].config : undefined
        const isAxisPositionRight = cfg
          ? cfg?.yAxis?.position === 'right'
          : false
        axes.push(
          createAxis({
            position: isAxisPositionRight ? 'right' : 'left',
          })
        )
      }

      return axes.flat(1)
    })
    .flat(1)

  // Render x axis.
  const xAxis: XAXisOption[] = subplots.map((subplot, index) => {
    return {
      axisLabel: {
        show: index === subplots.length - 1 ? true : false,
      },
      gridIndex: index,
      position: 'bottom',
      min: toMilliseconds(interval.start),
      max: toMilliseconds(interval.end),
      splitLine: { show: false },
      type: 'time',
    }
  })

  // Render series tooltip.
  const tooltip = renderTooltip()

  // Render each series in the subplot.
  const series: SeriesOption[] = subplots
    .map((subplot, subplotIndex) => {
      return subplot.series
        .filter(({ config }) => (isDef(config.visible) ? config.visible : true))
        .map((seriesConfig, seriesIndex) => {
          const { dataType, config } = seriesConfig
          const dataKey: SeriesDataKey = {
            interval,
            series: seriesConfig,
          }
          const key: string = objectHash.sha1(dataKey)
          const xAxisIndex: number = subplotIndex
          const yAxisIndex: number = findYAxisIndex(
            subplots,
            subplotIndex,
            seriesIndex
          )

          switch (dataType) {
            case 'Edm': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as EdmData[]

              const cfg = config as EdmConfig
              return createEdmSeries(data, cfg, { xAxisIndex, yAxisIndex })
            }

            case 'RfapEnergy': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapEnergyData[]

              const cfg = config as RfapEnergyConfig
              return createRfapEnergySeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'SeismicEnergy': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicEnergyData[]

              const cfg = config as SeismicEnergyConfig
              return createSeismicEnergySeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'Seismicity': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicityData[]

              const cfg = config as SeismicityConfig
              return createSeismicitySeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'RsamSeismic': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RsamSeismicData[]

              const cfg = config as RsamSeismicConfig
              return createRsamSeismicSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'GpsBaseline': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as GpsBaselineData[]

              const cfg = config as GpsBaselineConfig
              return createGpsBaselineSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'GpsCoordinate': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as GpsCoordinateData[]

              const cfg = config as GpsCoordinateConfig
              return createGpsCoordinateSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'Tiltmeter': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as TiltmeterData[]

              const cfg = config as TiltmeterConfig

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item[cfg.field],
                ]),
                type: 'line',
                symbol: 'none',
                xAxisIndex,
                yAxisIndex,
              }
            }

            case 'VogamosEmission': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as VogamosEmissionData[]

              const cfg = config as VogamosEmissionConfig

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item[cfg.field],
                ]),
                type: 'line',
                symbol: 'none',
                xAxisIndex,
                yAxisIndex,
              }
            }

            case 'VogamosTemperature': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as VogamosTemperatureData[]

              const cfg = config as VogamosTemperatureConfig

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item[cfg.field],
                ]),
                type: 'line',
                symbol: 'none',
                xAxisIndex,
                yAxisIndex,
              }
            }

            case 'Doas': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as DoasData[]

              return {
                data: data.map((item) => [
                  toMilliseconds(item.starttime),
                  item.flux,
                ]),
                type: 'scatter',
                xAxisIndex,
                yAxisIndex,
              }
            }

            case 'LavaDomes': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as LavaDomesData[]

              const cfg = config as LavaDomesConfig
              const field = cfg.field

              if (field === 'volume') {
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.volume,
                  ]),
                  areaStyle: {},
                  type: 'line',
                  symbol: 'none',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else {
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.rate,
                  ]),
                  type: 'line',
                  xAxisIndex,
                  yAxisIndex,
                }
              }
            }

            case 'WeatherPasarbubar': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as WeatherPasarbubarData[]

              const cfg = config as WeatherPasarbubarConfig

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item[cfg.field],
                ]),
                type: cfg.field === 'wind_direction' ? 'scatter' : 'line',
                symbol: cfg.field === 'wind_direction' ? 'circle' : 'none',
                xAxisIndex,
                yAxisIndex,
              }
            }

            case 'WeatherBabadan': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as WeatherBabadanData[]

              const cfg = config as WeatherBabadanConfig

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item[cfg.field],
                ]),
                type: cfg.field === 'wind_direction_avg' ? 'scatter' : 'line',
                symbol: cfg.field === 'wind_direction_avg' ? 'circle' : 'none',
                xAxisIndex,
                yAxisIndex,
              }
            }

            case 'RfapDistance': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapDistanceData[]

              const cfg = config as RfapDistanceConfig
              const field = cfg.field

              if (field === 'rfap-stack') {
                return [
                  {
                    data: data.map((item) => [
                      toMilliseconds(item.timestamp),
                      item.rf_count,
                    ]),
                    name: 'RF Count',
                    type: 'bar',
                    stack: 'one',
                    xAxisIndex,
                    yAxisIndex,
                  },
                  {
                    data: data.map((item) => [
                      toMilliseconds(item.timestamp),
                      item.ap_count,
                    ]),
                    itemStyle: {
                      color: '#c12e34',
                    },
                    name: 'AP Count',
                    type: 'bar',
                    stack: 'one',
                    xAxisIndex,
                    yAxisIndex,
                  },
                ]
              } else if (field === 'ap-count') {
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.ap_count,
                  ]),
                  type: 'bar',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else if (field === 'ap-dist') {
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.ap_dist ? toKilometers(item.ap_dist) : null,
                  ]),
                  type: 'scatter',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else if (field === 'rf-dist') {
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.rf_dist ? toKilometers(item.rf_dist) : null,
                  ]),
                  type: 'scatter',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else {
                // Default. field = rf-count.
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.rf_count,
                  ]),
                  type: 'bar',
                  xAxisIndex,
                  yAxisIndex,
                }
              }
            }

            case 'RfapDirection': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapDirectionData[]

              const cfg = config as RfapDirectionConfig
              return createRfapDirectionSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'RfapType': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapTypeData[]

              const cfg = config as RfapTypeConfig
              return createRfapTypeSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'Magnetic': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as MagneticData[]

              const cfg = config as MagneticConfig
              return createMagneticSeries(data, cfg, { xAxisIndex, yAxisIndex })
            }

            case 'Thermal': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as ThermalData[]

              const cfg = config as ThermalConfig
              return createThermalSeries(data, cfg, { xAxisIndex, yAxisIndex })
            }

            default:
              return {
                data: [],
                name: '{}',
                type: 'line',
              } as SeriesOption
          }
        }) as (SeriesOption | SeriesOption[])[]
    })
    .flat(2)

  const option = {
    backgroundColor,
    title: {
      text: title,
      subtext: subtitle,
      left: 'center',
      textStyle: { fontSize: 14 },
    },
    grid,
    tooltip,
    xAxis,
    yAxis,
    series,
  }

  return option
}
