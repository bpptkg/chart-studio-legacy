<template>
  <div>
    <v-toolbar height="40px" flat>
      <div>Preview</div>
      <v-spacer></v-spacer>
      <v-btn icon small>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-tray-arrow-down</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-progress-linear v-show="isFetching" indeterminate></v-progress-linear>

    <render-area></render-area>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/store/data';
import { storeToRefs } from 'pinia';
import RenderArea from './RenderArea.vue';

const dataStore = useDataStore();
const { isFetching } = storeToRefs(dataStore);
</script>
