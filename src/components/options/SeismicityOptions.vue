<template>
  <div>
    <v-select
      v-model="eventType"
      :items="eventTypes"
      label="Event Type"
    ></v-select>
    <slot></slot>
    <div v-if="showExtraProps">
      <v-row>
        <v-col>
          <v-text-field
            v-model="barGap"
            label="Bar Gap"
            suffix="%"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="barWidth"
            label="Bar Width"
            suffix="%"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import { SeismicityConfig } from '@/model/types'
import { computed, ref } from 'vue'

interface Props {
  config?: SeismicityConfig
  showExtraProps?: boolean
}

interface Emits {
  (event: 'update', config: SeismicityConfig): void
}

const props = withDefaults(defineProps<Props>(), {
  showExtraProps: false,
})
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
          barGap: barGap.value,
          barWidth: barWidth.value,
        }
      )
    )
  },
})

const barGap = computed({
  get() {
    return props.config?.barGap || 0
  },
  set: debounce((value) => {
    emit(
      'update',
      Object.assign(
        {},
        {
          eventType: eventType.value,
          barGap: value,
          barWidth: barWidth.value,
        }
      )
    )
  }, 500),
})

const barWidth = computed({
  get() {
    return props.config?.barWidth || 80
  },
  set: debounce((value) => {
    emit(
      'update',
      Object.assign(
        {},
        {
          eventType: eventType.value,
          barGap: barGap.value,
          barWidth: value,
        }
      )
    )
  }, 500),
})
</script>
