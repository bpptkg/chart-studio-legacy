<template>
  <v-navigation-drawer v-model="drawerStore.drawer" absolute temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Chart Studio </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Your account</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Theme: Dark</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-translate</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Language: English</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-cog-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-message-alert-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Send feedback</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-keyboard-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Keyboard shortcuts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDrawerStore } from '@/store/drawer';
const drawerStore = useDrawerStore();
</script>
