import {
  DoasData,
  EdmConfig,
  EdmData,
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
import { cumulativeSum } from '@/shared/math'
import { isDef } from '@/shared/util'
import { EChartsOption, SeriesOption } from 'echarts'
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'
import objectHash from 'object-hash'
import { createRowGrid } from './grid'
import { createMagneticSeries } from './magnetic'
import { createRfapDirectionSeries } from './rfapDirection'
import { createRfapTypeSeries } from './rfapType'
import { createThermalSeries } from './thermal'
import { toMilliseconds, toKilometers, toMegajoules } from './util'

export function shouldAxisScale(subplot: SubplotConfig): boolean {
  const isLavaDomesRate = (seriesConfig: SeriesConfig) => {
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
        'Tiltmeter',
      ].includes(series.dataType) || isLavaDomesRate(series)
    )
  })
}

export function hasMultipleSeries(subplot: SubplotConfig): boolean {
  return subplot.series.length > 1
}

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
          const key = objectHash.sha1(dataKey)
          const xAxisIndex = subplotIndex
          const yAxisIndex = findYAxisIndex(subplots, subplotIndex, seriesIndex)

          switch (dataType) {
            case 'Edm': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as EdmData[]

              const cfg = config as EdmConfig
              const fieldName =
                cfg.type === 'csd'
                  ? 'csd'
                  : cfg.type === 'rate'
                  ? 'rate'
                  : 'slope_distance'

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item[fieldName],
                ]),
                type: 'line',
                xAxisIndex,
                yAxisIndex,
              } as SeriesOption
            }

            case 'RfapEnergy': {
              const rawData = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapEnergyData[]

              const cfg = config as RfapEnergyConfig
              const field = cfg.field
              let option: SeriesOption | SeriesOption[]

              if (field === 'energy') {
                option = {
                  data: rawData.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.energy,
                  ]),
                  type: 'line',
                  symbol: 'none',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else if (field === 'count-rf') {
                option = {
                  data: rawData.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.count_ROCKFALL,
                  ]),
                  type: 'bar',
                  barGap: '5%',
                  barWidth: '80%',
                  barCategoryGap: '0%',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else if (field === 'count-ap') {
                option = {
                  data: rawData.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.count_AWANPANAS,
                  ]),
                  type: 'bar',
                  barGap: '5%',
                  barWidth: '80%',
                  barCategoryGap: '0%',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else if (field === 'rfap-stack') {
                option = [
                  {
                    data: rawData.map((item) => [
                      toMilliseconds(item.timestamp),
                      item.count_ROCKFALL,
                    ]),
                    type: 'bar',
                    barGap: '5%',
                    barWidth: '80%',
                    barCategoryGap: '0%',
                    stack: 'one',
                    xAxisIndex,
                    yAxisIndex,
                  },
                  {
                    data: rawData.map((item) => [
                      toMilliseconds(item.timestamp),
                      item.count_AWANPANAS,
                    ]),
                    type: 'bar',
                    barGap: '5%',
                    barWidth: '80%',
                    barCategoryGap: '0%',
                    stack: 'one',
                    xAxisIndex,
                    yAxisIndex,
                  },
                ] as SeriesOption[]
              } else if (field === 'energy-cumulative') {
                const data = rawData.map((item) => [
                  toMilliseconds(item.timestamp),
                  item.energy,
                ])
                option = {
                  data: cumulativeSum(data),
                  type: 'line',
                  symbol: 'none',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else {
                // Default. field = 'count'.
                option = {
                  data: rawData.map((item) => [
                    toMilliseconds(item.timestamp),
                    item.count,
                  ]),
                  type: 'bar',
                  barGap: '5%',
                  barWidth: '80%',
                  barCategoryGap: '0%',
                  xAxisIndex,
                  yAxisIndex,
                }
              }

              return option
            }

            case 'SeismicEnergy': {
              const rawData = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicEnergyData[]

              const cfg = config as SeismicEnergyConfig
              const data = rawData.map((item) => [
                toMilliseconds(item.timestamp),
                toMegajoules(item.energy),
              ])

              if (cfg.aggregate === 'daily-cumulative') {
                return {
                  data: cumulativeSum(data),
                  type: 'line',
                  symbol: 'none',
                  xAxisIndex,
                  yAxisIndex,
                } as SeriesOption
              } else {
                // Default. aggregate = daily.
                return {
                  data: data,
                  type: 'bar',
                  barGap: '5%',
                  barWidth: '80%',
                  barCategoryGap: '0%',
                  xAxisIndex,
                  yAxisIndex,
                } as SeriesOption
              }
            }

            case 'Seismicity': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicityData[]

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item.count,
                ]),
                type: 'bar',
                barGap: '5%',
                barWidth: '80%',
                barCategoryGap: '0%',
                xAxisIndex,
                yAxisIndex,
              } as SeriesOption
            }

            case 'RsamSeismic': {
              const rawData = (
                key in dataRepository ? dataRepository[key] : []
              ) as RsamSeismicData[]

              const cfg = config as RsamSeismicConfig
              const field = cfg.field
              if (field === 'value-cumulative') {
                return {
                  data: cumulativeSum(
                    rawData.map((item) => [
                      toMilliseconds(item.timestamp),
                      item[cfg.band],
                    ])
                  ),
                  type: 'line',
                  symbol: 'none',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else {
                return {
                  data: rawData.map((item) => [
                    toMilliseconds(item.timestamp),
                    item[cfg.band],
                  ]),
                  type: 'line',
                  symbol: 'none',
                  xAxisIndex,
                  yAxisIndex,
                }
              }
            }

            case 'GpsBaseline': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as GpsBaselineData[]

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item.baseline,
                ]),
                type: 'line',
                symbolSize: 6,
                xAxisIndex,
                yAxisIndex,
              }
            }

            case 'GpsCoordinate': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as GpsCoordinateData[]

              const cfg = config as GpsCoordinateConfig

              return {
                data: data.map((item) => [
                  toMilliseconds(item.timestamp),
                  item[cfg.field],
                ]),
                type: 'scatter',
                symbolSize: 6,
                xAxisIndex,
                yAxisIndex,
              }
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
                    isDef(item.ap_dist)
                      ? toKilometers(item.ap_dist)
                      : item.ap_dist,
                  ]),
                  type: 'scatter',
                  xAxisIndex,
                  yAxisIndex,
                }
              } else if (field === 'rf-dist') {
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    isDef(item.rf_dist)
                      ? toKilometers(item.rf_dist)
                      : item.rf_dist,
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
              const field = cfg.field

              if (field === 'distance') {
                return {
                  data: data.map((item) => [
                    toMilliseconds(item.timestamp),
                    toKilometers(item.distance),
                  ]),
                  type: 'scatter',
                  symbol: 'circle',
                  symbolSize: 7,
                  xAxisIndex,
                  yAxisIndex,
                }
              } else {
                return createRfapDirectionSeries(data, xAxisIndex, yAxisIndex)
              }
            }

            case 'RfapType': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapTypeData[]

              const cfg = config as RfapTypeConfig
              return createRfapTypeSeries(data, xAxisIndex, yAxisIndex, {
                type: cfg.field,
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
    xAxis,
    yAxis,
    series,
  }

  return option
}
