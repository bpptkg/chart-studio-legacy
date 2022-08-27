<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { VogamosEmissionConfig } from '@/model/types'
import { computed, Ref, ref } from 'vue'

interface Props {
  config?: VogamosEmissionConfig
}

interface Emits {
  (event: 'update', config: VogamosEmissionConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fields = ref([
  { value: 'co2_min', text: 'CO2 Min' },
  { value: 'co2_max', text: 'CO2 Max' },
  { value: 'co2_avg', text: 'CO2 Avg' },
  { value: 'temperature_min', text: 'Temperature Min' },
  { value: 'temperature_max', text: 'Temperature Max' },
  { value: 'temperature_avg', text: 'Temperature Avg' },
  { value: 'humidity_min', text: 'Humidity Min' },
  { value: 'humidity_max', text: 'Humidity Max' },
  { value: 'humidity_avg', text: 'Humidity Avg' },
]) as Ref<
  {
    value: VogamosEmissionConfig['field']
    text: string
  }[]
>

const field = computed({
  get() {
    return props.config?.field || 'co2_avg'
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
