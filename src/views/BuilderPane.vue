<template>
  <div>
    <v-toolbar height="40px">
      <div>Plot</div>
      <v-spacer />
      <subplot-selector />
    </v-toolbar>
    <range-selector />
  </div>
</template>

<script setup lang="ts">
import SubplotSelector from './SubplotSelector.vue';
import RangeSelector from './RangeSelector.vue';
</script>
