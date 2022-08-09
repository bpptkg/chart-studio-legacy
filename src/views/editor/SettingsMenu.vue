<template>
  <v-menu :offset-y="true">
    <template #activator="{ on: menu, attrs }">
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template #activator="{ on: tooltip }">
          <v-btn icon small v-bind="attrs" v-on="{ ...tooltip, ...menu }">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
    </template>

    <v-list dense>
      <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-list-item-icon>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{
            isDarkTheme ? 'Disable dark theme' : 'Enable dark theme'
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        href="https://github.com/bpptkg/chart-studio"
        target="_blank"
      >
        <v-list-item-icon>
          <v-icon>mdi-github</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>GitHub</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        href="https://github.com/bpptkg/chart-studio/issues"
        target="_blank"
      >
        <v-list-item-icon>
          <v-icon>mdi-message-alert-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Report an issue</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item href="https://bma.cendana15.com/docs/" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-api</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>API Documentation</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/about" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/theme'

const { isDarkTheme } = useTheme()
</script>
