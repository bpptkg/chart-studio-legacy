<template>
  <splitpanes
    class="cs-theme panels"
    :class="{ 'cs-theme--dark': isDarkTheme }"
  >
    <pane min-size="5" size="20" class="rounded-tr-lg">
      <settings-pane></settings-pane>
    </pane>
    <pane class="rounded-tl-lg">
      <splitpanes
        v-if="intervals.length"
        class="cs-theme"
        :class="{ 'cs-theme--dark': isDarkTheme }"
      >
        <pane
          min-size="5"
          v-for="(__, index) in intervals"
          :key="index"
          :class="{
            'rounded-tl-lg': index === intervals.length - 1,
            'rounded-t-lg': index < intervals.length - 1,
          }"
        >
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

<style lang="scss" scoped>
.panels {
  padding-top: 5px;
}
</style>
