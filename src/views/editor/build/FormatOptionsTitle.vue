<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Title</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-text-field label="Title" v-model="title"></v-text-field>
      <v-text-field label="Subtitle" v-model="subtitle"></v-text-field>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { useChartStore } from '@/store/chart'
import { storeToRefs } from 'pinia'

const chartStore = useChartStore()
const { title, subtitle } = storeToRefs(chartStore)
</script>
