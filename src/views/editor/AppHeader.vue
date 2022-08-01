<template>
  <v-app-bar app flat dense>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <div>
      <v-tabs fixed-tabs background-color="transparent">
        <v-tab to="/file/build">Build</v-tab>
        <v-tab to="/file/compare">Compare</v-tab>
      </v-tabs>
    </div>

    <div class="d-flex align-center ml-4">
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>New Chart</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-printer-outline</v-icon>
          </v-btn>
        </template>
        <span>Print</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-undo</v-icon>
          </v-btn>
        </template>
        <span>Undo</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-redo</v-icon>
          </v-btn>
        </template>
        <span>Redo</span>
      </v-tooltip>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Help</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-on="on" v-bind="attrs">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
      <v-switch v-model="$vuetify.theme.dark"></v-switch>
    </div>
  </v-app-bar>
</template>
