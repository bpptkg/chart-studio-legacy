<template>
  <v-dialog v-model="dialog" scrollable width="400px">
    <template #activator="{ on, attrs }">
      <v-btn icon small v-on="on" v-bind="attrs">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Add Subplot</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-select v-model="selected" :items="dataTypes" solo></v-select>
        <component
          :is="componentOptionsMap[selected]"
          :config="config"
          @change="handleChange"
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
import { DataType, ParameterConfigMap } from '@/model/types';
import { useChartStore } from '@/store/chart';
import { Ref, ref } from 'vue';

import EdmOptions from './EdmOptions.vue';
import RfapEnergyOptions from './RfapEnergyOptions.vue';
import SeismicEnergyOptions from './SeismicEnergyOptions.vue';
import SeismicityOptions from './SeismicityOptions.vue';

type ComponentOptions =
  | typeof SeismicityOptions
  | typeof EdmOptions
  | typeof SeismicEnergyOptions
  | typeof RfapEnergyOptions;

interface ComponentOptionsMap {
  [k: string]: ComponentOptions;
}

const componentOptionsMap: ComponentOptionsMap = {
  Seismicity: SeismicityOptions,
  Edm: EdmOptions,
  SeismicEnergy: SeismicEnergyOptions,
  RfapEnergy: RfapEnergyOptions,
};

const chartStore = useChartStore();

const dialog = ref(false);
const dataTypes = ref([
  { value: 'Seismicity', text: 'Seismicity' },
  { value: 'Edm', text: 'EDM' },
  { value: 'SeismicEnergy', text: 'Seismic Energy' },
  { value: 'RfapEnergy', text: 'RF & AP Energy' },
]);

const selected: Ref<DataType> = ref('Seismicity');
const config: Ref<ParameterConfigMap[DataType]> = ref({ eventType: 'VTA' });

function handleChange<T extends DataType>(obj: ParameterConfigMap[T]): void {
  config.value = obj;
}

function handleAdd(): void {
  chartStore.subplots.push({
    type: selected.value,
    config: config.value,
  });

  dialog.value = false;
}
</script>
