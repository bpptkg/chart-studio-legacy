<template>
  <v-row>
    <v-col>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="start"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="start"
            label="Start"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="start" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog?.save(end)">
            OK
          </v-btn></v-date-picker
        >
      </v-dialog>
    </v-col>
    <v-col>
      <v-dialog
        ref="dialog2"
        v-model="modal2"
        :return-value.sync="end"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="end"
            label="End"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="end" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal2 = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog2?.save(end)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useChartStore } from '@/store/chart';
import { ref, toRefs } from 'vue';

const chartStore = useChartStore();
const { start, end } = toRefs(chartStore);
const modal = ref(false);
const modal2 = ref(false);
</script>
