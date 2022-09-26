import moment from 'moment'
import _ from 'lodash'
import { CallbackDataParams } from 'echarts/types/dist/shared'
import { SeriesOption } from 'echarts'
import {
  RfapDirectionConfig,
  RfapDirectionData,
  SeriesConfig,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import {
  toMilliseconds,
  getNearestCmapIndex,
  toKilometers,
  circle,
} from './util'
import { tab20ColorMap } from './colors'
import { CallbackDataParamsCasted, NO_DATA, TooltipNameData } from './shared'

// List of all RF & AP directions.
export const DIRECTION = {
  apu: 'Apu',
  batang: 'Batang',
  bebeng: 'Bebeng',
  bedog: 'Bedog',
  boyong: 'Boyong',
  gendol: 'Gendol',
  krasak: 'Krasak',
  kuning: 'Kuning',
  lamat: 'Lamat',
  opak: 'Opak',
  satputih: 'Sat/Putih',
  senowo1: 'Senowo1',
  senowo2: 'Senowo2',
  senowo3: 'Senowo3',
  trising: 'Trising',
  woro: 'Woro',
  timur: 'TIMUR',
  tenggara: 'TENGGARA',
  selatan: 'SELATAN',
  baratdaya: 'BARAT DAYA',
  barat: 'BARAT',
  baratlaut: 'BARAT LAUT',
  utara: 'UTARA',
  timurlaut: 'TIMUR LAUT',
}

export const DIRECTION_GROUP = [
  // Utara
  [DIRECTION.utara],

  // Timur Laut
  [DIRECTION.timurlaut],

  // Timur
  [DIRECTION.timur],

  // Tenggara
  [DIRECTION.tenggara, DIRECTION.gendol, DIRECTION.woro],

  // Selatan
  [DIRECTION.selatan, DIRECTION.kuning, DIRECTION.opak],

  // Barat Daya
  [
    DIRECTION.baratdaya,
    DIRECTION.satputih,
    DIRECTION.krasak,
    DIRECTION.bebeng,
    DIRECTION.boyong,
  ],

  // Barat
  [
    DIRECTION.barat,
    DIRECTION.senowo2,
    DIRECTION.senowo3,
    DIRECTION.batang,
    DIRECTION.lamat,
  ],

  // Barat Laut
  [DIRECTION.baratlaut, DIRECTION.apu, DIRECTION.trising, DIRECTION.senowo1],
]

export const DIRECTION_GROUP_INDEX = [
  'N [Utara]',
  'NE [Timur Laut]',
  'E [Timur]',
  'SE [Tenggara]',
  'S [Selatan]',
  'SW [Barat Daya]',
  'W [Barat]',
  'NW [Barat Laut]',
]

export interface RfapDirectionSeriesOptions {
  useDirectionGroup?: boolean
  xAxisIndex?: number
  yAxisIndex?: number
}

export interface RfapDirectionTooltipNameData extends TooltipNameData {
  seriesConfig: SeriesConfig
  seriesOptions: RfapDirectionSeriesOptions
  name: string
}

export function createRfapDirectionSeries(
  data: RfapDirectionData[],
  config: RfapDirectionConfig,
  options: RfapDirectionSeriesOptions = {}
): SeriesOption | SeriesOption[] {
  const { useDirectionGroup = false, xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'RfapDirection',
    config,
  }

  if (config.field === 'distance') {
    return {
      data: data.map((item) => [
        toMilliseconds(item.timestamp),
        item.distance ? toKilometers(item.distance) : null,
      ]),
      name: objectStringify({
        dataType: 'RfapDirection',
        seriesConfig,
        seriesOptions: options,
        name: 'Max. Distance',
      } as RfapDirectionTooltipNameData),
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 7,
      xAxisIndex,
      yAxisIndex,
    } as SeriesOption
  } else {
    if (useDirectionGroup) {
      return DIRECTION_GROUP.map((group, index) => {
        const sumCountDir = (countdir: { [key: string]: number }): number => {
          const caseInsensitiveDirectionGroup = group.map((v) =>
            v.toLowerCase()
          )
          // Sum count per direction group.
          const keys = Object.keys(countdir || {}).filter((k) =>
            caseInsensitiveDirectionGroup.includes(k.toLowerCase())
          )
          return _.sum(keys.map((k) => countdir[k]))
        }

        return {
          areaStyle: {},
          data: data.map((item) => [
            toMilliseconds(item.timestamp),
            sumCountDir(item.countdir),
          ]),
          name: objectStringify({
            dataType: 'RfapDirection',
            seriesConfig,
            seriesOptions: options,
            name: DIRECTION_GROUP_INDEX[index],
          } as RfapDirectionTooltipNameData),
          type: 'bar',
          stack: 'one',
          xAxisIndex,
          yAxisIndex,
        }
      })
    } else {
      const nonEmptyDirectionData: Array<{
        direction: string
        data: number[][]
      }> = []

      Object.values(DIRECTION).forEach((direction) => {
        const directionData = data.map((item) => {
          return [
            toMilliseconds(item.timestamp),
            _.get(item.countdir, direction, 0),
          ]
        })

        // ECharts 5 cannot stack time axis whose y data only partially complete.
        // So, only append direction data whose one or more non-zero count values
        // and exclude direction data if all count values are zero.
        if (directionData.some((v) => v[1] > 0)) {
          nonEmptyDirectionData.push({ direction, data: directionData })
        }
      })

      return nonEmptyDirectionData.map((direction, index) => {
        return {
          areaStyle: {},
          data: direction.data,
          itemStyle: {
            color:
              tab20ColorMap[
                getNearestCmapIndex(
                  index,
                  nonEmptyDirectionData.length,
                  tab20ColorMap.length
                )
              ],
          },
          name: objectStringify({
            dataType: 'RfapDirection',
            seriesConfig,
            seriesOptions: options,
            name: direction.direction,
          } as RfapDirectionTooltipNameData),
          type: 'bar',
          stack: 'one',
          xAxisIndex,
          yAxisIndex,
        }
      })
    }
  }
}

export function createRfapDirectionSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted

  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD')}</div>`)
  }

  const tooltipData = objectParse(seriesName) as RfapDirectionTooltipNameData
  const config = tooltipData.seriesConfig.config as RfapDirectionConfig

  if (config.field === 'distance') {
    tooltip.push(
      `<div>
      ${circle(color)}
      ${tooltipData.name}: ${value[1] ? value[1].toFixed(1) : NO_DATA} km
      </div>
      `
    )
  } else {
    if (tooltipData.seriesOptions.useDirectionGroup) {
      tooltip.push(
        `<div>
        ${circle(color)}
        ${tooltipData.name}: ${value[1] ? value[1].toFixed(0) : NO_DATA}
        </div>
        `
      )
    } else {
      tooltip.push(
        `<div>
        ${circle(color)}
        ${tooltipData.name}: ${value[1] ? value[1].toFixed(0) : NO_DATA}
        </div>
        `
      )
    }
  }

  return tooltip.join('')
}
