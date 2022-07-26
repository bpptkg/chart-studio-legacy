import { createRequest, SeriesDataRequest } from '@/model/data';
import { DataRepository } from '@/model/types';
import hash from 'object-hash';
import { defineStore } from 'pinia';
import { useChartStore } from './chart';

export interface UpdateOptions {
  update: 'light' | 'full';
}

export const useDataStore = defineStore('data', {
  state() {
    return {
      isUpdating: false,
      data: {} as DataRepository,
      error: null as Error | null,
    };
  },
  getters: {},
  actions: {
    update() {
      const chartStore = useChartStore();
      const interval = chartStore.interval;
      const requestData = [] as SeriesDataRequest[];

      chartStore.subplots.forEach((subplotConfig) => {
        subplotConfig.series.forEach((seriesConfig) => {
          const key = hash.sha1({ interval, seriesConfig });
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

      Promise.all(requests)
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
