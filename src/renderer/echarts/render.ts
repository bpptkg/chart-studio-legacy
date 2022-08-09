import {
  EdmData,
  RenderModel,
  RfapEnergyData,
  SeismicEnergyData,
  SeismicityData,
  SeriesDataKey,
  SubplotConfig,
} from '@/model/types'
import { EChartsOption, SeriesOption } from 'echarts'
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import objectHash from 'object-hash'
import { createRowGrid } from './grid'

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

      return series.map((seriesConfig) => {
        const { dataType } = seriesConfig
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
            return {
              data: data.map((item) => {
                return [
                  moment(item['timestamp']).unix() * 1000,
                  item['slope_distance'],
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
                return [moment(item['timestamp']).unix() * 1000, item['count']]
              }),
              type: 'line',
              xAxisIndex: index,
              yAxisIndex: index,
            } as SeriesOption
          }

          case 'SeismicEnergy': {
            const data = (
              key in dataRepository ? dataRepository[key] : []
            ) as SeismicEnergyData[]
            return {
              data: data.map((item) => {
                return [moment(item['timestamp']).unix() * 1000, item['energy']]
              }),
              type: 'line',
              xAxisIndex: index,
              yAxisIndex: index,
            } as SeriesOption
          }

          case 'Seismicity': {
            const data = (
              key in dataRepository ? dataRepository[key] : []
            ) as SeismicityData[]
            return {
              data: data.map((item) => {
                return [moment(item['timestamp']).unix() * 1000, item['count']]
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
