import { createRequest, SeriesDataRequest } from '@/model/data'
import {
  DataRepository,
  DateInterval,
  RenderModel,
  SeriesDataKey,
} from '@/model/types'
import objectHash from 'object-hash'
import { defineStore, storeToRefs } from 'pinia'
import { useChartStore } from './chart'
import { useCompareStore } from './compare'

interface State {
  /**
   * Data repository object.
   */
  data: DataRepository
}

export const useCompareDataStore = defineStore('compareData', {
  state: (): State => {
    return {
      data: {},
    }
  },
  getters: {
    renderModels: (state): RenderModel[] => {
      const chartStore = useChartStore()
      const compareStore = useCompareStore()

      return compareStore.intervals.map((interval) => {
        return {
          subplots: chartStore.subplots,
          interval: interval,
          dataRepository: state.data,
          title: chartStore.title,
          subtitle: chartStore.subtitle,
          backgroundColor: chartStore.backgroundColor,
          margin: chartStore.margin,
        }
      })
    },
  },
  actions: {
    async getSeriesData(interval: DateInterval) {
      const chartStore = useChartStore()
      const requestData = [] as SeriesDataRequest[]

      chartStore.subplots.forEach((subplotConfig) => {
        subplotConfig.series.forEach((seriesConfig) => {
          const dataKey: SeriesDataKey = {
            interval,
            series: seriesConfig,
          }
          const key = objectHash.sha1(dataKey)
          if (!(key in this.data)) {
            requestData.push({
              key,
              interval,
              series: seriesConfig,
              request: createRequest(interval, seriesConfig),
            })
          }
        })
      })

      const requests = requestData.map((v) => v.request)

      const responses = await Promise.all(requests)
      const data = responses.map((response) => response.data)
      return { requestData, data }
    },

    async update() {
      const compareStore = useCompareStore()
      const { intervals } = storeToRefs(compareStore)

      const promises = intervals.value.map((interval) => {
        return this.getSeriesData(interval)
      })

      const allSeriesData = await Promise.all(promises)

      this.$patch((state) => {
        allSeriesData.forEach(({ requestData, data }) => {
          data.forEach((seriesData, index) => {
            const { key } = requestData[index]
            state.data[key] = seriesData
          })
        })
      })
    },
  },
})
