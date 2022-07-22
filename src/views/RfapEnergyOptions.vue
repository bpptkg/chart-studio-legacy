<template>
  <div></div>
</template>

<script setup lang="ts">
import { RfapEnergyParameterConfig } from '@/model/types';

interface Props {
  config?: RfapEnergyParameterConfig;
}

interface Emits {
  (event: 'change', config: RfapEnergyParameterConfig): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
