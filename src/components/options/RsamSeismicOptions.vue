<template>
  <div>
    <v-select v-model="station" :items="stations" label="Station"></v-select>
    <v-select v-model="band" :items="bands" label="Band Frequency"></v-select>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { RsamSeismicConfig } from '@/model/types'
import { computed, Ref, ref } from 'vue'
import rsamBands from './rsamBands'

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

const bands = ref(rsamBands) as Ref<
  {
    value: RsamSeismicConfig['band']
    text: string
  }[]
>

const fields = ref([
  { value: 'value', text: 'Value' },
  { value: 'value-cumulative', text: 'Cum. Value' },
]) as Ref<
  {
    value: RsamSeismicConfig['field']
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
