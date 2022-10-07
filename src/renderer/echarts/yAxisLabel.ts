import { SeriesConfig, SubplotConfig, YAxisOption } from '@/model/types'

export function getLeftYAxisSeries(subplot: SubplotConfig): SeriesConfig[] {
  return subplot.series.filter((series) => {
    return series.config.yAxis?.position
      ? series.config.yAxis?.position !== 'right'
      : true
  })
}

export function getRightYAxisSeries(subplot: SubplotConfig): SeriesConfig[] {
  return subplot.series.filter((series) => {
    return series.config.yAxis?.position === 'right'
  })
}

export function getYAxisLabels(series: SeriesConfig[]): string[] {
  return series.map((s) => {
    if (s.dataType === 'Seismicity') {
      return 'Count'
    } else {
      return ''
    }
  })
}

export function deduceYAxisLabel(
  subplot: SubplotConfig,
  position: YAxisOption['position']
): string {
  const leftSeries = getLeftYAxisSeries(subplot)
  const rightSeries = getRightYAxisSeries(subplot)
  const labels =
    position === 'left'
      ? getYAxisLabels(leftSeries)
      : getYAxisLabels(rightSeries)
  return labels.length ? labels[0] : ''
}
