import { MagneticConfig, MagneticData } from '@/model/types'
import { SeriesOption } from 'echarts'
import { toMilliseconds } from './util'

export interface MagneticSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createMagneticSeries(
  data: MagneticData[],
  config: MagneticConfig,
  options: MagneticSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options

  return {
    data: data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field],
    ]),
    type: 'line',
    symbol: 'none',
    xAxisIndex,
    yAxisIndex,
  }
}
