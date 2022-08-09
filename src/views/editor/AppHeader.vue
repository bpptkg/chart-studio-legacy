<template>
  <v-app-bar app flat dense>
    <div>
      <v-tabs v-model="viewIndex" fixed-tabs background-color="transparent">
        <v-tab to="/file/build">Build</v-tab>
        <v-tab to="/file/compare">Compare</v-tab>
      </v-tabs>
    </div>

    <div class="d-flex align-center ml-4">
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs" @click="createNewChart">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>New chart</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs" @click="print">
            <v-icon>mdi-printer-outline</v-icon>
          </v-btn>
        </template>
        <span>Print</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs" @click="undo">
            <v-icon>mdi-undo</v-icon>
          </v-btn>
        </template>
        <span>Undo</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs" @click="redo">
            <v-icon>mdi-redo</v-icon>
          </v-btn>
        </template>
        <span>Redo</span>
      </v-tooltip>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <settings-menu></settings-menu>

      <div class="ml-4">
        <user-avatar></user-avatar>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useChartStore } from '@/store/chart'
import { useCompareStore } from '@/store/compare'
import { useWorkspaceStore } from '@/store/workspace'
import { storeToRefs } from 'pinia'
import printJS from 'print-js'
import router from '@/router'
import SettingsMenu from './SettingsMenu.vue'
import UserAvatar from '../UserAvatar.vue'

const workspaceStore = useWorkspaceStore()
const { viewIndex } = storeToRefs(workspaceStore)

const chartStore = useChartStore()
const compareStore = useCompareStore()

function createNewChart() {
  // For now, just open a new tab.
  const route = router.resolve({ path: '/file/build' })
  if (route) {
    window.open(route.href, '_blank')
  }
}

function print() {
  if (workspaceStore.isBuildView) {
    printJS({
      printable: 'printable-build',
      type: 'html',
    })
  } else if (workspaceStore.isCompareView) {
    printJS({
      printable: 'printable-compare',
      type: 'html',
    })
  }
}

function undo() {
  if (workspaceStore.isBuildView) {
    chartStore.undo()
  } else if (workspaceStore.isCompareView) {
    compareStore.undo()
  }
}

function redo() {
  if (workspaceStore.isBuildView) {
    chartStore.redo()
  } else if (workspaceStore.isCompareView) {
    compareStore.redo()
  }
}
</script>
