<template>
  <v-dialog v-model="dialog" scrollable width="400px" v-if="subplot">
    <template #activator="{ on: dialog, attrs }">
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon small v-on="{ ...tooltip, ...dialog }" v-bind="attrs">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add series</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title>Add Series</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-2">
        <component
          :is="ComponentOptionsMap[subplot.dataType]"
          :config="config"
          @update="handleUpdate"
        ></component>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleAdd"> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ComponentOptionsMap } from '@/components/options'
import { DataType, ParameterConfigMap } from '@/model/types'
import { createSeriesConfig } from '@/model/config'
import { useChartStore } from '@/store/chart'
import { useWorkspaceStore } from '@/store/workspace'
import { storeToRefs } from 'pinia'
import { computed, ref, Ref } from 'vue'

const chartStore = useChartStore()
const { subplots } = storeToRefs(chartStore)

const workspaceStore = useWorkspaceStore()
const { subplotIndex, seriesIndex } = storeToRefs(workspaceStore)

const subplot = computed(() => {
  return subplots.value.length > 0
    ? subplots.value[subplotIndex.value]
    : undefined
})

const dialog = ref(false)
const config: Ref<ParameterConfigMap[DataType]> = ref(
  createSeriesConfig(subplot.value?.dataType)
)

function handleUpdate<T extends DataType = DataType>(
  payload: ParameterConfigMap[T]
): void {
  config.value = payload
}

function handleAdd(): void {
  if (subplot.value) {
    chartStore.addSeries(
      {
        dataType: subplot.value.dataType,
        config: config.value,
      },
      subplotIndex.value
    )

    seriesIndex.value = subplot.value.series.length - 1
  }

  dialog.value = false
}
</script>
