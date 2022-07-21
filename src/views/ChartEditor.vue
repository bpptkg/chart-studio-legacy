<template>
  <v-app>
    <app-header></app-header>
    <v-main>
      <splitpanes class="default-theme">
        <pane size="30"><builder-pane /></pane>
        <pane><preview-pane /></pane>
      </splitpanes>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import AppHeader from './AppHeader.vue';
import BuilderPane from './BuilderPane.vue';
import PreviewPane from './PreviewPane.vue';
</script>
