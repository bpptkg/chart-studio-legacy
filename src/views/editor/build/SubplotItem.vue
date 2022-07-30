<template>
  <v-list-item>
    <div>
      <span>Title</span>
      <v-spacer></v-spacer>
      <v-btn icon small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
      <v-btn icon small @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <div v-show="show"></div>
    </v-expand-transition>
  </v-list-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);
</script>
