<template>
  <preview-pane :loading="isRendering" @click:download="handleDownload">
    <v-chart
      ref="chart"
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
import FileSaver from 'file-saver';
import PreviewPane from '@/components/PreviewPane.vue';
import { computed, onMounted, Ref, ref } from 'vue';
import { useChartStore } from '@/store/chart';
import { useDataStore } from '@/store/data';
import { storeToRefs } from 'pinia';
import { renderToECharts } from '@/renderer/echarts/render';
import { getDataURLOptions, defaultFileName } from '@/shared/echarts';

const chartStore = useChartStore();
const dataStore = useDataStore();
const { renderModel } = storeToRefs(dataStore);

const option = ref({});
const updateOptions = ref({
  notMerge: true,
  lazyUpdate: true,
});
const isRendering = ref(false);
const chart: Ref<typeof VChart> = ref(null);

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

function handleDownload() {
  if (chart.value) {
    const url = chart.value?.getDataURL(getDataURLOptions);
    FileSaver.saveAs(url, `${chartStore.title || defaultFileName}.png`);
  }
}

onMounted(() => {
  dataStore.update(chartStore.interval);
});
</script>
