import { SeriesConfig, SubplotConfig } from '@/model/types'
import { YAXisOption } from 'echarts/types/dist/shared'
import { hasMultipleSeries, hasSecondaryYAxis } from './util'
import { deduceYAxisOption } from './yAxisOption'

/**
 * It specifies whether not to contain zero position of axis compulsively. When
 * the axis scale is set to be true, the axis may not contain zero position,
 * which is useful in the scatter chart for both value axes.
 */
export function shouldAxisScale(subplot: SubplotConfig): boolean {
  const isLavaDomesRateSeries = (seriesConfig: SeriesConfig): boolean => {
    const series = seriesConfig as SeriesConfig<'LavaDomes'>
    return series.config.field === 'rate'
  }

  return subplot.series.some((series) => {
    return (
      [
        'Doas',
        'Edm',
        'GpsBaseline',
        'GpsCoordinate',
        'Magnetic',
        'Thermal',
        'Tiltmeter',
        'WeatherBabadan',
        'WeatherPasarbubar',
      ].includes(series.dataType) || isLavaDomesRateSeries(series)
    )
  })
}

export function renderYAxis(subplots: SubplotConfig[]): YAXisOption[] {
  return subplots
    .map((subplot, index) => {
      const createAxis = (option: YAXisOption = {}): YAXisOption => {
        return {
          nameGap: 35,
          nameLocation: 'middle',
          gridIndex: index,
          splitLine: { show: false },
          type: 'value',
          scale: shouldAxisScale(subplot),
          ...option,
        } as YAXisOption
      }
      const axes: YAXisOption[] = []
      if (hasMultipleSeries(subplot)) {
        axes.push(createAxis({ ...deduceYAxisOption(subplot, 'left') }))
        if (hasSecondaryYAxis(subplot)) {
          axes.push(
            createAxis({
              position: 'right',
              ...deduceYAxisOption(subplot, 'right'),
            })
          )
        }
      } else {
        const cfg = subplot.series[0] ? subplot.series[0].config : undefined
        const isAxisPositionRight = cfg
          ? cfg?.yAxis?.position === 'right'
          : false
        const position = isAxisPositionRight ? 'right' : 'left'
        axes.push(
          createAxis({
            position,
            ...deduceYAxisOption(subplot, position),
          })
        )
      }

      return axes.flat(1)
    })
    .flat(1)
}
