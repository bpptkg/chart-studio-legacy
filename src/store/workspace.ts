import { defineStore } from 'pinia';

interface State {
  /**
   * Selected subplot index.
   */
  subplotIndex: number;
  /**
   * Selected series index.
   */
  seriesIndex: number | undefined;
}

export const useWorkspaceStore = defineStore('workspace', {
  state: (): State => {
    return {
      subplotIndex: 0,
      seriesIndex: undefined,
    };
  },
  actions: {
    resetSubplotIndex(): void {
      this.subplotIndex = 0;
    },
    resetSeriesIndex(): void {
      this.seriesIndex = undefined;
    },
    setSubplotIndex(index: number): void {
      this.subplotIndex = index;
    },
    setSeriesIndex(index: number): void {
      this.seriesIndex = index;
    },
  },
});
