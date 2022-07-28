<template>
  <div>
    <v-chart
      class="chart"
      :option="option"
      :update-options="updateOptions"
      :autoresize="true"
    ></v-chart>
  </div>
</template>

<script setup lang="ts">
import 'echarts';
import VChart from 'vue-echarts';
import { ref } from 'vue';
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
</script>

<style lang="scss" scoped>
.chart {
  width: 400px;
  height: 500px;
}
</style>
