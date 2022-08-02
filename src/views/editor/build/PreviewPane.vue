<template>
  <preview-pane :loading="isRendering">
    <v-chart
      :style="style"
      :option="option"
      :update-options="updateOptions"
      :autoresize="true"
    ></v-chart>
  </preview-pane>
</template>

<script setup lang="ts">
import 'echarts';
import VChart from 'vue-echarts';
import PreviewPane from '@/components/PreviewPane.vue';
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
const isRendering = ref(false);

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
    isRendering.value = true;
    after(async () => {
      option.value = renderToECharts(renderModel.value);
      isRendering.value = false;
    });
  }
});

chartStore.$subscribe(() => {
  dataStore.update(chartStore.interval);
});

onMounted(() => {
  dataStore.update(chartStore.interval);
});
</script>
