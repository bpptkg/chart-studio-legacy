import {
  SeriesConfig,
  VogamosEmissionConfig,
  VogamosEmissionData,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface VogamosEmissionSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createVogamosEmissionSeries(
  data: VogamosEmissionData[],
  config: VogamosEmissionConfig,
  options: VogamosEmissionSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'VogamosEmission',
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

export function createVogamosEmissionSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }

  const seriesConfig = objectParse(
    seriesName
  ) as SeriesConfig<'VogamosEmission'>
  const config = seriesConfig.config

  let name = ''
  let unit = ''

  switch (config.field) {
    case 'co2_avg':
      name = 'CO\u2082 avg'
      unit = 'ppm'
      break

    case 'co2_max':
      name = 'CO\u2082 max'
      unit = 'ppm'
      break

    case 'co2_min':
      name = 'CO\u2082 min'
      unit = 'ppm'
      break

    case 'humidity_avg':
      name = 'CO\u2082 humi. avg'
      unit = '%'
      break

    case 'humidity_max':
      name = 'CO\u2082 humi. max'
      unit = '%'
      break

    case 'humidity_min':
      name = 'CO\u2082 humi. min'
      unit = '%'
      break

    case 'temperature_avg':
      name = 'CO\u2082 temp. avg'
      unit = '\u00B0C'
      break

    case 'temperature_max':
      name = 'CO\u2082 temp. max'
      unit = '\u00B0C'
      break

    case 'temperature_min':
      name = 'CO\u2082 temp. min'
      unit = '\u00B0C'
      break

    default:
      name = ''
      unit = ''
  }

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(2) : NO_DATA} ${unit}
    </div>
    `
  )

  return tooltip.join('')
}

export function createVogamosEmissionYAxisOption(
  config: VogamosEmissionConfig
): YAXisOption {
  switch (config.field) {
    case 'co2_avg':
    case 'co2_max':
    case 'co2_min':
      return { name: 'CO\u2082 (ppm)' }
    case 'humidity_avg':
    case 'humidity_max':
    case 'humidity_min':
      return { name: 'CO\u2082 Humi. (%)' }
    case 'temperature_avg':
    case 'temperature_max':
    case 'temperature_min':
      return { name: 'CO\u2082 Temp. (\u00B0C)' }
    default:
      return {}
  }
}
