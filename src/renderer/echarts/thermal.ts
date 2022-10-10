import thermalAreas from '@/components/options/thermalAreas'
import { SeriesConfig, ThermalConfig, ThermalData } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

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
  const seriesConfig: SeriesConfig = {
    dataType: 'Thermal',
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

export function createThermalSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'Thermal'>
  const config = seriesConfig.config
  const areas = thermalAreas[config.station]
  const areaName = areas.find((area) => area.value === config.area)?.text
  tooltip.push(
    `<div>
    ${circle(color)}
    ${areaName}: ${value[1] ? value[1].toFixed(2) : NO_DATA}
    ${config.field === 'temperature' ? '\u00B0C' : '%'}
    </div>
    `
  )

  return tooltip.join('')
}

export function createThermalYAxisOption(config: ThermalConfig): YAXisOption {
  switch (config.field) {
    case 'density':
      return {
        name: 'Density (%)',
      }
    case 'temperature':
      return {
        name: 'Max. Temp. (\u00B0C)',
      }
    default:
      return {}
  }
}
