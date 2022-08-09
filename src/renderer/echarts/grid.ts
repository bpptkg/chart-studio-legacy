import { createIndex } from '@/shared/indexing'
import { GridOption } from 'echarts/types/dist/shared'

export interface RowGridOptions {
  margin?: number
  top?: number
  right?: number
  bottom?: number
  left?: number
}

export function createRowGrid(
  n: number,
  options: RowGridOptions = {}
): GridOption[] {
  const { margin = 2, top = 5, right = 10, bottom = 5, left = 10 } = options
  const availableSpace = 100 - (top + bottom)
  const containerSize = (availableSpace - (n - 1) * margin) / n
  const indices = createIndex(n)

  return indices.map((index) => {
    const topOffset = index * (containerSize + margin) + top
    const height = containerSize - margin

    return {
      top: `${topOffset}%`,
      height: `${height}%`,
      left: `${left}%`,
      right: `${right}%`,
    }
  })
}
