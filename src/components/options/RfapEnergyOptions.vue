<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
  </div>
</template>

<script setup lang="ts">
import { RfapEnergyConfig } from '@/model/types'
import { computed, ref } from 'vue'

interface Props {
  config?: RfapEnergyConfig
}

interface Emits {
  (event: 'update', config: RfapEnergyConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fields = ref([
  { value: 'count', text: 'RF & AP Daily Count' },
  { value: 'energy', text: 'RF & AP Daily Energy' },
  { value: 'count-rf', text: 'RF Daily Count' },
  { value: 'count-ap', text: 'AP Daily Count' },
  { value: 'rfap-stack', text: 'RF & AP Daily Count Stack' },
  { value: 'energy-cumulative', text: 'RF & AP Daily Energy Cumulative' },
])

const field = computed({
  get() {
    return props.config?.field || 'count'
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
