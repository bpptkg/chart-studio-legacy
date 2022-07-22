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
import { SeismicityParameterConfig } from '@/model/types';
import { onMounted, ref, watch } from 'vue';

interface Props {
  config?: SeismicityParameterConfig;
}

interface Emits {
  (event: 'change', config: SeismicityParameterConfig): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const eventTypes = ref([
  { value: 'VTA', text: 'VTA' },
  { value: 'VTB', text: 'VTB' },
  { value: 'MP', text: 'MP' },
]);

const eventType = ref('VTA');

watch(eventType, (value) => {
  emit('change', { eventType: value } as SeismicityParameterConfig);
});

onMounted(() => {
  eventType.value = props.config?.eventType || 'VTA';
});
</script>
