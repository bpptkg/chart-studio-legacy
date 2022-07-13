import { Axes, ChartModel } from '@/model/chartModel';
import { PlotType } from '@/model/seriesOptions';
import { defineStore } from 'pinia';

export const useChartStore = defineStore('chart', {
  state: () => {
    return {
      model: new ChartModel({}),
    };
  },
  actions: {
    addSubplot() {
      this.model.createSubplot();
    },
    addSubplotAt(index: number) {
      this.model.createSubplotAt(index);
    },
    removeSubplot(index: number) {
      this.model.removeSubplot(index);
    },
    addSeries(subplot: Axes) {
      subplot.createSeries('Seismicity', {
        eventType: 'VTA',
        name: 'Seismicity',
        visible: true,
        plotType: PlotType.Line,
      });
    },
    removeSeries(subplot: Axes, index: number) {
      subplot.removeSeriesAt(index);
    },
  },
});
