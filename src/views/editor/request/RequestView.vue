<template>
  <splitpanes class="cs-theme" :class="{ 'cs-theme--dark': isDarkTheme }">
    <pane min-size="5" size="25">
      <div class="header">
        <v-toolbar height="40px" flat>
          <div>
            <div>Chart Request</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon small :disabled="isDisabled" @click="handleRequest">
            <v-icon>mdi-send-outline</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider></v-divider>
      </div>

      <div class="body">
        <scroll-wrapper>
          <date-interval></date-interval>
          <v-subheader>Chart Options</v-subheader>
          <div class="mx-2">
            <v-checkbox
              v-for="opt in options"
              :key="opt.name"
              :label="opt.title"
              v-model="opt.isChecked"
            ></v-checkbox>
          </div>
        </scroll-wrapper>
      </div>
    </pane>
    <pane>
      <scroll-wrapper>
        <div>
          <div
            v-if="isBusy"
            class="d-flex flex-column justify-center align-center mt-2"
          >
            <v-progress-circular indeterminate></v-progress-circular>
            <p class="ml-2">Requesting...</p>
          </div>
          <div v-else>
            <div v-if="data" class="d-flex flex-wrap">
              <v-card
                v-for="graph in data.graphs"
                :key="graph.id"
                class="mx-2 my-2"
              >
                <v-card-title>{{ graph.title }}</v-card-title>
                <v-card-text>
                  <div class="d-flex flex-column justify-center">
                    <v-img
                      :width="250"
                      :height="300"
                      cover
                      :src="graph.image.url"
                    ></v-img>
                    <v-btn
                      text
                      :href="graph.image.url"
                      target="_blank"
                      color="primary"
                      class="mt-2"
                      >Download</v-btn
                    >
                  </div>
                </v-card-text>
              </v-card>
            </div>
            <div v-else class="d-flex justify-center mt-2">
              <p>Nothing to show.</p>
            </div>
          </div>
        </div>
      </scroll-wrapper>

      <v-snackbar v-model="snackbar" timeout="8000" left>
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="handleRequest">
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
    </pane>
  </splitpanes>
</template>

<script setup>
import { computed } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import { storeToRefs } from 'pinia'
import { useRequestStore } from '@/store/request'
import { useTheme } from '@/composable/theme'
import ScrollWrapper from '@/components/ScrollWrapper.vue'
import DateInterval from './DateInterval.vue'

const { isDarkTheme } = useTheme()
const requestStore = useRequestStore()
const { options, data, isBusy, snackbar, errorMessage } =
  storeToRefs(requestStore)

const isDisabled = computed(
  () => options.value.filter((opt) => opt.isChecked).length === 0
)

function handleRequest() {
  requestStore.request()
}
</script>

<style lang="scss" scoped>
@import '@/scss/splitpanes.scss';

.header {
  position: relative;
}

.body {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
