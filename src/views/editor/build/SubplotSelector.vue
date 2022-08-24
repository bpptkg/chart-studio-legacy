<template>
  <v-dialog v-model="dialog" width="600px">
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

      <v-card-text class="pa-0">
        <splitpanes>
          <pane size="40">
            <div class="dtype-selector">
              <v-list>
                <v-list-item-group v-model="selected" mandatory>
                  <v-list-item
                    v-for="dataType in dataTypes"
                    :key="dataType.value"
                    :value="dataType.value"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ dataType.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </pane>
          <pane>
            <div class="dtype-config">
              <component
                :is="ComponentOptionsMap[selected]"
                :config="config"
                @update="handleUpdate"
              ></component>
            </div>
          </pane>
        </splitpanes>
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
import { Splitpanes, Pane } from 'splitpanes'

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

<style lang="scss" scoped>
.dtype-selector {
  height: 300px;
  overflow-y: auto;
  min-width: 30%;
}

.dtype-config {
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
}
</style>
