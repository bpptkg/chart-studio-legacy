<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { WeatherPasarbubarConfig } from '@/model/types'
import { computed, Ref, ref } from 'vue'

interface Props {
  config?: WeatherPasarbubarConfig
}

interface Emits {
  (event: 'update', config: WeatherPasarbubarConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fields = ref([
  { value: 'cumulative_rainfall', text: 'Rainfall' },
  { value: 'rate', text: 'Rate' },
  { value: 'wind_direction', text: 'Wind Direction' },
  { value: 'wind_speed', text: 'Wind Speed' },
  { value: 'air_temperature', text: 'Air Temperature' },
  { value: 'air_humidity', text: 'Air Humidity' },
  { value: 'air_pressure', text: 'Air Pressure' },
]) as Ref<
  {
    value: WeatherPasarbubarConfig['field']
    text: string
  }[]
>

const field = computed({
  get() {
    return props.config?.field || 'cumulative_rainfall'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          field: value,
        }
      )
    )
  },
})
</script>
