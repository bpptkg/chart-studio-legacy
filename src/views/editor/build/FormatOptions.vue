<template>
  <div>
    <v-subheader>Format Options</v-subheader>
    <v-expansion-panels flat focusable tile>
      <format-options-title></format-options-title>
      <format-options-size></format-options-size>
      <format-options-layout></format-options-layout>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import FormatOptionsTitle from './FormatOptionsTitle.vue'
import FormatOptionsSize from './FormatOptionsSize.vue'
import FormatOptionsLayout from './FormatOptionsLayout.vue'
</script>
