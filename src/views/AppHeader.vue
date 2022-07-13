<template>
  <v-app-bar app flat dense color="white">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <div>
      <v-tabs>
        <v-tab>Build</v-tab>
        <v-tab>Compare</v-tab>
      </v-tabs>
    </div>

    <v-spacer />

    <v-app-bar-title>Chart Studio</v-app-bar-title>
    <v-btn icon width="24" height="24" class="ml-1">
      <v-icon size="18">mdi-chevron-down</v-icon>
    </v-btn>

    <v-spacer />

    <div class="mr-2">
      <v-btn icon width="40" height="40">
        <v-icon>mdi-cloud-check-outline</v-icon>
      </v-btn>
      <v-btn icon width="40" height="40">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
      <v-btn icon width="40" height="40">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </div>

    <div>
      <v-btn icon width="32" height="32">
        <v-avatar size="32">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style lang="css">
.v-toolbar__content {
  border-bottom: 1px solid #dadce0;
}
</style>
