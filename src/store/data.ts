import { createRequest, SeriesDataRequest } from '@/model/data';
import {
  DataRepository,
  DateInterval,
  RenderModel,
  SeriesDataKey,
} from '@/model/types';
import objectHash from 'object-hash';
import { defineStore } from 'pinia';
import { useChartStore } from './chart';

export interface UpdateOptions {
  update: 'light' | 'full';
}

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      isFetching: false,
      data: {} as DataRepository,
      error: null as Error | null,
    };
  },
  getters: {
    renderModel: (state): RenderModel => {
      const chartStore = useChartStore();
      return {
        subplots: chartStore.subplots,
        interval: chartStore.interval,
        dataRepository: state.data,
        title: chartStore.title,
        subtitle: chartStore.subtitle,
        backgroundColor: chartStore.backgroundColor,
        margin: chartStore.margin,
      };
    },
  },
  actions: {
    async update(interval: DateInterval): Promise<void> {
      const chartStore = useChartStore();
      const requestData = [] as SeriesDataRequest[];

      chartStore.subplots.forEach((subplotConfig) => {
        subplotConfig.series.forEach((seriesConfig) => {
          const dataKey: SeriesDataKey = {
            interval,
            series: seriesConfig,
          };
          const key = objectHash.sha1(dataKey);
          if (!(key in this.data)) {
            requestData.push({
              key,
              interval,
              series: seriesConfig,
              request: createRequest(interval, seriesConfig),
            });
          }
        });
      });

      const requests = requestData.map((v) => v.request);

      await Promise.all(requests)
        .then((responses) => {
          const data = responses.map((response) => response.data);
          this.$patch((state) => {
            data.forEach((seriesData, index) => {
              const { key } = requestData[index];
              state.data[key] = seriesData;
            });
          });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
});
