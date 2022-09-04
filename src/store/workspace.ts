import { defineStore } from 'pinia'

interface State {
  /**
   * Selected subplot index.
   */
  subplotIndex: number
  /**
   * Selected series index.
   */
  seriesIndex: number | undefined
  /**
   * Tabs Build | Compare.
   */
  viewIndex: string
  /**
   * Whether to show build view left panel or not.
   */
  showBuildLeftSidebar: boolean
  /**
   * Whether to show build view right panel or not.
   */
  showBuildRightSidebar: boolean
  /**
   * Whether to show compare view left panel or not.
   */
  showCompareLeftSidebar: boolean
}

export const useWorkspaceStore = defineStore('workspace', {
  state: (): State => {
    return {
      subplotIndex: 0,
      seriesIndex: undefined,
      viewIndex: '/file/build',
      showBuildLeftSidebar: true,
      showBuildRightSidebar: true,
      showCompareLeftSidebar: true,
    }
  },
  getters: {
    isBuildView: (state) => {
      return state.viewIndex === '/file/build'
    },
    isCompareView: (state) => {
      return state.viewIndex === '/file/compare'
    },
  },
  actions: {
    resetSubplotIndex(): void {
      this.subplotIndex = 0
    },
    resetSeriesIndex(): void {
      this.seriesIndex = undefined
    },
    setSubplotIndex(index: number): void {
      this.subplotIndex = index
    },
    setSeriesIndex(index: number): void {
      this.seriesIndex = index
    },
    toggleBuildLeftSidebar() {
      this.showBuildLeftSidebar = !this.showBuildLeftSidebar
    },
    toggleBuildRightSidebar() {
      this.showBuildRightSidebar = !this.showBuildRightSidebar
    },
    toggleCompareLeftSidebar() {
      this.showCompareLeftSidebar = !this.showCompareLeftSidebar
    },
  },
})
