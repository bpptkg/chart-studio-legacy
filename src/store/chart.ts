import { DATE_FORMAT } from '@/constants/datetime';
import type {
  SeriesConfig,
  SubplotConfig,
  DateInterval,
  DataType,
  ParameterConfigMap,
} from '@/model/types';
import { assert } from '@/shared/assertions';
import moment from 'moment';
import { defineStore } from 'pinia';

interface State {
  subplots: SubplotConfig[];
  interval: DateInterval;
}

export const useChartStore = defineStore('chart', {
  state: (): State => {
    return {
      subplots: [],
      interval: {
        end: moment().format(DATE_FORMAT),
        start: moment().subtract(7, 'days').format(DATE_FORMAT),
      },
    };
  },
  actions: {
    addSubplot(subplot: SubplotConfig): void {
      this.subplots.push(subplot);
    },

    insertSubplot(subplot: SubplotConfig, at: number): void {
      const length = this.subplots.length;
      assert(at >= 0 && at < length, 'Subplot index out of range');
      this.subplots.splice(at, 0, subplot);
    },

    removeSubplot(index: number): void {
      const length = this.subplots.length;
      assert(index >= 0 && index < length, 'Subplot index out of range');
      this.subplots.splice(index, 1);
    },

    moveSubplot(from: number, to: number): void {
      const item = this.subplots.splice(from, 1)[0];
      this.subplots.splice(to, 0, item);
    },

    clearAllSubplots(): void {
      this.subplots.splice(0, this.subplots.length);
    },

    addSeries(series: SeriesConfig, subplotIndex: number): void {
      const length = this.subplots.length;
      assert(
        subplotIndex >= 0 && subplotIndex < length,
        'Subplot index out of range'
      );

      this.subplots[subplotIndex].series.push(series);
    },

    removeSeries(subplotIndex: number, index: number) {
      const subplotLength = this.subplots.length;
      assert(
        subplotIndex >= 0 && subplotIndex < subplotLength,
        'Subplot index out of range'
      );

      const series = this.subplots[subplotIndex].series;
      const length = series.length;
      assert(index >= 0 && index < length, 'Series index out of range');
      series.splice(index, 1);
    },

    updateSeriesConfig<T extends DataType = DataType>(
      config: ParameterConfigMap[T],
      subplotIndex: number,
      index: number
    ): void {
      const subplotLength = this.subplots.length;
      assert(
        subplotIndex >= 0 && subplotIndex < subplotLength,
        'Subplot index out of range'
      );

      const series = this.subplots[subplotIndex].series;
      const length = series.length;
      assert(index >= 0 && index < length, 'Series index out of range');

      this.subplots[subplotIndex].series[index].config = config;
    },

    setInterval(interval: DateInterval): void {
      this.$patch((state) => {
        state.interval = interval;
      });
    },
  },
});
