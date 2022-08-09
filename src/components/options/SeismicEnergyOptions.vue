<template>
  <div>
    <v-select v-model="type" :items="types" label="Type"></v-select>
  </div>
</template>

<script setup lang="ts">
import { SeismicEnergyConfig } from '@/model/types'
import { ref, computed } from 'vue'

interface Props {
  config?: SeismicEnergyConfig
}

interface Emits {
  (event: 'update', config: SeismicEnergyConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const types = ref([
  { value: 'total', text: 'Total' },
  { value: 'vta', text: 'VTA' },
  { value: 'vtbmp', text: 'VTB+MP' },
])

const type = computed({
  get() {
    return props.config?.type || 'total'
  },
  set(value) {
    emit(
      'update',
      Object.assign({}, props.config, {
        type: value,
      })
    )
  },
})
</script>
