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
import { EdmConfig } from '@/model/types';
import { computed, reactive, ref } from 'vue';

interface Props {
  config?: EdmConfig;
}

interface Emits {
  (event: 'update', config: EdmConfig): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const benchmarks = ref([
  { value: 'BAB0', text: 'Babadan 0' },
  { value: 'BAB1', text: 'Babadan 1' },
  { value: 'BAT0', text: 'Batu Alin' },
  { value: 'BEL0', text: 'Beling' },
  { value: 'DEL0', text: 'Deles' },
  { value: 'GEB0', text: 'Gebyok' },
  { value: 'JRK0', text: 'Jrakah' },
  { value: 'KAJ0', text: 'Kajor' },
  { value: 'KAL0', text: 'Kaliurang' },
  { value: 'MRY0', text: 'Mriyan' },
  { value: 'SAP0', text: 'Sapu Angin' },
  { value: 'SEL0', text: 'Selo' },
  { value: 'STA0', text: 'Stabelan' },
  { value: 'TRI0', text: 'Tritis' },
]);

type ReflectorMap = Record<string, string[]>;

const reflectorsMap: ReflectorMap = reactive({
  BAB0: ['RB1', 'RB2'],
  BAB1: ['RB1', 'RB2'],
  BAT0: ['RK1', 'RK2'],
  BEL0: ['RM1', 'RM2'],
  DEL0: ['RD1'],
  GEB0: ['RS1', 'RS2', 'RS4'],
  JRK0: ['RJ1', 'RJ2'],
  KAJ0: ['RJ1', 'RJ2', 'RS2', 'RS3'],
  KAL0: ['RK2', 'RK3'],
  MRY0: ['RM1', 'RM2'],
  SAP0: ['RD1'],
  SEL0: ['RS1', 'RS2', 'RS3', 'RS4'],
  STA0: ['RB1', 'RB2', 'RB3', 'RJ2'],
  TRI0: ['RK2', 'RK3'],
});

const isBenchmarkUpdating = ref(false);

const benchmark = computed({
  get() {
    return props.config?.benchmark || 'BAB0';
  },
  set(value) {
    isBenchmarkUpdating.value = true;
    reflector.value = reflectorsMap[value][0];
    emit(
      'update',
      Object.assign({}, props.config, {
        benchmark: value,
        reflector: reflectorsMap[value][0],
      })
    );
    isBenchmarkUpdating.value = false;
  },
});

const reflector = computed({
  get() {
    return props.config?.reflector || 'RB1';
  },
  set(value) {
    if (!isBenchmarkUpdating.value) {
      emit(
        'update',
        Object.assign({}, props.config, {
          reflector: value,
        })
      );
    }
  },
});

const reflectors = computed(() => {
  return reflectorsMap[benchmark.value];
});
</script>
