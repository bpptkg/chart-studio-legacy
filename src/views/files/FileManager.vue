<template>
  <v-app :dark="isDarkTheme">
    <v-app-bar app flat>
      <v-app-bar-title>Chart Studio</v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <settings-menu></settings-menu>

        <div class="ml-4">
          <user-avatar></user-avatar>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer permanent>
        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-file-document-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Files</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Starred</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Trash</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Shared with me</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-image-multiple-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Templates</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { THEME_KEY, useTheme } from '@/composable/theme'
import { getCurrentInstance, onMounted } from 'vue'
import SettingsMenu from '../SettingsMenu.vue'
import UserAvatar from '../UserAvatar.vue'

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

<style lang="scss">
@import '@/scss/customize.scss';
</style>
