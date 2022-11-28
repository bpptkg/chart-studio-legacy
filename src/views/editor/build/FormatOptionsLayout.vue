<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Grid</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-subheader>Margin (%)</v-subheader>
      <div class="d-flex flex-column justify-center w-100">
        <div class="d-flex align-end justify-center">
          <div class="margin">
            <v-text-field
              v-model="marginTop"
              :rules="[validate]"
              label="Top"
              type="number"
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex align-center justify-center w-100">
          <div class="margin">
            <v-text-field
              v-model="marginLeft"
              :rules="[validate]"
              label="Left"
              type="number"
            ></v-text-field>
          </div>
          <div class="page" :class="{ 'page--dark': isDarkTheme }"></div>
          <div class="margin">
            <v-text-field
              v-model="marginRight"
              :rules="[validate]"
              label="Right"
              type="number"
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex justify-center">
          <div class="margin">
            <v-text-field
              v-model="marginBottom"
              :rules="[validate]"
              label="Bottom"
              type="number"
            ></v-text-field>
          </div>
        </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import { useTheme } from '@/composable/theme'
import { isNumeric } from '@/shared/number'
import { useChartStore } from '@/store/chart'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { isDarkTheme } = useTheme()

const chartStore = useChartStore()
const { margin } = storeToRefs(chartStore)

function validate(value: number): boolean | string {
  return isNumeric(value) || 'Invalid value'
}

const marginTop = computed({
  get() {
    return margin.value.top
  },
  set: debounce((value) => {
    if (isNumeric(value)) {
      margin.value.top = typeof value === 'string' ? parseFloat(value) : value
    }
  }, 500),
})

const marginRight = computed({
  get() {
    return margin.value.right
  },
  set: debounce((value) => {
    if (isNumeric(value)) {
      margin.value.right = typeof value === 'string' ? parseFloat(value) : value
    }
  }, 500),
})

const marginBottom = computed({
  get() {
    return margin.value.bottom
  },
  set: debounce((value) => {
    if (isNumeric(value)) {
      margin.value.bottom =
        typeof value === 'string' ? parseFloat(value) : value
    }
  }, 500),
})

const marginLeft = computed({
  get() {
    return margin.value.left
  },
  set: debounce((value) => {
    if (isNumeric(value)) {
      margin.value.left = typeof value === 'string' ? parseFloat(value) : value
    }
  }, 500),
})
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}

.page {
  width: 70px;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  margin: 10px;

  &--dark {
    border: 1px solid #fff;
  }
}

.margin {
  width: 60px;
}
</style>
