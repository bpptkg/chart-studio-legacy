<template>
  <div>
    <div class="d-flex align-center justify-space-between pr-2">
      <v-subheader>Subplots</v-subheader>

      <div class="d-flex align-center">
        <subplot-selector></subplot-selector>

        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small @click="deleteSubplot" v-on="on" v-bind="attrs">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>Remove subplot</span>
        </v-tooltip>

        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small @click="moveSubplotUp" v-on="on" v-bind="attrs">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </template>
          <span>Move subplot up</span>
        </v-tooltip>

        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small @click="moveSubplotDown" v-on="on" v-bind="attrs">
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </template>
          <span>Move subplot down</span>
        </v-tooltip>
      </div>
    </div>

    <v-list v-if="subplots.length > 0">
      <v-list-item-group mandatory v-model="subplotIndex">
        <v-list-item
          v-for="(subplot, subplotIndex) in subplots"
          :key="subplotIndex"
        >
          <v-list-item-icon>
            <v-icon>mdi-chart-box-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              DataTypeNameMap[subplot.dataType]
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import SubplotSelector from './SubplotSelector.vue'
import { useChartStore } from '@/store/chart'
import { storeToRefs } from 'pinia'
import { useWorkspaceStore } from '@/store/workspace'
import { watch } from 'vue'
import { DataTypeNameMap } from '@/model/types'

const chartStore = useChartStore()
const { subplots } = storeToRefs(chartStore)

const workspaceStore = useWorkspaceStore()
const { subplotIndex } = storeToRefs(workspaceStore)

function deleteSubplot(): void {
  if (subplots.value.length > 0) {
    chartStore.removeSubplot(subplotIndex.value)
    // Reset index to 0.
    workspaceStore.resetSubplotIndex()
  }
}

function moveSubplotUp(): void {
  if (subplotIndex.value > 0 && subplots.value.length > 1) {
    const from = subplotIndex.value
    const to = from - 1
    chartStore.moveSubplot(from, to)
    workspaceStore.setSubplotIndex(to)
  }
}

function moveSubplotDown(): void {
  const length = subplots.value.length
  if (subplotIndex.value < length - 1 && length > 1) {
    const from = subplotIndex.value
    const to = from + 1
    chartStore.moveSubplot(from, to)
    workspaceStore.setSubplotIndex(to)
  }
}

// Reset seriesIndex every time subplotIndex changed.
watch(subplotIndex, () => {
  workspaceStore.resetSeriesIndex()
})
</script>
