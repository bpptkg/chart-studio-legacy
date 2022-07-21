<template>
  <component :is="componentOptionsMap[type]"></component>
</template>

<script setup lang="ts">
import EdmOptions from './EdmOptions.vue';
import SeismicityOptions from './SeismicityOptions.vue';
import SeismicEnergyOptions from './SeismicEnergyOptions.vue';
import EmptyOptions from './EmptyOptions.vue';

defineProps<{
  type: string;
}>();

type ComponentOptions =
  | typeof SeismicityOptions
  | typeof EdmOptions
  | typeof SeismicEnergyOptions
  | typeof EmptyOptions;

interface ComponentOptionsMap {
  [k: string]: ComponentOptions;
}

const componentOptionsMap: ComponentOptionsMap = {
  seismicity: SeismicityOptions,
  edm: EdmOptions,
  seismicEnergy: SeismicEnergyOptions,
  rfapEnergy: EmptyOptions,
};
</script>
