<template>
  <v-chart
    :style="style"
    :option="option"
    :update-options="updateOptions"
    :autoresize="true"
  ></v-chart>
</template>

<script setup lang="ts">
import 'echarts';
import VChart from 'vue-echarts';
import { computed, onMounted, ref } from 'vue';
import { useChartStore } from '@/store/chart';
import { useDataStore } from '@/store/data';
import { storeToRefs } from 'pinia';
import { renderToECharts } from '@/renderer/echarts/render';

const chartStore = useChartStore();
const dataStore = useDataStore();
const { renderModel } = storeToRefs(dataStore);

const option = ref({});
const updateOptions = ref({
  notMerge: true,
  lazyUpdate: true,
});

const style = computed(() => {
  return {
    width: `${chartStore.width}px`,
    height: `${chartStore.height}px`,
    backgroundColor: `${chartStore.backgroundColor}`,
  };
});

dataStore.$onAction(({ name, after }) => {
  if (name === 'update') {
    // Rerender chart configuration after data update.
    after(async () => {
      option.value = renderToECharts(renderModel.value);
    });
  }
});

chartStore.$subscribe(() => {
  dataStore.update();
});

onMounted(() => {
  option.value = renderToECharts(renderModel.value);
});
</script>
