import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import pinia from './store'
import vuetify from './plugins/vuetify'
import { PiniaUndo } from 'pinia-undo'
import { useUserStore } from './store/user'

Vue.config.productionTip = false

pinia.use(PiniaUndo)

const app = new Vue({
  router,
  pinia,
  vuetify,
  render: (h) => h(App),
})

function initApp() {
  app.$mount('#app')
}

async function initialize() {
  const userStore = useUserStore()

  userStore
    .getUser()
    .then(() => {
      initApp()
    })
    .catch(() => {
      if (process.env.NODE_ENV === 'production') {
        return (window.location.href = process.env.VUE_APP_CENDANA_URL || '/')
      } else {
        initApp()
      }
    })
}

window.addEventListener('load', () => {
  initialize()
})
