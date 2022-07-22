<template>
  <div>
    <v-row align="center">
      <v-col>
        <v-select
          v-model="benchmark"
          :items="benchmarks"
          label="Benchmark"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="reflector"
          :items="reflectors"
          label="Reflector"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { EdmParameterConfig } from '@/model/types';
import { computed, onMounted, reactive, ref, watch } from 'vue';

interface Props {
  config?: EdmParameterConfig;
}

interface Emits {
  (event: 'change', config: EdmParameterConfig): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const benchmarks = ref([
  { value: 'BAB0', text: 'Babadan 0' },
  { value: 'BAB1', text: 'Babadan 1' },
  { value: 'BAT0', text: 'Batu Alin' },
]);

type ReflectorMap = Record<string, string[]>;

const reflectorsMap: ReflectorMap = reactive({
  BAB0: ['RB1', 'RB2'],
  BAB1: ['RB1', 'RB2'],
  BAT0: ['RK1', 'RK2'],
});

const benchmark = ref('BAB0');
const reflector = ref('RB1');
const reflectors = computed(() => {
  return reflectorsMap[benchmark.value];
});

watch(benchmark, (value) => {
  reflector.value = reflectorsMap[value][0];

  emit('change', {
    benchmark: value,
    reflector: reflector.value,
  } as EdmParameterConfig);
});

watch(reflector, (value) => {
  emit('change', {
    benchmark: benchmark.value,
    reflector: value,
  } as EdmParameterConfig);
});

onMounted(() => {
  benchmark.value = props.config?.benchmark || 'BAB0';
  reflector.value = props.config?.reflector || 'RB1';
});
</script>
