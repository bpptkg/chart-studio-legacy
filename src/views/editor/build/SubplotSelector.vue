<template>
  <v-dialog v-model="dialog" scrollable max-width="400px">
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
        <span>Add subplot</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title>Add Subplot</v-card-title>

      <v-divider></v-divider>

      <v-card-text style="max-height: 300px; padding-top: 15px">
        <v-select
          v-model="selected"
          :items="dataTypes"
          label="Data Type"
          outlined
        ></v-select>

        <component
          :is="ComponentOptionsMap[selected]"
          :config="config"
          @update="handleUpdate"
        ></component>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
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
import { createSeriesConfig } from '@/model/config'
import { DataType, DataTypeNameMap, ParameterConfigMap } from '@/model/types'
import { useChartStore } from '@/store/chart'
import { useWorkspaceStore } from '@/store/workspace'
import { Ref, ref, watch } from 'vue'

const chartStore = useChartStore()
const workspaceStore = useWorkspaceStore()

function getDataTypes() {
  const names = Object.keys(DataTypeNameMap) as Array<DataType>
  return names.map((name) => {
    return { value: name, text: DataTypeNameMap[name] }
  })
}

const dialog = ref(false)
const dataTypes = ref(getDataTypes())

const selected: Ref<DataType> = ref('Seismicity')
const config: Ref<ParameterConfigMap[DataType]> = ref(
  createSeriesConfig('Seismicity')
)

watch(selected, (value) => {
  config.value = createSeriesConfig(value)
})

function handleUpdate<T extends DataType = DataType>(
  payload: ParameterConfigMap[T]
): void {
  config.value = { ...config.value, ...payload }
}

function handleAdd(): void {
  chartStore.addSubplot({
    dataType: selected.value,
    series: [
      {
        dataType: selected.value,
        config: { ...config.value },
      },
    ],
  })

  dialog.value = false

  // Set index to newly created subplot.
  workspaceStore.setSubplotIndex(chartStore.subplots.length - 1)
}
</script>
