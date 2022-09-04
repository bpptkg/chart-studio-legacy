<template>
  <splitpanes
    class="cs-theme"
    :class="{ 'cs-theme--dark': isDarkTheme }"
    @resize="handlePaneResize"
  >
    <!-- Left sidebar pane. -->
    <pane
      v-if="workspaceStore.showCompareLeftSidebar"
      min-size="5"
      :size="leftPaneSize"
    >
      <settings-pane></settings-pane>
    </pane>

    <!-- Preview pane. -->
    <pane :size="mainPaneSize">
      <preview-pane :loading="isRendering">
        <template #toolbar>
          <v-tooltip
            bottom
            :open-delay="500"
            :open-on-click="false"
            :open-on-focus="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-on="on" v-bind="attrs" @click="zoomIn">
                <v-icon>mdi-magnify-plus-outline</v-icon>
              </v-btn>
            </template>
            <span>Zoom in</span>
          </v-tooltip>

          <v-tooltip
            bottom
            :open-delay="500"
            :open-on-click="false"
            :open-on-focus="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-on="on" v-bind="attrs" @click="zoomOut">
                <v-icon>mdi-magnify-minus-outline</v-icon>
              </v-btn>
            </template>
            <span>Zoom out</span>
          </v-tooltip>

          <v-tooltip
            bottom
            :open-delay="500"
            :open-on-click="false"
            :open-on-focus="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                v-on="on"
                v-bind="attrs"
                @click="handleTryAgain"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh</span>
          </v-tooltip>
        </template>

        <div id="printable-compare" class="d-flex">
          <div v-for="(__, index) in intervals" :key="index" class="ml-3">
            <v-chart
              ref="charts"
              :style="style"
              :option="options[index] || {}"
              :update-options="updateOptions"
              :autoresize="true"
            ></v-chart>
          </div>
        </div>

        <v-snackbar v-model="snackbar" timeout="8000" left>
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="handleTryAgain">
              Try Again
            </v-btn>
            <v-btn
              icon
              small
              v-bind="attrs"
              @click="snackbar = false"
              class="ml-2"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>

          {{ errorMessage }}
        </v-snackbar>
      </preview-pane>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
import 'echarts'
import VChart from 'vue-echarts'
import { useCompareStore } from '@/store/compare'
import { useCompareDataStore } from '@/store/compareData'
import { Splitpanes, Pane } from 'splitpanes'
import SettingsPane from './SettingsPane.vue'
import PreviewPane from '@/components/PreviewPane.vue'
import { useTheme } from '@/composable/theme'
import { computed, nextTick, onMounted, Ref, ref } from 'vue'
import { useChartStore } from '@/store/chart'
import { renderToECharts } from '@/renderer/echarts/render'
import { storeToRefs } from 'pinia'
import { EChartsOption } from 'echarts'
import Panzoom, { PanzoomObject } from '@panzoom/panzoom'
import { AxiosError } from 'axios'
import { useWorkspaceStore } from '@/store/workspace'
import { MAX_ZOOM_SCALE, MIN_ZOOM_SCALE, ZOOM_DELTA } from '@/constants/zoom'
import { useCompareViewStore } from '@/store/compareview'
import { PaneDimension } from '@/shared/pane'

const charts: Ref<Array<typeof VChart> | null> = ref(null)

const { isDarkTheme } = useTheme()

const chartStore = useChartStore()
const compareStore = useCompareStore()
const compareDataStore = useCompareDataStore()
const workspaceStore = useWorkspaceStore()

const { intervals } = storeToRefs(compareStore)
const { renderModels } = storeToRefs(compareDataStore)

compareStore.$subscribe(() => {
  compareDataStore.update()
})

chartStore.$subscribe(() => {
  compareDataStore.update()
})

const updateOptions = ref({
  notMerge: true,
})

const options: Ref<EChartsOption[]> = ref([])
const isRendering = ref(false)
const snackbar = ref(false)
const errorMessage = ref('')

const style = computed(() => {
  return {
    width: `${chartStore.width}px`,
    height: `${chartStore.height}px`,
    backgroundColor: `${chartStore.backgroundColor}`,
  }
})

function update() {
  // Update compare data on mounted.
  compareDataStore.update()
}

compareDataStore.$onAction(({ name, after, onError }) => {
  if (name === 'update') {
    isRendering.value = true

    after(async () => {
      options.value = renderModels.value.map((renderModel) => {
        return renderToECharts(renderModel)
      })
      isRendering.value = false
    })

    onError((e) => {
      const error = e as AxiosError
      let msg = `Error occurred while updating the chart`

      if (error.response) {
        msg += ` (${error.response.status})`
      } else if (error.request) {
        msg += ` (ERR_CLIENT)`
      } else {
        msg += ` (ERR_REQUEST)`
      }

      errorMessage.value = msg

      snackbar.value = true
      isRendering.value = false
    })
  }
})

onMounted(() => {
  update()
})

// Pane handling implementation.
const compareViewStore = useCompareViewStore()
const { leftPaneSize, mainPaneSize } = storeToRefs(compareViewStore)

function handlePaneResize(event: PaneDimension[]) {
  if (workspaceStore.showCompareLeftSidebar) {
    compareViewStore.setLeftPaneSize(event[0].size)
  }
}

// Preview toolbar implementation.
function handleTryAgain() {
  snackbar.value = false
  update()
}

let zoomScale = 1
let elem: HTMLElement | null = null
let panzoom: PanzoomObject | null = null

nextTick(() => {
  elem = document.getElementById('printable-compare')
  if (elem) {
    panzoom = Panzoom(elem, { maxScale: 5 })
  }
})

function zoomIn() {
  if (zoomScale + ZOOM_DELTA < MAX_ZOOM_SCALE) {
    zoomScale += ZOOM_DELTA
  }
  if (panzoom) {
    panzoom.zoom(zoomScale, { animate: true })
  }
}

function zoomOut() {
  if (zoomScale - ZOOM_DELTA > MIN_ZOOM_SCALE) {
    zoomScale -= ZOOM_DELTA
  }
  if (panzoom) {
    panzoom.zoom(zoomScale, { animate: true })
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/splitpanes.scss';
</style>
