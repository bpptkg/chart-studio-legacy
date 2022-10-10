import {
  RfapDistanceConfig,
  RfapDistanceData,
  SeriesConfig,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA, TooltipNameData } from './shared'
import { circle, toKilometers, toMilliseconds } from './util'

export interface RfapDistanceSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export interface RfapDistanceTooltipNameData extends TooltipNameData {
  seriesConfig: SeriesConfig
  name: string
  unit: string
  precision: number
}

export function createRfapDistanceSeries(
  data: RfapDistanceData[],
  config: RfapDistanceConfig,
  options: RfapDistanceSeriesOptions = {}
): SeriesOption | SeriesOption[] {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'RfapDistance',
    config,
  }
  const field = config.field

  if (field === 'rfap-stack') {
    return [
      {
        data: data.map((item) => [
          toMilliseconds(item.timestamp),
          item.rf_count,
        ]),
        name: objectStringify({
          dataType: 'RfapDistance',
          seriesConfig,
          name: 'RF Count',
          unit: '',
          precision: 0,
        } as RfapDistanceTooltipNameData),
        type: 'bar',
        stack: 'one',
        xAxisIndex,
        yAxisIndex,
      },
      {
        data: data.map((item) => [
          toMilliseconds(item.timestamp),
          item.ap_count,
        ]),
        itemStyle: {
          color: '#c12e34',
        },
        name: objectStringify({
          dataType: 'RfapDistance',
          seriesConfig,
          name: 'AP Count',
          unit: '',
          precision: 0,
        } as RfapDistanceTooltipNameData),
        type: 'bar',
        stack: 'one',
        xAxisIndex,
        yAxisIndex,
      },
    ]
  } else if (field === 'ap-count') {
    return {
      data: data.map((item) => [toMilliseconds(item.timestamp), item.ap_count]),
      name: objectStringify({
        dataType: 'RfapDistance',
        seriesConfig,
        name: 'AP Count',
        unit: '',
        precision: 0,
      } as RfapDistanceTooltipNameData),
      type: 'bar',
      xAxisIndex,
      yAxisIndex,
    }
  } else if (field === 'ap-dist') {
    return {
      data: data.map((item) => [
        toMilliseconds(item.timestamp),
        item.ap_dist ? toKilometers(item.ap_dist) : null,
      ]),
      name: objectStringify({
        dataType: 'RfapDistance',
        seriesConfig,
        name: 'AP Distance',
        unit: 'km',
        precision: 2,
      } as RfapDistanceTooltipNameData),
      type: 'scatter',
      xAxisIndex,
      yAxisIndex,
    } as SeriesOption
  } else if (field === 'rf-dist') {
    return {
      data: data.map((item) => [
        toMilliseconds(item.timestamp),
        item.rf_dist ? toKilometers(item.rf_dist) : null,
      ]),
      name: objectStringify({
        dataType: 'RfapDistance',
        seriesConfig,
        name: 'RF Distance',
        unit: 'km',
        precision: 2,
      } as RfapDistanceTooltipNameData),
      type: 'scatter',
      xAxisIndex,
      yAxisIndex,
    } as SeriesOption
  } else {
    // Default. field = rf-count.
    return {
      data: data.map((item) => [toMilliseconds(item.timestamp), item.rf_count]),
      name: objectStringify({
        dataType: 'RfapDistance',
        seriesConfig,
        name: 'RF Count',
        unit: '',
        precision: 0,
      } as RfapDistanceTooltipNameData),
      type: 'bar',
      xAxisIndex,
      yAxisIndex,
    }
  }
}

export function createRfapDistanceSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD')}</div>`)
  }

  const tooltipData = objectParse(seriesName) as RfapDistanceTooltipNameData

  const { name, unit, precision } = tooltipData

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(precision) : NO_DATA} ${unit}
    </div>`
  )

  return tooltip.join('')
}

export function createRfapDistanceYAxisOption(
  config: RfapDistanceConfig
): YAXisOption {
  switch (config.field) {
    case 'ap-count':
      return {
        name: 'AP Count',
      }
    case 'ap-dist':
      return {
        name: 'AP Distance (km)',
      }
    case 'rf-count':
      return {
        name: 'RF Count',
      }
    case 'rf-dist':
      return {
        name: 'RF Distance (km)',
      }
    case 'rfap-stack':
      return {
        name: 'RF & AP Count',
      }
    default:
      return {}
  }
}
