export const cumulativeSum = (data: number[][]) => {
  const series = [...data]
  const arr = series.map((v) => v[1])
  arr.reduce((a, b, i) => (series[i][1] = a + b), 0)
  return series
}
