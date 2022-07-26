<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <v-subheader>Subplots</v-subheader>
      <div class="d-flex align-center pr-2">
        <v-btn icon small>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn icon small>
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn icon small>
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </div>
    </div>
    <v-list>
      <v-list-item-group mandatory>
        <v-list-item
          v-for="(subplot, subplotIndex) in subplots"
          :key="subplotIndex"
        >
          <v-list-item-icon>
            <v-icon>mdi-chart-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ subplot.dataType }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <!-- <v-expansion-panels>
      <v-expansion-panel
        v-for="(subplot, subplotIndex) in subplots"
        :key="subplotIndex"
      >
        <v-expansion-panel-header>
          <div>
            {{ `${subplotIndex}: ${subplot.dataType}` }}

            <v-btn icon small>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="mb-2">
            <v-btn icon small>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(series, seriesIndex) in subplot.series"
              :key="seriesIndex"
            >
              <v-expansion-panel-header>
                Series {{ seriesIndex }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <component
                  :is="ComponentOptionsMap[series.dataType]"
                  :config="series.config"
                ></component>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> -->
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ComponentOptionsMap } from '@/components/options';
import { useChartStore } from '@/store/chart';
import { storeToRefs } from 'pinia';
import SubplotItem from './SubplotItem.vue';

const store = useChartStore();
const { subplots } = storeToRefs(store);
</script>
