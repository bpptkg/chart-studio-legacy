<template>
  <div>
    <v-select :items="items" label="Type"></v-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  { value: 'total', text: 'Total' },
  { value: 'vta', text: 'VTA' },
  { value: 'vtbmp', text: 'VTB+MP' },
]);
</script>
