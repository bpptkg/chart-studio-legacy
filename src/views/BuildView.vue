<template>
  <div class="buildview">
    <activity-bar>
      <v-btn icon class="mt-2">
        <v-icon>mdi-chart-bell-curve</v-icon>
      </v-btn>
      <v-btn icon class="mt-2">
        <v-icon>mdi-clock-outline</v-icon>
      </v-btn>
      <v-btn icon class="mt-2">
        <v-icon>mdi-brush-outline</v-icon>
      </v-btn>
      <v-btn icon class="mt-2">
        <v-icon>mdi-message-text-outline</v-icon>
      </v-btn>
      <v-btn icon class="mt-2">
        <v-icon>mdi-xml</v-icon>
      </v-btn>
    </activity-bar>
    <splitpanes class="default-theme" style="left: 48px; position: absolute">
      <pane>
        <v-toolbar height="40px" flat>
          <div>Plot</div>
          <v-spacer />
          <v-btn icon small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon>mdi-collapse-all-outline</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
        <plot-tree />
      </pane>
      <pane>
        <v-toolbar height="40px" flat>
          <div>Preview</div>
          <v-spacer />
          <v-btn icon small>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon>mdi-magnify-plus-outline</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon>mdi-tray-arrow-down</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </pane>
      <pane>3</pane>
    </splitpanes>
  </div>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import ActivityBar from '@/components/ActivityBar.vue';
import PlotTree from './PlotTree.vue';
</script>

<style lang="scss" scoped>
.buildview {
  width: 100%;
  height: 100%;
}
</style>
