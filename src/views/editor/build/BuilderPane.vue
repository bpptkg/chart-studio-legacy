<template>
  <div class="builder-pane">
    <v-toolbar height="40px" flat>
      <div>Plot</div>

      <v-spacer></v-spacer>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <span>More Actions...</span>
      </v-tooltip>
    </v-toolbar>

    <v-divider></v-divider>

    <div class="builder-pane-content">
      <scroll-wrapper>
        <range-selector></range-selector>
        <v-divider></v-divider>
        <subplot-list></subplot-list>
      </scroll-wrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollWrapper from '@/components/ScrollWrapper.vue';
import RangeSelector from './RangeSelector.vue';
import SubplotList from './SubplotList.vue';
</script>

<style lang="scss" scoped>
.builder-pane {
  height: 100%;
  width: 100%;
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
