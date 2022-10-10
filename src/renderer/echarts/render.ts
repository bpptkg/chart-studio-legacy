import { RenderModel } from '@/model/types'
import { EChartsOption } from 'echarts'

import { createRowGrid } from './grid'
import { renderSeries } from './series'
import { renderTooltip } from './tooltip'
import { renderXAxis } from './xAxis'
import { renderYAxis } from './yAxis'

/**
 * Render chart model to ECharts chart option.
 *
 * @param model Chart model.
 * @returns ECharts chart option.
 */
export function renderToECharts(model: RenderModel): EChartsOption {
  const {
    subplots,
    interval,
    dataRepository,
    title = '',
    subtitle = '',
    backgroundColor = '#fff',
    margin = {},
  } = model as RenderModel

  // Render grid spec.
  const grid = createRowGrid(subplots.length > 0 ? subplots.length : 1, margin)

  // Render y axis.
  const yAxis = renderYAxis(subplots)

  // Render x axis.
  const xAxis = renderXAxis(subplots, interval)

  // Render series tooltip.
  const tooltip = renderTooltip()

  // Render each series in the subplot.
  const series = renderSeries(subplots, interval, dataRepository)

  const option = {
    backgroundColor,
    title: {
      text: title,
      subtext: subtitle,
      left: 'center',
      textStyle: { fontSize: 14 },
    },
    grid,
    tooltip,
    xAxis,
    yAxis,
    series,
  }

  return option
}
