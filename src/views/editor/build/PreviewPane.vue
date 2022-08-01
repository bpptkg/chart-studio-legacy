<template>
  <div class="preview-pane">
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
        <v-icon>mdi-magnify-plus-outline</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <v-progress-linear
      class="loader"
      v-show="isFetching"
      indeterminate
    ></v-progress-linear>

    <div class="canvas">
      <render-area></render-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/store/data';
import { storeToRefs } from 'pinia';
import RenderArea from './RenderArea.vue';

const dataStore = useDataStore();
const { isFetching } = storeToRefs(dataStore);
</script>

<style lang="scss" scoped>
.preview-pane {
  width: 100%;
  height: 100%;
  position: relative;
}

.loader {
  z-index: 999;
}

.canvas {
  position: absolute;
  top: 40px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
}
</style>
