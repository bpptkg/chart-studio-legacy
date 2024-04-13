<template>
  <div class="mr-6">
    <v-subheader>Date Interval</v-subheader>
    <date-range :interval="interval" @update="handleUpdate"></date-range>
  </div>
</template>

<script setup lang="ts">
import DateRange from '@/components/DateRange.vue'
import { DateInterval } from '@/model/types'
import { useRequestStore } from '@/store/request'
import { storeToRefs } from 'pinia'

const requestStore = useRequestStore()

const { interval } = storeToRefs(requestStore)

function handleUpdate(interval: DateInterval): void {
  requestStore.setInterval(interval)
}
</script>
