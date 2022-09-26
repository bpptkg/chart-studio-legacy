import { RfapTypeConfig, RfapTypeData, SeriesConfig } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import _ from 'lodash'
import moment from 'moment'
import { tab20ColorMap } from './colors'
import { CallbackDataParamsCasted, NO_DATA, TooltipNameData } from './shared'
import { OBSERVATORY_STATIONS } from './stations'
import {
  circle,
  getNearestCmapIndex,
  toKilometers,
  toMilliseconds,
} from './util'

// Exclude Kantor BPPTKG station.
const STATIONS = OBSERVATORY_STATIONS.filter(
  (station) => station.value !== 'monroom'
)

export interface RfapTypeSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export interface RfapTypeTooltipNameData extends TooltipNameData {
  seriesConfig: SeriesConfig
  seriesOptions: RfapTypeSeriesOptions
  name: string
}

/**
 * Create RF & AP type series.
 */
export function createRfapTypeSeries(
  data: RfapTypeData[],
  config: RfapTypeConfig,
  options: RfapTypeSeriesOptions = {}
): SeriesOption | SeriesOption[] {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'RfapType',
    config,
  }

  if (config.field === 'count') {
    return STATIONS.map((station, index) => {
      return {
        data: data.map((item) => {
          return [
            toMilliseconds(item.timestamp),
            _.get(item.countsta, station.id, 0) ||
              _.get(item.countsta, String(station.id), 0),
          ]
        }),
        itemStyle: {
          color:
            tab20ColorMap[
              getNearestCmapIndex(index, STATIONS.length, tab20ColorMap.length)
            ],
        },
        name: objectStringify({
          dataType: 'RfapType',
          seriesConfig,
          seriesOptions: options,
          name: station.name,
        } as RfapTypeTooltipNameData),
        type: 'bar',
        stack: 'one',
        xAxisIndex,
        yAxisIndex,
      }
    })
  } else {
    return {
      data: data
        .map((item) => [
          toMilliseconds(item.timestamp),
          item.distance ? toKilometers(item.distance) : 0,
        ])
        .filter((v) => v[1] > 0),
      name: objectStringify({
        dataType: 'RfapType',
        seriesConfig,
        seriesOptions: options,
        name: 'Max. Distance',
      } as RfapTypeTooltipNameData),
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 7,
      xAxisIndex,
      yAxisIndex,
    }
  }
}

export function createRfapTypeSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD')}</div>`)
  }

  const tooltipData = objectParse(seriesName) as RfapTypeTooltipNameData
  const config = tooltipData.seriesConfig.config as RfapTypeConfig
  if (config.field === 'count') {
    tooltip.push(
      `<div>
      ${circle(color)}
      ${tooltipData.name}: ${value[1] ? value[1].toFixed(0) : NO_DATA}
      </div>
      `
    )
  } else {
    tooltip.push(
      `<div>
      ${circle(color)}
      ${tooltipData.name}: ${value[1] ? value[1].toFixed(1) : NO_DATA} km
      </div>
      `
    )
  }

  return tooltip.join('')
}
