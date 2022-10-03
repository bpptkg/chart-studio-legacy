import {
  GpsCoordinateConfig,
  GpsCoordinateData,
  SeriesConfig,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface GpsCoordinateSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createGpsCoordinateSeries(
  data: GpsCoordinateData[],
  config: GpsCoordinateConfig,
  options: GpsCoordinateSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'GpsCoordinate',
    config,
  }
  return {
    data: data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field],
    ]),
    name: objectStringify(seriesConfig),
    type: 'scatter',
    symbolSize: 6,
    xAxisIndex,
    yAxisIndex,
  }
}

export function createGpsCoordinateSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }

  const seriesConfig = objectParse(seriesName) as SeriesConfig<'GpsCoordinate'>
  const config = seriesConfig.config

  tooltip.push(
    `<div>
    ${circle(color)}
    ${
      config.field === 'east'
        ? 'Easting'
        : config.field === 'north'
        ? 'Northing'
        : 'Elevation'
    }: ${value[1] ? value[1].toFixed(3) : NO_DATA} m
    </div>
    `
  )

  return tooltip.join('')
}
