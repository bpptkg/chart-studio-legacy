<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { VogamosTemperatureConfig } from '@/model/types'
import { computed, ref, Ref } from 'vue'

interface Props {
  config?: VogamosTemperatureConfig
}

interface Emits {
  (event: 'update', config: VogamosTemperatureConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fields = ref([
  { value: 'temperature1', text: 'Temperature 1' },
  { value: 'temperature2', text: 'Temperature 2' },
  { value: 'temperature3', text: 'Temperature 3' },
  { value: 'temperature4', text: 'Temperature 4' },
]) as Ref<{ value: VogamosTemperatureConfig['field']; text: string }[]>

const field = computed({
  get() {
    return props.config?.field || 'temperature1'
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
