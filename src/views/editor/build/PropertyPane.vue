<template>
  <div class="property-pane">
    <v-toolbar height="40px" flat>
      <div>Properties</div>
    </v-toolbar>

    <v-divider></v-divider>

    <div class="property-pane-content">
      <scroll-wrapper>
        <series-list></series-list>
      </scroll-wrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import SeriesList from './SeriesList.vue';
import ScrollWrapper from '@/components/ScrollWrapper.vue';
</script>

<style lang="scss" scoped>
.property-pane {
  width: 100%;
  height: 100%;
  position: relative;

  &-content {
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    top: 40px;
  }
}
</style>
