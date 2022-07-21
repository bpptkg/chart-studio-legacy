<template>
  <v-dialog v-model="dialog" scrollable width="400px">
    <template #activator="{ on, attrs }">
      <v-btn icon small v-on="on" v-bind="attrs">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add Subplot</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-select v-model="item" :items="items" solo></v-select>
        <subplot-options :type="item"></subplot-options>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SubplotOptions from './SubplotOptions.vue';

const dialog = ref(false);
const items = ref([
  { value: 'seismicity', text: 'Seismicity' },
  { value: 'edm', text: 'EDM' },
  { value: 'seismicEnergy', text: 'Seismic Energy' },
  { value: 'rfapEnergy', text: 'RF & AP Energy' },
]);
const item = ref('seismicity');
</script>
