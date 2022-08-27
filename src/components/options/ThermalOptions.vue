<template>
  <div>
    <v-select v-model="station" :items="stations" label="Station"></v-select>
    <v-select v-model="area" :items="areas" label="Area"></v-select>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ThermalConfig } from '@/model/types'
import { computed, reactive, Ref, ref } from 'vue'

interface Props {
  config?: ThermalConfig
}

interface Emits {
  (event: 'update', config: ThermalConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const stations = ref([
  { value: 'kaliurang', text: 'Kaliurang' },
  { value: 'babadan', text: 'Babadan' },
]) as Ref<
  {
    value: ThermalConfig['station']
    text: string
  }[]
>

const areasMap: { [key: string]: { value: string; text: string }[] } = reactive(
  {
    kaliurang: [
      { value: 'kal-kubah-bd', text: 'Kubah Barat Daya' },
      { value: 'kal-asap', text: 'Asap' },
      { value: 'kal-gendol', text: 'Gendol' },
      { value: 'kal-boyong', text: 'Boyong' },
      { value: 'kal-krasak', text: 'Krasak' },
      { value: 'kal-bebeng', text: 'Bebeng' },
    ],
    babadan: [
      { value: 'baba-kubah-bd', text: 'Kubah Barat Daya' },
      { value: 'baba-asap', text: 'Asap' },
      { value: 'baba-barat-laut', text: 'Barat Laut' },
    ],
  }
)

const fields = ref([
  { value: 'temperature', text: 'Max Temperature' },
  { value: 'density', text: 'Density' },
]) as Ref<
  {
    value: ThermalConfig['field']
    text: string
  }[]
>

const isStationUpdating = ref(false)

const station = computed({
  get() {
    return props.config?.station || 'babadan'
  },
  set(value) {
    isStationUpdating.value = true
    const defaultArea = areasMap[value][0].value
    area.value = defaultArea
    emit(
      'update',
      Object.assign(
        {},
        {
          station: value,
          area: defaultArea,
          field: field.value,
        }
      )
    )
    isStationUpdating.value = false
  },
})

const areas = computed(() => {
  return areasMap[station.value]
})

const area = computed({
  get() {
    return props.config?.area || areas.value[0].value
  },
  set(value) {
    if (!isStationUpdating.value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            station: station.value,
            area: value,
            field: field.value,
          }
        )
      )
    }
  },
})

const field = computed({
  get() {
    return props.config?.field || 'temperature'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          station: station.value,
          area: area.value,
          field: value,
        }
      )
    )
  },
})
</script>
