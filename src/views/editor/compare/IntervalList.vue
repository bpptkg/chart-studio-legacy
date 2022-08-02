<template>
  <div>
    <v-list v-if="intervals.length">
      <v-list-item v-for="(interval, index) in intervals" :key="index">
        <date-range
          :interval="interval"
          @update="(value) => handleUpdate(value, index)"
        ></date-range>
        <v-list-item-icon>
          <v-tooltip
            bottom
            :open-delay="500"
            :open-on-click="false"
            :open-on-focus="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                v-on="on"
                v-bind="attrs"
                @click="compareStore.removeInterval(index)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Remove Interval</span>
          </v-tooltip>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import DateRange from '@/components/DateRange.vue';
import { DateInterval } from '@/model/types';
import { useCompareStore } from '@/store/compare';
import { storeToRefs } from 'pinia';

const compareStore = useCompareStore();

const { intervals } = storeToRefs(compareStore);

function handleUpdate(interval: DateInterval, index: number): void {
  compareStore.replaceInterval(interval, index);
}
</script>
