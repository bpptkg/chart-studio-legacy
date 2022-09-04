import { RfapTypeConfig, RfapTypeData } from '@/model/types'
import { SeriesOption } from 'echarts'
import _ from 'lodash'
import { tab20ColorMap } from './colors'
import { OBSERVATORY_STATIONS } from './stations'
import { getNearestCmapIndex, toKilometers, toMilliseconds } from './util'

// Exclude Kantor BPPTKG station.
const STATIONS = OBSERVATORY_STATIONS.filter(
  (station) => station.value !== 'monroom'
)

export interface RfapTypeSeriesOptions {
  type?: RfapTypeConfig['field']
}

export function createRfapTypeSeries(
  data: RfapTypeData[],
  xAxisIndex: number,
  yAxisIndex: number,
  options: RfapTypeSeriesOptions = {}
): SeriesOption | SeriesOption[] {
  const { type = 'count' } = options
  if (type === 'count') {
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
        name: station.name,
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
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 7,
      xAxisIndex,
      yAxisIndex,
    }
  }
}
