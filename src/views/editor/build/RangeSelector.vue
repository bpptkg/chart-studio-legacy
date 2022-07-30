<template>
  <div>
    <v-subheader>Date Interval</v-subheader>
    <date-range :interval="interval" @update="handleUpdate"></date-range>
  </div>
</template>

<script setup lang="ts">
import DateRange from '@/components/DateRange.vue';
import { DateInterval } from '@/model/types';
import { useChartStore } from '@/store/chart';
import { storeToRefs } from 'pinia';

const chartStore = useChartStore();

const { interval } = storeToRefs(chartStore);

function handleUpdate(interval: DateInterval): void {
  chartStore.setInterval(interval);
}
</script>
