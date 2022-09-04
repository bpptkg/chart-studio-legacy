<template>
  <v-app :dark="isDarkTheme">
    <app-header></app-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { THEME_KEY, useTheme } from '@/composable/theme'
import { getCurrentInstance, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'

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
