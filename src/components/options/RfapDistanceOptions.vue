<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { RfapDistanceConfig } from '@/model/types'
import { computed, Ref, ref } from 'vue'

interface Props {
  config?: RfapDistanceConfig
}

interface Emits {
  (event: 'update', config: RfapDistanceConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fields = ref([
  { value: 'rf-count', text: 'RF Count' },
  { value: 'rf-dist', text: 'RF Max Distance' },
  { value: 'ap-count', text: 'AP Count' },
  { value: 'ap-dist', text: 'AP Max Distance' },
  { value: 'rfap-stack', text: 'RF & AP Count Stack' },
]) as Ref<
  {
    value: RfapDistanceConfig['field']
    text: string
  }[]
>

const field = computed({
  get() {
    return props.config?.field || 'rf-count'
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
