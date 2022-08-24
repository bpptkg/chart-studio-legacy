<template>
  <div>
    <v-select v-model="station" :items="stations" label="Station"></v-select>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <v-switch v-model="visible" label="Visible" inset></v-switch>
  </div>
</template>

<script setup lang="ts">
import { GpsCoordinateConfig } from '@/model/types'
import { computed } from 'vue'
import stations from './gpsStations'

interface Props {
  config?: GpsCoordinateConfig
}

interface Emits {
  (event: 'update', config: GpsCoordinateConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fields = [
  { value: 'east', text: 'UTM Easting' },
  { value: 'north', text: 'UTM Northing' },
  { value: 'up', text: 'Elevation' },
]

const station = computed({
  get() {
    return props.config?.station || stations[0].value
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          visible: visible.value,
          station: value,
          field: field.value,
        }
      )
    )
  },
})

const field = computed({
  get() {
    return props.config?.field || 'east'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          visible: visible.value,
          station: station.value,
          field: value,
        }
      )
    )
  },
})

const visible = computed({
  get() {
    return props.config?.visible || true
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          visible: value,
          station: station.value,
          field: field.value,
        }
      )
    )
  },
})
</script>
