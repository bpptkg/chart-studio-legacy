import { defineStore } from 'pinia'
import { useWorkspaceStore } from './workspace'

interface State {
  leftPaneSize: number
  rightPaneSize: number
}

export const useBuildViewStore = defineStore('buildview', {
  state: (): State => {
    return {
      leftPaneSize: 20,
      rightPaneSize: 20,
    }
  },
  getters: {
    mainPaneSize: (state) => {
      const workspaceStore = useWorkspaceStore()
      return (
        // Only left bar shown.
        workspaceStore.showBuildLeftSidebar &&
          !workspaceStore.showBuildRightSidebar
          ? 100 - state.leftPaneSize
          : // Only right bar show.
          !workspaceStore.showBuildLeftSidebar &&
            workspaceStore.showBuildRightSidebar
          ? 100 - state.rightPaneSize
          : // Both side bars shown.
          workspaceStore.showBuildLeftSidebar &&
            workspaceStore.showBuildRightSidebar
          ? 100 - state.leftPaneSize - state.rightPaneSize
          : // No side bars shown
            100
      )
    },
  },
  actions: {
    setLeftPaneSize(size: number) {
      this.leftPaneSize = size
    },
    setRightPaneSize(size: number) {
      this.rightPaneSize = size
    },
  },
})
