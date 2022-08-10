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
  showBuildLeftSidebar: boolean
  showBuildRightSidebar: boolean
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
