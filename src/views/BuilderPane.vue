<template>
  <div>
    <v-toolbar height="40px" flat>
      <div>Plot</div>

      <v-spacer></v-spacer>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-undo</v-icon>
          </v-btn>
        </template>
        <span>Undo</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-redo</v-icon>
          </v-btn>
        </template>
        <span>Redo</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <span>More Actions...</span>
      </v-tooltip>
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
