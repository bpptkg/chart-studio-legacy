import { SeriesConfig, TiltmeterConfig, TiltmeterData } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface TiltmeterSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createTiltmeterSeries(
  data: TiltmeterData[],
  config: TiltmeterConfig,
  options: TiltmeterSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex, yAxisIndex } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'Tiltmeter',
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

export function createTiltmeterSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD')}</div>`)
  }

  const seriesConfig = objectParse(seriesName) as SeriesConfig<'Tiltmeter'>
  const config = seriesConfig.config

  tooltip.push(
    `<div>
    ${circle(color)}
    ${
      config.field === 'x' ? 'X' : config.field === 'y' ? 'Y' : 'Temperature'
    }: ${value[1] ? value[1].toFixed(2) : NO_DATA} ${
      ['x', 'y'].includes(config.field) ? '\u00B5rad' : '\u00B0C'
    }
    </div>
    `
  )

  return tooltip.join('')
}
