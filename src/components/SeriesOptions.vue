<template>
  <component :is="optionComponentMap[type]"></component>
</template>

<script setup lang="ts">
import SeismicitySeriesOptions from './SeismicitySeriesOptions.vue';
import EdmSeriesOptions from './EdmSeriesOptions.vue';

defineProps({
  type: String,
});

const optionComponentMap = {
  Seismicity: SeismicitySeriesOptions,
  Edm: EdmSeriesOptions,
};
</script>
