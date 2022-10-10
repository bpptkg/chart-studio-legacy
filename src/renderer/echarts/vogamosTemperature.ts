import {
  SeriesConfig,
  VogamosTemperatureConfig,
  VogamosTemperatureData,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface VogamosTemperatureSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createVogamosTemperatureSeries(
  data: VogamosTemperatureData[],
  config: VogamosTemperatureConfig,
  options: VogamosTemperatureSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'VogamosTemperature',
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

export function createVogamosTemperatureSeriesTooltip(
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
  ) as SeriesConfig<'VogamosTemperature'>
  const config = seriesConfig.config

  let name = ''
  let unit = ''

  switch (config.field) {
    case 'temperature1':
      name = 'Termocouple 1'
      unit = '\u00B0C'
      break

    case 'temperature2':
      name = 'Termocouple 2'
      unit = '\u00B0C'
      break

    case 'temperature3':
      name = 'Soil'
      unit = '\u00B0C'
      break

    case 'temperature4':
      name = 'Temperature 4'
      unit = '\u00B0C'
      break
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

export function createVogamosTemperatureYAxisOption(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: VogamosTemperatureConfig
): YAXisOption {
  return {
    name: 'Temperature (\u00B0C)',
  }
}
