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
  aboutDialogOpen: boolean
  settingsMenuOpen: boolean
}

export const useWorkspaceStore = defineStore('workspace', {
  state: (): State => {
    return {
      subplotIndex: 0,
      seriesIndex: undefined,
      viewIndex: '/file/build',
      aboutDialogOpen: false,
      settingsMenuOpen: false,
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
    toggleAbout() {
      this.aboutDialogOpen = !this.aboutDialogOpen
      console.log('hello', this.aboutDialogOpen)
    },
  },
})
