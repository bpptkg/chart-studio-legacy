import { LavaDomesConfig, LavaDomesData, SeriesConfig } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface LavaDomesSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createLavaDomesSeries(
  data: LavaDomesData[],
  config: LavaDomesConfig,
  options: LavaDomesSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'LavaDomes',
    config,
  }

  if (config.field === 'volume') {
    return {
      data: data.map((item) => [toMilliseconds(item.timestamp), item.volume]),
      areaStyle: {},
      name: objectStringify(seriesConfig),
      type: 'line',
      symbol: 'none',
      xAxisIndex,
      yAxisIndex,
    }
  } else {
    return {
      data: data.map((item) => [toMilliseconds(item.timestamp), item.rate]),
      name: objectStringify(seriesConfig),
      type: 'line',
      xAxisIndex,
      yAxisIndex,
    }
  }
}

export function createLavaDomesSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }

  const seriesConfig = objectParse(seriesName) as SeriesConfig<'LavaDomes'>
  const config = seriesConfig.config

  if (config.field === 'volume') {
    tooltip.push(
      `<div>
      ${circle(color)}
      Volume: ${value[1] ? value[1].toFixed(2) : NO_DATA} m\u00B3
      </div>`
    )
  } else if (config.field === 'rate') {
    tooltip.push(
      `<div>
      ${circle(color)}
      Rate: ${value[1] ? value[1].toFixed(2) : NO_DATA} m\u00B3/day
       </div>`
    )
  }

  return tooltip.join('')
}
