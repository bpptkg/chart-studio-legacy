<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Size</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>
          <v-text-field
            v-model="width"
            label="Width"
            suffix="px"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="height"
            label="Height"
            suffix="px"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { useChartStore } from '@/store/chart'
import { storeToRefs } from 'pinia'

const chartStore = useChartStore()
const { width, height } = storeToRefs(chartStore)
</script>
