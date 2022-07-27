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

export const useSubplotStore = defineStore('subplot', {
  state: (): State => {
    return {
      subplotIndex: 0,
      seriesIndex: undefined,
    };
  },
});
