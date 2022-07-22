import { DataType, SubplotConfig } from '@/model/types';
import { defineStore } from 'pinia';

export const useChartStore = defineStore('chart', {
  state: () => {
    return {
      subplots: [] as SubplotConfig<DataType>[],
      start: '2022-07-20',
      end: '2022-07-21',
    };
  },
  actions: {},
});
