<template>
  <div>Hello, Seismicity</div>
</template>

<script setup lang="ts">
import { SeismicitySeriesOptions } from '@/model/seriesOptions';
defineProps<{
  options: SeismicitySeriesOptions;
}>();
</script>
