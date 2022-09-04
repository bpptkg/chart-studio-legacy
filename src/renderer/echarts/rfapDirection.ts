import _ from 'lodash'
import { RfapDirectionData } from '@/model/types'
import { SeriesOption } from 'echarts'
import { toMilliseconds, getNearestCmapIndex } from './util'
import { tab20ColorMap } from './colors'

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

interface RfapDirectionSeriesOptions {
  useDirectionGroup?: boolean
}

export function createRfapDirectionSeries(
  data: RfapDirectionData[],
  xAxisIndex: number,
  yAxisIndex: number,
  options: RfapDirectionSeriesOptions = {}
): SeriesOption[] {
  const { useDirectionGroup = false } = options

  if (useDirectionGroup) {
    return DIRECTION_GROUP.map((group, index) => {
      const sumCountDir = (countdir: { [key: string]: number }): number => {
        const caseInsensitiveDirectionGroup = group.map((v) => v.toLowerCase())
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
        name: DIRECTION_GROUP_INDEX[index],
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
        name: direction.direction,
        type: 'bar',
        stack: 'one',
        xAxisIndex,
        yAxisIndex,
      }
    })
  }
}
