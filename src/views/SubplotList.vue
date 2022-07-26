<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(subplot, index) in subplots" :key="index">
        <v-expansion-panel-header>{{
          `${index}: ${subplot.dataType}`
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <component :is="ComponentOptionsMap[subplot.dataType]"></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ComponentOptionsMap } from '@/components/options';
import { useChartStore } from '@/store/chart';
import { storeToRefs } from 'pinia';

const store = useChartStore();
const { subplots } = storeToRefs(store);
</script>
