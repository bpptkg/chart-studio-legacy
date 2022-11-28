import { SeismicityConfig, SeismicityData, SeriesConfig } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted } from './shared'
import { circle, toMilliseconds } from './util'

export interface SeismicitySeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

/**
 * Create seismicity series.
 */
export function createSeismicitySeries(
  data: SeismicityData[],
  config: SeismicityConfig,
  options: SeismicitySeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const { barWidth = 80, barGap = 5 } = config
  const seriesConfig: SeriesConfig = {
    dataType: 'Seismicity',
    config,
  }
  return {
    data: data.map((item) => [toMilliseconds(item.timestamp), item.count]),
    name: objectStringify(seriesConfig),
    type: 'bar',
    barGap: `${barGap}%`,
    barWidth: `${barWidth}%`,
    barCategoryGap: '0%',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createSeismicitySeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const template: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'Seismicity'>
  if (index === 0) {
    template.push(`<div>${moment(value[0]).format('YYYY-MM-DD')}</div>`)
  }
  template.push(
    `<div>${circle(color)} ${seriesConfig.config.eventType} : ${value[1]}</div>`
  )

  return template.join('')
}

export function createSeismicityYAxisOption(
  config: SeismicityConfig
): YAXisOption {
  return { name: `${config.eventType} Count` }
}
