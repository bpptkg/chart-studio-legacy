<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <v-subheader>Subplots</v-subheader>
      <div class="d-flex align-center pr-2">
        <subplot-selector></subplot-selector>
        <v-btn icon small @click="deleteSubplot">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn icon small @click="moveSubplotUp">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn icon small @click="moveSubplotDown">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
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
            <v-list-item-title>{{ subplot.dataType }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import SubplotSelector from './SubplotSelector.vue';
import { useChartStore } from '@/store/chart';
import { storeToRefs } from 'pinia';
import { useSubplotStore } from '@/store/subplot';

const chartStore = useChartStore();
const { subplots } = storeToRefs(chartStore);

const subplotStore = useSubplotStore();
const { subplotIndex } = storeToRefs(subplotStore);

function deleteSubplot(): void {
  chartStore.removeSubplot(subplotIndex.value);
  // Reset index to 0.
  subplotIndex.value = 0;
}

function moveSubplotUp(): void {
  if (subplotIndex.value > 0 && subplots.value.length > 1) {
    const from = subplotIndex.value;
    const to = from - 1;
    chartStore.moveSubplot(from, to);
    subplotIndex.value = to;
  }
}

function moveSubplotDown(): void {
  const length = subplots.value.length;
  if (subplotIndex.value < length - 1 && length > 1) {
    const from = subplotIndex.value;
    const to = from + 1;
    chartStore.moveSubplot(from, to);
    subplotIndex.value = to;
  }
}
</script>
