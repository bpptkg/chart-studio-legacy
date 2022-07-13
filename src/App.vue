<template>
  <v-app>
    <app-header />
    <app-navigation-drawer />
    <v-main>
      <build-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from './views/AppHeader.vue';
import BuildView from './views/BuildView.vue';
import AppNavigationDrawer from './views/AppNavigationDrawer.vue';
</script>
