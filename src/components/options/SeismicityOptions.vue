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
import { SeismicityConfig } from '@/model/types';
import { onMounted, ref, watch } from 'vue';

interface Props {
  config?: SeismicityConfig;
}

interface Emits {
  (event: 'update', config: SeismicityConfig): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const eventTypes = ref([
  { value: 'VTA', text: 'VTA' },
  { value: 'VTB', text: 'VTB' },
  { value: 'MP', text: 'MP' },
  { value: 'ROCKFALL', text: 'ROCKFALL' },
]);

const eventType = ref('VTA');

watch(eventType, (value) => {
  emit('update', {
    eventType: value,
  } as SeismicityConfig);
});

onMounted(() => {
  eventType.value = props.config?.eventType || 'VTA';
});
</script>
