<template>
  <v-app>
    <v-app-bar app flat color="white">
      <v-app-bar-title class="ml-2">Studio</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-navigation-drawer permanent>
        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-file-document-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Drafts</v-list-item-title>
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

<style lang="css">
.v-toolbar__content {
  border-bottom: 1px solid #dadce0;
}
</style>
