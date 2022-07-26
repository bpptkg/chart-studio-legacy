<template>
  <div>
    <v-toolbar height="40px" flat>
      <div>Plot</div>
      <v-spacer></v-spacer>
      <v-btn icon small>
        <v-icon>mdi-undo</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-redo</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-subheader>Period</v-subheader>
    <range-selector></range-selector>
    <subplot-list></subplot-list>
  </div>
</template>

<script setup lang="ts">
import RangeSelector from './RangeSelector.vue';
import SubplotList from './SubplotList.vue';
</script>
