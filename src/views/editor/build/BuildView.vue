<template>
  <splitpanes
    class="cs-theme"
    :class="{ 'cs-theme--dark': $vuetify.theme.dark }"
  >
    <pane min-size="5" size="20">
      <builder-pane></builder-pane>
    </pane>
    <pane min-size="5">
      <preview-pane></preview-pane>
    </pane>
    <pane min-size="5" size="20">
      <property-pane></property-pane>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import BuilderPane from './BuilderPane.vue'
import PreviewPane from './PreviewPane.vue'
import PropertyPane from './PropertyPane.vue'
</script>

<style lang="scss">
@import '@/scss/splitpanes.scss';
</style>
