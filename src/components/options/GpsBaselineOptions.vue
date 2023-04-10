<template>
  <div>
    <v-select v-model="station1" :items="stations" label="Station 1"></v-select>
    <v-select v-model="station2" :items="stations" label="Station 2"></v-select>
    <slot></slot>
    <v-snackbar v-model="snackbar" timeout="5000" left>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          small
          v-bind="attrs"
          @click="handleCloseSnackbar"
          class="ml-2"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GpsBaselineConfig } from '@/model/types'
import { computed } from 'vue'
import stations, { gpsPoints } from './gpsStations'

interface Props {
  config?: GpsBaselineConfig
}

interface Emits {
  (event: 'update', config: GpsBaselineConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const snackbar = ref(false)
const errorMessage = ref('')
const ERR_MSG = 'Setting all GPS to virtual stations is unsupported'

function isAllPoints(stations: string[]): boolean {
  return stations.every((station) => gpsPoints.includes(station))
}

function handleCloseSnackbar(): void {
  snackbar.value = false
  errorMessage.value = ''
}

const station1 = computed({
  get() {
    return props.config?.station1 || stations[0].value
  },
  set(value) {
    if (isAllPoints([value, station2.value])) {
      errorMessage.value = ERR_MSG
      snackbar.value = true
    } else {
      emit(
        'update',
        Object.assign(
          {},
          {
            station1: value,
            station2: station2.value,
          }
        )
      )
    }
  },
})

const station2 = computed({
  get() {
    return props.config?.station2 || stations[0].value
  },
  set(value) {
    if (isAllPoints([station1.value, value])) {
      errorMessage.value = ERR_MSG
      snackbar.value = true
    } else {
      emit(
        'update',
        Object.assign(
          {},
          {
            station1: station1.value,
            station2: value,
          }
        )
      )
    }
  },
})
</script>
