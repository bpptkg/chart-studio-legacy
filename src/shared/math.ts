import { isDef } from './util'

export const cumulativeSum = (data: (number | null)[][], col = 1) => {
  const series = [...data]

  const arr = series.map((v) => v[col])
  arr.reduce(
    (prev, cur, index) =>
      (series[index][col] = isDef(prev) ? prev + (isDef(cur) ? cur : 0) : cur),
    0
  )
  return series
}
