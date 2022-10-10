import rsamBands from '@/components/options/rsamBands'
import { RsamSeismicConfig, RsamSeismicData, SeriesConfig } from '@/model/types'
import { cumulativeSum } from '@/shared/math'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA, TooltipNameData } from './shared'
import { circle, toMilliseconds } from './util'

export interface RsamSeismicSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export interface RsamSeismicTooltipNameData extends TooltipNameData {
  seriesConfig: SeriesConfig
  name: string
}

export function createRsamSeismicSeries(
  data: RsamSeismicData[],
  config: RsamSeismicConfig,
  options: RsamSeismicSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options

  const seriesConfig: SeriesConfig = {
    dataType: 'RsamSeismic',
    config,
  }

  const field = config.field
  if (field === 'value-cumulative') {
    return {
      data: cumulativeSum(
        data.map((item) => [toMilliseconds(item.timestamp), item[config.band]])
      ),
      name: objectStringify({
        dataType: 'RsamSeismic',
        seriesConfig,
        name: 'Cum. Value',
      } as RsamSeismicTooltipNameData),
      type: 'line',
      symbol: 'none',
      xAxisIndex,
      yAxisIndex,
    }
  } else {
    return {
      data: data.map((item) => [
        toMilliseconds(item.timestamp),
        item[config.band],
      ]),
      name: objectStringify({
        dataType: 'RsamSeismic',
        seriesConfig,
        name: 'Value',
      } as RsamSeismicTooltipNameData),
      type: 'line',
      symbol: 'none',
      xAxisIndex,
      yAxisIndex,
    }
  }
}

export function createRsamSeismicSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }

  const tooltipData = objectParse(seriesName) as RsamSeismicTooltipNameData

  tooltip.push(
    `<div>
      ${circle(color)}
      ${tooltipData.name}: ${value[1] ? value[1].toFixed(2) : NO_DATA} AU
      </div>`
  )

  return tooltip.join('')
}

export function createRsamSeismicYAxisOption(
  config: RsamSeismicConfig
): YAXisOption {
  return {
    name: rsamBands.find((v) => v.value === config.band)?.text,
    nameGap: 60,
  }
}
