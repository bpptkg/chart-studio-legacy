<template>
  <div>
    <v-select v-model="type" :items="types" label="Type"></v-select>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { RfapTypeConfig } from '@/model/types'
import { computed, Ref, ref } from 'vue'

interface Props {
  config?: RfapTypeConfig
}

interface Emits {
  (event: 'update', config: RfapTypeConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const types = ref([
  { value: 'all', text: 'All' },
  { value: 'seen', text: 'Seen' },
  { value: 'heard', text: 'Heard' },
  { value: 'seen-heard', text: 'Seen and Heard' },
]) as Ref<
  {
    value: RfapTypeConfig['type']
    text: string
  }[]
>

const fields = ref([
  { value: 'count', text: 'RF & AP Count' },
  { value: 'distance', text: 'RF & AP Max Distance' },
]) as Ref<
  {
    value: RfapTypeConfig['field']
    text: string
  }[]
>

const type = computed({
  get() {
    return props.config?.type || 'all'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          type: value,
          field: field.value,
        }
      )
    )
  },
})

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
          type: type.value,
          field: value,
        }
      )
    )
  },
})
</script>
