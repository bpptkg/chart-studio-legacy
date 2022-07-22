<template>
  <div>
    <v-toolbar height="40px">
      <div>Plot</div>
      <v-spacer></v-spacer>
      <subplot-selector></subplot-selector>
    </v-toolbar>
    <v-subheader>Period</v-subheader>
    <range-selector></range-selector>
    <v-subheader>Subplots</v-subheader>
    <subplot-list></subplot-list>
  </div>
</template>

<script setup lang="ts">
import SubplotSelector from './SubplotSelector.vue';
import RangeSelector from './RangeSelector.vue';
import SubplotList from './SubplotList.vue';
</script>
