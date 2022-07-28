<script setup lang="ts">
import { RfapEnergyConfig } from '@/model/types';

interface Props {
  config?: RfapEnergyConfig;
}

interface Emits {
  (event: 'update', config: RfapEnergyConfig): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
