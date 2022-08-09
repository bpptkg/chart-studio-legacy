<template>
  <v-app>
    <app-header></app-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<style lang="scss">
@import '@/scss/customize.scss';
</style>
