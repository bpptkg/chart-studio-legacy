import { RfapEnergyConfig, RfapEnergyData, SeriesConfig } from '@/model/types'
import { cumulativeSum } from '@/shared/math'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA, TooltipNameData } from './shared'
import { circle, toMilliseconds } from './util'

export interface RfapEnergySeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export interface RfapEnergyTooltipNameData extends TooltipNameData {
  seriesConfig: SeriesConfig
  seriesOptions: RfapEnergySeriesOptions
  name: string
}

export function createRfapEnergySeries(
  data: RfapEnergyData[],
  config: RfapEnergyConfig,
  options: RfapEnergySeriesOptions = {}
): SeriesOption | SeriesOption[] {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options

  const seriesConfig: SeriesConfig = {
    dataType: 'RfapEnergy',
    config,
  }
  const field = config.field
  if (field === 'energy') {
    return {
      data: data.map((item) => [toMilliseconds(item.timestamp), item.energy]),
      name: objectStringify({
        dataType: 'RfapEnergy',
        seriesConfig,
        seriesOptions: options,
        name: 'Energy',
      } as RfapEnergyTooltipNameData),
      type: 'line',
      symbol: 'none',
      xAxisIndex,
      yAxisIndex,
    }
  } else if (field === 'count-rf') {
    return {
      data: data.map((item) => [
        toMilliseconds(item.timestamp),
        item.count_ROCKFALL,
      ]),
      name: objectStringify({
        dataType: 'RfapEnergy',
        seriesConfig,
        seriesOptions: options,
        name: 'RF Count',
      } as RfapEnergyTooltipNameData),
      type: 'bar',
      barGap: '5%',
      barWidth: '80%',
      barCategoryGap: '0%',
      xAxisIndex,
      yAxisIndex,
    }
  } else if (field === 'count-ap') {
    return {
      data: data.map((item) => [
        toMilliseconds(item.timestamp),
        item.count_AWANPANAS,
      ]),
      name: objectStringify({
        dataType: 'RfapEnergy',
        seriesConfig,
        seriesOptions: options,
        name: 'AP Count',
      } as RfapEnergyTooltipNameData),
      type: 'bar',
      barGap: '5%',
      barWidth: '80%',
      barCategoryGap: '0%',
      xAxisIndex,
      yAxisIndex,
    }
  } else if (field === 'rfap-stack') {
    return [
      {
        data: data.map((item) => [
          toMilliseconds(item.timestamp),
          item.count_ROCKFALL,
        ]),
        name: objectStringify({
          dataType: 'RfapEnergy',
          seriesConfig,
          seriesOptions: options,
          name: 'RF Count',
        } as RfapEnergyTooltipNameData),
        type: 'bar',
        barGap: '5%',
        barWidth: '80%',
        barCategoryGap: '0%',
        stack: 'one',
        xAxisIndex,
        yAxisIndex,
      },
      {
        data: data.map((item) => [
          toMilliseconds(item.timestamp),
          item.count_AWANPANAS,
        ]),
        itemStyle: {
          color: '#c12e34',
        },
        name: objectStringify({
          dataType: 'RfapEnergy',
          seriesConfig,
          seriesOptions: options,
          name: 'AP Count',
        } as RfapEnergyTooltipNameData),
        type: 'bar',
        barGap: '5%',
        barWidth: '80%',
        barCategoryGap: '0%',
        stack: 'one',
        xAxisIndex,
        yAxisIndex,
      },
    ] as SeriesOption[]
  } else if (field === 'energy-cumulative') {
    return {
      data: cumulativeSum(
        data.map((item) => [toMilliseconds(item.timestamp), item.energy])
      ),
      name: objectStringify({
        dataType: 'RfapEnergy',
        seriesConfig,
        seriesOptions: options,
        name: 'Cum. Energy',
      } as RfapEnergyTooltipNameData),
      type: 'line',
      symbol: 'none',
      xAxisIndex,
      yAxisIndex,
    }
  } else {
    // Default. field = 'count'.
    return {
      data: data.map((item) => [toMilliseconds(item.timestamp), item.count]),
      name: objectStringify({
        dataType: 'RfapEnergy',
        seriesConfig,
        seriesOptions: options,
        name: 'RF & AP Count',
      } as RfapEnergyTooltipNameData),
      type: 'bar',
      barGap: '5%',
      barWidth: '80%',
      barCategoryGap: '0%',
      xAxisIndex,
      yAxisIndex,
    }
  }
}

export function createRfapEnergySeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD')}</div>`)
  }

  const tooltipData = objectParse(seriesName) as RfapEnergyTooltipNameData
  const config = tooltipData.seriesConfig.config as RfapEnergyConfig

  if (['count', 'count-ap', 'count-rf', 'rfap-stack'].includes(config.field)) {
    tooltip.push(
      `<div>
        ${circle(color)}
        ${tooltipData.name}: ${value[1] ? value[1].toFixed(0) : NO_DATA}
        </div>`
    )
  } else {
    tooltip.push(
      `<div>
        ${circle(color)}
        ${tooltipData.name}: ${value[1] ? value[1].toFixed(2) : NO_DATA}
        </div>`
    )
  }

  return tooltip.join('')
}

export function createRfapEnergyYAxisOption(
  config: RfapEnergyConfig
): YAXisOption {
  switch (config.field) {
    case 'count':
      return { name: 'RF & AP Count' }
    case 'count-ap':
      return { name: 'AP Count' }
    case 'count-rf':
      return { name: 'RF Count' }
    case 'energy':
      return { name: 'Energy', nameGap: 60 }
    case 'energy-cumulative':
      return { name: 'Cum. Energy', nameGap: 60 }
    case 'rfap-stack':
      return { name: 'Count' }
    default:
      return {}
  }
}
