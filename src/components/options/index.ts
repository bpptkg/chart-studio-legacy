import EdmOptions from './EdmOptions.vue';
import RfapEnergyOptions from './RfapEnergyOptions.vue';
import SeismicEnergyOptions from './SeismicEnergyOptions.vue';
import SeismicityOptions from './SeismicityOptions.vue';

export type ComponentOptions =
  | typeof SeismicityOptions
  | typeof EdmOptions
  | typeof SeismicEnergyOptions
  | typeof RfapEnergyOptions;

export interface ComponentOptionsMapInternal {
  [k: string]: ComponentOptions;
}

export const ComponentOptionsMap: ComponentOptionsMapInternal = {
  Seismicity: SeismicityOptions,
  Edm: EdmOptions,
  SeismicEnergy: SeismicEnergyOptions,
  RfapEnergy: RfapEnergyOptions,
};
