<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <v-subheader>Series</v-subheader>
      <div class="d-flex align-center pr-2">
        <series-selector></series-selector>
        <v-btn icon small @click="removeSeries">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </div>
    </div>

    <v-expansion-panels
      v-if="seriesConfig.length > 0"
      v-model="seriesIndex"
      flat
      focusable
      dense
    >
      <v-expansion-panel v-for="(series, index) in seriesConfig" :key="index">
        <v-expansion-panel-header> Series {{ index }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <component
            class="mt-2"
            :is="ComponentOptionsMap[series.dataType]"
            :config="series.config"
            @update="handleUpdate"
          ></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ComponentOptionsMap } from '@/components/options';
import SeriesSelector from './SeriesSelector.vue';
import { useChartStore } from '@/store/chart';
import { useSubplotStore } from '@/store/subplot';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { DataType, ParameterConfigMap } from '@/model/types';

const chartStore = useChartStore();
const { subplots } = storeToRefs(chartStore);

const subplotStore = useSubplotStore();
const { subplotIndex, seriesIndex } = storeToRefs(subplotStore);

const seriesConfig = computed(() => {
  if (subplots.value.length > 0) {
    return subplots.value[subplotIndex.value].series;
  } else {
    return [];
  }
});

function removeSeries(): void {
  if (seriesConfig.value.length > 0 && seriesIndex.value !== undefined) {
    chartStore.removeSeries(subplotIndex.value, seriesIndex.value);
    seriesIndex.value = undefined;
  }
}

function handleUpdate<T extends DataType = DataType>(
  payload: ParameterConfigMap[T]
): void {
  if (seriesIndex.value !== undefined) {
    chartStore.updateSeriesConfig(
      payload,
      subplotIndex.value,
      seriesIndex.value
    );
  }
}
</script>
