<template>
  <v-menu min-width="200px" bottom rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="primary" size="36">
          <span class="white--text text-h5">{{ userStore.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="primary" size="48">
            <span class="white--text text-h5">{{ userStore.initials }}</span>
          </v-avatar>

          <h3 class="mt-3">{{ user?.name || 'Name' }}</h3>

          <p class="text-caption mt-1">@{{ user?.username || 'user' }}</p>

          <v-divider class="my-3"></v-divider>

          <v-btn depressed rounded text @click="userStore.signOut">
            Sign Out
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>
