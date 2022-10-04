import { DoasConfig, DoasData, SeriesConfig } from '@/model/types'
import { objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface DoasSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createDoasSeries(
  data: DoasData[],
  config: DoasConfig,
  options: DoasSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'Doas',
    config,
  }
  return {
    data: data.map((item) => [toMilliseconds(item.starttime), item.flux]),
    name: objectStringify(seriesConfig),
    type: 'scatter',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createDoasSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }

  tooltip.push(
    `<div>
    ${circle(color)}
    Flux: ${value[1] ? value[1].toFixed(1) : NO_DATA} ton/day
    </div>
    `
  )

  return tooltip.join('')
}
