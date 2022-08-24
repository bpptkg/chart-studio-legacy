<template>
  <div>
    <v-select v-model="station1" :items="stations" label="Station 1"></v-select>
    <v-select v-model="station2" :items="stations" label="Station 2"></v-select>
    <v-switch v-model="visible" label="Visible" inset></v-switch>
  </div>
</template>

<script setup lang="ts">
import { GpsBaselineConfig } from '@/model/types'
import { computed } from 'vue'
import stations from './gpsStations'

interface Props {
  config?: GpsBaselineConfig
}

interface Emits {
  (event: 'update', config: GpsBaselineConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const station1 = computed({
  get() {
    return props.config?.station1 || stations[0].value
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          visible: visible.value,
          station1: value,
          station2: station2.value,
        }
      )
    )
  },
})

const station2 = computed({
  get() {
    return props.config?.station2 || stations[0].value
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          visible: visible.value,
          station1: station1.value,
          station2: value,
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
          station1: station1.value,
          station2: station2.value,
        }
      )
    )
  },
})
</script>
