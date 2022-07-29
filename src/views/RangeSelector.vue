<template>
  <div>
    <v-col>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="interval.start"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="interval.start"
            label="Start"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="interval.start" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="handleSaveStart">
            OK
          </v-btn></v-date-picker
        >
      </v-dialog>
    </v-col>
    <v-col>
      <v-dialog
        ref="dialog2"
        v-model="modal2"
        :return-value.sync="interval.end"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="interval.end"
            label="End"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="interval.end" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal2 = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="handleSaveEnd"> OK </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </div>
</template>

<script setup lang="ts">
import { useChartStore } from '@/store/chart';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useChartStore();

const { interval } = storeToRefs(store);
const modal = ref(false);
const modal2 = ref(false);

const dialog = ref(null);
function handleSaveStart(): void {
  dialog.value?.save(interval.value.start);
}

const dialog2 = ref(null);
function handleSaveEnd(): void {
  dialog2.value?.save(interval.value.end);
}
</script>
