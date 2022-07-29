<template>
  <v-app>
    <app-header></app-header>
    <v-main style="background-color: #eee">
      <splitpanes
        class="cs-theme editor"
        :class="{ 'cs-theme--dark': $vuetify.theme.dark }"
      >
        <pane size="20" class="rounded-tr">
          <builder-pane></builder-pane>
        </pane>
        <pane class="rounded-t">
          <preview-pane></preview-pane>
        </pane>
        <pane size="20" class="rounded-tl">
          <property-pane></property-pane>
        </pane>
      </splitpanes>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import AppHeader from './AppHeader.vue';
import BuilderPane from './BuilderPane.vue';
import PreviewPane from './PreviewPane.vue';
import PropertyPane from './PropertyPane.vue';
</script>

<style lang="scss">
@import '@/scss/splitpanes.scss';
</style>

<style lang="scss" scoped>
.main-theme {
  background-color: #eee;

  &--dark {
    background-color: #121212;
  }
}

.editor {
  padding-top: 5px;
}
</style>
