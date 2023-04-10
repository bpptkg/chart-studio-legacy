import { GpsBaselineConfig, GpsBaselineData, SeriesConfig } from '@/model/types'
import { objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'
import { GpsStationCodeMap } from '@/components/options/gpsStations'

export interface GpsBaselineSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createGpsBaselineSeries(
  data: GpsBaselineData[],
  config: GpsBaselineConfig,
  options: GpsBaselineSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'GpsBaseline',
    config,
  }
  return {
    data: data.map((item) => [toMilliseconds(item.timestamp), item.baseline]),
    name: objectStringify(seriesConfig),
    type: 'line',
    symbolSize: 6,
    xAxisIndex,
    yAxisIndex,
  }
}

export function createGpsBaselineSeriesTooltip(
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
    Baseline: ${value[1] ? value[1].toFixed(3) : NO_DATA} m
    </div>
    `
  )

  return tooltip.join('')
}

export function createGpsBaselineYAxisOption(
  config: GpsBaselineConfig
): YAXisOption {
  const station1 = GpsStationCodeMap[config.station1]
  const station2 = GpsStationCodeMap[config.station2]
  return {
    name: `${station1}-${station2} (m)`,
    nameGap: 65,
    axisLabel: {
      formatter: (value: number | string) =>
        typeof value === 'number' ? value.toFixed(3) : value,
    },
  }
}
