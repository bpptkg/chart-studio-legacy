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
