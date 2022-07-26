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
    <render-area></render-area>
  </div>
</template>

<script setup lang="ts">
import RenderArea from './RenderArea.vue';
</script>
