import {
  SeriesConfig,
  WeatherBabadanConfig,
  WeatherBabadanData,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface WeatherBabadanSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createWeatherBabadanSeries(
  data: WeatherBabadanData[],
  config: WeatherBabadanConfig,
  options: WeatherBabadanSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'WeatherBabadan',
    config,
  }
  return {
    data: data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field],
    ]),
    name: objectStringify(seriesConfig),
    type: config.field === 'wind_direction_avg' ? 'scatter' : 'line',
    symbol: config.field === 'wind_direction_avg' ? 'circle' : 'none',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createWeatherBabadanSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }

  const seriesConfig = objectParse(seriesName) as SeriesConfig<'WeatherBabadan'>
  const config = seriesConfig.config

  let name = ''
  let unit = ''
  let fractionDigits = 2

  switch (config.field) {
    case 'air_pressure':
      name = 'Pressure'
      unit = 'hPa'
      break

    case 'air_temperature':
      name = 'Temperature'
      unit = '\u00B0C'
      break

    case 'relative_humidity':
      name = 'Humidity'
      unit = '%'
      break

    case 'wind_direction_avg':
      name = 'Wind Direction'
      unit = '\u00B0'
      fractionDigits = 0
      break

    case 'wind_speed_avg':
      name = 'Wind Speed'
      unit = 'km/h'
      break
  }

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(fractionDigits) : NO_DATA} ${unit}
    </div>`
  )

  return tooltip.join('')
}

export function createWeatherBabadanYAxisOption(
  config: WeatherBabadanConfig
): YAXisOption {
  switch (config.field) {
    case 'air_pressure':
      return {
        name: 'Pressure (hPa)',
      }
    case 'air_temperature':
      return {
        name: 'Temperature (\u00B0C)',
      }
    case 'relative_humidity':
      return {
        name: 'Humidity (%)',
      }
    case 'wind_direction_avg':
      return {
        name: 'Wind Direction (\u00B0)',
      }
    case 'wind_speed_avg':
      return {
        name: 'Wind Speed (km/h)',
      }
    default:
      return {}
  }
}
