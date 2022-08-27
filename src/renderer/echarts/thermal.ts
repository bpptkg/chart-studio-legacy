import { ThermalConfig, ThermalData } from '@/model/types'
import { SeriesOption } from 'echarts'
import { toMilliseconds } from './util'

export interface ThermalSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createThermalSeries(
  data: ThermalData[],
  config: ThermalConfig,
  options: ThermalSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options

  return {
    data: data.map((item) => [
      toMilliseconds(item.timestamp),
      item[`${config.field}_${config.area}`],
    ]),
    type: 'line',
    symbol: 'none',
    xAxisIndex,
    yAxisIndex,
  }
}
