import { SubplotConfig } from '@/model/types'
import moment from 'moment'

/**
 * Convert timestamp number or string to Unix milliseconds.
 */
export function toMilliseconds(v: number | string): number {
  return moment(v).unix() * 1000
}

/**
 * Convert 10^12 erg to Mega Joule.
 */
export function toMegajoules(v: number): number {
  return v / 10
}

/**
 * Convert meter to kilometer.
 */
export function toKilometers(v: number): number {
  return v / 1000
}

/**
 * Get nearest color for current item index.
 */
export function getNearestCmapIndex(
  index: number,
  itemLength: number,
  cmapLength: number
): number {
  return itemLength === cmapLength
    ? index
    : Math.floor(index * (cmapLength / itemLength))
}

export function circle(color: string, { size = 12 } = {}): string {
  const style = `
    background-color: ${color};
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    display: inline-block;
  `
  return `<span style="${style}"></span>`
}

/**
 * Check whether particular subplot has multiple series or not.
 */
export function hasMultipleSeries(subplot: SubplotConfig): boolean {
  return subplot.series.length > 1
}

/**
 * Check whether particular subplot has secondary y axis or not. Particular
 * subplot has secondary y axis if it has both left and right y axes.
 */
export function hasSecondaryYAxis(subplot: SubplotConfig): boolean {
  if (hasMultipleSeries(subplot)) {
    let foundLeft = true
    let foundRight = false

    subplot.series.forEach((series) => {
      const yAxis = series.config.yAxis
      if (yAxis?.position === 'left') {
        foundLeft = true
      }
      if (yAxis?.position === 'right') {
        foundRight = true
      }
    })

    return foundLeft && foundRight
  } else {
    return false
  }
}

/**
 * Determine y axis index for particular series in the subplot.
 */
export function findYAxisIndex(
  subplots: SubplotConfig[],
  subplotIndex: number,
  seriesIndex: number
): number {
  const cfg = subplots[subplotIndex].series[seriesIndex].config
  const isAxisPositionRight = cfg.yAxis?.position === 'right'
  let offset = -1
  for (let i = 0; i < subplotIndex + 1; i++) {
    const subplot = subplots[i]
    if (hasSecondaryYAxis(subplot)) {
      offset += 2
    } else {
      offset += 1
    }
  }
  const subplot = subplots[subplotIndex]
  if (hasSecondaryYAxis(subplot)) {
    return isAxisPositionRight ? offset : offset - 1
  } else {
    return offset
  }
}
