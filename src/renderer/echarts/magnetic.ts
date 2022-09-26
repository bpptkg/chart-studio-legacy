import { MagneticConfig, MagneticData, SeriesConfig } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface MagneticSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

/**
 * Create magnetic series.
 */
export function createMagneticSeries(
  data: MagneticData[],
  config: MagneticConfig,
  options: MagneticSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'Magnetic',
    config,
  }
  return {
    data: data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field],
    ]),
    name: objectStringify(seriesConfig),
    type: 'line',
    symbol: 'none',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createMagneticSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'Magnetic'>
  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }

  const config = seriesConfig.config
  switch (config.field) {
    case 'x':
      tooltip.push(
        `<div>
        ${circle(color)}
        X: ${isFinite(value[1]) ? value[1].toFixed(3) : NO_DATA} nT
        </div>
        `
      )
      break
    case 'y':
      tooltip.push(
        `<div>
        ${circle(color)}
        Y: ${isFinite(value[1]) ? value[1].toFixed(3) : NO_DATA} nT
        </div>
        `
      )
      break
    case 'z':
      tooltip.push(
        `<div>
        ${circle(color)}
        Z: ${isFinite(value[1]) ? value[1].toFixed(3) : NO_DATA} nT
        </div>
        `
      )
      break
  }

  return tooltip.join('')
}
