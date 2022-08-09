import axios from 'axios'
import { defineStore } from 'pinia'

interface User {
  username: string
  name?: string
}

interface State {
  user: User | null
}

const client = axios.create({
  baseURL: process.env.VUE_APP_CENDANA_URL,
})

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      user: null,
    }
  },
  getters: {
    initials: (state) => {
      return state.user ? state.user.username[0].toUpperCase() : 'U'
    },
  },
  actions: {
    async getUser() {
      const { data } = await client.get('/user')
      this.user = data
    },
    async signOut() {
      await client.post('/logout').finally(() => {
        window.location.replace(process.env.VUE_APP_CENDANA_URL)
      })
    },
  },
})
