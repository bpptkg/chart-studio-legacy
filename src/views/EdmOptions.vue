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
import { computed, reactive, ref, watch } from 'vue';

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

watch(benchmark, (newBenchmark) => {
  reflector.value = reflectorsMap[newBenchmark][0];
});
</script>
