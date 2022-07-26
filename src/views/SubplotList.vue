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
      <v-list-item-group mandatory v-model="selected">
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
import { ref } from 'vue';

const store = useChartStore();
const { subplots } = storeToRefs(store);

const selected = ref(0);

function deleteSubplot(): void {
  store.removeSubplot(selected.value);
  // Reset selected index to 0.
  selected.value = 0;
}

function moveSubplotUp(): void {
  if (selected.value > 0 && subplots.value.length > 1) {
    const from = selected.value;
    const to = from - 1;
    store.moveSubplot(from, to);
    selected.value = to;
  }
}

function moveSubplotDown(): void {
  const length = subplots.value.length;
  if (selected.value < length - 1 && length > 1) {
    const from = selected.value;
    const to = from + 1;
    store.moveSubplot(from, to);
    selected.value = to;
  }
}
</script>
