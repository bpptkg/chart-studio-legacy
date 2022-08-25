<template>
  <div>
    <v-select v-model="station" :items="stations" label="Station"></v-select>
    <v-select v-model="band" :items="bands" label="Band Frequency"></v-select>
  </div>
</template>

<script setup lang="ts">
import { RsamSeismicConfig } from '@/model/types'
import { computed, Ref, ref } from 'vue'

interface Props {
  config?: RsamSeismicConfig
}

interface Emits {
  (event: 'update', config: RsamSeismicConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const stations = ref([
  { value: 'pasarbubar', text: 'Pasarbubar' },
  { value: 'labuhan', text: 'Labuhan' },
])

const bands = ref([
  { value: 'band0', text: 'RSAM (No Filter)' },
  { value: 'band1', text: 'Band 1 (0.5 - 2.5 Hz)' },
  { value: 'band2', text: 'Band 2 (2.5 - 4.5 Hz)' },
  { value: 'band3', text: 'Band 3 (4.5 - 6.5 Hz)' },
  { value: 'band4', text: 'Band 4 (6.5 - 8.5 Hz)' },
  { value: 'band5', text: 'Band 5 (8.5 - 10.5 Hz)' },
  { value: 'band6', text: 'Band 6 (10.5 - 12.5 Hz)' },
  { value: 'band7', text: 'Band 7 (12.5 - 14.5 Hz)' },
  { value: 'band8', text: 'Band 8 (14.5 - 16.5 Hz)' },
  { value: 'band9', text: 'Band 9 (16.5 - 18.5 Hz)' },
  { value: 'band10', text: 'Band 10 (18.5 - 20.5 Hz)' },
  { value: 'band11', text: 'Band 11 (20.5 - 22.5 Hz)' },
  { value: 'band12', text: 'Band 12 (22.5 - 24.5 Hz)' },
  { value: 'band13', text: 'Band 13 (24.5 - 26.5 Hz)' },
]) as Ref<
  {
    value: RsamSeismicConfig['band']
    text: string
  }[]
>

const station = computed({
  get() {
    return props.config?.station || stations.value[0].value
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          station: value,
          band: band.value,
          field: field.value,
        }
      )
    )
  },
})

const band = computed({
  get() {
    return props.config?.band || bands.value[0].value
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          station: station.value,
          band: value,
          field: field.value,
        }
      )
    )
  },
})

const field = computed({
  get() {
    return props.config?.field || 'value'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          station: station.value,
          band: band.value,
          field: value,
        }
      )
    )
  },
})
</script>
