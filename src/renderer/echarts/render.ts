import {
  EdmConfig,
  EdmData,
  GpsBaselineConfig,
  GpsBaselineData,
  GpsCoordinateConfig,
  GpsCoordinateData,
  RenderModel,
  RfapEnergyConfig,
  RfapEnergyData,
  SeismicEnergyConfig,
  SeismicEnergyData,
  SeismicityData,
  SeriesDataKey,
  SubplotConfig,
  TiltmeterConfig,
  TiltmeterData,
} from '@/model/types'
import { cumulativeSum } from '@/shared/math'
import { isDef, toPlain } from '@/shared/util'
import { EChartsOption, SeriesOption } from 'echarts'
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import objectHash from 'object-hash'
import { createRowGrid } from './grid'

// Second to millisecond conversion factor.
export const SECOND_TO_MILLISECOND = 1000

// 10^12 erg to MJ conversion factor.
export const ERG_TO_MEGA_JOULE = 1 / 10

export function toMs(v: number | string): number {
  return moment(v).unix() * SECOND_TO_MILLISECOND
}

export function shouldAxisScale(subplot: SubplotConfig): boolean {
  return subplot.series.some((series) => {
    return ['Edm', 'GpsBaseline', 'GpsCoordinate', 'Tiltmeter'].includes(
      series.dataType
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
    interval,
    dataRepository,
    title = '',
    subtitle = '',
    backgroundColor = '#fff',
    margin = {},
  } = toPlain(model) as RenderModel

  const originalSubplots = model.subplots

  // Filter subplot series visibility.
  const subplots: SubplotConfig[] = originalSubplots.map((subplot) => {
    const { series } = subplot
    const filteredSeries = series.filter(({ config }) =>
      isDef(config.visible) ? config.visible : true
    )
    return { ...subplot, series: filteredSeries }
  })

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
      splitLine: { show: false },
      type: 'time',
    }
  })

  // Render each series in the subplot.
  const series: SeriesOption[] = subplots
    .map((subplot, subplotIndex) => {
      const renderedSeries = subplot.series.map((seriesConfig, seriesIndex) => {
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
              data: data.map((item) => [toMs(item.timestamp), item[fieldName]]),
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
                  toMs(item.timestamp),
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
                  toMs(item.timestamp),
                  item.count_ROCKFALL,
                ]),
                type: 'bar',
                barGap: '5%',
                barWidth: '80%',
                barCategoryGap: '0%',
                xAxisIndex,
                yAxisIndex,
              }
            } else if (field == 'count-ap') {
              option = {
                data: rawData.map((item) => [
                  toMs(item.timestamp),
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
                    toMs(item.timestamp),
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
                    toMs(item.timestamp),
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
                toMs(item.timestamp),
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
                data: rawData.map((item) => [toMs(item.timestamp), item.count]),
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
              toMs(item.timestamp),
              item.energy * ERG_TO_MEGA_JOULE,
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
              data: data.map((item) => [toMs(item.timestamp), item.count]),
              type: 'bar',
              barGap: '5%',
              barWidth: '80%',
              barCategoryGap: '0%',
              xAxisIndex,
              yAxisIndex,
            } as SeriesOption
          }

          case 'GpsBaseline': {
            const data = (
              key in dataRepository ? dataRepository[key] : []
            ) as GpsBaselineData[]

            return {
              data: data.map((item) => [toMs(item.timestamp), item.baseline]),
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
              data: data.map((item) => [toMs(item.timestamp), item[cfg.field]]),
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
              data: data.map((item) => [toMs(item.timestamp), item[cfg.field]]),
              type: 'line',
              symbol: 'none',
              xAxisIndex,
              yAxisIndex,
            }
          }

          default:
            return {
              data: [],
              type: 'line',
            } as SeriesOption
        }
      }) as Array<Array<SeriesOption> | SeriesOption>

      return renderedSeries
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
