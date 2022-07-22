<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(subplot, index) in subplots" :key="index">
        <v-expansion-panel-header>{{
          `${index}: ${subplot.type}`
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <component :is="ComponentOptionsMap[subplot.type]"></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { useChartStore } from '@/store/chart';
import { storeToRefs } from 'pinia';
import { ComponentOptionsMap } from './componentOptions';

const store = useChartStore();
const { subplots } = storeToRefs(store);
</script>
