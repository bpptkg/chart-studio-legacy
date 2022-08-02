<template>
  <splitpanes class="cs-theme" :class="{ 'cs-theme--dark': isDarkTheme }">
    <pane min-size="10" size="20">
      <settings-pane></settings-pane>
    </pane>
    <pane>
      <v-progress-linear v-show="isRendering" indeterminate></v-progress-linear>
      <splitpanes
        v-if="intervals.length"
        class="cs-theme"
        :class="{ 'cs-theme--dark': isDarkTheme }"
      >
        <pane min-size="10" v-for="(__, index) in intervals" :key="index">
          <preview-pane @click:download="handleDownload(index)">
            <v-chart
              ref="charts"
              :style="style"
              :option="options[index] || {}"
              :update-options="updateOptions"
              :autoresize="true"
            ></v-chart>
          </preview-pane>
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
import 'echarts';
import VChart from 'vue-echarts';
import FileSaver from 'file-saver';
import { useCompareStore } from '@/store/compare';
import { useCompareDataStore } from '@/store/compareData';
import { Splitpanes, Pane } from 'splitpanes';
import SettingsPane from './SettingsPane.vue';
import PreviewPane from '@/components/PreviewPane.vue';
import { useTheme } from '@/composables/theme';
import { computed, onMounted, Ref, ref } from 'vue';
import { useChartStore } from '@/store/chart';
import { renderToECharts } from '@/renderer/echarts/render';
import { storeToRefs } from 'pinia';
import { EChartsOption } from 'echarts';
import { getDataURLOptions, defaultFileName } from '@/shared/echarts';

const charts: Ref<Array<typeof VChart> | null> = ref(null);

const { isDarkTheme } = useTheme();

const chartStore = useChartStore();
const compareStore = useCompareStore();
const compareDataStore = useCompareDataStore();

const { intervals } = storeToRefs(compareStore);
const { renderModels } = storeToRefs(compareDataStore);

compareStore.$subscribe(() => {
  compareDataStore.update();
});

chartStore.$subscribe(() => {
  compareDataStore.update();
});

const updateOptions = ref({
  notMerge: true,
});

const options: Ref<EChartsOption[]> = ref([]);
const isRendering = ref(false);

const style = computed(() => {
  return {
    width: `${chartStore.width}px`,
    height: `${chartStore.height}px`,
    backgroundColor: `${chartStore.backgroundColor}`,
  };
});

compareDataStore.$onAction(({ name, after }) => {
  if (name === 'update') {
    isRendering.value = true;
    after(async () => {
      options.value = renderModels.value.map((renderModel) => {
        return renderToECharts(renderModel);
      });
      isRendering.value = false;
    });
  }
});

function handleDownload(index: number) {
  if (charts.value) {
    const url = charts.value[index].getDataURL(getDataURLOptions);
    FileSaver.saveAs(url, `${chartStore.title || defaultFileName}.png`);
  }
}

onMounted(() => {
  // Update compare data on mounted.
  compareDataStore.update();
});
</script>

<style lang="scss">
@import '@/scss/splitpanes.scss';
</style>
