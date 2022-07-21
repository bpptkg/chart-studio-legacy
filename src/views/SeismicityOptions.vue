<template>
  <div>
    <v-select v-model="eventType" :items="items" label="Event Type"></v-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  { value: 'VTA', text: 'VTA' },
  { value: 'VTB', text: 'VTB' },
  { value: 'MP', text: 'MP' },
]);

const eventType = ref('VTA');
</script>
