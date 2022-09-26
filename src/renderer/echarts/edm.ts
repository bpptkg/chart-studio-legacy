import { EdmConfig, EdmData, SeriesConfig } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface EdmSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

/**
 * Create EDM series.
 */
export function createEdmSeries(
  data: EdmData[],
  config: EdmConfig,
  options: EdmSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const fieldName =
    config.type === 'csd'
      ? 'csd'
      : config.type === 'rate'
      ? 'rate'
      : 'slope_distance'
  const seriesConfig: SeriesConfig = {
    dataType: 'Edm',
    config,
  }

  return {
    data: data.map((item) => [toMilliseconds(item.timestamp), item[fieldName]]),
    name: objectStringify(seriesConfig),
    type: 'line',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createEdmSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const template: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'Edm'>
  const config = seriesConfig.config
  if (index === 0) {
    template.push(
      `<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`
    )
  }

  switch (config.type) {
    case 'slope':
      template.push(
        `<div>
        ${circle(color)}
        Slope Dist.: ${value[1] ? value[1].toFixed(3) : NO_DATA} m
        </div>`
      )
      break
    case 'csd':
      template.push(
        `<div>
        ${circle(color)}
        CSD: ${isFinite(value[1]) ? value[1].toFixed(2) : NO_DATA} cm
        </div>`
      )
      break
    case 'rate':
      template.push(
        `<div>
        ${circle(color)}
        Rate: ${value[1] ? value[1].toFixed(2) : NO_DATA} mm/day
        </div>`
      )
      break
  }

  return template.join('')
}
