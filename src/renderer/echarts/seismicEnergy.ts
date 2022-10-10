import {
  SeismicEnergyConfig,
  SeismicEnergyData,
  SeriesConfig,
} from '@/model/types'
import { cumulativeSum } from '@/shared/math'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMegajoules, toMilliseconds } from './util'

export interface SeismicEnergySeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

/**
 * Create seismic energy series.
 */
export function createSeismicEnergySeries(
  data: SeismicEnergyData[],
  config: SeismicEnergyConfig,
  options: SeismicEnergySeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesData = data.map((item) => [
    toMilliseconds(item.timestamp),
    toMegajoules(item.energy),
  ])
  const seriesConfig: SeriesConfig = {
    dataType: 'SeismicEnergy',
    config,
  }

  if (config.aggregate === 'daily-cumulative') {
    return {
      data: cumulativeSum(seriesData),
      name: objectStringify(seriesConfig),
      type: 'line',
      symbol: 'none',
      xAxisIndex,
      yAxisIndex,
    }
  } else {
    // Default. aggregate = 'daily'.
    return {
      data: seriesData,
      name: objectStringify(seriesConfig),
      type: 'bar',
      barGap: '5%',
      barWidth: '80%',
      barCategoryGap: '0%',
      xAxisIndex,
      yAxisIndex,
    }
  }
}

export function createSeismicEnergySeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD')}</div>`)
  }
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'SeismicEnergy'>

  tooltip.push(
    `<div>
    ${circle(color)}
    ${seriesConfig.config.aggregate === 'daily' ? 'Energy' : 'Cum. Energy'}:
    ${value[1] ? value[1].toFixed(2) : NO_DATA} MJ
    </div>
    `
  )

  return tooltip.join('')
}

export function createSeismicEnergyYAxisOption(
  config: SeismicEnergyConfig
): YAXisOption {
  switch (config.aggregate) {
    case 'daily':
      return {
        name: 'Energy (MJ)',
        nameGap: 55,
      }
    case 'daily-cumulative':
      return {
        name: 'Cum. Energy (MJ)',
        nameGap: 55,
      }
    default:
      return {}
  }
}
