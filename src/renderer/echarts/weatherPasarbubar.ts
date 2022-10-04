import {
  SeriesConfig,
  WeatherPasarbubarConfig,
  WeatherPasarbubarData,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface WeatherPasarbubarSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createWeatherPasarbubarSeries(
  data: WeatherPasarbubarData[],
  config: WeatherPasarbubarConfig,
  options: WeatherPasarbubarSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'WeatherPasarbubar',
    config,
  }

  let seriesData = []

  if (config.field === 'air_pressure') {
    seriesData = data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field] * 10, // Convert kPa to hPa.
    ])
  } else {
    seriesData = data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field],
    ])
  }

  return {
    data: seriesData,
    name: objectStringify(seriesConfig),
    type: config.field === 'wind_direction' ? 'scatter' : 'line',
    symbol: config.field === 'wind_direction' ? 'circle' : 'none',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createWeatherPasarbubarSeriesTooltip(
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
  ) as SeriesConfig<'WeatherPasarbubar'>
  const config = seriesConfig.config

  let name = ''
  let unit = ''

  switch (config.field) {
    case 'air_humidity':
      name = 'Humidity'
      unit = '%'
      break

    case 'air_pressure':
      name = 'Pressure'
      unit = 'hPa'
      break

    case 'air_temperature':
      name = 'Temperature'
      unit = '\u00B0C'
      break

    case 'wind_direction':
      name = 'Wind Direction'
      unit = '\u00B0'
      break

    case 'wind_speed':
      name = 'Wind Speed'
      unit = 'km/h'
      break
  }

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(2) : NO_DATA} ${unit}
    </div>`
  )

  return tooltip.join('')
}
