import { SeriesOption } from 'echarts'

export function createEmptySeries(): SeriesOption {
  return {
    data: [],
    name: '{}',
    type: 'line',
  }
}
