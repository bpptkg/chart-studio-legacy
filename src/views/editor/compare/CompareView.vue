<template>
  <splitpanes class="cs-theme" :class="{ 'cs-theme--dark': isDarkTheme }">
    <pane min-size="10" size="20">
      <settings-pane></settings-pane>
    </pane>
    <pane>
      <splitpanes
        v-if="intervals.length"
        class="cs-theme"
        :class="{ 'cs-theme--dark': isDarkTheme }"
      >
        <pane min-size="10" v-for="(__, index) in intervals" :key="index">
          {{ index }}
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
import { useCompareStore } from '@/store/compare';
import { storeToRefs } from 'pinia';
import { Splitpanes, Pane } from 'splitpanes';
import { computed, getCurrentInstance } from 'vue';
import SettingsPane from './SettingsPane.vue';

const app = getCurrentInstance();

const isDarkTheme = computed(() => {
  return app?.proxy.$vuetify.theme.dark;
});

const compareStore = useCompareStore();
const { intervals } = storeToRefs(compareStore);
</script>

<style lang="scss">
@import '@/scss/splitpanes.scss';
</style>
