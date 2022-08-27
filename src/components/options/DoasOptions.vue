<template>
  <div>
    <v-select v-model="station" :items="stations" label="Station"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { DoasConfig } from '@/model/types'
import { computed, ref } from 'vue'

interface Props {
  config?: DoasConfig
}

interface Emits {
  (event: 'update', config: DoasConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const stations = ref([{ value: 'babadan', text: 'Babadan' }])

const station = computed({
  get() {
    return props.config?.station || 'babadan'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          station: value,
        }
      )
    )
  },
})
</script>
