import { defineStore } from 'pinia'
import { useWorkspaceStore } from './workspace'

interface State {
  /**
   * Size of left pane.
   */
  leftPaneSize: number
}

export const useCompareViewStore = defineStore('compareView', {
  state: (): State => {
    return {
      leftPaneSize: 20,
    }
  },
  getters: {
    mainPaneSize: (state) => {
      const workspaceStore = useWorkspaceStore()
      return workspaceStore.showBuildLeftSidebar
        ? 100 - state.leftPaneSize
        : 100
    },
  },
  actions: {
    setLeftPaneSize(size: number) {
      this.leftPaneSize = size
    },
  },
})
