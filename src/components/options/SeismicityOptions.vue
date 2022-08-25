<template>
  <div>
    <v-select
      v-model="eventType"
      :items="eventTypes"
      label="Event Type"
    ></v-select>
  </div>
</template>

<script setup lang="ts">
import { SeismicityConfig } from '@/model/types'
import { computed, ref } from 'vue'

interface Props {
  config?: SeismicityConfig
}

interface Emits {
  (event: 'update', config: SeismicityConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const eventTypes = ref([
  { value: 'ANTRHOP', text: 'ANTRHOP' },
  { value: 'AUTO', text: 'AUTO' },
  { value: 'EXPLOSION', text: 'EXPLOSION' },
  { value: 'GASBURST', text: 'GASBURST' },
  { value: 'LF', text: 'LF' },
  { value: 'MP', text: 'MP' },
  { value: 'ROCKFALL', text: 'ROCKFALL' },
  { value: 'SOUND', text: 'SOUND' },
  { value: 'TECLOC', text: 'TECLOC' },
  { value: 'TECT', text: 'TECT' },
  { value: 'TELE', text: 'TELE' },
  { value: 'TPHASE', text: 'TPHASE' },
  { value: 'TREMOR', text: 'TREMOR' },
  { value: 'UNKNOWN', text: 'UNKNOWN' },
  { value: 'VTA', text: 'VTA' },
  { value: 'VTB', text: 'VTB' },
  { value: 'AWANPANAS', text: 'AWANPANAS' },
  { value: 'LAHAR', text: 'LAHAR' },
])

const eventType = computed({
  get() {
    return props.config?.eventType || 'VTA'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          eventType: value,
        }
      )
    )
  },
})
</script>
