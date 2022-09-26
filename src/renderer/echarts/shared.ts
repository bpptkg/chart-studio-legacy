import { DataType } from '@/model/types'

export type CallbackDataParamsCasted = {
  seriesName: string
  value: number[]
  color: string
}

export interface TooltipNameData {
  dataType: DataType
}

export const NO_DATA = '-'
