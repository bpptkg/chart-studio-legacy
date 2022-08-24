import {
  EdmConfig,
  EdmData,
  RenderModel,
  RfapEnergyData,
  SeismicEnergyConfig,
  SeismicEnergyData,
  SeismicityData,
  SeriesDataKey,
  SubplotConfig,
} from '@/model/types'
import { cumulativeSum } from '@/shared/math'
import { isDef } from '@/shared/util'
import { EChartsOption, SeriesOption } from 'echarts'
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import objectHash from 'object-hash'
import { createRowGrid } from './grid'

// Second to millisecond conversion factor.
export const SECOND_TO_MILLISECOND = 1000

// 10^12 erg to MJ conversion factor.
export const ERG_TO_MEGA_JOULE = 1 / 10

export function shouldAxisScale(subplot: SubplotConfig): boolean {
  return subplot.series.some((series) => series.dataType === 'Edm')
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
  } = model

  const grid = createRowGrid(subplots.length > 0 ? subplots.length : 1, margin)

  const yAxis: YAXisOption[] = subplots.map((subplot, index) => {
    return {
      gridIndex: index,
      splitLine: { show: false },
      type: 'value',
      scale: shouldAxisScale(subplot),
    }
  })

  const xAxis: XAXisOption[] = subplots.map((subplot, index) => {
    return {
      gridIndex: index,
      splitLine: { show: false },
      type: 'time',
    }
  })

  const series: SeriesOption[] = subplots
    .map((subplot, index) => {
      const series = subplot.series

      return series
        .filter(({ config }) => {
          return config.visible === true
        })
        .map((seriesConfig) => {
          const { dataType, config } = seriesConfig
          const dataKey: SeriesDataKey = {
            interval,
            series: seriesConfig,
          }
          const key = objectHash.sha1(dataKey)

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
                data: data.map((item) => {
                  return [
                    moment(item['timestamp']).unix() * 1000,
                    item[fieldName],
                  ]
                }),
                type: 'line',
                xAxisIndex: index,
                yAxisIndex: index,
              } as SeriesOption
            }

            case 'RfapEnergy': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapEnergyData[]
              return {
                data: data.map((item) => {
                  return [
                    moment(item['timestamp']).unix() * 1000,
                    item['count'],
                  ]
                }),
                type: 'line',
                xAxisIndex: index,
                yAxisIndex: index,
              } as SeriesOption
            }

            case 'SeismicEnergy': {
              const rawData = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicEnergyData[]
              const cfg = config as SeismicEnergyConfig
              const data = rawData.map((item) => {
                return [
                  moment(item.timestamp).unix() * SECOND_TO_MILLISECOND,
                  isDef(item.energy) ? item.energy * ERG_TO_MEGA_JOULE : null,
                ]
              })

              if (cfg.aggregate === 'daily-cumulative') {
                return {
                  data: cumulativeSum(data),
                  type: 'line',
                  xAxisIndex: index,
                  yAxisIndex: index,
                } as SeriesOption
              } else {
                return {
                  data: data,
                  type: 'bar',
                  barGap: '5%',
                  barWidth: '80%',
                  barCategoryGap: '0%',
                  xAxisIndex: index,
                  yAxisIndex: index,
                } as SeriesOption
              }
            }

            case 'Seismicity': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicityData[]
              return {
                data: data.map((item) => {
                  return [
                    moment(item['timestamp']).unix() * 1000,
                    item['count'],
                  ]
                }),
                type: 'bar',
                barGap: '5%',
                barWidth: '80%',
                barCategoryGap: '0%',
                xAxisIndex: index,
                yAxisIndex: index,
              } as SeriesOption
            }

            default:
              return {} as SeriesOption
          }
        })
    })
    .flat(1)

  return {
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
}
