<template>
  <div>
    <v-select v-model="type" :items="types" label="Type"></v-select>
  </div>
</template>

<script setup lang="ts">
import { SeismicEnergyParameterConfig } from '@/model/types';
import { ref, onMounted, watch } from 'vue';

interface Props {
  config?: SeismicEnergyParameterConfig;
}

interface Emits {
  (event: 'change', config: SeismicEnergyParameterConfig): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const types = ref([
  { value: 'total', text: 'Total' },
  { value: 'vta', text: 'VTA' },
  { value: 'vtbmp', text: 'VTB+MP' },
]);

const type = ref('total');

watch(type, (value) => {
  emit('change', { type: value } as SeismicEnergyParameterConfig);
});

onMounted(() => {
  type.value = props.config?.type || 'total';
});
</script>
