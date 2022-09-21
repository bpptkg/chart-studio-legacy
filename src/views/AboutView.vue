<template>
  <v-app :dark="isDarkTheme">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="7">
            <v-subheader>About Chart Studio</v-subheader>

            <v-card>
              <v-list>
                <v-list-item>
                  <div class="d-flex align-center my-3">
                    <v-img
                      :src="require('@/assets/logo.svg')"
                      contain
                      width="72"
                      height="72"
                      alt="Chart Studio"
                    ></v-img>
                    <v-card-title>Chart Studio</v-card-title>
                  </div>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <div>
                      Version:
                      <span class="text--secondary">{{ version }} (Beta)</span>
                    </div>
                    <div class="my-1">
                      Commit:
                      <span class="text--secondary">{{ commitHash }}</span>
                    </div>
                    <div>
                      Build date:
                      <span class="text--secondary">
                        {{ buildDate }} ({{ buildDuration }})
                      </span>
                    </div>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  href="https://github.com/bpptkg/chart-studio"
                  target="_blank"
                >
                  <v-list-item-content>
                    <v-list-item-title> Developer resources </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-launch</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  href="https://github.com/bpptkg/chart-studio/issues"
                  target="_blank"
                >
                  <v-list-item-content>
                    <v-list-item-title>Report an issue</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-launch</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card class="mt-4">
              <v-card-text>
                <div>BPPTKG Chart Studio</div>
                <div>Copyright &copy; 2022 BPPTKG. All rights reserved.</div>
                <div class="mt-2">
                  Chart Studio App is made possible by BPPTKG with much open
                  source software by developer community.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { THEME_KEY, useTheme } from '@/composable/theme'
import moment from 'moment'
import { getCurrentInstance, onMounted } from 'vue'

const version = process.env.VUE_APP_VERSION
const commitHash = process.env.VUE_APP_COMMIT_HASH
const buildDate = process.env.VUE_APP_BUILD_DATE

const buildDuration = moment(buildDate).fromNow()

const { isDarkTheme } = useTheme()

const app = getCurrentInstance()

onMounted(() => {
  const theme = localStorage.getItem(THEME_KEY)
  if (theme && theme === 'true') {
    if (app) {
      app.proxy.$vuetify.theme.dark = true
    }
  }
})
</script>
