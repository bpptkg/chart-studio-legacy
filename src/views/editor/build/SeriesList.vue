<template>
  <div v-if="subplots.length > 0">
    <div class="d-flex align-center justify-space-between pr-2">
      <v-subheader>Series</v-subheader>

      <div class="d-flex align-center">
        <series-selector></series-selector>

        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small @click="removeSeries" v-on="on" v-bind="attrs">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>Remove series</span>
        </v-tooltip>
      </div>
    </div>

    <v-expansion-panels v-model="seriesIndex" flat focusable dense tile>
      <v-expansion-panel v-for="(series, index) in seriesConfig" :key="index">
        <v-expansion-panel-header> Series {{ index }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <component
            class="mt-2"
            :is="ComponentOptionsMap[series.dataType]"
            :config="series.config"
            @update="handleUpdate"
            show-extra-props
          >
            <v-row>
              <v-col>
                <v-switch v-model="visible" label="Visible"></v-switch>
              </v-col>
              <v-col>
                <v-select
                  v-model="yAxisPosition"
                  :items="yAxisPositionOptions"
                  label="Y Axis"
                ></v-select>
              </v-col>
            </v-row>
          </component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ComponentOptionsMap } from '@/components/options'
import SeriesSelector from './SeriesSelector.vue'
import { useChartStore } from '@/store/chart'
import { useWorkspaceStore } from '@/store/workspace'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import {
  DataType,
  ParameterConfigMap,
  ParameterConfigType,
} from '@/model/types'
import { isDef, toPlain } from '@/shared/util'

const chartStore = useChartStore()
const { subplots } = storeToRefs(chartStore)

const workspaceStore = useWorkspaceStore()
const { subplotIndex, seriesIndex } = storeToRefs(workspaceStore)

const seriesConfig = computed(() => {
  if (subplots.value.length > 0) {
    return subplots.value[subplotIndex.value].series
  } else {
    return []
  }
})

function removeSeries(): void {
  if (seriesConfig.value.length > 0 && seriesIndex.value !== undefined) {
    chartStore.removeSeries(subplotIndex.value, seriesIndex.value)
    workspaceStore.resetSeriesIndex()
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
    )
  }
}

// Handle series shared properties for all data types.
const yAxisPositionOptions = ref([
  { value: 'left', text: 'Left' },
  { value: 'right', text: 'Right' },
])

const defaultYAxisPosition = 'left'

const yAxisPosition = computed({
  get() {
    if (isDef(seriesIndex.value)) {
      const y = seriesConfig.value[seriesIndex.value].config.yAxis
      return y?.position || defaultYAxisPosition
    } else {
      return defaultYAxisPosition
    }
  },
  set(value) {
    if (isDef(seriesIndex.value)) {
      const oldConfig = toPlain(
        seriesConfig.value[seriesIndex.value].config
      ) as ParameterConfigType

      const newConfig = toPlain({
        ...oldConfig,
        yAxis: { ...oldConfig.yAxis, position: value },
      }) as ParameterConfigType

      chartStore.updateSeriesConfig(
        newConfig,
        subplotIndex.value,
        seriesIndex.value
      )
    }
  },
})

const visible = computed({
  get() {
    if (isDef(seriesIndex.value)) {
      return seriesConfig.value[seriesIndex.value].config.visible || true
    } else {
      return true
    }
  },
  set(value) {
    if (isDef(seriesIndex.value)) {
      const oldConfig = toPlain(
        seriesConfig.value[seriesIndex.value].config
      ) as ParameterConfigType

      const newConfig = toPlain({
        ...oldConfig,
        visible: value,
      }) as ParameterConfigType

      chartStore.updateSeriesConfig(
        newConfig,
        subplotIndex.value,
        seriesIndex.value
      )
    }
  },
})
</script>
